import { compare } from 'bcrypt';

const hashCompare = async (password, passwordTarget): Promise<boolean> => {
  try {
    const isMatch = await new Promise((resolve, reject) => {
      compare(password, passwordTarget, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });

    return isMatch === true;
  } catch (error) {
    return Promise.resolve(false);
  }
};

export { hashCompare };
