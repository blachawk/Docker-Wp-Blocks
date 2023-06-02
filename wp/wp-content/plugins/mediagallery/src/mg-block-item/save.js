import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { name, title, content, url, alt, id } = attributes;
	const blockProps = useBlockProps.save( {
		//className: 'custom-class-item'
	} );

	return (
		<div { ...blockProps }>
			{ url && (
				<a className={ `vid-img` }>
					<img
						src={ url }
						alt={ alt }
						className={ id ? `wp-image-${ id }` : null }
					/>
				</a>
			) }

			{ name && (
				<RichText.Content
					tagName="h2"
					className="vid-name"
					value={ name }
				/>
			) }

			{ title && (
				<RichText.Content
					tagName="div"
					className="vid-title"
					value={ title }
				/>
			) }

			{ content && (
				<RichText.Content
					tagName="div"
					className="vid-content"
					value={ content }
				/>
			) }
		</div>
	);
}
