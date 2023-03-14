<?php
/**
	* Plugin Name:       Chocolate
	* Description:       A clone of vanilla, but with flavor.
	* Requires at least: 5.9
	* Requires PHP:      7.0
	* Version:           0.1.0
	* Author:            Blackhawks
	* License:           GPL-2.0-or-later
	* License URI:       https://www.gnu.org/licenses/gpl-2.0.html
	* Text Domain:       vanilla
	*
	* @package           course-blocks
	*/

/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
function course_blocks_chocolate_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'course_blocks_chocolate_block_init');