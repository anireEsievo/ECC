import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

// this class exposes methods that are used to hash the users password
// hashing is an irreversible algorithm hence the verify method compares by creating a hash out of the new value to compare
@Injectable()
export class PasswordService {
  async hashPassword(password: string) {
    const saltOrRounds = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async comparePassword(password: string, hash: string) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
}
