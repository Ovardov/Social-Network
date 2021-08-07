export const buildUrl = (...paths: string[]): string => {
  const filteredPaths = paths.filter((path) => path !== '');
  
  return '/' + filteredPaths.join('/');
};

export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);