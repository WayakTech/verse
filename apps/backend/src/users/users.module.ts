import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ReadingHistory } from './entities/reading-history.entity';
import { FavoriteBook } from './entities/favorite-book.entity';
import { UserPreference } from './entities/user-preference.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, ReadingHistory, FavoriteBook, UserPreference]), forwardRef(() => AuthModule)],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}