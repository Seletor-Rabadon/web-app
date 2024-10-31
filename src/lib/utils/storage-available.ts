export function localStorageAvailable() {
  try {
    const key = '__some_random_key_you_are_not_going_to_use__';
    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}

export function localStorageGetItem<T>(key: string, defaultValue = ''): string {
  const storageAvailable = localStorageAvailable();

  let value;

  if (storageAvailable) {
    value = localStorage.getItem(key) || defaultValue;
  }

  return value || defaultValue;
}

export function localStorageSetItem(key: string, value: string) {
  const storageAvailable = localStorageAvailable();

  if (storageAvailable) {
    localStorage.setItem(key, value);
  }
}
