import { Schema } from "mongoose";

const carSchema = new Schema({
    make: String,
    model: String,
    productionYear: Date,
    fuelType: String,
    hp: Number,
    sold: Boolean
});
