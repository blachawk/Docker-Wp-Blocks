import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { isBlobURL } from '@wordpress/blob';
import { Spinner, withNotices } from '@wordpress/components';

function Edit({ attributes, setAttributes, noticeOperations, noticeUI }) {
	const { name, bio, url, alt } = attributes;

	const blockProps = useBlockProps({
		className: 'my-team-member-class-item',
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps);

	const onChangeName = (newName) => {
		setAttributes({ name: newName });
	};

	const onChangeBio = (newBio) => {
		setAttributes({ bio: newBio });
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

	return (
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
	);
}

export default withNotices(Edit);
