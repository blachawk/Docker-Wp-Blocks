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
	},
	edit: Edit,
	save: Save,
});
