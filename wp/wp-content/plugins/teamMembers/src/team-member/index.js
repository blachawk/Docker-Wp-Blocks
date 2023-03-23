import { registerBlockType } from '@wordpress/blocks';
// import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import Edit from './edit';
import Save from './save';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	icon: 'admin-users',
	parent: ['course-blocks/team-members-local'],
	supports: {
		reusable: metadata.supports.reusable,
	},
	attributes: {
		name: {
			type: 'string',
			source: 'html',
			selector: 'h4',
		},
		bio: {
			type: 'string',
			source: 'html',
			selector: 'p',
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
		socialLinks: {
			type: 'array',
			default: [
				{ link: 'https://facebook.com', icon: 'facebook' },
				{ link: 'https://instragram.com', icon: 'instagram' },
			],
			source: 'query',
			selector: '.wp-block-course-blocks-team-member-social-links ul li',
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
});
