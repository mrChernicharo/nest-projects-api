import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project, ProjectStatus } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private projectsRepo: Repository<Project>) {}

  create(createProjectDto: CreateProjectDto) {
    const project = new Project(createProjectDto);

    if (createProjectDto.started_at) {
      project.status = ProjectStatus.Active;
    }

    return this.projectsRepo.save(project);
  }

  findAll() {
    return this.projectsRepo.find();
  }

  findOne(id: string) {
    return this.projectsRepo.findOneOrFail({ where: { id } });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectsRepo.findOneOrFail({ where: { id } });

    updateProjectDto.name && (project.name = updateProjectDto.name);
    updateProjectDto.description && (project.description = updateProjectDto.description);

    if (updateProjectDto.started_at) {
      if (project.status === ProjectStatus.Active) {
        throw Error('Cannot start an activated project');
      }
      if (project.status === ProjectStatus.Completed) {
        throw Error('Cannot start a completed project');
      }
      if (project.status === ProjectStatus.Canceled) {
        throw Error('Cannot start a canceled project');
      }

      project.started_at = updateProjectDto.started_at;
      project.status = ProjectStatus.Active;
    }

    if (updateProjectDto.canceled_at) {
      if (project.status === ProjectStatus.Completed) {
        throw Error('Cannot cancel a completed project');
      }
      if (project.status === ProjectStatus.Canceled) {
        throw Error('Cannot cancel a canceled project');
      }
      if (updateProjectDto.canceled_at < project.started_at) {
        throw Error('Cancel date cannot be smaller than Start date');
      }

      project.canceled_at = updateProjectDto.canceled_at;
      project.status = ProjectStatus.Canceled;
    }

    if (updateProjectDto.completed_at) {
      if (project.status === ProjectStatus.Completed) {
        throw Error('Cannot complete a completed project');
      }
      if (project.status === ProjectStatus.Canceled) {
        throw Error('Cannot complete a canceled project');
      }
      if (updateProjectDto.completed_at < project.started_at) {
        throw Error('Completion date cannot be smaller than Start date');
      }

      project.completed_at = updateProjectDto.completed_at;
      project.status = ProjectStatus.Completed;
    }

    return this.projectsRepo.save(project);
  }

  remove(id: string) {
    return `This action removes a #${id} project`;
  }
}
