export const getProductos = async () => {
	const url = "https://compras-develop.herokuapp.com/api/compras/";
	const resp = await fetch(url);
	const { data } = await resp.json();

	console.log("data: ", data);

	// if (data !== null) {
	// 	const productos = data.map((productos) => {
	// 		return {
	// 			color: productos.color,
	// 			idProducto: productos.idProducto,
	// 			marca: productos.marca,
	// 			modelo: productos.modelo,
	// 			precioCompra: productos.precioCompra,
	// 			precioVenta: productos.precioVenta,
	// 			stock: productos.stock,
	// 			talla: productos.talla,
	// 		};
	// 	});
	// 	return productos;
	// } else return [];

	return data;
};
