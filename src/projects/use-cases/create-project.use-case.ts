import { Repository } from 'typeorm';
import { Project, ProjectStatus } from '../entities/project.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @InjectRepository(Project)
    private readonly projRepo: Repository<Project>,
  ) {}

  execute(input: CreateProjectDto) {
    const project = new Project(input);

    if (input.started_at) {
      project.status = ProjectStatus.Active;
    }

    return this.projRepo.save(project);
  }
}
