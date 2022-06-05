export const petDelete = (url) => {
	fetch(url, {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "http://127.0.0.1:3000",
		},
		method: "DELETE",
	}).then((data) => console.log("PET POST: ", data));
};
