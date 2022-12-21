import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671644536389 implements MigrationInterface {
    name = 'default1671644536389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "avatar" TO "age"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "age" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "age" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "age" TO "avatar"`);
    }

}
