import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import RegisterPage from '../../../src/modules/register/RegisterPage';
import { renderWithProviders } from '../../../src/test/renderWithProvider';

describe('Register Page', () => {
    it('registers user and redirects to login', async () => {
        render(renderWithProviders(<RegisterPage />));

        fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
            target: { value: 'nuevo@test.com' },
        });

        fireEvent.change(screen.getByLabelText(/Contraseña/i), {
            target: { value: '123456' },
        });

        fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

        await waitFor(() => {
            expect(screen.getByText(/Inicia Sesión/i)).toBeInTheDocument();
        });
    });
});
