import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { Roles } from '../decorators/roles.decorator';
  import { UserType } from '../user/enum/user-type.enum';
  import { DeleteResult } from 'typeorm';
import { ReturnCard } from './dtos/return-card.dto';
import { CardService } from './card.service';
import { CreateCard } from './dtos/create-card.dto';
import { CardEntity } from './entities/card.entity';
import { UpdateCard } from './dtos/update-card.dto';
import { UserId } from 'src/decorators/user-id.decorator';
  
  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Controller('card')
  export class CardController {
    constructor(private readonly cardService: CardService) {}
  
    @Get()
    async findAllCards(): Promise<ReturnCard[]> {
      return this.cardService.findAllCards();
    }
  
    @Roles(UserType.Admin, UserType.Root, UserType.User)
    @UsePipes(ValidationPipe)
    @Post()
    async createCard(
      @Body() createCard: CreateCard, @UserId() userId: number
    ): Promise<CardEntity> {
      return this.cardService.createCard(userId, createCard);
    }
  
    @Roles(UserType.Admin, UserType.Root, UserType.User)
    @Delete(':cardId')
    async deleteCard(
      @Param('cardId') cardId: number,
    ): Promise<DeleteResult> {
      return this.cardService.deleteCard(cardId);
    }
  
    @Roles(UserType.Admin, UserType.Root, UserType.User)
    @UsePipes(ValidationPipe)
    @Put('/:cardId')
    async editCard(
      @Param('cardId') cardId: number,
      @Body() updateCard: UpdateCard,
    ): Promise<CardEntity> {
      return this.cardService.editCard(cardId, updateCard);
    }
  
    @Get('/:cardId')
    async findCardById(
      @Param('cardId') cardId: number,
    ): Promise<ReturnCard> {
      return new ReturnCard(await this.cardService.findCardById(cardId, true))
    }
  }