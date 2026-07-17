import type { IconKey } from '../components/AiIcon'
import type { TrackId } from './tracks'

export type CatNav = {
  category: string
  title: string
  keywords: string
  icon: IconKey
}

export const CAT_NAV: CatNav[] = [
  { category: '商业落地', title: '变现结果', keywords: '播放 · 到账 · 成交', icon: 'biz' },
  { category: '提示词工程', title: '提示词', keywords: '钩子 · 结构 · 模板', icon: 'prompt' },
  { category: 'AI编程工具', title: '编程工具', keywords: 'Cursor · Agent', icon: 'cursor' },
  { category: 'Agent与自动化', title: '自动化', keywords: '工作流 · 到账', icon: 'agent' },
  { category: 'API与配置', title: 'API', keywords: '密钥 · 域名', icon: 'openai' },
  { category: 'MCP与工具协议', title: 'MCP', keywords: '工具协议', icon: 'mcp' },
  { category: '知识库与RAG', title: '知识库', keywords: '少幻觉', icon: 'rag' },
  { category: '办公提效', title: '办公提效', keywords: '文档 · 表格', icon: 'office' },
  { category: '安全合规', title: '安全合规', keywords: '脱敏 · 审计', icon: 'security' },
  { category: '大模型认知', title: '模型认知', keywords: 'Token · 选型', icon: 'model' },
]

export type FreeTile = {
  id: string
  title: string
  desc: string
  icon: IconKey
  courseId: string
}

/** 结果先行试学块 */
export const FREE_TILES: FreeTile[] = [
  {
    id: 'f1',
    title: '怎样写出百万播放钩子',
    desc: '先给结果，再讲方法',
    icon: 'prompt',
    courseId: 'viral-hook-writing',
  },
  {
    id: 'f2',
    title: 'AI 做抖音一条龙',
    desc: '选题→脚本→发布',
    icon: 'biz',
    courseId: 'ai-douyin-pipeline',
  },
  {
    id: 'f3',
    title: '3 天上手 Cursor',
    desc: '不会代码也能改',
    icon: 'cursor',
    courseId: 'cursor',
  },
  {
    id: 'f4',
    title: '睡觉也有钱到账',
    desc: '自动化交付飞轮',
    icon: 'agent',
    courseId: 'auto-money-pipeline',
  },
  {
    id: 'f5',
    title: '提示词四段式',
    desc: '新手第一天就用',
    icon: 'prompt',
    courseId: 'prompt-basics',
  },
  {
    id: 'f6',
    title: 'MCP 让 AI 真动手',
    desc: '查文档 · 改文件',
    icon: 'mcp',
    courseId: 'mcp-intro',
  },
]

export const COMMUNITY_TOPICS = [
  { tag: '爆款', text: '前 3 秒钩子：数字冲击还是反常识更猛？' },
  { tag: '到账', text: '录播课自动发货，你们用啥工具搭？' },
  { tag: '避坑', text: 'API Key 写进仓库，账单一夜翻倍' },
  { tag: '成交', text: '有播放没加微：漏斗卡在哪一步' },
  { tag: '提效', text: 'Cursor Agent 改多文件，Rules 怎么写' },
  { tag: '矩阵', text: '一条选题拆 10 条，质量会不会塌' },
]

export type RecTab = {
  id: string
  label: string
  filter: 'hot' | 'new' | 'money' | 'tools' | 'auto' | 'newbie'
}

export const REC_TABS: RecTab[] = [
  { id: 'hot', label: '先看结果', filter: 'hot' },
  { id: 'money', label: '变现到账', filter: 'money' },
  { id: 'newbie', label: '新手必学', filter: 'newbie' },
  { id: 'tools', label: '工具上手', filter: 'tools' },
  { id: 'auto', label: '自动化', filter: 'auto' },
  { id: 'new', label: '最近更新', filter: 'new' },
]

export const HERO_SLIDES = [
  {
    courseId: 'viral-hook-writing',
    eyebrow: '结果先行',
    title: '怎样获得百万播放',
    subtitle: '先改前 3 秒钩子，再用 AI 批量出脚本',
    cta: '立刻学钩子',
  },
  {
    courseId: 'auto-money-pipeline',
    eyebrow: '自动到账',
    title: 'AI 自动干活，钱自己进账',
    subtitle: '付款发货打卡复购，少人工盯梢',
    cta: '看流水线',
  },
  {
    courseId: 'newbie-first-week',
    eyebrow: '新手 7 天',
    title: '零基础也能先拿到结果',
    subtitle: '提示词 → 工具 → 第一条内容',
    cta: '从新手村开始',
  },
  {
    courseId: 'private-domain-convert',
    eyebrow: '成交',
    title: '播放变成付款',
    subtitle: '公域引流到私域成交的一套漏斗',
    cta: '复制漏斗',
  },
]

export type HomeTrackCard = {
  level: TrackId
  hook: string
  cta: string
}

export const HOME_TRACK_CARDS: HomeTrackCard[] = [
  { level: '新手', hook: '7 天做出第一条能播的内容', cta: '进入新手村' },
  { level: '熟练', hook: '搭流水线，批量交付不靠加班', cta: '进入熟练工' },
  { level: '老手', hook: '自动化飞轮，睡后也能到账', cta: '进入老手局' },
]
