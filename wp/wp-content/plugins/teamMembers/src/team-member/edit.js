import { useEffect, useState, useRef } from '@wordpress/element';
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import {
	Spinner,
	withNotices,
	ToolbarButton,
	PanelBody,
	TextareaControl,
} from '@wordpress/components';

function Edit({ attributes, setAttributes, noticeOperations, noticeUI }) {
	const { name, bio, url, alt, id } = attributes;

	//help fight memory leaks to help free up memory
	const [blobURL, setBlobURL] = useState();

	const blockProps = useBlockProps({
		className: 'my-team-member-class-item',
	});

	//focusing on name input after selecting an image
	const titleRef = useRef();

	const innerBlocksProps = useInnerBlocksProps(blockProps);

	const onChangeName = (newName) => {
		setAttributes({ name: newName });
	};

	const onChangeBio = (newBio) => {
		setAttributes({ bio: newBio });
	};

	const onChangeAlt = (newAlt) => {
		setAttributes({ alt: newAlt });
	};

	const onSelectImage = (image) => {
		//test
		//console.log(image);
		if (!image || !image.url) {
			setAttributes({ url: undefined, id: undefined, alt: '' });
			return;
		}
		setAttributes({ url: image.url, id: image.id, alt: image.alt });
	};

	const onSelectURL = (newURL) => {
		setAttributes({
			url: newURL,
			id: undefined,
			alt: '',
		});
	};

	const onUploadError = (message) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(message);
	};

	//Edge cases to fight against browser refreshes when media is uploading at the same time
	useEffect(() => {
		if (!id && isBlobURL(url)) {
			setAttributes({
				url: undefined,
				alt: '',
			});
		}
	}, []);

	//Fight against memory leaks
	useEffect(() => {
		if (isBlobURL(url)) {
			setBlobURL(url);
		} else {
			revokeBlobURL(blobURL);
			setBlobURL();
		}
	}, [url]);

	//focusing on name input after selecting an image
	useEffect(() => {
		titleRef.current.focus();
	}, [url]);

	//remove image button function
	const removeImage = () => {
		setAttributes({
			url: undefined,
			alt: '',
			id: undefined,
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Image Settings', 'tml')}>
					{url && !isBlobURL(url) && (
						<TextareaControl
							label={__('Alt Text', 'tml')}
							value={alt}
							onChange={onChangeAlt}
							help={__(
								'Alternative text describe your actions to editors here so they understand what is going on.',
								'tml'
							)}
						/>
					)}
				</PanelBody>
			</InspectorControls>

			{url && (
				<BlockControls group="inline">
					<div className={`mMediaBtns`}>
						<MediaReplaceFlow
							name={__('Replace Image', 'tml')}
							onSelect={onSelectImage}
							onSelectURL={onSelectURL}
							onError={onUploadError}
							accept="image/*"
							allowedTypes={['image']}
							mediaId={id}
							mediaURL={url}
						/>
						<ToolbarButton onClick={removeImage}>
							{__('Remove Image', 'tml')}
						</ToolbarButton>
					</div>
				</BlockControls>
			)}
			<div {...innerBlocksProps}>
				{url && (
					<div
						className={`wp-block-course-blocks-team-member-img ${
							isBlobURL(url) ? 'is-loading' : ''
						}`}
					>
						<img src={url} alt={alt} />
						{isBlobURL(url) && <Spinner />}
					</div>
				)}
				<MediaPlaceholder
					icon="admin-users"
					onSelect={onSelectImage}
					onSelectURL={onSelectURL}
					onError={onUploadError}
					// accept="image/*"
					allowedTypes={['image']}
					disableMediaButtons={url}
					notices={noticeUI}
				/>
				<RichText
					ref={titleRef}
					placeholder={__('Member Name', 'tml')}
					tagName="h4"
					onChange={onChangeName}
					value={name}
				/>
				<RichText
					placeholder={__('Member Bio', 'tml')}
					tagName="p"
					onChange={onChangeBio}
					value={bio}
				/>
			</div>
		</>
	);
}

export default withNotices(Edit);
