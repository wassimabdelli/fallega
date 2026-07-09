import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateCallDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'ID de l\'utilisateur qui initie l\'appel',
  })
  @IsMongoId()
  @IsNotEmpty()
  caller: string;

  @ApiProperty({ 
    example: '60d0fe4f5311236168a109cb', 
    description: 'ID de l\'utilisateur qui reçoit l\'appel' 
  })
  @IsMongoId()
  @IsNotEmpty()
  receiver: string;

  @ApiProperty({ 
    example: 'video', 
    description: 'Type d\'appel',
    enum: ['audio', 'video']
  })
  @IsEnum(['audio', 'video'])
  @IsNotEmpty()
  callType: 'audio' | 'video';
}
