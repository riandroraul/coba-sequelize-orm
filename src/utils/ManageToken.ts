import jwt from "jsonwebtoken";

const generateToken = (data: any, secretKey: string, expired: any) => {
  return jwt.sign(data, secretKey, { expiresIn: expired });
};

const verifyToken = (token: string, secretKey: string) => {
  return jwt.verify(token, secretKey);
};

export default { generateToken, verifyToken };
