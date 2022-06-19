export const petPut = async (url, payload) => {
	const response = await fetch(url, {
		method: "PUT", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
			Authorization: localStorage.getItem("token"),
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer",
		body: JSON.stringify(payload),
	});

	const responseJSON = await response.json();
	return responseJSON;
};
