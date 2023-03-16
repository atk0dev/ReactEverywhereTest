import { LoginResponse } from '../../types/api';

export class AuthApi {
	login = async (
		email: string,
		password: string
	): Promise<LoginResponse> => {
		const resp = await fetch(
			'https://salut-iam-dev.azurewebsites.net/api/connect/token',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-version': '2.0',
					'client-id':
						'4e8e415adef945319f41037c1374a94d',
					'client-secret':
						'SH-hP4mxje0YAu962InOhUNJktOmkMx8TMri',
				},
				body: JSON.stringify({
					grant_type: 'password',
					username: email,
					password: password,
				}),
			}
		);
    const json: LoginResponse = await resp.json();
    return json;
	};
}
