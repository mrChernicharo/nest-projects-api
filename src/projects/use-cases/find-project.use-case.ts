import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindProjectUseCase {
  constructor(
    @InjectRepository(Project)
    private readonly projRepo: Repository<Project>,
  ) {}

  execute(id: string) {
    return this.projRepo.findOneOrFail({ where: { id } });
  }
}
