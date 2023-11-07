import { CompoundInterestParams } from "../../models/CompoundInterestParams";
import { RegularPayInPeriod } from "../../models/RegularPayInPeriod";

const getCompoundInterest = (compoundInterestParams: CompoundInterestParams): number[] => {
  var payInPeriodMultiplier = getPayInPeriodMultiplier(compoundInterestParams.regularPayInPeriod);
  
  var factor = 1 + compoundInterestParams.interestRate/100;
  
  const n = compoundInterestParams.duration;

  var result = [];
  var runningTotal = compoundInterestParams.principal;
  for (var i=0; i <= n; i++) {
    result.push(roundToDecimalPlace(runningTotal, 2));

    runningTotal *= factor;
    runningTotal += compoundInterestParams.regularPayIns * payInPeriodMultiplier;
  }

  return result;
}

const getTotalContribution = (compoundInterestParams: CompoundInterestParams): number[] => {
  var payInPeriodMultiplier = getPayInPeriodMultiplier(compoundInterestParams.regularPayInPeriod);
  
  const n = compoundInterestParams.duration;

  var result = [];
  var runningTotal = compoundInterestParams.principal;
  for (var i=0; i<=n; i++) {
    result.push(roundToDecimalPlace(runningTotal, 2));
    runningTotal += compoundInterestParams.regularPayIns * payInPeriodMultiplier;
  }

  return result;
}

const getPayInPeriodMultiplier = (period: RegularPayInPeriod) => {
  if (period == RegularPayInPeriod.Yearly) return 1;
  if (period == RegularPayInPeriod.Monthly) return 12;
  if (period == RegularPayInPeriod.BiWeekly) return 26;
  if (period == RegularPayInPeriod.Weekly) return 52;
  return 0;
} 

const roundToDecimalPlace = (num: number, dp: number) => {
  const factor = 10 ** dp;
  return Math.round(num * factor) / factor;
}

export class calculationService {
  public static getCompoundInterest = getCompoundInterest
  public static getTotalContribution = getTotalContribution
}