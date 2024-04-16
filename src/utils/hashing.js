import bcrypt from "bcrypt";

function VerifyHashedPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

export { VerifyHashedPassword };
