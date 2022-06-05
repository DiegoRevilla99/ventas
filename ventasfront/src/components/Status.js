import React from "react";

export const Status = () => {
	return (
		<div
			className="btn-group-vertical"
			role="group"
			aria-label="Basic radio toggle button group"
		>
			<input
				type="radio"
				className="btn-check"
				name="btnradio"
				id="btnradio1"
				autoComplete="off"
				defaultChecked
			></input>
			<label className="btn btn-outline-primary" htmlFor="btnradio1">
				Cualquiera
			</label>

			<input
				type="radio"
				className="btn-check"
				name="btnradio"
				id="btnradio2"
				autoComplete="off"
			></input>
			<label className="btn btn-outline-primary" htmlFor="btnradio2">
				Activo
			</label>

			<input
				type="radio"
				className="btn-check"
				name="btnradio"
				id="btnradio3"
				autoComplete="off"
			></input>
			<label className="btn btn-outline-primary" htmlFor="btnradio3">
				Borrado
			</label>
		</div>
	);
};
