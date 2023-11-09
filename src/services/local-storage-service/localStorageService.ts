function getItem<T>(key: string, defaultValue: T): T {
  const stringValue = localStorage.getItem(key);
  if (stringValue == null) return defaultValue;

  const parsedValue = JSON.parse(stringValue) as T;
  return parsedValue;
}

export class localStorageService {
  public static getItem = getItem
}