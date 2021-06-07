import { render } from '@testing-library/react';
import App from './App';

test('renders the app correctly', () => {
  const rendered = render(<App />);

  expect(rendered.baseElement).toBeInTheDocument();
});
