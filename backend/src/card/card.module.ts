import { Module, forwardRef } from '@nestjs/common';
import { CardService } from './card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './entities/card.entity';
import { TaskModule } from 'src/task/task.module';
import { CardController } from './card.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity]), forwardRef(() => TaskModule)],
  providers: [CardService],
  controllers: [CardController],
  exports: [CardService]
})
export class CardModule {}
