const charactersUsedToGenerateRandomStrings =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersUsedToGenerateRandomStringsLength =
  charactersUsedToGenerateRandomStrings.length;

const generateRandomString = (length = 10): string => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charactersUsedToGenerateRandomStrings.charAt(
      Math.floor(Math.random() * charactersUsedToGenerateRandomStringsLength),
    );
  }
  return result;
};

export { generateRandomString };
