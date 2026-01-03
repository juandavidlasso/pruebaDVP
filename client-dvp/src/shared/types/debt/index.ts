export interface FormDataDebt {
    amount: string;
    description: string;
}

export interface IDebt {
    amount: number;
    created_at: string;
    description: string;
    id_debt: number;
    paid_at: string;
    user_id: number;
}

export interface DebtCreateResponse {
    createDebt: {
        id_debt: number;
        amount: number;
        description: string;
        paid_at: string;
        created_at: string;
        user_id: number;
    };
}

export interface DebtUpdateResponse {
    updateDebt: {
        id_debt: number;
        amount: number;
        description: string;
        paid_at: string;
        created_at: string;
        user_id: number;
    };
}

export interface DebtDeleteResponse {
    deleteDebt: boolean;
}

export interface DebtData {
    debtsByUser: IDebt[];
}

export interface DebtFileResponse {
    exportDebts: {
        fileName: string;
        base64: string;
    };
}

export type DebtFilter = 'ALL' | 'PAID' | 'PENDING';

export interface IFilters {
    name: string;
    value: DebtFilter;
}
