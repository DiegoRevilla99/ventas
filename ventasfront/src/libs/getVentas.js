export const getVentas = async () => {
	const url = "https://ventas-it-d.herokuapp.com/api/venta";
	const resp = await fetch(url);
	const { data } = await resp.json();

	// console.log("data: ", data);

	if (data !== null) {
		const ventas = data.map((venta) => {
			return {
				id: venta.id,
				folio: venta.folio,
				costoTotal: venta.costoTotal,
				cantidadPagada: venta.cantidadPagada,
				cambio: venta.cambio,
				observaciones: venta.observaciones,
				fecha: venta.fecha,
				estado: venta.estado,
				statusDelete: venta.statusDelete,
				idCliente: venta.idCliente,
				idFactura: venta.idFactura,
			};
		});
		return ventas;
	} else return [];
};
