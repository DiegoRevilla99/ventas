export const productosReducer = (state = [], action) => {
	switch (action.type) {
		// case "add":
		// 	return [...state, action.payload];

		case "add":
			return state.map((producto) => {
				if (producto.idProducto == action.payload.idProducto) {
					return action.payload;
				}
				return producto;
			});

		case "cancelar":
			console.log("ENTRA A CANCELAR");
			return state.map((producto) => {
				if (producto.seleccionado == true) {
					console.log("ENTRO A BORRAR");
					delete producto.seleccionado;
					return producto;
				}
				return producto;
			});

		case "cancelarUno":
			console.log("ID DEL CANCELADO: ", action.payload);
			return state.map((producto) => {
				if (producto.idProducto == action.payload) {
					console.log("ENCUENTRA UNO");
					delete producto.seleccionado;
					return producto;
				}
				return producto;
			});

		case "addAll":
			return action.payload.map((productos) => {
				return productos;
			});

		case "reducirStock":
			console.log("ENTRÓ A REDUCIR STOCK", action.payload);
			return state.map((producto) => {
				if (producto.idProducto == action.payload.id) {
					producto.stock = producto.stock - action.payload.cantidad;
					return producto;
				}
				return producto;
			});

		case "cantidadVendidos":
			console.log("Cantidad de vendidos", action.payload.cantidad);
			return state.map((producto) => {
				if (producto.idProducto == action.payload.id) {
					console.log("ENTRA A AÑADIR EL VALOR DE VENDIDOS");
					producto.cantidadVendidos = action.payload.cantidad;
					return producto;
				}
				return producto;
			});

		default:
			return state;
	}
};
