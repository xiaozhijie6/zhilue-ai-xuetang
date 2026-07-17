/** 抖音式结果先行 Feed：先给结果，再进课 */

export type HookFeedItem = {
  id: string
  hook: string
  result: string
  proof: string
  level: '新手' | '熟练' | '老手'
  courseId: string
  tag: string
}

export const HOOK_FEED: HookFeedItem[] = [
  {
    id: 'h1',
    hook: '怎样做出百万播放？先改标题前 3 秒',
    result: '钩子公式 + AI 选题库，完播率先拉起来',
    proof: '数字冲击 · 反常识 · 痛点直击',
    level: '新手',
    courseId: 'viral-hook-writing',
    tag: '爆款',
  },
  {
    id: 'h2',
    hook: '怎样让 AI 自动干活，睡觉也有钱到账',
    result: '付款 → 自动发货 → 打卡 → 复购，少人工值守',
    proof: '录播课飞轮 · 自动化交付',
    level: '老手',
    courseId: 'auto-money-pipeline',
    tag: '到账',
  },
  {
    id: 'h3',
    hook: '不会写代码，3 天也能用 AI 改项目',
    result: 'Cursor Agent 小步改文件，报错贴回去就修',
    proof: '编程工具入门闭环',
    level: '新手',
    courseId: 'cursor',
    tag: '提效',
  },
  {
    id: 'h4',
    hook: '一条选题拆成 10 条，矩阵号不停更',
    result: 'AI 内容流水线：脚本、封面文案、评论钩子一次出',
    proof: '批量生产不靠加班',
    level: '熟练',
    courseId: 'ai-content-matrix',
    tag: '矩阵',
  },
  {
    id: 'h5',
    hook: '播放再多不加微？公域到私域漏斗抄这份',
    result: '评论区钩子 → 主页引导 → 成交话术一条龙',
    proof: '引流成交一体',
    level: '老手',
    courseId: 'private-domain-convert',
    tag: '成交',
  },
  {
    id: 'h6',
    hook: '7 天冷启动知识付费：先卖一笔小课',
    result: '99–299 验证需求，再做高客单',
    proof: 'IP 冷启动路径',
    level: '老手',
    courseId: 'knowledge-ip-start',
    tag: '变现',
  },
  {
    id: 'h7',
    hook: '提示词写成可卖的小产品，而不是聊天记录',
    result: '模板打包、定价、交付页一套带走',
    proof: '从技能到商品',
    level: '熟练',
    courseId: 'prompt-to-product',
    tag: '产品',
  },
  {
    id: 'h8',
    hook: '人不用盯直播间：话术漏斗也能抬转化',
    result: '五阶话术：留人 → 信任 → 锚点 → 逼单 → 追单',
    proof: '直播转化结构',
    level: '老手',
    courseId: 'live-script-funnel',
    tag: '直播',
  },
  {
    id: 'h9',
    hook: 'MCP 配好，Agent 替你查文档改文件',
    result: '从聊天变成真正「动手」的助手',
    proof: '工具协议实战',
    level: '熟练',
    courseId: 'mcp-intro',
    tag: 'Agent',
  },
  {
    id: 'h10',
    hook: '别再让 AI 瞎编：知识库回答带出处',
    result: 'RAG + 无依据就拒答，客户敢用',
    proof: '少幻觉能上线',
    level: '熟练',
    courseId: 'rag-basics',
    tag: '靠谱',
  },
  {
    id: 'h11',
    hook: 'Key 写进代码？账单暴涨前先看这篇',
    result: '环境变量、吊销、脱敏清单一次做对',
    proof: '新手必避坑',
    level: '新手',
    courseId: 'api-keys-security',
    tag: '避坑',
  },
  {
    id: 'h12',
    hook: '录播课也能睡觉赚钱：自动化交付飞轮',
    result: '付费后自动发链接、群邀请、7 天打卡',
    proof: '被动收入结构',
    level: '老手',
    courseId: 'overnight-delivery',
    tag: '被动',
  },
]
