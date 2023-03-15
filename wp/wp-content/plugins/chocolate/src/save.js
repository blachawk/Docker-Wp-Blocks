import {
	useBlockProps,
	RichText,
	getColorClassName,
} from '@wordpress/block-editor';
import classnames from 'classnames';

export default function save( { attributes } ) {
	const {
		text,
		alignment,
		backgroundColor,
		textColor,
		customBackgroundColor,
		customTextColor,
	} = attributes;

	//test
	console.log( attributes );

	const backgroundClass = getColorClassName(
		'background-color',
		backgroundColor
	);

	const textClass = getColorClassName( 'color', textColor );

	//test
	console.log( backgroundColor, textClass );

	//improve our usage of class names by using classnames
	const classes = classnames( `text-box-align-${ alignment }`, {
		[ backgroundClass ]: backgroundClass,
		[ textClass ]: textClass,
	} );

	//test
	console.log( classes );

	return (
		<RichText.Content
			{ ...useBlockProps.save( {
				className: classes,
				style: {
					backgroundColor: backgroundClass
						? undefined
						: customBackgroundColor,
					color: textClass ? undefined : customTextColor,
				},
			} ) }
			tagName="h4"
			value={ text }
		/>
	);
}
