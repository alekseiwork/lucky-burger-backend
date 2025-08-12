import { Request, Response } from 'express';
import Order from '../models/orderModel';
import { io } from '../app';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { name, phone, address, items, total } = req.body;
    const newOrder = new Order({ name, phone, address, items, total });
    const savedOrder = await newOrder.save();

    io.emit('newOrder', savedOrder);

    res.status(201).json(savedOrder);
  } catch (err) {
    res
      .status(500)
      .json({ message: '💥💥💥 Creating order error!', error: err });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: '💥💥💥 Getting order error!', error: err });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params; 
  const { status } = req.body; 

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status }, 
      { new: true } 
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    io.emit('updateOrder', updatedOrder);

    res.status(200).json(updatedOrder);
  } catch (err) {
    res
      .status(500)
      .json({ message: '💥💥💥 Updating order error!', error: err });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    io.emit('deleteOrder', deletedOrder);

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: '💥💥💥 Deleting order error!', error: err });
  }
};
