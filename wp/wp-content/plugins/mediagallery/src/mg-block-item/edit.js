import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
// import { __ } from '@wordpress/i18n';

export default function Edit() {
	const blockProps = useBlockProps( { className: 'custom-class-item' } );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		//		allowedBlocks: [ 'core/heading', 'core/paragraph' ],
		allowedBlocks: [ 'core/heading', 'core/paragraph', 'core/image' ],
	} );

	return (
		<>
			<div { ...innerBlocksProps } />
		</>
	);
}
