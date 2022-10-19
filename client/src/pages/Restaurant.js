import React from "react";
import RestaurantsCard from "../components/RestaurantsCard";

import Map from "../components/map";
import { tabTitle } from "../utils/generalFunction";
const Restaurants = () => {
	tabTitle('Bienvenue')
	return (
		<div className="">
			<Map />
			<RestaurantsCard />
		</div>
	);
};
export default Restaurants;
