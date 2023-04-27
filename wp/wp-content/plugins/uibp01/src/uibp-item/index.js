import { registerBlockType } from '@wordpress/blocks';
// import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';

registerBlockType( 'blachawk-blocks/uibp01-item', {
	title: 'uibp Item',
	description: 'A sub block associated to the uibp parent block',
	category: 'text',
	icon: 'minus',
	parent: [ 'blachawk-blocks/uibp01' ],
	supports: {
		reusable: false,
	},
	edit: Edit,
	save: Save,
} );
