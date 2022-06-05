import React from "react";

export const petPost = async (url, payload, resolve, error) => {
	let datos = null;
	const response = await fetch(url, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});
	const responseJSON = await response.json();

	return responseJSON;
};
