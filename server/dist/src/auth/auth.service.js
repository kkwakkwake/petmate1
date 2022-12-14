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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const res = require("../common/responses/message");
const user_profile_entity_1 = require("../common/entities/user-profile.entity");
let AuthService = class AuthService {
    constructor(userRepository, userProfileRepository) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
    }
    async validateUser(email, password) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .select([
            'user.id',
            'user.name',
            'user.nickname',
            'user.email',
            'user.password',
            'user.provider',
        ])
            .addSelect(['profile.imageUrl', 'profile.comment', 'profile.birth'])
            .leftJoin('user.profile', 'profile')
            .where('user.email= :email', { email })
            .getOne();
        if (user && user.provider !== 'local') {
            throw new common_1.BadRequestException(res.msg.LOGIN_PROVIDER_WRONG);
        }
        if (!user) {
            return null;
        }
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            return userWithoutPassword;
        }
        throw new common_1.UnauthorizedException(res.msg.LOGIN_PASSWORD_WRONG);
    }
    async validateGoogleUser(email, name, accessToken) {
        const exUser = await this.userRepository.findOne({
            where: { email },
        });
        if (!exUser) {
            const user = new user_entity_1.UserEntity();
            user.email = email;
            user.name = name;
            user.nickname = name;
            user.password = accessToken;
            user.provider = 'google';
            user.active = false;
            const userProfile = new user_profile_entity_1.UserProfileEntity();
            user.profile = userProfile;
            return await this.userRepository.save(user);
        }
        else {
            return exUser;
        }
    }
    async validateKakaoUser(email, name, accessToken) {
        const exUser = await this.userRepository.findOne({
            where: { email },
        });
        if (!exUser) {
            const user = new user_entity_1.UserEntity();
            user.email = email;
            user.name = name;
            user.nickname = name;
            user.password = accessToken;
            user.provider = 'kakao';
            user.active = false;
            const userProfile = new user_profile_entity_1.UserProfileEntity();
            user.profile = userProfile;
            return await this.userRepository.save(user);
        }
        else {
            return exUser;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_profile_entity_1.UserProfileEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map