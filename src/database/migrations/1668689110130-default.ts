import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668689110130 implements MigrationInterface {
    name = 'default1668689110130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_19e949e54f52f3458990820341a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "movie_fk"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_f5643bd407d1cfb8e6ac03917a4"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "user_fk"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "user_fk" integer`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_f5643bd407d1cfb8e6ac03917a4" FOREIGN KEY ("user_fk") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_f5643bd407d1cfb8e6ac03917a4"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "user_fk"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "user_fk" uuid`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_f5643bd407d1cfb8e6ac03917a4" FOREIGN KEY ("user_fk") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD "movie_fk" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_19e949e54f52f3458990820341a" FOREIGN KEY ("movie_fk") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
