import React from "react";
import { useFetch } from "../hooks/useFetch";
import { Table } from "./Table";

export const TableContainer = React.memo(({ ventas, loading }) => {
	console.log("TableContainer me cargo");
	// const { data: ventas } = useFetch(
	// 	"https://ventas-it-d.herokuapp.com/api/venta"
	// );

	console.log("BUENO: ", ventas);
	return (
		<div className="container mt-2 mb-5 border bg-white">
			<h3 className="mb-4 mt-4">Ventas</h3>
			<Table ventas={ventas} loading={loading} />
		</div>
	);
});
