import { registerBlockType } from '@wordpress/blocks';
// import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';

registerBlockType( 'blachawk-blocks/stickyblock-item', {
	title: 'uibp Item',
	description: 'A sub block associated to the sb parent block',
	category: 'text',
	icon: 'minus',
	parent: [ 'blachawk-blocks/stickyblock' ],
	supports: {
		reusable: false,
	},
	edit: Edit,
	save: Save,
} );
