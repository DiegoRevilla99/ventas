export const ventasReducer = (state = [], action) => {
	switch (action.type) {
		case "add":
			return [...state, action.payload];

		case "addAll":
			return action.payload.map((venta) => {
				return venta;
			});

		case "delete":
			return state.filter((venta) => venta.id !== action.payload);

		default:
			return state;
	}
};
