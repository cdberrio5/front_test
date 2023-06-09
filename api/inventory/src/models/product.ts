import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  quantity: number;
  price: number;
  photo: string;
  companyId: string;
  active: number;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true },
  companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  active: { type: Number, required: true }
});

export default mongoose.model<IProduct>('Product', ProductSchema);