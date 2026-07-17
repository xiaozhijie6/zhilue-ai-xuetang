import type { IconKey } from '../components/AiIcon'

export type CatNav = {
  category: string
  title: string
  keywords: string
  icon: IconKey
}

export const CAT_NAV: CatNav[] = [
  {
    category: 'AI编程工具',
    title: '编程工具',
    keywords: 'Cursor · Claude · Copilot',
    icon: 'cursor',
  },
  {
    category: 'API与配置',
    title: 'API 接入',
    keywords: '密钥 · 参数 · 流式',
    icon: 'openai',
  },
  {
    category: 'MCP与工具协议',
    title: 'MCP',
    keywords: '协议 · 安装 · Server',
    icon: 'mcp',
  },
  {
    category: '提示词工程',
    title: '提示词',
    keywords: '结构 · System',
    icon: 'prompt',
  },
  {
    category: 'Agent与自动化',
    title: 'Agent',
    keywords: '多 Agent · 工作流',
    icon: 'agent',
  },
  {
    category: '大模型认知',
    title: '模型认知',
    keywords: 'Token · MoE',
    icon: 'model',
  },
  {
    category: '知识库与RAG',
    title: 'RAG',
    keywords: '切片 · 向量库',
    icon: 'rag',
  },
  {
    category: '商业落地',
    title: '商业落地',
    keywords: '场景 · ROI',
    icon: 'biz',
  },
  {
    category: '安全合规',
    title: '安全合规',
    keywords: '脱敏 · 审计',
    icon: 'security',
  },
  {
    category: '办公提效',
    title: '办公提效',
    keywords: '文档 · 表格',
    icon: 'office',
  },
]

export type FreeTile = {
  id: string
  title: string
  desc: string
  icon: IconKey
  courseId: string
}

export const FREE_TILES: FreeTile[] = [
  {
    id: 'f1',
    title: 'MCP 实战入门',
    desc: '协议认知到本地配置',
    icon: 'mcp',
    courseId: 'mcp-intro',
  },
  {
    id: 'f2',
    title: 'Cursor 快速上手',
    desc: 'Composer / Rules 入门',
    icon: 'cursor',
    courseId: 'cursor',
  },
  {
    id: 'f3',
    title: '提示词基础课',
    desc: '结构写法与少样本',
    icon: 'prompt',
    courseId: 'prompt-basics',
  },
  {
    id: 'f4',
    title: 'OpenAI API 接入',
    desc: '密钥、模型与参数',
    icon: 'openai',
    courseId: 'api-openai',
  },
  {
    id: 'f5',
    title: 'Claude Code 指南',
    desc: '终端 Agent 实操',
    icon: 'claude',
    courseId: 'claude-code',
  },
  {
    id: 'f6',
    title: 'RAG 知识库',
    desc: '检索增强从零搭',
    icon: 'rag',
    courseId: 'rag-basics',
  },
]

export const COMMUNITY_TOPICS = [
  { tag: '热议', text: 'Cursor Rules 怎么写才不翻车？' },
  { tag: '问答', text: 'MCP Server 和企业内网怎么共存' },
  { tag: '分享', text: '一份可复用的 System Prompt 模板' },
  { tag: '讨论', text: 'Claude Code vs Copilot：你们站谁' },
  { tag: '求助', text: '兼容接口 429 限流怎么拆请求' },
  { tag: '动态', text: '本周工具课更新：Gemini CLI / Kimi' },
]

export type RecTab = {
  id: string
  label: string
  filter: 'hot' | 'new' | 'tools' | 'mcp' | 'api' | 'rag'
}

export const REC_TABS: RecTab[] = [
  { id: 'hot', label: '综合热门', filter: 'hot' },
  { id: 'new', label: '最近更新', filter: 'new' },
  { id: 'tools', label: '编程工具', filter: 'tools' },
  { id: 'mcp', label: 'MCP', filter: 'mcp' },
  { id: 'api', label: 'API', filter: 'api' },
  { id: 'rag', label: '多模态 / RAG', filter: 'rag' },
]

export const HERO_SLIDES = [
  {
    courseId: 'cursor',
    eyebrow: '本周精选',
    title: 'Cursor 完全指南',
    subtitle: '从安装到 Agent 多文件改仓',
    cta: '开始学习',
  },
  {
    courseId: 'mcp-intro',
    eyebrow: '协议专题',
    title: 'MCP 从零到可配置',
    subtitle: '工具协议 · 安装 · 企业注意点',
    cta: '查看专栏',
  },
  {
    courseId: 'claude-code',
    eyebrow: '终端 Agent',
    title: 'Claude Code 实战',
    subtitle: '仓库级任务与安全边界',
    cta: '立即查看',
  },
  {
    courseId: 'api-openai',
    eyebrow: '工程接入',
    title: 'OpenAI API 工程手册',
    subtitle: '密钥、参数、流式与工具调用',
    cta: '进入课程',
  },
] as const
