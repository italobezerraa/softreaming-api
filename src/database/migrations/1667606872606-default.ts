import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667606872606 implements MigrationInterface {
    name = 'default1667606872606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_89287b75b21d0efb79668ab9edc"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME COLUMN "category_fk" TO "movie_fk"`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_19e949e54f52f3458990820341a" FOREIGN KEY ("movie_fk") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_19e949e54f52f3458990820341a"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME COLUMN "movie_fk" TO "category_fk"`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_89287b75b21d0efb79668ab9edc" FOREIGN KEY ("category_fk") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
