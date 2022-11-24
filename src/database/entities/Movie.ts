import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "./BaseEntity";
import { Category } from "./Category";

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  yearRelease: number;

  @ManyToMany(() => Category, (category) => category.movies)
  categories: Category[];
}
