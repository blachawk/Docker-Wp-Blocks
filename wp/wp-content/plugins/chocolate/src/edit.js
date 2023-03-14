import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	ToolbarDropdownMenu,
} from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { text } = attributes;

	// additional options for our RichText component - https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/rich-text/README.md
	return (
		<>
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

			<RichText
				{ ...useBlockProps() }
				onChange={ ( value ) => setAttributes( { text: value } ) }
				value={ text }
				placeholder={ __( 'My chocolate placeholder', 'chocolate' ) }
				tagName="h4"
				// allowedFormats={ 'core/bold' }
			/>
		</>
	);
}
