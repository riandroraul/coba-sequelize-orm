import bcrypt from "bcrypt";

const hashingPassword = async (plaintext: string) => {
  const hash = await bcrypt.hash(plaintext, 10);
  return hash;
};

const comparePassword = async (plaintext: string, hashed: any) => {
  const result = await bcrypt.compare(plaintext, hashed);
  return result;
};

// comparePassword(
//   "admin123",
//   "$2b$10$FLWyOqDHWM/osfHDO/6yWeei9B90O/gjk0PbQxJmmsMKiNUmQGodi"
// ).then((res) => console.log(res));

export { hashingPassword, comparePassword };
