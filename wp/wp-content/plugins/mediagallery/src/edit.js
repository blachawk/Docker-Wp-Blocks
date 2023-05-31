/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
//import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

export default function Edit( { attributes } ) {
	const blockProps = useBlockProps( { className: 'my-mg-block-group' } );

	//SET FOR RENDER APPENDER
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		//allowedBlocks: [ 'blachawk-blocks/mg-block-item' ],
		allowedBlocks: [ 'core/heading', 'core/paragraph' ],
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	//PREVIEW POP-UP AREA
	if ( attributes._cover ) {
		return (
			<div className="previewWindow">
				<img src={ attributes._cover } alt="" />
			</div>
		);
	}

	return <div { ...innerBlocksProps }></div>;
}
