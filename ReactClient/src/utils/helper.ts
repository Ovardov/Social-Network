export const buildUrl = (...paths: string[]): string => {
  const filteredPaths = paths.filter((path) => path !== '');
  
  return '/' + filteredPaths.join('/')
}
