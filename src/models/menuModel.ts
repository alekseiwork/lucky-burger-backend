import mongoose, { Schema, Document } from 'mongoose';

// Interface for TypeScript types
interface IMenu extends Document {
  name: string;
  nameRU: string;
  nameEN: string;
  portion?: number;
  weight?: number;
  price: number;
  category: string;
}

// Mongoose schema
const MenuSchema: Schema = new Schema({
  name: { type: String, required: true },
  nameRU: { type: String, required: true },
  nameEN: { type: String, required: true },
  portion: { type: Number },
  weight: { type: Number },
  price: { type: Number, required: true },
  category: { type: String, required: true },
});

// Exporting the model
const Menu = mongoose.model<IMenu>('Menu', MenuSchema);
export default Menu;
