import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save() {
	const blockProps = useBlockProps.save( { className: 'custom-class-item' } );

	return (
		<li { ...blockProps }>
			<InnerBlocks.Content />
		</li>
	);
}
