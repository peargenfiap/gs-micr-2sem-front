<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="headline">
				<strong class="mb-4 flex items-center justify-center text-xl">Global Solution 2 - Microservice And Web Engineering ODS</strong>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />
</AppShell>
