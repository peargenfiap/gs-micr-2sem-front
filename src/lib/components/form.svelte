<script lang="ts">
	import Tableerror from './tableerror.svelte';
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	import type IConsume from '../../interfaces/consume.model';
	import { Utils } from '../../server/services/utils/utils';

	export let title: string = 'Detalhes';
	export let indicatorKey: string;
	export let odsKey: string;
	export let indicatorDescription: string;
	export let indicatorName: string;

	export let sourceData: IConsume[] | undefined;

	$: if (sourceData) {
		const total: number = Utils.somarConsumeQuantity(sourceData);
		tableSimple = {
			head: ['Ano', 'Quantidade'],
			body: tableMapperValues(sourceData, ['consumeYear', 'consumeQuantity']),
			foot: ['Total', `<code class="code">${total}</code>`],
		};
	}

	let tableSimple: TableSource;
</script>

<div class="card bg-surface-50-900-token w-3/5 border-r-4 border-primary-500 px-4 py-8 shadow-xl">
	<div class="flex h-full w-full flex-col items-center">
		<p class="text-surface mb-4 mt-2 text-2xl font-bold text-primary-500 md:text-3xl lg:text-4xl">{title}</p>
		<div class="grid grid-cols-2 gap-4">
			<div>
				<label class="label">
					<span>Chave</span>
					<input
						class="input w-full text-center"
						title="Input (readonly)"
						type="text"
						value={odsKey}
						readonly={true}
						tabindex="-1"
					/>
				</label>
			</div>
			<div>
				<label class="label">
					<span>Indicador</span>
					<input
						class="input w-full text-center"
						title="Input (readonly)"
						type="text"
						value={indicatorKey}
						readonly={true}
						tabindex="-1"
					/>
				</label>
			</div>
		</div>

		<div class="w-2/3">
			<label class="label">
				<span>Descrição</span>
				<textarea
					class="textarea"
					rows="4"
					placeholder="Enter some long form content."
					readonly={true}
					value={indicatorDescription}
				/>
			</label>
		</div>
		<div class="w-2/3">
			<label class="label">
				<span>Nome</span>
				<textarea
					class="textarea"
					rows="4"
					placeholder="Enter some long form content."
					readonly={true}
					value={indicatorName}
				/>
			</label>
		</div>
		{#if sourceData && tableSimple}
			<h3 class="text-white-700 mb-4 mt-3 text-2xl font-semibold">Métricas</h3>
			<Table
				source={tableSimple}
				class="table-hover mt-2 w-3/4"
				interactive={false}
			/>
		{:else}
			<Tableerror />
		{/if}
	</div>
</div>
