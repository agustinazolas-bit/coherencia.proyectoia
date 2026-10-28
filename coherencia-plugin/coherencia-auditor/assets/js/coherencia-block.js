(function (blocks, element) {
    var el = element.createElement;
    blocks.registerBlockType('coherencia/auditor', {
        title: 'COHERENCIA · El Auditor (IA 2026)',
        icon: 'shield',
        category: 'widgets',
        attributes: {
            theme: { type: 'string', default: 'dark' }
        },
        edit: function (props) {
            return el(
                'div',
                {
                    style: {
                        padding: '20px',
                        backgroundColor: '#0f172a',
                        color: '#f1f5f9',
                        borderRadius: '16px',
                        border: '1px solid #334155',
                        fontFamily: 'system-ui, sans-serif'
                    }
                },
                el('strong', { style: { color: '#818cf8', display: 'block', marginBottom: '6px' } }, '🛡️ COHERENCIA · EL AUDITOR (Bloque WordPress)'),
                el('p', { style: { fontSize: '13px', margin: 0, color: '#cbd5e1' } }, 'Este bloque renderizará el panel interactivo de auditoría gubernamental (11 mar – 19 jun 2026) compatible con tu tema actual de WordPress.')
            );
        },
        save: function () {
            return null; // Rendered dynamically via PHP shortcode callback
        }
    });
})(window.wp.blocks, window.wp.element);
