import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import type { FormDataLogin, LoginResponse } from '../../../shared/types/login';
import { LOGIN_MUTATION } from '../../graphql/mutations/login/login.mutation';
import { useAuth } from '../auth/useAuth';

const schemaValidation = yup
    .object({
        email: yup.string().email().required('The email is required'),
        password: yup.string().required('The password is required'),
    })
    .required();

export const useLogin = () => {
    const { saveToken } = useAuth();
    const [login, { loading }] = useMutation<LoginResponse>(LOGIN_MUTATION, {
        onCompleted: (data) => {
            saveToken(data.login);
        },
        onError: (error) => {
            toast(error.message, { type: 'error' });
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataLogin>({
        resolver: yupResolver(schemaValidation),
        mode: 'all',
    });

    const onSubmit = handleSubmit(
        async (data: FormDataLogin) =>
            await login({
                variables: { email: data.email, password: data.password },
            })
    );

    return {
        loading,
        errors,
        register,
        onSubmit,
    };
};
