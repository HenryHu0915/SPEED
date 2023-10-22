/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getCustomGreeting(): string {
    return 'Wellcome';
  }
}
