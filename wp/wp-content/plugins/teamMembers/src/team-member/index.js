import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	icon: 'admin-users',
	parent: ['course-blocks/team-members-local'],
	edit: () => <p>edit</p>,
	save: () => <p>save</p>,
});
