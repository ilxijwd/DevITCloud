import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async doNothing(): Promise<void> {
    await new Promise((r) => setTimeout(r, Math.floor(Math.random() * 1001)));
  }
}
