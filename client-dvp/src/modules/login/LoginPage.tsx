import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Divider,
    TextField,
} from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import { useLogin } from '../../hooks/login/useLogin';
import { useAuth } from '../../hooks/auth/useAuth';
import { ROUTES } from '../../shared/constants/routes';

const LoginPage = () => {
    const { errors, loading, register, onSubmit } = useLogin();
    const { user } = useAuth();

    if (user) return <Navigate to={ROUTES.DEBTS} />;
    return (
        <Box className="w-screen h-screen flex items-center justify-center bg-black px-3">
            <Card className="w-112.5 bg-white rounded-2xl! p-0 min-h-[60vh] flex flex-col justify-between pb-3 max-lg:w-[90%]">
                <Box className="h-fit w-full bg-[#232323] p-5 flex justify-center items-center">
                    <img src="/img/logo.png" alt="logo" />
                </Box>
                <form onSubmit={onSubmit}>
                    <CardContent className="flex flex-col gap-8 items-center px-8!">
                        <h2 className="text-black text-3xl font-bold">
                            Iniciar Sesión
                        </h2>
                        <Box className="w-full">
                            <TextField
                                variant="outlined"
                                label="Correo electrónico"
                                type="text"
                                fullWidth
                                placeholder="Ingresa tu correo electrónico"
                                {...register('email')}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Box>
                        <Box className="w-full">
                            <TextField
                                variant="outlined"
                                label="Contraseña"
                                type="password"
                                slotProps={{
                                    input: { autoComplete: 'off' },
                                }}
                                fullWidth
                                placeholder="Ingresa tu contraseña"
                                {...register('password')}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Box>
                        <Box className="w-full">
                            <Button
                                disabled={loading}
                                type="submit"
                                variant="contained"
                                fullWidth
                                className="bg-black! hover:bg-[#7D2D6F]! normal-case! text-xl! py-2!"
                            >
                                {loading ? (
                                    <CircularProgress />
                                ) : (
                                    'Iniciar sesión'
                                )}
                            </Button>
                        </Box>
                    </CardContent>
                </form>
                <Divider className="bg-gray-600 w-[90%] mx-auto! my-3!" />
                <CardActions>
                    <Box className="w-full flex justify-center items-center mb-4 gap-3">
                        <span className="text-gray-600 text-xl">
                            No tienes una cuenta?
                        </span>
                        <Link
                            to="/register"
                            className="text-[#7D2D6F]! text-xl hover:underline!"
                        >
                            Regístrate aquí
                        </Link>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
};

export default LoginPage;
