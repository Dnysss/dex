import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertRootInUser1705522422734 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        INSERT INTO public."user"(
            name, email, type_user, password)
            VALUES ('root', 'root@root.com', 2, '$2b$10$BhaMKrzUdPJFaHLcdvls7.lFMHojH9/sG/jwrp.Is0YXIlpBe4gI.');
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DELETE FROM public."user"
                WHERE email like 'root@root.com';
        `)
    }

}
