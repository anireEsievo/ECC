import { Request } from 'express';

// interface for request after logged in user properties have been added it it
export interface ProtectedRequest extends Request {
  user: {
    sub: string;
    userName: string;
  };
}
