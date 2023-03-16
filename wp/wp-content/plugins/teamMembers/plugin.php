<?php
/**
	* Plugin Name:       Team Members Local
	* Description:       A Team Member platform for nested block learning purposes
	* Requires at least: 5.9
	* Requires PHP:      7.0
	* Version:           0.1.0
	* Author:            blachawk
	* License:           GPL-2.0-or-later
	* License URI:       https://www.gnu.org/licenses/gpl-2.0.html
	* Text Domain:       tml
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
function course_blocks_team_members_local_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'course_blocks_team_members_local_block_init');