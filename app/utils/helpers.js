export function isDataValid(data) {
  let isValid = false;
  if (data !== undefined && data !== null) isValid = true;
  return isValid;
}
