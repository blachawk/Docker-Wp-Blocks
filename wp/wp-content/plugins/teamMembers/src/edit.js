// import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
	const blockProps = useBlockProps({ className: 'my-class' });
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ['course-blocks/team-member'],
		template: [
			[
				'course-blocks/team-member',
				{
					name: 'Template Name 1',
					bio: 'Template Bio 1',
				},
			],
			[
				'course-blocks/team-member',
				{
					name: 'Template Name 2',
					bio: 'Template Bio 2',
				},
			],
		],
		renderAppender: InnerBlocks.ButtonBlockAppender,
	});

	return (
		<div {...useBlockProps()}>
			<section {...innerBlocksProps} />
		</div>
	);
}
