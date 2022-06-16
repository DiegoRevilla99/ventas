import React, { useEffect, useState } from "react";
import { petPut } from "../libs/petPut";

let styles = {
	fontWeight: "bold",
	color: "red",
};

export const EditForm = React.memo(({ dispatch, ventas }) => {
	const [errors, setErrors] = useState({});
	const [form, setForm] = useState({
		folio: null,
		costoTotal: null,
		cantidadPagada: null,
		cambio: 0,
		observaciones: "",
		fecha: null,
		estado: null,
		statusDelete: false,
		rfc: null,
		idFactura: null,
	});

	useEffect(() => {
		const nuevoEstado = Object.assign(
			{},
			ventas.find((venta) => venta.posibleEdit == true)
		);
		setForm(nuevoEstado);
	}, [ventas]);

	const validationsForm = (form) => {
		let errors = {};
		let regexObservaciones = /^.{1,150}$/;
		let regexCantidadPagada = /^[.,\d+(.\d)?]{1,8}$/;

		if (form.costoTotal == 0) {
			errors.costoTotal = "*El campo cantidad total es obligatorio";
		} else if (!regexCantidadPagada.test(form.costoTotal.trim())) {
			errors.costoTotal =
				"*La cantidad total solo acepta de 1 a 8 dígitos y no puede contener numeros negativos";
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

	const handleCancelar = () => {
		dispatch({
			type: "cancelEdit",
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const resp = petPut(
			"https://ventas-it-d.herokuapp.com/api/venta/" + form.id,
			{
				id: form.id,
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
			}
		);

		console.log("FINAL: ", form);

		dispatch({
			type: "edit",
			payload: {
				id: form.id,
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
	};

	return (
		<>
			<div className="modal-body">
				<form>
					<div className="mb-3">
						<label htmlFor="folio" className="form-label">
							Folio:
						</label>
						<fieldset disabled>
							<input
								type="text"
								className="form-control"
								id="folio"
								aria-describedby="Folio..."
								defaultValue={form.folio}
								onChange={handleChange}
							></input>
						</fieldset>
					</div>

					<div className="mb-3">
						<label htmlFor="total" className="form-label">
							Total:
						</label>
						<input
							type="number"
							className="form-control"
							id="total"
							defaultValue={form.costoTotal}
							onBlur={handleBlur}
							onChange={handleChangeCostoTotal}
						></input>
						{errors.costoTotal && (
							<div className="form-text" style={styles}>
								{errors.costoTotal}
							</div>
						)}
					</div>

					<div className="mb-3">
						<label htmlFor="cantidadPagada" className="form-label">
							Cantidad Pagada:
						</label>
						<input
							type="number"
							className="form-control"
							id="cantidadPagada"
							defaultValue={form.cantidadPagada}
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
							defaultValue={form.observaciones}
							onBlur={handleBlur}
							onChange={handleChange}
						></input>
						{errors.observaciones && (
							<div className="form-text" style={styles}>
								{errors.observaciones}
							</div>
						)}
					</div>

					<div className="mb-3">
						<label htmlFor="fecha" className="form-label">
							Fecha:
						</label>
						<input
							type="date"
							className="form-control"
							id="fecha"
							defaultValue={form.fecha}
							onChange={handleChange}
						></input>
					</div>

					<div className="mb-3">
						<label htmlFor="estado" className="form-label">
							Estado
						</label>
						<select
							className="form-select"
							aria-label="Default select example"
							defaultValue={form.estado}
						>
							<option value="APROBADO">APROBADO</option>
							<option value="RECHAZADO">RECHAZADO</option>
							<option value="EN REVISION">EN REVISION</option>
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
				{form?.cambio >= 0 ? (
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
		</>
	);
});
