import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { text } = attributes;

	// additional options for our RichText component - https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/rich-text/README.md
	return (
		<>
			<BlockControls group="inline">
				<p>Inline Controls</p>
			</BlockControls>

			<BlockControls
				controls={ [
					{
						title: 'Button 1',
						icon: 'admin-generic',
						isActive: true,
						onClick: () => console.log( 'Button 1 clicked!' ),
					},
					{
						title: 'Button 2',
						icon: 'admin-collapse',
						onClick: () => console.log( 'Button 2 clicked!' ),
					},
				] }
			/>
			<RichText
				{ ...useBlockProps() }
				onChange={ ( value ) => setAttributes( { text: value } ) }
				value={ text }
				placeholder={ __( 'My chocolate placeholder', 'chocolate' ) }
				tagName="h4"
				allowedFormats={ 'core/bold' }
			/>

			<BlockControls>
				<p>Other Controls</p>
			</BlockControls>
		</>
	);
}
