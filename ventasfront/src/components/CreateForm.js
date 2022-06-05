import React, { useMemo, useState } from "react";
import { petPost } from "../libs/petPost";

export const CreateForm = React.memo(() => {
	console.log("CreateForm ME CARGO");
	const [form, setForm] = useState({
		folio: null,
		costoTotal: null,
		cantidadPagada: null,
		cambio: 0,
		observaciones: "",
		fecha: null,
		estado: null,
		statusDelete: false,
		idCliente: null,
		idFactura: null,
	});
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

	const handleChangeCambio = (event) => {
		// const value = event.target.value;
		console.log("ENTROOOOO");
		//setForm({ ...form, cambio: value });
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
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<>
			<div className="modal-body">
				<form>
					<div className="mb-3">
						<label htmlFor="folio" className="form-label">
							Folio:
						</label>
						<input
							type="text"
							className="form-control"
							id="folio"
							aria-describedby="Folio..."
							onChange={handleChangeFolio}
						></input>
					</div>

					<div className="mb-3">
						<label htmlFor="total" className="form-label">
							Total:
						</label>
						<input
							type="number"
							className="form-control"
							id="total"
							onChange={handleChangeCostoTotal}
						></input>
					</div>

					<div className="mb-3">
						<label htmlFor="cantidadPagada" className="form-label">
							Cantidad Pagada:
						</label>
						<input
							type="number"
							className="form-control"
							id="cantidadPagada"
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
							onChange={handleChangeEstado}
						></input>
					</div>

					<div className="mb-3">
						<label htmlFor="idCliente" className="form-label">
							ID Cliente:
						</label>
						<input
							type="number"
							className="form-control"
							id="idCliente"
							onChange={handleChangeIdCliente}
						></input>
					</div>
				</form>
			</div>
			<div className="modal-footer">
				<button
					type="button"
					className="btn btn-secondary"
					data-bs-dismiss="modal"
				>
					Cancelar
				</button>
				{form.cambio >= 0 ? (
					<button
						type="button"
						className="btn btn-primary"
						onClick={handleSubmit}
					>
						Guardar
					</button>
				) : (
					<button type="button" className="btn btn-primary" disabled>
						Guardar
					</button>
				)}
			</div>
		</>
	);
});
