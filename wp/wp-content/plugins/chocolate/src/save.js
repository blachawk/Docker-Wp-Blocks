import { useBlockProps, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function save( { attributes } ) {
	const { text, alignment } = attributes;

	//improve our usage of class names by using classnames
	const classes = classnames( `text-box-align-${ alignment }` );

	//test
	console.log( classes );

	return (
		<RichText.Content
			{ ...useBlockProps.save( {
				className: classes,
			} ) }
			tagName="h4"
			value={ text }
		/>
	);
}
