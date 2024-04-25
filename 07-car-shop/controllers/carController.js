import Car from "../models/Car.js";

export const getAllCars = async (req, res) => {
    const cars = await Car.find({ }).select('-__v');

    return res.status(200).send(cars);
};

export const createCar = async (req, res) => {
    console.log(req.user._id);
    const car = new Car({ ...req.body, owner: req.user.id });

    try {
        await car.save();
        return res.status(201).send(car);
    } catch (error) {
        return res.status(500).send('Could not save car');
    };
};

export const getCarById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const car = await Car.findById(id);
        if (car) {
            return res.status(200).send(car);
        } else {
           return  res.status(404).send('Car not found!');
        };
    } catch (error) {
        return res.status(404).send('Could not find car!');
    };
};

export const updateCar = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedCar = await Car.findOneAndUpdate({ _id: id, owner: req.user.id }, req.body);
        if (updatedCar) {
           return res.status(200).send('Car successfully updated!');
        } else {
           return res.status(404).send('Car not found');
        }
    } catch (error) {
        return res.status(404).send('Incorrect Id');
    };
};

export const deleteCar = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCar = await Car.findOneAndDelete({ _id: id, owner: req.user.id });

        if (deletedCar) {
            return res.status(204).send();
        } else {
            return res.status(404).send('Car not found!');
        }
    } catch (error) {
        return res.status(500).send('Could not delete car!');
    };
};

export const buyCar = async (req, res) => {
    const { id } = req.params;

    try {
        const car = await Car.findById(id);

        if (car.owner !== req.user.id) {
            await Car.findByIdAndUpdate(id, { sold: true });
            return res.status(200).send('Car bought successfully!');
        } else {
            return res.status(403).send('Cannot buy your own car!');
        }
    }
    catch (error) {
        return res.status(500).send('Could not buy car!');
    };
};
