import { Request, Response } from 'express';
import Menu from '../models/menuModel';
// import menu from '../dev_data/menu.json';

export const createMenu = async (req: Request, res: Response) => {
  try {
    const { name, nameRU, nameEN, portion, weight, price, category } = req.body;
    const newMenu = new Menu({
      name,
      nameRU,
      nameEN,
      portion,
      weight,
      price,
      category,
    });
    const savedMenu = await newMenu.save();
    res.status(201).json(savedMenu);
  } catch (err) {
    res
      .status(500)
      .json({ message: '💥💥💥 Creating menu error!', error: err });
  }
};

export const getMenu = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const menu = category ? await Menu.find({ category }) : await Menu.find();
    res.status(200).json(menu);
  } catch (err) {
    res.status(500).json({ message: '💥💥💥 Getting menu error', error: err });
  }
};

export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`Received request to delete menu item with ID: ${id}`); 

    const menuItem = await Menu.findById(id);
    console.log(`Menu item found: ${menuItem}`); 

    if (!menuItem) {
      console.log(`Menu item with ID: ${id} not found`); 
      return res.status(404).json({ message: 'Menu item not found' });
    }

    await menuItem.deleteOne();
    console.log(`Menu item with ID: ${id} has been deleted`); 

    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    console.error('💥💥💥 Deleting menu error:', err);
    res.status(500).json({ message: '💥💥💥 Deleting menu error', error: err });
  }
};

// Function for creating a new menu option in the database
// const addMenuItem = async (menuItem: any) => {
//   const { name, nameRU, nameEN, portion, weight, price, category } = menuItem;
//   const newMenu = new Menu({
//     name,
//     nameRU,
//     nameEN,
//     portion,
//     weight,
//     price,
//     category,
//   });
//   await newMenu.save();
// };

// Upload the menu from JSON file
// export const uploadMenu = async (req: Request, res: Response) => {
//   try {
//     const menuArr = menu;

//     // Iterating over each item and saving it to the database
//     for (const menuItem of menuArr) {
//       await addMenuItem(menuItem);
//     }

//     res.status(201).json({ message: 'Menu successfully uploaded!' });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: 'Uploading menu error', error: err });
//   }
// };
