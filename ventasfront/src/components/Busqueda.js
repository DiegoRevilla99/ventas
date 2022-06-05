import React from "react";

export const Busqueda = () => {
	console.log("Busqueda me cargo");
	return (
		<>
			<div className="mb-3">
				<label htmlFor="exampleFormControlInput1" className="form-label">
					Buscar por fecha:
				</label>
				<input
					type="text"
					className="form-control mb-4"
					id="exampleFormControlInput1"
					placeholder="Fecha..."
				></input>

				<label htmlFor="exampleFormControlInput1" className="form-label">
					Buscar por folio:
				</label>
				<input
					type="text"
					className="form-control mb-4"
					id="exampleFormControlInput1"
					placeholder="Folio..."
				></input>
			</div>
		</>
	);
};
