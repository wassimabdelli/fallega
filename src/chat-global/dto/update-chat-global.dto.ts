import { PartialType } from '@nestjs/swagger';
import { CreateChatGlobalDto } from './create-chat-global.dto';

export class UpdateChatGlobalDto extends PartialType(CreateChatGlobalDto) {}
