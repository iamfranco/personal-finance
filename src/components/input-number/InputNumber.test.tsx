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
    const input = screen.getByRole<HTMLInputElement>('spinbutton');

    // Act
    await user.type(input, '12.23');

    // Assert
    expect(mockSetValue).toHaveBeenCalledWith(1);
    expect(mockSetValue).toHaveBeenCalledWith(12);
    expect(mockSetValue).toHaveBeenCalledWith(12.2);
    expect(mockSetValue).toHaveBeenCalledWith(12.23);
  })

  it('when user types in number then full backspace, then setValue is called with 0', async () => {
    // Arrange
    render(<InputNumber setValue={mockSetValue} />)
    const input = screen.getByRole<HTMLInputElement>('spinbutton');

    // Act - type in numbers
    await user.type(input, '12.3');

    // Assert
    expect(mockSetValue).toHaveBeenCalledWith(1);
    expect(mockSetValue).toHaveBeenCalledWith(12);
    expect(mockSetValue).toHaveBeenCalledWith(12.3);

    vi.resetAllMocks();

    // Act - full backspace
    for (var i=0; i<4; i++) {
      await user.type(input, '{backspace}');
    }

    // Assert
    expect(mockSetValue).toHaveBeenCalledWith(12);
    expect(mockSetValue).toHaveBeenCalledWith(1);
    expect(mockSetValue).toHaveBeenCalledWith(0);
  })

  it('when renders with initialValue, then input value equals initialValue ', () => {
    // Arrange
    const initialValue = 321;
    
    // Act
    render(<InputNumber setValue={mockSetValue} value={initialValue}/>)
    
    // Assert
    const input = screen.getByRole<HTMLInputElement>('spinbutton');
    expect(input.value).toBe(initialValue.toString());
  })
})