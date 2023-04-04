import { __ } from '@wordpress/i18n';

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import './list-item';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	icon: {
		src: 'list-view',
		background: '#f03',
		foreground: '#fff',
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	/**
	 * @see ./save.js
	 */
	save,

	variations: [
		{
			name: 'blachawk-blocks/list-block-unordered',
			title: __( 'List Block Ordered' ),
			icon: {
				src: 'list-view',
				background: '#4682b4',
				foreground: '#fff',
			},
			keywords: [ 'blachawk', 'lists', 'list', 'unordered', 'item' ],
			attributes: {
				listOrdered: true,
			},
			innerBlocks: [ [ 'blachawk-blocks/list-block-item' ] ],
		},
	],
} );
