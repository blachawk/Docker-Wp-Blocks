import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { columns } = attributes;

	const blockProps = useBlockProps.save( {
		className: `has-${ columns }-columns`,
	} );
	const { children, ...combinedBlockProps } =
		useInnerBlocksProps.save( blockProps );

	return <section { ...combinedBlockProps }>{ children }</section>;
}
