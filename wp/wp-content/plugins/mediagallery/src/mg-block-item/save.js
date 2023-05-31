import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { name, title, content } = attributes;
	const blockProps = useBlockProps.save( {
		//className: 'custom-class-item'
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="h2"
				className="vid-name"
				value={ name }
			/>
			<RichText.Content
				tagName="div"
				className="vid-title"
				value={ title }
			/>
			<RichText.Content
				tagName="div"
				className="vid-content"
				value={ content }
			/>
		</div>
	);
}
