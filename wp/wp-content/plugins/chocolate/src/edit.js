import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	//eslint-disable-next-line
	__experimentalBoxControl as BoxControl,
	PanelBody,
} from '@wordpress/components';

import classnames from 'classnames';

import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { text, alignment, shadow } = attributes;

	//test | lets now see values for attributes and props
	//console.log( attributes, props );

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { alignment: newAlignment } );
	};
	const onChangeText = ( newText ) => {
		setAttributes( { text: newText } );
	};
	const toggleShadow = () => {
		setAttributes( { shadow: ! shadow } );
	};

	//all for shadows
	const classes = classnames( `text-box-align-${ alignment }`, {
		'has-shadow': shadow,
	} );

	// additional options for our RichText component - https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/rich-text/README.md
	return (
		<>
			<InspectorControls>
				<PanelBody>
					<BoxControl onChange={ ( v ) => console.log( v ) } />
				</PanelBody>
			</InspectorControls>

			<BlockControls
				controls={ [
					{
						icon: 'admin-page',
						title: __( 'Shadow', 'chocolate' ),
						onClick: toggleShadow,
						isActive: shadow,
					},
				] }
			>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>

			{ /* https://developer.wordpress.org/block-editor/reference-guides/richtext/#example */ }
			<RichText
				{ ...useBlockProps( {
					className: classes,
				} ) }
				onChange={ onChangeText }
				value={ text }
				placeholder={ __( 'My chocolate placeholder', 'chocolate' ) }
				tagName="h4"
			/>
		</>
	);
}
