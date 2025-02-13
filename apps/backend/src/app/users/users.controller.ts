import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CreateFavoriteBookDto } from './dto/create-favorite-book.dto';
import { VerifySelfOrAdminGuard } from '../auth/guards/self-or-admin.guard';
import { CreateReadingHistoryDto } from './dto/create-reading-history.dto';
import { CreateUserPreferencesDto } from './dto/create-user-preferences.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AdminGuard)
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.usersService.findAll(paginationDto);
  }

  // Favorite books controllers
  @Get(':userId/favorite-books')
  @UseGuards(VerifySelfOrAdminGuard)
  async getFavoriteBooks(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() paginationDto: PaginationDto
  ) {
    return await this.usersService.getFavoriteBooks(userId, paginationDto);
  }

  @Post(':userId/favorite-books')
  @UseGuards(VerifySelfOrAdminGuard)
  async addFavoriteBook(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createFavoriteBookDto: CreateFavoriteBookDto
  ) {
    return this.usersService.addFavoriteBook(userId, createFavoriteBookDto);
  }

  @Delete(':userId/favorite-books/:favoriteBookId')
  @UseGuards(VerifySelfOrAdminGuard)
  async removeFavoriteBook(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('favoriteBookId') favoriteBookId: string
  ) {
    await this.usersService.removeFavoriteBook(userId, favoriteBookId);
    return { message: 'Favorite book removed successfully' };
  }

  // Reading history controllers
  @Get(':userId/reading-history')
  @UseGuards(VerifySelfOrAdminGuard)
  async getReadingHistory(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() paginationDto: PaginationDto
  ) {
    return this.usersService.getReadingHistory(userId, paginationDto);
  }

  @Post(':userId/reading-history')
  @UseGuards(VerifySelfOrAdminGuard)
  async addReadingHistory(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createReadingHistoryDto: CreateReadingHistoryDto
  ) {
    return this.usersService.addReadingHistory(userId, createReadingHistoryDto);
  }

  @Delete(':userId/reading-history/:bookId')
  @UseGuards(VerifySelfOrAdminGuard)
  async removeReadingHistory(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('bookId') bookId: string
  ) {
    await this.usersService.removeReadingHistory(userId, bookId);
    return { message: 'Reading history removed successfully' };
  }

  // User Preferences controllers
  @Get(':userId/preferences')
  @UseGuards(VerifySelfOrAdminGuard)
  async getPreferences(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() paginationDto: PaginationDto
  ) {
    return this.usersService.getPreferences(userId, paginationDto);
  }

  @Post(':userId/preferences')
  @UseGuards(VerifySelfOrAdminGuard)
  async setPreferences(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createUserPreferenceDto: CreateUserPreferencesDto,
  ) {
    return this.usersService.setPreferences(userId, createUserPreferenceDto);
  }

  @Delete(':userId/preferences/:preferencesId')
  @UseGuards(VerifySelfOrAdminGuard)
  async removePreference(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('preferencesId', ParseIntPipe) preferencesId: number
  ) {
    await this.usersService.removePreference(userId, preferencesId);
    return { message: 'Preference removed successfully' };
  }

  @Delete(':userId/preferences')
  @UseGuards(VerifySelfOrAdminGuard)
  async resetPreferences(@Param('userId', ParseIntPipe) userId: number) {
    await this.usersService.resetPreferences(userId);
    return { message: 'Preferences reset successfully' };
  }
}
