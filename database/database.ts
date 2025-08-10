import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('dinar.db');

export type TransactionType = 'income' | 'expense';

export const initializeDatabase = () => {
  try {
    db.execSync('PRAGMA foreign_keys = ON;');

    db.execSync(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
        icon TEXT DEFAULT 'folder',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    db.execSync(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL CHECK (amount > 0),
        type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
        category_id INTEGER NOT NULL,
        description TEXT,
        date DATE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT
      );
    `);

    db.execSync('CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);');
    db.execSync('CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);');
    db.execSync('CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions(category_id);');

    insertDefaultCategories();

    console.log('Budget tracker database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

const insertDefaultCategories = () => {
  const defaultCategories = [
    { name: 'Salary', type: 'income', icon: 'briefcase' },
    { name: 'Freelance', type: 'income', icon: 'laptop' },
    { name: 'Investment', type: 'income', icon: 'trending-up' },
    { name: 'Other Income', type: 'income', icon: 'plus-circle' },
    
    { name: 'Food & Dining', type: 'expense', icon: 'utensils' },
    { name: 'Transportation', type: 'expense', icon: 'car' },
    { name: 'Shopping', type: 'expense', icon: 'shopping-bag' },
    { name: 'Entertainment', type: 'expense', icon: 'music' },
    { name: 'Bills & Utilities', type: 'expense', icon: 'receipt' },
    { name: 'Healthcare', type: 'expense', icon: 'heart' },
    { name: 'Education', type: 'expense', icon: 'book-open' },
    { name: 'Other Expenses', type: 'expense', icon: 'more-horizontal' }
  ];

  defaultCategories.forEach(category => {
    try {
      const statement = db.prepareSync(`
        INSERT OR IGNORE INTO categories (name, type, icon) 
        VALUES (?, ?, ?)
      `);
      statement.executeSync([category.name, category.type, category.icon]);
    } catch (error) {
    }
  });
};

export const dbOperations = {
  createCategory: (name: string, type: TransactionType, icon?: string) => {
    const statement = db.prepareSync(`
      INSERT INTO categories (name, type, icon) 
      VALUES (?, ?, ?)
    `);
    return statement.executeSync([name, type, icon || 'folder']);
  },

  getCategories: (type?: TransactionType) => {
    if (type) {
      const statement = db.prepareSync('SELECT * FROM categories WHERE type = ? ORDER BY name ASC');
      return statement.executeSync([type]).getAllSync();
    }
    return db.getAllSync('SELECT * FROM categories ORDER BY type DESC, name ASC');
  },

  getCategoryById: (id: number) => {
    const statement = db.prepareSync('SELECT * FROM categories WHERE id = ?');
    return statement.executeSync([id]).getFirstSync();
  },

  updateCategory: (id: number, name: string,  icon?: string) => {
    const statement = db.prepareSync(`
      UPDATE categories 
      SET name = ?, icon = COALESCE(?, icon)
      WHERE id = ?
    `);
    return statement.executeSync([name, icon || null, id]);
  },

  deleteCategory: (id: number) => {
    const statement = db.prepareSync('DELETE FROM categories WHERE id = ?');
    return statement.executeSync([id]);
  },

  createTransaction: (amount: number, type: TransactionType, categoryId: number, description?: string, date?: string) => {
    const transactionDate = date || new Date().toISOString().split('T')[0];
    const statement = db.prepareSync(`
      INSERT INTO transactions (amount, type, category_id, description, date) 
      VALUES (?, ?, ?, ?, ?)
    `);
    return statement.executeSync([amount, type, categoryId, description || '', transactionDate]);
  },

  getTransactions: (limit?: number, offset?: number) => {
    const query = `
      SELECT t.*, c.name as category_name, c.icon as category_icon
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      ORDER BY t.date DESC, t.created_at DESC
      ${limit ? `LIMIT ${limit}` : ''}
      ${offset ? `OFFSET ${offset}` : ''}
    `;
    return db.getAllSync(query);
  },

  getTransactionById: (id: number) => {
    const statement = db.prepareSync(`
      SELECT t.*, c.name as category_name, c.icon as category_icon
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.id = ?
    `);
    return statement.executeSync([id]).getFirstSync();
  },

  getTransactionsByDateRange: (startDate: string, endDate: string) => {
    const statement = db.prepareSync(`
      SELECT t.*, c.name as category_name, c.icon as category_icon
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.date BETWEEN ? AND ?
      ORDER BY t.date DESC, t.created_at DESC
    `);
    return statement.executeSync([startDate, endDate]).getAllSync();
  },

  getTransactionsByCategory: (categoryId: number, startDate?: string, endDate?: string) => {
    let query = `
      SELECT t.*, c.name as category_name, c.icon as category_icon
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.category_id = ?
    `;
    const params: (string | number)[] = [categoryId];

    if (startDate && endDate) {
      query += ' AND t.date BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }

    query += ' ORDER BY t.date DESC, t.created_at DESC';

    const statement = db.prepareSync(query);
    return statement.executeSync(params).getAllSync();
  },

  updateTransaction: (id: number, amount: number, categoryId: number, description?: string, date?: string) => {
    const statement = db.prepareSync(`
      UPDATE transactions 
      SET amount = ?, category_id = ?, description = ?, date = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    const transactionDate = date || new Date().toISOString().split('T')[0];
    return statement.executeSync([amount, categoryId, description || '', transactionDate, id]);
  },

  deleteTransaction: (id: number) => {
    const statement = db.prepareSync('DELETE FROM transactions WHERE id = ?');
    return statement.executeSync([id]);
  },

  getTotalBalance: (upToDate?: string) => {
    let query = `
      SELECT 
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as total_income,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as total_expense,
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0) as balance
      FROM transactions
    `;
    
    if (upToDate) {
      query += ' WHERE date <= ?';
      const statement = db.prepareSync(query);
      return statement.executeSync([upToDate]).getFirstSync();
    }
    
    return db.getFirstSync(query);
  },

  getSummaryByDateRange: (startDate: string, endDate: string) => {
    const statement = db.prepareSync(`
      SELECT 
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as total_income,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as total_expense,
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0) as net_amount,
        COUNT(*) as transaction_count
      FROM transactions
      WHERE date BETWEEN ? AND ?
    `);
    return statement.executeSync([startDate, endDate]).getFirstSync();
  },

  getCategorySummary: (startDate: string, endDate: string, type?: TransactionType) => {
    let query = `
      SELECT 
        c.id,
        c.name,
        c.icon,
        c.type,
        COALESCE(SUM(t.amount), 0) as total_amount,
        COUNT(t.id) as transaction_count
      FROM categories c
      LEFT JOIN transactions t ON c.id = t.category_id 
        AND t.date BETWEEN ? AND ?
    `;
    
    const params = [startDate, endDate];
    
    if (type) {
      query += ' WHERE c.type = ?';
      params.push(type);
    }
    
    query += ' GROUP BY c.id, c.name, c.icon, c.type ORDER BY total_amount DESC';
    
    const statement = db.prepareSync(query);
    return statement.executeSync(params).getAllSync();
  },

  getCategoriesWithValues: (type: TransactionType, startDate?: string, endDate?: string) => {
    let query = `
      SELECT 
        c.id,
        c.name,
        c.icon,
        c.type,
        COALESCE(SUM(t.amount), 0) as total_amount,
        COUNT(t.id) as transaction_count,
        AVG(t.amount) as average_amount,
        MAX(t.amount) as max_amount,
        MIN(t.amount) as min_amount
      FROM categories c
      LEFT JOIN transactions t ON c.id = t.category_id AND t.type = c.type
    `;
    
    const params: (string | number)[] = [];
    
    // Add date range filter if provided
    if (startDate && endDate) {
      query += ' AND t.date BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }
    
    // Filter by transaction type
    query += ` WHERE c.type = ?`;
    params.push(type);
    
    query += ` GROUP BY c.id, c.name, c.icon, c.type 
               ORDER BY total_amount DESC, c.name ASC`;
    
    const statement = db.prepareSync(query);
    return statement.executeSync(params).getAllSync();
  },

  getMonthlyTrends: (monthsBack: number = 12) => {
    const statement = db.prepareSync(`
      SELECT 
        strftime('%Y-%m', date) as month,
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as income,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as expense,
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0) as net
      FROM transactions
      WHERE date >= date('now', '-' || ? || ' months')
      GROUP BY strftime('%Y-%m', date)
      ORDER BY month DESC
    `);
    return statement.executeSync([monthsBack]).getAllSync();
  },

  getDailyTransactions: (date: string) => {
    const statement = db.prepareSync(`
      SELECT t.*, c.name as category_name, c.icon as category_icon
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.date = ?
      ORDER BY t.created_at DESC
    `);
    return statement.executeSync([date]).getAllSync();
  },

  searchTransactions: (searchTerm: string, startDate?: string, endDate?: string) => {
    let query = `
      SELECT t.*, c.name as category_name, c.icon as category_icon
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE (t.description LIKE ? OR c.name LIKE ?)
    `;
    
    const params = [`%${searchTerm}%`, `%${searchTerm}%`];
    
    if (startDate && endDate) {
      query += ' AND t.date BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }
    
    query += ' ORDER BY t.date DESC, t.created_at DESC';
    
    const statement = db.prepareSync(query);
    return statement.executeSync(params).getAllSync();
  }
};