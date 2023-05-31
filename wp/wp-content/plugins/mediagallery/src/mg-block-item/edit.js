import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
	const { name, title, content } = attributes;

	const onChangeName = ( newName ) => {
		setAttributes( { name: newName } );
	};

	const onChangeTitle = ( newTitle ) => {
		setAttributes( { title: newTitle } );
	};

	const onChangeContent = ( newContent ) => {
		setAttributes( { content: newContent } );
	};

	const blockProps = useBlockProps( {
		//className: 'custom-class-item'
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		//		allowedBlocks: [ 'core/heading', 'core/paragraph' ],
		//allowedBlocks: [ 'core/heading', 'core/paragraph', 'core/image' ],
	} );

	return (
		<>
			<div { ...innerBlocksProps }>
				<RichText
					placeholder={ __( 'Media Name', 'mg-block-item' ) }
					tagName="h2"
					className="vid-name"
					onChange={ onChangeName }
					value={ name }
					allowedFormats={ [] }
				/>

				<RichText
					placeholder={ __( 'Media Title', 'mg-block-item' ) }
					tagName="div"
					multiline="p"
					className="vid-title"
					onChange={ onChangeTitle }
					value={ title }
					allowedFormats={ [ 'core/bold' ] }
				/>

				<RichText
					placeholder={ __( 'Media Content', 'mg-block-item' ) }
					tagName="div"
					multiline="p"
					className="vid-content"
					onChange={ onChangeContent }
					value={ content }
					allowedFormats={ [] }
				/>
			</div>
		</>
	);
}
