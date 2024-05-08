import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: String,
    description: String,
    manufacturer: String,
    serialNumber: Number
});

const Product = mongoose.model('Product', productSchema);

export default Product;