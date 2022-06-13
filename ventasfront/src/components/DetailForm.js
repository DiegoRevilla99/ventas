import React, { useEffect, useReducer, useState } from "react";
import { useFetch } from "../hooks/useFecth";
import { getDetalles } from "../libs/getDetalles";
import { detallesReducer } from "../reducers/detallesReducer";
import { productosDetallesReducer } from "../reducers/productosDetallesReducer";

const init = () => {
	return [];
};

export const DetailForm = React.memo(({ ventas, dispatch }) => {
	const [detalles, dispatchDetalles] = useReducer(detallesReducer, [], init);

	const [productos, dispatchProductos] = useReducer(
		productosDetallesReducer,
		[],
		init
	);

	const handleCancelar = () => {
		dispatch({
			type: "cerrarDetalles",
		});
	};
	// let id = 0;
	// useEffect(() => {
	// }, [ventas]);

	// const { data, loading } = useFetch(getDetalles, id[0]?.id || 0);

	// useEffect(() => {
	// 	if (!loading) {
	// 		dispatch({
	// 			type: "addAll",
	// 			payload: data,
	// 		});
	// 	}
	// }, [loading]);

	// console.log("detallesReducer", detalles);

	useEffect(() => {
		const id = ventas.filter((venta) => venta.verDetalles == true);
		console.log("id", id[0]?.id);
		const resp = getDetalles(id[0]?.id || 0);

		resp.then((detallesX) => {
			console.log("detallesX", detallesX);
			dispatchDetalles({
				type: "addAll",
				payload: detallesX,
			});
			console.log("detalles", detalles);

			// detallesX.map((detalleX) => {

			// })
		});
	}, [ventas]);

	return (
		<>
			<div className="modal-body">
				<div className="row">
					{detalles.map((detalle) => {
						return (
							<div key={detalle.id} className="row mb-4">
								<div className="col-6">
									<h4>Detalle: {detalle.id}</h4>
									<h4>Cantidad: {detalle.cantidadProducto}</h4>
									<h4>Costo por pieza: {detalle.costoUnitario}</h4>
									<h4>Pago total: {detalle.costoTotal}</h4>
									<h4>Id del producto: {detalle.idProducto}</h4>
								</div>

								<div className="col-6">
									<h4>Marca: </h4>
									<h4>Modelo: </h4>
									<h4>Talla: </h4>
									<h4>Color: </h4>
								</div>

								<hr></hr>
							</div>
						);
					})}
				</div>
			</div>
			<div className="modal-footer">
				<button
					type="button"
					className="btn btn-secondary"
					data-bs-dismiss="modal"
					onClick={handleCancelar}
				>
					Atras
				</button>
			</div>
		</>
	);
});
