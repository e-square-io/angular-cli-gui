export function stringToArray(str: string): string[] {
  return str.split('\n').filter(s => !!s?.length);
}
