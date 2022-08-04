import { screen, render } from '@testing-library/react';
import LoadingBackdrop from '../loading-backdrop';

jest.mock('@mui/material/CircularProgress', () => jest.fn(() => <div data-testid='progress' />));

describe('LoadingBackdrop component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        const element = document.createElement('div');
        element.setAttribute('id', 'loading-root');

        render(<LoadingBackdrop />, {
            container: document.body.appendChild(element),
        });

        expect(screen.getByTestId('progress')).toBeInTheDocument();
    });
});
