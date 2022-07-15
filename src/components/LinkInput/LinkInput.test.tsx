import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import LinkInput from './LinkInput';

test('bad input: invalid URL', () => {
  render(<LinkInput onEmbedResults={(embed: string | null) => {}}/>);
  const input = screen.getByRole('textbox') as HTMLInputElement;
  act(() => {
    input.value = 'abcd';
  });
  const generateButton = screen.getByRole('button', { name: 'Generate' });
  act(() => {
    generateButton.click();
  });
  const errorDisplay = screen.queryByLabelText('Invalid URL');
  expect(errorDisplay).toBeInTheDocument();
});

test('good input: v query param', () => {
  render(<LinkInput onEmbedResults={(embed: string | null) => {}}/>);
  const input = screen.getByRole('textbox') as HTMLInputElement;
  act(() => {
    input.value = 'https://www.youtube.com/watch?v=REPLACE';
  });
  const generateButton = screen.getByRole('button', { name: 'Generate' });
  act(() => {
    generateButton.click();
  });
  const errorDisplay = screen.queryByLabelText('Invalid URL');
  expect(errorDisplay).toBeNull();
});

test('good input: in path', () => {
  render(<LinkInput onEmbedResults={(embed: string | null) => {}}/>);
  const input = screen.getByRole('textbox') as HTMLInputElement;
  act(() => {
    input.value = 'https://youtu.be/orNFfkYyhCY';
  });
  const generateButton = screen.getByRole('button', { name: 'Generate' });
  act(() => {
    generateButton.click();
  });
  const errorDisplay = screen.queryByLabelText('Invalid URL');
  expect(errorDisplay).toBeNull();
});