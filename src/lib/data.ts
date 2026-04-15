export interface GestorProfile {
  id: string;
  slug: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  city: string;
  state: string;
  whatsapp: string;
  instagram?: string;
  facebook?: string;
  website?: string;
  niches: string[];
  platforms: string[];
  minPrice: number;
  tagline: string;
  plan: "free" | "pro" | "agency";
  isVerified: boolean;
  isFeatured: boolean;
  avgRating: number;
  reviewCount: number;
  badge?: string;
}

export interface Review {
  id: string;
  profileId: string;
  reviewerName: string;
  reviewerCompany?: string;
  rating: number;
  comment: string;
  response?: string;
  respondedAt?: string;
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  metrics: Record<string, string>;
}

// Mock data for development
export const MOCK_GESTORES: GestorProfile[] = [
  {
    id: "1",
    slug: "joao-silva",
    displayName: "João Silva",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    bio: "Especialista em escala para lojas online. Mais de R$3,2M gerenciados em 2024 com ROAS médio de 4.8x. Trabalho com e-commerces de moda, beleza e eletrônicos.",
    city: "São Paulo",
    state: "SP",
    whatsapp: "5511999999999",
    instagram: "joaosilva.ads",
    website: "https://joaosilva.com.br",
    niches: ["ecommerce"],
    platforms: ["meta-ads", "google-ads", "tiktok-ads"],
    minPrice: 1500,
    tagline: "Especialista em escala para lojas. +R$3,2M gerenciados em 2024. ROAS médio 4.8x",
    plan: "pro",
    isVerified: true,
    isFeatured: true,
    avgRating: 4.9,
    reviewCount: 187,
    badge: "TOP 5%",
  },
  {
    id: "2",
    slug: "camila-porto",
    displayName: "Camila Porto",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    bio: "34 lançamentos 7 dígitos nos últimos 2 anos. Especialista em funis perpétuos e VSLs que convertem. CPL médio 40% abaixo do mercado. Trabalho com os maiores nomes do digital.",
    city: "Florianópolis",
    state: "SC",
    whatsapp: "5548999999999",
    instagram: "camilaporto.mkt",
    facebook: "camilaportomkt",
    website: "https://camilaporto.com.br",
    niches: ["infoprodutos"],
    platforms: ["meta-ads"],
    minPrice: 2200,
    tagline: "34 lançamentos 7 dígitos. Especialista em perpétuo e VSL. CPL -40% em média.",
    plan: "pro",
    isVerified: true,
    isFeatured: true,
    avgRating: 5.0,
    reviewCount: 203,
    badge: "VERIFICADA",
  },
  {
    id: "3",
    slug: "anderson-luiz",
    displayName: "Anderson Luiz",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    bio: "120+ negócios locais ativos em Curitiba e região. Clínicas, deliverys e serviços em geral. Foco total em ligações e conversões via WhatsApp.",
    city: "Curitiba",
    state: "PR",
    whatsapp: "5541999999999",
    instagram: "anderson.trafego",
    niches: ["local"],
    platforms: ["google-ads", "meta-ads"],
    minPrice: 900,
    tagline: "120+ negócios locais ativos. Clínicas, delivery e serviços. Foco em ligações e WhatsApp.",
    plan: "free",
    isVerified: true,
    isFeatured: false,
    avgRating: 4.8,
    reviewCount: 96,
  },
  {
    id: "4",
    slug: "marina-costa",
    displayName: "Marina Costa",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    bio: "Especialista em SaaS B2B. Reduzo o CAC em até 35% com estratégias de account-based marketing combinadas com tráfego pago qualificado.",
    city: "Belo Horizonte",
    state: "MG",
    whatsapp: "5531999999999",
    instagram: "marinacosta.digital",
    website: "https://marinacosta.digital",
    niches: ["saas"],
    platforms: ["google-ads", "linkedin-ads"],
    minPrice: 3000,
    tagline: "Especialista SaaS B2B. Redução de CAC em até 35%. Account-based marketing + tráfego pago.",
    plan: "pro",
    isVerified: true,
    isFeatured: true,
    avgRating: 4.7,
    reviewCount: 64,
    badge: "PRO",
  },
  {
    id: "5",
    slug: "lucas-martins",
    displayName: "Lucas Martins",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    bio: "Agência full-service para e-commerces de moda. Do criativo às métricas. Já gerenciei mais de R$15M em investimento para marcas como StyleBR e ModaFit.",
    city: "Rio de Janeiro",
    state: "RJ",
    whatsapp: "5521999999999",
    instagram: "lucasmartins.agency",
    facebook: "lucasmartinsagency",
    website: "https://lucasmartins.agency",
    niches: ["ecommerce"],
    platforms: ["meta-ads", "google-ads", "tiktok-ads", "pinterest-ads"],
    minPrice: 4500,
    tagline: "Agência full-service para e-commerce de moda. +R$15M gerenciados. Criativo ao ROAS.",
    plan: "agency",
    isVerified: true,
    isFeatured: true,
    avgRating: 4.9,
    reviewCount: 312,
    badge: "AGÊNCIA",
  },
  {
    id: "6",
    slug: "fernanda-alves",
    displayName: "Fernanda Alves",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    bio: "Focada em clínicas de estética e odontologia. Gero em média 80 leads qualificados por mês para consultórios. ROI médio de 6x.",
    city: "Brasília",
    state: "DF",
    whatsapp: "5561999999999",
    instagram: "fernanda.trafegosaude",
    niches: ["saude", "local"],
    platforms: ["meta-ads", "google-ads"],
    minPrice: 1200,
    tagline: "Clínicas de estética e odonto. 80 leads/mês por consultório. ROI médio 6x.",
    plan: "pro",
    isVerified: true,
    isFeatured: false,
    avgRating: 4.6,
    reviewCount: 78,
    badge: "PRO",
  },
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    profileId: "1",
    reviewerName: "Carlos Eduardo",
    reviewerCompany: "StyleBR E-commerce",
    rating: 5,
    comment: "João transformou nossa operação. De R$20k/mês para R$150k/mês em 6 meses. ROAS consistente acima de 5x. Comunicação impecável.",
    response: "Obrigado, Carlos! Foi uma jornada incrível. O mérito é do time todo!",
    respondedAt: "2025-02-15",
    createdAt: "2025-02-10",
  },
  {
    id: "r2",
    profileId: "1",
    reviewerName: "Ana Beatriz",
    reviewerCompany: "Loja Bella Donna",
    rating: 5,
    comment: "Profissional excepcional. Entende profundamente de e-commerce e sempre traz novas estratégias. Nosso faturamento triplicou.",
    createdAt: "2025-01-20",
  },
  {
    id: "r3",
    profileId: "2",
    reviewerName: "Roberto Mendes",
    reviewerCompany: "Mendes Digital",
    rating: 5,
    comment: "Camila é uma máquina de lançamento. Nosso último 7 dígitos teve CPL 50% abaixo da média. Recomendo de olhos fechados.",
    createdAt: "2025-03-01",
  },
];
