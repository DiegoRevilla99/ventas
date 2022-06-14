import React, { useEffect, useReducer } from "react";
import { AsideContainer } from "./components/AsideContainer";
import { Modal } from "./components/Modal";
import { Navbar } from "./components/Navbar";
import { TableContainer } from "./components/TableContainer";
import { useFetch } from "./hooks/useFecth";
import { getVentas } from "./libs/getVentas";
import { ventasReducer } from "./reducers/ventasReducer";
import "./App.css";

const init = () => {
	return [];
};

function App() {
	const [ventas, dispatch] = useReducer(ventasReducer, [], init);
	const { data, loading } = useFetch(getVentas);
	console.log(ventas);
	const detalles = [];

	useEffect(() => {
		if (!loading) {
			dispatch({
				type: "addAll",
				payload: data,
			});
		}
	}, [loading]);

	return (
		<div className="App">
			<Navbar title={"Modulo de ventas"} page1={"Detalles"} />
			<div className="mx-4">
				<div className="row">
					<div className="col-md-10">
						<TableContainer
							ventas={ventas}
							loading={loading}
							dispatch={dispatch}
							detalles={detalles}
						/>
					</div>
					<div className="col-md-2">
						<AsideContainer />
					</div>
				</div>
			</div>
			<Modal
				tipo="create"
				nombre="createModal"
				dispatch={dispatch}
				title="Crear venta"
			/>
			<Modal
				tipo="edit"
				nombre="editModal"
				title="Editar venta"
				dispatch={dispatch}
				ventas={ventas}
			/>
			<Modal
				tipo="delete"
				nombre="deleteModal"
				dispatch={dispatch}
				ventas={ventas}
				title="Eliminar venta"
			/>

			<Modal
				tipo="detail"
				nombre="detailModal"
				dispatch={dispatch}
				ventas={ventas}
				title="Detalles de la venta"
			/>
		</div>
	);
}

export default App;
