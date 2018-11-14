import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import localResolve from 'rollup-plugin-local-resolve';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

export const plugins = [
	peerDepsExternal(),
	postcss({ extract: true, plugins: [autoprefixer] }),
	babel({ exclude: 'node_modules/**' }),
	localResolve(),
	resolve(),
	commonjs(),
	filesize(),
];
export const react = 'react';
export const PropTypes = 'prop-types';
export const reactDom = 'react-dom';

export const external = [react, reactDom, PropTypes];

export const globals = external.reduce((acc, current) => {
	acc[current] = current;
	return acc;
}, {});

export const mainInput = 'src/index.js';
