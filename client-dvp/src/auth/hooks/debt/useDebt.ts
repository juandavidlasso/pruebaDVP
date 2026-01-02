import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client/react';
import { CREATE_DEBT } from '../../graphql/mutations/debt/debt.mutation';
import type { DebtResponse, FormDataDebt } from '../../../shared/types/debt';
import { useAuth } from '../auth/useAuth';
import { DEBTS_USER } from '../../graphql/resolvers/debt/debt.query';

const schemaValidation = yup
    .object({
        amount: yup
            .string()
            .required('El valor es requerido')
            .test(
                'min-value',
                'La deuda no puede tener un valor negativo',
                (value) => {
                    if (!value) return false;
                    const numericValue = Number(value.replace(/\D/g, ''));
                    return numericValue >= 1;
                }
            ),
        description: yup.string().required('La descripción es requerida'),
    })
    .required();

export const useDebt = (handleClose: () => void) => {
    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm<FormDataDebt>({
        resolver: yupResolver(schemaValidation),
        mode: 'all',
    });

    const [createDebt, { loading }] = useMutation<DebtResponse>(CREATE_DEBT, {
        onCompleted: () => {
            reset();
            handleClose();
        },
        onError: (error) => {
            toast(error.message, { type: 'error' });
        },
        refetchQueries: [{ query: DEBTS_USER }],
    });

    const onSubmit = handleSubmit(
        async (data: FormDataDebt) =>
            await createDebt({
                variables: {
                    amount: Number(data.amount),
                    description: data.description,
                    userId: user?.id_user,
                },
            })
    );

    return {
        errors,
        loading,
        register,
        onSubmit,
        setValue,
    };
};
