import Car from "../models/carmodel.js";

export const getCars = async (req, res) => {
    try {
        let cars = await Car.find({});
        console.log(req.hostname + "" + req.originalUrl);
        console.log(req.session);
        res.json(cars);
    } catch (error) {
        console.log(error);
    }
};

/*
{
    name: String,
    imgUrl: String,
    coordinates: [Number],
    state: {
        type: String,
        default: "available",
    },
    last_checked: Date,
    trip_history: [Schema.Types.ObjectId],
}
*/
export const addCar = async (req, res) => {
    try {
        console.log(req.body);
        const car = req.body;
        const ac = await Car.create({
            name: car.name,
            cost: car.cost,
            coordinates: [car.lng, car.lat],
            last_checked: Date.now(),
        });
        console.log(ac);
        res.redirect("/addcars");
    } catch (error) {
        console.log(error);
    }
};

export const getCarById = async (req, res) => {
    try {
        let car = await Car.find({ _id: req.params.id });
        res.json(car);
    } catch (error) {
        res.send("404");
    }
};
