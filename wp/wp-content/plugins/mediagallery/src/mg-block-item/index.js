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
		foreground: '#6a5acd',
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
			selector: '.vid-title',
		},
		content: {
			type: 'string',
			source: 'html',
			multiline: 'p',
			selector: '.vid-content',
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
		mediaLinks: {
			type: 'array',
			default: [
				{
					link: 'https://customer-uq7hrwsxe8cjcwdg.cloudflarestream.com/e9b02b1144290c3102008e1f5853479f/iframe?poster=https%3A%2F%2Fcustomer-uq7hrwsxe8cjcwdg.cloudflarestream.com%2Fe9b02b1144290c3102008e1f5853479f%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600',
					icon: 'media-video',
				},
				{
					link: 'https://customer-uq7hrwsxe8cjcwdg.cloudflarestream.com/b0db0f014eb66bbdf9a584a72a90b17e/iframe?poster=https%3A%2F%2Fcustomer-uq7hrwsxe8cjcwdg.cloudflarestream.com%2Fb0db0f014eb66bbdf9a584a72a90b17e%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600',
					icon: 'media-video',
				},
				{
					link: 'https://player.vimeo.com/video/505853425',
					icon: 'media-video',
				},
			],
			source: 'query',
			selector: '.wp-block-mediagallery-item-media-links ul li',
			query: {
				icon: {
					source: 'attribute',
					attribute: 'data-icon',
				},
				link: {
					source: 'attribute',
					selector: 'a',
					attribute: 'href',
				},
			},
		},
	},
	edit: Edit,
	save: Save,
} );
