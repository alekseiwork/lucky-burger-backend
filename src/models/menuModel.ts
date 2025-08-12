import mongoose, { Schema, Document } from 'mongoose';

interface IMenu extends Document {
  name: string;
  nameRU: string;
  nameEN: string;
  portion?: number;
  weight?: number;
  price: number;
  category: string;
}

const MenuSchema: Schema = new Schema({
  name: { type: String, required: true },
  nameRU: { type: String, required: true },
  nameEN: { type: String, required: true },
  portion: { type: Number },
  weight: { type: Number },
  price: { type: Number, required: true },
  category: { type: String, required: true },
});

const Menu = mongoose.model<IMenu>('Menu', MenuSchema);
export default Menu;
