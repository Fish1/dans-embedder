import { render, screen } from '@testing-library/react';
import EmbedResult from './EmbedResult';

test('not null', () => {
  const embedText = 'this is some random text for testing';
  render(<EmbedResult embed={embedText} />);
  const header = screen.queryByRole('heading', { name: 'Embed Code' });
  expect(header).toBeInTheDocument();
});

test('null', () => {
  render(<EmbedResult embed={null} />);
  const header = screen.queryByRole('heading', { name: 'Embed Code' });
  expect(header).toBeNull();
});

