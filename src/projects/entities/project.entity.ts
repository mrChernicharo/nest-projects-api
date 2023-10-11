import { Column, Entity, PrimaryColumn } from 'typeorm';
import crypto from 'crypto';

export enum ProjectStatus {
  Pending = 'pending',
  Active = 'active',
  Canceled = 'canceled',
  Completed = 'completed',
}

@Entity()
export class Project {
  @PrimaryColumn()
  id: string; //uuid

  @Column()
  name: string;

  @Column({ nullable: true, type: 'datetime' })
  started_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  canceled_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  due_at: Date | null;

  @Column({ type: 'simple-enum' })
  status: ProjectStatus;

  constructor(
    props: { name: string; started_at?: Date | null; canceled_at?: Date | null; due_at?: Date | null },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }
}