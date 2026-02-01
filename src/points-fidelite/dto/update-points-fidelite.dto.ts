import { PartialType } from '@nestjs/swagger';
import { CreatePointsFideliteDto } from './create-points-fidelite.dto';

export class UpdatePointsFideliteDto extends PartialType(CreatePointsFideliteDto) {}
