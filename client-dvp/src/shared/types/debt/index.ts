export interface FormDataDebt {
    amount: string;
    description: string;
}

interface Debt {
    amount: number;
    created_at: string;
    description: string;
    id_debt: number;
    paid_at: string;
    user_id: number;
}

export interface DebtResponse {
    createDebt: {
        id_debt: number;
        amount: number;
        description: string;
        paid_at: string;
        created_at: string;
        user_id: number;
    };
}

export interface DebtData {
    debtsByUser: Debt[];
}
