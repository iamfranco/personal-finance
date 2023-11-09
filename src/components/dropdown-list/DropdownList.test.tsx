import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import DropdownList from "./DropdownList";
import { RegularPayInPeriod } from "../../models/RegularPayInPeriod";
import userEvent from "@testing-library/user-event";

const mockSetValue = vi.fn();

describe('DropdownList component', () => {
  const user = userEvent.setup();
  
  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  })

  it('renders with correct current value', () => {
    // Arrange 
    const currentValue = RegularPayInPeriod.Monthly;
    const possibleValues = Object.values(RegularPayInPeriod);

    // Act
    render(<DropdownList 
      currentValue={currentValue}
      possibleValues={possibleValues}
      setValue={mockSetValue} />)

    // Assert
    const dropdown = screen.getByRole<HTMLInputElement>('combobox');
    expect(dropdown.value).toBe(currentValue);
  })
  
  it('renders dropdown list with correct possible values', () => {
    // Arrange 
    const currentValue = RegularPayInPeriod.Monthly;
    const possibleValues = Object.values(RegularPayInPeriod);

    // Act
    render(<DropdownList 
      currentValue={currentValue}
      possibleValues={possibleValues}
      setValue={mockSetValue} />)

    // Assert
    const dropdown = screen.getByRole('combobox');
    possibleValues.forEach(value => {
      within(dropdown).getByRole('option', {name: value});
    })
  })

  it('if current value is not in possible values, then current value is first possible value, and setValue is called with first possible value', () => {
    // Arrange 
    const currentValue = RegularPayInPeriod.Yearly;
    const possibleValues = [
      RegularPayInPeriod.Weekly,
      RegularPayInPeriod.Monthly
    ];

    // Act
    render(<DropdownList 
      currentValue={currentValue}
      possibleValues={possibleValues}
      setValue={mockSetValue} />)

    // Assert
    const dropdown = screen.getByRole<HTMLInputElement>('combobox');
    expect(dropdown.value).toBe(RegularPayInPeriod.Weekly);
    expect(mockSetValue).toHaveBeenCalledWith(possibleValues[0]);
  })

  it('when user re-selects option, then call setValue is called with new selected value', async () => {
    // Arrange 
    const currentValue = RegularPayInPeriod.Monthly;
    const possibleValues = Object.values(RegularPayInPeriod);

    render(<DropdownList 
      currentValue={currentValue}
      possibleValues={possibleValues}
      setValue={mockSetValue} />)

    const newValue = RegularPayInPeriod.BiWeekly;

    // Act
    const dropdown = screen.getByRole<HTMLInputElement>('combobox');
    await user.selectOptions(dropdown, screen.getByText(newValue));

    // Assert
    expect(mockSetValue).toHaveBeenCalledWith(newValue);
  })
})