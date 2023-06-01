import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { isBlobURL } from '@wordpress/blob';
import { Spinner, withNotices } from '@wordpress/components';

function Edit( { attributes, setAttributes, noticeOperations, noticeUI } ) {
	const { name, title, content, url, alt } = attributes;

	const onChangeName = ( newName ) => {
		setAttributes( { name: newName } );
	};

	const onChangeTitle = ( newTitle ) => {
		setAttributes( { title: newTitle } );
	};

	const onChangeContent = ( newContent ) => {
		setAttributes( { content: newContent } );
	};

	//if the user uploads the media thumbnail
	const onSelectImage = ( newImage ) => {
		if ( ! newImage || ! newImage.url ) {
			setAttributes( { url: undefined, id: undefined, alt: '' } );
			return;
		}
		setAttributes( {
			url: newImage.url,
			id: newImage.id,
			alt: newImage.alt,
		} );
	};

	//if the user puts in a URL for the media thumbnail
	const onSelectImageURL = ( newImageURL ) => {
		setAttributes( {
			url: newImageURL,
			id: undefined,
			alt: '',
		} );
	};

	const onUploadError = ( message ) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	};

	return (
		<>
			<div { ...useBlockProps() }>
				{ url && (
					<div
						className={ `wp-block-mediagallery-item-img${
							isBlobURL( url ) ? ' is-loading' : ''
						}` }
					>
						<a className="vid-img">
							<img src={ url } alt={ alt } />
						</a>
						{ isBlobURL( url ) && <Spinner /> }
					</div>
				) }
				<MediaPlaceholder
					icon="cover-image"
					onSelect={ onSelectImage }
					onSelectURL={ onSelectImageURL }
					onError={ onUploadError }
					// accept="image/*"
					allowedTypes={ [ 'image' ] }
					disableMediaButtons={ url }
					notices={ noticeUI }
				/>

				<RichText
					placeholder={ __( 'Media Name', 'mg-block-item' ) }
					tagName="h2"
					className="vid-name"
					onChange={ onChangeName }
					value={ name }
					allowedFormats={ [] }
				/>

				<RichText
					placeholder={ __( 'Media Title', 'mg-block-item' ) }
					tagName="div"
					multiline="p"
					className="vid-title"
					onChange={ onChangeTitle }
					value={ title }
					allowedFormats={ [ 'core/bold' ] }
				/>

				<RichText
					placeholder={ __( 'Media Content', 'mg-block-item' ) }
					tagName="div"
					multiline="p"
					className="vid-content"
					onChange={ onChangeContent }
					value={ content }
				/>
			</div>
		</>
	);
}

export default withNotices( Edit );
