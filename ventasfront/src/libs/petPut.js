export const petPut = async (url, payload) => {
	const response = await fetch(url, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	const responseJSON = await response.json();
	return responseJSON;
};
