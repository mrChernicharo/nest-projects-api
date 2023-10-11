import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
// import { ProjectsController } from './projects.controller';
import { ProjectsWithUseCasesController } from './projects-with-use-cases.controller';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { FindAllProjectsUseCase } from './use-cases/find-all-projects.use-case';
import { FindProjectUseCase } from './use-cases/find-project.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsWithUseCasesController],
  providers: [ProjectsService, CreateProjectUseCase, FindAllProjectsUseCase, FindProjectUseCase],
})
export class ProjectsModule {}
