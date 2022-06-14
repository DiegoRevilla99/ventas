import React from "react";
import { getDetalles } from "../libs/getDetalles";

export const Table = React.memo(({ ventas, loading, dispatch, detalles }) => {
	const handleDelete = (id) => {
		dispatch({
			type: "posibleDelete",
			payload: id,
		});
	};

	const handleEdit = (folio) => {
		dispatch({
			type: "posibleEdit",
			payload: folio,
		});
	};

	const handleDetail = (id) => {
		dispatch({
			type: "verDetalles",
			payload: id,
		});

		//const ob = ventas.filter((venta) => venta.verDetalles == true).id;
		//console.log("FILTER", ob);
		// detalles = getDetalles(id);
		// detalles.then((detalle) => console.log("DETALLES FINAL", detalle));

		// console.log("DETALLES OBTENIDOS", detalles);
	};

	return (
		<div className="container mb-4 border bg-white table-responsive">
			<table className="table align-middle table-striped">
				<thead>
					<tr>
						<th scope="col">Id</th>
						<th scope="col">Cliente</th>
						<th scope="col">Factura</th>
						<th scope="col">Folio</th>
						<th scope="col">Total</th>
						<th scope="col">Pago</th>
						<th scope="col">Cambio</th>
						<th scope="col">Obs.</th>
						<th scope="col">Fecha</th>
						<th scope="col">Estado</th>
						<th scope="col">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{!loading ? (
						ventas?.map((venta, i) => (
							<tr key={venta.id || 0}>
								<th>{venta.id}</th>
								<th>{venta.rfc}</th>
								<th>{venta.idFactura}</th>
								<th>{venta.folio}</th>
								<th>{venta.costoTotal}</th>
								<th>{venta.cantidadPagada}</th>
								<th>{venta.cambio}</th>
								<th>{venta.observaciones}</th>
								<th>{venta.fecha}</th>
								<th>{venta.estado}</th>
								<th>
									<div className="d-grid gap-2 d-md-block">
										<button
											type="button"
											className="btn btn-info me-1"
											data-bs-toggle="modal"
											data-bs-target="#detailModal"
											onClick={() => handleDetail(venta.id)}
										>
											<i className="fa-solid fa-circle-info"></i>
										</button>
										<button
											type="button"
											className="btn btn-primary me-1"
											data-bs-toggle="modal"
											data-bs-target="#editModal"
											onClick={() => handleEdit(venta.folio)}
										>
											<i className="fa-solid fa-pen-to-square"></i>
										</button>
										<button
											type="button"
											className="btn btn-danger"
											data-bs-toggle="modal"
											data-bs-target="#deleteModal"
											onClick={() => handleDelete(venta.id)}
										>
											<i className="fa-solid fa-trash-can"></i>
										</button>
									</div>
								</th>
							</tr>
						))
					) : (
						<tr className="text-center animate__animated animate__flash">
							<th>Cargando...</th>
							<th>Cargando...</th>
							<th>Cargando...</th>
							<th>Cargando...</th>
							<th>Cargando...</th>
							<th>Cargando...</th>
							<th>Cargando...</th>
							<th>Cargando...</th>
							<th>Cargando...</th>
							<th>Cargando...</th>
							<th>Cargando...</th>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
});
