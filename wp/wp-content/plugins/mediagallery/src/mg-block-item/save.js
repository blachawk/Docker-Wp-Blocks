import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

export default function Save( { attributes } ) {
	const { name, title, content, url, alt, id, mediaLinks } = attributes;
	const blockProps = useBlockProps.save( {
		//className: 'custom-class-item'
	} );

	return (
		<div { ...blockProps }>
			{ url && (
				<button className={ `vid-img` }>
					<img
						src={ url }
						alt={ alt }
						className={ id ? `wp-image-${ id }` : null }
					/>
				</button>
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
			{ mediaLinks.length > 0 && (
				<div className="wp-block-mediagallery-item-media-links">
					<ul>
						{ mediaLinks.map( ( item, index ) => {
							return (
								<li key={ index }>
									<a
										data-icon={ item.icon }
										href={ item.link }
									>
										<Icon icon={ item.icon } />
									</a>
								</li>
							);
						} ) }
					</ul>
				</div>
			) }
		</div>
	);
}
