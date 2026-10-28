<?php
/**
 * Template Name: COHERENCIA · Auditoría Gubernamental (100 Días)
 * Template Post Type: page, post
 *
 * Front Page and Custom Page Template for COHERENCIA v2.0
 *
 * @package Coherencia
 */

get_header();
?>

<main id="primary" class="site-main flex-1 relative z-10">
    <?php get_template_part( 'template-parts/auditor', 'dashboard' ); ?>
</main>

<?php
get_footer();
