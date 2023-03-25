import { ProjectResponse, PublishProjectRequest, PublishProjectResponse } from '../../types/api';

export class ProjectApi {

	getLatestProject = async (
		owner: string
	): Promise<ProjectResponse> => {
		const resp = await fetch(
			`https://reacteverywhereapi.fly.dev/products/latest?owner=${owner}`,
			{
				method: 'GET',
				headers: {
					'x-api-key': 'secret-api-key',
					'x-tenant': 'reacteverywhere'
				}
			}
		);
		const json: ProjectResponse = await resp.json();
		return json;
	};

	publishProject = async (
		request: PublishProjectRequest,		
	): Promise<PublishProjectResponse> => {
		const resp = await fetch(
			'https://reacteverywhereapi.fly.dev/products',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': 'secret-api-key',
					'x-tenant': 'reacteverywhere',
				},
				body: JSON.stringify(request),
			}
		);
		const json: PublishProjectResponse = await resp.json();
		return json;
	};
}
