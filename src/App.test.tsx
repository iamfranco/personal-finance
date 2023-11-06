import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App component', () => {
  it('renders correct title', () => {
    // Arrange Act
    render(<App />)

    // Assert
    expect(screen.getByText('Personal Finance')).not.toBeNull();
  })
})