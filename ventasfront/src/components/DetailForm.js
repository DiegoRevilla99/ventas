import React, { useEffect, useReducer, useState } from "react";
import { useFetch } from "../hooks/useFecth";
import { getDetalles } from "../libs/getDetalles";
import { getProductos } from "../libs/getProductos";
import { detallesReducer } from "../reducers/detallesReducer";
import { productosDetallesReducer } from "../reducers/productosDetallesReducer";
import "../detalles.css";
const init = () => {
	return [];
};

export const DetailForm = React.memo(({ ventas, dispatch }) => {
	const { data, loading } = useFetch(getProductos);
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

	useEffect(() => {
		console.log("loadingProductos", loading);
		if (!loading && loading != undefined) {
			dispatchProductos({
				type: "addAll",
				payload: data,
			});
			console.log("dataProductos", data);
		}
	}, [loading]);

	return (
		<>
			<div className="modal-body">
				<div className="row">
					<div className="">
						{detalles.map((detalle, i) => {
							let productoE = {};
							productos.map((producto) => {
								if (detalle.idProducto == producto.idProducto) {
									console.log("ENTRA A LA COINCIDENCIA");
									productoE = producto;
								}
							});

							return (
								<div
									className={`row mb-4 ${
										i % 2 == 0 ? "bg-secondary bg-opacity-25" : "bg-light"
									}`}
									key={detalle.id + productoE.idProducto + i}
								>
									<img
										src={
											"https://media.istockphoto.com/photos/blue-sneakers-isolated-on-white-background-picture-id1308274455?b=1&k=20&m=1308274455&s=170667a&w=0&h=S3UYmEJ1hUri2rB8jRhJ4wNY31lMrHysLHbl9YD8j_Q="
										}
										className="img-thumbnail col-4"
										alt={i}
									></img>
									<div className="col-4 mt-4">
										<h4>Detalle: {detalle.id}</h4>
										<h4>Cantidad: {detalle.cantidadProducto}</h4>
										<h4>Costo por pieza: {detalle.costoUnitario}</h4>
										<h4>Pago total: {detalle.costoTotal}</h4>
										<h4>Id del producto: {detalle.idProducto}</h4>
									</div>

									<div className="col-4 mt-4">
										<h4>Marca: {productoE?.marca?.nombreMarca}</h4>
										<h4>Modelo: {productoE?.modelo?.nombreModelo}</h4>
										<h4>Talla: {productoE.talla}</h4>
										<h4>Color: {productoE.color}</h4>
									</div>
								</div>
							);
						})}
					</div>
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
