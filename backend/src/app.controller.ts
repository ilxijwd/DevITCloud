import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/api')
  async apiCall(@Body('index') index: string): Promise<string> {
    await this.appService.doNothing(); // random delay before sending a response: from 1ms to 1000ms
    return index; // successful response data is an index from a request body
  }
}
