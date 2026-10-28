<?php
/**
 * Main template file (Fallback / Archive / Index)
 * If no static front page is set, renders the COHERENCIA Auditor Dashboard on home
 *
 * @package Coherencia
 */

get_header();
?>

<main id="primary" class="site-main flex-1 relative z-10">
    <?php if ( is_home() || is_front_page() ) : ?>
        <?php get_template_part( 'template-parts/auditor', 'dashboard' ); ?>
    <?php else : ?>
        <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="bg-slate-800/70 rounded-2xl border border-slate-700/80 p-8 shadow-xl backdrop-blur-sm max-w-3xl mx-auto">
                <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class( 'mb-8 pb-8 border-b border-slate-700/60 last:border-0 last:mb-0 last:pb-0' ); ?>>
                        <h2 class="text-xl font-bold text-white mb-2">
                            <a href="<?php the_permalink(); ?>" class="hover:text-indigo-400 transition-colors no-underline text-white"><?php the_title(); ?></a>
                        </h2>
                        <div class="text-slate-300 text-sm leading-relaxed">
                            <?php the_excerpt(); ?>
                        </div>
                    </article>
                <?php endwhile; else : ?>
                    <h1 class="text-2xl font-bold text-white mb-3">COHERENCIA · Auditoría Gubernamental</h1>
                    <p class="text-slate-400 text-sm leading-relaxed mb-6">
                        Observatorio digital automatizado para el análisis de políticas públicas y fact-checking institucional.
                    </p>
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl no-underline">
                        Ir al Panel de Auditoría
                    </a>
                <?php endif; ?>
            </div>
        </div>
    <?php endif; ?>
</main>

<?php
get_footer();
