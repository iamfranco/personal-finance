import { cleanup, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CompoundInterestCalculator from "./CompoundInterestCalculator";
import userEvent from "@testing-library/user-event";
import { InputLabel } from "../../models/InputLabel";
import { calculationService } from "../../services/calculation-service/calculationService";
import { RegularPayInPeriod } from "../../models/RegularPayInPeriod";
import { CompoundInterestParams } from "../../models/CompoundInterestParams";

const getInputByLabel = (label: string) => {
  const inputLabel = screen.getByText(label);
  
  const input = within(inputLabel.parentElement!).getByRole('textbox');
  return input;
}

const getDropdownByOption = (option: RegularPayInPeriod) => {
  const item = screen.getByText(option);
  return item;
}

describe('CompoundInterestCalculator component', () => {
  const user = userEvent.setup();

  const inputLabels : string[] = [
    InputLabel.Principal,
    InputLabel.RegularPayIns,
    InputLabel.Duration,
    InputLabel.InterestRate
  ];

  beforeEach(() => {
    cleanup();
  })

  it('renders the 4 inputs', () => {
    // Arrange Act
    render(<CompoundInterestCalculator />);

    // Assert
    inputLabels.forEach(x => {
      expect(getInputByLabel(x)).not.toBeNull();
    })
  })
  
  it('when all input fields populated, then correct total fields should be displayed', async () => {
    // Arrange
    render(<CompoundInterestCalculator />);
    const compoundInterestParams: CompoundInterestParams = {
      principal: 1000,
      regularPayIns: 750,
      regularPayInPeriod: RegularPayInPeriod.Monthly,
      duration: 40,
      interestRate: 7.5,
    }

    const compoundTotal = 1234567;
    const flatTotal = 1234500;
    const getCompoundInterestSpy = vi.spyOn(calculationService, 'getCompoundInterest')
      .mockReturnValue([0, 0, compoundTotal]);

    const getTotalContributionSpy = vi.spyOn(calculationService, 'getTotalContribution')
      .mockReturnValue([0, 0, flatTotal]);

    // Act
    await user.type(getInputByLabel(InputLabel.Principal), compoundInterestParams.principal.toString());
    await user.type(getInputByLabel(InputLabel.RegularPayIns), compoundInterestParams.regularPayIns.toString());
    await user.click(getDropdownByOption(compoundInterestParams.regularPayInPeriod));
    await user.type(getInputByLabel(InputLabel.Duration), compoundInterestParams.duration.toString());
    await user.type(getInputByLabel(InputLabel.InterestRate), compoundInterestParams.interestRate.toString());

    // Assert
    expect(getCompoundInterestSpy).toHaveBeenCalledWith(compoundInterestParams);
    expect(screen.getByText(compoundTotal)).not.toBeNull();

    expect(getTotalContributionSpy).toHaveBeenCalledWith(compoundInterestParams);
    expect(screen.getByText(flatTotal)).not.toBeNull();
  })
})