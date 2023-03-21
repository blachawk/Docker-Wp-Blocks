// import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { columns } = attributes;

	const blockProps = useBlockProps.save({
		className: `my-klp-class  has-${columns}-columns`,
	});

	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	return <section {...innerBlocksProps} />;
}
