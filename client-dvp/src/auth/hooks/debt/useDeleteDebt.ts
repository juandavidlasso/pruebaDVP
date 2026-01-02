import { useMutation } from '@apollo/client/react';
import { toast } from 'react-toastify';
import type { DebtDeleteResponse } from '../../../shared/types/debt';
import { DELETE_DEBT } from '../../graphql/mutations/debt/debt.mutation';
import { DEBTS_USER } from '../../graphql/resolvers/debt/debt.query';

export const useDeleteDebt = () => {
    const [deleteDebt] = useMutation<DebtDeleteResponse>(DELETE_DEBT, {
        onCompleted: () => {
            toast.success('La deuda se eliminó exitosamente');
        },
        onError: (error) => {
            toast.error(error.message);
        },
        refetchQueries: [{ query: DEBTS_USER }],
    });

    const handleDelete = async (id_debt: number) => {
        await deleteDebt({
            variables: { idDebt: id_debt },
        });
    };

    return {
        handleDelete,
    };
};
