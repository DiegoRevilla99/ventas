import React from "react";

export const Button = () => {
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
