export const verificarToken = async (token) => {
	const response = await fetch(
		`https://autenticacion-t.herokuapp.com/login/auth/token/${token}`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}
	);
	const responseJSON = await response.json();

	return responseJSON;
};
