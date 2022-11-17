import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668689636669 implements MigrationInterface {
    name = 'default1668689636669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "created_at"`);
    }

}
