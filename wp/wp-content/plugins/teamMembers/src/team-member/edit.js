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
import { usePrevious } from '@wordpress/compose';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import {
	Spinner,
	withNotices,
	ToolbarButton,
	PanelBody,
	TextareaControl,
	Icon,
	Tooltip,
	TextControl,
	Button,
} from '@wordpress/components';

function Edit({
	attributes,
	setAttributes,
	noticeOperations,
	noticeUI,
	isSelected,
}) {
	const { name, bio, url, alt, id, socialLinks } = attributes;

	//help fight memory leaks to help free up memory
	const [blobURL, setBlobURL] = useState();

	const blockProps = useBlockProps({
		className: 'my-team-member-class-item',
	});

	const [selectedLink, setSelectedLink] = useState();

	const prevIsSelected = usePrevious(isSelected);

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
		if (url && isSelected) {
			titleRef.current.focus();
		}
	}, [url]);

	useEffect(() => {
		if (prevIsSelected && !isSelected) {
			setSelectedLink();
		}
	}, [isSelected, prevIsSelected]);

	//remove image button function
	const removeImage = () => {
		setAttributes({
			url: undefined,
			alt: '',
			id: undefined,
		});
	};

	//add new social items (like adding new li items!!!)
	const addNewSocialItem = () => {
		setAttributes({
			socialLinks: [...socialLinks, { icon: 'wordpress', link: '' }],
		});
		setSelectedLink(socialLinks.length);
	};

	const updateSocialItems = (type, value) => {
		const socialLinksCopy = [...socialLinks];
		socialLinksCopy[selectedLink][type] = value;
		setAttributes({ socialLinks: socialLinksCopy });
	};

	const removeSocialItem = () => {
		setAttributes({
			socialLinks: [
				...socialLinks.slice(0, selectedLink),
				...socialLinks.slice(selectedLink + 1),
			],
		});
		setSelectedLink();
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

				<div className="wp-block-course-blocks-team-member-social-links">
					<ul>
						{socialLinks.map((item, index) => {
							return (
								<li
									key={index}
									className={
										selectedLink === index
											? 'is-selected'
											: null
									}
								>
									<button
										aria-label={__(
											'Edit social link',
											'tml'
										)}
										onClick={() => setSelectedLink(index)}
									>
										<Icon icon={item.icon} />
									</button>
								</li>
							);
						})}

						{isSelected && (
							<li className="wp-block-course-blocks-team-member-social-links-add">
								<Tooltip text={__('Add social link', 'tml')}>
									<button
										aria-label={__(
											'Add social link',
											'tml'
										)}
										onClick={addNewSocialItem}
									>
										<Icon icon="plus" />
									</button>
								</Tooltip>
							</li>
						)}
					</ul>
				</div>

				{selectedLink !== undefined && (
					<div className="wp-block-course-blocks-team-member-link-form">
						<TextControl
							label={__('Icon', 'tml')}
							value={socialLinks[selectedLink].icon}
							onChange={(icon) => updateSocialItems('icon', icon)}
						/>
						<TextControl
							label={__('Url', 'tml')}
							value={socialLinks[selectedLink].link}
							onChange={(link) => updateSocialItems('link', link)}
						/>
						<br />
						<Button isDestructive onClick={removeSocialItem}>
							{__('Remove Link', 'tml')}
						</Button>
					</div>
				)}
			</div>
		</>
	);
}

export default withNotices(Edit);
