import { useEffect, useState } from "react";
import { getVentas } from "../libs/getVentas";

export const useFetchVentas = () => {
	const [state, setState] = useState({
		data: [],
		loading: true,
	});

	useEffect(() => {
		getVentas().then((ventas) => {
			setState({
				data: ventas,
				loading: false,
			});
		});
	}, []);

	// console.log("state", state);

	return state;
};
