import Car from "../models/Car.js";

export const getAllCars = async (req, res) => {
    const cars = await Car.find({ }).select('-__v');

    res.status(200).send(cars);
};

export const createCar = async (req, res) => {
    const car = new Car(req.body);

    try {
        await car.save();
        res.status(201).send(car);
    } catch (error) {
        res.status(500).send('Could not save car');
    };
};

export const getCarById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const car = await Car.findById(id);
        if (car) {
            res.status(200).send(car);
        } else {
            res.status(404).send('Car not found!');
        };
    } catch (error) {
        res.status(404).send('Could not find car!');
    };
};

export const updateCar = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedCar = await Car.findByIdAndUpdate(id, req.body);
        res.status(200).send(updatedCar);
    } catch (error) {
        res.status(404).send('Incorrect Id');
    };
};

export const deleteCar = async (req, res) => {
    const { id } = req.params;

    try {
        await Car.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send('Could not delete car!');
    };
};

export const buyCar = async (req, res) => {
    const { id } = req.params;

    try {
        await Car.findByIdAndUpdate(id, { sold: true });
    
        res.status(200).send('Car bought successfully!');
    }
    catch (error) {
        res.status(500).send('Could not buy car!');
    };
};
