import { Schema, model, Document } from 'mongoose';

export interface ICompany extends Document {
  NIT: number;
  address: string;
  name: string;
  phone: number;
  active: number;
}

const CompanySchema = new Schema({
  NIT: { type: Number, required: true, unique: true },
  address: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  active: { type: Number, required: true }
});

export default model<ICompany>('Company', CompanySchema);