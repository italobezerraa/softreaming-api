import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "./BaseEntity";
import { Movie } from "./Movie";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.categories)
  @JoinTable({ name: "movies_categories" })
  movies: Movie[];
}
