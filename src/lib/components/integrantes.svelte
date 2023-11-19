<script lang="ts">
	const integrantes = [
		{ nome: 'Felipe Otto', rm: '89108' },
		{ nome: 'Pedro Argentati', rm: '88246' },
		{ nome: 'Rafael Tannous', rm: '87486' },
	];
</script>

<section class="container mx-auto p-4">
	<h3 class="text-white-700 mb-4 mt-3 flex items-center justify-center text-2xl font-semibold">Integrantes</h3>
	{#each integrantes as integrante}
		<div class="bg-surface-500-900-token m-2 mx-auto flex w-1/2 items-center justify-center rounded p-4 shadow">
			<span>{integrante.nome}</span>
			<span class="ml-3 text-red-400">{integrante.rm}</span>
		</div>
	{/each}
</section>
