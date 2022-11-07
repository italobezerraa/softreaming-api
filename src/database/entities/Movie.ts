import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  yearRelease: number;

  @OneToMany(() => Category, (category) => category.movies)
  categories: Category[];
}
