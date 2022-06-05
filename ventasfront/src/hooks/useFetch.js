import React, { useEffect, useRef, useState } from "react";

export const useFetch = (url) => {
	const isMounted = useRef(true);

	const [state, setState] = useState({
		data: null,
		loading: true,
		error: null,
	});

	useEffect(() => {
		fetch(url)
			.then((resp) => resp.json())
			.then((data) => {
				setTimeout(() => {
					if (isMounted.current) {
						setState({
							loading: false,
							error: null,
							data: data,
						});
					} else {
						console.log("SetState no se llamó");
					}
				}, 500);
			});
	}, [url]);

	return state;
};
