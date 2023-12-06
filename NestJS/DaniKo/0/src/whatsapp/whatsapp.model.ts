import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class WhatsApp {
  @Prop({ type: Number, require: true, unique: true, min: 1 })
  id: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: String, require: true })
  consultation: string;

  @Prop({ type: String, require: true, unique: true })
  phone: string;

  @Prop({ type: String, require: true })
  fullname: string;

  @Prop({ type: String })
  service: string;

  @Prop({ type: String })
  description: string;
}

export const WhatsAppSchema = SchemaFactory.createForClass(WhatsApp);
