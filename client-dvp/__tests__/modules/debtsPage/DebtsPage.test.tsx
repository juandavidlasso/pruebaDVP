import { render, waitFor, screen } from '@testing-library/react';
import DebtsPage from '../../../src/modules/debts/DebtsPage';
import { renderWithProviders } from '../../../src/test/renderWithProvider';

describe('Debts Page', () => {
    it('renders user debts list', async () => {
        render(renderWithProviders(<DebtsPage />));

        expect(screen.getByText(/Listado de deudas/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByRole('table')).toBeInTheDocument();

            expect(screen.getByText(/ID/i)).toBeInTheDocument();
            expect(screen.getByText(/Valor/i)).toBeInTheDocument();
            expect(screen.getByText(/Descripción/i)).toBeInTheDocument();
            expect(screen.getByText(/Fecha de pago/i)).toBeInTheDocument();
            expect(screen.getByText(/Fecha de creación/i)).toBeInTheDocument();

            expect(screen.getAllByText(/1/i)[0]).toBeInTheDocument();
            expect(screen.getByText(/50.000,00/i)).toBeInTheDocument();
            expect(screen.getByText(/Deuda del carro/i)).toBeInTheDocument();
            expect(
                screen.getAllByText('2/01/26, 4:44 p. m.')[0]
            ).toBeInTheDocument();
            expect(
                screen.getAllByText('2/01/26, 4:44 p. m.')[0]
            ).toBeInTheDocument();

            expect(screen.getAllByText(/2/i)[0]).toBeInTheDocument();
            expect(screen.getByText(/800.000,00/i)).toBeInTheDocument();
            expect(screen.getByText(/Deuda del arriendo/i)).toBeInTheDocument();
            expect(
                screen.getAllByText('2/01/26, 4:44 p. m.')[1]
            ).toBeInTheDocument();
            expect(
                screen.getAllByText('2/01/26, 4:44 p. m.')[1]
            ).toBeInTheDocument();
        });
    });
});
