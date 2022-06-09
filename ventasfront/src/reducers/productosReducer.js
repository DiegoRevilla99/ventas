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

		default:
			return state;
	}
};
