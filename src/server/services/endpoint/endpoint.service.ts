import type { IEndpointProperties } from './endpoint.interface';

export class EndpointService {
	private static instance: EndpointService;

	private constructor() {}

	public static getInstance(): EndpointService {
		if (!EndpointService.instance) {
			EndpointService.instance = new EndpointService();
		}
		return EndpointService.instance;
	}

	private baseURL: string = 'http://localhost:8080/v1/';
	private endpointsList = this.getEndpointList(this.baseURL);

	getBaseURL(): string {
		return this.baseURL;
	}

	setBaseURL(url: string) {
		this.baseURL = url.endsWith('/') ? url.slice(0, -1) : url;
		this.endpointsList = this.getEndpointList(this.baseURL);
	}

	getEntity(entity: keyof typeof this.endpointsList) {
		return this.endpointsList[entity] as Required<IEndpointProperties>;
	}

	getEndpointList(BASE_URL: string) {
		return {
			indicator: {
				GET: `${BASE_URL}indicator/`,
				GETALL: `${BASE_URL}indicator/`,
			},
		} as const;
	}
}
