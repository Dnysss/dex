import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCard } from './dtos/create-card.dto';
import { CardEntity } from './entities/card.entity';
import { TaskService } from 'src/task/task.service';
import { UpdateCard } from './dtos/update-card.dto';
import { ReturnCard } from './dtos/return-card.dto';
import { CountTask } from 'src/task/dtos/count-task.dto';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(CardEntity)
        private readonly cardRepository: Repository<CardEntity>,

        @Inject(forwardRef((() => TaskService)))
        private readonly taskService: TaskService
    ) {}

    // Método auxiliar para encontrar a quantidade de cards nas tasks
    findAmountCardInTasks(card: CardEntity, countList: CountTask[]): number {
        const count = countList.find((itemCount) => itemCount.card_id === card.id);

        if (count) {
            return count.total;
        }

        return 0;
    }
    // Método para obter todas as categorias com a quantidade de produtos em cada uma
    async findAllCards(): Promise<ReturnCard[]> {
        const cards = await this.cardRepository.find();

        const count = await this.taskService.countTasksByCard();

        if (!cards || cards.length === 0) {
            throw new NotFoundException('Cards empty');
        }
        // Mapeia os cards para objetos ReturnCard incluindo a quantidade de produtos
        return cards.map((card) => new ReturnCard(card, this.findAmountCardInTasks(card, count)));
    }
    // Método para encontrar uma categoria por ID, com ou sem relações
    async findCardById(cardId: number, isRelations?: boolean): Promise<CardEntity> {
        const relations = isRelations ? {
            tasks: true,
        } : undefined

        const card = await this.cardRepository.findOne({
            where: {
                id: cardId
            }, relations
        })

        if (!card) {
            throw new NotFoundException(`Id do card: '${cardId}' não foi encontrado`)
        }

        return card;
    }

    // Método para encontrar uma categoria pelo nome
    async findCardByName(name: string): Promise<CardEntity> {
        const card = await this.cardRepository.findOne({
            where: {
                name
            }// Método auxiliar para encontrar a quantidade de categorias em produtos
        });

        if (!card) {
            throw new NotFoundException(`Nome do card '${name}' não encontrado`)
        }

        return card;
    }
    // Método para criar uma nova categoria
    async createCard(userId: number ,createCard: CreateCard): Promise<CardEntity> {
        // Verifica se a categoria com o mesmo nome já existe
        const card = await this.findCardByName(createCard.name).catch(() => (undefined));

        if (card) {
            throw new BadRequestException(`Nome do card '${createCard.name}' já existe`)
        }
        // Cria uma nova instância de CardEntity
        const newCard = this.cardRepository.create({
            ...createCard,
            userId,
        });
        // Salva a novo card no banco de dados
        return this.cardRepository.save(newCard);
    }

     // Método para deletar uma categoria por ID
    async deleteCard(cardId: number): Promise<DeleteResult> {
        const card = await this.findCardById(cardId, true);
        // Verifica se a categoria tem produtos associados antes de deletar
        if (card.tasks?.length > 0) {
            throw new BadRequestException('Categoria com produtos')
        }
        // Deleta a categoria do banco de dados
        return this.cardRepository.delete({ id: cardId })
    }

    // Método para editar uma categoria por ID
    async editCard(cardId: number, updateCard: UpdateCard ): Promise<CardEntity> {
        const card = await this.findCardById(cardId);

        return this.cardRepository.save({
            ...card,
            ...updateCard,
        })
    }
}