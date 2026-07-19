/** 产品定案：企业旗舰训练营（B2B Demo 成交）—— 不做资料超市 */

export const FLAGSHIP = {
  name: 'AI 商业自动化落地营',
  badge: '旗舰方案',
  duration: '8 周',
  format: '直播答疑 + 录播 + 实操作业 + 结营评审',
  promise: '选 1 个真实业务场景，8 周内跑通可复用的 AI 自动化方案，并沉淀团队提示词与规范。',
  forWhom: [
    { role: '业务 / 运营负责人', need: '要看到具体场景提效，而不只是「学会提问」' },
    { role: 'HR / 培训负责人', need: '要可开班、可考核、可对公采购的整包方案' },
    { role: '技术 / 数字化团队', need: '要工具链统一（Cursor 等）并能支撑业务落地' },
  ],
  outcomes: [
    '1 份已上线或可上线的业务自动化方案（含流程图）',
    '1 套岗位提示词库 + 质量评审表',
    '团队 AI 使用规范初稿（含安全红线）',
    '国产 / 外国软件安装与实战礼包（Trae、灵码、Cursor、Claude Code 等）',
    '结营汇报材料，方便向管理层展示 ROI',
  ],
  weeks: [
    { week: 'W1–W2', title: '场景选型与流程拆解', items: ['盘点高耗时环节', '选定 1 个试点场景', '画清输入/输出与人工卡点'] },
    { week: 'W3–W4', title: '提示词与 Agent 设计', items: ['提示词框架与评测', '多轮迭代与输出约束', '必要时引入工具调用'] },
    { week: 'W5–W6', title: '工具链与自动化串联', items: ['Cursor / Claude Code 等实战', '飞书/企微/表格工作流', '小范围灰度试用'] },
    { week: 'W7–W8', title: '上线复盘与组织沉淀', items: ['效果度量与复盘', '规范与权限', '结营评审与扩面建议'] },
  ],
} as const

export const ADDON = {
  name: '提示词工程强化包',
  duration: '可并行 · 4 周节奏',
  desc: '适合先补方法、再建自动化的团队。可与旗舰营打包，也可单独采购。',
} as const

export const PRICING = [
  {
    id: 'starter',
    name: '试点班',
    seats: '5–15 席',
    price: '¥28,000',
    period: '起 / 期',
    note: '适合单部门试点',
    features: ['旗舰营完整大纲', '每周答疑', '结营评审', '工具礼包', '电子发票 / 对公'],
    highlight: false,
  },
  {
    id: 'team',
    name: '部门班',
    seats: '16–40 席',
    price: '¥58,000',
    period: '起 / 期',
    note: '最常见企业采购',
    features: ['含试点班全部', '岗位路径裁剪', '管理员进度看板', '提示词库共建工作坊', '结营管理层汇报辅导'],
    highlight: true,
  },
  {
    id: 'org',
    name: '组织班',
    seats: '40+ 席',
    price: '按需报价',
    period: '年框可谈',
    note: '多部门 / 多期',
    features: ['多期开班', '定制行业场景', '种子教练培养', 'RAG 知识库加购通道', '专属客户成功'],
    highlight: false,
  },
] as const

export const INCLUDED_MODULES = [
  { cat: '方法', title: '提示词框架与评测' },
  { cat: '场景', title: '销售 / 客服 / 周报等自动化模板' },
  { cat: '工具', title: 'Cursor · Claude Code · Codex 等' },
  { cat: '工作流', title: '飞书 / 企微 / 表格串联' },
  { cat: '合规', title: '脱敏红线与使用规范' },
  { cat: '组织', title: 'ROI 汇报与种子用户机制' },
] as const

export const FAQS = [
  {
    q: '和买一堆 AI 录播课有什么区别？',
    a: '旗舰营以「一个业务场景上线」为结营标准，不是看完视频就算完成。过程有作业、答疑和评审。',
  },
  {
    q: '我们没有技术团队也能参加吗？',
    a: '可以。业务与运营同学是主力；技术同学可选配工具强化。试点场景会按团队能力选型。',
  },
  {
    q: '内容是否包含我们已有的工具安装资料？',
    a: '包含。Cursor、Claude Code、Codex 等安装与零基础教程作为开营礼包发放，并在中期实战周使用。',
  },
  {
    q: '如何对公采购？',
    a: '支持合同、对公转账与发票。提交预约后我们按席位与开营时间出报价单。',
  },
] as const
