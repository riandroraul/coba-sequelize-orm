import bcrypt from "bcrypt";

const hashingPassword = async (plaintext: string) => {
  const hash = await bcrypt.hash(plaintext, 10);
  return hash;
};

const comparePassword = async (plaintext: string, hashed: any) => {
  const result = await bcrypt.compare(plaintext, hashed);
  return result;
};

export { hashingPassword, comparePassword };
