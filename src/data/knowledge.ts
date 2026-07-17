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
      ['Chat / Inline / Composer / Agent 模式对比', 20, '图文'],
      ['@文件、@Codebase 与上下文范围控制', 15, '实操'],
      ['项目 Rules：.cursor/rules 与 AGENTS.md', 22, '实操'],
      ['团队 Rules 共享与版本管理', 15, '图文'],
      ['多文件重构：Composer 任务拆解', 25, '实操'],
      ['MCP 与 Tools 在 Cursor 里怎么开', 18, '实操'],
      ['模型与 API Key 在 Settings 里配置', 12, '实操'],
      ['Privacy Mode 与企业合规选项', 12, '图文'],
      ['常见坑：不改文件、上下文爆炸、计费直觉', 15, '图文'],
      ['从 Ask 切到 Agent 的 checklist', 10, '模板'],
    ],
  ),
  course(
    {
      id: 'cursor-rules',
      title: 'Cursor Rules 深度：.mdc 与团队规范落地',
      category: 'AI编程工具',
      level: '进阶',
      desc: 'Rules 语法、层级、与 System Prompt 分工，让 Agent 稳定守规矩。',
      source: '自有资料',
      new: true,
    },
    [
      ['Rules 文件放哪：项目 vs 用户 vs 团队', 12, '图文'],
      ['.mdc  frontmatter 与 globs 匹配范围', 15, '实操'],
      ['写可执行的约束：版本、目录、禁止事项', 18, '实操'],
      ['Rules vs AGENTS.md vs README 分工', 12, '图文'],
      ['示例：React / Python /  monorepo 三套模板', 20, '模板'],
      ['Rules 过长导致上下文浪费的裁剪', 12, '图文'],
      ['团队 Review：如何迭代 Rules 版本', 15, '实操'],
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
      ['注册 OpenAI 账号与组织', 10, '视频'],
      ['创建 API Key 与项目隔离', 12, '实操'],
      ['计费直觉：输入/输出 Token 怎么算', 12, '图文'],
      ['环境变量与 .env 本地注入', 15, '实操'],
      ['Base URL：https://api.openai.com/v1 含义', 10, '图文'],
      ['curl 第一条 chat/completions', 18, '实操'],
      ['Python / Node SDK 最小可运行示例', 20, '实操'],
      ['messages 角色：system / user / assistant', 15, '图文'],
      ['model 参数与可用型号查询', 12, '实操'],
      ['stream: true 与 SSE 客户端读取', 15, '实操'],
      ['401 / 429 / 500 报错对照与排查', 12, '图文'],
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
      ['OpenAI 兼容接口是什么：同一 SDK 换 base_url', 12, '图文'],
      ['DeepSeek / 国内网关 Base URL 对照', 15, '图文'],
      ['Cursor Settings：Override OpenAI Base URL', 18, '实操'],
      ['Continue / Cline 填兼容地址逐步截图', 15, '实操'],
      ['模型名映射：gpt-4o vs deepseek-chat', 12, '图文'],
      ['curl 验证兼容网关 /models 与 /chat/completions', 18, '实操'],
      ['stream 与 tools 在兼容层是否支持：实测', 15, '实操'],
      ['401 域名错 / 404 路径错 / 502 网关错', 15, '图文'],
      ['公司代理与 TLS 拦截排查', 12, '图文'],
      ['密钥轮换与多环境配置模板', 10, '模板'],
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
      ['Azure 资源组与 OpenAI 资源创建', 15, '视频'],
      ['部署 Deployment 与模型版本选择', 18, '实操'],
      ['endpoint + api-key + api-version 三件套', 15, '图文'],
      ['企业 VNet / 私有端点接入要点', 18, '图文'],
      ['区域选择与数据驻留合规', 12, '图文'],
      ['应用侧 Python SDK 配置示例', 20, '实操'],
      ['与 OpenAI 官方字段差异对照', 15, '图文'],
      ['配额申请与 TPM/RPM 企业提额', 12, '图文'],
      ['监控、日志与 Key 轮换流程', 15, '模板'],
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
      ['密钥泄露真实案例与代价', 10, '图文'],
      ['禁止：硬编码、提交 Git、前端暴露', 12, '图文'],
      ['正确：环境变量、密钥管理器、CI Secret', 18, '实操'],
      ['.gitignore 与 pre-commit 扫描 sk-', 15, '实操'],
      ['开发 / 测试 / 生产 Key 隔离策略', 12, '图文'],
      ['泄露应急：Revoke → 清历史 → 查账单', 15, '模板'],
      ['最小权限与按服务拆分 Key', 12, '图文'],
      ['团队规范文档模板', 10, '模板'],
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
      ['SSE 事件流格式与 data: 行解析', 15, '图文'],
      ['stream 参数与 finish_reason 含义', 12, '图文'],
      ['Node / Python 流式客户端手写', 20, '实操'],
      ['Function Calling：tools 数组结构', 18, '图文'],
      ['tool_calls 响应与执行回传 tool 角色', 20, '实操'],
      ['JSON Schema 常见 400 与修复', 15, '图文'],
      ['structured outputs / json_schema 模式', 18, '实操'],
      ['流式 + 工具同时开时的兼容注意', 12, '图文'],
      ['Agent 循环：call → run → submit 伪代码', 15, '实操'],
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
      ['MCP 解决什么问题：工具、数据、IDE 统一协议', 12, '视频'],
      ['Host / Client / Server 三角关系图解', 15, '图文'],
      ['与 Plugin、Function Calling、API 的对比', 15, '图文'],
      ['一次工具调用的完整时序', 12, '视频'],
      ['常见 MCP Server 能力地图', 10, '图文'],
      ['在 Cursor 里看到 MCP 绿灯意味着什么', 12, '实操'],
      ['stdio vs SSE 传输方式入门', 12, '图文'],
      ['安全直觉：为何需要权限弹窗', 10, '图文'],
      ['小测验：概念核对', 8, '测验'],
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
      id: 'mcp-server',
      title: 'MCP Server 原理与常用官方 Server 拆解',
      category: 'MCP与工具协议',
      level: '进阶',
      desc: 'Server 进程结构、tools/resources 注册、filesystem / context7 配置详解。',
      hot: true,
      source: '自有资料',
    },
    [
      ['Server 生命周期：启动、握手、capabilities', 15, '图文'],
      ['tools/list 与 tools/call 消息格式', 18, '图文'],
      ['filesystem Server：路径 allowlist 配置', 18, '实操'],
      ['context7 / 文档类 Server 使用场景', 15, '实操'],
      ['GitHub Server：Token 权限最小化', 15, '实操'],
      ['stdio 传输与日志 stderr 排错', 12, '图文'],
      ['多 Server 并存时的命名与冲突', 10, '图文'],
      ['从社区 Server 到内网 fork 的流程', 15, '实操'],
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
      ['坏提示 vs 好提示：同一任务对比', 12, '视频'],
      ['四件套：角色 → 任务 → 约束 → 格式', 20, '视频'],
      ['输出格式：Markdown / JSON / 表格锁定', 15, '图文'],
      ['「不知道就说不知道」减少幻觉', 10, '图文'],
      ['上下文该贴多少：文件 vs 摘要', 12, '图文'],
      ['改写练习 10 题（办公 / 代码 / 分析）', 25, '实操'],
      ['提示词模板收藏与团队共享', 10, '模板'],
      ['常见翻车：太宽、太长、无验收标准', 12, '图文'],
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
      ['Few-shot：示例怎么选、放几条', 18, '视频'],
      ['Chain-of-Thought：何时显式要步骤', 15, '图文'],
      ['ReAct：思考-行动-观察循环', 18, '图文'],
      ['Self-consistency 与多采样投票', 12, '图文'],
      ['Prompt 版本管理与 A/B 对比', 15, '实操'],
      ['评测表：准确率 / 格式 / 安全维度', 18, '实操'],
      ['多轮场景下的 prompt 漂移对策', 12, '图文'],
      ['从 prompt 到 system + tools 的升级路径', 15, '视频'],
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
      id: 'agent-tools',
      title: 'Agent 工具调用：从 Function 到 MCP 闭环',
      category: 'Agent与自动化',
      level: '实战',
      desc: '设计 tools、执行循环、错误重试、与 MCP 组合的企业 Agent 模式。',
      hot: true,
      new: true,
    },
    [
      ['Agent 循环：plan → tool → observe → answer', 15, '视频'],
      ['tool 描述怎么写模型才爱用', 18, '图文'],
      ['并行 vs 串行 tool_calls 策略', 12, '图文'],
      ['本地执行 sandbox 与超时', 15, '实操'],
      ['失败重试：把 stderr 贴回对话', 15, '实操'],
      ['MCP 与原生 Function Calling 怎么选', 12, '图文'],
      ['Human-in-the-loop 审批点设计', 15, '模板'],
      ['端到端：查天气 / 查库 / 写文件 Demo 拆解', 25, '实操'],
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
      ['RAG 解决「过期 + 胡编」的两根支柱', 12, '视频'],
      ['Indexing：切片 → Embedding → 向量库', 15, '图文'],
      ['Retrieval：相似度、Top-K、阈值', 15, '图文'],
      ['Generation：引用片段 + 拒答策略', 12, '图文'],
      ['Embedding 模型选型与中文效果', 12, '图文'],
      ['最小 Demo：本地 10 页 PDF 问答思路', 20, '实操'],
      ['RAG vs 纯长上下文：成本与准确对比', 12, '图文'],
      ['上线前 golden QA 集怎么建', 15, '模板'],
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

  // ——— 新增专题课 ———
  course(
    {
      id: 'domain-api-cheatsheet',
      title: '域名与接口手把手：Base URL 速查与填法',
      category: 'API与配置',
      level: '入门',
      desc: 'OpenAI / Anthropic / Azure / DeepSeek / 兼容网关域名、路径、鉴权对照，复制即用。',
      hot: true,
      new: true,
      source: '自有资料',
    },
    [
      ['一张表看懂：vendor / base_url / auth 头', 12, '模板'],
      ['OpenAI 官方与 Organization 项目 Key', 10, '图文'],
      ['Anthropic Messages API 域名差异', 12, '图文'],
      ['Azure OpenAI endpoint 拼接规则', 15, '实操'],
      ['DeepSeek / 硅基等兼容网关填 Cursor', 15, '实操'],
      ['curl 模板：/models 与 /chat/completions', 15, '实操'],
      ['常见填错案例：少 /v1、https 写成 http', 12, '图文'],
      ['内网代理与环境变量 NO_PROXY', 10, '图文'],
    ],
  ),
  course(
    {
      id: 'newbie-first-week',
      title: '新手第一周：从零到能独立调 API + 用 Cursor',
      category: 'AI编程工具',
      level: '入门',
      desc: '7 天计划：提示词、IDE、API、MCP、安全复盘，每天 30～45 分钟可完成。',
      hot: true,
      new: true,
      source: '自有资料',
    },
    [
      ['Day1：四段式提示词完成 3 个真实任务', 35, '实操'],
      ['Day2：安装 Cursor 并完成多文件小改动', 40, '实操'],
      ['Day3：申请 Key + curl/SDK 第一请求', 40, '实操'],
      ['Day4：配置 filesystem MCP 并触发工具', 35, '实操'],
      ['Day5：写 5 条项目 Rules', 30, '实操'],
      ['Day6：密钥与脱敏自查清单', 25, '模板'],
      ['Day7：复盘哪些任务提效、哪些必须人工', 30, '图文'],
    ],
  ),
  course(
    {
      id: 'cost-control',
      title: '成本与限流：Token 账单、配额与模型路由',
      category: 'API与配置',
      level: '企业',
      desc: '告警、hard limit、缓存、历史截断、模型路由，避免 Agent 账单失控。',
      new: true,
      source: '自有资料',
    },
    [
      ['账单维度：model / user / feature 怎么拆', 15, '图文'],
      ['控制台告警与月度预算设置', 12, '实操'],
      ['max_tokens 与上下文滑动窗口', 15, '图文'],
      ['Agent max_steps 防无限循环', 12, '图文'],
      ['Prompt / Embedding 缓存策略', 15, '实操'],
      ['模型路由：分类器 + 小模型默认', 18, '实操'],
      ['429 限流：退避、队列、熔断', 15, '图文'],
      ['成本复盘模板与 ROI 粗算', 12, '模板'],
    ],
  ),
  course(
    {
      id: 'hallucination-defense',
      title: '幻觉防控：Grounding、引用与拒答策略',
      category: '知识库与RAG',
      level: '实战',
      desc: '减少瞎编的系统方法：RAG 引用、低 temperature、校验、人工复核流程。',
      hot: true,
      new: true,
    },
    [
      ['幻觉类型：事实 / API / 数字 / 引用', 12, '视频'],
      ['Grounding：检索命中才允许回答', 15, '图文'],
      ['强制 citation 格式与 UI 展示', 15, '实操'],
      ['无命中拒答话术与转人工', 10, '模板'],
      ['代码幻觉：版本锁定 + 测试门禁', 18, '实操'],
      ['数字与计算：要求展示推导步骤', 12, '图文'],
      ['评测集：golden QA + 人工 rubric', 20, '实操'],
      ['上线后 bad case 回流机制', 12, '图文'],
    ],
  ),
  course(
    {
      id: 'enterprise-ai-checklist',
      title: '企业 AI 落地清单：从试点到规模推广',
      category: '安全合规',
      level: '企业',
      desc: '法务、数据分级、工具白名单、审计、培训、供应商评估一条龙 checklist。',
      new: true,
      source: '自有资料',
    },
    [
      ['场景选型：自动化 vs 辅助 vs 禁止', 15, '模板'],
      ['数据分级与能否上公有云判定', 18, '图文'],
      ['工具白名单：IDE / Bot / API 审批流', 15, '模板'],
      ['密钥、日志、留存与 DPA 条款', 15, '图文'],
      ['员工培训与签署《AI 使用规范》', 12, '模板'],
      ['试点 30 天：指标、复盘、扩面条件', 20, '实操'],
      ['红队：注入、泄密、误操作演练', 15, '图文'],
      ['供应商变更与退出策略', 10, '图文'],
    ],
  ),
  course(
    {
      id: 'streaming-sse',
      title: '流式输出 SSE 实战：前后端与网关',
      category: 'API与配置',
      level: '进阶',
      desc: 'SSE 协议、fetch 流式读取、Node 转发、网关缓冲坑与首 token 优化。',
      new: true,
    },
    [
      ['SSE vs WebSocket：何时用 SSE', 12, '图文'],
      ['OpenAI stream 响应 chunk 结构', 15, '图文'],
      ['浏览器 fetch + ReadableStream 读取', 20, '实操'],
      ['Node Express / FastAPI 转发流式', 20, '实操'],
      ['Nginx / CDN 关闭缓冲配置要点', 12, '图文'],
      ['首 token 延迟监控与体验优化', 12, '图文'],
      ['流式中断、重连与用户取消', 15, '实操'],
      ['流式 + JSON 工具调用并存排错', 15, '图文'],
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
  'newbie-first-week',
  'cost-control',
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
    courseIds: ['cursor', 'copilot', 'claude-code', 'newbie-first-week', 'cursor-rules', 'windsurf', 'continue-dev', 'aider', 'cline-roo'],
  },
  {
    id: 'path-api',
    title: 'API 与工程接入',
    desc: '密钥、兼容接口、参数、流式与工具调用',
    count: 0,
    courseIds: ['domain-api-cheatsheet', 'api-openai', 'api-anthropic', 'api-compatible', 'api-azure', 'api-keys-security', 'api-params', 'streaming-sse', 'cost-control', 'api-streaming-tools'],
  },
  {
    id: 'path-mcp',
    title: 'MCP 从零到企业',
    desc: '协议认知、安装配置、GitHub/浏览器/自定义 Server',
    count: 0,
    courseIds: ['mcp-intro', 'mcp-install', 'mcp-server', 'mcp-filesystem', 'mcp-github', 'mcp-browser', 'mcp-custom', 'mcp-security'],
  },
  {
    id: 'path-prompt',
    title: '提示词与 Agent',
    desc: '提示词工程到多 Agent 协作',
    count: 0,
    courseIds: ['prompt-basics', 'prompt-advanced', 'prompt-system', 'agent-basics', 'agent-tools', 'multi-agent'],
  },
  {
    id: 'path-rag',
    title: '知识库 RAG',
    desc: '检索增强、切片、向量库',
    count: 0,
    courseIds: ['rag-basics', 'rag-chunking', 'rag-vector', 'hallucination-defense'],
  },
  {
    id: 'path-biz',
    title: '企业落地与安全',
    desc: '自动化、规范、脱敏审计',
    count: 0,
    courseIds: ['biz-overview', 'enterprise-ai-checklist', 'biz-sales-cs', 'sec-baseline', 'sec-policy'],
  },
].map((p) => ({ ...p, count: p.courseIds.length }))
