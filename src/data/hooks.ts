/** 首页能力卡片：说清学完能做出什么 */

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
    hook: '学完能独立改出更抓人的短视频标题与开场',
    result: '会用数字、反差、痛点三种开场结构，并让 AI 帮你批量改写',
    proof: '适合抖音 / 视频号起号',
    level: '新手',
    courseId: 'viral-hook-writing',
    tag: '短视频',
  },
  {
    id: 'h2',
    hook: '学完能搭出「客户付款后自动发课」的流程',
    result: '把发货、入群、打卡提醒串成少人工值守的链路',
    proof: '适合录播课与小课交付',
    level: '老手',
    courseId: 'auto-money-pipeline',
    tag: '交付',
  },
  {
    id: 'h3',
    hook: '学完能用 Cursor 改自己的项目，不用从零写代码',
    result: '会提需求、看改动、把报错贴回去继续修',
    proof: '适合产品 / 运营 / 新人开发',
    level: '新手',
    courseId: 'cursor',
    tag: '编程',
  },
  {
    id: 'h4',
    hook: '学完能把一条选题拆成多平台可发的内容包',
    result: '脚本、封面文案、评论引导一次产出，矩阵号能持续更新',
    proof: '适合多账号运营',
    level: '熟练',
    courseId: 'ai-content-matrix',
    tag: '矩阵',
  },
  {
    id: 'h5',
    hook: '学完能把公域流量接到私域并完成跟进成交',
    result: '评论区引导、主页话术、加微后的成交步骤可直接套用',
    proof: '适合有播放但不成交的账号',
    level: '老手',
    courseId: 'private-domain-convert',
    tag: '成交',
  },
  {
    id: 'h6',
    hook: '学完能上线一门小课并完成第一笔成交验证',
    result: '从定位、大纲到定价与交付页，跑通冷启动最小闭环',
    proof: '适合知识付费起步',
    level: '老手',
    courseId: 'knowledge-ip-start',
    tag: '知识付费',
  },
  {
    id: 'h7',
    hook: '学完能把常用提示词打包成可售卖的小产品',
    result: '模板整理、定价说明与交付方式一次成型',
    proof: '适合把技能商品化',
    level: '熟练',
    courseId: 'prompt-to-product',
    tag: '产品',
  },
  {
    id: 'h8',
    hook: '学完能写出直播间留人到成交的完整话术稿',
    result: '开场留人、信任、价格锚点、逼单与追单结构齐全',
    proof: '适合直播卖课',
    level: '老手',
    courseId: 'live-script-funnel',
    tag: '直播',
  },
  {
    id: 'h9',
    hook: '学完能给 AI 接上文档与文件工具，让它真正动手',
    result: '配置 MCP，完成一次查资料、改文件的实操',
    proof: '适合 Agent 落地',
    level: '熟练',
    courseId: 'mcp-intro',
    tag: 'Agent',
  },
  {
    id: 'h10',
    hook: '学完能搭企业知识库问答，回答尽量带出处',
    result: '切片、检索、引用与「不知道就说不知道」的拒答策略',
    proof: '适合客服与内部问答',
    level: '熟练',
    courseId: 'rag-basics',
    tag: '知识库',
  },
  {
    id: 'h11',
    hook: '学完能安全管理 API Key，避免密钥泄露与账单爆炸',
    result: '环境变量、吊销轮换、脱敏清单一次做对',
    proof: '新手必会安全项',
    level: '新手',
    courseId: 'api-keys-security',
    tag: '安全',
  },
  {
    id: 'h12',
    hook: '学完能做出录播课的自动交付与复购提醒',
    result: '付费后自动发链接、拉群、安排 7 天学习节奏',
    proof: '适合减少重复客服',
    level: '老手',
    courseId: 'overnight-delivery',
    tag: '运营',
  },
]
