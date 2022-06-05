import React from "react";

export const Button = () => {
	console.log("Button me cargo");
	return (
		<>
			<button
				type="button"
				className="btn btn-success "
				data-bs-toggle="modal"
				data-bs-target="#createModal"
			>
				Nueva venta
			</button>
		</>
	);
};
