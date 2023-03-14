import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { text } = attributes;

	// additional options for our RichText component - https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/rich-text/README.md
	return (
		<RichText
			{ ...useBlockProps() }
			onChange={ ( value ) => setAttributes( { text: value } ) }
			value={ text }
			placeholder={ __( 'My chocolate placeholder', 'chocolate' ) }
			tagName="h4"
			allowedFormats={ 'core/bold' }
		/>
	);
}
