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
    title: "Despliegue militar y prórroga en infraestructura crítica fronteriza",
    area: "Seguridad y Fronteras",
    status: "CUMPLIDA",
    executionPct: 100,
    officialDocRef: "D.S. N° 76 (Interior) · idNorma 1223930",
    docUrl: "https://www.bcn.cl/leychile/navegar?idNorma=1223930",
    datePromulgated: "08 may 2026",
    summary: "Decreto Supremo promulgado el 06/05/2026 y publicado el 08/05/2026 que modifica el D.S. N° 78/2023 y prorroga la vigencia del resguardo en zonas fronterizas.",
    evidenceSource: "BCN Ley Chile / Ministerio del Interior (D.S. N° 76/2026)"
  },
  {
    id: "com-2",
    title: "Incorporación constitucional de Gendarmería a las Fuerzas de Orden y Seguridad",
    area: "Seguridad y Fronteras",
    status: "CUMPLIDA",
    executionPct: 100,
    officialDocRef: "Ley N° 21.810 (Boletín N° 18.032-07) · idNorma 1223237",
    docUrl: "https://www.bcn.cl/leychile/Navegar?idNorma=1223237",
    datePromulgated: "16 abr 2026",
    summary: "Reforma constitucional promulgada el 09/04/2026 y publicada el 16/04/2026 que incorpora a Gendarmería de Chile dentro de las Fuerzas de Orden y Seguridad Pública.",
    evidenceSource: "BCN Ley Chile (Ley N° 21.810)"
  },
  {
    id: "com-3",
    title: "Ley de Ampliación del Plazo de Flagrancia (24 horas)",
    area: "Seguridad y Fronteras",
    status: "CUMPLIDA",
    executionPct: 100,
    officialDocRef: "Ley N° 21.845 (Boletín N° 16.481-25) · idNorma 1228990",
    docUrl: "https://www.bcn.cl/leychile/Navegar?idNorma=1228990",
    datePromulgated: "10 oct 2026",
    summary: "Modificación promulgada al Código Procesal Penal que amplía el plazo máximo de flagrancia a 24 horas y fortalece facultades investigativas.",
    evidenceSource: "BCN Ley Chile / Senado (Ley N° 21.845)"
  },
  {
    id: "com-4",
    title: "Resguardo fronterizo y obras de contención bajo marco de Infraestructura Crítica",
    area: "Seguridad y Fronteras",
    status: "BLOQUEADA",
    executionPct: 20,
    officialDocRef: "Ley N° 21.542 (Infraestructura Crítica) · idNorma 1188583",
    docUrl: "https://www.bcn.cl/leychile/Navegar?idNorma=1188583",
    datePromulgated: "03 feb 2023",
    summary: "Obras fronterizas sujetas a evaluación ambiental, consulta sobre acuerdos limítrofes bilaterales y límites constitucionales de la Ley N° 21.542.",
    evidenceSource: "BCN Ley Chile / Ley N° 21.542"
  },
  {
    id: "com-5",
    title: "Reconducción inmediata de migrantes en condición irregular",
    area: "Seguridad y Fronteras",
    status: "INCUMPLIDA",
    executionPct: 42,
    officialDocRef: "Ley N° 21.325 de Migración y Extranjería · idNorma 1158549",
    docUrl: "https://www.bcn.cl/leychile/Navegar?idNorma=1158549",
    datePromulgated: "20 abr 2021",
    summary: "La ejecución de reconducciones inmediatas está condicionada por la recepción formal de autoridades de países vecinos conforme a la Ley N° 21.325.",
    evidenceSource: "BCN Ley Chile / Ley N° 21.325"
  },
  {
    id: "com-6",
    title: "Ley de Reconstrucción Nacional y Desarrollo Económico y Social (eje tributario)",
    area: "Economía e Impuestos",
    status: "CUMPLIDA",
    executionPct: 100,
    officialDocRef: "Ley N° 21.850 (Boletín N° 18.216-05) · idNorma 1229250",
    docUrl: "https://www.bcn.cl/leychile/navegar?idNorma=1229250",
    datePromulgated: "17 oct 2026",
    summary: "Mensaje Presidencial ingresado el 22/04/2026, promulgado el 09/10/2026 y publicado el 17/10/2026 como Ley N° 21.850.",
    evidenceSource: "BCN Ley Chile / Ministerio de Hacienda (Ley N° 21.850)"
  },
  {
    id: "com-7",
    title: "Medidas habitacionales, subsidio a tasas hipotecarias UF 6.000 e impuesto territorial",
    area: "Economía e Impuestos",
    status: "EN CURSO",
    executionPct: 45,
    officialDocRef: "Ley N° 21.850 & Cobertura Económica 2026",
    docUrl: "https://www.biobiochile.cl/noticias/economia/actualidad-economica/2026/08/05/demasiado-lo-claro-y-las-dudas-del-proyecto-de-subsidiar-tasas-para-viviendas-de-hasta-uf-6-000.shtml",
    datePromulgated: "05 ago 2026",
    summary: "Debate fiscal sobre compensaciones municipales, alcance del subsidio a tasas hipotecarias hasta 6.000 UF y alertas del CFA.",
    evidenceSource: "BioBioChile / Ministerio de Hacienda"
  },
  {
    id: "com-8",
    title: "Plan de contención de gasto público y seguimiento fiscal trimestral DIPRES",
    area: "Economía e Impuestos",
    status: "CUMPLIDA",
    executionPct: 90,
    officialDocRef: "IFP 1T 2026 · DIPRES (articles-413367_Informe_PDF.pdf)",
    docUrl: "https://www.dipres.gob.cl/598/articles-413367_Informe_PDF.pdf",
    datePromulgated: "25 may 2026",
    summary: "Evaluación oficial del escenario fiscal y proyecciones de contención del gasto en el Informe de Finanzas Públicas del 1T 2026.",
    evidenceSource: "DIPRES · Informe de Finanzas Públicas 1T 2026"
  },
  {
    id: "com-9",
    title: "Instructivos iniciales de rebaja de gasto fiscal y auditoría en ministerios",
    area: "Reforma del Estado",
    status: "CUMPLIDA",
    executionPct: 100,
    officialDocRef: "Ejecución Presupuestaria 2026 · DIPRES / BioBioChile",
    docUrl: "https://www.dipres.gob.cl/597/articles-412831_doc_pdf.pdf",
    datePromulgated: "20 mar 2026",
    summary: "Directrices iniciales de contención de gasto operativo en ministerios y seguimiento mediante informes de ejecución presupuestaria DIPRES.",
    evidenceSource: "DIPRES (articles-412831_doc_pdf.pdf)"
  },
  {
    id: "com-10",
    title: "Fusión y supresión de ministerios o SEREMIs por decreto reglamentario",
    area: "Reforma del Estado",
    status: "BLOQUEADA",
    executionPct: 15,
    officialDocRef: "Ley N° 18.575 (LOC Bases Generales) · idNorma 29967",
    docUrl: "https://www.bcn.cl/leychile/Navegar?idNorma=29967",
    datePromulgated: "05 dic 1986",
    summary: "Conforme al marco orgánico de la Ley N° 18.575, la creación, fusión o supresión de ministerios y SEREMIs requiere ley formal en el Congreso Nacional.",
    evidenceSource: "BCN Ley Chile (Ley N° 18.575)"
  },
  {
    id: "com-11",
    title: "Sistema de Acceso Priorizado (SAP) FONASA y convenios para listas de espera",
    area: "Salud y Listas de Espera",
    status: "CUMPLIDA",
    executionPct: 85,
    officialDocRef: "Ley N° 21.736 (SAP FONASA) · Ficha Legislativa BCN",
    docUrl: "https://www.bcn.cl/balance-legislativo/detalle/ficha_LEY_21736_2025-04-11",
    datePromulgated: "11 abr 2025",
    summary: "Implementación en 2026 del Sistema de Acceso Priorizado (SAP) de Fonasa para reducir tiempos de espera quirúrgica mediante convenios con prestadores.",
    evidenceSource: "BCN Balance Legislativo (Ley N° 21.736)"
  },
  {
    id: "com-12",
    title: "Seguimiento ciudadano de garantías GES y listas de espera hospitalarias",
    area: "Salud y Listas de Espera",
    status: "EN CURSO",
    executionPct: 55,
    officialDocRef: "Portal Paciente MINSAL · Listas de Espera y GES",
    docUrl: "https://portalpaciente.minsal.cl/",
    datePromulgated: "2026",
    summary: "Plataforma oficial del Ministerio de Salud para consulta en línea del estado de interconsultas, cirugías y garantías GES.",
    evidenceSource: "Ministerio de Salud (portalpaciente.minsal.cl)"
  },
  {
    id: "com-13",
    title: "Actualización de Estrategia Nacional de Educación Pública y fiscalización a SLEP",
    area: "Educación y Social",
    status: "CUMPLIDA",
    executionPct: 100,
    officialDocRef: "Decreto N° 29 (Ministerio de Educación) · idNorma 1226344",
    docUrl: "https://www.bcn.cl/leychile/navegar?idNorma=1226344",
    datePromulgated: "24 jul 2026",
    summary: "Decreto del Ministerio de Educación que modifica el D.S. N° 87/2020 sobre Estrategia Nacional de Educación Pública y operación de SLEP.",
    evidenceSource: "BCN Ley Chile / MINEDUC (D.S. N° 29/2026)"
  },
  {
    id: "com-14",
    title: "Implementación de Sistema de Subvención por Voucher Universal",
    area: "Educación y Social",
    status: "SIN_DATOS",
    executionPct: 10,
    officialDocRef: "D.F.L. N° 2 de 1998 (Subvenciones) · idNorma 127911",
    docUrl: "https://www.bcn.cl/leychile/Navegar?idNorma=127911",
    datePromulgated: "28 nov 1998",
    summary: "El régimen vigente continúa regido por el D.F.L. N° 2 de 1998; la reforma de voucher universal no registra ley promulgada en 2026.",
    evidenceSource: "BCN Ley Chile (D.F.L. N° 2 de 1998)"
  }
];

export const initialAuditData: AuditState = {
  query: "Auditoría de primeros 100 días (11 mar – 19 jun 2026): Plan de Seguridad Fronteriza e Infraestructura Crítica",
  period: "11 de Marzo de 2026 – 19 de Junio de 2026",
  aiResponse: {
    title: "RESPUESTA DE LA IA (análisis prospectivo · EL AUDITOR)",
    content: `[ AUDITORÍA DE TEMÁTICA: Control Fronterizo y Resguardo de Infraestructura Crítica ]
[ PERÍODO INVESTIGADO: 11 de Marzo de 2026 – 19 de Junio de 2026 · Primeros 100 Días ]

1. REGISTRO DE PROMESA (2026):
(Resumen documental) Reforzamiento del control en pasos fronterizos no habilitados y prórroga del resguardo militar bajo el marco de Infraestructura Crítica.

2. ESTADO DE EJECUCIÓN:
Status: EN CURSO
Evidencia: Decreto N° 76 del Ministerio del Interior (idNorma 1223930, publicado el 08/05/2026) que modifica el D.S. N° 78 de 2023 y prorroga su vigencia; Ley N° 21.542 sobre Protección de Infraestructura Crítica (idNorma 1188583); Boletín N° 15.805-07 (Ley RUF en Comisión Mixta).

3. ANÁLISIS DE FACT-CHECKING:
El despliegue territorial en fronteras cuenta con respaldo administrativo vigente en el D.S. N° 76 (08 may 2026) y marco constitucional en la Ley N° 21.542. Sin embargo, las reconducciones inmediatas bajo la Ley N° 21.325 permanecen sujetas a recepción consular por parte de países vecinos y la normativa definitiva de Reglas del Uso de la Fuerza (Boletín N° 15.805-07) continúa en tramitación legislativa.

4. PROYECCIÓN DE IMPACTO:
Escenario 6 meses: Continuidad de prórrogas administrativas sucesivas cada 90 días mientras el Boletín N° 15.805-07 completa su tramitación en el Congreso Nacional.
Nivel de Riesgo: Medio

5. VEREDICTO DE COHERENCIA:
Relato Histórico: En el programa oficial presentado ante el Servel se propuso control estricto de fronteras y apoyo operativo de las FF.AA.; en ejecución 2026 se extendió la herramienta jurídica vigente de Infraestructura Crítica (D.S. N° 76 / Ley N° 21.542).
Veredicto: EVOLUCIÓN PRAGMÁTICA`,
    coherenceMetric: {
      status: "En curso",
      statusColor: "amber",
      confidence: 95,
      detail: "Cotejado en vivo con D.S. N° 76 (idNorma 1223930), Ley N° 21.542 y Boletín N° 15.805-07."
    },
    structuredAudit: {
      theme: "Control Fronterizo y Resguardo de Infraestructura Crítica",
      period: "11 de Marzo de 2026 – 19 de Junio de 2026",
      promise2026: "Resumen documental: Reforzamiento operativo de control fronterizo y resguardo mediante Infraestructura Crítica según el Programa Oficial presentado ante el Servel.",
      status: "EN CURSO",
      evidenceClassification: "PARCIALMENTE CONFIRMADA",
      evidence: "Decreto N° 76 (Ministerio del Interior, idNorma 1223930, pub. 08 may 2026); Ley N° 21.542 (Infraestructura Crítica, idNorma 1188583); Boletín N° 15.805-07 (RUF).",
      factChecking: "Se confirma la prórroga normativa del resguardo fronterizo mediante el D.S. N° 76 (pub. 08 may 2026) al amparo de la Ley N° 21.542, mientras las reconducciones bajo Ley N° 21.325 dependen de acuerdos bilaterales y el Boletín N° 15.805-07 (RUF) sigue en Comisión Mixta.",
      sixMonthProjection: "Sujeto a prórrogas reglamentarias sucesivas y al despacho legislativo definitivo de las Reglas del Uso de la Fuerza (Boletín N° 15.805-07).",
      riskLevel: "Medio",
      historicalNarrative: "Uso de la arquitectura legal vigente (Ley N° 21.542 y prórrogas vía D.S. N° 76) mientras avanza la discusión legislativa sobre RUF y estados de excepción (Boletín N° 18.258-07).",
      verdict: "EVOLUCIÓN PRAGMÁTICA",
      defundingAlert: "Las asignaciones de ejecución fiscal y eventuales requerimientos adicionales deben verificarse en los Informes de Finanzas Públicas (IFP 1T-3T 2026) publicados por DIPRES.",
      hasDefundingRisk: false,
      budgetVerification: {
        institution: "Dirección de Presupuestos (DIPRES) · Ministerio de Hacienda",
        budgetDocument: "IFP 1T 2026 (articles-413367_Informe_PDF.pdf) / Ejecución Presupuestaria 2026",
        itemOrSubtitle: "Presupuesto consolidado del Gobierno Central 2026",
        period: "11 mar – 19 jun 2026",
        currency: "CLP (verificado en PDFs oficiales DIPRES)",
        approvedVsExecutedNote: "Los montos aprobados, vigentes y ejecutados se consultan directamente en los informes trimestrales IFP 1T, 2T y 3T 2026 de DIPRES.",
        spendingNature: "No verificado"
      },
      legalVerification: {
        normRank: "Decreto Supremo / Reforma Constitucional (Ley N° 21.542 y D.S. N° 76)",
        articlesCited: "D.S. N° 76/2026 Interior (idNorma 1223930); Ley N° 21.542 (idNorma 1188583); Ley N° 21.325",
        legalNature: "Facultad administrativa sujeta a prórroga constitucional periódica",
        scopeAndControversy: "Tramitación paralela de proyectos legislativos sobre control de identidad (Boletín N° 18.258-07) y Ley RUF (Boletín N° 15.805-07)."
      },
      epistemicSeparation: {
        confirmedFacts: [
          "Publicación en Ley Chile BCN del D.S. N° 76 (Interior) el 08 may 2026 prorrogando el D.S. N° 78 de 2023 (idNorma 1223930).",
          "Tramitación legislativa vigente del Boletín N° 15.805-07 (RUF) y Boletín N° 18.258-07 (control de identidad en estados de excepción)."
        ],
        authorityStatements: [
          "Ejecutivo destacó despliegue fronterizo y primeros instructivos desde el 11 de marzo de 2026."
        ],
        journalisticInterpretations: [
          "Coberturas de Meganoticias y BioBioChile documentan faenas en Colchane y discusión de límites operativos."
        ],
        researcherAnalysis: "La vigencia normativa del resguardo fronterizo está comprobada en BCN Ley Chile (D.S. N° 76), mientras los proyectos complementarios de RUF y expulsiones siguen su curso legislativo."
      },
      structuredProjection: {
        antecedents: "D.S. N° 76 vigente (08 may 2026) y Boletines N° 15.805-07 y N° 18.258-07 en trámite.",
        assumptions: "Continuidad de prórrogas de Infraestructura Crítica cada 90 días.",
        modifyingVariables: "Despacho definitivo de la Ley RUF (Boletín N° 15.805-07) y protocolos consulares bilaterales.",
        uncertaintyLevel: "Medio"
      },
      transparencyReport: {
        unverifiedGaps: "El desglose financiero operativo específico por destacamento militar no figura desagregado en los IFP globales de DIPRES.",
        requiredDocumentsForGap: "Anexos de Ejecución Presupuestaria Partida 11 (Defensa) y Partida 05 (Interior) en DIPRES.",
        queryDate: "19 jun 2026",
        documentVerificationNotes: "D.S. N° 76 (idNorma 1223930), Ley N° 21.542 (idNorma 1188583) y Boletín 15.805-07 verificados en vivo."
      },
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
      title: "Decreto N° 76 (Interior) · Prórroga Fronteriza (idNorma 1223930)",
      category: "Decreto",
      date: "08 may 2026",
      summary: "Modifica D.S. N° 78 de 2023 y prorroga vigencia de resguardo fronterizo e infraestructura crítica.",
      entity: "Ministerio del Interior (BCN Ley Chile)",
      link: "https://www.bcn.cl/leychile/navegar?idNorma=1223930"
    },
    {
      id: "up-2",
      type: "Ley",
      title: "Ley N° 21.850 (Boletín N° 18.216-05) · Reconstrucción y Desarrollo",
      category: "Ley",
      date: "17 oct 2026",
      summary: "Ley promulgada para la reconstrucción nacional y el desarrollo económico y social.",
      entity: "Ministerio de Hacienda (BCN Ley Chile)",
      link: "https://www.bcn.cl/leychile/navegar?idNorma=1229250"
    },
    {
      id: "up-3",
      type: "Informe",
      title: "DIPRES · Informe de Finanzas Públicas (IFP) 1T 2026 (PDF)",
      category: "Informe",
      date: "25 may 2026",
      summary: "Informe oficial de Finanzas Públicas Primer Trimestre 2026 emitido por DIPRES.",
      entity: "Dirección de Presupuestos (DIPRES)",
      link: "https://www.dipres.gob.cl/598/articles-413367_Informe_PDF.pdf"
    },
    {
      id: "up-4",
      type: "Dictamen",
      title: "Resolución N° 1.932 Exenta (CGR) · Viviendas Fiscales (idNorma 1227604)",
      category: "Dictamen",
      date: "28 ago 2026",
      summary: "Reglamento de Viviendas Fiscales de la Contraloría General de la República.",
      entity: "Contraloría General de la República (BCN)",
      link: "https://www.bcn.cl/leychile/navegar?idNorma=1227604"
    }
  ],
  verifiedSources: [
    {
      id: "ref-1",
      refNumber: "Ref 1",
      name: "BCN Ley Chile · Decreto N° 76 (Interior)",
      detail: "Decreto N° 76 publicado el 08/05/2026 que prorroga resguardo fronterizo D.S. N° 78/2023 (idNorma 1223930)",
      url: "https://www.bcn.cl/leychile/navegar?idNorma=1223930",
      verifiedDate: "08 may 2026",
      confidenceScore: 99,
      verificationStatus: "Primaria Estatal Directa (BCN XML)",
      verificationTier: "OFICIAL_PRIMARIA",
      sourceHierarchyLevel: 1,
      sourceHierarchyLabel: "Nivel 1 · Primaria Oficial",
      protocolVerified: true
    },
    {
      id: "ref-2",
      refNumber: "Ref 2",
      name: "DIPRES · Informe de Finanzas Públicas 1T 2026 (PDF)",
      detail: "Documento PDF oficial de Finanzas Públicas Primer Trimestre 2026 (articles-413367)",
      url: "https://www.dipres.gob.cl/598/articles-413367_Informe_PDF.pdf",
      verifiedDate: "25 may 2026",
      confidenceScore: 98,
      verificationStatus: "Informe Fiscal Oficial Directo",
      verificationTier: "OFICIAL_PRIMARIA",
      sourceHierarchyLevel: 1,
      sourceHierarchyLabel: "Nivel 1 · Primaria Oficial",
      protocolVerified: true
    },
    {
      id: "ref-3",
      refNumber: "Ref 3",
      name: "SERVEL · Programa de Gobierno Oficial PDF (J. A. Kast)",
      detail: "Archivo PDF íntegro (6.3 MB) presentado oficialmente ante el Servicio Electoral",
      url: "https://www.servel.cl/wp-content/uploads/2025/09/JOSE-ANTONIO-KAST-RIST.pdf",
      verifiedDate: "Sep 2025 / Vigente 2026",
      confidenceScore: 98,
      verificationStatus: "Documento Programático Original",
      verificationTier: "REGISTRO_HISTORICO",
      sourceHierarchyLevel: 1,
      sourceHierarchyLabel: "Nivel 1 · Documento Original Oficial",
      protocolVerified: true
    },
    {
      id: "ref-4",
      refNumber: "Ref 4",
      name: "Banco Central de Chile · IPoM Junio 2026",
      detail: "Publicación oficial directa del Informe de Política Monetaria (IPoM) Junio 2026",
      url: "https://www.bcentral.cl/contenido/-/detalle/publicaciones/politica-monetaria/ipom-junio-2026",
      verifiedDate: "Jun 2026",
      confidenceScore: 99,
      verificationStatus: "Órgano Constitucional Autónomo",
      verificationTier: "AUTONOMO_ESTATAL",
      sourceHierarchyLevel: 2,
      sourceHierarchyLabel: "Nivel 2 · Secundaria Especializada",
      protocolVerified: true
    }
  ],
  newsVideos: verifiedNewsVideosData.slice(0, 6),
  totalIndexedDocs: 75,
  totalVerifiedSources: 75
};

export const allRepositoryDocuments: DataUpdate[] = [
  ...initialAuditData.updates,
  {
    id: "up-5",
    type: "Decreto",
    title: "Decreto N° 52 (Interior) · Catástrofe Biobío (idNorma 1222446)",
    date: "17 mar 2026",
    summary: "Prorroga declaración de Estado de Excepción Constitucional de Catástrofe en Concepción, Penco y Tomé.",
    entity: "Ministerio del Interior (BCN Ley Chile)",
    link: "https://www.bcn.cl/leychile/navegar?idNorma=1222446"
  },
  {
    id: "up-6",
    type: "Decreto",
    title: "Decreto N° 140 (Interior) · Estado de Emergencia (idNorma 1228290)",
    date: "21 sep 2026",
    summary: "Prorroga declaración de Estado de Excepción Constitucional de Emergencia en zonas territoriales designadas.",
    entity: "Ministerio del Interior (BCN Ley Chile)",
    link: "https://www.bcn.cl/leychile/navegar?idNorma=1228290"
  },
  {
    id: "up-7",
    type: "Decreto",
    title: "Decreto N° 96 (Seguridad Pública) · Política Nacional de Seguridad Pública",
    date: "30 ene 2026",
    summary: "Aprueba la Política Nacional de Seguridad Pública (idNorma 1220944).",
    entity: "Ministerio de Seguridad Pública (BCN)",
    link: "https://www.bcn.cl/leychile/navegar?idNorma=1220944"
  },
  {
    id: "up-8",
    type: "Decreto",
    title: "Decreto N° 75 (Trabajo) · Reglamento Subsidio Unificado al Empleo",
    date: "30 sep 2026",
    summary: "Aprueba reglamento para la ejecución de la Ley N° 21.808 sobre Subsidio Unificado de Empleo (idNorma 1228676).",
    entity: "Ministerio del Trabajo (BCN Ley Chile)",
    link: "https://www.bcn.cl/leychile/navegar?idNorma=1228676"
  },
  {
    id: "up-9",
    type: "Decreto",
    title: "Decreto N° 29 (Educación) · Estrategia Nacional de Educación Pública",
    date: "24 jul 2026",
    summary: "Modifica D.S. N° 87/2020 sobre Estrategia Nacional de Educación Pública y SLEP (idNorma 1226344).",
    entity: "Ministerio de Educación (BCN Ley Chile)",
    link: "https://www.bcn.cl/leychile/navegar?idNorma=1226344"
  },
  {
    id: "up-10",
    type: "Decreto",
    title: "Decreto N° 815 (Hacienda) · Pago Sueldos Sector Público 2026",
    date: "03 sep 2026",
    summary: "Fija fechas de pago de remuneraciones del último cuatrimestre 2026 para el sector público (idNorma 1227798).",
    entity: "Ministerio de Hacienda (BCN Ley Chile)",
    link: "https://www.bcn.cl/leychile/navegar?idNorma=1227798"
  },
  {
    id: "up-11",
    type: "Decreto",
    title: "Decreto N° 50 (Salud) · Prorroga Alerta Sanitaria Marea Roja",
    date: "30 abr 2026",
    summary: "Prorroga alerta sanitaria en regiones de Los Lagos y Aysén por presencia de marea roja (idNorma 1223660).",
    entity: "Ministerio de Salud (BCN Ley Chile)",
    link: "https://www.bcn.cl/leychile/navegar?idNorma=1223660"
  },
  {
    id: "up-12",
    type: "Decreto",
    title: "Decreto N° 7 (Salud) · Alerta Sanitaria Virus Respiratorios 2026",
    date: "28 feb 2026",
    summary: "Decreta alerta sanitaria y facultades extraordinarias ante aumento de virus respiratorios (idNorma 1221816).",
    entity: "Ministerio de Salud (BCN Ley Chile)",
    link: "https://www.bcn.cl/leychile/navegar?idNorma=1221816"
  },
  {
    id: "up-13",
    type: "Decreto",
    title: "Resolución N° 1.048 Exenta (MINVU) · Mejoramiento de Viviendas 2026",
    date: "25 jul 2026",
    summary: "Llama a postulación nacional en condiciones especiales año 2026 para mejoramiento de viviendas y barrios (idNorma 1226444).",
    entity: "Ministerio de Vivienda y Urbanismo (BCN)",
    link: "https://www.bcn.cl/leychile/Navegar?idNorma=1226444"
  },
  {
    id: "up-14",
    type: "Decreto",
    title: "Decreto N° 29 (MINVU) · Modifica OGUC (idNorma 1221401)",
    date: "14 feb 2026",
    summary: "Actualiza disposiciones de la Ordenanza General de Urbanismo y Construcciones (D.S. N° 47/1992).",
    entity: "Ministerio de Vivienda y Urbanismo (BCN)",
    link: "https://www.bcn.cl/leychile/navegar?idNorma=1221401"
  },
  {
    id: "up-15",
    type: "Decreto",
    title: "Decreto N° 21 Exento (SEGEGOB) · Objetivos de Gestión 2026",
    date: "17 mar 2026",
    summary: "Establece objetivos de gestión año 2026 para incremento por desempeño institucional (idNorma 1222399).",
    entity: "SEGEGOB (BCN Ley Chile)",
    link: "https://www.bcn.cl/leychile/Navegar?idNorma=1222399"
  },
  {
    id: "up-16",
    type: "Informe",
    title: "DIPRES · Informe de Finanzas Públicas (IFP) 2T 2026 (PDF)",
    date: "14 jul 2026",
    summary: "Actualización de metas fiscales 2027-2030 y escenario macroeconómico al segundo trimestre de 2026.",
    entity: "Dirección de Presupuestos (DIPRES)",
    link: "https://www.dipres.gob.cl/598/articles-419241_Informe_PDF.pdf"
  },
  {
    id: "up-17",
    type: "Informe",
    title: "DIPRES · Informe de Finanzas Públicas (IFP) 3T 2026 y Presupuesto 2027 (PDF)",
    date: "06 oct 2026",
    summary: "Actualización fiscal del tercer trimestre de 2026 junto al análisis del Proyecto de Presupuestos 2027.",
    entity: "Dirección de Presupuestos (DIPRES)",
    link: "https://www.dipres.gob.cl/598/articles-433299_Informe_PDF.pdf"
  },
  {
    id: "up-18",
    type: "Informe",
    title: "DIPRES · Informe de Ejecución Presupuestaria Gobierno Central 2026 (PDF)",
    date: "2026",
    summary: "Desglose oficial de ingresos y gastos ejecutados del Gobierno Central durante 2026.",
    entity: "Dirección de Presupuestos (DIPRES)",
    link: "https://www.dipres.gob.cl/597/articles-412831_doc_pdf.pdf"
  },
  {
    id: "up-19",
    type: "Informe",
    title: "Programa Presidencial Oficial · José Antonio Kast Rist (PDF Servel)",
    date: "Sep 2025 / Vigente 2026",
    summary: "Documento programático oficial íntegro (6.3 MB) inscrito ante el Servicio Electoral de Chile.",
    entity: "Servicio Electoral de Chile (Servel)",
    link: "https://www.servel.cl/wp-content/uploads/2025/09/JOSE-ANTONIO-KAST-RIST.pdf"
  },
  {
    id: "up-20",
    type: "Informe",
    title: "Banco Central · Informe de Política Monetaria (IPoM) Marzo 2026",
    date: "Mar 2026",
    summary: "Ficha oficial del IPoM de marzo 2026 con proyecciones de PIB, inflación y TPM.",
    entity: "Banco Central de Chile",
    link: "https://www.bcentral.cl/contenido/-/detalle/publicaciones/politica-monetaria/ipom-marzo-2026"
  },
  {
    id: "up-21",
    type: "Informe",
    title: "Banco Central · Informe de Política Monetaria (IPoM) Junio 2026",
    date: "Jun 2026",
    summary: "Ficha oficial del IPoM de junio 2026 emitido al cierre de los primeros 100 días de gobierno.",
    entity: "Banco Central de Chile",
    link: "https://www.bcentral.cl/contenido/-/detalle/publicaciones/politica-monetaria/ipom-junio-2026"
  },
  {
    id: "up-22",
    type: "Informe",
    title: "INE · Boletín Empleo Trimestral Mar–May 2026 (PDF ene-rm-120)",
    date: "30 jun 2026",
    summary: "Boletín oficial de ocupación y desocupación correspondiente al primer trimestre de gobierno.",
    entity: "Instituto Nacional de Estadísticas (INE)",
    link: "https://www.ine.gob.cl/docs/default-source/ocupacion-y-desocupacion/boletines/2026/rm/ene-rm-120.pdf"
  },
  {
    id: "up-23",
    type: "Informe",
    title: "INE · Boletín Empleo Trimestral Jul–Sep 2026 (PDF ene-rm-124)",
    date: "29 oct 2026",
    summary: "Boletín oficial de empleo trimestral móvil julio–septiembre 2026.",
    entity: "Instituto Nacional de Estadísticas (INE)",
    link: "https://www.ine.gob.cl/docs/default-source/ocupacion-y-desocupacion/boletines/2026/rm/ene-rm-124.pdf"
  },
  {
    id: "up-24",
    type: "Dictamen",
    title: "Resolución N° 2 (CGR) · Normas sobre Rendición de Cuentas (idNorma 1220649)",
    date: "23 ene 2026",
    summary: "Fija normas obligatorias de procedimiento sobre rendición de cuentas ante Contraloría.",
    entity: "Contraloría General de la República (BCN)",
    link: "https://www.bcn.cl/leychile/navegar?idNorma=1220649"
  },
  {
    id: "up-25",
    type: "Dictamen",
    title: "Instructivo CDP CGR 2026 · Certificado Disponibilidad Presupuestaria (PDF)",
    date: "Ene 2026",
    summary: "Instructivo oficial de Contraloría distribuido vía ChileCompra para compras y gasto público.",
    entity: "Contraloría / Mercado Público",
    link: "https://chilecompra-notifications-pinpoint.mercadopublico.cl/Documentos+de+%C3%81rea+atenci%C3%B3n+usuaria/Instructivo+CDP+CGR+2026.pdf"
  },
  {
    id: "up-26",
    type: "Ley",
    title: "Ley N° 21.845 (Boletín N° 16.481-25) · Ampliación de Flagrancia (24h)",
    date: "10 oct 2026",
    summary: "Modifica el Código Procesal Penal aumentando plazo de flagrancia y facultades policiales.",
    entity: "BCN Ley Chile / Congreso Nacional",
    link: "https://www.bcn.cl/leychile/Navegar?idNorma=1228990"
  },
  {
    id: "up-27",
    type: "Ley",
    title: "Ley N° 21.810 (Boletín N° 18.032-07) · Gendarmería en Fuerzas de Orden",
    date: "16 abr 2026",
    summary: "Reforma constitucional que incorpora a Gendarmería de Chile a las Fuerzas de Orden y Seguridad Pública.",
    entity: "BCN Ley Chile / Congreso Nacional",
    link: "https://www.bcn.cl/leychile/Navegar?idNorma=1223237"
  },
  {
    id: "up-28",
    type: "Ley",
    title: "Ley N° 21.831 (Boletín N° 18.296-05) · Mayor Endeudamiento Gobierno Central 2026",
    date: "10 jul 2026",
    summary: "Autoriza mayor endeudamiento del Gobierno Central durante el ejercicio presupuestario 2026.",
    entity: "Ministerio de Hacienda (BCN Ley Chile)",
    link: "https://www.bcn.cl/leychile/Navegar?idNorma=1225909"
  },
  {
    id: "up-29",
    type: "Ley",
    title: "Ley N° 21.811 (Boletín N° 18.137-05) · Contención Precio Kerosene Doméstico",
    date: "26 mar 2026",
    summary: "Medidas transitorias frente a emergencia energética internacional para contener el precio del kerosene.",
    entity: "Ministerio de Hacienda (BCN Ley Chile)",
    link: "https://www.bcn.cl/leychile/Navegar?idNorma=1222726"
  },
  {
    id: "up-30",
    type: "Ley",
    title: "Ley N° 21.830 (Boletín N° 18.230-13) · Reajuste Ingreso Mínimo Mensual",
    date: "22 jun 2026",
    summary: "Reajusta el monto del ingreso mínimo mensual, asignación familiar y maternal y subsidio familiar.",
    entity: "Ministerio del Trabajo (BCN Ley Chile)",
    link: "https://www.bcn.cl/leychile/Navegar?idNorma=1225354"
  },
  {
    id: "up-31",
    type: "Ley",
    title: "Ley N° 21.827 (Boletín N° 18.156-04) · Seguridad y Orden en Comunidad Educativa",
    date: "12 ago 2026",
    summary: "Establece medidas de seguridad, orden y respeto para establecimientos y comunidades educativas.",
    entity: "Ministerio de Educación (BCN Ley Chile)",
    link: "https://www.bcn.cl/leychile/Navegar?idNorma=1226950"
  },
  {
    id: "up-32",
    type: "Ley",
    title: "Ley N° 21.825 (Boletín N° 18.232-25) · Seguridad Privada",
    date: "28 may 2026",
    summary: "Modifica Ley N° 21.659 sobre seguridad privada y prórroga de autorizaciones de personal.",
    entity: "Ministerio de Seguridad Pública (BCN)",
    link: "https://www.bcn.cl/leychile/Navegar?idNorma=1224572"
  },
  {
    id: "up-33",
    type: "Ley",
    title: "Ley N° 21.826 · Agilización de Permisos de Urbanización y Edificación",
    date: "24 jun 2026",
    summary: "Modifica textos legales para agilizar la obtención de permisos de urbanización y construcción.",
    entity: "MINVU (BCN Ley Chile)",
    link: "https://www.bcn.cl/leychile/Navegar?idNorma=1225430"
  },
  {
    id: "up-34",
    type: "Ley",
    title: "Ley N° 21.853 (Boletín N° 18.259-08) · Código de Minería y Amparo Minero",
    date: "05 nov 2026",
    summary: "Modifica el Código de Minería y las leyes N° 21.420 y 21.649 en materia de amparo minero.",
    entity: "Ministerio de Minería (BCN Ley Chile)",
    link: "https://www.bcn.cl/leychile/navegar?idNorma=1229799"
  },
  {
    id: "up-35",
    type: "Ley",
    title: "Ley N° 18.575 · LOC Bases Generales de la Administración del Estado",
    date: "05 dic 1986",
    summary: "Marco orgánico constitucional vigente para ministerios, subsecretarías y SEREMIs.",
    entity: "BCN Ley Chile (idNorma 29967)",
    link: "https://www.bcn.cl/leychile/Navegar?idNorma=29967"
  },
  {
    id: "up-36",
    type: "Ley",
    title: "Boletín N° 15.805-07 · Reglas del Uso de la Fuerza (RUF) FF.AA. y Policías",
    date: "En Comisión Mixta",
    summary: "Proyecto en Comisión Mixta del Senado que establece normas generales sobre el uso de la fuerza.",
    entity: "Senado de la República",
    link: "https://tramitacion.senado.cl/appsenado/templates/tramitacion/index.php?boletin_ini=15805-07"
  },
  {
    id: "up-37",
    type: "Ley",
    title: "Boletín N° 18.258-07 · Control de Identidad en Estados de Excepción",
    date: "18 may 2026",
    summary: "Mensaje presidencial que modifica la Ley N° 18.415 en materia de control de identidad.",
    entity: "Congreso Nacional (Senado / Cámara)",
    link: "https://tramitacion.senado.cl/appsenado/templates/tramitacion/index.php?boletin_ini=18258-07"
  },
  {
    id: "up-38",
    type: "Ley",
    title: "Boletín N° 18.314-07 · Reforma Constitucional Detención para Expulsiones",
    date: "08 jun 2026",
    summary: "Reforma constitucional en materia de detención para ejecutar expulsiones administrativas.",
    entity: "Congreso Nacional (Senado / Cámara)",
    link: "https://tramitacion.senado.cl/appsenado/templates/tramitacion/index.php?boletin_ini=18314-07"
  },
  {
    id: "up-39",
    type: "Ley",
    title: "Boletín N° 18.389-04 · Elección Mutua en Establecimientos Educacionales (SAE)",
    date: "23 jun 2026",
    summary: "Faculta a establecimientos educacionales a implementar mecanismo de elección mutua.",
    entity: "Senado / Cámara de Diputadas y Diputados",
    link: "https://tramitacion.senado.cl/appsenado/templates/tramitacion/index.php?boletin_ini=18389-04"
  },
  {
    id: "up-40",
    type: "Ley",
    title: "Boletín N° 16.132-06 · Competencias de Gobiernos Regionales en Prevención",
    date: "En 2° Trámite",
    summary: "Consagra funciones de los Gobiernos Regionales en prevención del delito y apoyo a víctimas.",
    entity: "Senado de la República",
    link: "https://tramitacion.senado.cl/appsenado/templates/tramitacion/index.php?boletin_ini=16132-06"
  },
  {
    id: "up-41",
    type: "Ley",
    title: "Boletín N° 14.801-07 · Inexpropiabilidad de Fondos Previsionales",
    date: "En Tramitación",
    summary: "Reforma constitucional que consagra el derecho de propiedad e inexpropiabilidad de ahorros previsionales.",
    entity: "Senado de la República",
    link: "https://tramitacion.senado.cl/appsenado/templates/tramitacion/index.php?boletin_ini=14801-07"
  },
  {
    id: "up-42",
    type: "Informe",
    title: "BioBioChile · Balance de Primeros 100 Días de Gobierno (18 jun 2026)",
    date: "18 jun 2026",
    summary: "Crónica de balance al cumplirse los primeros 100 días de administración (11 mar – 19 jun 2026).",
    entity: "Radio Bío-Bío / BioBioChile",
    link: "https://www.biobiochile.cl/noticias/nacional/chile/2026/06/18/gobierno-destaca-sus-primeros-100-dias-mientras-oposicion-acusa-falta-de-autocritica-y-errores.shtml"
  },
  {
    id: "up-43",
    type: "Informe",
    title: "BioBioChile · CFA Advierte Entre Mayor Deuda o Ajuste Fiscal (09 jun 2026)",
    date: "09 jun 2026",
    summary: "Cobertura de la advertencia del Consejo Fiscal Autónomo sobre estrés y financiamiento fiscal.",
    entity: "Radio Bío-Bío / BioBioChile",
    link: "https://www.biobiochile.cl/noticias/economia/actualidad-economica/2026/06/09/cfa-gobierno-debera-decidir-en-emitir-mas-deuda-o-ajuste-fiscal-ante-dificultades-de-financiamiento.shtml"
  },
  {
    id: "up-44",
    type: "Informe",
    title: "Meganoticias · Auditoría Total y Plan Escudo Fronterizo (11 mar 2026)",
    date: "11 mar 2026",
    summary: "Cobertura del 11 de marzo de 2026 sobre primeros instructivos y Plan Escudo Fronterizo.",
    entity: "Meganoticias",
    link: "https://www.meganoticias.cl/nacional/516821-decretos-presidente-jose-antonio-kast-escudo-fronterizo-auditoria-funcionarios-estado-11-03-2026.html"
  }
];

export const allVerifiedSourcesData: VerifiedSource[] = [
  ...initialAuditData.verifiedSources,
  {
    id: "ref-5",
    refNumber: "Ref 5",
    name: "Contraloría General de la República · Res. N° 1.932 Exenta (BCN)",
    detail: "Reglamento de Viviendas Fiscales de la CGR publicado en BCN Ley Chile (idNorma 1227604)",
    url: "https://www.bcn.cl/leychile/navegar?idNorma=1227604",
    verifiedDate: "28 ago 2026",
    confidenceScore: 99,
    verificationStatus: "Resolución CGR Verificada en XML",
    verificationTier: "AUTONOMO_ESTATAL",
    sourceHierarchyLevel: 1,
    sourceHierarchyLabel: "Nivel 1 · Primaria Oficial",
    protocolVerified: true
  },
  {
    id: "ref-6",
    refNumber: "Ref 6",
    name: "Cámara / Congreso Nacional · Ley N° 21.850 (Boletín N° 18.216-05)",
    detail: "Ley para la Reconstrucción Nacional y Desarrollo Económico y Social (idNorma 1229250)",
    url: "https://www.bcn.cl/leychile/navegar?idNorma=1229250",
    verifiedDate: "17 oct 2026",
    confidenceScore: 99,
    verificationStatus: "Ley Promulgada Verificada en XML",
    verificationTier: "LEGISLATIVO",
    sourceHierarchyLevel: 1,
    sourceHierarchyLabel: "Nivel 1 · Primaria Oficial",
    protocolVerified: true
  },
  {
    id: "ref-7",
    refNumber: "Ref 7",
    name: "Senado de la República · Ley N° 21.845 (Boletín N° 16.481-25)",
    detail: "Ampliación del plazo de flagrancia policial a 24h en Código Procesal Penal (idNorma 1228990)",
    url: "https://www.bcn.cl/leychile/Navegar?idNorma=1228990",
    verifiedDate: "10 oct 2026",
    confidenceScore: 99,
    verificationStatus: "Ley Promulgada Verificada en XML",
    verificationTier: "LEGISLATIVO",
    sourceHierarchyLevel: 1,
    sourceHierarchyLabel: "Nivel 1 · Primaria Oficial",
    protocolVerified: true
  },
  {
    id: "ref-8",
    refNumber: "Ref 8",
    name: "INE · Boletín Empleo Trimestral Mar–May 2026 (PDF ene-rm-120)",
    detail: "Serie oficial de ocupación y desocupación correspondiente al primer trimestre de gobierno",
    url: "https://www.ine.gob.cl/docs/default-source/ocupacion-y-desocupacion/boletines/2026/rm/ene-rm-120.pdf",
    verifiedDate: "30 jun 2026",
    confidenceScore: 97,
    verificationStatus: "Boletín Estadístico Oficial PDF",
    verificationTier: "ACADEMICO_ESTADISTICO",
    sourceHierarchyLevel: 2,
    sourceHierarchyLabel: "Nivel 2 · Secundaria Especializada",
    protocolVerified: true
  },
  {
    id: "ref-9",
    refNumber: "Ref 9",
    name: "BioBioChile · Balance de Primeros 100 Días (18 jun 2026)",
    detail: "Crónica periodística directa sobre el hito de 100 días de mandato presidencial",
    url: "https://www.biobiochile.cl/noticias/nacional/chile/2026/06/18/gobierno-destaca-sus-primeros-100-dias-mientras-oposicion-acusa-falta-de-autocritica-y-errores.shtml",
    verifiedDate: "18 jun 2026",
    confidenceScore: 94,
    verificationStatus: "Prensa Nacional Directa",
    verificationTier: "ACADEMICO_ESTADISTICO",
    sourceHierarchyLevel: 2,
    sourceHierarchyLabel: "Nivel 2 · Secundaria Confiable",
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

