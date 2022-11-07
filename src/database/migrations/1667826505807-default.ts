import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667826505807 implements MigrationInterface {
    name = 'default1667826505807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_f5643bd407d1cfb8e6ac03917a4"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "user_fk"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "user_fk" uuid`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_f5643bd407d1cfb8e6ac03917a4" FOREIGN KEY ("user_fk") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_f5643bd407d1cfb8e6ac03917a4"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "user_fk"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "user_fk" integer`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_f5643bd407d1cfb8e6ac03917a4" FOREIGN KEY ("user_fk") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
    }

}
