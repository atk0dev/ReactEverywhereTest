import { ContentResponse } from '../../types/api';

export class ContentApi {
	get = async (
		id: string,
    token: string,
	): Promise<ContentResponse> => {
		const resp = await fetch(
			`https://salut-content-dev.gezondmetsalut.nl/api/content/${id}`,
			{
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`
				}
			}
		);
    const json: ContentResponse = await resp.json();
    return json;
	};
}
