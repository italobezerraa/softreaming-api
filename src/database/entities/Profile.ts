import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "./BaseEntity";
import { User } from "./User";

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  avatar: string;

  @ManyToOne(() => User, (user) => user.profiles)
  @JoinColumn({ name: "user_fk" })
  user: User;
}
