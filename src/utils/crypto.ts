import { AES, enc, lib } from "crypto-js";

const secret: string = process.env.REACT_APP_SECRET_KEY || "";

export const decode = (message: lib.CipherParams | string): string => {
  const bytes = AES.decrypt(message, secret);

  return bytes.toString(enc.Utf8);
};
