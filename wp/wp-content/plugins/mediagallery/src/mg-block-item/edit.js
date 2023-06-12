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
	Icon,
	Tooltip,
	TextControl,
	Button,
} from '@wordpress/components';

import { usePrevious } from '@wordpress/compose';

function Edit( {
	attributes,
	setAttributes,
	noticeOperations,
	noticeUI,
	isSelected,
} ) {
	const { name, title, content, url, alt, id, mediaLinks } = attributes;

	//clear state of previous selected media link icon
	const prevIsSelected = usePrevious( isSelected );

	//state for clickable media link icons
	const [ selectedLink, setSelectedLink ] = useState();

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

	const addNewMediaItem = () => {
		setAttributes( {
			mediaLinks: [ ...mediaLinks, { icon: 'wordpress', link: '' } ],
		} );
		setSelectedLink( mediaLinks.length );
	};

	const updateMediaItem = ( type, value ) => {
		const mediaLinksCopy = [ ...mediaLinks ];
		mediaLinksCopy[ selectedLink ][ type ] = value;
		setAttributes( { mediaLinks: mediaLinksCopy } );
	};

	const removeMediaItem = () => {
		setAttributes( {
			mediaLinks: [
				...mediaLinks.slice( 0, selectedLink ),
				...mediaLinks.slice( selectedLink + 1 ),
			],
		} );
		setSelectedLink();
	};

	//focusing on next input after modifying image
	useEffect( () => {
		titleRef.current.focus();
	}, [ url ] );

	//clear state of previous selected media link icon
	useEffect( () => {
		if ( prevIsSelected && ! isSelected ) {
			setSelectedLink();
		}
	}, [ isSelected, prevIsSelected ] );

	return (
		<>
			{ url && (
				<BlockControls group="inline">
					<div className={ `mg-block-item-img-replacer` }>
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
					allowedFormats={ [ 'core/bold', 'core/link' ] }
				/>

				<RichText
					placeholder={ __( 'Media Content', 'mg-block-item' ) }
					tagName="div"
					multiline="p"
					className="vid-content"
					onChange={ onChangeContent }
					value={ content }
				/>

				<div className={ `wp-block-mediagallery-item-media-links` }>
					<ul>
						{ mediaLinks.map( ( item, index ) => {
							return (
								<li
									key={ index }
									className={
										selectedLink === index
											? `is-selected m${ index }`
											: null
									}
								>
									<Tooltip
										text={ __(
											'Edit Media Link',
											'mg-block-item'
										) }
									>
										<button
											aria-label={ __(
												'Edit Media Link',
												'mg-block-item'
											) }
											onClick={ () =>
												setSelectedLink( index )
											}
										>
											<Icon icon={ item.icon } />
										</button>
									</Tooltip>
								</li>
							);
						} ) }

						{ isSelected && (
							<li
								className={ `wp-block-mediagallery-item-media-icons` }
							>
								<Tooltip
									text={ __(
										'Add Media Link',
										'mg-block-item'
									) }
								>
									<button
										aria-label={ __(
											'Add Media Link',
											'mg-block-item'
										) }
										onClick={ addNewMediaItem }
									>
										<Icon icon="plus" />
									</button>
								</Tooltip>
							</li>
						) }
					</ul>
				</div>

				{ selectedLink !== undefined && (
					<div
						className={ `wp-block-mediagallery-item-media-link-form` }
					>
						<TextControl
							label={ __( 'Icon', 'mg-block-item' ) }
							value={ mediaLinks[ selectedLink ].icon }
							onChange={ ( icon ) => {
								updateMediaItem( 'icon', icon );
							} }
						/>
						<TextControl
							label={ __( 'URL', 'mg-block-item' ) }
							value={ mediaLinks[ selectedLink ].link }
							onChange={ ( link ) => {
								updateMediaItem( 'link', link );
							} }
						/>
						<Button isDestructive onClick={ removeMediaItem }>
							{ __( 'Remove link', 'mg-block-item' ) }
						</Button>
					</div>
				) }
			</div>
		</>
	);
}

export default withNotices( Edit );
