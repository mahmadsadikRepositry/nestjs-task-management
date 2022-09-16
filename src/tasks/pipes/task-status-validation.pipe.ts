import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../tas-status.enum';

export class TaskStausValidationPipe implements PipeTransform {
  readonly allowedSatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
  transform(value: any, metadata: ArgumentMetadata) {
    let status = value;
    if (!this.isStatusValid(status.toUpperCase())) {
      throw new BadRequestException(`${value} is not valid Status`);
      return;
    }
    return value.toUpperCase();
  }

  private isStatusValid(status) {
    const index = this.allowedSatus.indexOf(status);
    return index !== -1;
  }
}
