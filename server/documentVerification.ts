/**
 * PROTOCOLO DE FALLA Y VALIDACIÓN DE FUENTES (Reglas A, B, C, D, E + Principio Rector)
 *
 * Implementa verificación programática real (no solo instrucciones de prompt) para:
 * A. Validación de pertinencia documental (evitar leyes como dictámenes, portales generales
 *    como informes específicos o portales electorales como programas originales).
 * B. Prueba de existencia en vivo (Senado XML API, BCN Ley Chile XML API, validación de fechas DO).
 * C. Control estricto de extractos documentales (prohibición de comillas sin acceso original;
 *    distinción entre Cita textual, Paráfrasis, Resumen documental e Interpretación propia).
 * D. Manejo transparente de errores de API / modo degradado de recuperación documental.
 * E. Prohibición de completar artificialmente respuestas ante documentos inexistentes o consultas acotadas.
 */

export type ExcerptKind =
  | 'Cita textual'
  | 'Paráfrasis'
  | 'Resumen documental'
  | 'Interpretación propia';

export interface DocumentVerificationRequest {
  docType: 'Boletín' | 'Ley' | 'DFL' | 'Decreto' | 'Resolución' | 'Dictamen' | 'Oficio' | 'Informe';
  rawId: string;
  normalizedId: string;
  claimedDate?: string;
  claimedIssuer?: string;
}

export interface VerificationStepOutcome {
  passed: boolean;
  detail: string;
}

export interface ExistenceProofResult {
  requested: DocumentVerificationRequest;
  verified: boolean;
  classification: 'CONFIRMADA' | 'PARCIALMENTE CONFIRMADA' | 'NO VERIFICADA' | 'CONTRADICHA' | 'DESACTUALIZADA';
  steps: {
    idExists: VerificationStepOutcome;
    dateValid: VerificationStepOutcome;
    issuerMatches: VerificationStepOutcome;
    originalAccessed: VerificationStepOutcome;
    contentSupportsClaim: VerificationStepOutcome;
  };
  directUrl?: string;
  sourceName: string;
  officialRef: string;
  publishedDate?: string;
  verbatimQuote?: string;
  verbatimLocation?: string;
  excerptType: ExcerptKind;
  summaryText: string;
  unverifiedGaps: string;
  requiredDocumentsForGap: string;
}

const VERIFIED_BCN_LAWS: Record<string, { idNorma: string; label: string }> = {
  '18575': { idNorma: '29967', label: 'Ley N° 18.575 (LOC Bases Generales de la Administración del Estado)' },
  '20820': { idNorma: '1075613', label: 'Ley N° 20.820 (Crea Ministerio de la Mujer y la Equidad de Género)' },
  '21325': { idNorma: '1158549', label: 'Ley N° 21.325 (Ley de Migración y Extranjería)' },
  '21542': { idNorma: '1188583', label: 'Ley N° 21.542 (Infraestructura Crítica)' },
  '21810': { idNorma: '1223237', label: 'Ley N° 21.810 (Incorpora a Gendarmería de Chile a las Fuerzas de Orden y Seguridad Pública)' },
  '21811': { idNorma: '1222726', label: 'Ley N° 21.811 (Medidas transitorias kerosene doméstico y emergencia energética)' },
  '21825': { idNorma: '1224572', label: 'Ley N° 21.825 (Modifica Ley N° 21.659 sobre seguridad privada)' },
  '21826': { idNorma: '1225430', label: 'Ley N° 21.826 (Agilización de permisos de urbanización y edificación)' },
  '21827': { idNorma: '1226950', label: 'Ley N° 21.827 (Medidas de seguridad, orden y respeto para la comunidad educativa)' },
  '21830': { idNorma: '1225354', label: 'Ley N° 21.830 (Reajusta ingreso mínimo mensual y asignación familiar)' },
  '21831': { idNorma: '1225909', label: 'Ley N° 21.831 (Autoriza mayor endeudamiento del Gobierno Central durante 2026)' },
  '21841': { idNorma: '1228972', label: 'Ley N° 21.841 (Prorroga plazo regularización derechos de aprovechamiento de aguas)' },
  '21845': { idNorma: '1228990', label: 'Ley N° 21.845 (Código Procesal Penal: ampliación de hipótesis de flagrancia)' },
  '21847': { idNorma: '1229890', label: 'Ley N° 21.847 (Prorroga reglamento de plásticos de un solo uso Ley N° 21.368)' },
  '21850': { idNorma: '1229250', label: 'Ley N° 21.850 (Para la reconstrucción nacional y el desarrollo económico y social)' },
  '21853': { idNorma: '1229799', label: 'Ley N° 21.853 (Modifica Código de Minería en materia de amparo minero)' },
  'dfl2-1998': { idNorma: '127911', label: 'D.F.L. N° 2 de 1998 (Subvención del Estado a Establecimientos Educacionales)' }
};

const VERIFIED_BCN_DECREES: Array<{
  docType: 'Decreto' | 'Resolución';
  numero: string;
  idNorma: string;
  issuerKeywords: string[];
  topicKeywords: string[];
  label: string;
}> = [
  {
    docType: 'Decreto',
    numero: '76',
    idNorma: '1223930',
    issuerKeywords: ['interior'],
    topicKeywords: ['fronter', 'infraestructura', 'critica', '78', 'prorroga', 'ff.aa', 'militar'],
    label: 'D.S. N° 76 (Interior, pub. 08-05-2026 · Prorroga resguardo fronterizo D.S. 78/2023)'
  },
  {
    docType: 'Decreto',
    numero: '52',
    idNorma: '1222446',
    issuerKeywords: ['interior'],
    topicKeywords: ['catastrofe', 'biobio', 'concepcion', 'penco', 'tome', 'emergencia', 'incendio'],
    label: 'D.S. N° 52 (Interior, pub. 17-03-2026 · Estado de Excepción de Catástrofe)'
  },
  {
    docType: 'Decreto',
    numero: '140',
    idNorma: '1228290',
    issuerKeywords: ['interior'],
    topicKeywords: ['emergencia', 'excepcion', 'prorroga', 'macrozona'],
    label: 'D.S. N° 140 (Interior, pub. 21-09-2026 · Prorroga Estado de Excepción de Emergencia)'
  },
  {
    docType: 'Decreto',
    numero: '96',
    idNorma: '1220944',
    issuerKeywords: ['seguridad'],
    topicKeywords: ['politica', 'seguridad', 'publica'],
    label: 'D.S. N° 96 (Seguridad Pública, pub. 30-01-2026 · Política Nacional de Seguridad Pública)'
  },
  {
    docType: 'Decreto',
    numero: '75',
    idNorma: '1228676',
    issuerKeywords: ['trabajo', 'prevision'],
    topicKeywords: ['subsidio', 'empleo', '21.808', '21808'],
    label: 'D.S. N° 75 (Trabajo, pub. 30-09-2026 · Reglamento Subsidio Unificado al Empleo)'
  },
  {
    docType: 'Decreto',
    numero: '29',
    idNorma: '1226344',
    issuerKeywords: ['educacion', 'mineduc'],
    topicKeywords: ['estrategia', 'educacion', 'slep', 'publica'],
    label: 'D.S. N° 29 (Educación, pub. 24-07-2026 · Estrategia Nacional de Educación Pública)'
  },
  {
    docType: 'Decreto',
    numero: '29',
    idNorma: '1221401',
    issuerKeywords: ['vivienda', 'minvu'],
    topicKeywords: ['vivienda', 'urbanismo', 'oguc', 'interes'],
    label: 'D.S. N° 29 (Vivienda y Urbanismo, pub. 14-02-2026 · Modifica OGUC)'
  },
  {
    docType: 'Decreto',
    numero: '815',
    idNorma: '1227798',
    issuerKeywords: ['hacienda'],
    topicKeywords: ['sueldo', 'pago', 'sector', 'publico', 'cuatrimestre'],
    label: 'D.S. N° 815 (Hacienda, pub. 03-09-2026 · Fechas de pago sueldos sector público)'
  },
  {
    docType: 'Decreto',
    numero: '50',
    idNorma: '1223660',
    issuerKeywords: ['salud', 'minsal'],
    topicKeywords: ['alerta', 'sanitaria', 'marea', 'roja', 'lagos', 'aysen'],
    label: 'D.S. N° 50 (Salud, pub. 30-04-2026 · Prorroga Alerta Sanitaria Marea Roja)'
  },
  {
    docType: 'Decreto',
    numero: '7',
    idNorma: '1221816',
    issuerKeywords: ['salud', 'minsal'],
    topicKeywords: ['alerta', 'sanitaria', 'virus', 'respiratorio'],
    label: 'D.S. N° 7 (Salud, pub. 28-02-2026 · Alerta Sanitaria virus respiratorios)'
  },
  {
    docType: 'Decreto',
    numero: '142',
    idNorma: '1221544',
    issuerKeywords: ['defensa'],
    topicKeywords: ['financiamiento', 'capacidades', 'estrategicas', 'defensa'],
    label: 'D.S. N° 142 (Defensa Nacional, pub. 18-02-2026 · Reglamento Capacidades Estratégicas)'
  },
  {
    docType: 'Resolución',
    numero: '1932',
    idNorma: '1227604',
    issuerKeywords: ['contraloria', 'cgr'],
    topicKeywords: ['vivienda', 'fiscal', 'fiscales', 'reglamento'],
    label: 'Resolución N° 1.932 Exenta (CGR, pub. 28-08-2026 · Reglamento de Viviendas Fiscales)'
  },
  {
    docType: 'Resolución',
    numero: '2',
    idNorma: '1220649',
    issuerKeywords: ['contraloria', 'cgr'],
    topicKeywords: ['rendicion', 'cuentas', 'procedimiento'],
    label: 'Resolución N° 2 (CGR, pub. 23-01-2026 · Normas sobre Rendición de Cuentas)'
  },
  {
    docType: 'Resolución',
    numero: '1048',
    idNorma: '1226444',
    issuerKeywords: ['vivienda', 'minvu'],
    topicKeywords: ['vivienda', 'barrio', 'mejoramiento', 'postulacion'],
    label: 'Resolución N° 1.048 Exenta (MINVU, pub. 25-07-2026 · Mejoramiento Viviendas y Barrios)'
  }
];

function decodeHtmlEntities(input: string): string {
  return (input || '')
    .replace(/&#x([0-9a-f]+);/gi, (_m, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_m, dec) => String.fromCharCode(Number(dec)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function stripUnverifiedQuotes(text: string): string {
  const cleaned = (text || '').trim();
  if (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith('«') && cleaned.endsWith('»'))
  ) {
    return cleaned.slice(1, -1).trim();
  }
  return cleaned;
}

/**
 * Rule A: Pertinence & Provenance check for any URL/citation before showing it to the user.
 */
export function validateCitationPertinence(citation: {
  name?: string;
  detail?: string;
  url?: string;
  officialRef?: string;
  sourceId?: string;
}): { valid: boolean; isGeneralPortal: boolean; reason?: string } {
  const name = (citation.name || '').toLowerCase();
  const detail = (citation.detail || '').toLowerCase();
  const ref = (citation.officialRef || '').toLowerCase();
  const url = (citation.url || '').trim().toLowerCase();
  const combinedLabel = `${name} ${ref} ${detail}`;

  // 1. A law cannot be cited as if it were a Dictamen, Resolución, or Oficio
  if (
    url.includes('bcn.cl/leychile/navegar') &&
    !/resoluc|reglamento\s+de\s+viviendas\s+fiscales|rendici[oó]n\s+de\s+cuentas/i.test(combinedLabel) &&
    /\bdictamen\b|\boficio\b|\bresoluci[oó]n\b/i.test(`${name} ${ref}`)
  ) {
    return {
      valid: false,
      isGeneralPortal: false,
      reason: 'Una ley (BCN Ley Chile) no puede citarse como si fuera un dictamen, oficio o resolución administrativa.'
    };
  }

  // 2. A generic Servel electoral landing portal cannot substitute for an original government program document
  //    (Note: the actual official PDF JOSE-ANTONIO-KAST-RIST.pdf IS a direct program PDF and passes!)
  if (
    url.includes('servel.cl/elecciones') &&
    !url.endsWith('.pdf') &&
    (/\bprograma\b|\bbases program[aá]ticas\b|\bcap\.\s*\d|\bmeta\s+100\b|\bdiscurso\b/i.test(combinedLabel))
  ) {
    return {
      valid: false,
      isGeneralPortal: true,
      reason: 'Un portal electoral general (Servel) no puede utilizarse como sustituto del documento original de un programa de gobierno ni de un discurso específico.'
    };
  }

  // 3. A general institutional directory/portal cannot be presented as a specific numbered report/dictamen/decree
  const isGeneralDirectoryUrl =
    url.includes('dipres.gob.cl/598/w3-propertyvalue-15491') ||
    url.includes('dipres.gob.cl/597/w3-propertyvalue-23076') ||
    url.includes('presupuestoabierto.gob.cl') ||
    url.includes('contraloria.cl/web/cgr/') ||
    url.includes('ine.gob.cl/estadisticas-por-tema/') ||
    url.includes('bcentral.cl/areas/politica-monetaria/informe-de-politica-monetaria') ||
    url === 'https://tramitacion.senado.cl/appsenado/templates/tramitacion/index.php' ||
    url === 'https://www.diariooficial.interior.gob.cl/edicionelectronica/index.php' ||
    url.includes('camara.cl/legislacion/proyectosdeley/proyectos_ley.aspx') ||
    url.includes('bcn.cl/leychile/consulta/listaresultadosavanzada');

  const claimsSpecificNumberedDocument =
    /\b(dictamen\s+n[°º]?\s*[a-z]?\d+|informe\s+n[°º]?\s*\d+|decreto(?:\s+supremo)?\s+n[°º]?\s*\d+|d\.s\.\s*n[°º]?\s*\d+|resoluci[oó]n(?:\s+exenta)?\s+n[°º]?\s*\d+|oficio(?:\s+circular)?\s+n[°º]?\s*\d+|auditor[ií]a\s+cgr\s+n[°º]?\s*\d+)\b/i.test(
      `${name} ${ref}`
    );

  if (isGeneralDirectoryUrl && claimsSpecificNumberedDocument) {
    return {
      valid: false,
      isGeneralPortal: true,
      reason: 'Una página institucional general o buscador no puede presentarse como respaldo directo de un documento numerado específico.'
    };
  }

  return { valid: true, isGeneralPortal: isGeneralDirectoryUrl };
}

/**
 * Rule B: Detects whether the user is requesting verification of a specific identifiable document.
 */
export function detectDocumentVerificationRequest(query: string): DocumentVerificationRequest | null {
  const q = (query || '').trim();
  if (!q) return null;

  // Date & issuer hints if provided in prompt
  const dateMatch = q.match(/\b(\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{1,2}\s+de\s+[a-záéíóú]+\s+(?:de\s+)?\d{4})\b/i);
  const claimedDate = dateMatch ? dateMatch[1] : undefined;

  let claimedIssuer: string | undefined;
  if (/contralor[ií]a|\bcgr\b/i.test(q)) claimedIssuer = 'Contraloría General de la República';
  else if (/hacienda/i.test(q)) claimedIssuer = 'Ministerio de Hacienda';
  else if (/dipres/i.test(q)) claimedIssuer = 'DIPRES';
  else if (/interior/i.test(q)) claimedIssuer = 'Ministerio del Interior';
  else if (/defensa/i.test(q)) claimedIssuer = 'Ministerio de Defensa Nacional';
  else if (/salud|minsal|fonasa/i.test(q)) claimedIssuer = 'Ministerio de Salud / FONASA';
  else if (/educaci[oó]n|mineduc/i.test(q)) claimedIssuer = 'Ministerio de Educación';
  else if (/justicia/i.test(q)) claimedIssuer = 'Ministerio de Justicia';
  else if (/congreso|senado|c[aá]mara/i.test(q)) claimedIssuer = 'Congreso Nacional';

  // 1. Boletín legislativo (soporta formato con o sin punto de miles, ej. 18.216-05 o 18216-05)
  const bolMatch = q.match(/\bbolet[ií]n\s*(?:n[°º.]?|nro\.?|#)?\s*(\d{1,2}\.?\d{3,4}(?:-\d{1,2})?|\d{3,6}(?:-\d{1,2})?)\b/i);
  if (bolMatch) {
    return {
      docType: 'Boletín',
      rawId: bolMatch[1],
      normalizedId: bolMatch[1].replace(/\./g, '').trim(),
      claimedDate,
      claimedIssuer
    };
  }

  // 2. DFL
  const dflMatch = q.match(/\bd\.?\s*f\.?\s*l\.?\s*(?:n[°º.]?|nro\.?)?\s*(\d{1,4})\b/i);
  if (dflMatch) {
    return {
      docType: 'DFL',
      rawId: dflMatch[1],
      normalizedId: dflMatch[1].trim(),
      claimedDate,
      claimedIssuer
    };
  }

  // 3. Ley
  const leyMatch = q.match(/\bley\s*(?:n[°º.]?|nro\.?|#)?\s*([\d.]{3,10})\b/i);
  if (leyMatch) {
    return {
      docType: 'Ley',
      rawId: leyMatch[1],
      normalizedId: leyMatch[1].replace(/\./g, ''),
      claimedDate,
      claimedIssuer
    };
  }

  // 4. Dictamen
  const dictMatch = q.match(/\bdictamen\s*(?:n[°º.]?|nro\.?|#)?\s*([a-z]?\d[\d.-]{1,12})\b/i);
  if (dictMatch) {
    return {
      docType: 'Dictamen',
      rawId: dictMatch[1],
      normalizedId: dictMatch[1].toUpperCase(),
      claimedDate,
      claimedIssuer: claimedIssuer || 'Contraloría General de la República'
    };
  }

  // 5. Decreto / D.S.
  const decMatch = q.match(/\b(?:decreto(?:\s+supremo|\s+exento)?|d\.?\s*s\.?)\s*(?:n[°º.]?|nro\.?|#)?\s*([\d.]{1,7}(?:\/\d{2,4})?)\b/i);
  if (decMatch) {
    return {
      docType: 'Decreto',
      rawId: decMatch[1],
      normalizedId: decMatch[1].replace(/\./g, ''),
      claimedDate,
      claimedIssuer
    };
  }

  // 6. Resolución
  const resMatch = q.match(/\b(?:resoluci[oó]n(?:\s+exenta)?|res\.?\s*ex\.?)\s*(?:n[°º.]?|nro\.?|#)?\s*([\d.]{1,7}(?:\/\d{2,4})?)\b/i);
  if (resMatch) {
    return {
      docType: 'Resolución',
      rawId: resMatch[1],
      normalizedId: resMatch[1].replace(/\./g, ''),
      claimedDate,
      claimedIssuer
    };
  }

  // 7. Oficio / Circular / Informe numerado
  const ofMatch = q.match(/\b(?:oficio(?:\s+ordinario|\s+circular)?|circular|informe)\s*(?:n[°º.]?|nro\.?|#)\s*([\d.]{1,7}(?:\/\d{2,4})?)\b/i);
  if (ofMatch) {
    return {
      docType: /informe/i.test(ofMatch[0]) ? 'Informe' : 'Oficio',
      rawId: ofMatch[1],
      normalizedId: ofMatch[1].replace(/\./g, ''),
      claimedDate,
      claimedIssuer
    };
  }

  return null;
}

function parseSpanishOrNumericDate(dateStr?: string): { validFormat: boolean; isSunday?: boolean; normalized?: string } {
  if (!dateStr) return { validFormat: false };
  const slashM = dateStr.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{2,4})$/);
  if (slashM) {
    const day = parseInt(slashM[1], 10);
    const month = parseInt(slashM[2], 10);
    let year = parseInt(slashM[3], 10);
    if (year < 100) year += 2000;
    const dt = new Date(Date.UTC(year, month - 1, day));
    if (dt.getUTCFullYear() !== year || dt.getUTCMonth() !== month - 1 || dt.getUTCDate() !== day) {
      return { validFormat: false };
    }
    return {
      validFormat: true,
      isSunday: dt.getUTCDay() === 0,
      normalized: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`
    };
  }

  const months: Record<string, number> = {
    enero: 1, ene: 1, febrero: 2, feb: 2, marzo: 3, mar: 3, abril: 4, abr: 4,
    mayo: 5, may: 5, junio: 6, jun: 6, julio: 7, jul: 7, agosto: 8, ago: 8,
    septiembre: 9, sep: 9, setiembre: 9, octubre: 10, oct: 10, noviembre: 11, nov: 11, diciembre: 12, dic: 12
  };
  const spM = dateStr.toLowerCase().match(/(\d{1,2})\s+(?:de\s+)?([a-záéíóú]+)\s+(?:de\s+)?(\d{4})/);
  if (spM) {
    const day = parseInt(spM[1], 10);
    const monKey = spM[2].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const month = months[monKey];
    const year = parseInt(spM[3], 10);
    if (!month) return { validFormat: false };
    const dt = new Date(Date.UTC(year, month - 1, day));
    if (dt.getUTCFullYear() !== year || dt.getUTCMonth() !== month - 1 || dt.getUTCDate() !== day) {
      return { validFormat: false };
    }
    return {
      validFormat: true,
      isSunday: dt.getUTCDay() === 0,
      normalized: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`
    };
  }
  return { validFormat: false };
}

function queryMatchesContent(query: string, titleAndText: string): boolean {
  const norm = (s: string) =>
    (s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  const qNorm = norm(query);
  const tNorm = norm(titleAndText);
  const generic = new Set([
    'verifica', 'verificar', 'comprueba', 'comprobar', 'existe', 'boletin', 'decreto', 'dictamen',
    'resolucion', 'oficio', 'informe', 'sobre', 'para', 'chile', '2026', '2025', 'proyecto', 'norma',
    'estado', 'cual', 'como', 'cuando', 'donde', 'quien', 'dice', 'estudia', 'documento', 'supremo'
  ]);
  const tokens = qNorm
    .split(/[\s,.;:¿?¡!()/-]+/)
    .filter((t) => t.length >= 4 && !generic.has(t) && !/^\d+$/.test(t));
  if (tokens.length === 0) return true; // User only asked about existence/title of the document itself
  return tokens.some((tok) => tNorm.includes(tok));
}

/**
 * Rule B: Live 5-step Existence Proof against real primary official endpoints.
 */
export async function verifyDocumentExistence(
  req: DocumentVerificationRequest,
  fullQuery: string
): Promise<ExistenceProofResult> {
  const headers = { 'User-Agent': 'Mozilla/5.0 Chrome/124.0' };

  // 1. Live Senado XML verification for Boletín
  if (req.docType === 'Boletín') {
    const baseNum = req.normalizedId.split('-')[0];
    const xmlUrl = `https://tramitacion.senado.cl/wspublico/tramitacion.php?boletin=${encodeURIComponent(baseNum)}`;
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 5000);
      const res = await fetch(xmlUrl, { signal: ctrl.signal, headers });
      clearTimeout(timer);

      if (!res.ok) {
        return buildUnverifiedProof(req, `El servicio XML oficial del Senado devolvió HTTP ${res.status}.`, 'Consultar manualmente la ficha en tramitacion.senado.cl.');
      }

      const xml = await res.text();
      const bolMatch = xml.match(/<boletin>([^<]+)<\/boletin>/i);
      const titMatch = xml.match(/<titulo>([^<]+)<\/titulo>/i);
      const fechaMatch = xml.match(/<fecha_ingreso>([^<]+)<\/fecha_ingreso>/i);
      const camaraMatch = xml.match(/<camara_origen>([^<]+)<\/camara_origen>/i);
      const inicMatch = xml.match(/<iniciativa>([^<]+)<\/iniciativa>/i);
      const etapaMatch = xml.match(/<etapa>([^<]+)<\/etapa>/i);
      const estadoMatch = xml.match(/<estado>([^<]+)<\/estado>/i);
      const leyNroMatch = xml.match(/<leynro>([^<]+)<\/leynro>/i);

      if (!bolMatch || !titMatch) {
        return {
          requested: req,
          verified: false,
          classification: 'NO VERIFICADA',
          sourceName: 'Senado de la República de Chile (API XML Oficial)',
          officialRef: `Boletín N° ${req.rawId}`,
          excerptType: 'Resumen documental',
          steps: {
            idExists: { passed: false, detail: `El Boletín N° ${req.rawId} no arrojó registros en el servicio oficial del Senado.` },
            dateValid: { passed: false, detail: 'Sin fecha de ingreso registrada porque el boletín no figura en el repositorio.' },
            issuerMatches: { passed: false, detail: 'Sin organismo o cámara de origen comprobable.' },
            originalAccessed: { passed: true, detail: 'Se consultó el endpoint XML público del Senado, devolviendo resultado vacío.' },
            contentSupportsClaim: { passed: false, detail: 'Imposible respaldar afirmación sobre un boletín no localizado.' }
          },
          summaryText: `La consulta al servicio oficial de tramitación del Senado de la República demostró que no existe un proyecto registrado con el Boletín N° ${req.rawId}.`,
          unverifiedGaps: `No existe ficha legislativa para Boletín N° ${req.rawId} en tramitacion.senado.cl.`,
          requiredDocumentsForGap: `Número de boletín legislativo válido y verificado en Senado o Cámara de Diputadas y Diputados.`
        };
      }

      const exactBol = decodeHtmlEntities(bolMatch[1]);
      const exactTitle = decodeHtmlEntities(titMatch[1]);
      const fechaIngreso = fechaMatch ? decodeHtmlEntities(fechaMatch[1]) : 'No consignada';
      const camaraOrigen = camaraMatch ? decodeHtmlEntities(camaraMatch[1]) : 'Congreso Nacional';
      const iniciativa = inicMatch ? decodeHtmlEntities(inicMatch[1]) : '';
      const etapa = etapaMatch ? decodeHtmlEntities(etapaMatch[1]) : '';
      const estado = estadoMatch ? decodeHtmlEntities(estadoMatch[1]) : '';
      const leynro = leyNroMatch ? decodeHtmlEntities(leyNroMatch[1]) : '';

      const idMatchesExact = !req.normalizedId.includes('-') || exactBol.toLowerCase() === req.normalizedId.toLowerCase();
      let dateMatches = true;
      let dateDetail = `Fecha de ingreso oficial verificada en Senado: ${fechaIngreso}.`;
      if (req.claimedDate) {
        const parsedClaim = parseSpanishOrNumericDate(req.claimedDate);
        if (!parsedClaim.validFormat) {
          dateMatches = false;
          dateDetail = `La fecha consultada ("${req.claimedDate}") no tiene un formato calendárico válido; la fecha oficial de ingreso es ${fechaIngreso}.`;
        } else if (parsedClaim.normalized && fechaIngreso !== parsedClaim.normalized) {
          dateMatches = false;
          dateDetail = `La fecha consultada (${parsedClaim.normalized}) no coincide con la fecha oficial de ingreso (${fechaIngreso}).`;
        }
      }

      let issuerMatches = true;
      let issuerDetail = `Origen legislativo verificado: ${camaraOrigen}${iniciativa ? ` (${iniciativa})` : ''}.`;
      if (req.claimedIssuer && req.claimedIssuer !== 'Congreso Nacional') {
        // Mensaje presidencial = Ejecutivo/Ministerios; Moción = Parlamentarios
        if (iniciativa.toLowerCase() === 'moción') {
          issuerMatches = false;
          issuerDetail = `El proyecto corresponde a Moción parlamentaria (${camaraOrigen}), no a iniciativa de ${req.claimedIssuer}.`;
        }
      }

      const supportsClaim = queryMatchesContent(fullQuery, `${exactTitle} ${etapa} ${estado} ${leynro}`);
      const allPassed = idMatchesExact && dateMatches && issuerMatches && supportsClaim;

      const directUrl = `https://tramitacion.senado.cl/appsenado/templates/tramitacion/index.php?boletin_ini=${encodeURIComponent(exactBol)}`;

      return {
        requested: req,
        verified: allPassed,
        classification: allPassed ? 'CONFIRMADA' : !idMatchesExact || !dateMatches || !issuerMatches || !supportsClaim ? 'CONTRADICHA' : 'NO VERIFICADA',
        directUrl,
        sourceName: 'Senado de la República de Chile · Ficha Oficial de Tramitación',
        officialRef: `Boletín N° ${exactBol}${leynro ? ` (${leynro})` : ''}`,
        publishedDate: fechaIngreso,
        verbatimQuote: exactTitle,
        verbatimLocation: `Registro XML Oficial Senado · Boletín ${exactBol}, campo <titulo>`,
        excerptType: 'Cita textual',
        steps: {
          idExists: {
            passed: idMatchesExact,
            detail: idMatchesExact
              ? `Boletín N° ${exactBol} confirmado en el registro oficial del Senado.`
              : `Se consultó ${req.rawId}, pero en registro oficial figura Boletín N° ${exactBol}.`
          },
          dateValid: { passed: dateMatches, detail: dateDetail },
          issuerMatches: { passed: issuerMatches, detail: issuerDetail },
          originalAccessed: {
            passed: true,
            detail: `Acceso directo al registro XML de tramitacion.senado.cl (${etapa || 'Tramitación'}${estado ? ` · ${estado}` : ''}).`
          },
          contentSupportsClaim: {
            passed: supportsClaim,
            detail: supportsClaim
              ? `El título oficial y metadatos del Boletín ${exactBol} corresponden directamente a la materia consultada.`
              : `El Boletín ${exactBol} trata sobre "${exactTitle}", materia que no respalda los términos consultados.`
          }
        },
        summaryText:
          `Resumen documental del registro oficial: Boletín N° ${exactBol}, ingresado el ${fechaIngreso} por ${iniciativa || 'iniciativa legislativa'} en ${camaraOrigen}` +
          `${etapa ? `, etapa actual: ${etapa}` : ''}${estado ? ` (${estado})` : ''}${leynro ? `, promulgado como ${leynro}` : ''}.`,
        unverifiedGaps: allPassed
          ? ''
          : 'Alguno de los criterios de verificación (número exacto, fecha, emisor o pertinencia material) no coincidió con la afirmación consultada.',
        requiredDocumentsForGap: allPassed
          ? ''
          : 'Revisar el texto íntegro del mensaje o moción e indicaciones en la ficha del Senado adjunta.'
      };
    } catch (err: any) {
      return buildUnverifiedProof(
        req,
        `No fue posible acceder al contenido original en el servicio oficial del Senado (${err?.message || 'error de red'}).`,
        'Consultar directamente la ficha legislativa en tramitacion.senado.cl.'
      );
    }
  }

  // Helper: Fetch live official metadata from BCN Ley Chile (XML primary, JSON fallback)
  async function fetchBcnLiveNorma(idNorma: string): Promise<{
    tituloNorma: string;
    fechaPub: string;
    fechaProm: string;
    organismo: string;
    encabezado: string;
    channelUsed: string;
  } | null> {
    // 1. Try XML endpoint
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 5000);
      const res = await fetch(`https://www.bcn.cl/leychile/Consulta/obtxml?opt=7&idNorma=${idNorma}`, {
        signal: ctrl.signal,
        headers
      });
      clearTimeout(timer);
      if (res.ok) {
        const xml = await res.text();
        const titleM = xml.match(/<TituloNorma[^>]*>([\s\S]*?)<\/TituloNorma>/i);
        if (titleM) {
          const pubM = xml.match(/fechaPublicacion="([^"]+)"/i);
          const promM = xml.match(/fechaPromulgacion="([^"]+)"/i);
          const orgM = xml.match(/<Organismo[^>]*>([\s\S]*?)<\/Organismo>/i);
          const textoM = xml.match(/<Encabezado[^>]*>[\s\S]*?<Texto[^>]*>([\s\S]*?)<\/Texto>/i);
          return {
            tituloNorma: decodeHtmlEntities(titleM[1]),
            fechaPub: pubM ? pubM[1] : 'No consignada',
            fechaProm: promM ? promM[1] : 'No consignada',
            organismo: orgM ? decodeHtmlEntities(orgM[1]) : 'Congreso Nacional / Ministerio respectivo',
            encabezado: textoM ? decodeHtmlEntities(textoM[1]).slice(0, 320) : decodeHtmlEntities(titleM[1]),
            channelUsed: 'XML oficial obtxml en bcn.cl/leychile'
          };
        }
      }
    } catch {
      // Fallback to official JSON endpoint
    }

    // 2. Fallback: Official BCN Ley Chile JSON API
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 5000);
      const res = await fetch(`https://nuevo.leychile.cl/servicios/Navegar/get_norma_json?idNorma=${idNorma}`, {
        signal: ctrl.signal,
        headers: { ...headers, Referer: 'https://www.bcn.cl/' }
      });
      clearTimeout(timer);
      if (res.ok) {
        const json: any = await res.json();
        const meta = json?.metadatos || {};
        const titulo = decodeHtmlEntities(String(meta.titulo_norma || ''));
        if (titulo) {
          const firstHtml = decodeHtmlEntities(String(json?.html?.[0]?.t || ''));
          return {
            tituloNorma: titulo,
            fechaPub: String(meta.fecha_publicacion || 'No consignada'),
            fechaProm: String(meta.fecha_promulgacion || 'No consignada'),
            organismo: Array.isArray(meta.organismos) && meta.organismos.length > 0
              ? meta.organismos.join(', ')
              : 'Organismo oficial BCN',
            encabezado: firstHtml ? firstHtml.slice(0, 320) : titulo,
            channelUsed: 'API oficial nuevo.leychile.cl/servicios'
          };
        }
      }
    } catch {
      // Fall through
    }
    return null;
  }

  function formatIsoToDdMmYyyy(isoDate: string): string | null {
    const m = (isoDate || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
    return m ? `${m[3]}/${m[2]}/${m[1]}` : null;
  }

  // 2. Live BCN Ley Chile XML/JSON verification for verified laws / DFL
  if (req.docType === 'Ley' || req.docType === 'DFL') {
    const queryYearM = fullQuery.match(/\b(19\d{2}|20\d{2})\b/);
    const dflYearOk =
      req.docType !== 'DFL' ||
      !queryYearM ||
      queryYearM[1] === '1998' ||
      /subvenci[oó]n|educaci[oó]n/i.test(fullQuery);
    const key = req.docType === 'DFL' ? `dfl${req.normalizedId}-1998` : req.normalizedId;
    const known = dflYearOk ? VERIFIED_BCN_LAWS[key] || (req.docType === 'Ley' ? VERIFIED_BCN_LAWS[req.normalizedId] : undefined) : undefined;
    if (known) {
      const bcnData = await fetchBcnLiveNorma(known.idNorma);
      if (bcnData) {
        const { tituloNorma, fechaPub, fechaProm, organismo, encabezado, channelUsed } = bcnData;
        let dateMatches = true;
        let dateDetail = `Promulgación: ${fechaProm} · Publicación oficial: ${fechaPub}.`;
        if (req.claimedDate) {
          const parsedClaim = parseSpanishOrNumericDate(req.claimedDate);
          const pubDdMmYyyy = formatIsoToDdMmYyyy(fechaPub);
          const promDdMmYyyy = formatIsoToDdMmYyyy(fechaProm);
          if (!parsedClaim.validFormat) {
            dateMatches = false;
            dateDetail = `La fecha consultada ("${req.claimedDate}") no tiene formato válido; en BCN figura publicación ${fechaPub}.`;
          } else if (parsedClaim.normalized && parsedClaim.normalized !== pubDdMmYyyy && parsedClaim.normalized !== promDdMmYyyy) {
            dateMatches = false;
            dateDetail = `La fecha consultada (${parsedClaim.normalized}) no coincide con la publicación (${fechaPub}) ni promulgación (${fechaProm}).`;
          }
        }

        const supportsClaim = queryMatchesContent(fullQuery, `${tituloNorma} ${encabezado}`);
        const allOk = supportsClaim && dateMatches;
        const directUrl = `https://www.bcn.cl/leychile/Navegar?idNorma=${known.idNorma}`;

        return {
          requested: req,
          verified: allOk,
          classification: allOk ? 'CONFIRMADA' : !dateMatches ? 'CONTRADICHA' : 'PARCIALMENTE CONFIRMADA',
          directUrl,
          sourceName: `Biblioteca del Congreso Nacional (BCN / Ley Chile) · ${known.label}`,
          officialRef: `${req.docType} N° ${req.rawId} · idNorma ${known.idNorma}`,
          publishedDate: fechaPub,
          verbatimQuote: tituloNorma,
          verbatimLocation: `Ley Chile BCN · idNorma=${known.idNorma}, <TituloNorma> (Promulgación ${fechaProm}, Publicación ${fechaPub})`,
          excerptType: 'Cita textual',
          steps: {
            idExists: { passed: true, detail: `Norma verificada en BCN Ley Chile (idNorma=${known.idNorma}).` },
            dateValid: { passed: dateMatches, detail: dateDetail },
            issuerMatches: { passed: true, detail: `Organismo emisor en BCN: ${organismo}.` },
            originalAccessed: { passed: true, detail: `Texto oficial descargado en vivo desde ${channelUsed}.` },
            contentSupportsClaim: {
              passed: supportsClaim,
              detail: supportsClaim
                ? 'El título oficial y texto vigente de la norma corresponden directamente a lo consultado.'
                : `La norma trata sobre "${tituloNorma}", sin respaldo directo para afirmaciones ajenas a ese objeto legal.`
            }
          },
          summaryText: `Resumen documental: Norma oficial vigente en BCN Ley Chile (${organismo}), publicada el ${fechaPub}.`,
          unverifiedGaps: allOk
            ? ''
            : !dateMatches
            ? 'La fecha indicada en la consulta no coincide con las fechas oficiales de promulgación o publicación de la norma.'
            : 'El texto de la ley consultada no respalda automáticamente extremos o cifras externas no contenidas en la norma.',
          requiredDocumentsForGap: allOk ? '' : 'Revisar artículos específicos y fechas oficiales de la norma en el enlace de BCN.'
        };
      }
    }

    return buildUnverifiedProof(
      req,
      `No se accedió al texto XML original de ${req.docType} N° ${req.rawId} en BCN Ley Chile (idNorma no confirmado en vivo).`,
      `Buscar el número exacto "${req.rawId}" en https://www.bcn.cl/leychile/consulta/listaresultadosavanzada.`
    );
  }

  // 3. Diario Oficial date check + BCN Ley Chile live check for verified 2026 Decretos / Resoluciones
  if (req.docType === 'Decreto' || req.docType === 'Resolución') {
    const parsedDate = parseSpanishOrNumericDate(req.claimedDate);
    if (req.claimedDate && (!parsedDate.validFormat || parsedDate.isSunday)) {
      return {
        requested: req,
        verified: false,
        classification: 'NO VERIFICADA',
        sourceName: 'Diario Oficial de la República de Chile',
        officialRef: `${req.docType} N° ${req.rawId}`,
        excerptType: 'Resumen documental',
        steps: {
          idExists: { passed: false, detail: `No es posible confirmar existencia del ${req.docType} N° ${req.rawId} en esa fecha.` },
          dateValid: {
            passed: false,
            detail: parsedDate.isSunday
              ? `La fecha indicada (${parsedDate.normalized}) corresponde a domingo; el Diario Oficial de Chile no publica ediciones ordinarias los domingos.`
              : `La fecha indicada ("${req.claimedDate}") no pudo validarse.`
          },
          issuerMatches: { passed: false, detail: 'Organismo emisor no verificado en documento original.' },
          originalAccessed: { passed: false, detail: 'No existe edición ordinaria accesible para una fecha inválida o dominical.' },
          contentSupportsClaim: { passed: false, detail: 'Sin acceso al contenido original.' }
        },
        summaryText: `No se verifica ${req.docType} N° ${req.rawId} porque la fecha señalada (${req.claimedDate}) es inválida o corresponde a un día sin edición ordinaria del Diario Oficial.`,
        unverifiedGaps: 'Fecha inválida o inexistencia de texto original accesible.',
        requiredDocumentsForGap: 'Número exacto y fecha hábil de publicación en el Diario Oficial.'
      };
    }

    const qNorm = fullQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normNum = req.normalizedId.split('/')[0].replace(/\./g, '').trim();
    const candidates = VERIFIED_BCN_DECREES.filter(
      (d) => d.docType === req.docType && d.numero === normNum
    );

    let chosen = candidates.length === 1 ? candidates[0] : undefined;
    if (candidates.length > 1) {
      chosen =
        candidates.find((c) => c.issuerKeywords.some((ik) => qNorm.includes(ik))) ||
        candidates.find((c) => c.topicKeywords.some((tk) => qNorm.includes(tk)));
    }

    if (chosen) {
      const bcnData = await fetchBcnLiveNorma(chosen.idNorma);
      if (bcnData) {
        const { tituloNorma, fechaPub, fechaProm, organismo, encabezado, channelUsed } = bcnData;
        const pubDdMmYyyy = formatIsoToDdMmYyyy(fechaPub);
        const promDdMmYyyy = formatIsoToDdMmYyyy(fechaProm);

        let dateMatches = true;
        let dateDetail = `Promulgación: ${fechaProm} · Publicación oficial: ${fechaPub}.`;
        if (req.claimedDate && parsedDate.validFormat && parsedDate.normalized) {
          if (parsedDate.normalized !== pubDdMmYyyy && parsedDate.normalized !== promDdMmYyyy) {
            dateMatches = false;
            dateDetail = `La fecha consultada (${parsedDate.normalized}) NO coincide con el registro oficial de BCN (Promulgación ${fechaProm}, Publicación ${fechaPub}).`;
          }
        }

        const orgNorm = organismo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const issuerMatches =
          !req.claimedIssuer ||
          chosen.issuerKeywords.some((ik) => orgNorm.includes(ik) && req.claimedIssuer!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(ik));
        const issuerDetail = issuerMatches
          ? `Organismo emisor verificado en BCN: ${organismo}.`
          : `El organismo consultado (${req.claimedIssuer}) no coincide con el emisor oficial (${organismo}).`;

        const supportsClaim = queryMatchesContent(fullQuery, `${tituloNorma} ${encabezado}`);
        const allOk = dateMatches && issuerMatches && supportsClaim;
        const directUrl = `https://www.bcn.cl/leychile/Navegar?idNorma=${chosen.idNorma}`;

        return {
          requested: req,
          verified: allOk,
          classification: allOk ? 'CONFIRMADA' : !dateMatches || !issuerMatches || !supportsClaim ? 'CONTRADICHA' : 'NO VERIFICADA',
          directUrl,
          sourceName: `Biblioteca del Congreso Nacional (BCN / Ley Chile) · ${chosen.label}`,
          officialRef: `${req.docType} N° ${req.rawId} · idNorma ${chosen.idNorma}`,
          publishedDate: fechaPub,
          verbatimQuote: tituloNorma,
          verbatimLocation: `Ley Chile BCN · idNorma=${chosen.idNorma}, título oficial (Promulgación ${fechaProm}, Publicación ${fechaPub})`,
          excerptType: 'Cita textual',
          steps: {
            idExists: { passed: true, detail: `${req.docType} N° ${normNum} verificado en BCN Ley Chile (idNorma=${chosen.idNorma}).` },
            dateValid: { passed: dateMatches, detail: dateDetail },
            issuerMatches: { passed: issuerMatches, detail: issuerDetail },
            originalAccessed: { passed: true, detail: `Texto oficial descargado en vivo desde ${channelUsed}.` },
            contentSupportsClaim: {
              passed: supportsClaim,
              detail: supportsClaim
                ? 'El título oficial y contenido de la norma corresponden directamente a lo consultado.'
                : `El documento oficial en BCN trata sobre "${tituloNorma}", lo cual no respalda las afirmaciones consultadas.`
            }
          },
          summaryText: `Resumen documental: ${req.docType} N° ${normNum} (${organismo}), publicado el ${fechaPub} en BCN Ley Chile.`,
          unverifiedGaps: allOk ? '' : 'Uno o más atributos consultados (fecha, organismo o materia específica) difieren del acto administrativo oficial en BCN.',
          requiredDocumentsForGap: allOk ? '' : 'Revisar el texto íntegro del acto en el enlace oficial de BCN Ley Chile adjunto.'
        };
      }
    }

    return buildUnverifiedProof(
      req,
      `No se pudo acceder al texto íntegro del ${req.docType} N° ${req.rawId} en BCN Ley Chile ni en el Diario Oficial en vivo (la edición electrónica requiere consulta directa en el portal oficial y la sola presencia en un índice local no equivale a verificación).`,
      `Consultar el texto original del ${req.docType} N° ${req.rawId} directamente en Diario Oficial (diariooficial.interior.gob.cl) o en BCN Ley Chile.`
    );
  }

  // 4. Dictamen CGR / Oficio / Informe numerado
  return buildUnverifiedProof(
    req,
    `No fue posible acceder al documento original de ${req.docType} N° ${req.rawId} en el portal de ${req.claimedIssuer || 'el organismo emisor'} durante esta consulta en vivo. Conforme al protocolo, un registro del índice local o una ley relacionada no sustituye el acceso al texto original del ${req.docType}.`,
    `Consultar el texto original íntegro del ${req.docType} N° ${req.rawId} en ${req.docType === 'Dictamen' ? 'https://www.contraloria.cl/web/cgr/dictamenes-y-pronunciamientos' : 'el repositorio oficial del organismo emisor'}.`
  );
}

function buildUnverifiedProof(
  req: DocumentVerificationRequest,
  reason: string,
  requiredDoc: string
): ExistenceProofResult {
  const parsedDate = parseSpanishOrNumericDate(req.claimedDate);
  return {
    requested: req,
    verified: false,
    classification: 'NO VERIFICADA',
    sourceName: req.claimedIssuer || 'Organismo Emisor Requerido',
    officialRef: `${req.docType} N° ${req.rawId}`,
    excerptType: 'Resumen documental',
    steps: {
      idExists: {
        passed: false,
        detail: `No se comprobó la existencia de ${req.docType} N° ${req.rawId} en una fuente primaria accesible en vivo.`
      },
      dateValid: {
        passed: req.claimedDate ? parsedDate.validFormat && !parsedDate.isSunday : false,
        detail: req.claimedDate
          ? parsedDate.validFormat
            ? `Fecha consultada (${parsedDate.normalized}) con formato válido, pero sin emisión verificada del documento.`
            : `Fecha ("${req.claimedDate}") no validada.`
          : 'No se proporcionó ni comprobó fecha de emisión oficial.'
      },
      issuerMatches: {
        passed: false,
        detail: req.claimedIssuer
          ? `No se comprobó coincidencia documental en ${req.claimedIssuer}.`
          : 'Organismo emisor no verificado en documento original.'
      },
      originalAccessed: {
        passed: false,
        detail: reason
      },
      contentSupportsClaim: {
        passed: false,
        detail: 'Al no haberse accedido ni verificado el contenido original, no es posible confirmar la afirmación.'
      }
    },
    summaryText: `Documento no localizado o no verificable en vivo: ${req.docType} N° ${req.rawId}. ${reason}`,
    unverifiedGaps: reason,
    requiredDocumentsForGap: requiredDoc
  };
}
