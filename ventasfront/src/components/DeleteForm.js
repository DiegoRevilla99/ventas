import React from "react";

export const DeleteForm = React.memo(({ dispatch, ventas }) => {
	const handleSubmit = () => {
		dispatch({
			type: "delete",
		});
	};

	const handleCancelar = () => {
		dispatch({
			type: "deletePosible",
		});
	};

	return (
		<>
			<div className="modal-body">
				<p>¿Seguro que quieres borrar esta venta?</p>
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
				<button
					type="button"
					className="btn btn-primary"
					data-bs-dismiss="modal"
					onClick={handleSubmit}
				>
					Borrar
				</button>
			</div>
		</>
	);
});
