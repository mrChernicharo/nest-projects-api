import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';

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

    project.start(input.started_at);

    return this.projRepo.save(project);
  }
}
