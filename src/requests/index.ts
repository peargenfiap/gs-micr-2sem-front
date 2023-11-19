async function getIndicators() {
	try {
		const response = await fetch('http://localhost:8080/v1/indicator/');
		console.log('response', response);
		if (!response.ok) {
			console.log('Erro na API ', response);
		}
		return await response.json();
	} catch (error) {
		console.log('Erro ao chamar API de indicadores.');
	}
	return null;
}

export { getIndicators };
