export const apiOrigin = () => {
  return window.origin;
};

export const apiConfig = version => {
  return `${window.origin}/api/${version}`
};
