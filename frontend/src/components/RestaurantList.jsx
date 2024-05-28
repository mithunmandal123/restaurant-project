
import React, { useEffect, useContext } from "react";
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import {Link} from "react-router-dom";

const RestaurantList = (props) => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants)
            }
            catch (err) {

            }
        };
        fetchData();
    }, [restaurants]);

    const handleDelete = async (id) => {
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
           setRestaurants(response.filter(restaurant =>{
            return restaurant.id !== id;
           }))
        }
        catch (err) {

        }

    }
    return (
        <div className="list-group">
            <table>
                <thead>
                    <tr className="bg-primary">
                        <th scope="col" >Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        restaurants 
                        && restaurants.map(restaurant => {
                            return (
                                <tr key={restaurant.id}>
                                    <td>{restaurant.name}</td>
                                    <td>{restaurant.location}</td>
                                    <td>{"$".repeat(restaurant.price_range)}</td>
                                    <td>reviews</td>
                                    <td><Link to={`/restaurants/${restaurant.id}/update`}><button className="btn btn-primary">Update</button></Link></td>
                                    <td><button onClick={() => handleDelete(restaurant.id)} className="btn btn-danger">Delete</button></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}
export default RestaurantList