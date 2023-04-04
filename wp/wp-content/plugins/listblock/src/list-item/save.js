import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save() {
	const blockProps = useBlockProps.save( {
		//we don't need this but its cool to know
		//className: 'my-additional-list-item-class',
	} );

	return (
		<li { ...blockProps }>
			<InnerBlocks.Content />
		</li>
	);
}
