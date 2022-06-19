export const getProductos = async () => {
	const url = "https://compras-testing.herokuapp.com/api/compras/";
	const resp = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: localStorage.getItem("token"),
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	const { data } = await resp.json();

	console.log("data Normal: ", data);
	// console.log(
	// 	"data Ordenados: ",
	// 	data.sort((a1, a2) => {
	// 		if (a1.idProducto < a2.idProducto) return -1;
	// 		else if (a1.idProducto > a2.idProducto) return 1;
	// 		else return 0;
	// 	})
	// );

	return data.sort((a1, a2) => {
		if (a1.idProducto < a2.idProducto) return -1;
		else if (a1.idProducto > a2.idProducto) return 1;
		else return 0;
	});
};
