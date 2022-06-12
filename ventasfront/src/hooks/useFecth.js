import { useEffect, useState } from "react";

export const useFetch = (get) => {
	const [state, setState] = useState({
		data: [],
		loading: true,
	});

	useEffect(() => {
		get().then((ventas) => {
			setState({
				data: ventas,
				loading: false,
			});
		});
	}, []);
	return state;
};
