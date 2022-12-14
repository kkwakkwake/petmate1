import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { EditPostDto } from 'src/community/dto/edit-post.dto';
export declare class CommunityEditPipe implements PipeTransform {
    transform(editPostDto: EditPostDto, metadata: ArgumentMetadata): {
        title: string;
        content: string;
        images: string[];
        hashtags: string[];
    };
}
