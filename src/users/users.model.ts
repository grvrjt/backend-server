/* eslint-disable no-unused-vars */
import * as mongoose from 'mongoose';
import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiBody, ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  _id: mongoose.Types.ObjectId;

  @ApiProperty()
  @prop({
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
    index: true,
  })
  username: string;

  @ApiProperty()
  @prop({
    type: String,
    trim: true,
    default: null,
  })
  fullName: string;
}
  