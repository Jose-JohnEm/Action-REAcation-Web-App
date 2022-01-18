import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


describe('Test pour tester les tests de react', () => {
  let petite_val = 0
  let grande_val = 1

  test('Test de supériorité', () => {
      expect(grande_val).toBeGreaterThan(petite_val)
  })
  
  test("Test d'infériorité", () => {
      expect(petite_val).toBeLessThan(grande_val)
  })
});