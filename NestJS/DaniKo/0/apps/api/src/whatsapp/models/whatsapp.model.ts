import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class WhatsApp {
  @Prop({ type: String })
  createdAt: string;

  @Prop({ type: String })
  updatedAt: string;

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
