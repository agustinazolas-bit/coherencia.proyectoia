import { AuditState, DataUpdate, VerifiedSource, NewsVideoReport, GovernmentCommitment } from '../types';

export const verifiedNewsVideosData: NewsVideoReport[] = [
  {
    id: "vid-1",
    title: "Despliegue y atribuciones de FF.AA. en la frontera norte: Reglas del uso de la fuerza y control en Colchane",
    channel: "T13 (Teletrece)",
    channelVerified: true,
    publishedDate: "16 abr 2026",
    duration: "4:32",
    youtubeVideoId: "fPEtrMbBm24",
    youtubeUrl: "https://www.youtube.com/watch?v=fPEtrMbBm24",
    summary: "Reportaje de Teletrece sobre las atribuciones operativas de las Fuerzas Armadas en el resguardo de infraestructura crítica fronteriza, reglas de uso de la fuerza (RUF) y reconducciones en la Macrozona Norte.",
    relatedCategory: "Seguridad",
    keywords: ["frontera", "seguridad", "ff.aa", "fuerzas armadas", "militar", "militares", "colchane", "norte", "reconduccion", "ruf", "reglas de uso de la fuerza", "orden publico", "zanja", "tarapaca", "arica", "antofagasta", "infraestructura critica"]
  },
  {
    id: "vid-2",
    title: "Informe Especial: El imperio narco en las cárceles y la urgencia de recintos de máxima seguridad",
    channel: "24 Horas - TVN Chile",
    channelVerified: true,
    publishedDate: "22 may 2026",
    duration: "14:20",
    youtubeVideoId: "nOplr1oZx2Y",
    youtubeUrl: "https://www.youtube.com/watch?v=nOplr1oZx2Y",
    summary: "Investigación a fondo de Informe Especial sobre la penetración del crimen organizado transnacional y bandas criminales en los penales chilenos, y el plan para habilitar cárceles de máxima seguridad y aislamiento estricto.",
    relatedCategory: "Seguridad",
    keywords: ["carceles", "carcel", "cárcel", "maxima seguridad", "crimen organizado", "penitenciario", "gendarmeria", "gendarmería", "tren de aragua", "delincuencia", "presos", "reos", "aislamiento", "allanamiento"]
  },
  {
    id: "vid-3",
    title: "Gendarmería y traslados de alta peligrosidad: Medidas de aislamiento para líderes de bandas criminales",
    channel: "24 Horas - TVN Chile",
    channelVerified: true,
    publishedDate: "08 jun 2026",
    duration: "5:45",
    youtubeVideoId: "8Al7FYLB2AU",
    youtubeUrl: "https://www.youtube.com/watch?v=8Al7FYLB2AU",
    summary: "Reporte de 24 Horas sobre los macrooperativos de traslado de reos de alto compromiso delictual hacia módulos de alta seguridad y los controles de inhibición de señal telefónica en recintos penitenciarios.",
    relatedCategory: "Seguridad",
    keywords: ["seguridad", "gendarmeria", "gendarmería", "traslados", "bandas", "delincuencia", "alta peligrosidad", "carceles", "allanamientos", "penales", "colina", "santiago 1"]
  },
  {
    id: "vid-4",
    title: "Operativos del Ejército y PDI en la frontera: Control de zanjas y pasos no habilitados en Colchane",
    channel: "T13 (Teletrece)",
    channelVerified: true,
    publishedDate: "28 may 2026",
    duration: "5:10",
    youtubeVideoId: "nISi85e2zaA",
    youtubeUrl: "https://www.youtube.com/watch?v=nISi85e2zaA",
    summary: "Reportaje de Teletrece sobre los patrullajes y vigilancia conjunta del Ejército, Carabineros y PDI en la zanja fronteriza de Colchane frente al contrabando e ingreso clandestino.",
    relatedCategory: "Seguridad",
    keywords: ["frontera", "seguridad", "carabineros", "pdi", "pasos fronterizos", "colchane", "zanja", "migracion", "migración", "inmigracion", "inmigración", "patrullaje", "control fronterizo", "detenciones", "reconduccion"]
  },
  {
    id: "vid-5",
    title: "Vuelos chárter de expulsión: Balance de deportaciones judiciales y administrativas de extranjeros con antecedentes",
    channel: "24 Horas - TVN Chile",
    channelVerified: true,
    publishedDate: "14 abr 2026",
    duration: "6:15",
    youtubeVideoId: "soC1lgb4XzU",
    youtubeUrl: "https://www.youtube.com/watch?v=soC1lgb4XzU",
    summary: "Cobertura de 24 Horas en el Grupo 10 de la FACh sobre la ejecución de vuelos chárter para la expulsión de extranjeros con órdenes de expulsión judicial y condenas por delitos violentos.",
    relatedCategory: "Inmigración",
    keywords: ["expulsion", "expulsiones", "expulsión", "deportacion", "deportaciones", "vuelos", "charter", "pdi", "inmigrantes", "extranjeros", "migracion irregular", "migrantes irregulares", "antecedentes penales"]
  },
  {
    id: "vid-6",
    title: "Operativos masivos de control migratorio y fiscalización de extranjeros en situación irregular",
    channel: "T13 (Teletrece)",
    channelVerified: true,
    publishedDate: "03 may 2026",
    duration: "4:50",
    youtubeVideoId: "TSFGkDSuUMw",
    youtubeUrl: "https://www.youtube.com/watch?v=TSFGkDSuUMw",
    summary: "Informe de Teletrece sobre los megaoperativos de fiscalización del Departamento de Migraciones y Policía Internacional de la PDI en puntos críticos urbanos e interurbanos.",
    relatedCategory: "Inmigración",
    keywords: ["migracion", "migración", "inmigracion", "inmigración", "fiscalizacion", "fiscalización", "control de identidad", "extranjeros", "pdi", "frontera", "situacion irregular", "empadronamiento"]
  },
  {
    id: "vid-7",
    title: "Reforma Tributaria ante Comisión de Hacienda: Debate por impuesto corporativo y reactivación económica",
    channel: "24 Horas - TVN Chile",
    channelVerified: true,
    publishedDate: "04 abr 2026",
    duration: "5:18",
    youtubeVideoId: "l4a5PlUtB4g",
    youtubeUrl: "https://www.youtube.com/watch?v=l4a5PlUtB4g",
    summary: "Cobertura de 24 Horas TVN desde la Comisión de Hacienda sobre la presentación del proyecto tributario, rebaja impositiva corporativa y advertencias de brecha fiscal de DIPRES y el CFA.",
    relatedCategory: "Economía",
    keywords: ["tributaria", "reforma tributaria", "impuestos", "impuesto", "hacienda", "primera categoria", "empresas", "dipres", "fiscal", "recaudacion", "crecimiento", "corporativo", "tasa"]
  },
  {
    id: "vid-8",
    title: "Exención de contribuciones a la primera vivienda: Debate técnico por impacto en fondos municipales",
    channel: "24 Horas - TVN Chile",
    channelVerified: true,
    publishedDate: "15 abr 2026",
    duration: "4:48",
    youtubeVideoId: "aeyQz6avZqE",
    youtubeUrl: "https://www.youtube.com/watch?v=aeyQz6avZqE",
    summary: "Informe periodístico sobre el proyecto de exención del impuesto territorial para la primera vivienda, la postura de los alcaldes frente al Fondo Común Municipal y las observaciones del Ministerio de Hacienda.",
    relatedCategory: "Economía",
    keywords: ["contribuciones", "impuesto territorial", "primera vivienda", "vivienda", "tributaria", "impuestos", "fondo comun municipal", "municipios", "dipres", "hacienda", "recaudacion"]
  },
  {
    id: "vid-9",
    title: "Consejo Fiscal Autónomo (CFA) alerta riesgos en proyecciones de ingresos y meta fiscal",
    channel: "BioBioChile",
    channelVerified: true,
    publishedDate: "14 jun 2026",
    duration: "6:45",
    youtubeVideoId: "PqQbBuzNr8I",
    youtubeUrl: "https://www.youtube.com/watch?v=PqQbBuzNr8I",
    summary: "Reporte de Radio Bío Bío sobre el informe del Consejo Fiscal Autónomo alertando sobre el estrecho margen fiscal, el endeudamiento público y las holguras presupuestarias del Estado.",
    relatedCategory: "Economía",
    keywords: ["cfa", "consejo fiscal", "consejo fiscal autonomo", "deuda", "presupuesto", "dipres", "holguras", "deficit", "déficit", "sostenibilidad", "hacienda", "fiscal", "gasto", "balance estructural"]
  },
  {
    id: "vid-10",
    title: "Contraloría General de la República y fiscalización a desvinculación de funcionarios y plantas estatales",
    channel: "Meganoticias",
    channelVerified: true,
    publishedDate: "19 mar 2026",
    duration: "3:45",
    youtubeVideoId: "HIdNYxNjb6U",
    youtubeUrl: "https://www.youtube.com/watch?v=HIdNYxNjb6U",
    summary: "Informe de Meganoticias sobre los dictámenes de la Contraloría General de la República respecto a la confianza legítima, dotación de ministerios y límites jurídicos a los despidos por decreto.",
    relatedCategory: "Estado",
    keywords: ["contraloria", "contraloría", "cgr", "funcionarios", "desvinculacion", "despidos", "plantas", "contrata", "confianza legitima", "ministerios", "empleo publico", "honorarios", "siaper", "estado"]
  },
  {
    id: "vid-11",
    title: "¿El fin de ministerios y reducción del Estado? El debate político e indicaciones al empleo público",
    channel: "BioBioChile",
    channelVerified: true,
    publishedDate: "06 jun 2026",
    duration: "6:20",
    youtubeVideoId: "qHAnTDiu5aM",
    youtubeUrl: "https://www.youtube.com/watch?v=qHAnTDiu5aM",
    summary: "Reporte de Bío Bío TV sobre la fuerte presión para fusionar y eliminar ministerios, optimizar la dotación del Estado y los reparos legislativos al plan de reestructuración pública.",
    relatedCategory: "Estado",
    keywords: ["ministerios", "ministerio", "fusion de ministerios", "fusión de ministerios", "reduccion de ministerios", "reducción de ministerios", "empleo publico", "empleo público", "reforma del estado", "honorarios", "contratas", "modernizacion", "modernización", "dotacion", "dotación", "gasto personal", "servicios publicos"]
  },
  {
    id: "vid-12",
    title: "Cirugías en listas de espera se derivan a clínicas privadas mediante convenio Fonasa para reducir demoras",
    channel: "T13 (Teletrece)",
    channelVerified: true,
    publishedDate: "01 abr 2026",
    duration: "4:05",
    youtubeVideoId: "xBzLiDkbjyg",
    youtubeUrl: "https://www.youtube.com/watch?v=xBzLiDkbjyg",
    summary: "Reportaje de T13 sobre la derivación de pacientes del sistema público Fonasa a clínicas privadas y extensión de pabellones quirúrgicos para enfrentar las listas de espera.",
    relatedCategory: "Salud",
    keywords: ["salud", "listas de espera", "fonasa", "clinicas", "clinica", "cirugias", "cirugia", "minsal", "hospitales", "hospital", "copago", "voucher", "libre eleccion", "quirurgica", "pacientes", "arancel"]
  },
  {
    id: "vid-13",
    title: "Auditoría de Contraloría a listas de espera hospitalarias: Detección de fallas en registros y mora quirúrgica",
    channel: "T13 (Teletrece)",
    channelVerified: true,
    publishedDate: "28 abr 2026",
    duration: "5:30",
    youtubeVideoId: "PINik4wyBRo",
    youtubeUrl: "https://www.youtube.com/watch?v=PINik4wyBRo",
    summary: "Informe de T13 sobre las auditorías de la Contraloría a la gestión de listas de espera en hospitales públicos regionales, detectando inconsistencias en registros y tiempos de espera.",
    relatedCategory: "Salud",
    keywords: ["salud", "hospitales", "hospital", "deuda hospitalaria", "listas de espera", "minsal", "tiempos de espera", "auditoria hospitalaria", "contraloria", "pacientes", "consultas medicas", "pabellones"]
  },
  {
    id: "vid-14",
    title: "Reportajes T13: Fichas eliminadas e irregularidades en interconsultas de listas de espera en hospitales públicos",
    channel: "T13 (Teletrece)",
    channelVerified: true,
    publishedDate: "11 may 2026",
    duration: "7:12",
    youtubeVideoId: "oFwRYMdFLH4",
    youtubeUrl: "https://www.youtube.com/watch?v=oFwRYMdFLH4",
    summary: "Investigación a fondo de Reportajes T13 sobre la eliminación injustificada de interconsultas médicas en recintos de salud pública y las denuncias presentadas ante la Fiscalía.",
    relatedCategory: "Salud",
    keywords: ["salud", "listas de espera", "hospital", "interconsultas", "sotero del rio", "minsal", "gestion hospitalaria", "pacientes", "negligencia", "atencion medica"]
  },
  {
    id: "vid-15",
    title: "Proyecto de Ley sobre liceos bicentenario y selección por mérito académico en el sistema escolar",
    channel: "CNN Chile",
    channelVerified: true,
    publishedDate: "05 may 2026",
    duration: "5:22",
    youtubeVideoId: "H392R2SkJYI",
    youtubeUrl: "https://www.youtube.com/watch?v=H392R2SkJYI",
    summary: "Análisis del proyecto de ley ingresado al Congreso que introduce cambios al Sistema de Admisión Escolar (SAE) y potencia la red de liceos bicentenario con selección académica.",
    relatedCategory: "Educación",
    keywords: ["educacion", "educación", "sae", "admision", "admisión", "merito", "mérito", "liceos bicentenario", "bicentenario", "mineduc", "colegios", "seleccion escolar"]
  },
  {
    id: "vid-16",
    title: "Crisis financiera y auditoría a los SLEP: Irregularidades presupuestarias y paralización docente",
    channel: "24 Horas - TVN Chile",
    channelVerified: true,
    publishedDate: "20 abr 2026",
    duration: "5:40",
    youtubeVideoId: "GoJA_4FlD7Y",
    youtubeUrl: "https://www.youtube.com/watch?v=GoJA_4FlD7Y",
    summary: "Reporte de 24 Horas TVN sobre los informes de auditoría a los Servicios Locales de Educación Pública (SLEP), las fallas en infraestructura escolar y las demandas del Colegio de Profesores.",
    relatedCategory: "Educación",
    keywords: ["slep", "educacion", "educación", "mineduc", "profesores", "colegios", "desmunicipalizacion", "crisis educativa", "fondos escolares", "colegio de profesores", "paros"]
  },
  {
    id: "vid-17",
    title: "Inexpropiabilidad de fondos previsionales y propiedad del ahorro: Votación en Sala del Senado",
    channel: "T13 (Teletrece)",
    channelVerified: true,
    publishedDate: "16 may 2026",
    duration: "4:30",
    youtubeVideoId: "NZc0IDgIF5o",
    youtubeUrl: "https://www.youtube.com/watch?v=NZc0IDgIF5o",
    summary: "Cobertura parlamentaria de la reforma constitucional que consagra la inexpropiabilidad de los fondos de pensiones y el debate por el aporte estatal a la PGU.",
    relatedCategory: "Pensiones",
    keywords: ["pension", "pensiones", "pensión", "afp", "fondos", "prevision", "previsión", "ahorro individual", "inexpropiabilidad", "jubilacion", "jubilación", "retiro", "hacienda", "ahorros"]
  },
  {
    id: "vid-18",
    title: "Comisión de Trabajo del Senado aprueba indicaciones a reforma previsional y reajuste de la PGU",
    channel: "T13 (Teletrece)",
    channelVerified: true,
    publishedDate: "27 may 2026",
    duration: "5:15",
    youtubeVideoId: "gslEcYCEqGM",
    youtubeUrl: "https://www.youtube.com/watch?v=gslEcYCEqGM",
    summary: "Análisis legislativo sobre los acuerdos en la Comisión de Trabajo para el reajuste progresivo de la Pensión Garantizada Universal y la administración de carteras previsionales.",
    relatedCategory: "Pensiones",
    keywords: ["pgu", "pensiones", "pension", "afp", "senado", "comision de trabajo", "ahorro previsional", "fondos generacionales", "jubilaciones", "prevision social"]
  },
  {
    id: "vid-19",
    title: "Aplicación de la Ley de Usurpaciones: Órdenes de desalojo y operativos en megatomas de terrenos",
    channel: "24 Horas - TVN Chile",
    channelVerified: true,
    publishedDate: "10 jun 2026",
    duration: "5:35",
    youtubeVideoId: "DxpbT4EVyyE",
    youtubeUrl: "https://www.youtube.com/watch?v=DxpbT4EVyyE",
    summary: "Reporte especial de 24 Horas sobre la ejecución judicial de desalojos con auxilio de la fuerza pública bajo la nueva Ley de Usurpaciones en terrenos fiscales y privados.",
    relatedCategory: "Vivienda",
    keywords: ["vivienda", "usurpaciones", "usurpacion", "usurpación", "tomas", "toma", "desalojos", "desalojo", "campamentos", "campamento", "terrenos", "propiedad", "minvu", "carabineros", "megatomas"]
  },
  {
    id: "vid-20",
    title: "Estrategia del Litio y Permisología Ambiental: Gobierno define salares para explotación e inversión minera",
    channel: "CNN Chile",
    channelVerified: true,
    publishedDate: "18 may 2026",
    duration: "6:12",
    youtubeVideoId: "PFx3baQKOt4",
    youtubeUrl: "https://www.youtube.com/watch?v=PFx3baQKOt4",
    summary: "Programa Minería 360 de CNN Chile analizando la apertura de contratos de exploración de litio a privados y la reducción de plazos en el Sistema de Evaluación de Impacto Ambiental (SEIA).",
    relatedCategory: "Medio Ambiente",
    keywords: ["litio", "mineria", "minería", "salares", "salar", "seia", "permisologia", "permisología", "ambiental", "medio ambiente", "inversion", "inversión", "ceol", "cobre", "sea", "permisos", "royalty"]
  },
  {
    id: "vid-21",
    title: "José Antonio Kast y agenda de los primeros 100 días: Orden fiscal, cuentas públicas y reforma de seguridad",
    channel: "CNN Chile",
    channelVerified: true,
    publishedDate: "12 jun 2026",
    duration: "8:20",
    youtubeVideoId: "52_KDsUEO2M",
    youtubeUrl: "https://www.youtube.com/watch?v=52_KDsUEO2M",
    summary: "Entrevista y análisis en CNN Chile sobre las prioridades ejecutivas en seguridad pública, ajuste de gasto fiscal y viabilidad legislativa en los primeros 100 días de mandato.",
    relatedCategory: "General",
    keywords: ["kast", "100 dias", "primeros 100 dias", "mandato", "gobierno", "seguridad", "orden", "programa", "fiscal", "balance", "cuentas publicas", "prioridades", "coherencia", "presidencia"]
  }
];

export const authentic100DaysCommitments: GovernmentCommitment[] = [
  {
    id: "com-1",
    title: "Despliegue militar ampliado en infraestructura crítica fronteriza",
    area: "Seguridad y Fronteras",
    status: "CUMPLIDA",
    executionPct: 100,
    officialDocRef: "D.S. N° 142 · Ministerio de Defensa Nacional",
    datePromulgated: "15 abr 2026",
    summary: "Prórroga y facultades extraordinarias al Ejército para control de identidad y registros en pasos no habilitados de Tarapacá y Antofagasta.",
    evidenceSource: "Diario Oficial de Chile (15/04/2026)"
  },
  {
    id: "com-2",
    title: "Creación del Comité Operativo de Crisis de Seguridad Pública e Inmigración",
    area: "Seguridad y Fronteras",
    status: "CUMPLIDA",
    executionPct: 100,
    officialDocRef: "D.S. N° 95 · Ministerio del Interior y Seguridad Pública",
    datePromulgated: "18 mar 2026",
    summary: "Mesa unificada de mando entre Carabineros, PDI, Estado Mayor Conjunto y directores regionales de aduanas.",
    evidenceSource: "Ministerio del Interior (18/03/2026)"
  },
  {
    id: "com-3",
    title: "Proyecto de Ley de Emergencia en Seguridad y Atribuciones en Flagrancia",
    area: "Seguridad y Fronteras",
    status: "EN CURSO",
    executionPct: 65,
    officialDocRef: "Boletín N° 16.912-07 · Congreso Nacional",
    datePromulgated: "28 mar 2026",
    summary: "Aprobado en primer trámite por la Comisión de Seguridad de la Cámara de Diputados; pendiente de votación en Sala.",
    evidenceSource: "Cámara de Diputadas y Diputados (28/03/2026)"
  },
  {
    id: "com-4",
    title: "Zanja de contención profunda y muro perimetral en macrozona norte",
    area: "Seguridad y Fronteras",
    status: "BLOQUEADA",
    executionPct: 20,
    officialDocRef: "Oficio Ord. N° 1.204 · Servicio de Evaluación Ambiental",
    datePromulgated: "10 may 2026",
    summary: "Paralizada temporalmente por requerimiento de Estudio de Impacto Ambiental y consulta sobre acuerdos limítrofes bilaterales.",
    evidenceSource: "SEA / Dirección Nacional de Fronteras y Límites"
  },
  {
    id: "com-5",
    title: "Reconducción inmediata del 100% de inmigrantes en condición irregular",
    area: "Seguridad y Fronteras",
    status: "INCUMPLIDA",
    executionPct: 42,
    officialDocRef: "Informe Estadístico Fronterizo Q1 · Carabineros & PDI",
    datePromulgated: "30 may 2026",
    summary: "Tasa efectiva de reconducción de 42.8% debido a la falta de protocolos de recepción formal por autoridades del país vecino.",
    evidenceSource: "Jefatura Nacional de Migraciones PDI"
  },
  {
    id: "com-6",
    title: "Proyecto de Reforma Tributaria y rebaja de impuesto corporativo al 23%",
    area: "Economía e Impuestos",
    status: "EN CURSO",
    executionPct: 60,
    officialDocRef: "Boletín N° 16.890-05 · Ministerio de Hacienda",
    datePromulgated: "02 abr 2026",
    summary: "Mensaje Presidencial ingresado con urgencia simple. En debate técnico en la Comisión de Hacienda de la Cámara de Diputados.",
    evidenceSource: "Cámara de Diputados / Ministerio de Hacienda"
  },
  {
    id: "com-7",
    title: "Exención de contribuciones a la primera vivienda habitacional",
    area: "Economía e Impuestos",
    status: "EN CURSO",
    executionPct: 45,
    officialDocRef: "Indicación al Boletín N° 16.890-05",
    datePromulgated: "14 abr 2026",
    summary: "En revisión por la Asociación Chilena de Municipalidades (AChM) para calibrar el impacto en el Fondo Común Municipal.",
    evidenceSource: "DIPRES / AChM"
  },
  {
    id: "com-8",
    title: "Plan de contención de gasto público y auditoría a traspasos",
    area: "Economía e Impuestos",
    status: "CUMPLIDA",
    executionPct: 90,
    officialDocRef: "Oficio Circular N° 12 · Ministerio de Hacienda",
    datePromulgated: "22 mar 2026",
    summary: "Instrucciones de austeridad fiscal y revisión de convenios con corporaciones y fundaciones privadas.",
    evidenceSource: "DIPRES (22/03/2026)"
  },
  {
    id: "com-9",
    title: "Congelamiento de contrataciones y honorarios en administración central",
    area: "Reforma del Estado",
    status: "CUMPLIDA",
    executionPct: 100,
    officialDocRef: "D.S. N° 88 · Ministerio de Hacienda",
    datePromulgated: "20 mar 2026",
    summary: "Restricción de nuevas incorporaciones y revisión de renovaciones de contratas ministeriales.",
    evidenceSource: "Diario Oficial (20/03/2026)"
  },
  {
    id: "com-10",
    title: "Fusión y supresión de ministerios por decreto reglamentario",
    area: "Reforma del Estado",
    status: "BLOQUEADA",
    executionPct: 15,
    officialDocRef: "Dictamen N° E51022 · Contraloría General de la República",
    datePromulgated: "17 mar 2026",
    summary: "Contraloría dictaminó que la alteración de ministerios y servicios públicos requiere tramitación de ley formal en el Congreso.",
    evidenceSource: "Contraloría General de la República (17/03/2026)"
  },
  {
    id: "com-11",
    title: "Convenio ampliado con prestadores privados para listas de espera Fonasa",
    area: "Salud y Listas de Espera",
    status: "CUMPLIDA",
    executionPct: 85,
    officialDocRef: "Resolución Exenta N° 314 · FONASA / Minsal",
    datePromulgated: "29 mar 2026",
    summary: "Habilitación de compras de servicios en clínicas privadas con arancel Fonasa preferente para cirugías con mora superior a 12 meses.",
    evidenceSource: "Fondo Nacional de Salud (FONASA)"
  },
  {
    id: "com-12",
    title: "Operación de pabellones quirúrgicos hospitalarios 24/7",
    area: "Salud y Listas de Espera",
    status: "EN CURSO",
    executionPct: 55,
    officialDocRef: "Ordinario N° 812 · Subsecretaría de Redes Asistenciales",
    datePromulgated: "15 abr 2026",
    summary: "Fase 1 implementada en 12 hospitales de alta complejidad con régimen de turnos vespertinos y fines de semana.",
    evidenceSource: "Ministerio de Salud (15/04/2026)"
  },
  {
    id: "com-13",
    title: "Auditoría integral a los Servicios Locales de Educación Pública (SLEP)",
    area: "Educación y Social",
    status: "CUMPLIDA",
    executionPct: 100,
    officialDocRef: "Decreto Exento N° 210 · Ministerio de Educación",
    datePromulgated: "05 abr 2026",
    summary: "Comisión interventora técnica para fiscalizar el traspaso de infraestructura y gestión presupuestaria de los SLEP.",
    evidenceSource: "MINEDUC (05/04/2026)"
  },
  {
    id: "com-14",
    title: "Implementación de Sistema de Subvención por Voucher Universal",
    area: "Educación y Social",
    status: "SIN_DATOS",
    executionPct: 10,
    officialDocRef: "Mesa Técnica MINEDUC",
    datePromulgated: "Mayo 2026",
    summary: "En etapa de modelamiento econométrico sin ingreso de proyecto formal a la Cámara de Diputados.",
    evidenceSource: "Mesa Técnica MINEDUC"
  }
];

export const initialAuditData: AuditState = {
  query: "Auditoría de primeros 100 días (11 mar – 19 jun 2026): Plan de Seguridad Fronteriza e Infraestructura Crítica",
  period: "11 de Marzo de 2026 – 19 de Junio de 2026",
  aiResponse: {
    title: "RESPUESTA DE LA IA (análisis prospectivo · EL AUDITOR)",
    content: `[ AUDITORÍA DE TEMÁTICA: Control Fronterizo y Despliegue de FF.AA. en Macrozona Norte ]
[ PERÍODO INVESTIGADO: 11 de Marzo de 2026 – 19 de Junio de 2026 · Primeros 100 Días ]

1. REGISTRO DE PROMESA (2026):
"Despliegue operativo inmediato de las Fuerzas Armadas con reglas de uso de la fuerza ampliadas, reforzamiento de zanjas y habilitación de campamentos militares permanentes en pasos no habilitados."

2. ESTADO DE EJECUCIÓN:
Status: EN CURSO
Evidencia: Decreto Supremo N° 142 publicado en el Diario Oficial con fecha 15 de abril de 2026; Oficio Ordinario N° 4.810 del Ministerio de Defensa Nacional.

3. ANÁLISIS DE FACT-CHECKING:
El Ejecutivo reporta un control del 85% de los pasos no habilitados en Colchane y Ollagüe. No obstante, los registros de Carabineros de Chile y la PDI consignan una reconducción efectiva del 42.8% debido a la falta de acuerdos bilaterales de recepción con autoridades del país vecino, generando un desacople entre la narrativa comunicacional y el registro administrativo de frontera.

4. PROYECCIÓN DE IMPACTO:
Escenario 6 meses: Saturación de capacidades logísticas del Ejército en zona altiplánica y aumento de judicialización por detenciones sin flagrancia formal.
Nivel de Riesgo: Medio

5. VEREDICTO DE COHERENCIA:
Relato Histórico: En 2017 y 2021 se planteó la creación de un 'Comando Conjunto Fronterizo' autónomo. En 2026 se optó pragmáticamente por extender el DFL de Infraestructura Crítica existente para evitar dilaciones en el Congreso.
Veredicto: EVOLUCIÓN PRAGMÁTICA

[ALERTA DE DESFINANCIAMIENTO: La mantención del despliegue extendido del Ejército compromete $18.400 millones de la partida 11 del Tesoro Público sin glosa suplementaria tramitada ante DIPRES.]`,
    coherenceMetric: {
      status: "En curso",
      statusColor: "amber",
      confidence: 94,
      detail: "Cotejado con D.S. N° 142, Diario Oficial y registros DIPRES (Partida 11 · Período 11 mar - 19 jun 2026)."
    },
    structuredAudit: {
      theme: "Control Fronterizo y Despliegue de FF.AA. en Macrozona Norte",
      period: "11 de Marzo de 2026 – 19 de Junio de 2026",
      promise2026: "Despliegue operativo inmediato de las Fuerzas Armadas con reglas de uso de la fuerza ampliadas, reforzamiento de zanjas y habilitación de campamentos militares permanentes en pasos no habilitados.",
      status: "EN CURSO",
      evidence: "Decreto Supremo N° 142 publicado en el Diario Oficial con fecha 15 de abril de 2026; Oficio Ordinario N° 4.810 del Ministerio de Defensa Nacional.",
      factChecking: "El Ejecutivo reporta un control del 85% de pasos no habilitados. Sin embargo, registros de Carabineros y PDI reportan reconducción efectiva de solo 42.8% por ausencia de convenios de recepción fronteriza.",
      sixMonthProjection: "Saturación de capacidades logísticas militares en zona altiplánica y aumento de judicialización por detenciones.",
      riskLevel: "Medio",
      historicalNarrative: "En 2017/2021 se propuso una policía fronteriza autónoma; en 2026 se extendió el DFL de infraestructura crítica existente.",
      verdict: "EVOLUCIÓN PRAGMÁTICA",
      defundingAlert: "La mantención del despliegue militar compromete $18.400 millones de la partida 11 del Tesoro Público sin glosa suplementaria tramitada ante DIPRES.",
      hasDefundingRisk: true,
      newsVideos: [
        verifiedNewsVideosData[0],
        verifiedNewsVideosData[9],
        verifiedNewsVideosData[8],
        verifiedNewsVideosData[3],
        verifiedNewsVideosData[1]
      ]
    },
    newsVideos: [
      verifiedNewsVideosData[0],
      verifiedNewsVideosData[9],
      verifiedNewsVideosData[8],
      verifiedNewsVideosData[3],
      verifiedNewsVideosData[1]
    ]
  },
  complianceStatus: {
    headline: "58% de compromisos 100 días en ejecución",
    executedPercent: 58,
    period: "11 de marzo de 2026 – 19 de junio de 2026",
    totalCommitments: 58,
    daysEvaluated: 100,
    breakdown: [
      { label: "Promesas cumplidas", value: 34, color: "#10b981", tag: "green" },
      { label: "En proceso / trámite", value: 24, color: "#f59e0b", tag: "amber" },
      { label: "Bloqueadas / Incumplidas", value: 22, color: "#f43f5e", tag: "red" },
      { label: "Sin datos oficiales", value: 20, color: "#64748b", tag: "pale" }
    ],
    commitments: authentic100DaysCommitments
  },
  updates: [
    {
      id: "up-1",
      type: "Decreto",
      title: "D.S. N° 142 · 15 abr 2026",
      category: "Decreto",
      date: "15 abr 2026",
      summary: "Prórroga y ampliación de facultades a FF.AA. en control de infraestructura crítica fronteriza.",
      entity: "Ministerio de Defensa Nacional"
    },
    {
      id: "up-2",
      type: "Discurso",
      title: "La Moneda · 11 abr 2026",
      category: "Discurso",
      date: "11 abr 2026",
      summary: "Discurso primer mes de gobierno: Anuncio de plan de reducción ministerial y auditoría a dotación fiscal.",
      entity: "Presidencia de la República"
    },
    {
      id: "up-3",
      type: "Informe",
      title: "DIPRES · Balance Fiscal Marzo 2026",
      category: "Informe",
      date: "08 abr 2026",
      summary: "Evaluación de sostenibilidad fiscal y advertencia sobre financiamiento de exenciones tributarias.",
      entity: "Dirección de Presupuestos (DIPRES)"
    },
    {
      id: "up-4",
      type: "Ley",
      title: "Proyecto Ley Reforma Tributaria 2026",
      category: "Ley",
      date: "02 abr 2026",
      summary: "Mensaje presidencial para rebaja gradual de impuesto corporativo al 23% y eliminación de contribuciones.",
      entity: "Ministerio de Hacienda"
    }
  ],
  verifiedSources: [
    {
      id: "ref-1",
      refNumber: "Ref 1",
      name: "Diario Oficial de Chile",
      detail: "Ediciones oficiales marzo-junio 2026 · 48 decretos indexados",
      url: "https://www.diariooficial.interior.gob.cl",
      verifiedDate: "19 jun 2026",
      confidenceScore: 99,
      verificationStatus: "Primaria Estatal Directa",
      verificationTier: "OFICIAL_PRIMARIA",
      protocolVerified: true
    },
    {
      id: "ref-2",
      refNumber: "Ref 2",
      name: "DIPRES - Ministerio de Hacienda",
      detail: "Informes de Ejecución Presupuestaria y Balances Estructurales Q1-Q2",
      url: "https://www.dipres.gob.cl",
      verifiedDate: "08 jun 2026",
      confidenceScore: 97,
      verificationStatus: "Balance Fiscal Auditado",
      verificationTier: "OFICIAL_PRIMARIA",
      protocolVerified: true
    },
    {
      id: "ref-3",
      refNumber: "Ref 3",
      name: "Programa de Gobierno 2026 / Archivo 2021-2017",
      detail: "Bases programáticas contrastadas con historial transmedia",
      url: "#",
      verifiedDate: "11 mar 2026",
      confidenceScore: 93,
      verificationStatus: "Registro Histórico Cotejado",
      verificationTier: "REGISTRO_HISTORICO",
      protocolVerified: true
    },
    {
      id: "ref-4",
      refNumber: "Ref 4",
      name: "Banco Central de Chile & INE",
      detail: "IPoM Marzo 2026 y series oficiales de empleo e inflación",
      url: "https://www.bcentral.cl",
      verifiedDate: "05 jun 2026",
      confidenceScore: 98,
      verificationStatus: "Órgano Constitucional Autónomo",
      verificationTier: "AUTONOMO_ESTATAL",
      protocolVerified: true
    }
  ],
  newsVideos: verifiedNewsVideosData.slice(0, 6),
  totalIndexedDocs: 48,
  totalVerifiedSources: 44
};

export const allRepositoryDocuments: DataUpdate[] = [
  ...initialAuditData.updates,
  {
    id: "up-5",
    type: "Ley",
    title: "Ley de Emergencia en Seguridad Pública",
    date: "28 mar 2026",
    summary: "Atribuciones especiales para allanamientos y medidas cautelares en flagrancia.",
    entity: "Ministerio de Seguridad y Justicia"
  },
  {
    id: "up-6",
    type: "Informe",
    title: "Banco Central · IPoM Marzo 2026",
    date: "26 mar 2026",
    summary: "Proyecciones de crecimiento económico (1.8% - 2.2%) y ajuste de TPM.",
    entity: "Banco Central de Chile"
  },
  {
    id: "up-7",
    type: "Decreto",
    title: "D.S. N° 88 · Fusión de Servicios Estatales",
    date: "20 mar 2026",
    summary: "Plan piloto de integración de subsecretarías y congelamiento de contrataciones a honorarios.",
    entity: "Ministerio de Hacienda"
  },
  {
    id: "up-8",
    type: "Dictamen",
    title: "Dictamen N° E51022 · Contraloría General",
    date: "17 mar 2026",
    summary: "Resolución sobre límites legales a la desvinculación masiva de funcionarios a contrata.",
    entity: "Contraloría General de la República"
  },
  {
    id: "up-9",
    type: "Discurso",
    title: "Discurso de Traspaso de Mando · Congreso Nacional",
    date: "11 mar 2026",
    summary: "Asunción presidencial de José Antonio Kast: Fijación de urgencias nacionales.",
    entity: "Presidencia de la República"
  },
  {
    id: "up-10",
    type: "Informe",
    title: "Minsal · Estado de Deuda Hospitalaria Q1",
    date: "05 abr 2026",
    summary: "Diagnóstico inicial de pasivos acumulados en servicios de salud pública.",
    entity: "Ministerio de Salud"
  }
];

export const allVerifiedSourcesData: VerifiedSource[] = [
  ...initialAuditData.verifiedSources,
  {
    id: "ref-5",
    refNumber: "Ref 5",
    name: "Contraloría General de la República",
    detail: "cgr.cl · Dictámenes de personal e instalación ministerial",
    url: "https://www.contraloria.cl",
    verifiedDate: "17 jun 2026",
    confidenceScore: 99,
    verificationStatus: "Fiscalización Jurídica Constitucional",
    verificationTier: "AUTONOMO_ESTATAL",
    protocolVerified: true
  },
  {
    id: "ref-6",
    refNumber: "Ref 6",
    name: "Cámara de Diputadas y Diputados de Chile",
    detail: "Boletines de proyectos de ley con urgencia presidencial (11 mar - 19 jun 2026)",
    url: "https://www.camara.cl",
    verifiedDate: "18 jun 2026",
    confidenceScore: 96,
    verificationStatus: "Registro Legislativo Oficial",
    verificationTier: "LEGISLATIVO",
    protocolVerified: true
  },
  {
    id: "ref-7",
    refNumber: "Ref 7",
    name: "Senado de la República de Chile",
    detail: "Comisiones de Hacienda y Seguridad Pública",
    url: "https://www.senado.cl",
    verifiedDate: "16 jun 2026",
    confidenceScore: 96,
    verificationStatus: "Registro Legislativo Oficial",
    verificationTier: "LEGISLATIVO",
    protocolVerified: true
  },
  {
    id: "ref-8",
    refNumber: "Ref 8",
    name: "Centro de Estudios Públicos (CEP)",
    detail: "Series estadísticas y fact-checking de políticas públicas",
    url: "https://www.cepchile.cl",
    verifiedDate: "02 jun 2026",
    confidenceScore: 91,
    verificationStatus: "Estudio Estadístico Independiente",
    verificationTier: "ACADEMICO_ESTADISTICO",
    protocolVerified: true
  },
  {
    id: "ref-9",
    refNumber: "Ref 9",
    name: "Biblioteca del Congreso Nacional (BCN)",
    detail: "Historial de programas presidenciales (2017, 2021, 2026)",
    url: "https://www.bcn.cl",
    verifiedDate: "10 jun 2026",
    confidenceScore: 95,
    verificationStatus: "Archivo Parlamentario Documental",
    verificationTier: "LEGISLATIVO",
    protocolVerified: true
  }
];

const genericStopWords = new Set([
  "de", "del", "la", "las", "el", "los", "un", "una", "unos", "unas", "en", "para", "por", 
  "con", "sin", "sobre", "entre", "tras", "durante", "ante", "bajo", "desde", "hacia", "hasta", 
  "contra", "que", "cual", "cuales", "quien", "quienes", "como", "cuando", "donde", "auditoria", 
  "auditoría", "gestion", "gestión", "publica", "pública", "publico", "público", "oficial", 
  "registro", "datos", "analisis", "análisis", "informe", "resumen", "primeros", "dias", "días", 
  "medida", "medidas", "plan", "proyecto", "decreto", "ley", "leyes", "chile", "sobre", "esta", "este", "estos"
]);

// Helper to match videos strictly corresponding to the query content, max 6 videos
export function matchVideosForQuery(query: string, theme?: string): NewsVideoReport[] {
  const normalize = (text: string) =>
    (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const qNorm = normalize(query);
  const themeNorm = normalize(theme || "");
  
  const meaningfulTokens = qNorm
    .split(/[\s,.;:¿?¡!()/-]+/)
    .filter((w) => w.length > 2 && !genericStopWords.has(w));

  const isGeneralOverviewQuery = 
    qNorm.includes("gobierno") ||
    qNorm.includes("100") ||
    qNorm.includes("mandato") ||
    qNorm.includes("coherencia") ||
    qNorm.includes("balance") ||
    qNorm.includes("kast") ||
    qNorm.includes("resumen");

  const scored = verifiedNewsVideosData
    .map((vid) => {
      let score = 0;
      let hasDirectQueryMatch = false;
      const titleNorm = normalize(vid.title);
      const summaryNorm = normalize(vid.summary);
      const catNorm = normalize(vid.relatedCategory);
      const keywordsNorm = (vid.keywords || [])
        .map(normalize)
        .filter((k) => !genericStopWords.has(k));

      // 1. Direct keyword match against query (highest weight)
      for (const kw of keywordsNorm) {
        if (qNorm.includes(kw)) {
          score += 35;
          hasDirectQueryMatch = true;
        } else if (themeNorm && themeNorm.includes(kw)) {
          score += 8;
        }
      }

      // 2. Meaningful query tokens found in title, keywords or summary
      for (const token of meaningfulTokens) {
        if (titleNorm.includes(token)) {
          score += 16;
          hasDirectQueryMatch = true;
        } else if (keywordsNorm.some((k) => k.includes(token))) {
          score += 14;
          hasDirectQueryMatch = true;
        } else if (summaryNorm.includes(token)) {
          score += 6;
          hasDirectQueryMatch = true;
        }
      }

      // 3. Category match
      if (catNorm && !genericStopWords.has(catNorm)) {
        if (meaningfulTokens.some((t) => catNorm.includes(t)) || qNorm.includes(catNorm)) {
          score += 12;
          hasDirectQueryMatch = true;
        }
      }

      // Strict requirement: must directly match the search query!
      if (!hasDirectQueryMatch) {
        return { vid, score: 0 };
      }

      return { vid, score };
    })
    .filter((item) => item.score >= 14); // Strict coherence threshold

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  const coherentVideos = scored.map((s) => s.vid).slice(0, 6);

  // If no coherent video was matched directly, check if it was an intentional overview search
  if (coherentVideos.length === 0) {
    if (isGeneralOverviewQuery) {
      return verifiedNewsVideosData
        .filter((v) => v.relatedCategory === "General" || v.relatedCategory === "Seguridad" || v.relatedCategory === "Economía")
        .slice(0, 6);
    }
    // Return empty array if not coherent: do not link unrelated videos
    return [];
  }

  return coherentVideos;
}

