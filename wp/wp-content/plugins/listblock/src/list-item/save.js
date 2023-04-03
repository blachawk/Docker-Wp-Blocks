import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save() {
	const blockProps = useBlockProps.save( {
		className: 'my-additional-list-item-class',
	} );

	return (
		<li { ...blockProps }>
			<InnerBlocks.Content />
		</li>
	);
}
