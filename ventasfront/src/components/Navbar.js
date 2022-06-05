import React from "react";

export const Navbar = React.memo(({ title, page1, page2 }) => {
	console.log("Nav me cargo");
	return (
		<nav
			className="navbar navbar-expand-lg navbar-light bg-gradient shadow bg-white p-3 mb-5 rounded"
			style={{ "--bs-bg-opacity": 0.3 }}
		>
			<div className="container">
				<a className="navbar-brand">
					<h3>{title}</h3>
				</a>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavAltMarkup"
					aria-controls="navbarNavAltMarkup"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div
					className="collapse navbar-collapse justify-content-end"
					id="navbarNavAltMarkup"
				>
					<div className="navbar-nav">
						<a className="nav-link" href="#">
							<h4>{page1}</h4>
						</a>
						<a className="nav-link" href="#">
							<h4>{page2}</h4>
						</a>
					</div>
				</div>
			</div>
		</nav>
	);
});
