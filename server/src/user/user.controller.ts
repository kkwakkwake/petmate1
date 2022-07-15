import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Res,
  Req,
  Response,
  InternalServerErrorException,
  Delete,
} from '@nestjs/common';
import { GoogleAuthGuard } from 'src/auth/google/google-auth.guard';
import { KakaoAuthGuard } from 'src/auth/kakao/kakao-auth.guard';
import { LocalAuthGuard } from 'src/auth/local/local-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('nickname-check')
  async checkNickname(@Body() data: { nickname: string }) {
    return await this.userService.checkNickname(data.nickname);
  }

  @Post('email-check')
  async emailCheck(@Body() data: { email: string }) {
    return await this.userService.checkEmail(data.email);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: UserEntity) {
    return user;
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin(@Req() req) {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback(@Req() req, @Res() res) {
    return this.userService.googleLoginCallback(req, res);
  }

  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin(@Req() req) {}

  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoLoginCallback(@Req() req, @Res() res) {
    return this.userService.kakaoLoginCallback(req, res);
  }

  @Get('logout')
  async logout(@Response() response) {
    try {
      response.clearCookie('connect.sid', { httpOnly: true });
      return response.send({
        success: true,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @Get('posts')
  async getMyPosts(@User() user: UserEntity) {
    return await this.userService.getMyPosts(user.id);
  }

  @Get('liked-posts')
  async getLikedPosts(@User() user: UserEntity) {
    return await this.userService.getLikedPosts(user.id);
  }

  @Get('commented-posts')
  async getCommentedPosts(@User() user: UserEntity) {
    return await this.userService.getCommentedPosts(user.id);
  }

  @Delete('signout')
  async signout(@User() user: UserEntity) {
    return await this.userService.signout(user.id);
  }

  @Get('session')
  async isLoggedIn(@User() user: UserEntity, @Req() req) {
    console.log(user);
    console.log(req.session);
  }
}
