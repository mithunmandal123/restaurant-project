import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = (props) => {
    const { id } = useParams();
    console.log(id);
    const { restaurants } = useContext(RestaurantsContext)
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("")


    const fetchData = async () => {
        try {
            
            const response = await RestaurantFinder.get(`/${id}`);
            if (response.status === 200) {
                console.log("okk")
                setName(response.data.data.restaurant.name)
                setLocation(response.data.data.restaurant.location)
                setPriceRange(response.data.data.restaurant.price_range)
            }
            else {
                console.log("error")
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const UpdateRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        });
    }
    catch(err)
    {
        console.log(err);
    }

    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" className="form-control" onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <div>
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" id="location" className="form-control" onChange={(e) => setLocation(e.target.value)} value={location} />
                </div>
                <div>
                    <label htmlFor="price_range">Price Range</label>
                    <input type="number" name="price_range" id="price_range" className="form-control" onChange={(e) => setPriceRange(e.target.value)} value={priceRange} />
                </div>
                <button type="submit" className="btn btn-primary">submit</button>
            </form>
        </div>);
};

export default UpdateRestaurant;