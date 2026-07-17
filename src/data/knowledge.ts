/** 知略内容库：AI 工具 / API / MCP / 认知 / 落地 */

export type Level = '入门' | '进阶' | '实战' | '企业'

export type Lesson = {
  id: string
  title: string
  mins: number
  type: '视频' | '图文' | '模板' | '实操' | '测验'
}

export type KnowledgeItem = {
  id: string
  title: string
  category: string
  level: Level
  format: string
  desc: string
  audience: string
  duration: string
  teacher: string
  students: number
  highlights: string[]
  outline: string[]
  lessons: Lesson[]
  source?: '自有资料' | '平台课包'
  hot?: boolean
  new?: boolean
}

export const CATEGORIES = [
  '全部',
  'AI编程工具',
  'API与配置',
  'MCP与工具协议',
  '提示词工程',
  'Agent与自动化',
  '大模型认知',
  '知识库与RAG',
  '商业落地',
  '安全合规',
  '办公提效',
  '行业场景',
] as const

export const LEVELS: Array<Level | '全部'> = ['全部', '入门', '进阶', '实战', '企业']

function L(id: string, rows: Array<[string, number, Lesson['type']]>): Lesson[] {
  return rows.map(([title, mins, type], i) => ({
    id: `${id}-l${i + 1}`,
    title,
    mins,
    type,
  }))
}

function course(
  partial: Omit<KnowledgeItem, 'lessons' | 'outline' | 'highlights' | 'format' | 'audience' | 'duration' | 'teacher' | 'students'> &
    Partial<Pick<KnowledgeItem, 'format' | 'audience' | 'duration' | 'teacher' | 'students' | 'highlights' | 'outline' | 'lessons' | 'hot' | 'new' | 'source'>>,
  lessonRows: Array<[string, number, Lesson['type']]>,
): KnowledgeItem {
  const lessons = partial.lessons ?? L(partial.id, lessonRows)
  return {
    format: '专栏 · 图文/视频',
    audience: 'AI 学习者',
    duration: `${Math.max(1, Math.round(lessons.reduce((n, l) => n + l.mins, 0) / 60))} 小时`,
    teacher: '知略 AI 教研组',
    students: 1200 + (partial.id.length * 137) % 8000,
    highlights: ['系统讲解', '可实操', '可勾选进度'],
    outline: lessonRows.slice(0, 4).map(([t]) => t),
    ...partial,
    lessons,
  }
}

export const KNOWLEDGE_LIBRARY: KnowledgeItem[] = [
  // ——— AI 编程工具（广覆盖） ———
  course(
    {
      id: 'cursor',
      title: 'Cursor 完全指南：从安装到 Agent 编程',
      category: 'AI编程工具',
      level: '实战',
      desc: 'Composer、Chat、Rules、多文件改仓与企业落地注意事项。',
      source: '自有资料',
      hot: true,
      teacher: '知略 · 工具实验室',
    },
    [
      ['安装、账号与模型选择', 18, '视频'],
      ['Chat / Inline / Composer 对比', 25, '视频'],
      ['项目 Rules 与团队规范', 20, '图文'],
      ['多文件重构实战', 35, '实操'],
      ['常见坑与计费直觉', 15, '图文'],
    ],
  ),
  course(
    {
      id: 'claude-code',
      title: 'Claude Code：终端里的编程 Agent',
      category: 'AI编程工具',
      level: '进阶',
      desc: 'CLI Agent 安装、权限、仓库级任务与安全边界。',
      source: '自有资料',
      hot: true,
    },
    [
      ['官方安装与鉴权', 20, '实操'],
      ['仓库级指令写法', 28, '视频'],
      ['危险操作防护', 15, '图文'],
      ['修 Bug 全流程演练', 35, '实操'],
    ],
  ),
  course(
    {
      id: 'codex',
      title: 'OpenAI Codex / 代码代理入门',
      category: 'AI编程工具',
      level: '入门',
      desc: '代码生成、解释、重构与任务编排基础。',
      source: '自有资料',
    },
    [
      ['入口与环境', 12, '视频'],
      ['生成 / 解释 / 重构', 25, '视频'],
      ['任务拆解练习', 30, '实操'],
    ],
  ),
  course(
    {
      id: 'copilot',
      title: 'GitHub Copilot 企业用法与最佳实践',
      category: 'AI编程工具',
      level: '实战',
      desc: '补全、Chat、PR 总结、企业策略与隐私设置。',
      hot: true,
    },
    [
      ['安装与组织策略', 18, '视频'],
      ['补全与注释驱动开发', 22, '实操'],
      ['Copilot Chat 与 PR', 20, '视频'],
      ['企业隐私与禁用路径', 15, '图文'],
    ],
  ),
  course(
    {
      id: 'windsurf',
      title: 'Windsurf（Codeium）级联编程实战',
      category: 'AI编程工具',
      level: '进阶',
      desc: 'Cascade Agent、工作流与和 Cursor 的差异选型。',
      new: true,
    },
    [
      ['安装与界面导览', 15, '视频'],
      ['Cascade 多步任务', 30, '实操'],
      ['与 Cursor 怎么选', 12, '图文'],
    ],
  ),
  course(
    {
      id: 'trae',
      title: 'Trae IDE：国产 AI 编程助手速通',
      category: 'AI编程工具',
      level: '入门',
      desc: '安装、中文场景、常见工作流与适用人群。',
      new: true,
    },
    [
      ['安装与首次配置', 15, '视频'],
      ['日常改码流程', 25, '实操'],
      ['适用边界', 10, '图文'],
    ],
  ),
  course(
    {
      id: 'continue-dev',
      title: 'Continue.dev：开源 IDE 助手配置',
      category: 'AI编程工具',
      level: '进阶',
      desc: 'VS Code / JetBrains 接入自有模型与本地模型。',
    },
    [
      ['扩展安装', 12, '实操'],
      ['config.json 模型配置', 25, '图文'],
      ['接 OpenAI 兼容接口', 20, '实操'],
    ],
  ),
  course(
    {
      id: 'aider',
      title: 'Aider：Git 友好的命令行结对编程',
      category: 'AI编程工具',
      level: '进阶',
      desc: '基于 Git 的改码、提交信息与多文件协作。',
    },
    [
      ['安装与仓库初始化', 15, '实操'],
      ['对话改码与 commit', 25, '视频'],
      ['模型切换与成本', 12, '图文'],
    ],
  ),
  course(
    {
      id: 'cline-roo',
      title: 'Cline / Roo Code：VS Code Agent 插件',
      category: 'AI编程工具',
      level: '实战',
      desc: '浏览器工具、终端工具、自治任务与审批模式。',
      new: true,
    },
    [
      ['插件安装与模式', 15, '视频'],
      ['工具权限分级', 20, '图文'],
      ['自治任务演练', 30, '实操'],
    ],
  ),
  course(
    {
      id: 'jetbrains-ai',
      title: 'JetBrains AI Assistant 指南',
      category: 'AI编程工具',
      level: '入门',
      desc: 'Idea / WebStorm 等 IDE 内 AI 补全与重构。',
    },
    [
      ['开通与登录', 10, '视频'],
      ['补全与解释代码', 20, '实操'],
      ['测试生成', 18, '实操'],
    ],
  ),
  course(
    {
      id: 'amazon-q',
      title: 'Amazon Q / CodeWhisperer 速览',
      category: 'AI编程工具',
      level: '入门',
      desc: 'AWS 生态下的代码助手与安全扫描能力。',
    },
    [
      ['安装与 AWS 关联', 15, '视频'],
      ['补全与安全提示', 20, '图文'],
    ],
  ),
  course(
    {
      id: 'cody',
      title: 'Sourcegraph Cody：代码库级问答',
      category: 'AI编程工具',
      level: '进阶',
      desc: '大仓库上下文、代码搜索与企业部署形态。',
    },
    [
      ['连接代码库', 18, '实操'],
      ['仓库问答技巧', 25, '视频'],
      ['企业场景', 12, '图文'],
    ],
  ),
  course(
    {
      id: 'v0-lovable-bolt',
      title: 'v0 / Lovable / Bolt：AI 生成前端应用',
      category: 'AI编程工具',
      level: '实战',
      desc: '从提示词到可部署前端的生成式产品工作流。',
      hot: true,
    },
    [
      ['三类产品对比', 15, '图文'],
      ['从需求到页面', 30, '实操'],
      ['导出与二次开发', 20, '视频'],
    ],
  ),
  course(
    {
      id: 'replit-agent',
      title: 'Replit Agent：云端从零搭应用',
      category: 'AI编程工具',
      level: '入门',
      desc: '云 IDE + Agent 生成全栈原型的路径与限制。',
    },
    [
      ['创建与提示', 15, '视频'],
      ['迭代与部署', 25, '实操'],
    ],
  ),
  course(
    {
      id: 'gemini-cli',
      title: 'Gemini CLI 与多模态编程辅助',
      category: 'AI编程工具',
      level: '入门',
      desc: '安装、读图读文档、与代码仓库协作。',
      source: '自有资料',
    },
    [
      ['安装配置', 15, '实操'],
      ['多模态提问', 20, '视频'],
      ['文档驱动改码', 25, '实操'],
    ],
  ),
  course(
    {
      id: 'kimi-code',
      title: 'Kimi Code：长上下文编程协作',
      category: 'AI编程工具',
      level: '进阶',
      desc: '长文档、大仓库阅读与编码。',
      source: '自有资料',
    },
    [
      ['安装包部署', 18, '实操'],
      ['长文 / 大仓技巧', 28, '视频'],
    ],
  ),
  course(
    {
      id: 'vscode-ai',
      title: 'VS Code AI 扩展全家桶',
      category: 'AI编程工具',
      level: '入门',
      desc: 'VS Code 底座 + 主流 AI 扩展如何组合。',
      source: '自有资料',
    },
    [
      ['编辑器基础', 15, '视频'],
      ['扩展选型清单', 20, '图文'],
      ['设置同步', 12, '实操'],
    ],
  ),
  course(
    {
      id: 'ccswitch',
      title: 'CCSwitch：多模型 / 多账号切换',
      category: 'AI编程工具',
      level: '入门',
      desc: '降低工具与账号切换成本。',
      source: '自有资料',
    },
    [
      ['安装初始化', 12, '实操'],
      ['模型账号管理', 18, '视频'],
    ],
  ),
  course(
    {
      id: 'zed-tabnine',
      title: 'Zed AI / Tabnine 等补全工具对比',
      category: 'AI编程工具',
      level: '入门',
      desc: '轻量补全路线与隐私本地化选项。',
    },
    [
      ['产品地图', 12, '图文'],
      ['隐私模式差异', 15, '视频'],
      ['怎么选', 10, '图文'],
    ],
  ),
  course(
    {
      id: 'openhands-devin',
      title: 'OpenHands / Devin 类自治 Agent 观察',
      category: 'AI编程工具',
      level: '进阶',
      desc: '自治软件工程 Agent 的能力、成本与现实预期。',
      new: true,
    },
    [
      ['概念与演示拆解', 20, '视频'],
      ['适用 / 不适用场景', 15, '图文'],
      ['企业引入检查表', 15, '模板'],
    ],
  ),

  // ——— API 与配置 ———
  course(
    {
      id: 'api-openai',
      title: 'OpenAI API 从零配置到第一请求',
      category: 'API与配置',
      level: '入门',
      desc: 'API Key、Base URL、Chat Completions、流式输出。',
      hot: true,
    },
    [
      ['账号与密钥创建', 15, '视频'],
      ['环境变量与 .env', 18, '实操'],
      ['curl / SDK 第一请求', 25, '实操'],
      ['流式 SSE 是什么', 12, '图文'],
    ],
  ),
  course(
    {
      id: 'api-anthropic',
      title: 'Anthropic Claude API 配置手册',
      category: 'API与配置',
      level: '入门',
      desc: 'Messages API、系统提示、工具调用字段入门。',
    },
    [
      ['获取 API Key', 12, '视频'],
      ['Messages 请求结构', 22, '图文'],
      ['与 OpenAI 字段差异', 15, '图文'],
    ],
  ),
  course(
    {
      id: 'api-compatible',
      title: 'OpenAI 兼容接口与国内中转配置',
      category: 'API与配置',
      level: '实战',
      desc: 'base_url、兼容网关、Cursor/Continue 填法与排错。',
      hot: true,
    },
    [
      ['兼容接口原理', 15, '图文'],
      ['Cursor 填 Base URL', 20, '实操'],
      ['常见报错排查', 25, '图文'],
      ['密钥轮换建议', 10, '模板'],
    ],
  ),
  course(
    {
      id: 'api-azure',
      title: 'Azure OpenAI 企业接入要点',
      category: 'API与配置',
      level: '企业',
      desc: '资源部署、区域、密钥、网络与合规关注点。',
    },
    [
      ['资源与部署名', 18, '视频'],
      ['企业网络注意点', 15, '图文'],
      ['应用侧配置示例', 20, '实操'],
    ],
  ),
  course(
    {
      id: 'api-keys-security',
      title: 'API Key 安全：存储、轮换、泄露应对',
      category: 'API与配置',
      level: '企业',
      desc: '禁止提交仓库、密钥保险柜、泄露应急流程。',
      hot: true,
    },
    [
      ['危险做法对照', 12, '图文'],
      ['本地与 CI 注入', 20, '实操'],
      ['泄露应急清单', 15, '模板'],
    ],
  ),
  course(
    {
      id: 'api-params',
      title: '温度、Top-p、Max Tokens 等参数详解',
      category: 'API与配置',
      level: '进阶',
      desc: '每个参数影响什么、何时该调、调错会怎样。',
    },
    [
      ['参数地图', 18, '视频'],
      ['写作 vs 代码场景推荐值', 15, '图文'],
      ['对比实验', 25, '实操'],
    ],
  ),
  course(
    {
      id: 'api-streaming-tools',
      title: '流式输出、Function Calling 与结构化输出',
      category: 'API与配置',
      level: '进阶',
      desc: 'SSE、工具调用、JSON Schema / 结构化输出。',
    },
    [
      ['流式体验原理', 15, '图文'],
      ['Function Calling 示例', 25, '实操'],
      ['结构化输出约束', 20, '视频'],
    ],
  ),

  // ——— MCP ———
  course(
    {
      id: 'mcp-intro',
      title: 'MCP 是什么：模型上下文协议入门',
      category: 'MCP与工具协议',
      level: '入门',
      desc: 'MCP 解决什么问题、和 Plugin / Function Calling 关系。',
      hot: true,
      new: true,
    },
    [
      ['一句话讲清 MCP', 12, '视频'],
      ['Host / Client / Server', 18, '图文'],
      ['和普通 API 的差别', 15, '图文'],
      ['小测验', 8, '测验'],
    ],
  ),
  course(
    {
      id: 'mcp-install',
      title: '在 Cursor / Claude 中安装与配置 MCP',
      category: 'MCP与工具协议',
      level: '实战',
      desc: 'mcp.json 配置、本地 Server 启动、权限弹窗处理。',
      hot: true,
    },
    [
      ['配置文件位置', 15, '图文'],
      ['添加第一个 Server', 25, '实操'],
      ['失败排查', 20, '图文'],
    ],
  ),
  course(
    {
      id: 'mcp-filesystem',
      title: 'MCP 实战：文件系统与仓库读写',
      category: 'MCP与工具协议',
      level: '实战',
      desc: '只读/读写权限、路径沙箱、企业红线。',
    },
    [
      ['文件系统 Server', 20, '实操'],
      ['沙箱与路径限制', 15, '图文'],
      ['安全检查表', 12, '模板'],
    ],
  ),
  course(
    {
      id: 'mcp-github',
      title: 'MCP 实战：GitHub / Issue / PR 动作',
      category: 'MCP与工具协议',
      level: '进阶',
      desc: '让模型查仓库、开 Issue、辅助 PR 描述。',
    },
    [
      ['授权与 Token', 15, '实操'],
      ['常用动作清单', 20, '图文'],
      ['演示：整理 Issue', 25, '实操'],
    ],
  ),
  course(
    {
      id: 'mcp-browser',
      title: 'MCP 实战：浏览器自动化与抓取边界',
      category: 'MCP与工具协议',
      level: '进阶',
      desc: '页面快照、点击流、合规与反爬注意。',
    },
    [
      ['浏览器 MCP 能力', 18, '视频'],
      ['自动化脚本边界', 15, '图文'],
      ['合规提醒', 10, '模板'],
    ],
  ),
  course(
    {
      id: 'mcp-custom',
      title: '自定义 MCP Server：封装企业内部工具',
      category: 'MCP与工具协议',
      level: '企业',
      desc: '把内部 API 包成 MCP，供 IDE Agent 安全调用。',
      new: true,
    },
    [
      ['最小 Server 结构', 25, '图文'],
      ['鉴权与审计', 20, '视频'],
      ['发布给团队', 15, '实操'],
    ],
  ),
  course(
    {
      id: 'mcp-security',
      title: 'MCP 安全：权限、提示注入与供应链',
      category: 'MCP与工具协议',
      level: '企业',
      desc: '第三方 Server 风险、工具投毒、最小化授权。',
    },
    [
      ['威胁模型', 18, '视频'],
      ['最小化权限清单', 15, '模板'],
      ['引入评审流程', 15, '图文'],
    ],
  ),

  // ——— 提示词 ———
  course(
    {
      id: 'prompt-basics',
      title: '提示词工程入门：角色、目标、约束、格式',
      category: '提示词工程',
      level: '入门',
      desc: '四件套框架，立刻提升提问质量。',
      hot: true,
    },
    [
      ['坏提示 vs 好提示', 12, '视频'],
      ['四件套精讲', 25, '视频'],
      ['改写练习 10 题', 30, '实操'],
      ['模板包', 10, '模板'],
    ],
  ),
  course(
    {
      id: 'prompt-advanced',
      title: 'Few-shot、CoT、ReAct 与评测',
      category: '提示词工程',
      level: '进阶',
      desc: '复杂任务提示技巧与 A/B 评测方法。',
    },
    [
      ['Few-shot 示例选择', 18, '视频'],
      ['CoT / ReAct', 22, '图文'],
      ['评测表', 20, '实操'],
    ],
  ),
  course(
    {
      id: 'prompt-system',
      title: 'System Prompt 与工具说明写法',
      category: '提示词工程',
      level: '进阶',
      desc: '给 Agent 写稳定系统设定与工具描述。',
    },
    [
      ['系统提示结构', 20, '视频'],
      ['工具描述字段', 18, '图文'],
      ['客服 Agent 设定实操', 30, '实操'],
    ],
  ),
  course(
    {
      id: 'prompt-injection',
      title: '提示注入（Prompt Injection）防护',
      category: '提示词工程',
      level: '企业',
      desc: '攻击形态、案例与产品侧防护策略。',
    },
    [
      ['攻击示例拆解', 18, '视频'],
      ['防护策略', 20, '图文'],
      ['检查清单', 12, '模板'],
    ],
  ),

  // ——— Agent ———
  course(
    {
      id: 'agent-basics',
      title: 'Agent 入门：规划、记忆、工具',
      category: 'Agent与自动化',
      level: '入门',
      desc: '对话机器人 vs Agent，建立正确预期。',
      hot: true,
    },
    [
      ['概念澄清', 15, '视频'],
      ['工具循环示意', 20, '图文'],
      ['场景测验', 10, '测验'],
    ],
  ),
  course(
    {
      id: 'multi-agent',
      title: '多 Agent 协作：调研 / 写作 / 审核',
      category: 'Agent与自动化',
      level: '进阶',
      desc: '角色分工、交接协议、减少幻觉。',
    },
    [
      ['角色设计', 20, '模板'],
      ['交接格式', 15, '图文'],
      ['端到端演练', 35, '实操'],
    ],
  ),
  course(
    {
      id: 'workflow-auto',
      title: '业务自动化：n8n / 飞书 / 企微串联',
      category: 'Agent与自动化',
      level: '实战',
      desc: '把模型接到企业工具链自动跑。',
      hot: true,
    },
    [
      ['场景选型', 15, '视频'],
      ['搭一条通知流', 35, '实操'],
      ['失败重试', 15, '图文'],
    ],
  ),

  // ——— 模型认知 ———
  course(
    {
      id: 'model-map',
      title: '主流大模型能力地图与选型',
      category: '大模型认知',
      level: '入门',
      desc: 'GPT / Claude / Gemini / 国产模型怎么选。',
      hot: true,
    },
    [
      ['任务-模型对照', 18, '模板'],
      ['成本与速度直觉', 15, '视频'],
      ['部门选型练习', 20, '实操'],
    ],
  ),
  course(
    {
      id: 'model-terms-core',
      title: 'LLM 核心机制：Token、上下文、注意力（通俗版）',
      category: '大模型认知',
      level: '入门',
      desc: '用非数学语言讲清关键专有名词。',
      hot: true,
    },
    [
      ['Token 是什么', 12, '视频'],
      ['上下文窗口', 15, '图文'],
      ['为什么会忘 / 会瞎编', 18, '视频'],
      ['小测验', 8, '测验'],
    ],
  ),
  course(
    {
      id: 'model-training',
      title: '预训练、SFT、RLHF、LoRA 名词解释',
      category: '大模型认知',
      level: '进阶',
      desc: '训练阶段专有名称与企业相关度。',
    },
    [
      ['训练流水线全景', 20, '视频'],
      ['SFT / RLHF', 18, '图文'],
      ['LoRA 微调直觉', 15, '图文'],
    ],
  ),
  course(
    {
      id: 'model-moe-multimodal',
      title: 'MoE、多模态、推理模型差异',
      category: '大模型认知',
      level: '进阶',
      desc: '混合专家、图文音视频、o 系列推理模型。',
      new: true,
    },
    [
      ['MoE 通俗解释', 12, '视频'],
      ['多模态能力边界', 15, '图文'],
      ['推理模型何时用', 15, '视频'],
    ],
  ),

  // ——— RAG ———
  course(
    {
      id: 'rag-basics',
      title: 'RAG 入门：检索增强生成为何重要',
      category: '知识库与RAG',
      level: '入门',
      desc: '用公司文档回答，减少过期与胡编。',
      hot: true,
    },
    [
      ['RAG 一图看懂', 12, '视频'],
      ['Embedding 是什么', 15, '图文'],
      ['最小 Demo 思路', 20, '实操'],
    ],
  ),
  course(
    {
      id: 'rag-chunking',
      title: '文档切片、元数据与评测集',
      category: '知识库与RAG',
      level: '实战',
      desc: 'Chunk、重叠、元数据、问答质检。',
    },
    [
      ['切片策略', 22, '视频'],
      ['元数据设计', 15, '图文'],
      ['质检集模板', 20, '模板'],
    ],
  ),
  course(
    {
      id: 'rag-vector',
      title: '向量数据库选型直觉',
      category: '知识库与RAG',
      level: '进阶',
      desc: 'Milvus / PGVector / 云检索的选型维度。',
    },
    [
      ['向量库干什么', 12, '视频'],
      ['选型维度', 18, '图文'],
      ['小型方案建议', 15, '模板'],
    ],
  ),

  // ——— 商业落地 ———
  course(
    {
      id: 'biz-overview',
      title: 'AI 商业自动化落地全景',
      category: '商业落地',
      level: '企业',
      desc: '场景选型、试点、度量与扩面。',
      hot: true,
    },
    [
      ['机会地图', 20, '视频'],
      ['ROI 表', 15, '模板'],
      ['30 天试点计划', 25, '实操'],
    ],
  ),
  course(
    {
      id: 'biz-sales-cs',
      title: '销售跟进与客服质检自动化',
      category: '商业落地',
      level: '实战',
      desc: '纪要、跟进建议、质检报告。',
    },
    [
      ['销售卡点诊断', 18, '实操'],
      ['客服质检流', 25, '视频'],
      ['模板包', 12, '模板'],
    ],
  ),

  // ——— 安全 ———
  course(
    {
      id: 'sec-baseline',
      title: '企业 AI 安全基线与脱敏',
      category: '安全合规',
      level: '企业',
      desc: '红线、脱敏、账号与审计。',
      hot: true,
    },
    [
      ['红线速记', 10, '模板'],
      ['脱敏练习', 20, '实操'],
      ['审计字段', 15, '图文'],
    ],
  ),
  course(
    {
      id: 'sec-policy',
      title: '《企业 AI 使用规范》模板包',
      category: '安全合规',
      level: '企业',
      desc: '制度、培训稿、签署页。',
    },
    [
      ['制度模板', 20, '模板'],
      ['培训讲义', 15, '图文'],
    ],
  ),

  // ——— 办公 ———
  course(
    {
      id: 'office-suite',
      title: '办公提效：邮件、PPT、纪要、调研',
      category: '办公提效',
      level: '入门',
      desc: '高频办公场景提示词与复核习惯。',
    },
    [
      ['邮件与公文', 20, '实操'],
      ['PPT 大纲', 20, '实操'],
      ['会议纪要到待办', 18, '实操'],
      ['调研综述', 25, '实操'],
    ],
  ),
  course(
    {
      id: 'office-excel',
      title: '表格 AI：清洗、公式、异常解释',
      category: '办公提效',
      level: '入门',
      desc: 'Excel / 表格场景的可靠用法。',
      hot: true,
    },
    [
      ['描述表格任务', 12, '视频'],
      ['公式生成', 22, '实操'],
      ['异常解释', 18, '实操'],
    ],
  ),

  // ——— 行业 ———
  course(
    {
      id: 'ind-pack',
      title: '行业包：电商 / 制造 / 教育 / 传媒',
      category: '行业场景',
      level: '实战',
      desc: '垂直场景提示词与质控要点合集。',
    },
    [
      ['电商文案与客服', 25, '实操'],
      ['制造 SOP 问答', 25, '实操'],
      ['教育备课出题', 20, '实操'],
      ['传媒多平台改写', 20, '实操'],
    ],
  ),
]

export function getItem(id: string) {
  return KNOWLEDGE_LIBRARY.find((x) => x.id === id)
}

export const FEATURED_IDS = [
  'cursor',
  'mcp-intro',
  'api-openai',
  'copilot',
  'prompt-basics',
  'rag-basics',
  'model-terms-core',
  'claude-code',
] as const

export type LearningPath = {
  id: string
  title: string
  desc: string
  count: number
  courseIds: string[]
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path-ide',
    title: 'AI 编程工具路线',
    desc: 'Cursor / Copilot / Claude Code / Windsurf 等',
    count: 0,
    courseIds: ['cursor', 'copilot', 'claude-code', 'windsurf', 'continue-dev', 'aider', 'cline-roo'],
  },
  {
    id: 'path-api',
    title: 'API 与工程接入',
    desc: '密钥、兼容接口、参数、流式与工具调用',
    count: 0,
    courseIds: ['api-openai', 'api-anthropic', 'api-compatible', 'api-keys-security', 'api-params', 'api-streaming-tools'],
  },
  {
    id: 'path-mcp',
    title: 'MCP 从零到企业',
    desc: '协议认知、安装配置、GitHub/浏览器/自定义 Server',
    count: 0,
    courseIds: ['mcp-intro', 'mcp-install', 'mcp-filesystem', 'mcp-github', 'mcp-browser', 'mcp-custom', 'mcp-security'],
  },
  {
    id: 'path-prompt',
    title: '提示词与 Agent',
    desc: '提示词工程到多 Agent 协作',
    count: 0,
    courseIds: ['prompt-basics', 'prompt-advanced', 'prompt-system', 'agent-basics', 'multi-agent'],
  },
  {
    id: 'path-rag',
    title: '知识库 RAG',
    desc: '检索增强、切片、向量库',
    count: 0,
    courseIds: ['rag-basics', 'rag-chunking', 'rag-vector'],
  },
  {
    id: 'path-biz',
    title: '企业落地与安全',
    desc: '自动化、规范、脱敏审计',
    count: 0,
    courseIds: ['biz-overview', 'biz-sales-cs', 'sec-baseline', 'sec-policy'],
  },
].map((p) => ({ ...p, count: p.courseIds.length }))
