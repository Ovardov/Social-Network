export const buildUrl = (...paths) => {
  const filteredPaths = paths.filter((path) => path !== '');
  
  return '/' + filteredPaths.join('/')
}
