<?php
/**
 * Plugin Name: COHERENCIA - El Auditor (Universal para todos los Temas WP)
 * Plugin URI: https://coherencia.cl
 * Description: Plugin universal de auditoría gubernamental automatizada y fact-checking con IA (EL AUDITOR · 11 mar – 19 jun 2026). 100% compatible con cualquier tema de WordPress (Astra, GeneratePress, Kadence, Hello Elementor, Divi, Twenty Twenty-Four, Twenty Twenty-Five, temas de bloques y clásicos) mediante el shortcode [coherencia_auditor] o bloque de Gutenberg sin alterar los estilos del tema activo.
 * Version: 2.0.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: COHERENCIA Observatorio
 * Author URI: https://coherencia.cl
 * License: GPL v2 or later
 * Text Domain: coherencia-plugin
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'COHERENCIA_PLUGIN_VERSION', '2.0.0' );
define( 'COHERENCIA_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'COHERENCIA_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

/**
 * 1. Register assets and enqueue them cleanly when shortcode/block is used
 */
function coherencia_plugin_register_assets() {
    wp_register_style(
        'coherencia-fonts',
        'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
        array(),
        null
    );

    wp_register_script(
        'tailwindcss',
        'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
        array(),
        null,
        false
    );

    wp_register_style(
        'coherencia-plugin-scoped-style',
        COHERENCIA_PLUGIN_URL . 'assets/css/coherencia-plugin.css',
        array( 'coherencia-fonts' ),
        COHERENCIA_PLUGIN_VERSION
    );

    wp_register_script(
        'coherencia-js',
        COHERENCIA_PLUGIN_URL . 'assets/js/coherencia.js',
        array(),
        COHERENCIA_PLUGIN_VERSION,
        true
    );
}
add_action( 'wp_enqueue_scripts', 'coherencia_plugin_register_assets' );

/**
 * 2. Include REST API & Data Catalog if not already loaded by COHERENCIA Theme
 */
if ( ! function_exists( 'coherencia_get_verified_videos' ) ) {
    require_once COHERENCIA_PLUGIN_DIR . 'includes/api-engine.php';
}

/**
 * 3. Shortcode [coherencia_auditor theme="dark|light" width="wide|full"]
 * Compatible with ANY WordPress Theme (Astra, GeneratePress, Elementor, Divi, FSE)
 */
if ( ! shortcode_exists( 'coherencia_auditor' ) ) {
    function coherencia_plugin_render_shortcode( $atts ) {
        $atts = shortcode_atts( array(
            'theme' => get_option( 'coherencia_default_theme_mode', 'dark' ),
            'width' => 'wide',
        ), $atts, 'coherencia_auditor' );

        wp_enqueue_style( 'coherencia-fonts' );
        wp_enqueue_script( 'tailwindcss' );
        wp_enqueue_style( 'coherencia-plugin-scoped-style' );
        wp_enqueue_script( 'coherencia-js' );

        wp_localize_script( 'coherencia-js', 'coherenciaConfig', array(
            'restUrl'     => esc_url_raw( rest_url( 'coherencia/v1/audit' ) ),
            'baselineUrl' => esc_url_raw( rest_url( 'coherencia/v1/baseline' ) ),
            'nonce'       => wp_create_nonce( 'wp_rest' ),
            'siteUrl'     => esc_url( home_url( '/' ) ),
            'themeMode'   => $atts['theme'],
            'videos'      => function_exists( 'coherencia_get_verified_videos' ) ? coherencia_get_verified_videos() : array(),
            'commitments' => function_exists( 'coherencia_get_100_days_commitments' ) ? coherencia_get_100_days_commitments() : array(),
        ) );

        $theme_class = ( $atts['theme'] === 'light' ) ? 'coherencia-theme-light bg-slate-50 text-slate-900' : 'coherencia-theme-dark bg-slate-900 text-slate-100';
        $width_class = ( $atts['width'] === 'full' ) ? 'alignfull' : 'alignwide';

        ob_start();
        echo '<div class="coherencia-wp-scope ' . esc_attr( $theme_class . ' ' . $width_class ) . ' rounded-3xl p-2 sm:p-6 my-6 shadow-2xl border border-slate-800/80 overflow-hidden">';
        include COHERENCIA_PLUGIN_DIR . 'template-parts/auditor-dashboard.php';
        echo '</div>';
        return ob_get_clean();
    }
    add_shortcode( 'coherencia_auditor', 'coherencia_plugin_render_shortcode' );
}

/**
 * 4. Register Dynamic Gutenberg Block (coherencia/auditor) for Block Themes / FSE
 */
function coherencia_plugin_register_gutenberg_block() {
    if ( ! function_exists( 'register_block_type' ) ) {
        return;
    }

    wp_register_script(
        'coherencia-block-editor',
        COHERENCIA_PLUGIN_URL . 'assets/js/coherencia-block.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor' ),
        COHERENCIA_PLUGIN_VERSION,
        true
    );

    register_block_type( 'coherencia/auditor', array(
        'editor_script'   => 'coherencia-block-editor',
        'render_callback' => function( $attributes ) {
            $theme = isset( $attributes['theme'] ) ? $attributes['theme'] : 'dark';
            return do_shortcode( '[coherencia_auditor theme="' . esc_attr( $theme ) . '"]' );
        },
    ) );
}
add_action( 'init', 'coherencia_plugin_register_gutenberg_block' );
