<?php
/**
 * Standard Page Template (Compatible with Gutenberg, Elementor, Divi & Shortcodes)
 *
 * @package Coherencia
 */

get_header();
?>

<main id="primary" class="site-main w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 relative z-10">
    <?php
    while ( have_posts() ) :
        the_post();
        ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class( 'bg-slate-900/80 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl backdrop-blur-sm' ); ?>>
            <header class="entry-header mb-6 border-b border-slate-800 pb-4">
                <?php the_title( '<h1 class="entry-title text-2xl sm:text-3xl font-extrabold text-white tracking-tight">', '</h1>' ); ?>
            </header>

            <div class="entry-content text-slate-200 text-sm sm:text-base leading-relaxed space-y-4">
                <?php
                the_content();

                wp_link_pages( array(
                    'before' => '<div class="page-links text-xs text-indigo-400 mt-4">' . esc_html__( 'Páginas:', 'coherencia' ),
                    'after'  => '</div>',
                ) );
                ?>
            </div>
        </article>
        <?php
    endwhile;
    ?>
</main>

<?php
get_footer();
