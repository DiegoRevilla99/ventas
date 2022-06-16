import React, { useEffect, useReducer, useState } from "react";
import { petPost } from "../libs/petPost";
import { getProductos } from "../libs/getProductos";
import { useFetch } from "../hooks/useFecth";

import { Modal } from "./Modal";
import { productosReducer } from "../reducers/productosReducer";
import { petPut } from "../libs/petPut";
import { getDetalles } from "../libs/getDetalles";
import { getClientes } from "../libs/getClientes";

let date = new Date();
let seVende = true;
const init = () => {
	return [
		{
			idProducto: 1,
			precioCompra: 400.5,
			precioVenta: 999.0,
			talla: 27.0,
			stock: 80,
			color: "Blancos",
			marca: "Adidas",
			modelo: "GRAND COURT",
		},
		{
			idProducto: 2,
			precioCompra: 500.5,
			precioVenta: 100.0,
			talla: 27.0,
			stock: 80,
			color: "Negros",
			marca: "Converse",
			modelo: "Chidos",
		},
		{
			idProducto: 3,
			precioCompra: 50.5,
			precioVenta: 100.0,
			talla: 27.0,
			stock: 80,
			color: "Azul",
			marca: "Nike",
			modelo: "Buchones",
		},
	];
};

let styles = {
	fontWeight: "bold",
	color: "red",
};

export const CreateForm = React.memo(({ dispatch }) => {
	const { data: productos, loading } = useFetch(getProductos);
	const { data: clientes, loading: Clientes } = useFetch(getClientes);
	const [errors, setErrors] = useState({});
	console.log("CLIENTES", clientes);

	const [form, setForm] = useState({
		folio: " ",
		costoTotal: 0,
		cantidadPagada: 0,
		cambio: 0,
		observaciones: "",
		fecha:
			String(date.getDate()).padStart(2, "0") +
			"/" +
			String(date.getMonth() + 1).padStart(2, "0") +
			"/" +
			date.getFullYear(),
		estado: "APROBADO",
		statusDelete: false,
		rfc: "XXXX",
		idFactura: 0,
	});

	const validationsForm = (form) => {
		let errors = {};
		let regexFolio = /^[a-zA-Z0-9#-°.,\s\u00E0-\u00FC]{4,10}$/;
		let regexObservaciones = /^.{1,150}$/;
		let regexCantidadPagada = /^[.,\d+(.\d)?]{1,8}$/;

		if (!form.folio.trim()) {
			errors.folio = "*El campo folio es obligatorio";
		} else if (!regexFolio.test(form.folio.trim())) {
			errors.folio = "*El campo folio solo acepta de 4 a 10 caracteres";
		}
		if (form.cantidadPagada == 0) {
			errors.cantidadPagada = "*El campo cantidad es obligatorio";
		} else if (!regexCantidadPagada.test(form.cantidadPagada.trim())) {
			errors.cantidadPagada =
				"*La cantidad solo acepta de 1 a 8 dígitos y no puede contener numeros negativos";
		}
		if (form.cambio < 0) {
			errors.cambio = "*Cantidad incompleta";
		}
		if (!form.observaciones.trim()) {
			errors.observaciones = "*El campo observaciones es obligatorio";
		} else if (!regexObservaciones.test(form.observaciones.trim())) {
			errors.observaciones =
				"*El campo observaciones no debe exceder los 150 caracteres";
		}
		return errors;
	};

	const handleChange = (event) => {
		const { id, value } = event.target;
		setForm({ ...form, [id]: value });
	};

	const handleBlur = (event) => {
		handleChange(event);
		setErrors(validationsForm(form));
	};

	const handleChangeCostoTotal = (event) => {
		const value = event.target.value;
		setForm({
			...form,
			costoTotal: value,
			cambio: (form.cantidadPagada - value).toFixed(2),
		});
	};

	const handleChangeCantidadPagada = (event) => {
		const value = event.target.value;
		setForm({
			...form,
			cantidadPagada: value,
			cambio: (value - form.costoTotal).toFixed(2),
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("ANTES DE: ", stateProductos);

		// let seVende = true;

		// stateProductos.map((producto) => {
		// 	if (producto.cantidadVendidos > producto.stock) {
		// 		console.log("NO SE VENDE");
		// 		seVende = false;
		// 	}
		// });

		const resp = petPost("https://ventas-it-d.herokuapp.com/api/venta", {
			folio: form.folio,
			costoTotal: form.costoTotal,
			cantidadPagada: form.cantidadPagada,
			cambio: (form.cantidadPagada - form.costoTotal).toFixed(2),
			observaciones: form.observaciones,
			fecha:
				String(date.getDate()).padStart(2, "0") +
				"/" +
				String(date.getMonth() + 1).padStart(2, "0") +
				"/" +
				date.getFullYear(),
			estado: form.estado,
			statusDelete: form.statusDelete,
			rfc: form.rfc,
			idFactura: form.idFactura,
		});

		resp
			.then((data) => {
				console.log("DATA", data);
				if (data.code == 201) {
					const id = data.data;
					console.log("ID DE LA VENTA: ", data);
					dispatch({
						type: "add",
						payload: {
							id: id,
							folio: form.folio,
							costoTotal: form.costoTotal,
							cantidadPagada: form.cantidadPagada,
							cambio: (form.cantidadPagada - form.costoTotal).toFixed(2),
							observaciones: form.observaciones,
							fecha: form.fecha,
							estado: form.estado,
							statusDelete: form.statusDelete,
							rfc: form.rfc,
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

									const pago = petPost(
										"https://payment-development.herokuapp.com/api/payment/pay",
										{
											referenceID: String(
												Math.floor(Math.random() * (99999999 - 1 + 1) + 1)
											),
											paymentAmount: form.costoTotal,
											paymentMethod: "Efectivo",
										}
									);

									pago
										.then(() => console.log("SE REALIZÓ CON EXITO EL PAGO"))
										.catch(() => console.log("NO SE PUDO REALIZAR EL PAGO"));

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
				} else console.log("ERROR AL REALIZAR LA VENTA");
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
		// ACTIVAAAAAAAAAAAAAAAAAAAAAAAAR
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
			cambio: (form.cantidadPagada - costoTotal).toFixed(2),
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
		const value = parseInt(event.target.value);
		const stock = parseInt(event.target.dataset.stock);
		if (value > stock) {
			console.log("VALUE", event.target.value);
			console.log("STOCK", event.target.dataset.stock);
			console.log("NO SE PUEDE VENDER");
			seVende = false;
		} else {
			console.log("SE PUEDE VENDER");
			seVende = true;
		}
		dispatchProductos({
			type: "cantidadVendidos",
			payload: {
				id: event.target.dataset.id,
				cantidad: event.target.value,
			},
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
			fecha:
				String(date.getDate()).padStart(2, "0") +
				"/" +
				String(date.getMonth() + 1).padStart(2, "0") +
				"/" +
				date.getFullYear(),
			estado: "APROBADO",
			statusDelete: false,
			rfc: 0,
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

	const handleEstado = (event) => {
		setForm({ ...form, estado: event.target.value });
	};

	const handleCliente = (event) => {
		setForm({ ...form, rfc: event.target.value });
	};

	return (
		<>
			<div className="modal-body row">
				<div className="col-md-8 border bg-light" style={{ height: "auto" }}>
					<button onClick={estadoo}></button>
					<div className="row">
						<div className="col-12 h-50 table-responsive">
							<h3>Productos</h3>
							<table className="table border table-striped">
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
										producto.seleccionado == true ||
										producto.stock == 0 ? null : (
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
														min={0}
														max={producto.stock}
														data-id={producto.idProducto}
														data-stock={producto.stock}
														onChange={handleCantidad}
													></input>
													{errors.cantidad && (
														<div className="form-text" style={styles}>
															{errors.cantidad}
														</div>
													)}
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
							onBlur={handleBlur}
							onChange={handleChange}
						></input>
						{errors.folio && (
							<div className="form-text" style={styles}>
								{errors.folio}
							</div>
						)}
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
							onBlur={handleBlur}
							onChange={handleChangeCantidadPagada}
						></input>
						{errors.cantidadPagada && (
							<div className="form-text" style={styles}>
								{errors.cantidadPagada}
							</div>
						)}
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
							{errors.cambio && (
								<div className="form-text" style={styles}>
									{errors.cambio}
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
							onBlur={handleBlur}
							onChange={handleChange}
						></input>
						{errors.observaciones && (
							<div className="form-text" style={styles}>
								{errors.observaciones}
							</div>
						)}
					</div>

					{/* <div className="mb-3">
						<label htmlFor="fecha" className="form-label">
							Fecha:
						</label>
						<input
							type="date"
							className="form-control"
							id="fecha"
							value={form.fecha}
							onChange={handleChange}
						></input>
					</div> */}

					<div className="mb-3">
						<label htmlFor="estado" className="form-label">
							Estado
						</label>
						<select
							className="form-select"
							aria-label="Default select example"
							defaultValue={"XXXXX"}
							onChange={handleEstado}
						>
							<option value="APROBADO">APROBADO</option>
							<option value="RECHAZADO">RECHAZADO</option>
							<option value="EN REVISION">EN REVISION</option>
						</select>
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
							defaultValue={"XXXX"}
							onChange={handleCliente}
						>
							{/* <option value="1">One</option>
							<option value="2">Two</option>
							<option value="3">Three</option> */}
							<option value="XXXX">XXXX</option>
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
				{form.cambio >= 0 && form.costoTotal > 0 && seVende ? (
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
