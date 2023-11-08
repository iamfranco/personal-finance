const toCurrencyFormat = (num: number): string => {
  return num.toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

const getNumberShortString = (num: number): string => {
  if (num >= 1000000000 || num <= -1000000000 ) {
    return num / 1e9 + 'B';
  } else if (num >= 1000000 || num <= -1000000) {
    return num / 1e6 + 'M';
  } else  if (num >= 1000 || num <= -1000) {
    return num / 1e3 + 'K';
  }
  return num.toString();
}

export class numberDisplayService {
  public static toCurrencyFormat = toCurrencyFormat
  public static getNumberShortString = getNumberShortString
}