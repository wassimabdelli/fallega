import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 'Salut !', description: 'Contenu du message' })
  @IsString()
  content: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'ID de l’expéditeur' })
  @IsMongoId()
  sender: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109cb', description: 'ID de la conversation' })
  @IsMongoId()
  conversation: string;
}
