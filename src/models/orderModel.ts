import mongoose, { Schema, Document } from 'mongoose';

interface IOrderItem {
  name: string;
  quantity: number;
  price: number;
}

// Interface for TypeScript types
interface IOrder extends Document {
  name: string;
  phone: string;
  address: string;
  items: IOrderItem[];
  total: number;
  status: string; // Добавляем поле статуса
}

// Mongoose schema
const OrderSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' }, // Поле со статусом, по умолчанию 'pending'
});

// Exporting the model
const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;
