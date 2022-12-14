import { bool } from 'aws-sdk/clients/signer';
import { CommunityCommentEntity } from 'src/common/entities/community-comment.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { SanchaekCommentEntity } from 'src/common/entities/sanchaek-comment.entity';
import { UserProfileEntity } from 'src/common/entities/user-profile.entity';
import { CommunityEntity } from 'src/community/community.entity';
import { SanchaekEntity } from 'src/sanchaek/sanchaek.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('varchar', { name: 'nickname' })
  nickname: string;

  @Column('varchar', { name: 'email' })
  email: string;

  @Column('varchar', { name: 'password', select: false })
  password: string;

  @Column('varchar', { name: 'provider' })
  provider: string;

  @Column('boolean', { name: 'active' })
  active: boolean;

  @Column('int', { name: 'profileId' })
  profileId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToOne(
    () => UserProfileEntity,
    (profile: UserProfileEntity) => profile.user,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'profileId', referencedColumnName: 'id' })
  profile: UserProfileEntity;

  @OneToMany(() => CommunityEntity, (post: CommunityEntity) => post.author, {
    cascade: true,
  })
  posts: CommunityEntity[];

  @OneToMany(
    () => SanchaekEntity,
    (sanchaek: SanchaekEntity) => sanchaek.user,
    {
      cascade: true,
    },
  )
  sanchaeks: SanchaekEntity[];

  @OneToMany(
    () => CommunityLikeEntity,
    (like: CommunityLikeEntity) => like.user,
    {
      cascade: true,
    },
  )
  likes: CommunityLikeEntity[];

  @OneToMany(
    () => CommunityCommentEntity,
    (comment: CommunityCommentEntity) => comment.author,
    {
      cascade: true,
    },
  )
  communityComments: CommunityCommentEntity[];

  @OneToMany(
    () => SanchaekCommentEntity,
    (comment: SanchaekCommentEntity) => comment.author,
    {
      cascade: true,
    },
  )
  sanchaekComments: SanchaekCommentEntity[];
}
