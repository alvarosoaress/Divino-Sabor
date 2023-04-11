export const isEmpty = (string) => {
  for (let i = 0; i < string.length; i += 1) {
    if (string.charAt(i) !== ' ') {
      return false;
    }
  }
  return true;
};
