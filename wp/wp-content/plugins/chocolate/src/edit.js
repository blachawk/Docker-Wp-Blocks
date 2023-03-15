import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';

import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { text, alignment } = attributes;

	//test | lets now see values for attributes and props
	//console.log( attributes, props );

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { alignment: newAlignment } );
	};
	const onChangeText = ( newText ) => {
		setAttributes( { text: newText } );
	};

	// additional options for our RichText component - https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/rich-text/README.md
	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>

			{ /* https://developer.wordpress.org/block-editor/reference-guides/richtext/#example */ }
			<RichText
				{ ...useBlockProps( {
					className: `text-box-align-${ alignment }`,
				} ) }
				onChange={ onChangeText }
				value={ text }
				placeholder={ __( 'My chocolate placeholder', 'chocolate' ) }
				tagName="h4"
			/>
		</>
	);
}
