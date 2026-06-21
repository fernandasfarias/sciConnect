import { Paper, AcademicEvent, PortfolioItem, MatchOffer, AnalyticsData } from "./types";

export const INITIAL_PAPERS: Paper[] = [
  {
    id: "paper-cnn-heterogeneous",
    title: "Otimização de Redes Neurais Convolucionais para Dispositivos de Baixa Potência: Uma Abordagem Heterogênea",
    author: "Dr. Ricardo Silva",
    advisor: "Prof. Dra. Maria Eduarda (Orientadora)",
    publishedDate: "Março, 2024",
    department: "DCOMP / Departamento de Computação",
    academicCenter: "CCET",
    citations: 24,
    pdfUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKmnpa5Cx_ubPb7CFQcgJFFcLk46TTOaXSKGJFPlzNWjc_V_mIrzpS7gndXOkrpZkRSaCsaDOMj239i5G9TD1gxe0xyZYKX_XYZcmZoQvvGSW_iCcSEssFlAzBE7KV09k4o0O5MYml6E7FUw333SY55ldyjzz8wkbLuxl6cs4Q8h0cRIt5s5bmKpchUCeqx-5tO9D8tChim7x2gTp_vxre7YwsKRLvRGU4D61M3o-Lm-HDCxrBiIbUiFNSXU69FokVdCxWpMO8xEE",
    traditionalSummary: "Este trabalho foca na otimização de Redes Neurais Convolucionais (CNNs) para execução eficiente em hardware embarcado de recursos extremamente limitados. Apresentamos um inovador particionamento heterogêneo de computação que divide o grafo neural de forma adaptativa, utilizando as características individuais de arquiteturas CPU-NPU. O consumo energético diminui em até 40% mantendo a perda de acurácia de inferência abaixo de 0.8%.",
    aiSummary: "Este estudo apresenta um novo framework de otimização para Redes Neurais Convolucionais (CNNs) focado em hardware embarcado. A pesquisa aborda o desafio de manter a precisão de inferência enquanto reduz o consumo energético em até 40%.\n\nO autor propõe uma técnica de quantização pós-treinamento adaptativa que seleciona diferentes precisões de bits para cada camada, baseada na sensibilidade do erro local, resultando em uma arquitetura heterogênea otimizada.",
    keyConcepts: [
      { id: "c1", concept: "Quantização de Bits", description: "Redução da representação de números de ponto flutuante para inteiros de 8 ou 4 bits para diminuir agressivamente o tamanho do modelo." },
      { id: "c2", concept: "Incerteza Bayesiana", description: "Método estatístico para medir o nível de confiança do modelo em cada predição interna, otimizando o descarte de dados ruidosos." },
      { id: "c3", concept: "Hardware Heterogêneo", description: "Sistemas computacionais que combinam diferentes tipos de processadores (CPUs, GPUs, e NPUs dedicadas) para máximo rendimento por Watt." },
      { id: "c4", concept: "Inferência Local", description: "Processamento e tomada de decisão da Inteligência Artificial diretamente na borda (edge devices), sem dependência de processamento em nuvem." },
      { id: "c5", concept: "Eficiência Energética", description: "Otimização refinada matemática que equilibra o máximo de operações por segundo com o menor consumo de bateria possível." }
    ],
    tags: ["Machine Learning", "Energy", "DCOMP Priority", "Deep Learning"]
  },
  {
    id: "paper-petroleum-neural",
    title: "Otimização de Fluxo em Poços Petrolíferos Utilizando Redes Neurais Profundas e IoT",
    author: "Dra. Helena Souza, et al.",
    advisor: "Prof. Dr. Marcos Lima (Co-autor)",
    publishedDate: "Setembro 2023",
    department: "DCOMP / Departamento de Computação",
    academicCenter: "CCET",
    citations: 45,
    pdfUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBb1lTNsArpO2MYECYLHPzNs7Jcs4UaSj45GCisddi9haQ2GQYIBrrxL0LlyZLC5tnz3z5Qq5bskE5fTGsHQWvRMX--KQyviKl-s3DZMzHYv6ycU4Ld6aB3vhsw8qmODKySTnk2qRP2KmZDq6y529-mA5YnnROy5GCuvkj2dpvaahdpnO-KVr3eJXUVPB50oNBhA17IRPc1E9FhAo2z9D7oxTJkCQbmtSHBLsmEcNNvTrAD8CQjWc5nYnyldgjWbP5HZK8HrckfufI",
    traditionalSummary: "Desenvolvimento de sensoriamento IoT avançado integrado com algoritmos de Deep Learning para predição e ajuste automático de válvulas e fluxo na bacia sedimentar de Sergipe-Alagoas.",
    aiSummary: "Uso de sensores industriais em conjunto com deep learning para predição preditiva de comportamento físico dos poços de petróleo na costa sergipana, otimizando em 15% o rendimento extrativo.",
    keyConcepts: [
      { id: "p1", concept: "Deep Learning industrial", description: "Modelagem de dados de sensores temporais complexos." },
      { id: "p2", concept: "Sensoriamento Remoto", description: "Sensores IoT instalados em plataformas marinhas." }
    ],
    tags: ["Machine Learning", "Energy", "DCOMP Priority", "Deep Learning"]
  },
  {
    id: "paper-offshore-cv",
    title: "Análise Preditiva de Falhas em Plataformas Offshore via Computer Vision",
    author: "Prof. Dr. Ricardo Almeida",
    advisor: "Prof. Dra. Maria Eduarda",
    publishedDate: "Junho 2023",
    department: "DEE / Departamento de Engenharia Elétrica",
    academicCenter: "CCET",
    citations: 12,
    pdfUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBS__plHSx84yM7_zMHBDBkd90oTUKbq_QPduD4N1ErtnFAUaZb9upeAeTsOkJiUb3oadqoWDNNkDQIFdNpd_shjJnKoPjuAsoZtjpNja64xxNXSvM7t3DlsqyAwZP5eY6rPsrGJuK9dbz64YLFAXd9ZkwyY_HjMb27zp7XLL3pHx4nlS51rkC_2SenSf8aewctZJISQJnUmjQBVLhnWH7-IPRm_GaVnDsisdKuVK7SlDGYzXZVAAjGZT-70k34XU56aY0m2Zx686Q",
    traditionalSummary: "Solução autônoma de segurança por imagens de câmeras CCTV usando Redes Convolucionais para identificar indícios de corrosão, vazamentos, ou anomalias estruturais críticas.",
    aiSummary: "Visão computacional embarcada em câmeras de monitoramento offshore da Petrobras, gerando alertas instantâneos de falha térmica estrutural.",
    keyConcepts: [
      { id: "v1", concept: "Segmentação de Corrosão", description: "Identificação automática de oxidação ferrosa por amostragem de pixels." }
    ],
    tags: ["Computer Vision", "Maintenance", "DCOMP Priority"]
  },
  {
    id: "paper-refine-environment",
    title: "Impacto Ambiental do Refino: Monitoramento Inteligente em Sergipe",
    author: "Msc. Carla Mendonça",
    advisor: "Dr. Ricardo Almeida",
    publishedDate: "Janeiro 2024",
    department: "DGE / Departamento de Geografia",
    academicCenter: "CCBS",
    citations: 8,
    pdfUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuARlMPMXnrj9_YTj7KasFlAdFt9uA7sykFjtHFFIOZyC3egaHw8UGi6t1kqfGgyzTCkqdVWlpG7YO3pt5I8jYkef-q-sDvmNyvxLlZUTB0vicf2DpZ6ijD4_XINrHqrBKgBNbIisb18lCGudv8pf0ko6Som9QBS-QB3aszvC7FPAAtNS6ZQNyAkfcQfebfJB67C25usf6g-sqhsHBHXN4Fig3-dCpp9T_iuvXxeAWHZ2Z4OmN98vE5RmfKQUjxaZx7YcXlLPf7oSLA",
    traditionalSummary: "Mapeamento temporal das áreas adjacentes à refinaria, utilizando imagens multiespectrais de satélite para mensurar o impacto direto na flora, fauna local e qualidade hídrica.",
    aiSummary: "Mapeamento inteligente automatizado por redes profundas avaliando o grau de restauração ambiental em ecossistemas de manguezal.",
    keyConcepts: [
      { id: "e1", concept: "Imagem Sentinel-2", description: "Utilização do espectro de infravermelho próximo." }
    ],
    tags: ["Environment", "Sustainability"]
  }
];

export const INITIAL_EVENTS: AcademicEvent[] = [
  {
    id: "event-innovation-week",
    title: "Dcomp Innovation Week 2024",
    description: "A maior feira de tecnologia, empreendedorismo e inovação acadêmica conectando pesquisas do departamento de computação com o mercado produtivo.",
    date: "12-15 Nov, 2024",
    timeSlot: "08:00 - 18:00",
    type: "Conference",
    tags: ["Inovação", "Academia", "Pesquisa"],
    location: "Centro de Vivência, Campus São Cristóvão",
    isEnrolled: false,
    matchScore: 95
  },
  {
    id: "event-ai-sustainability",
    title: "Simpósio de IA e Sustentabilidade",
    description: "Debatendo o futuro do planeta, transição energética e conservação da biodiversidade com o auxílio de inteligência artificial de última geração.",
    date: "05 Dez, 2024",
    timeSlot: "14:00 - 18:00",
    type: "Conference",
    tags: ["Sustentabilidade", "IA", "Física"],
    location: "Auditório do Dcomp / CCET",
    isEnrolled: false,
    matchScore: 92
  },
  {
    id: "event-scientific-writing",
    title: "Escrita Científica de Alto Impacto",
    description: "Técnicas avançadas de redação científica, superação do bloqueio criativo, e submissão rápida a periódicos Q1 recomendados pelo Qualis.",
    date: "20 Out, 2024",
    timeSlot: "09:00 - 12:00",
    type: "Workshop",
    tags: ["Academia", "Metodologia"],
    location: "Online via Google Meet",
    isEnrolled: true,
    matchScore: 98
  },
  {
    id: "event-genomics",
    title: "Novas Fronteiras da Genômica Aplicada",
    description: "Palestra magna sobre a revolução do CRISPR nas culturas tropicais e melhoria do rendimento agrário no semiárido nordestino.",
    date: "25 Out, 2024",
    timeSlot: "14:00 - 16:00",
    type: "Lecture",
    tags: ["Saúde", "Ciência", "Biotecnologia"],
    location: "Auditório B, CCBS",
    isEnrolled: false,
    matchScore: 88
  },
  {
    id: "event-renewable",
    title: "III Encontro de Energias Renováveis do Nordeste",
    description: "Fórum de fomento sobre a inovação em células fotovoltaicas orgânicas desenvolvidas nos laboratórios do CCET.",
    date: "02 Nov, 2024",
    timeSlot: "08:00 - 18:00",
    type: "Conference",
    tags: ["Sustentabilidade", "Engenharia"],
    location: "Didática VII, Campus São Cristóvão",
    isEnrolled: false,
    matchScore: 85
  }
];

export const MOCK_PORTFOLIO: PortfolioItem[] = [
  {
    id: "port-1",
    title: "Otimizando JVM para Alta Performance em Microsserviços",
    type: "article",
    subTitle: "Publicado no SBSI 2023 • Revisado por Pares"
  },
  {
    id: "port-2",
    title: "SciConnect-Hub: Motor de Colaboração Acadêmica Integrada",
    type: "code",
    subTitle: "Projeto Interno • Lead Backend Developer",
    tags: ["Java", "Spring Boot", "PostgreSQL"],
    stars: 42
  },
  {
    id: "port-3",
    title: "Mecanismos de Controle e Padrão de Tráfego de Aracaju usando Redes Convolucionais",
    type: "article",
    subTitle: "Trabalho de Iniciação Científica • DCOMP"
  }
];

export const MOCK_MATCH_FEED: MatchOffer[] = [
  {
    id: "match-1",
    type: "lab",
    title: "Laboratório Inteligente buscando Desenvolvedores Java",
    description: "O Intelligent Systems Lab (ISL) convoca alunos de Tecnologia para desenvolvimento do projeto GreenTech.",
    matchType: "98% Match",
    tags: ["Java", "Spring Boot"],
    deadlineOrRoom: "Inscrever até 20 Out"
  },
  {
    id: "match-2",
    type: "mentoring",
    title: "Mentoria Científica: Data Science Aplicada à Saúde",
    description: "O Prof. Dr. Silva está entrevistando estudantes para projeto inovador de estatística preditiva hospitalar.",
    matchType: "Suggested",
    tags: ["Data Science", "Python"],
    deadlineOrRoom: "Prédio DCOMP, Sala 12"
  }
];

export const MOCK_ANALYTICS: AnalyticsData = {
  metaPdiPercentage: 75,
  actionsRegistered: 1200,
  externalAccesses: "842.5k",
  hIndex: 142,
  activeIntellectualProperty: 58,
  pendingApproval: 12,
  monthlyTrend: [
    { month: "Jan", value2024: 350, value2023: 290 },
    { month: "Mar", value2024: 480, value2023: 410 },
    { month: "Mai", value2024: 510, value2023: 430 },
    { month: "Jul", value2024: 690, value2023: 560 },
    { month: "Set", value2024: 780, value2023: 610 },
    { month: "Nov", value2024: 850, value2023: 730 }
  ],
  risingTrends: [
    { tag: "Inteligência Artificial", size: "xl", growthRate: "+45% ano" },
    { tag: "Biodiversidade Caatinga", size: "lg", growthRate: "+32% ano" },
    { tag: "Energias Renováveis", size: "lg", growthRate: "+28% ano" },
    { tag: "Computação Quântica", size: "md" },
    { tag: "Bioética", size: "sm" },
    { tag: "FinTech", size: "sm" },
    { tag: "Nanomateriais", size: "md" },
    { tag: "Erosão Costeira", size: "sm" },
    { tag: "Modelagem de Pandemias", size: "sm" },
    { tag: "AgroTech", size: "sm" }
  ],
  publicationsByCenter: [
    { center: "CCET", label: "Ciências Exatas e Tecnológicas", count: 428, percentage: 85 },
    { center: "CCBS", label: "Ciências Biológicas e Saúde", count: 382, percentage: 75 },
    { center: "CCSA", label: "Ciências Sociais Aplicadas", count: 215, percentage: 45 },
    { center: "CECH", label: "Educação e Ciências Humanas", count: 194, percentage: 40 }
  ],
  topResearchers: [
    {
      name: "Dra. Helena Souza",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTItpvOz0SB0AAzo8JHnnCy7JQB5qtwVpZH7z4vFvZf7CebCeXy21iLGPGfwoNVjLrGQLC6eTSkSjy1_swAi6ecWRc-ceVEzb4pqavFs9q0QIEfkTIhDcD6sblbISXjvC1vt7cc0GUXDeOEZ3cgvd1h45ztCBEXGA9urgBtLeiqG67bI2HvaI7WPvG3AL4Z4rDaKPdU9HLKQlg0x0AEphaJzjrXPLtMUrcTKAxYGftp5XKzzDUtI2z7lNEMWppWzUc6TPo92qqzxc",
      achievement: "Desenvolvimento de Células Solares de Grafeno",
      type: "patented",
      metricLabel: "Fator de Impacto",
      metricValue: "8.2"
    },
    {
      name: "Prof. Marcus Lima",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5eXyBucdctva8B8_bmiJJp3x94iAcmveWNbPqlaTuQRC6Ea3lBko3mEpUP1opbQ5hdsiQgI5hhuJXxOOEgfSXUV1U6DUmStdH5JsiFCk7VCFsO_YfW_rx9R73RF7kxt8T0nPqc4juOFKEpdm6oJv74hY-mLHKCvb6fbLE9UD2BKUPaLAc-Xu4EfvioTWSi8WAznBJlxpwAj8Bv7gJT_0Wl24VWJ2y-mQ6odMjEWVKihcDQkkSONjm5aeAdXhQwJzb_BkaTe5g17k",
      achievement: "Algoritmo de IA Aplicado na Logística Pública de Aracaju",
      type: "journal",
      metricLabel: "Citações Reais",
      metricValue: "1.5k"
    }
  ]
};
