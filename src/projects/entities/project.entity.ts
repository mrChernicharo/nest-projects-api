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

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true, type: 'datetime' })
  started_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  canceled_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  due_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  completed_at: Date | null;

  @Column({ type: 'simple-enum', default: ProjectStatus.Pending })
  status: ProjectStatus;

  constructor(
    props: {
      name: string;
      description: string;
      started_at?: Date | null;
      canceled_at?: Date | null;
      due_at?: Date | null;
      completed_at?: Date | null;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();

    if (props?.started_at) {
      this.start(props.started_at);
    }
  }

  start(started_at: Date) {
    if (this.status === ProjectStatus.Active) {
      throw Error('Cannot start an activated project');
    }
    if (this.status === ProjectStatus.Completed) {
      throw Error('Cannot start a completed project');
    }
    if (this.status === ProjectStatus.Canceled) {
      throw Error('Cannot start a canceled project');
    }

    this.started_at = started_at;
    this.status = ProjectStatus.Active;
  }
}
