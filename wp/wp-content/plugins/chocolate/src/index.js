import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { __ } from '@wordpress/i18n';

registerBlockType( metadata.name, {
	icon: {
		src: 'admin-appearance',
		background: '#f03',
		foreground: '#fff',
	},
	edit: Edit,
	save,
	variations: [
		{
			name: 'course-blocks/gradient-chocolate-a',
			title: __( 'Gradient Variations of Chocolate A' ),
			icon: 'wordpress',
			attributes: {
				gradient: 'red-to-blue',
				shadow: true,
			},
		},
		{
			name: 'course-blocks/gradient-chocolate-b',
			title: __( 'Gradient Variations of Chocolate B' ),
			icon: 'welcome-learn-more',
			attributes: {
				gradient: 'green-to-yellow',
				shadow: true,
			},
		},
	],
} );
