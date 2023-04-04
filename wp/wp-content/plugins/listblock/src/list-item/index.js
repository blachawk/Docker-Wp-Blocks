import { registerBlockType } from '@wordpress/blocks';
// import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';

registerBlockType( 'blachawk-blocks/list-block-item', {
	title: 'List Block Item',
	description: 'A list item for list block',
	category: 'text',
	icon: 'minus',
	parent: [
		'blachawk-blocks/list-block',
		'blachawk-blocks/list-block-unordered',
	],
	supports: {
		reusable: false,
	},
	edit: Edit,
	save: Save,
} );
