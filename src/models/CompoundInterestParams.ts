import { RegularPayInPeriod } from "./RegularPayInPeriod";

export interface CompoundInterestParams {
  principal: number,
  regularPayIns: number,
  regularPayInPeriod: RegularPayInPeriod,
  duration: number,
  interestRate: number
}