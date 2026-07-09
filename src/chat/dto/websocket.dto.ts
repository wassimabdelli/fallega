import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, IsOptional } from 'class-validator';

export class JoinConversationDto {
  @ApiProperty({ example: '60d0fe4f5311236168a109cb', description: 'ID de la conversation à rejoindre' })
  @IsMongoId()
  conversationId: string;
}

export class LeaveConversationDto {
  @ApiProperty({ example: '60d0fe4f5311236168a109cb', description: 'ID de la conversation à quitter' })
  @IsMongoId()
  conversationId: string;
}

export class TypingDto {
  @ApiProperty({ example: '60d0fe4f5311236168a109cb', description: 'ID de la conversation' })
  @IsMongoId()
  conversationId: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'ID de l\'utilisateur qui écrit' })
  @IsMongoId()
  senderId: string;
}
