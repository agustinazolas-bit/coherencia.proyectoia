<?php
/**
 * Footer template & Interactive Modals for COHERENCIA v2.0
 *
 * @package Coherencia
 */
?>

<?php if ( is_active_sidebar( 'coherencia-sidebar-1' ) ) : ?>
    <aside class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <?php dynamic_sidebar( 'coherencia-sidebar-1' ); ?>
    </aside>
<?php endif; ?>

<!-- Footer Signature -->
<footer class="w-full border-t border-slate-800 bg-slate-900/90 py-5 px-4 text-center text-xs text-slate-500 relative z-10">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span><?php bloginfo( 'name' ); ?> · Auditoría y fact-checking gubernamental automatizado (Período: 11 mar - 19 jun 2026)</span>
        </div>
        <div class="flex items-center gap-5 text-slate-400 flex-wrap justify-center">
            <button type="button" data-modal-target="modal-compromisos" class="modal-trigger hover:text-indigo-400 transition-colors bg-transparent border-0 cursor-pointer">
                100 Días (14 Compromisos)
            </button>
            <button type="button" data-modal-target="modal-metodologia" class="modal-trigger hover:text-indigo-400 transition-colors bg-transparent border-0 cursor-pointer">
                Metodología
            </button>
            <button type="button" data-modal-target="modal-repositorio" class="modal-trigger hover:text-indigo-400 transition-colors bg-transparent border-0 cursor-pointer">
                Vectores de datos
            </button>
            <button type="button" data-modal-target="modal-acerca" class="modal-trigger hover:text-indigo-400 transition-colors bg-transparent border-0 cursor-pointer">
                Observatorio
            </button>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
