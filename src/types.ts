export interface DataUpdate {
  id: string;
  type: 'Decreto' | 'Discurso' | 'Informe' | 'Ley' | 'Dictamen';
  title: string;
  category?: string;
  date: string;
  summary: string;
  entity?: string;
  link?: string;
}

export type VerificationTier = 
  | 'OFICIAL_PRIMARIA' 
  | 'AUTONOMO_ESTATAL' 
  | 'LEGISLATIVO' 
  | 'REGISTRO_HISTORICO' 
  | 'ACADEMICO_ESTADISTICO'
  | 'GOOGLE_SEARCH_GROUNDING';

export interface GoogleGroundingSource {
  title: string;
  url: string;
  snippet?: string;
  sourceDomain?: string;
}

export interface VerifiedSource {
  id: string;
  refNumber: string;
  name: string;
  detail: string;
  url: string;
  verifiedDate?: string;
  confidenceScore?: number;
  verificationStatus?: string;
  verificationTier?: VerificationTier;
  protocolVerified?: boolean;
  isGoogleSearchSource?: boolean;
}

export interface BreakdownItem {
  label: string;
  value: number;
  color: string;
  tag: 'green' | 'amber' | 'red' | 'pale';
}

export interface GovernmentCommitment {
  id: string;
  title: string;
  area: 'Seguridad y Fronteras' | 'Economía e Impuestos' | 'Reforma del Estado' | 'Salud y Listas de Espera' | 'Educación y Social';
  status: 'CUMPLIDA' | 'EN CURSO' | 'BLOQUEADA' | 'INCUMPLIDA' | 'SIN_DATOS';
  executionPct: number;
  officialDocRef: string;
  datePromulgated?: string;
  summary: string;
  evidenceSource: string;
}

export interface ComplianceStatus {
  headline: string;
  executedPercent: number;
  period?: string;
  breakdown: BreakdownItem[];
  commitments?: GovernmentCommitment[];
  totalCommitments?: number;
  daysEvaluated?: number;
}

export interface CoherenceMetric {
  status: string;
  statusColor?: string;
  confidence?: number;
  detail?: string;
}

export interface NewsVideoReport {
  id: string;
  title: string;
  channel: string; // e.g. "T13", "24 Horas TVN", "Meganoticias", "CNN Chile", "BioBioChile"
  channelVerified: boolean;
  publishedDate: string;
  duration: string;
  youtubeVideoId: string;
  youtubeUrl: string;
  summary: string;
  relatedCategory: 'Seguridad' | 'Economía' | 'Estado' | 'Salud' | 'Educación' | 'Pensiones' | 'Vivienda' | 'Medio Ambiente' | 'Inmigración' | 'General' | string;
  keywords?: string[];
}

export interface AuditorStructuredData {
  theme: string;
  period?: string;
  promise2026: string;
  status: 'CUMPLIDA' | 'EN CURSO' | 'BLOQUEADA' | 'INCUMPLIDA' | 'SIN_DATOS' | 'COMPLETO' | string;
  evidence: string;
  factChecking: string;
  sixMonthProjection: string;
  riskLevel: 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
  historicalNarrative: string;
  verdict: 'COHERENTE' | 'CONTRADICTORIO' | 'EVOLUCIÓN PRAGMÁTICA';
  defundingAlert: string;
  hasDefundingRisk: boolean;
  complianceRate?: number;
  officialLink?: string;
  newsVideos?: NewsVideoReport[];
  googleSearchUsed?: boolean;
  googleSearchQueries?: string[];
  googleGroundingSources?: GoogleGroundingSource[];
  groundingSourceType?: 'VERIFIED_INTERNAL' | 'GOOGLE_SEARCH' | 'HYBRID';
  searchEntryPointHtml?: string;
}

export interface AIResponseData {
  title: string;
  content: string;
  coherenceMetric: CoherenceMetric;
  structuredAudit?: AuditorStructuredData;
  newsVideos?: NewsVideoReport[];
  googleSearchUsed?: boolean;
  googleSearchQueries?: string[];
  googleGroundingSources?: GoogleGroundingSource[];
  groundingSourceType?: 'VERIFIED_INTERNAL' | 'GOOGLE_SEARCH' | 'HYBRID';
  searchEntryPointHtml?: string;
}

export interface AuditState {
  query: string;
  period?: string;
  aiResponse: AIResponseData;
  complianceStatus: ComplianceStatus;
  updates: DataUpdate[];
  verifiedSources: VerifiedSource[];
  newsVideos?: NewsVideoReport[];
  totalIndexedDocs: number;
  totalVerifiedSources: number;
  googleSearchActive?: boolean;
  googleGroundingSources?: GoogleGroundingSource[];
}

