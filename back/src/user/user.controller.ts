import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

import { AddFriendDTO } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';


@Controller('user')
export class UserController {
  constructor(
      private userService: UserService,
  ) {
  }

  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('add-friend')
  addFriend(@Body() data: AddFriendDTO) {
    return this.userService.addFriend(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.userService.update(id);
  }

}
