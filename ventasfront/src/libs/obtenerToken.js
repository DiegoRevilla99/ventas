export const obtenerToken = async () => {
	const response = await fetch(
		"https://autenticacion-p.herokuapp.com/login/auth/user",
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				usernameOrEmail: "Diego",
				password: "123",
			}),
		}
	);
	const responseJSON = await response.json();

	return responseJSON;
};
