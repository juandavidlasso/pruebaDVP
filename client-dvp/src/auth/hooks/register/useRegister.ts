import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import type {
    FormDataRegister,
    RegisterResponse,
} from '../../../shared/types/register';
import { REGISTER_MUTATION } from '../../graphql/mutations/register/register.mutation';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/routes';

const schemaValidation = yup
    .object({
        email: yup
            .string()
            .email()
            .required('El correo electrónico es requerido'),
        password: yup.string().required('La contraseña es requerida'),
    })
    .required();

export const useRegister = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormDataRegister>({
        resolver: yupResolver(schemaValidation),
        mode: 'all',
    });

    const [createUser, { loading }] = useMutation<RegisterResponse>(
        REGISTER_MUTATION,
        {
            onCompleted(data) {
                toast.success(
                    `User ${data.createUser.email} registered successfully. Now you can Sign In`
                );
                reset();
                navigate(ROUTES.LOGIN, { replace: true });
            },
            onError(err) {
                toast.error(err.message);
            },
        }
    );

    const onSubmit = handleSubmit(
        async (data) =>
            await createUser({
                variables: {
                    email: data.email,
                    password: data.password,
                },
            })
    );

    return {
        loading,
        errors,
        register,
        onSubmit,
    };
};
