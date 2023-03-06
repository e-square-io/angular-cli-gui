export function getParentPath(path: string): string {
  const pathParts = path.split('/');
  return pathParts.slice(0, pathParts.length - 1).join('/');
}
