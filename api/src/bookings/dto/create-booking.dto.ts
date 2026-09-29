import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  Min,
  IsMongoId,
} from 'class-validator';

export class CreateBookingDto {
  @IsMongoId({ message: 'Invalid room identifier format' })
  @IsNotEmpty()
  roomId: string;

  @IsString()
  @IsNotEmpty()
  guestName: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  guestEmail: string;

  @IsDateString({}, { message: 'checkInDate must be a valid ISO date string' })
  @IsNotEmpty()
  checkInDate: string;

  @IsDateString({}, { message: 'checkOutDate must be a valid ISO date string' })
  @IsNotEmpty()
  checkOutDate: string;

  @IsNumber()
  @Min(1)
  numberOfGuests: number;

  @IsNumber()
  @Min(0)
  totalPrice: number;
}