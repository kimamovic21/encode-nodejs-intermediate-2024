import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    const data = req.body;

    const product = new Product(data);

    try {
        await product.save();
        
        return res.status(201).send('Product saved successfully!');
    } catch (error) {
        return res.status(500).send('Something went wrong');
    };
};