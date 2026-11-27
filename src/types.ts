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

export type SourceHierarchyLevel = 1 | 2 | 3;

export type EvidenceClassification =
  | 'CONFIRMADA'
  | 'PARCIALMENTE CONFIRMADA'
  | 'NO VERIFICADA'
  | 'CONTRADICHA'
  | 'DESACTUALIZADA';

export type BudgetSpendingNature =
  | 'Ahorro presupuestario efectivo'
  | 'Reducción de presupuesto aprobado'
  | 'Recursos no ejecutados'
  | 'Contención del gasto'
  | 'Redistribución presupuestaria'
  | 'Sobrecostos operacionales'
  | 'Sin variación presupuestaria directa'
  | 'No verificado';

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
  sourceHierarchyLevel?: SourceHierarchyLevel;
  sourceHierarchyLabel?: string;
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
  docUrl?: string;
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
  sourceHierarchyLevel?: SourceHierarchyLevel;
}

export interface BudgetVerification {
  institution: string;
  budgetDocument: string;
  itemOrSubtitle: string;
  period: string;
  currency: string;
  approvedVsExecutedNote: string;
  spendingNature: BudgetSpendingNature | string;
}

export interface LegalVerification {
  normRank: string;
  articlesCited: string;
  legalNature: string;
  scopeAndControversy?: string;
}

export interface EpistemicSeparation {
  confirmedFacts: string[];
  authorityStatements: string[];
  journalisticInterpretations: string[];
  researcherAnalysis: string;
}

export interface StructuredProjection {
  antecedents: string;
  assumptions: string;
  modifyingVariables: string;
  uncertaintyLevel: 'Bajo' | 'Medio' | 'Alto';
}

export interface TransparencyReport {
  unverifiedGaps: string;
  requiredDocumentsForGap: string;
  queryDate: string;
  documentVerificationNotes?: string;
}

export interface AuditorStructuredData {
  theme: string;
  period?: string;
  promise2026: string;
  status: 'CUMPLIDA' | 'EN CURSO' | 'BLOQUEADA' | 'INCUMPLIDA' | 'SIN_DATOS' | 'COMPLETO' | string;
  evidenceClassification?: EvidenceClassification;
  evidence: string;
  factChecking: string;
  sixMonthProjection: string;
  riskLevel: 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
  historicalNarrative: string;
  verdict: 'COHERENTE' | 'CONTRADICTORIO' | 'EVOLUCIÓN PRAGMÁTICA' | 'NO VERIFICABLE SIN ARCHIVO';
  defundingAlert: string;
  hasDefundingRisk: boolean;
  complianceRate?: number;
  officialLink?: string;
  budgetVerification?: BudgetVerification;
  legalVerification?: LegalVerification;
  epistemicSeparation?: EpistemicSeparation;
  structuredProjection?: StructuredProjection;
  transparencyReport?: TransparencyReport;
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

export type ExcerptKind =
  | 'Cita textual'
  | 'Paráfrasis'
  | 'Resumen documental'
  | 'Interpretación propia';

export type ResponseVerificationOrigin =
  | 'MODEL_LIVE_GROUNDED'
  | 'LIVE_OFFICIAL_VERIFICATION'
  | 'DOCUMENT_RETRIEVAL_FALLBACK'
  | 'VERIFICATION_FAILED';

export interface ScrapedDocument {
  id: string;
  sourceId: string;
  sourceName: string;
  sourceDomain: string;
  channelOrigin: string;
  sourceHierarchyLevel?: SourceHierarchyLevel;
  sourceHierarchyLabel?: string;
  category: 'Seguridad' | 'Economía' | 'Estado' | 'Salud' | 'Educación' | 'Legislativo' | 'Doctrina' | string;
  title: string;
  summary: string;
  publishedDate: string;
  url: string;
  officialRef?: string;
  keywords: string[];
  relevanceScore?: number;
  extractedSnippet: string;
  excerptType?: ExcerptKind;
  excerptLocation?: string;
  isLiveVerified?: boolean;
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
  isSearchResult?: boolean;
  canAudit?: boolean;
  searchExplanation?: string;
  searchResults?: ScrapedDocument[];
}

export interface ChatCitation {
  id: string;
  refNumber: string;
  name: string;
  detail: string;
  url: string;
  officialRef?: string;
  publishedDate?: string;
  sourceHierarchyLevel: SourceHierarchyLevel;
  sourceHierarchyLabel: string;
  isGoogleSearchSource?: boolean;
  isGeneralPortal?: boolean;
  isLiveVerified?: boolean;
  excerptType?: ExcerptKind;
  excerptLocation?: string;
}

export interface ChatStructuredDetails {
  theme: string;
  promise2026?: string;
  status?: string;
  verdict?: string;
  complianceRate?: number;
  historicalNarrative?: string;
  budgetVerification?: BudgetVerification;
  legalVerification?: LegalVerification;
  epistemicSeparation?: EpistemicSeparation;
  structuredProjection?: StructuredProjection;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isGuidance?: boolean;
  evidenceClassification?: EvidenceClassification;
  verificationOrigin?: ResponseVerificationOrigin;
  citations?: ChatCitation[];
  unverifiedGaps?: string;
  requiredDocumentsForGap?: string;
  googleSearchQueries?: string[];
  suggestedFollowUps?: string[];
  newsVideos?: NewsVideoReport[];
  structuredDetails?: ChatStructuredDetails;
  apiStatusNotice?: string;
  errorMessage?: string;
}

export interface ChatAuditContext {
  query?: string;
  theme?: string;
  evidenceClassification?: EvidenceClassification;
  structuredAudit?: AuditorStructuredData;
  verifiedSources?: VerifiedSource[];
}

