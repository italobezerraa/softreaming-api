import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "./BaseEntity";
import { Movie } from "./Movie";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.categories)
  @JoinColumn({ name: "movie_fk" })
  movies: Movie[];
}
