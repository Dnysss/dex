import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInCategory1706015743262 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            INSERT INTO category("id", "name", "icon") VALUES (1, 'Trabalho', 'work');
            INSERT INTO category("id", "name", "icon") VALUES (2, 'Pessoal', 'personal');
            INSERT INTO category("id", "name", "icon") VALUES (3, 'Finanças', 'finances');
            INSERT INTO category("id", "name", "icon") VALUES (4, 'Alimentação', 'food');
            INSERT INTO category("id", "name", "icon") VALUES (5, 'Educação', 'education');
            INSERT INTO category("id", "name", "icon") VALUES (6, 'Saúde', 'health');
            INSERT INTO category("id", "name", "icon") VALUES (7, 'Prioridades', 'priorities');
            INSERT INTO category("id", "name", "icon") VALUES (8, 'Projetos', 'projects');
            INSERT INTO category("id", "name", "icon") VALUES (9, 'Viagem', 'travel');
            INSERT INTO category("id", "name", "icon") VALUES (10, 'Outro', 'other');
            INSERT INTO category("id", "name", "icon") VALUES (11, 'Trabalho', 'work');
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DELETE FROM public.category;
        `)
    }

}
