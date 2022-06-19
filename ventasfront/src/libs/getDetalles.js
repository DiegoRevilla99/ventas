export const getDetalles = async (idVenta) => {
	const url =
		"https://ventas-it-d.herokuapp.com/api/venta/" + idVenta + "/ventadetalle";
	const resp = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: localStorage.getItem("token"),
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	const { data } = await resp.json();

	console.log("Detalles Normal: ", data);
	// console.log(
	// 	"data Ordenados: ",
	// 	data.sort((a1, a2) => {
	// 		if (a1.idProducto < a2.idProducto) return -1;
	// 		else if (a1.idProducto > a2.idProducto) return 1;
	// 		else return 0;
	// 	})
	// );

	return data;
};
