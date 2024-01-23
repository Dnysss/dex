import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableCard1706021017579 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE public.card (
                id integer NOT NULL,
                user_id integer NOT NULL,
                category_id integer NOT NULL,
                name character varying NOT NULL,
                color character varying NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                primary key (id),
                foreign key (user_id) references public.user(id),
                foreign key (category_id) references public.category(id)
            );
            
            CREATE SEQUENCE public.card_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
            
            ALTER SEQUENCE public.card_id_seq OWNED BY public.card.id;
            
            ALTER TABLE ONLY public.card ALTER COLUMN id SET DEFAULT nextval('public.card_id_seq'::regclass);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            drop table public.card;
        `)
    }

}
