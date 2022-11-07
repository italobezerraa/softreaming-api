import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667786306552 implements MigrationInterface {
    name = 'default1667786306552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "email" character varying NOT NULL`);
    }

}
