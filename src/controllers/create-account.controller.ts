import { Body, ConflictException, Controller, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/accounts")
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(@Body() body: any) {
    const { name, email, password } = body;

    const sameEmail = await this.prisma.user.findUnique({ where: { email } });
    if (sameEmail) {
      throw new ConflictException("Email already in use");
    }

    await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
