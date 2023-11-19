<script lang="ts">
	import Form from '$lib/components/form.svelte';
	import { Table, tableMapperValues, initializeStores, type TableSource, Modal, getModalStore } from '@skeletonlabs/skeleton';
	import bodyImg from '../assets/body-img.svg';
	import type IIndicator from '../interfaces/Indicator.model';
	import { onMount } from 'svelte';
	import { IndicatorApi } from '../server/requests/indicators.api';
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

	function tableSelectionHandler(event: CustomEvent) {
		const ind: IIndicator = replaceNumbersWithSpecificKeys(event.detail);

		const selectedRowData = sourceData?.find((indicator) => indicator.indicatorKey === ind.indicatorKey);

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
				},
			},
		});
	}

	function replaceNumbersWithSpecificKeys(obj: Record<number, string>): IIndicator {
		const indicator: Partial<IIndicator> = {};
		const keys: Array<keyof IIndicator> = ['indicatorKey', 'indicatorDescription', 'indicatorName', 'odsKey'];

		keys.forEach((key, index) => {
			if (Object.prototype.hasOwnProperty.call(obj, index)) {
				indicator[key] = obj[index];
			}
		});

		return indicator as IIndicator;
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
	{:else}
		<div
			class="relative mt-56 flex items-center justify-center rounded border border-red-400 bg-red-100 px-4 py-3 text-center text-red-700"
			role="alert"
		>
			<strong class="mr-2 font-bold">Ops! </strong>
			<span class="block sm:inline"> Desculpe, não foi possível carregar a tabela.</span>
		</div>
	{/if}
	<Modal />
</div>

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
