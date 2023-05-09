import { registerBlockType } from '@wordpress/blocks';
// import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';

registerBlockType( 'blachawk-blocks/fs-slide-item', {
	title: 'uibp Item',
	description: 'A sub block associated to the flexslider parent block',
	category: 'text',
	icon: 'minus',
	parent: [ 'blachawk-blocks/fs-slider' ],
	supports: {
		reusable: false,
	},
	edit: Edit,
	save: Save,
} );
