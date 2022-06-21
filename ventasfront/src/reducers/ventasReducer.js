import { petDelete } from "../libs/petDelete";

export const ventasReducer = (state = [], action) => {
	switch (action.type) {
		case "add":
			return [...state, action.payload];

		case "addAll":
			return action.payload.map((venta) => {
				return venta;
			});

		case "edit":
			return state.map((venta) => {
				if (venta.folio == action.payload.folio) {
					return action.payload;
				}
				return venta;
			});

		case "posibleEdit":
			const ventasEdit = state.map((venta) => {
				if (venta.folio === action.payload) {
					return { ...venta, posibleEdit: true };
				} else return venta;
			});
			console.log("ReducerVentasEdit: ", ventasEdit);

			return ventasEdit;

		case "cancelEdit":
			const ventasCancelEdit = state.map((venta) => {
				if (venta.posibleEdit === true) {
					delete venta.posibleEdit;
					return venta;
				} else return venta;
			});
			console.log("ReducerVentasEDIT BORRADO: ", ventasCancelEdit);

			return ventasCancelEdit;

		case "verDetalles":
			const ventasDetalles = state.map((venta) => {
				if (venta.id === action.payload) {
					return { ...venta, verDetalles: true };
				} else return venta;
			});

			return ventasDetalles;

		case "cerrarDetalles":
			const cerrarDetalles = state.map((venta) => {
				if (venta.verDetalles === true) {
					delete venta.verDetalles;
					return venta;
				} else return venta;
			});
			// console.log("ReducerVentasEDIT BORRADO: ", ventasCancelEdit);

			return cerrarDetalles;

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

			petDelete("https://venta-it.herokuapp.com/api/venta/" + eliminado.id);
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

		case "cancelDelete":
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
