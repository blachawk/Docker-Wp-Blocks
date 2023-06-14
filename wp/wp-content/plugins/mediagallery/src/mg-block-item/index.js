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
		foreground: '#1a839a',
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
			selector: '.vid-name',
		},
		title: {
			type: 'string',
			source: 'html',
			selector: '.vid-title',
		},
		content: {
			type: 'string',
			source: 'html',
			multiline: 'p',
			selector: '.vid-content',
		},
		streamLink: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'data-vid',
			default: '',
		},
		id: {
			type: 'number',
		},
		alt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
			default: '',
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
	},
	edit: Edit,
	save: Save,
} );
