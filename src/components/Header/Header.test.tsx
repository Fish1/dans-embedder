import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders header', () => {
  render(<Header title='Hello World' />);
  const header = screen.queryByRole('heading');
  expect(header).toBeInTheDocument();
});