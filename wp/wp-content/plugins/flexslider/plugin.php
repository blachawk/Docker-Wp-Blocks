<?php
/**
	* Plugin Name:       WooThemes Flexslider 2 Block
	* Description:       Lets fuse the WooThemes Flexslider 2 into Gutenberg Blocks
	* Requires at least: 5.9
	* Requires PHP:      7.0
	* Version:           0.1.0
	* Author:            blachawk
	* License:           GPL-2.0-or-later
	* License URI:       https://www.gnu.org/licenses/gpl-2.0.html
	* Text Domain:       _fs
	*
	* @package           blachawk-blocks
	*/



// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}


//ENQUEUE FLEXSLIDER 2 SCRIPTS HERE
function _fs_scripts()
{

	wp_enqueue_script(
		'fs-scripts-js',
		'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/js/solid.min.js',
		array(),
		NULL,
		true
	);

	wp_enqueue_script(
		'fs-scripts-custom-js',
		'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/js/solid.min.js',
		array(),
		NULL,
		true
	);

}
add_action('wp_enqueue_scripts', '_fs_scripts');


/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
function blachawk_blocks_flexslider_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'blachawk_blocks_flexslider_block_init');