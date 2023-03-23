// import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';

import { PanelBody, RangeControl } from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	//DESTRUCTURING OUR COLUMN ATTRIBUTES
	const { columns } = attributes;

	const onChangeColumns = (newColumns) => {
		setAttributes({ columns: newColumns });
	};

	const outterBlockProps = useBlockProps({
		className: `has-${columns}-columns`,
	});

	const blockProps = useBlockProps({ className: 'tml-editor-wrapper' });

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ['course-blocks/team-member'],
		orientation: 'horizontal',
		renderAppender: InnerBlocks.ButtonBlockAppender,
		template: [
			[
				'course-blocks/team-member',

				{
					name: 'John Doe',
					bio: 'A demo bio for this specific preview block, before an editor decides to use this block, from the block list.',
					url: 'https://picsum.photos/468/500',
					socialLinks: [
						{
							icon: 'facebook',
						},
						{
							icon: 'twitter',
						},
						{
							icon: 'instagram',
						},
					],
				},
			],
		],
	});

	return (
		<div {...outterBlockProps}>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label={__('Columns', 'tml')}
						min={1}
						max={6}
						onChange={onChangeColumns}
						value={columns}
					/>
				</PanelBody>
			</InspectorControls>
			<section {...innerBlocksProps} />
		</div>
	);
}
