<?php
/**
 * Single Post Template for WordPress blog posts and audit reports
 *
 * @package Coherencia
 */

get_header();
?>

<main id="primary" class="site-main w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 relative z-10">
    <?php
    while ( have_posts() ) :
        the_post();
        ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class( 'bg-slate-900/80 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl backdrop-blur-sm' ); ?>>
            <header class="entry-header mb-6 border-b border-slate-800 pb-4">
                <div class="flex items-center gap-2 text-xs text-indigo-400 font-mono mb-2">
                    <span><?php echo esc_html( get_the_date() ); ?></span>
                    <span>·</span>
                    <span><?php the_category( ', ' ); ?></span>
                </div>
                <?php the_title( '<h1 class="entry-title text-2xl sm:text-3xl font-extrabold text-white tracking-tight">', '</h1>' ); ?>
            </header>

            <?php if ( has_post_thumbnail() ) : ?>
                <div class="post-thumbnail mb-6 rounded-xl overflow-hidden border border-slate-800">
                    <?php the_post_thumbnail( 'large', array( 'class' => 'w-full h-auto object-cover' ) ); ?>
                </div>
            <?php endif; ?>

            <div class="entry-content text-slate-200 text-sm sm:text-base leading-relaxed space-y-4">
                <?php the_content(); ?>
            </div>
        </article>
        <?php
    endwhile;
    ?>
</main>

<?php
get_footer();
