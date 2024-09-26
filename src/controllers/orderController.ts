import { Request, Response } from 'express';
import Order from '../models/orderModel';
import { io } from '../app';

// Creating a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { name, phone, address, items, total } = req.body;
    const newOrder = new Order({ name, phone, address, items, total });
    const savedOrder = await newOrder.save();

    // Sending an event about the new order to all connected clients
    io.emit('newOrder', savedOrder);

    res.status(201).json(savedOrder);
  } catch (err) {
    res
      .status(500)
      .json({ message: '💥💥💥 Creating order error!', error: err });
  }
};

// Getting all the orders
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

// Updating order status
export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params; // Get order ID from parameters
  const { status } = req.body; // Get new status from request body

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status }, // Update status
      { new: true } // Return updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    // Send an event about the order update
    io.emit('updateOrder', updatedOrder);

    res.status(200).json(updatedOrder);
  } catch (err) {
    res
      .status(500)
      .json({ message: '💥💥💥 Updating order error!', error: err });
  }
};

// Deleting an order
export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params; // Get order ID from parameters

  try {
    const deletedOrder = await Order.findByIdAndDelete(id); // Delete order by ID

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    // Send an event about the deleted order
    io.emit('deleteOrder', deletedOrder);

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: '💥💥💥 Deleting order error!', error: err });
  }
};
