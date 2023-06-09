"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const corsOptions = {
    allowedHeaders: ['origin', 'x-requested-with', 'content-type', 'accept', 'authorization'],
    credentials: true,
    origin: ['http://localhost:3000'],
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors(corsOptions);
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map