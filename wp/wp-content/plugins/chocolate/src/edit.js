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
	RangeControl,
} from '@wordpress/components';

import classnames from 'classnames';

import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { text, alignment, shadow, shadowOpacity } = attributes;

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
	const onChangeShadowOpacity = ( newShadowOpacity ) => {
		setAttributes( { shadowOpacity: newShadowOpacity } );
	};

	//all for shadows
	const classes = classnames( `text-box-align-${ alignment }`, {
		'has-shadow': shadow,
		[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
	} );

	// additional options for our RichText component - https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/rich-text/README.md
	return (
		<>
			<InspectorControls>
				{ shadow && (
					<PanelBody title={ __( 'Shadow Settings', 'chocolate' ) }>
						<RangeControl
							label={ __( 'Shadow Opacity', 'chocolate' ) }
							value={ shadowOpacity }
							min={ 10 }
							max={ 90 }
							step={ 10 }
							onChange={ onChangeShadowOpacity }
						/>
					</PanelBody>
				) }
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
