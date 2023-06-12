import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { name, title, content, url, alt, id, streamLink } = attributes;

	const blockProps = useBlockProps.save( {
		//className: 'custom-class-item'
	} );

	return (
		<>
			<div { ...blockProps }>
				{ url && (
					<button className={ `vid-img` }>
						<img
							src={ url }
							alt={ alt }
							className={ id ? `pop wp-image-${ id }` : null }
							data-vid={ streamLink }
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
			</div>

			{ /* VIDEO GALLERY POP-UP OVERLAY */ }
			<div className={ `video-pop-up-overlay d-none` }>
				<div className={ `flex-box inner-wrap` }>
					<div className={ `row` }>
						<div
							className={ `col nav m-auto bg-corduroy flex-row jc-center` }
						>
							<i
								className={ `far fa-times-circle txt-white lnk-close-window` }
							></i>
						</div>
					</div>

					<div className={ `row` }>
						<div className={ `col stream-insert m-auto` }>
							<div className={ `spinner` }></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
