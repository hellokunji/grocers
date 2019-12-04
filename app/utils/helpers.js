export function isDataValid(data) {
  let isValid = false;
  if (data !== undefined && data !== null) isValid = true;
  return isValid;
}

export function formatErrorMsg(type, title = '', description = '') {
  return {
    show: true,
    type,
    content: {
      title,
      description
    },
  }
}
