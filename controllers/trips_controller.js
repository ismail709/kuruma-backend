import { getUserById } from "./users_controller.js";

export const getUserTripsById = (req, res) => {
    // check if the user exists
    // fetch trips
    // send them
};

export const getUserActiveTripsById = (req, res) => {
    // check if the user exists
    // fetch active trip
    // send it
};

export const createTrip = (req, res) => {
    // check if the user exists
    const data = req.body;
    const user = getUserById(data.user_id);
    // create trip
    // set car state to unavailable
    // redirect user to trips screen
};

export const updateTrip = (req, res) => {
    // check if the user exists
    // create trip
    // set car state to unavailable
    // redirect user to trips screen
};

export const cancelTrip = (req, res) => {
    // check if the user exists
    // check if the trip exists
    // update trip state to cancelled
    // set car state to available
    // remove active_trip from user document
};
