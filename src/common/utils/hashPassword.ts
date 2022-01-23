import { hash } from 'bcrypt';

const saltRoundsUsedToGeneratePasswords = 12;

const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await new Promise((resolve, reject) => {
      hash(password, saltRoundsUsedToGeneratePasswords, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });

    return String(hashedPassword);
  } catch (error) {
    return '';
  }
};

export { hashPassword };
