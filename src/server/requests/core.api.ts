export class ApiCore {
	public static call(url: string, parameters: any = null, method: 'POST' | 'DELETE' | 'PUT' | 'GET' = 'GET', optionalParams: any = {}, extractError: boolean = true) {
		if (!url) return Promise.reject('Url da requisição não informada');

		let headers: any = { headers: new Headers() };

		switch (method) {
			case 'GET': {
				// url.endsWith('/') ? url.substring(url.length - 1, 1) : url;
				if (parameters && parameters.Authorization) {
					headers.headers.append('Authorization', parameters.Authorization);
				} else {
					url += this.prepareParams(parameters);
					url = encodeURI(url);
				}
				break;
			}
			case 'PUT':
			case 'POST': {
				// Alteração efetuada, para cobrir os casos de envio de arquivos
				if (optionalParams && optionalParams.formData) {
					if (parameters) {
						const formData = new FormData();
						formData.append('file', parameters.file);
						formData.append('name', parameters.name);
						headers.body = formData;
					}
				} else {
					if (parameters) {
						headers.body = parameters;
					}
				}
				break;
			}
			case 'DELETE': {
				// Verifica se parameters é um objeto ou um array (se sim, 'String(parameters)' retornará '[object Object]')
				if (parameters && typeof parameters !== 'object' && String(parameters).substring(0, 1) !== '[') {
					url.endsWith('/') ? (url += parameters) : (url += `/${parameters}`);
					headers.body = JSON.stringify({});
				} else {
					if (parameters) {
						headers.body = typeof parameters !== 'object' ? parameters : JSON.stringify(parameters);
					}
				}
				break;
			}
		}

		headers = {
			url,
			method,
			...optionalParams,
			...headers,
		};
		return fetch(url, { ...headers })
			.then((response) => {
				// console.log('FETCH ', url, 'response ', response.ok, response.status);
				const error = false;
				if (!error) {
					if (response.status === 204) {
						if (optionalParams.handleNoContent) {
							return { data: [], totalRecords: 0 };
						}
					} else {
						// Estamos fazendo o tratamento no caso de retornar o download de um arquivo, ou somente sua resposta json
						if (optionalParams.text) return response.text();
						if (optionalParams.download) return response.blob();
						return response.json(); // return json response
					}
				} else {
					return Promise.reject(response);
				}
			})
			.then((result) => result)
			.catch(async (response) => {
				if (response instanceof Response) {
					try {
						const error = await response.json().then((res) => res);
						return Promise.reject(extractError ? ApiCore.extractError(error) : error);
					} catch {
						return Promise.reject('Desculpe, mas não podemos conectar com o servidor no momento. Tente novamente mais tarde.');
					}
				}
				return Promise.reject('Ocorreu um erro interno');
			});
	}

	/**
	 * Extrai o erro e retorna para pagina
	 * @param errorsData Mensagem de erro da API
	 * @param errorProperty Informa qual propriedade irá retornar seu valor, por padrão o `localized_message`
	 */
	public static extractError(errorsData: any, errorProperty?: string) {
		console.log('errorsData: ', errorsData);
		console.log('errorProperty: ', errorProperty);
		const errorMsgs = 'Ocorreu um erro ao se comunicar com a base de dados.';
		return errorMsgs;
	}

	/**
	 * Converte objeto para parâmetros de url
	 */
	public static prepareParams(params: any) {
		let prepareParams = '';
		let conector = '?';
		for (const key in params) {
			if (Array.isArray(params[key])) {
				params[key].forEach((item: any) => {
					prepareParams += `${conector}${key}=${item}`;
				});
			} else {
				prepareParams += `${conector}${key}=${params[key]}`;
			}
			conector = '&';
		}
		return prepareParams;
	}
}
