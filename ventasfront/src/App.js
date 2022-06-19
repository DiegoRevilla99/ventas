import React, { useEffect, useReducer, useState } from "react";
import { AsideContainer } from "./components/AsideContainer";
import { Modal } from "./components/Modal";
import { Navbar } from "./components/Navbar";
import { TableContainer } from "./components/TableContainer";
import { useFetch } from "./hooks/useFecth";
import { getVentas } from "./libs/getVentas";
import { ventasReducer } from "./reducers/ventasReducer";
import "./App.css";
import { obtenerToken } from "./libs/obtenerToken";
import { verificarToken } from "./libs/verificarToken";

const init = () => {
	return [];
};

function App() {
	const [ventas, dispatch] = useReducer(ventasReducer, [], init);
	const { data, loading } = useFetch(getVentas);

	const detalles = [];

	useEffect(() => {
		if (!loading) {
			dispatch({
				type: "addAll",
				payload: data,
			});
		}
	}, [loading]);

	// useEffect(() => {
	// 	const token1 = obtenerToken();
	// 	token1
	// 		.then((exitoToken) => {
	// 			console.log("TOKEEEEEN", exitoToken);
	// 			setToken(exitoToken.data);
	// 			localStorage.setItem("token", JSON.stringify(exitoToken.data));
	// 		})
	// 		.catch((falloToken) =>
	// 			console.log("FALLO LA OBTENCIÓN DEL TOKEN", falloToken)
	// 		);
	// }, [token]);

	useEffect(() => {
		const verificado = verificarToken(localStorage.getItem("token"));
		verificado
			.then((exitoVer) => {
				console.log("ESTADO DEL TOKEN", exitoVer);
				if (exitoVer.httpCode != 200) {
					console.log(
						"SE VA A OBTENER UN NUEVO TOKEN PORQUE EL ANTERIOR CADUCÓ"
					);
					const token1 = obtenerToken();
					token1
						.then((exitoToken) => {
							localStorage.setItem("token", exitoToken.data);
							console.log(
								"TOKEN PUESTO EN EL LOCAL",
								localStorage.getItem("token")
							);
						})
						.catch((falloToken) =>
							console.log("FALLO LA OBTENCIÓN DEL TOKEN", falloToken)
						);
				}
				console.log("EL TOKEN SIGUE SIENDO EL MISMO");
			})
			.catch((falloVer) => {
				console.log("EL TOKEN TA CADUCÓ", falloVer);
			});
	}, []);

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
