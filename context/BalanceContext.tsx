import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

type BalanceData = {
    total_income: number;
    total_expense: number;
    balance: number;
};

interface BalanceContextType {
    balanceData: BalanceData;
    loading: boolean;
    refreshBalance: () => Promise<void>;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

interface BalanceProviderProps {
  children: ReactNode;
}

export const BalanceProvider: React.FC<BalanceProviderProps> = ({ children }) => {
    const [balanceData, setBalanceData] = useState<BalanceData>({
        total_income: 0,
        total_expense: 0,
        balance: 0
    });
    const [loading, setLoading] = useState(true);

    const loadBalanceData = async () => {
        try {
            setLoading(true);
            setBalanceData({
                total_income: result.total_income || 0,
                total_expense: result.total_expense || 0,
                balance: result.balance || 0
            });
        } catch (error) {
            console.error('Error loading balance data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBalanceData();
    }, []);

    const refreshBalance = async () => {
        await loadBalanceData();
    };

    return (
        <BalanceContext.Provider value={{ balanceData, loading, refreshBalance }}>
            {children}
        </BalanceContext.Provider>
    );
};

export const useBalance = (): BalanceContextType => {
    const context = useContext(BalanceContext);
    if (context === undefined) {
        throw new Error('useBalance must be used within a BalanceProvider');
    }
    return context;
}