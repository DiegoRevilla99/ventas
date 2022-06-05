import { petDelete } from "../libs/petDelete";

export const ventasReducer = (state = [], action) => {
	switch (action.type) {
		case "add":
			return [...state, action.payload];

		case "addAll":
			return action.payload.map((venta) => {
				return venta;
			});

		case "delete":
			let eliminado = {};
			const nuevo = state.filter((venta) => {
				const estado = venta.posibleDelete !== true;
				if (!estado) {
					eliminado = venta;
					console.log("ELIMINADO: ", eliminado);
				}
				return estado;
			});

			petDelete("https://ventas-it-d.herokuapp.com/api/venta/" + eliminado.id);
			console.log("NUEVO: ", nuevo);
			return nuevo;

		case "posibleDelete":
			const ventas = state.map((venta) => {
				if (venta.id === action.payload) {
					return { ...venta, posibleDelete: true };
				} else return venta;
			});
			console.log("ReducerVentas: ", ventas);

			return ventas;

		case "deletePosible":
			const ventas1 = state.map((venta) => {
				if (venta.posibleDelete === true) {
					delete venta.posibleDelete;
					return venta;
				} else return venta;
			});
			console.log("ReducerVentas BORRADO: ", ventas1);

			return ventas1;

		default:
			return state;
	}
};
