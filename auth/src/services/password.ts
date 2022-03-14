import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

// returned a promise instead
const scyrptAsync = promisify(scrypt);

export class Password {
  // hash password
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scyrptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  // compare inputted password with one stored in db
  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scyrptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword
  }
}
