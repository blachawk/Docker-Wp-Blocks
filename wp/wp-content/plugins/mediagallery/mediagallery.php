<?php
/**
	* Plugin Name:       Media Gallery
	* Description:       A collection of media assets to support a pop-up gallery
	* Requires at least: 5.9
	* Requires PHP:      7.0
	* Version:           0.1.1
	* Author:            blachawk
	* License:           GPL-2.0-or-later
	* License URI:       https://www.gnu.org/licenses/gpl-2.0.html
	* Text Domain:       mg-block
	*
	* @package           blocks-media
	*/


/* Exit if accessed directly */
if (!defined('ABSPATH'))
	exit;

/**
	* lets get font-aweome wired up to the back-end and front-end
	*/
function _bh_block_styles()
{
	wp_enqueue_style(
		'_bh-google-fonts-anton',
		'https://fonts.googleapis.com/css2?family=Anton&display=swap',
		array(),
		'1.0'
	);

	wp_enqueue_style(
		'_bh-google-fonts-mon',
		'https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap',
		array(),
		'1.0'
	);

}
add_action('wp_enqueue_scripts', '_bh_block_styles');
add_action('admin_enqueue_scripts', '_bh_block_styles');


function _bh_block_fonts()
{
	wp_enqueue_style(
		'_bh-font-awesome-css',
		'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
	);

	wp_enqueue_script(
		'_bh-font-awesome-js',
		'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/js/solid.min.js',
		array(),
		NULL,
		true
	);
}
add_action('wp_enqueue_scripts', '_bh_block_fonts');

/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
function blocks_media_mg_block_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'blocks_media_mg_block_block_init');