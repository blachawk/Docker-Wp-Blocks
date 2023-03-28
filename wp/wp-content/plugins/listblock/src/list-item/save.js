import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save() {
	const blockProps = useBlockProps.save();

	return (
		<li { ...blockProps }>
			<InnerBlocks.Content />
		</li>
	);
}
