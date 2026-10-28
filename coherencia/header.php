<?php
/**
 * Header template for COHERENCIA v2.0
 * Compatible with WordPress Custom Logo, Nav Menus, and Admin Bar
 *
 * @package Coherencia
 */
$default_mode = get_option( 'coherencia_default_theme_mode', 'dark' );
$body_mode_class = ( $default_mode === 'light' ) ? 'coherencia-light-mode' : '';
?><!doctype html>
<html <?php language_attributes(); ?> class="h-full">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <?php wp_head(); ?>
</head>
<body <?php body_class( 'min-h-screen bg-slate-900 text-slate-100 font-sans antialiased flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-x-hidden ' . $body_mode_class ); ?>>
<?php wp_body_open(); ?>

<!-- Ambient radial glow blur lights -->
<div class="fixed top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
<div class="fixed bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

<!-- Top Navigation Bar (Respects #wpadminbar via .coherencia-sticky-header) -->
<header class="coherencia-sticky-header w-full bg-slate-900/80 border-b border-slate-800 backdrop-blur-md sticky top-0 z-30 transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        <!-- Brand Logo (Supports WordPress Custom Logo or Default Auditor Identity) -->
        <div class="flex items-center gap-3.5">
            <?php if ( has_custom_logo() ) : ?>
                <div class="coherencia-custom-logo">
                    <?php the_custom_logo(); ?>
                </div>
            <?php else : ?>
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="flex items-center gap-3 cursor-pointer group select-none no-underline">
                    <div class="relative w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:bg-indigo-500 transition-all">
                        <div class="w-4 h-4 rounded-xs border-2 border-white rotate-45 flex items-center justify-center">
                            <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
                        </div>
                        <span class="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950"></span>
                    </div>
                    <span class="font-extrabold tracking-tight text-white text-xl uppercase font-sans flex items-center">
                        <?php bloginfo( 'name' ); ?>
                        <span class="text-xs text-indigo-400 font-semibold tracking-wider lowercase px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 ml-1.5 hidden sm:inline">ai auditor</span>
                    </span>
                </a>
            <?php endif; ?>
        </div>

        <!-- Navigation Links (Supports WordPress Primary Menu or Interactive Auditor Modals) -->
        <nav class="hidden md:flex items-center gap-7 text-sm font-medium">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="text-indigo-400 font-semibold border-b-2 border-indigo-500 py-1 transition-colors no-underline">
                Inicio
            </a>
            <button type="button" data-modal-target="modal-compromisos" class="modal-trigger text-slate-300 hover:text-white py-1 transition-colors bg-transparent border-0 cursor-pointer">
                100 Días (14 Compromisos)
            </button>
            <button type="button" data-modal-target="modal-metodologia" class="modal-trigger text-slate-400 hover:text-white py-1 transition-colors bg-transparent border-0 cursor-pointer">
                Metodología (ética)
            </button>
            <button type="button" data-modal-target="modal-repositorio" class="modal-trigger text-slate-400 hover:text-white py-1 transition-colors bg-transparent border-0 cursor-pointer">
                Repositorio
            </button>
            <button type="button" data-modal-target="modal-acerca" class="modal-trigger text-slate-400 hover:text-white py-1 transition-colors bg-transparent border-0 cursor-pointer">
                Acerca de
            </button>
        </nav>

        <!-- Right Utility Buttons -->
        <div class="flex items-center gap-2.5">
            <button type="button" data-modal-target="modal-share" title="Compartir auditoría" class="modal-trigger w-9 h-9 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/90 hover:border-slate-600 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-xs cursor-pointer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="18" cy="5" r="3" stroke-width="2"></circle>
                    <circle cx="6" cy="12" r="3" stroke-width="2"></circle>
                    <circle cx="18" cy="19" r="3" stroke-width="2"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke-width="2"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke-width="2"></line>
                </svg>
            </button>

            <button type="button" id="btn-theme-toggle-wp" title="Alternar modo oscuro / claro compatible con temas" class="w-9 h-9 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/90 hover:border-slate-600 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-xs cursor-pointer">
                <div class="w-3.5 h-3.5 rounded-xs border-1.5 border-current rotate-45"></div>
            </button>
        </div>

    </div>

    <!-- Mobile Nav Bar -->
    <div class="md:hidden flex items-center justify-around border-t border-slate-800/80 py-2.5 px-2 text-xs bg-slate-900/90">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="px-2.5 py-1 rounded-md text-indigo-400 font-semibold bg-indigo-500/10 no-underline">Inicio</a>
        <button type="button" data-modal-target="modal-compromisos" class="modal-trigger px-2.5 py-1 rounded-md text-slate-300 bg-transparent border-0">100 Días</button>
        <button type="button" data-modal-target="modal-metodologia" class="modal-trigger px-2.5 py-1 rounded-md text-slate-400 bg-transparent border-0">Metodología</button>
        <button type="button" data-modal-target="modal-repositorio" class="modal-trigger px-2.5 py-1 rounded-md text-slate-400 bg-transparent border-0">Repositorio</button>
    </div>
</header>
