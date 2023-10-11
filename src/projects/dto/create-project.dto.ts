export class CreateProjectDto {
  name: string;

  description: string;

  started_at: Date | null;

  due_at: Date | null;
}
