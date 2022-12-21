import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671587362128 implements MigrationInterface {
    name = 'default1671587362128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isSuperUser" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isSuperUser"`);
    }

}
