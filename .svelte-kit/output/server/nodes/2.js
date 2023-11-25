

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.d292f6fd.js","_app/immutable/chunks/scheduler.2207c5b5.js","_app/immutable/chunks/index.bbb7b025.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.bf22c6f0.js","_app/immutable/chunks/index.26daac94.js"];
export const stylesheets = ["_app/immutable/assets/2.b4770cfe.css","_app/immutable/assets/ProgressBar.4f1e9ba5.css"];
export const fonts = [];
