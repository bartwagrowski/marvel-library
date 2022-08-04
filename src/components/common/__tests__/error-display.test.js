import { render, screen } from '@testing-library/react';
import Alert from '@mui/material/Alert';
import ErrorDisplay from '../error-display';

jest.mock('@mui/material/Alert', () => jest.fn(({ children }) => <div data-testid='alert'>{children}</div>));

describe('ErrorDisplay component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly if there is no error', () => {
        render(<ErrorDisplay />);
        expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
    });

    it('should render correctly if there is an error', () => {
        render(<ErrorDisplay error='Oh no!' />);
        expect(screen.getByTestId('alert')).toBeInTheDocument();
        expect(Alert).toBeCalledWith(
            {
                severity: 'error',
                children: expect.any(Array),
            },
            {}
        );
        expect(screen.getByText('Oh no!. Please try again.')).toBeInTheDocument();
    });
});
