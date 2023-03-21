import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
export default function Edit({ attributes, setAttributes }) {
	const { name, bio } = attributes;

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

	return (
		<div {...innerBlocksProps}>
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
