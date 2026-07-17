/** 三级循序渐进轨道：新手 → 熟练 → 老手 */

export type TrackId = '新手' | '熟练' | '老手'

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
    id: '新手',
    badge: 'LEVEL 01',
    title: '新手村',
    hook: '零基础也能上车：7 天做出第一条能播的 AI 内容',
    promise: '会用提示词 · 会用编程助手 · 会发一条结果向短视频',
    days: '建议 7–14 天',
    color: '#0f766e',
    steps: [
      {
        title: '先会说话：提示词四段式',
        result: '同样一句话，输出立刻能用',
        courseIds: ['prompt-basics', 'newbie-first-week'],
      },
      {
        title: '先会改东西：Cursor 上手',
        result: '不会写代码也能改小功能',
        courseIds: ['cursor', 'prompt-system'],
      },
      {
        title: '先拿结果：钩子与选题',
        result: '标题先给结果，完播才有机会',
        courseIds: ['viral-hook-writing', 'ai-douyin-pipeline'],
      },
      {
        title: '先别踩坑：密钥与隐私',
        result: '不丢 Key、不泄密、不乱烧钱',
        courseIds: ['api-keys-security', 'domain-api-cheatsheet'],
      },
    ],
  },
  {
    id: '熟练',
    badge: 'LEVEL 02',
    title: '熟练工',
    hook: '把「会用」升级成「能交付」：内容流水线 + 工具自动化',
    promise: '能搭工作流 · 能接 API/MCP · 能批量出内容',
    days: '建议 3–6 周',
    color: '#e8891c',
    steps: [
      {
        title: 'API 与兼容网关跑通',
        result: 'Key + 域名 + 模型三件套不翻车',
        courseIds: ['api-openai', 'api-compatible', 'cost-control'],
      },
      {
        title: 'MCP / Agent 真正动手',
        result: '工具调用替你查资料、改文件',
        courseIds: ['mcp-intro', 'mcp-server', 'agent-tools'],
      },
      {
        title: '内容矩阵批量产',
        result: '一条选题拆成多平台脚本',
        courseIds: ['ai-content-matrix', 'ai-douyin-pipeline'],
      },
      {
        title: '知识库少幻觉',
        result: '回答能引用，客户敢信',
        courseIds: ['rag-basics', 'hallucination-defense'],
      },
    ],
  },
  {
    id: '老手',
    badge: 'LEVEL 03',
    title: '老手局',
    hook: '人少也能规模化：自动化交付，钱在睡后到账',
    promise: '知识付费飞轮 · 私域成交 · 企业级 Agent 流水线',
    days: '建议持续迭代',
    color: '#b45309',
    steps: [
      {
        title: '知识付费 IP 冷启动',
        result: '小课验证 → 大课放大',
        courseIds: ['knowledge-ip-start', 'prompt-to-product'],
      },
      {
        title: '公域引流 → 私域成交',
        result: '播放变成加微，加微变成付款',
        courseIds: ['private-domain-convert', 'live-script-funnel'],
      },
      {
        title: '自动化到账流水线',
        result: '付款后自动发货、打卡、复购',
        courseIds: ['auto-money-pipeline', 'overnight-delivery'],
      },
      {
        title: '企业级落地与护栏',
        result: '合规、成本、评测一起上',
        courseIds: ['enterprise-ai-checklist', 'sec-baseline', 'mcp-security'],
      },
    ],
  },
]

export function getTrack(id: TrackId) {
  return TRACKS.find((t) => t.id === id)
}
