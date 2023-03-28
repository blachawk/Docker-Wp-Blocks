<?php
/**
	* Plugin Name:       List Block
	* Description:       A custom list block crafted by blachawk
	* Requires at least: 5.9
	* Requires PHP:      7.0
	* Version:           0.1.0
	* Author:            blachawk
	* License:           GPL-2.0-or-later
	* License URI:       https://www.gnu.org/licenses/gpl-2.0.html
	* Text Domain:       bh-l
	*
	* @package           blachawk-blocks
	*/

/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
function blachawk_blocks_bh_l_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'blachawk_blocks_bh_l_block_init');