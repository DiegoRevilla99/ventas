import React, { useEffect, useReducer } from "react";
import { AsideContainer } from "./components/AsideContainer";
import { Modal } from "./components/Modal";
import { Navbar } from "./components/Navbar";
import { TableContainer } from "./components/TableContainer";
import { useFetchVentas } from "./hooks/useFecthVentas";
import { ventasReducer } from "./reducers/ventasReducer";

const init = () => {
	return [];
};

function App() {
	const [ventas, dispatch] = useReducer(ventasReducer, [], init);
	const { data, loading } = useFetchVentas();

	useEffect(() => {
		if (!loading) {
			dispatch({
				type: "addAll",
				payload: data,
			});
		}
	}, [loading]);

	console.log("Ventas: ", ventas);

	return (
		<div className="App">
			<Navbar title={"Modulo de ventas"} page1={"Detalles"} />
			<div className="mx-4">
				<div className="row">
					<div className="col-md-10">
						<TableContainer ventas={ventas} loading={loading} />
					</div>
					<div className="col-md-2">
						<AsideContainer />
					</div>
				</div>
			</div>
			<Modal tipo="create" nombre="createModal" />
			<Modal tipo="edit" nombre="editModal" />
			<Modal tipo="delete" nombre="deleteModal" />
		</div>
	);
}

export default App;
