export const petPost = async (url, payload, resolve, error) => {
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
