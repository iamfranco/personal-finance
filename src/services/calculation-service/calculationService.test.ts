import { describe, expect, it } from "vitest";
import { CompoundInterestParams } from "../../models/CompoundInterestParams";
import { RegularPayInPeriod } from "../../models/RegularPayInPeriod";
import { calculationService } from "./calculationService";

interface InputOutput {
  input: CompoundInterestParams,
  compoundInterests: number[],
  contributions: number[]
}

describe('calculationService', () => {
  describe('.getCompoundInterest', () => {
    it('given full inputs, then return correct answer', () => {
      // Arrange
      const expectedInputOutputs: InputOutput[] = [
        {
          input: {
            principal: 1000,
            regularPayIns: 0,
            regularPayInPeriod: RegularPayInPeriod.Monthly,
            duration: 5,
            interestRate: 5
          },
          compoundInterests: [1000, 1050, 1102.50, 1157.63, 1215.51, 1276.28],
          contributions: [1000, 1000, 1000, 1000, 1000, 1000]
        },
        {
          input: {
            principal: 0,
            regularPayIns: 750,
            regularPayInPeriod: RegularPayInPeriod.Monthly,
            duration: 7,
            interestRate: 4
          },
          compoundInterests: [0, 9000, 18360, 28094.4, 38218.18, 48746.9, 59696.78, 71084.65],
          contributions: [0, 9000, 18000, 27000, 36000, 45000, 54000, 63000]
        },
        {
          input: {
            principal: 2000,
            regularPayIns: 550,
            regularPayInPeriod: RegularPayInPeriod.Monthly,
            duration: 6,
            interestRate: 5.5
          },
          compoundInterests: [2000, 8710, 15789.05, 23257.45, 31136.61, 39449.12, 48218.82],
          contributions: [2000, 8600, 15200, 21800, 28400, 35000, 41600]
        },
        {
          input: {
            principal: 0,
            regularPayIns: 50,
            regularPayInPeriod: RegularPayInPeriod.BiWeekly,
            duration: 4,
            interestRate: 10
          },
          compoundInterests: [0, 1300, 2730, 4303, 6033.3],
          contributions: [0, 1300, 2600, 3900, 5200]
        }
      ];

      expectedInputOutputs.forEach(expectedInputOutput => {
        // Act
        const totalCompound = calculationService.getCompoundInterest(expectedInputOutput.input);
        const totalContribution = calculationService.getTotalContribution(expectedInputOutput.input);

        // Assert
        expect(totalCompound).toEqual(expectedInputOutput.compoundInterests);
        expect(totalContribution).toEqual(expectedInputOutput.contributions);
      });
    })
  })
})