export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.d34b0718.js","app":"_app/immutable/entry/app.59256a09.js","imports":["_app/immutable/entry/start.d34b0718.js","_app/immutable/chunks/scheduler.2207c5b5.js","_app/immutable/chunks/singletons.97f93df5.js","_app/immutable/chunks/index.26daac94.js","_app/immutable/entry/app.59256a09.js","_app/immutable/chunks/scheduler.2207c5b5.js","_app/immutable/chunks/index.bbb7b025.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
