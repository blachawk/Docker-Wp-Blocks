import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
	AlignmentToolbar,
	PanelColorSettings,
	ContrastChecker,
	withColors,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	ToolbarDropdownMenu,
	TextControl,
	TextareaControl,
	ToggleControl,
	ColorPicker,
} from '@wordpress/components';
import './editor.scss';

function Edit( props ) {
	const {
		attributes,
		setAttributes,
		backgroundColor,
		textColor,
		setBackgroundColor,
		setTextColor,
	} = props;
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
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'My Color Settings', 'chocolate' ) }
					icon="admin-appearance"
					initialOpen
					disableCustomColors={ false }
					colorSettings={ [
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __( 'Background Color', 'chocolate' ),
						},
						{
							value: textColor.color,
							onChange: setTextColor,
							label: __( 'Text Color', 'chocolate' ),
						},
					] }
				>
					<ContrastChecker
						textColor={ textColor.color }
						backgroundColor={ backgroundColor.color }
					/>

					<TextControl
						label="Input Label"
						value={ text }
						onChange={ onChangeText }
						help="my help text"
					/>
					<TextareaControl
						label="Text Area Label"
						value={ text }
						onChange={ onChangeText }
						help="my help text v2"
					/>
					<ToggleControl
						label="Toggle Label"
						checked={ true }
						onChange={ ( v ) => console.log( v ) }
					/>
					<ColorPicker
						color={ 'F03' }
						onChangeComplete={ ( v ) => console.log( v ) }
					/>
				</PanelColorSettings>
			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>

			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						title="Button 1"
						icon="admin-generic"
						isActive="true"
						onClick={ () => console.log( 'Button 1' ) }
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						title="Align Left"
						icon="editor-alignleft"
						onClick={ () => console.log( 'Align Left' ) }
					></ToolbarButton>
					<ToolbarButton
						title="Align Center"
						icon="editor-aligncenter"
						onClick={ () => console.log( 'Align Center' ) }
					></ToolbarButton>
					<ToolbarButton
						title="Align Right"
						icon="editor-alignright"
						onClick={ () => console.log( 'Align Right' ) }
					></ToolbarButton>

					<ToolbarDropdownMenu
						icon="arrow-down-alt2"
						label={ __( 'More Alignments', 'chocolate' ) }
						controls={ [
							{
								title: __( 'Wide', 'chocolate' ),
								icon: 'align-wide',
								onClick: () => console.log( 'Align Wide' ),
							},
							{
								title: __( 'Full', 'chocolate' ),
								icon: 'align-full-width',
								onClick: () => console.log( 'Align Full' ),
							},
						] }
					/>
				</ToolbarGroup>
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
				style={ {
					textAlign: alignment,
					backgroundColor: backgroundColor.color,
					color: textColor.color,
				} }
			/>
		</>
	);
}

export default withColors( {
	backgroundColor: 'backgroundColor',
	textColor: 'color',
} )( Edit );
