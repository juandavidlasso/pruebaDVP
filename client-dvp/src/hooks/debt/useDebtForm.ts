import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client/react';
import {
    CREATE_DEBT,
    UPDATE_DEBT,
} from '../../graphql/mutations/debt/debt.mutation';
import type {
    IDebt,
    DebtCreateResponse,
    DebtUpdateResponse,
    FormDataDebt,
} from '../../shared/types/debt';
import { DEBTS_USER } from '../../graphql/resolvers/debt/debt.query';
import { parseAmount } from '../../shared/utils/lib';

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

export const useDebtForm = ({
    debt,
    onClose,
}: {
    debt: IDebt | null;
    onClose: () => void;
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm<FormDataDebt>({
        resolver: yupResolver(schemaValidation),
        mode: 'all',
        values: {
            amount: debt?.amount?.toString() || '',
            description: debt?.description || '',
        },
    });

    const [createDebt, { loading: loadingCreate }] =
        useMutation<DebtCreateResponse>(CREATE_DEBT, {
            onCompleted: () => {
                reset();
                onClose();
            },
            onError: (error) => {
                toast.error(error.message);
            },
            refetchQueries: [{ query: DEBTS_USER }],
        });
    const [updateDebt, { loading: loadingUpdate }] =
        useMutation<DebtUpdateResponse>(UPDATE_DEBT, {
            onCompleted: () => {
                reset();
                onClose();
            },
            onError: (error) => {
                toast.error(error.message);
            },
            refetchQueries: [{ query: DEBTS_USER }],
        });

    const onSubmit = handleSubmit(async (data: FormDataDebt) => {
        if (debt) {
            await updateDebt({
                variables: {
                    debt: {
                        id_debt: debt?.id_debt,
                        amount: parseAmount(data.amount),
                        description: data.description,
                    },
                },
            });
            toast.success('La deuda se actualizó exitosamente');
        } else {
            await createDebt({
                variables: {
                    amount: parseAmount(data.amount),
                    description: data.description,
                },
            });
            toast.success('La deuda se registro exitosamente');
        }
    });

    const isLoading = loadingCreate || loadingUpdate;

    return {
        errors,
        loading: isLoading,
        register,
        onSubmit,
        setValue,
    };
};
