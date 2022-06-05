import React from "react";
import { CreateForm } from "./CreateForm";
import { DeleteForm } from "./DeleteForm";
import { EditForm } from "./EditForm";

export const Modal = React.memo(({ tipo, nombre, dispatch, ventas }) => {
	console.log("MODAL ORIGINAL ME CARGO");
	return (
		<div
			className="modal fade"
			id={nombre}
			tabIndex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">
							Agregar venta
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					{(() => {
						switch (tipo) {
							case "create":
								return <CreateForm dispatch={dispatch} />;

							case "edit":
								return <EditForm />;

							case "delete":
								return <DeleteForm dispatch={dispatch} ventas={ventas} />;

							default:
								console.log("DEFAULT");
								break;
						}
					})()}
				</div>
			</div>
		</div>
	);
});
