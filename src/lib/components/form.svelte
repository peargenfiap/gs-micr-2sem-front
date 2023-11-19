<script lang="ts">
	export let title: string = 'Detalhes';
	export let indicatorKey: string;
	export let odsKey: string;
	export let indicatorDescription: string;
	export let indicatorName: string;
</script>

<div class="card bg-surface-50-900-token w-3/5 border-r-4 border-primary-500 px-4 py-8 shadow-xl">
	<div class="flex h-full w-full flex-col items-center">
		<p class="text-surface mb-4 mt-2 text-2xl font-bold text-primary-500 md:text-3xl lg:text-4xl">{title}</p>
		<div class="flex flex-col items-center justify-center">
			<label class="label">
				<span>Indicador</span>
				<input
					class="input"
					title="Input (readonly)"
					type="text"
					value={indicatorKey}
					readonly="true"
					tabindex="-1"
				/>
			</label>
			<label class="label">
				<span>Descrição</span>
				<input
					class="input"
					title="Input (readonly)"
					type="text"
					value={odsKey}
					readonly="true"
					tabindex="-1"
				/>
			</label>
			<label class="label">
				<span>Descrição</span>
				<textarea
					class="textarea"
					rows="4"
					placeholder="Enter some long form content."
					readonly="true"
					value={indicatorDescription}
				/>
			</label>
		</div>
		<label class="label">
			<span>Nome</span>
			<input
				class="input"
				title="Input (readonly)"
				type="text"
				value={indicatorName}
				readonly="true"
				tabindex="-1"
			/>
		</label>
	</div>
</div>
