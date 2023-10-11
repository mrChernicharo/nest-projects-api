import { Controller, Post, Body, Get, Param /*, Delete */, Inject } from '@nestjs/common';
// import { ProjectsService } from './projects.service';
// import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { FindAllProjectsUseCase } from './use-cases/find-all-projects.use-case';
import { FindProjectUseCase } from './use-cases/find-project.use-case';
import { StartProjectDto } from './dto/start-project.dto';
import { StartProjectUseCase } from './use-cases/start-project.use-case';

@Controller('projects')
export class ProjectsWithUseCasesController {
  @Inject(CreateProjectUseCase) private readonly createProjectUseCase: CreateProjectUseCase;
  @Inject(FindAllProjectsUseCase) private readonly findAllProjectsUseCase: FindAllProjectsUseCase;
  @Inject(FindProjectUseCase) private readonly findProjectUseCase: FindProjectUseCase;
  @Inject(StartProjectUseCase) private readonly startProjectUseCase: StartProjectUseCase;

  @Get()
  findAll() {
    return this.findAllProjectsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findProjectUseCase.execute(id);
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.createProjectUseCase.execute(createProjectDto);
  }

  @Post(':id/start')
  start(@Param('id') id: string, @Body() updateProjectDto: StartProjectDto) {
    return this.startProjectUseCase.execute(id, updateProjectDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectsService.remove(id);
  // }
}
