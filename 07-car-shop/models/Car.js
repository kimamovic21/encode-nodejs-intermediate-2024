import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    productionYear: Number,
    fuelType: String,
    hp: Number,
    price: Number,
    sold: { type: Boolean , default: false },
    created: { type: Date, default: Date.now },
    owner: String
});

const Car = mongoose.model('Car', carSchema);

export default Car;
