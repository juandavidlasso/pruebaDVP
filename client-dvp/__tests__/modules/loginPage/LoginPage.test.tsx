import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../../../src/modules/login/LoginPage';
import { renderWithProviders } from '../../../src/test/renderWithProvider';

describe('Login Page', () => {
    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });
    it('renders login form', () => {
        render(renderWithProviders(<LoginPage />));
        expect(screen.getByText(/Inicia Sesión/i)).toBeInTheDocument();
    });

    it('shows validation errors', async () => {
        render(renderWithProviders(<LoginPage />));
        fireEvent.click(
            screen.getByRole('button', { name: /Iniciar Sesión/i })
        );
        expect(
            await screen.findByText(/El correo electrónico es requerido/i)
        ).toBeInTheDocument();
    });

    it('login successfully', async () => {
        render(renderWithProviders(<LoginPage />));

        fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
            target: { value: 'juan@test.com' },
        });
        fireEvent.change(screen.getByLabelText(/Contraseña/i), {
            target: { value: '123456' },
        });

        fireEvent.click(
            screen.getByRole('button', { name: /Iniciar Sesión/i })
        );

        await waitFor(() => {
            expect(sessionStorage.getItem('token')).toBe('fake-jwt-token');
        });
    });
});
