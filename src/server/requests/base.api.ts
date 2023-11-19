import { ApiCore } from './core.api';
import type { IEndpointProperties } from '../services/endpoint/endpoint.interface';
import { EndpointService } from '../services/endpoint/endpoint.service';
/**
 * Classe base para Api's
 */
export class BaseApi {
	public static entity: string;

	protected static get endpoint(): Required<IEndpointProperties> {
		return EndpointService.getInstance().getEntity(this.entity as any);
	}

	protected static get baseURl(): string {
		return EndpointService.getInstance().getBaseURL();
	}

	/**
	 * Retorna uma lista de itens da api
	 * @param params object
	 */
	public static list(params = null) {
		return ApiCore.call(this.endpoint.GETALL, params, 'GET', { handleNoContent: true });
	}
	/**
	 * Recupera detalhes de um item
	 * @param idOrConcatPath number or complete path ex:. path/1 || path/1/256
	 */
	public static get(idOrConcatPath: any) {
		if (idOrConcatPath === null || idOrConcatPath === undefined) {
			idOrConcatPath = '';
		}
		return ApiCore.call(`${this.endpoint.GET}/${idOrConcatPath}`);
	}
	/**
	 * Cria um item na api
	 * @param body object
	 */
	public static create(body: any) {
		return ApiCore.call(this.endpoint.POST, JSON.stringify(body), 'POST');
	}
	/**
	 * Atualiza item
	 * @param body object
	 */
	public static update(body: any) {
		return ApiCore.call(this.endpoint.PUT, JSON.stringify(body), 'PUT');
	}
	/**
	 * Deleta um item
	 * @param idOrConcatPath number or complete path ex:. path/1 || path/1/256
	 */
	public static delete(idOrConcatPath: any) {
		return ApiCore.call(this.endpoint.DELETE, idOrConcatPath, 'DELETE');
	}
	/**
	 * This function encodes special characters, except: , / ? : @ & = + $ #
	 * @param data
	 */
	public static encodeURI(data: any) {
		return encodeURI(data);
	}
	/**
	 * This function decodes special characters
	 * @param data
	 */
	public static decodeURI(data: any) {
		return decodeURI(data);
	}
}
