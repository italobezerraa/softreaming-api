import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

class BaseEntity {
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default BaseEntity;
