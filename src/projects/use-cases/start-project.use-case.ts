import { Repository } from 'typeorm';
import { Project, ProjectStatus } from '../entities/project.entity';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StartProjectDto } from '../dto/start-project.dto';

@Injectable()
export class StartProjectUseCase {
  constructor(
    @InjectRepository(Project)
    private readonly projRepo: Repository<Project>,
  ) {}

  async execute(id: string, input: StartProjectDto) {
    const project = await this.projRepo.findOneOrFail({ where: { id } });

    if (project.status === ProjectStatus.Active) {
      throw Error('Cannot start an activated project');
    }
    if (project.status === ProjectStatus.Completed) {
      throw Error('Cannot start a completed project');
    }
    if (project.status === ProjectStatus.Canceled) {
      throw Error('Cannot start a canceled project');
    }

    project.started_at = input.started_at;
    project.status = ProjectStatus.Active;

    return this.projRepo.save(project);
  }
}
