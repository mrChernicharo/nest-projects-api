// @Controller() && @Get() // route => "/"
// @Controller() && @Get('test') // route => "/test"
// @Controller('prefix') && @Get('test') // route => "/prefix/test"

some nest CLI commands

```bash
nest generate module projects

nest generate service projects

# generate module + service + entities + DTOs
nest generate resource projects

```

installing typeorm and sqlite driver

```bash
npm i typeorm @nestjs/typeorm
npm i sqlite3 --save
```
