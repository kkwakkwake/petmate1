"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const community_comment_entity_1 = require("../common/entities/community-comment.entity");
const community_like_entity_1 = require("../common/entities/community-like.entity");
const sanchaek_comment_entity_1 = require("../common/entities/sanchaek-comment.entity");
const user_profile_entity_1 = require("../common/entities/user-profile.entity");
const community_entity_1 = require("../community/community.entity");
const sanchaek_entity_1 = require("../sanchaek/sanchaek.entity");
const typeorm_1 = require("typeorm");
let UserEntity = class UserEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'name' }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'nickname' }),
    __metadata("design:type", String)
], UserEntity.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'email' }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'password', select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'provider' }),
    __metadata("design:type", String)
], UserEntity.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { name: 'active' }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'profileId' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "profileId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_profile_entity_1.UserProfileEntity, (profile) => profile.user, {
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'profileId', referencedColumnName: 'id' }),
    __metadata("design:type", user_profile_entity_1.UserProfileEntity)
], UserEntity.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => community_entity_1.CommunityEntity, (post) => post.author, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sanchaek_entity_1.SanchaekEntity, (sanchaek) => sanchaek.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "sanchaeks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => community_like_entity_1.CommunityLikeEntity, (like) => like.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => community_comment_entity_1.CommunityCommentEntity, (comment) => comment.author, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "communityComments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sanchaek_comment_entity_1.SanchaekCommentEntity, (comment) => comment.author, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "sanchaekComments", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)('User')
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map