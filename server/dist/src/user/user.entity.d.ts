import { CommunityCommentEntity } from 'src/common/entities/community-comment.entity';
import { CommunityLikeEntity } from 'src/common/entities/community-like.entity';
import { UserProfileEntity } from 'src/common/entities/user-profile.entity';
import { CommunityEntity } from 'src/community/community.entity';
import { SanchaekEntity } from 'src/sanchaek/sanchaek.entity';
export declare class UserEntity {
    id: number;
    name: string;
    nickname: string;
    email: string;
    password: string;
    profile_id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    profile: UserProfileEntity;
    posts: CommunityEntity[];
    sanchaeks: SanchaekEntity[];
    likes: CommunityLikeEntity[];
    comments: CommunityCommentEntity[];
}
