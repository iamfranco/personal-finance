import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import InputNumber from './InputNumber';

const mockSetValue = vi.fn();

describe('InputNumber component', () => {
  const user = userEvent.setup();

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('when user types in number, then setValue is called with the number', async () => {
    // Arrange
    render(<InputNumber setValue={mockSetValue} />)
    const input = screen.getByRole<HTMLInputElement>('textbox');

    // Act
    await user.type(input, '12.23');

    // Assert
    expect(mockSetValue).toHaveBeenCalledWith(1);
    expect(mockSetValue).toHaveBeenCalledWith(12);
    expect(mockSetValue).toHaveBeenCalledWith(12.2);
    expect(mockSetValue).toHaveBeenCalledWith(12.23);
    expect(input.className).not.toContain('error');
  })

  it('when user types in non number, then setValue is never called and input has error class', async () => {
    // Arrange
    render(<InputNumber setValue={mockSetValue} />)
    const input = screen.getByRole<HTMLInputElement>('textbox');

    // Act
    await user.type(input, 'abcde');

    // Assert
    expect(mockSetValue).not.toHaveBeenCalled();
    expect(input.className).toContain('error');
  })

  it('when user types in number then non numbers then backspaces, then setValue is called for the numbers', async () => {
    // Arrange
    render(<InputNumber setValue={mockSetValue} />)
    const input = screen.getByRole<HTMLInputElement>('textbox');

    // Act - type number then letters
    await user.type(input, '123abc');
    
    // Assert
    expect(input.className).toContain('error');
    
    // Arrange - clear mock
    vi.resetAllMocks();
    
    // Act - backspaces so only numbers remain
    for (var i=0; i<3; i++) {
      await user.type(input, '{backspace}');
    }

    // Assert
    expect(mockSetValue).toHaveBeenCalledWith(123);
    expect(input.className).not.toContain('error');
  })

  it('when user types in number then fully backspaces, then setValue is called with 0', async () => {
    // Arrange
    render(<InputNumber setValue={mockSetValue} />)
    const input = screen.getByRole<HTMLInputElement>('textbox');

    // Act
    await user.type(input, '1');
    await user.type(input, '{backspace}');

    // Assert
    expect(mockSetValue).toHaveBeenCalledWith(0);
    expect(input.className).not.toContain('error');
  })
})