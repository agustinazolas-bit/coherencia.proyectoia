# Historial Local de Consultas en HeroSearch

Implementación de un historial interactivo de consultas de auditoría persistido localmente (`localStorage`), posicionado directamente en la parte superior del área de búsqueda en `HeroSearch`, permitiendo a los usuarios reanudar análisis previos con un solo clic.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> A continuación se resumen las decisiones de diseño confirmadas en la fase de clarificación con el usuario:

- **Visualización Superior**: Carrusel horizontal desplazable de fichas (chips) estilizadas con botón de borrado rápido (`Limpiar historial`).
- **Capacidad de Almacenamiento**: Máximo de 5 consultas únicas más recientes, ordenadas cronológicamente de forma inversa (la más reciente al inicio). Si una consulta ya existe, se promueve a la primera posición sin duplicados.
- **Acción al Clic**: Autocompletar el campo de búsqueda y re-ejecutar inmediatamente la auditoría mediante el motor documental RAG + Google Grounding.
- **Persistencia**: Almacenamiento desacoplado en `localStorage` bajo la clave `coherencia_audit_history_v1` con control de errores (modo incógnito / cuota excedida).

---

## 1. Overview & Core Concept

- **Qué hace**: Permite a investigadores, periodistas y auditores ciudadanos acceder de inmediato a sus últimas 5 preguntas realizadas a **EL AUDITOR** sin tener que volver a escribirlas, conservando su sesión de trabajo local entre recargas del navegador.
- **Audiencia objetivo**: Usuarios recurrentes del observatorio que contrastan temas complejos (ej. *Reforma tributaria*, *Control fronterizo*, *Listas de espera*) y necesitan alternar rápidamente entre diferentes áreas de fiscalización.
- **Valor agregado**: Reduce la fricción operativa al mínimo, previene la pérdida de consultas formuladas y acelera las comparativas de políticas públicas.

---

## 2. User Experience & Visual Design

### Flujo de Interacción
1. **Estado Inicial (Sin historial previo)**: La barra de historial permanece oculta o en modo discreto para no ocupar espacio visual innecesario antes de que el usuario formule su primera pregunta.
2. **Ingreso y Registro**: Al enviar una consulta (vía formulario principal, sugerencias o seguimiento), se sanitiza el texto y se inserta al inicio de la lista en `localStorage` (limitado a 5 ítems únicos).
3. **Exploración Visual**: Sobre el cuadro de búsqueda aparece una franja superior elegante con un indicador sutil `Historial reciente (N)` y chips horizontales con scroll táctil suave.
4. **Reanudación Inmediata**: Al pulsar cualquier ficha del historial, se rellena el campo de búsqueda visualmente y se dispara de inmediato el ciclo de auditoría (`onSearch(query)`).
5. **Vaciado Rápido**: Un botón sutil con icono de papelera / aspa permite vaciar el historial local al instante con confirmación no invasiva.

### Identidad Visual y Estilo (Anti-Slop & Dark Slate Aesthetic)
- **Contenedor**: Banda horizontal con overflow desplazable suave (`overflow-x-auto no-scrollbar`), borde inferior sutil y alineación equilibrada con el ancho del formulario (`max-w-2xl mx-auto`).
- **Fichas de Historial (Interactive Buttons)**: Elementos `<button>` funcionales estilizados en `bg-slate-800/80 hover:bg-slate-700/90 text-slate-300 hover:text-white border border-slate-700/70 text-xs rounded-lg px-3 py-1` con microinteracción de escala (`active:scale-95`). Incluyen icono sutil de historial / reloj (`History` de Lucide).
- **Control de Borrado**: Botón discreto `text-slate-500 hover:text-rose-400 text-[11px]` que limpia el almacenamiento local.
- **Accesibilidad**: Etiquetas `aria-label`, foco visible (`focus-visible:ring-2 focus-visible:ring-indigo-500`) y soporte para temas claros y oscuros.

---

## 3. Key Product Decisions & Trade-Offs

- **Decisión 1: localStorage vs. Estado en Servidor**
  - *Enfoque*: `localStorage` en el cliente (`coherencia_audit_history_v1`).
  - *Por qué*: Privacidad absoluta del usuario (no se envían telemetrías ni historiales de navegación al servidor), velocidad instantánea sin latencia de red y persistencia entre sesiones del navegador.
- **Decisión 2: Desduplicación Inteligente**
  - *Enfoque*: Si el usuario busca una consulta existente, esta se mueve al primer lugar del array en lugar de agregarse repetida.
  - *Por qué*: Maximiza la utilidad de los 5 espacios disponibles sin saturar la barra con consultas idénticas.
- **Decisión 3: Re-ejecución Inmediata**
  - *Enfoque*: Al hacer clic en el chip se dispara la búsqueda inmediatamente.
  - *Por qué*: Responde al requerimiento explícito del usuario para agilizar el flujo de trabajo sin requerir un segundo clic en el botón "ENV".

---

## 4. Technical Architecture & Data Strategy

### Diagrama de Flujo y Jerarquía de Componentes

```
┌───────────────────────────────────────────────────────────────┐
│                           App.tsx                             │
│  - handleSearch(query)                                        │
│  - auditData / isLoading state                                │
└───────────────────────────────┬───────────────────────────────┘
                                │ onSearch
                                ▼
┌───────────────────────────────────────────────────────────────┐
│                       HeroSearch.tsx                          │
│                                                               │
│   ┌───────────────────────────────────────────────────────┐   │
│   │   [Historial Reciente Bar] (localStorage sync)        │   │
│   │   🕐 [Consulta 1]  🕐 [Consulta 2] ... [Limpiar]      │   │
│   └───────────────────────────────────────────────────────┘   │
│                                                               │
│   ┌───────────────────────────────────────────────────────┐   │
│   │   [Search Bar Form]                                   │   │
│   │   [ 🔍  Escribe tu consulta...                 [ENV] ]│   │
│   └───────────────────────────────────────────────────────┘   │
│                                                               │
│   ┌───────────────────────────────────────────────────────┐   │
│   │   [Sugerencias rápidas predefinidas]                  │   │
│   └───────────────────────────────────────────────────────┘   │
└───────────────────────────────┬───────────────────────────────┘
                                │
                                ▼
                  localStorage ("coherencia_audit_history_v1")
                  JSON: string[] (máximo 5 elementos)
```

### Mapeo de Estado y Métodos en `HeroSearch.tsx`
- **Estado Local**: `history: string[]` inicializado desde `localStorage`.
- **`saveToHistory(query: string)`**: Normaliza espacios, filtra duplicados, añade al inicio `[query, ...prev.filter(q => q !== query)].slice(0, 5)` y persiste en `localStorage`.
- **`clearHistory()`**: Vacía el estado local y remueve la clave en `localStorage`.
- **`handleHistoryClick(query: string)`**: Actualiza el input `inputValue` y ejecuta `onSearch(query)`.
- **Sincronización con búsquedas externas**: Cada vez que `currentQuery` cambie o el formulario se envíe con éxito, se invoca `saveToHistory`.

---

## 6. Pizarra de Investigación de Detective y Efectos de Sonido de Papel (Actualización)

### Decisiones de Diseño y Requisitos Cumplidos
1. **Fondo de Pizarra de Investigación ("Detective Corkboard & Evidence Pinboard")**:
   - Capa de fondo fija (`fixed inset-0 pointer-events-none z-0`) inspirada en las referencias visuales del usuario (`image_9d2fb2ed.png`, `image_3fc25125.png`, `image_ef962f3e.png`).
   - Opacidad y contraste calibrados con precisión (`opacity: 0.28` en modo oscuro con degradado viñeta central), garantizando que las tarjetas de auditoría, textos e indicadores mantengan un contraste y legibilidad óptimos (WCAG AA).
   - Elementos visuales integrados con moderación minimalista:
     - Pines de sujeción 3D realistas en tonos rojo rubí, ámbar y verde esmeralda.
     - Hilos y cordones rojos tensores vectoriales SVG (`stroke="#ef4444"`) conectando nodos de evidencia clave.
     - Documentos y notas fijadas en los márgenes exteriores: *"Diario Oficial Edición N° 43.812"*, *"DIPRES Informe T1-2026"*, *"Contraloría General Dictamen N° 18.420"*, *"100 Días / 14 Compromisos"*.
2. **Motor de Efectos de Sonido de Papel (Web Audio API)**:
   - Implementado en `src/utils/audio.ts` sin librerías externas ni archivos de audio pesados (cero latencia, 100% offline).
   - Generación procedural de:
     - `playPaperRustle()`: Crujido y fricción orgánica de papel de archivo al buscar o abrir documentos.
     - `playPaperSlide()`: Desplazamiento y paso suave de hojas al seleccionar fichas, fuentes o cambiar vistas.
     - `playPinClick()`: Golpe seco metálico y amortiguación de madera al fijar o alternar estados.
3. **Botón Flotante Fijo de Sonido**:
   - `SoundToggleButton.tsx` posicionado de manera fija en `fixed bottom-5 right-5 z-40`.
   - Permite activar o silenciar los efectos de sonido con retroalimentación táctil inmediata.
   - Sincronización persistente en `localStorage` (`coherencia_paper_sound_enabled`).
   - Ergonomía móvil con área de toque $\ge 44\text{px}$ y tamaño compacto para cumplir con el límite del 15% de sticky en dispositivos móviles.
