import { HttpStatus } from '@nestjs/common';

export class HttpException extends Error {
  constructor(message: string, httpStatus: HttpStatus) {
    super(`${message}: ${httpStatus}`);
    this.name = 'HttpException';
  }
}
