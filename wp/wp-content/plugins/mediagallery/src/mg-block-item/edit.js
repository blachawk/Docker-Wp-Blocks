import { useEffect, useState, useRef } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import {
	Spinner,
	withNotices,
	ToolbarButton,
	Tooltip,
	TextControl,
} from '@wordpress/components';

function Edit( { attributes, setAttributes, noticeOperations, noticeUI } ) {
	const { name, title, content, url, streamLink, alt, id } = attributes;

	//focusing on next input after modifying image
	const titleRef = useRef();

	//memory optimization
	const [ blobURL, setBlobURL ] = useState();

	const onChangeName = ( newName ) => {
		setAttributes( { name: newName } );
	};

	const onChangeTitle = ( newTitle ) => {
		setAttributes( { title: newTitle } );
	};

	const onChangeContent = ( newContent ) => {
		setAttributes( { content: newContent } );
	};

	const onChangeStreamLink = ( newStreamLink ) => {
		setAttributes( { streamLink: newStreamLink } );
	};

	//if the user uploads the media thumbnail image
	const onSelectImage = ( newImage ) => {
		if ( ! newImage || ! newImage.url ) {
			setAttributes( {
				url: undefined,
				id: undefined,
				alt: '',
			} );
			return;
		}
		setAttributes( {
			url: newImage.url,
			id: newImage.id,
			alt: newImage.alt,
		} );
	};

	//if the user puts in a URL for the media thumbnail image
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

	//look out for cases where user uploads image but shuts down window at same time...
	useEffect( () => {
		if ( ! id && isBlobURL( url ) ) {
			setAttributes( {
				url: undefined,
				alt: '',
			} );
		}
	}, [] );

	//memory optimization
	useEffect( () => {
		if ( isBlobURL( url ) ) {
			setBlobURL( url );
		} else {
			revokeBlobURL( blobURL );
			setBlobURL();
		}
	}, [ url ] );

	const removeImage = () => {
		setAttributes( {
			url: undefined,
			alt: '',
			id: undefined,
		} );
	};

	//focusing on next input after modifying image
	useEffect( () => {
		titleRef.current.focus();
	}, [ url ] );

	return (
		<>
			{ url && (
				<BlockControls group="inline">
					<div
						className={ `mg-block-item-img-replacer` }
						data-title="Replace Image"
					>
						<MediaReplaceFlow
							name={ __( 'Replace Image', 'mg-block-item' ) }
							onSelect={ onSelectImage }
							onSelectURL={ onSelectImageURL }
							onError={ onUploadError }
							accept="image/*"
							allowedTypes={ [ 'image' ] }
							mediaId={ id }
							mediaURL={ url }
						/>
					</div>

					<div className={ `mg-block-item-img-remover` }>
						<Tooltip text={ __( 'Remove Image', 'mg-block-item' ) }>
							<ToolbarButton
								label="Remove Image"
								onClick={ removeImage }
							>
								{ __( 'Remove Image', 'mg-block-item' ) }
							</ToolbarButton>
						</Tooltip>
					</div>
				</BlockControls>
			) }

			<div { ...useBlockProps() }>
				{ url && (
					<div
						className={ `wp-block-mediagallery-item-img${
							isBlobURL( url ) ? ' is-loading' : ''
						}` }
					>
						<button className="vid-img">
							<img src={ url } alt={ alt } />
						</button>
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
					ref={ titleRef }
					placeholder={ __( 'Media Name', 'mg-block-item' ) }
					tagName="h2"
					multiline={ false } // Not required, this is the default value.
					onReplace={ () => {} }
					onSplit={ () => {} }
					className="vid-name"
					onChange={ onChangeName }
					value={ name }
					allowedFormats={ [] }
				/>

				<RichText
					placeholder={ __( 'Media Title', 'mg-block-item' ) }
					tagName="div"
					multiline={ false } // Not required, this is the default value.
					onReplace={ () => {} }
					onSplit={ () => {} }
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
				<div className={ `wp-block-mediagallery-stream-link-form` }>
					<TextControl
						label={ __(
							'Insert Media Stream Link',
							'mg-block-item'
						) }
						value={ streamLink }
						className="vid-stream-link"
						onChange={ onChangeStreamLink }
						help={ `` }
					/>
				</div>
			</div>
		</>
	);
}

export default withNotices( Edit );
