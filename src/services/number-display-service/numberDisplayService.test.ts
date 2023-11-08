import { describe, expect, it } from "vitest";
import { numberDisplayService } from "./numberDisplayService";

describe('numberDisplayService', () => {
  describe('getNumberWithCommas', () => {
    it('given 123, then return 123', () => {
      expect(numberDisplayService.toCurrencyFormat(123)).toBe('123.00');
    })

    it('given 12345, then return 12,345', () => {
      expect(numberDisplayService.toCurrencyFormat(12345)).toBe('12,345.00');
    })

    it('given 1234567890123, then return 1,234,567,890,123.00', () => {
      expect(numberDisplayService.toCurrencyFormat(1234567890123)).toBe('1,234,567,890,123.00');
    })
  })

  describe('getNumberShortString', () => {
    it('given 150, then return 150', () => {
      expect(numberDisplayService.getNumberShortString(150)).toBe('150');
    })

    it('given 1500, then return 1.5K', () => {
      expect(numberDisplayService.getNumberShortString(1500)).toBe('1.5K');
    })

    it('given 3000, then return 3K', () => {
      expect(numberDisplayService.getNumberShortString(3000)).toBe('3K');
    })

    it('given 35000, then return 35K', () => {
      expect(numberDisplayService.getNumberShortString(35000)).toBe('35K');
    })

    it('given 1240000, then return 1.24M', () => {
      expect(numberDisplayService.getNumberShortString(1240000)).toBe('1.24M');
    })

    it('given 12400000000, then return 12.4B', () => {
      expect(numberDisplayService.getNumberShortString(12400000000)).toBe('12.4B');
    })
  })
})