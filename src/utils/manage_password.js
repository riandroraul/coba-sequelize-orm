import bcrypt from "bcrypt";

const hashingPassword = async (plaintext) => {
  const hash = await bcrypt.hash(plaintext, 10);
  return hash;
};

const comparePassword = async (plaintext, hashed) => {
  const result = await bcrypt.compare(plaintext, hashed);
  return result;
};

export default { hashingPassword, comparePassword };
