

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.b1a496b6.js","_app/immutable/chunks/scheduler.2207c5b5.js","_app/immutable/chunks/index.bbb7b025.js","_app/immutable/chunks/singletons.97f93df5.js","_app/immutable/chunks/index.26daac94.js"];
export const stylesheets = [];
export const fonts = [];
