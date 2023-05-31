/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

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
	InspectorControls,
} from '@wordpress/block-editor';

import { PanelBody, RangeControl } from '@wordpress/components';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { columns } = attributes;

	const onChangeColumns = ( newColumns ) => {
		setAttributes( { columns: newColumns } );
	};

	const blockProps = useBlockProps( {
		//	className: 'my-mg-block-group'
	} );

	//SET FOR RENDER APPENDER
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: [ 'mediagallery/item' ],
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

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label={ __( 'Columns', 'mg-block' ) }
						min={ 1 }
						max={ 6 }
						onChange={ onChangeColumns }
						value={ columns }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...innerBlocksProps }></div>
		</>
	);
}
