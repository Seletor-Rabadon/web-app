export function searchStr(strArray: string[], filter: string): boolean {
  return strArray.some((str) =>
    str?.toLowerCase().includes(filter.toLowerCase())
  );
}

export const debounce = (fn: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
