import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';

registerBlockType( 'mediagallery/item', {
	title: __( 'Media Gallery Block Item', 'mg-block-item' ),
	description: __(
		'A sub block associated to the Media Gallery parent block',
		'mg-block'
	),
	category: 'text',
	icon: {
		src: 'controls-play',
		background: '#dd3c27',
		foreground: '#fff',
	},
	parent: [ 'mg-block/mediagallery' ],
	supports: {
		reusable: false,
		html: false,
	},
	attributes: {
		name: {
			type: 'string',
			source: 'html',
			selector: 'h2',
		},
		title: {
			type: 'string',
			source: 'html',
			multiline: 'p',
			selector: 'div',
		},
		content: {
			type: 'string',
			source: 'html',
			multiline: 'p',
			selector: 'div',
		},
	},
	edit: Edit,
	save: Save,
} );
