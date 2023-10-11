import { PartialType } from '@nestjs/mapped-types';

class _UpdateProjectDto {
  name: string;

  description: string;

  started_at: Date | null;

  canceled_at: Date | null;

  completed_at: Date | null;

  due_at: Date | null;
}

export class UpdateProjectDto extends PartialType(_UpdateProjectDto) {}
