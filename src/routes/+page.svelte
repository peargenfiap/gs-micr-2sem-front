<script lang="ts">
	import Integrantes from './../lib/components/integrantes.svelte';
	import Form from '$lib/components/form.svelte';
	import { Table, tableMapperValues, initializeStores, type TableSource, Modal, getModalStore } from '@skeletonlabs/skeleton';
	import bodyImg from '../assets/body-img.svg';
	import type IIndicator from '../interfaces/Indicator.model';
	import { onMount } from 'svelte';
	import { IndicatorApi } from '../server/requests/indicators.api';
	import { Utils } from '../server/services/utils/utils';
	import { ConsumeApi } from '../server/requests/consume.api';
	import type IConsume from '../interfaces/consume.model';
	import Tableerror from '$lib/components/tableerror.svelte';
	import Footer from '$lib/components/footer.svelte';
	initializeStores();

	let sourceData: IIndicator[] | undefined = undefined;

	onMount(async () => {
		sourceData = await IndicatorApi.list();
	});

	const modalStore = getModalStore();
	let tableSimple: TableSource;

	$: if (sourceData) {
		tableSimple = {
			head: ['Indicador', 'Descrição', 'Nome'],
			body: tableMapperValues(sourceData, ['indicatorKey', 'indicatorDescription', 'indicatorName']),
			meta: tableMapperValues(sourceData, ['indicatorKey', 'indicatorDescription', 'indicatorName', 'odsKey']),
		};
	}

	async function tableSelectionHandler(event: CustomEvent) {
		const ind: IIndicator = Utils.replaceNumbersWithSpecificKeys(event.detail);

		const selectedRowData = sourceData?.find((indicator) => indicator.indicatorKey === ind.indicatorKey);

		const consumes: IConsume[] = await ConsumeApi.list({ indicatorKey: selectedRowData?.indicatorKey } as any);

		modalStore.trigger({
			title: 'Detalhes do Indicador',
			type: 'component',
			component: {
				ref: Form,
				props: {
					title: 'Detalhes do Indicador',
					indicatorKey: selectedRowData?.indicatorKey,
					indicatorDescription: selectedRowData?.indicatorDescription,
					indicatorName: selectedRowData?.indicatorName,
					odsKey: selectedRowData?.odsKey,
					sourceData: consumes,
				},
			},
		});
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
		<h3 class="text-white-700 mb-4 mt-10 text-center text-2xl font-semibold">Indicadores da Ods</h3>
		<Table
			source={tableSimple}
			class="mt-5"
			interactive={true}
			on:selected={tableSelectionHandler}
		/>
	{:else}
		<Tableerror />
	{/if}
	<Modal />
</div>
<Integrantes />
<Footer />

<style lang="postcss">
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
