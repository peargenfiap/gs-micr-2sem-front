import type IIndicator from '../../../interfaces/Indicator.model';

export class Utils {
	/**
	 * Replace numbers with specific keys in an object.
	 *
	 * Pega um objeto com chaves numéricas e valores string e mapeia esses valores
	 * para um novo objeto do tipo IIndicator, utilizando uma lista pré-definida de chaves.
	 *
	 * @param {Record<number, string>} obj - O objeto de entrada com chaves numéricas. As chaves
	 * devem ser números e os valores devem ser strings. Por exemplo: { 0: 'Key1', 1: 'Description', ... }
	 *
	 * @returns {IIndicator} Um objeto do tipo IIndicator mapeado a partir do objeto de entrada.
	 * Cada chave numérica é substituída por uma chave específica definida no array 'keys'.
	 *
	 */
	public static replaceNumbersWithSpecificKeys(obj: Record<number, string>): IIndicator {
		const indicator: Partial<IIndicator> = {};
		const keys: Array<keyof IIndicator> = ['indicatorKey', 'indicatorDescription', 'indicatorName', 'odsKey'];

		keys.forEach((key, index) => {
			if (Object.prototype.hasOwnProperty.call(obj, index)) {
				indicator[key] = obj[index];
			}
		});

		return indicator as IIndicator;
	}
}
