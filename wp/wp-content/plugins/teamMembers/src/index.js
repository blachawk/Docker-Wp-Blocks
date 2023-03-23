import { registerBlockType, createBlock } from '@wordpress/blocks';
import './team-member';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { InnerBlocks } from '@wordpress/block-editor';

registerBlockType(metadata.name, {
	icon: {
		src: 'groups',
		background: '#f03',
		foreground: '#fff',
	},
	edit: Edit,
	save,
	transforms: {
		from: [
			{
				type: 'block',
				blocks: ['core/gallery'],
				transform: ({ images, columns }) => {
					const innerBlocks = images.map(({ url, id, alt }) => {
						return createBlock('course-blocks/team-member', {
							alt,
							id,
							url,
						});
					});
					return createBlock(
						metadata.name,
						{
							columns: columns || 2,
						},
						innerBlocks
					);
				},
			},
		],
	},
});
