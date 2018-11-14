import { external, plugins, globals } from './constants';

export const setConfig = (input, output) => ({
	input,
	output,
	external,
	plugins,
});

export const formatBuilder = format => file => ({
	file,
	format,
	name: 'Whatson',
	globals,
});
