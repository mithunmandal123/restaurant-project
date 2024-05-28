import React, { useState, createContext } from "react";
import UpdateRestaurant from "../components/UpdateRestaurant";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
    const [restaurants, setRestaurants] = useState([]);

    const addRestaurants = (restaurant) => {
        setRestaurants([...restaurants, restaurant]);
    };

    return (
        <RestaurantsContext.Provider value={{ restaurants, setRestaurants, addRestaurants,UpdateRestaurant }}>
            {props.children}
        </RestaurantsContext.Provider>
    );
};