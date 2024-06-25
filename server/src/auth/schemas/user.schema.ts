import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// import { createDecipheriv, scrypt } from 'crypto';
// import { ConfigService } from '@nestjs/config';
// import { promisify } from 'util';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  [x: string]: any;

  @Prop()
  user_name: string;

  @Prop()
  hash: string;

  @Prop()
  refresh_valid_till: Date;

  @Prop()
  access_token: string;

  @Prop()
  public_key: string;

  @Prop()
  private_key: string;

  // @Prop()
  // iv: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// const configService = new ConfigService();

// const crPassword = configService.get<string>('ENCRYPTION_PASSWORD');

// UserSchema.pre('findOne', async function () {
//   const doc = await this.model.findOne(this.getQuery());

//   if (doc) {
//     const key = (await promisify(scrypt)(crPassword, 'salt', 32)) as Buffer;

//     const decipherPrivateKey = createDecipheriv(
//       'aes-256-ctr',
//       key,
//       Buffer.from(doc.iv, 'hex'),
//     );
//     const decipherPublicKey = createDecipheriv(
//       'aes-256-ctr',
//       key,
//       Buffer.from(doc.iv, 'hex'),
//     );

//     doc.privateKey = Buffer.concat([
//       decipherPrivateKey.update(Buffer.from(doc.privateKey, 'hex')),
//       decipherPrivateKey.final(),
//     ]).toString();

//     doc.publicKey = Buffer.concat([
//       decipherPublicKey.update(Buffer.from(doc.publicKey, 'hex')),
//       decipherPublicKey.final(),
//     ]).toString();
//   }
// });

// UserSchema.pre('find', async function () {
//   const docs = await this.model.find(this.getQuery());

//   for (const doc of docs) {
//     if (doc) {
//       const key = (await promisify(scrypt)(crPassword, 'salt', 32)) as Buffer;

//       const decipherPrivateKey = createDecipheriv(
//         'aes-256-ctr',
//         key,
//         Buffer.from(doc.iv, 'hex'),
//       );
//       const decipherPublicKey = createDecipheriv(
//         'aes-256-ctr',
//         key,
//         Buffer.from(doc.iv, 'hex'),
//       );

//       doc.privateKey = Buffer.concat([
//         decipherPrivateKey.update(Buffer.from(doc.privateKey, 'hex')),
//         decipherPrivateKey.final(),
//       ]).toString();

//       doc.publicKey = Buffer.concat([
//         decipherPublicKey.update(Buffer.from(doc.publicKey, 'hex')),
//         decipherPublicKey.final(),
//       ]).toString();
//     }
//   }
// });
