import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';

registerBlockType( 'blachawk-blocks/mediagallery-item', {
	title: __( 'Media Gallery Block Item', 'mg-block' ),
	description: __(
		'A sub block associated to the Media Gallery parent block',
		'mg-block'
	),
	category: 'text',
	icon: 'minus',
	parent: [ 'blachawk-blocks/mediagallery' ],
	supports: {
		reusable: false,
		html: false,
	},
	edit: Edit,
	save: Save,
} );
