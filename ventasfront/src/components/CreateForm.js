import React, { useEffect, useReducer, useState } from "react";
import { petPost } from "../libs/petPost";
import { getProductos } from "../libs/getProductos";
import { useFetch } from "../hooks/useFecth";

import { Modal } from "./Modal";
import { productosReducer } from "../reducers/productosReducer";
import { petPut } from "../libs/petPut";
import { getDetalles } from "../libs/getDetalles";
import { getClientes } from "../libs/getClientes";

const init = () => {
	return [];
};

export const CreateForm = React.memo(({ dispatch }) => {
	const { data: productos, loading } = useFetch(getProductos);
	const { data: clientes, loading: Clientes } = useFetch(getClientes);
	console.log("CLIENTES", clientes);

	//const { data: detalles, loading: loadingDetalles } = useFetch(getDetalles);

	// console.log("Detalles", detalles);
	const [form, setForm] = useState({
		folio: " ",
		costoTotal: 0,
		cantidadPagada: 0,
		cambio: 0,
		observaciones: "",
		fecha: "",
		estado: " ",
		statusDelete: false,
		idCliente: 0,
		idFactura: 0,
	});
	// console.log("PRODUCTOS: ", data);

	const handleChangeFolio = (event) => {
		const value = event.target.value;
		setForm({ ...form, folio: value });
	};

	const handleChangeCostoTotal = (event) => {
		const value = event.target.value;
		setForm({
			...form,
			costoTotal: value,
			cambio: form.cantidadPagada - value,
		});
	};

	const handleChangeCantidadPagada = (event) => {
		const value = event.target.value;
		setForm({
			...form,
			cantidadPagada: value,
			cambio: value - form.costoTotal,
		});
	};

	const handleChangeObservaciones = (event) => {
		const value = event.target.value;
		setForm({ ...form, observaciones: value });
	};

	const handleChangeFecha = (event) => {
		const value = event.target.value;
		setForm({ ...form, fecha: value });
	};

	const handleChangeEstado = (event) => {
		const value = event.target.value;
		setForm({ ...form, estado: value });
	};

	const handleChangeIdCliente = (event) => {
		const value = event.target.value;
		setForm({ ...form, idCliente: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("ANTES DE: ", stateProductos);

		const resp = petPost("https://ventas-it-d.herokuapp.com/api/venta", {
			folio: form.folio,
			costoTotal: form.costoTotal,
			cantidadPagada: form.cantidadPagada,
			cambio: form.cantidadPagada - form.costoTotal,
			observaciones: form.observaciones,
			fecha: form.fecha,
			estado: form.estado,
			statusDelete: form.statusDelete,
			idCliente: form.idCliente,
			idFactura: form.idFactura,
		});

		resp
			.then((data) => {
				const id = data.data;
				console.log("RESPUESTA: ", data);
				dispatch({
					type: "add",
					payload: {
						id: id,
						folio: form.folio,
						costoTotal: form.costoTotal,
						cantidadPagada: form.cantidadPagada,
						cambio: form.cantidadPagada - form.costoTotal,
						observaciones: form.observaciones,
						fecha: form.fecha,
						estado: form.estado,
						statusDelete: form.statusDelete,
						idCliente: form.idCliente,
						idFactura: form.idFactura,
					},
				});
				stateProductos.map((producto) => {
					//console.log("ENTRA A VENDER", producto);

					if (producto.seleccionado == true) {
						console.log("VENTA DE ", producto);
						const resp = petPut(
							"https://compras-develop.herokuapp.com/api/compras/vender/" +
								producto.idProducto +
								"/" +
								producto.cantidadVendidos,
							{}
						);
						resp
							.then((exito) => {
								dispatchProductos({
									type: "reducirStock",
									payload: {
										id: producto.idProducto,
										cantidad: producto.cantidadVendidos,
									},
								});

								const detalle = petPost(
									"https://ventas-it-d.herokuapp.com/api/venta/" +
										id +
										"/ventadetalle",
									{
										idVenta: id,
										cantidadProducto: producto.cantidadVendidos,
										costoUnitario: producto.precioVenta,
										costoTotal:
											producto.precioVenta * producto.cantidadVendidos,
										estatusDelete: false,
										idProducto: producto.idProducto,
									}
								);

								detalle.then((exito) =>
									console.log("SE REALIZÓ CON EXITO EL DETALLE")
								);
							})
							.catch((fallo) => console.log("NO HAY SUFICIENTE STOCK"));
					}
				});
				handleCancelar();
			})
			.catch((err) => {
				// console.log(err);
			});

		// const detalles = ("url", )
	};

	//TODO LO QUE TIENE QUE VER CON PRODUCTOS

	const [stateProductos, dispatchProductos] = useReducer(
		productosReducer,
		[],
		init
	);

	useEffect(() => {
		if (!loading) {
			dispatchProductos({
				type: "addAll",
				payload: productos,
			});
		}
	}, [loading]);

	useEffect(() => {
		let suma = 0;
		const seleccionados = stateProductos.filter(
			(producto) => producto.seleccionado == true
		);
		console.log("SELECCIONADOS: ", seleccionados);

		let costoTotal = 0;
		seleccionados.map((seleccionado) => {
			costoTotal =
				costoTotal + seleccionado.precioVenta * seleccionado.cantidadVendidos;
		});
		console.log("PrecioTotal: ", costoTotal);

		setForm({
			...form,
			costoTotal: costoTotal,
			cambio: form.cantidadPagada - costoTotal,
		});
	}, [stateProductos]);

	const handleAdd = (producto) => {
		dispatchProductos({
			type: "add",
			payload: { ...producto, seleccionado: true, cantidadVendidos: 0 },
		});
	};

	const handleCancelarUno = (idProducto) => {
		console.log("ID: ", idProducto);
		dispatchProductos({
			type: "cancelarUno",
			payload: idProducto,
		});
	};

	const handleCantidad = (event) => {
		console.log("Target", event.target.dataset.id);
		dispatchProductos({
			type: "cantidadVendidos",
			payload: { id: event.target.dataset.id, cantidad: event.target.value },
		});
	};

	const handleCancelar = () => {
		dispatchProductos({ type: "cancelar", payload: productos });
		setForm({
			folio: " ",
			costoTotal: 0,
			cantidadPagada: 0,
			cambio: 0,
			observaciones: "",
			fecha: " ",
			estado: " ",
			statusDelete: false,
			idCliente: 0,
			idFactura: 0,
		});
	};

	const estadoo = () => {
		console.log(stateProductos);
		// const resp = petPut(
		// 	"https://compras-develop.herokuapp.com/api/compras/vender/5/1",
		// 	{}
		// );

		// resp.then((data) => console.log(data)).catch((err) => console.log(err));
	};

	return (
		<>
			<div className="modal-body row ">
				<div className="col-md-8 border bg-light" style={{ height: "auto" }}>
					<button onClick={estadoo}></button>
					<div className="row ">
						<div className="col-12 h-50 table-responsive">
							<h3>Productos</h3>
							<table className="table border">
								<thead>
									<tr>
										<th scope="col">id</th>
										<th scope="col">Marca</th>
										<th scope="col">Modelo</th>
										<th scope="col">Talla</th>
										<th scope="col">Precio</th>
										<th scope="col">Stock</th>
									</tr>
								</thead>
								<tbody>
									{stateProductos?.map((producto) =>
										producto.seleccionado == true ? null : (
											<tr key={producto.idProducto || 0}>
												<th>{producto.idProducto}</th>
												<th>{producto.marca}</th>
												<th>{producto.modelo}</th>
												<th>{producto.talla}</th>
												<th>{producto.precioVenta}</th>
												<th>{producto.stock}</th>
												<th>
													<button
														type="button"
														className="btn btn-info me-1"
														onClick={() => handleAdd(producto)}
													>
														+
													</button>
												</th>
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>

						<div className="col-12 h-50 mt-4 table-responsive">
							<h3>Carrito</h3>
							<table className="table border">
								<thead>
									<tr>
										<th scope="col">id</th>
										<th scope="col">Marca</th>
										<th scope="col">Modelo</th>
										<th scope="col">Talla</th>
										<th scope="col">Precio</th>
										<th scope="col">Stock</th>
										<th scope="col">Cantidad</th>
									</tr>
								</thead>
								<tbody>
									{stateProductos?.map((producto) =>
										producto.seleccionado == true ? (
											<tr key={producto.idProducto || 0}>
												<th>{producto.idProducto}</th>
												<th>{producto.marca}</th>
												<th>{producto.modelo}</th>
												<th>{producto.talla}</th>
												<th>{producto.precioVenta}</th>
												<th>{producto.stock}</th>
												<th>
													<input
														type="number"
														className="form-control"
														id="total"
														min={1}
														data-id={producto.idProducto}
														onChange={handleCantidad}
													></input>
												</th>
												<th>
													<button
														type="button"
														className="btn btn-danger me-1"
														onClick={() =>
															handleCancelarUno(producto.idProducto)
														}
													>
														-
													</button>
												</th>
											</tr>
										) : null
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<form className="col-md-4">
					<div className="mb-3">
						<label htmlFor="folio" className="form-label">
							Folio:
						</label>
						<input
							type="text"
							className="form-control"
							id="folio"
							value={form.folio}
							aria-describedby="Folio..."
							onChange={handleChangeFolio}
						></input>
					</div>

					<div className="mb-3">
						<label htmlFor="total" className="form-label">
							Total:
						</label>
						<fieldset disabled>
							<input
								type="number"
								className="form-control"
								id="total"
								value={form.costoTotal}
								onChange={handleChangeCostoTotal}
							></input>
						</fieldset>
					</div>

					<div className="mb-3">
						<label htmlFor="cantidadPagada" className="form-label">
							Cantidad Pagada:
						</label>
						<input
							type="number"
							className="form-control"
							id="cantidadPagada"
							value={form.cantidadPagada}
							onChange={handleChangeCantidadPagada}
						></input>
					</div>

					<div className="mb-3">
						<label htmlFor="cambio" className="form-label">
							Cambio:
						</label>
						<fieldset disabled>
							<input
								type="number"
								className="form-control"
								id="cambio"
								placeholder={form.cambio}
								aria-describedby="error"
							></input>
							{form.cambio < 0 && (
								<div id="error" className="form-text">
									*El cambio no puede ser negativo*
								</div>
							)}
						</fieldset>
					</div>

					<div className="mb-3">
						<label htmlFor="observaciones" className="form-label">
							Observaciones:
						</label>
						<input
							type="text"
							className="form-control"
							id="observaciones"
							value={form.observaciones}
							onChange={handleChangeObservaciones}
						></input>
					</div>

					<div className="mb-3">
						<label htmlFor="fecha" className="form-label">
							Fecha:
						</label>
						<input
							type="date"
							className="form-control"
							id="fecha"
							value={form.fecha}
							onChange={handleChangeFecha}
						></input>
					</div>

					<div className="mb-3">
						<label htmlFor="estado" className="form-label">
							Estado:
						</label>
						<input
							type="text"
							className="form-control"
							id="estado"
							value={form.estado}
							onChange={handleChangeEstado}
						></input>
					</div>

					<div className="mb-3">
						<label htmlFor="idCliente" className="form-label">
							Cliente:
						</label>
						{/* <input
							type="number"
							className="form-control"
							id="idCliente"
							value={form.idCliente}
							onChange={handleChangeIdCliente}
						></input> */}
						<select
							className="form-select"
							aria-label="Default select example"
							defaultValue={"XXXXX"}
						>
							{/* <option value="1">One</option>
							<option value="2">Two</option>
							<option value="3">Three</option> */}
							{clientes.map((cliente) => {
								return (
									<option key={cliente.rfc} value={cliente.rfc}>
										{cliente.rfc}
									</option>
								);
							})}
						</select>
					</div>
				</form>
			</div>
			<div className="modal-footer">
				<button
					type="button"
					className="btn btn-secondary"
					data-bs-dismiss="modal"
					onClick={handleCancelar}
				>
					Cancelar
				</button>
				{form.cambio >= 0 && form.costoTotal > 0 ? (
					<button
						type="button"
						className="btn btn-primary"
						onClick={handleSubmit}
						data-bs-dismiss="modal"
					>
						Guardar
					</button>
				) : (
					<button type="button" className="btn btn-primary" disabled>
						Guardar
					</button>
				)}
			</div>

			<Modal tipo="delete" nombre="pruebaModal" title="Eliminar venta" />
		</>
	);
});
