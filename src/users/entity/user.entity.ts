import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InventoryEntity } from 'src/inventory/entity/inventory.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string;
  
  @Column({ type: 'varchar', nullable: false })
  password: string;
  
  @Column({ type: 'varchar', nullable: false })
  email: string;
  
  @CreateDateColumn()
  createdOn?: Date;
  
  @OneToMany((type) => InventoryEntity, (inventory) => inventory.owner)
  inventories: InventoryEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
