/** 四级递进路径：入门 → 工具 → 作品 → 精通
 * 文字样板统一：
 * - badge：两位序号 + 阶段名
 * - title：阶段定位一句话（≤8 字）
 * - hook：该阶段卡点场景一句话
 * - promise：4 个能力短语，顿号分隔
 * - days：建议周期
 * - step.title：动作短语；step.result：阶段成果一句话
 */

export type TrackId = '入门' | '工具' | '作品' | '精通'

export type TrackDef = {
  id: TrackId
  badge: string
  title: string
  hook: string
  promise: string
  days: string
  color: string
  steps: Array<{ title: string; result: string; courseIds: string[] }>
}

export const TRACKS: TrackDef[] = [
  {
    id: '入门',
    badge: '01 入门',
    title: '从零下载与上手',
    hook: '装不稳、登不进，先别追新模型',
    promise: '装得上 · 登得进 · 问得清 · 不泄密',
    days: '建议 1–3 天',
    color: '#0f766e',
    steps: [
      {
        title: '先搞懂 AI 能帮你干什么',
        result: '知道对话、写文、改代码、生图各走哪条路',
        courseIds: ['ai-what-is', 'ai-first-chat'],
      },
      {
        title: '按系统下载与安装',
        result: 'Windows / Mac 装好客户端，账号注册跑通',
        courseIds: ['ai-download-guide', 'ai-account-setup'],
      },
      {
        title: '第一次有效提问',
        result: '用四段式提示词，让回答能直接用',
        courseIds: ['prompt-basics', 'ai-daily-office'],
      },
      {
        title: '守住安全底线',
        result: '密钥不乱贴、隐私不乱传',
        courseIds: ['api-keys-security'],
      },
    ],
  },
  {
    id: '工具',
    badge: '02 工具',
    title: 'AI 编程工具装与用',
    hook: '国内直连优先：先 Trae / 灵码，不必翻墙',
    promise: '选得准 · 装得上 · 改得动 · 用得熟',
    days: '建议 3–7 天',
    color: '#e8891c',
    steps: [
      {
        title: '选型：默认不翻墙',
        result: '看清国内直连与海外可选，选定主工具',
        courseIds: ['tool-pick-compare'],
      },
      {
        title: '国内直连安装（优先）',
        result: 'Trae.cn + 通义灵码跑通；中转 Key 装 CC Switch',
        courseIds: ['install-trae', 'install-lingma', 'install-cc-switch'],
      },
      {
        title: '海外工具（可选）',
        result: '有稳定海外网络再装 Cursor / Claude Code 等',
        courseIds: [
          'cursor-install',
          'install-claude-code',
          'install-codex',
          'install-copilot',
          'install-windsurf',
        ],
      },
      {
        title: '装好后学用法',
        result: 'Cursor、Rules、Agent 按需深入',
        courseIds: ['cursor', 'cursor-rules', 'claude-code', 'tool-localize'],
      },
    ],
  },
  {
    id: '作品',
    badge: '03 作品',
    title: '交得出手的成品',
    hook: '该交页面了？按类型选一条线往下做',
    promise: '网页 · 小程序 · App · 出图',
    days: '建议持续练习',
    color: '#b45309',
    steps: [
      {
        title: '做出能打开的网页',
        result: '本地预览通过，必要时再部署上线',
        courseIds: ['ai-build-website', 'ai-landing-page'],
      },
      {
        title: '小程序三页骨架',
        result: '首页、列表、详情带交互说明',
        courseIds: ['ai-build-miniprogram'],
      },
      {
        title: 'App 关键屏说明稿',
        result: '信息架构与组件清单能交给开发',
        courseIds: ['ai-build-app'],
      },
      {
        title: '海报封面出图',
        result: '主体、风格写死，多图一套',
        courseIds: ['ai-image-gen', 'ai-image-brand'],
      },
    ],
  },
  {
    id: '精通',
    badge: '04 精通',
    title: '接得通、控得住',
    hook: '会改文件了？往下接 API、Agent 与成本',
    promise: '接得通 · 调得动 · 答得准 · 花得明',
    days: '建议按需深入',
    color: '#7c3aed',
    steps: [
      {
        title: '打通 API 与域名',
        result: 'Base URL、Key、模型名三件套填通',
        courseIds: ['api-openai', 'api-compatible', 'domain-api-cheatsheet'],
      },
      {
        title: '接通 MCP 与 Agent',
        result: 'Cursor 里 MCP 绿灯，Agent 跑通工具调用',
        courseIds: ['mcp-intro', 'mcp-install', 'agent-tools', 'prompt-system'],
      },
      {
        title: '用 RAG 让回答更准',
        result: '自有文档接进来，少胡编、能溯源',
        courseIds: ['rag-basics'],
      },
      {
        title: '控成本与质量',
        result: 'Token 告警、模型路由、幻觉复核齐备',
        courseIds: ['cost-control', 'hallucination-defense'],
      },
    ],
  },
]

export function getTrack(id: TrackId) {
  return TRACKS.find((t) => t.id === id)
}
