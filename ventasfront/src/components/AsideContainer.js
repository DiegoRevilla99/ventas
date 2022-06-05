import React from "react";
import { Busqueda } from "./Busqueda";
import { Button } from "./Button";
import { Categorias } from "./Categorias";
import { Status } from "./Status";

export const AsideContainer = React.memo(() => {
	console.log("AsideContainer ME CARGO");
	return (
		<div className="container border mt-2 bg-white">
			<div className="mt-4 mb-4 d-grid mx-auto">
				<Button />
			</div>

			<hr></hr>

			<div className="mt-4 mb-4 d-grid mx-auto text-start">
				<Categorias />
			</div>

			<hr></hr>

			<div>
				<Busqueda />
			</div>

			<hr></hr>

			<div className="mt-4 mb-4 d-grid mx-auto">
				<Status />
			</div>
		</div>
	);
});
