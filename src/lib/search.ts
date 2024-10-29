export function searchStr(strArray: string[], filter: string): boolean {
  return strArray.some((str) => str?.toLowerCase().includes(filter.toLowerCase()));
}
