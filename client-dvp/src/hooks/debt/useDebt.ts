import { useLazyQuery, useMutation } from '@apollo/client/react';
import { toast } from 'react-toastify';
import type {
    IDebt,
    DebtDeleteResponse,
    DebtFileResponse,
    DebtUpdateResponse,
} from '../../shared/types/debt';
import {
    DELETE_DEBT,
    UPDATE_DEBT,
} from '../../graphql/mutations/debt/debt.mutation';
import {
    DEBTS_USER,
    DOWNLOAD_DEBTS,
} from '../../graphql/resolvers/debt/debt.query';
import { useAuth } from '../auth/useAuth';

export const useDebt = () => {
    const { user } = useAuth();
    const [deleteDebt] = useMutation<DebtDeleteResponse>(DELETE_DEBT, {
        onCompleted: () => {
            toast.success('La deuda se eliminó exitosamente');
        },
        onError: (error) => {
            toast.error(error.message);
        },
        refetchQueries: [{ query: DEBTS_USER }],
    });

    const [updateDebt] = useMutation<DebtUpdateResponse>(UPDATE_DEBT, {
        onCompleted: () => {
            toast.success('La deuda fue pagada exitosamente');
        },
        onError: (error) => {
            toast.error(error.message);
        },
        refetchQueries: [{ query: DEBTS_USER }],
    });

    const [exportDebts, { loading, called }] = useLazyQuery<DebtFileResponse>(
        DOWNLOAD_DEBTS,
        {
            fetchPolicy: 'no-cache',
        }
    );
    const handleSubmit = async () => {
        const { data, error } = await exportDebts({
            variables: { userId: user?.id_user },
        });

        if (error) return toast.error(error.message);

        const link = document.createElement('a');

        link.href =
            'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +
            data?.exportDebts?.base64;

        link.download = data?.exportDebts?.fileName || 'Deudas';
        link.click();
    };

    const handleDelete = async (id_debt: number) => {
        await deleteDebt({
            variables: { idDebt: id_debt },
        });
    };

    const handlePay = async (debt: IDebt) => {
        await updateDebt({
            variables: {
                debt: {
                    id_debt: debt?.id_debt,
                    amount: debt?.amount,
                    description: debt?.description,
                    user_id: debt?.user_id,
                    paid_at: 'Pago',
                },
            },
        });
    };

    return {
        loading,
        called,
        handleSubmit,
        handlePay,
        handleDelete,
    };
};
