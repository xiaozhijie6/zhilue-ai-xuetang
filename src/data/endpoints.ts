/** 主流模型 / 工具相关域名与接口根地址（公开文档整理，便于配置核对） */

export type EndpointRef = {
  id: string
  vendor: string
  name: string
  baseUrl: string
  notes: string
  docsUrl: string
  auth: string
  typicalModels?: string[]
  tips?: string[]
}

export const ENDPOINT_GROUPS = ['全部', 'OpenAI 系', 'Anthropic 系', '国内/兼容', '云厂商', '工具协议'] as const

export const ENDPOINTS: EndpointRef[] = [
  {
    id: 'openai',
    vendor: 'OpenAI',
    name: 'OpenAI API',
    baseUrl: 'https://api.openai.com/v1',
    notes: '官方 Chat Completions / Responses / Embeddings 等 REST 根路径。',
    docsUrl: 'https://platform.openai.com/docs/api-reference',
    auth: 'Authorization: Bearer sk-...',
    typicalModels: ['gpt-4.1', 'gpt-4.1-mini', 'o系列推理模型（以控制台为准）'],
    tips: [
      '环境变量常用 OPENAI_API_KEY；自定义网关时改 base_url。',
      '企业可用 Private Link 区域主机，如 *.privatelink.api.openai.com。',
      '密钥禁止写进前端与公开仓库。',
    ],
  },
  {
    id: 'azure-openai',
    vendor: 'Microsoft',
    name: 'Azure OpenAI / Foundry',
    baseUrl: 'https://{RESOURCE}.openai.azure.com/openai/v1/',
    notes: '将 {RESOURCE} 换成你的资源名；也可使用 *.services.ai.azure.com 形态。',
    docsUrl: 'https://learn.microsoft.com/azure/ai-services/openai/',
    auth: 'api-key 或 Entra ID Token',
    typicalModels: ['部署名（Deployment Name）≠ 模型营销名，以门户为准'],
    tips: [
      'SDK 可用 OpenAI() + base_url 指向 Azure。',
      '旧版需 api-version 查询参数；v1 路径下规则以最新文档为准。',
      '适合数据驻留与企业合规场景。',
    ],
  },
  {
    id: 'anthropic',
    vendor: 'Anthropic',
    name: 'Claude API',
    baseUrl: 'https://api.anthropic.com',
    notes: 'Messages API；请求常带 anthropic-version 头。',
    docsUrl: 'https://docs.anthropic.com/',
    auth: 'x-api-key: sk-ant-...',
    typicalModels: ['claude-sonnet / claude-opus / claude-haiku（以官方型号列表为准）'],
    tips: [
      'Python: anthropic 包；也可用兼容网关转发。',
      '系统提示走 system 字段，与 OpenAI messages 结构不同。',
      '工具调用字段名与 OpenAI Function Calling 有差异。',
    ],
  },
  {
    id: 'deepseek',
    vendor: 'DeepSeek',
    name: 'DeepSeek API（OpenAI 兼容）',
    baseUrl: 'https://api.deepseek.com',
    notes: '可用 OpenAI SDK，仅改 base_url 与 api_key。',
    docsUrl: 'https://api-docs.deepseek.com/',
    auth: 'Authorization: Bearer ...',
    typicalModels: ['deepseek-chat', 'deepseek-reasoner', 'deepseek-v4-*（以文档为准）'],
    tips: [
      '另提供 Anthropic 兼容：https://api.deepseek.com/anthropic',
      '模型名以控制台/文档为准，旧名可能废弃。',
      '适合成本敏感的中文与代码场景。',
    ],
  },
  {
    id: 'gemini',
    vendor: 'Google',
    name: 'Gemini API（AI Studio / Google AI）',
    baseUrl: 'https://generativelanguage.googleapis.com',
    notes: 'Google AI Studio 常用接口根；Vertex AI 为企业另一套端点。',
    docsUrl: 'https://ai.google.dev/docs',
    auth: 'API Key（查询参数或头，视 SDK）',
    typicalModels: ['gemini-2.0-flash', 'gemini-1.5-pro 等'],
    tips: [
      'SDK：@google/generative-ai 或新 google-genai。',
      'Vertex：区域 + 项目号组成 endpoint，勿与 AI Studio 混用密钥。',
      '多模态上传注意文件大小与隐私策略。',
    ],
  },
  {
    id: 'groq',
    vendor: 'Groq',
    name: 'Groq OpenAI 兼容',
    baseUrl: 'https://api.groq.com/openai/v1',
    notes: '高速推理，OpenAI 兼容路径。',
    docsUrl: 'https://console.groq.com/docs',
    auth: 'Bearer',
    typicalModels: ['Llama / Mixtral 等托管型号'],
    tips: ['改 base_url 即可复用 OpenAI SDK。', '注意模型可用性与速率限制。'],
  },
  {
    id: 'openai-compatible-gateway',
    vendor: '通用',
    name: 'OpenAI 兼容中转 / 网关',
    baseUrl: 'https://{你的网关域名}/v1',
    notes: '国内中转、自建 vLLM/OneAPI/NewAPI 等常见形态。',
    docsUrl: 'https://platform.openai.com/docs/api-reference',
    auth: 'Bearer（由网关定义）',
    tips: [
      'Cursor / Continue 填 Base URL + Key + 模型名三件套。',
      '核对是否支持 stream、tools、vision。',
      '企业应审查中转方日志与数据留存条款。',
    ],
  },
  {
    id: 'mcp-stdio',
    vendor: 'MCP',
    name: 'MCP 本地 STDIO Server',
    baseUrl: '本地进程（无 HTTP 域名）',
    notes: 'Host（Cursor/Claude Desktop）拉起 command，经 stdin/stdout JSON-RPC 通信。',
    docsUrl: 'https://modelcontextprotocol.io/',
    auth: '环境变量注入（GITHUB_TOKEN 等）',
    tips: [
      '配置文件：.cursor/mcp.json 或 ~/.cursor/mcp.json',
      '密钥用 ${env:VAR}，勿硬编码进仓库。',
      'Agent 模式才调用工具；Ask 模式通常不触发。',
    ],
  },
  {
    id: 'mcp-http',
    vendor: 'MCP',
    name: 'MCP 远程 / HTTP 传输',
    baseUrl: 'https://{你的 MCP 服务域名}',
    notes: '远程 MCP 需额外鉴权与网络安全（TLS、内网、零信任）。',
    docsUrl: 'https://modelcontextprotocol.io/',
    auth: 'Bearer / mTLS / 网关鉴权',
    tips: ['生产环境加审批与审计日志。', '最小权限：只挂必要工具。'],
  },
  {
    id: 'github-api',
    vendor: 'GitHub',
    name: 'GitHub REST API（常被 MCP 调用）',
    baseUrl: 'https://api.github.com',
    notes: '官方 MCP / 自建工具常访问此域名读写仓库。',
    docsUrl: 'https://docs.github.com/rest',
    auth: 'token / fine-grained PAT',
    tips: ['PAT 最小权限；企业用 GitHub Enterprise 主机名不同。', '限流头：X-RateLimit-*'],
  },
  {
    id: 'npm-registry',
    vendor: 'npm',
    name: 'npx 拉 MCP 包',
    baseUrl: 'https://registry.npmjs.org',
    notes: 'npx -y @modelcontextprotocol/server-* 会访问 npm 源。',
    docsUrl: 'https://docs.npmjs.com/',
    auth: '通常匿名；私有源需登录',
    tips: ['公司网络需放行 npm 或配置镜像。', 'Node 版本过低会导致 MCP 起不来。'],
  },
  {
    id: 'dashscope',
    vendor: '阿里云',
    name: '通义 / DashScope（OpenAI 兼容）',
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    notes: '国内常用；可用 OpenAI SDK 改 base_url。北京/国际地域文档可能不同。',
    docsUrl: 'https://help.aliyun.com/zh/model-studio/',
    auth: 'Authorization: Bearer (DashScope API Key)',
    typicalModels: ['qwen-plus', 'qwen-max', 'qwen-turbo（以控制台为准）'],
    tips: ['控制台开通模型后再调；注意地域与计费。', '企业场景核对数据是否出域。'],
  },
  {
    id: 'moonshot',
    vendor: 'Moonshot',
    name: 'Kimi / Moonshot API',
    baseUrl: 'https://api.moonshot.cn/v1',
    notes: 'OpenAI 兼容形态，长上下文场景常见。',
    docsUrl: 'https://platform.moonshot.cn/docs',
    auth: 'Bearer',
    typicalModels: ['moonshot-v1-*（以官方列表为准）'],
    tips: ['超长文档先确认上下文与价格。', '密钥勿进前端。'],
  },
  {
    id: 'siliconflow',
    vendor: 'SiliconFlow',
    name: '硅基流动（OpenAI 兼容）',
    baseUrl: 'https://api.siliconflow.cn/v1',
    notes: '聚合多开源模型的兼容接口，适合试用与成本敏感场景。',
    docsUrl: 'https://docs.siliconflow.cn/',
    auth: 'Bearer',
    typicalModels: ['以控制台可选模型为准'],
    tips: ['模型名与官方 HuggingFace 名可能不同，以文档为准。', '生产前压测 stream/tools。'],
  },
  {
    id: 'mcp-spec',
    vendor: 'MCP',
    name: 'MCP 官方规范与文档站',
    baseUrl: 'https://modelcontextprotocol.io',
    notes: '协议说明、概念（Host/Client/Server）与传输方式入口。',
    docsUrl: 'https://modelcontextprotocol.io',
    auth: '文档站无需鉴权',
    tips: ['实现前先读 tools / resources / prompts 三类能力。', '供应链：只装可信 MCP 包。'],
  },
]

export function endpointsByGroup(group: (typeof ENDPOINT_GROUPS)[number]) {
  if (group === '全部') return ENDPOINTS
  const map: Record<string, string[]> = {
    'OpenAI 系': ['openai', 'azure-openai', 'openai-compatible-gateway', 'groq'],
    'Anthropic 系': ['anthropic', 'deepseek'],
    '国内/兼容': ['deepseek', 'openai-compatible-gateway', 'dashscope', 'moonshot', 'siliconflow'],
    云厂商: ['azure-openai', 'gemini', 'dashscope'],
    工具协议: ['mcp-stdio', 'mcp-http', 'mcp-spec', 'github-api', 'npm-registry'],
  }
  const ids = new Set(map[group] ?? [])
  return ENDPOINTS.filter((e) => ids.has(e.id))
}
