export const productosDetallesReducer = (state = [], action) => {
	switch (action.type) {
		case "add":
			return state.map((producto) => {
				if (producto.idProducto == action.payload.idProducto) {
					return action.payload;
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
