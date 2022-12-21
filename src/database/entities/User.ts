import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile";
import BaseEntity from "./BaseEntity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: false })
  isSuperUser: boolean;

  @OneToMany(() => Profile, (profile) => profile.user)
  profiles: Profile[];
}
