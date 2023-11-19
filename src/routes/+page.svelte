<script lang="ts">
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	import bodyImg from '../assets/body-img.svg';
	import { getIndicators } from '../requests';
	import type IIndicator from '../interfaces/Indicator.model';
	import { onMount } from 'svelte';

	let sourceData: IIndicator[] | undefined = undefined;

	onMount(async () => {
		sourceData = await getIndicators();
	});

	let tableSimple: TableSource;

	$: if (sourceData) {
		tableSimple = {
			head: ['Indicador', 'Descrição', 'Nome'],
			body: tableMapperValues(sourceData, ['indicatorKey', 'indicatorDescription', 'indicatorName']),
			meta: tableMapperValues(sourceData, ['indicatorKey', 'indicatorDescription', 'indicatorName', 'odsKey']),
		};
	}

	function tableSelectionHandler(event: Event) {
		console.log(event);
	}
</script>

<div class="container mx-auto mt-16">
	<div class="flex items-center justify-around">
		<p class="text-md mr-16 w-60 text-center font-bold">Seja bem-vindo. Aqui você terá acesso aos indicadores da ODS (Objetivos de Desenvolvimento Sustentável)</p>
		<img
			src={bodyImg}
			alt="Descrição"
		/>
	</div>
	{#if sourceData && tableSimple}
		<Table
			source={tableSimple}
			class="mt-20"
			interactive={true}
			on:selected={tableSelectionHandler}
		/>
	{/if}
</div>

<style lang="postcss">
	figure {
		@apply relative flex flex-col;
	}

	figure svg,
	.img-bg {
		@apply h-64 w-64 md:h-80 md:w-80;
	}

	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;

		animation:
			pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}

	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}

		33% {
			@apply bg-secondary-400/50;
		}

		66% {
			@apply bg-tertiary-400/50;
		}

		100% {
			@apply bg-primary-400/50;
		}
	}

	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
