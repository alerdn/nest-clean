import { Module } from "@nestjs/common";

import { PrismaService } from "./prisma/prisma.service";
import { ConfigModule } from "@nestjs/config";
import { CreateAccountController } from "./controllers/create-account.controller";
import { envSchema } from "./env";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
  ],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}
