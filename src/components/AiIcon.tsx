import { BrandMark, BRAND_BG, type BrandKey } from './BrandMark'

/** 教程主题图标（软件用品牌标，其余用语义图标） */

export type IconKey =
  | 'cursor'
  | 'claude'
  | 'openai'
  | 'gemini'
  | 'copilot'
  | 'mcp'
  | 'kimi'
  | 'vscode'
  | 'windsurf'
  | 'trae'
  | 'lingma'
  | 'ccswitch'
  | 'download'
  | 'web'
  | 'miniapp'
  | 'mobile'
  | 'image'
  | 'rag'
  | 'agent'
  | 'prompt'
  | 'security'
  | 'office'
  | 'biz'
  | 'model'
  | 'default'

const BRAND_ICON_KEYS = new Set<IconKey>([
  'cursor',
  'claude',
  'openai',
  'gemini',
  'copilot',
  'mcp',
  'kimi',
  'vscode',
  'windsurf',
  'trae',
  'lingma',
  'ccswitch',
])

export const ICON_BG: Record<IconKey, string> = {
  cursor: BRAND_BG.cursor,
  claude: BRAND_BG.claude,
  openai: BRAND_BG.openai,
  gemini: BRAND_BG.gemini,
  copilot: BRAND_BG.copilot,
  mcp: BRAND_BG.mcp,
  kimi: BRAND_BG.kimi,
  vscode: BRAND_BG.vscode,
  windsurf: BRAND_BG.windsurf,
  trae: BRAND_BG.trae,
  lingma: BRAND_BG.lingma,
  ccswitch: BRAND_BG.ccswitch,
  download: '#0f766e',
  web: '#ea580c',
  miniapp: '#07c160',
  mobile: '#2563eb',
  image: '#db2777',
  rag: '#0d9488',
  agent: '#ea580c',
  prompt: '#e8891c',
  security: '#475569',
  office: '#2563eb',
  biz: '#b45309',
  model: '#0e7490',
  default: '#334155',
}

export const ICON_LABEL: Record<IconKey, string> = {
  cursor: 'Cursor',
  claude: 'Claude',
  openai: 'OpenAI',
  gemini: 'Gemini',
  copilot: 'Copilot',
  mcp: 'MCP',
  kimi: 'Kimi',
  vscode: 'VS Code',
  windsurf: 'Windsurf',
  trae: 'Trae',
  lingma: '通义灵码',
  ccswitch: 'CC Switch',
  download: '下载安装',
  web: '做网页',
  miniapp: '小程序',
  mobile: '做 App',
  image: 'AI 生图',
  rag: '知识库',
  agent: 'Agent',
  prompt: '提示词',
  security: '安全',
  office: '办公',
  biz: '落地',
  model: '模型认知',
  default: 'AI 教程',
}

function Mark({ k }: { k: IconKey }) {
  switch (k) {
    case 'download':
      return (
        <>
          <path fill="#fff" d="M11 4h2v8.2h3.2L12 17.5 7.8 12.2H11V4z" />
          <path fill="#fff" d="M5.5 18.2h13v2H5.5z" />
        </>
      )
    case 'web':
      return (
        <>
          <rect x="4.5" y="5.5" width="15" height="12" rx="1.6" fill="#fff" />
          <rect x="4.5" y="5.5" width="15" height="2.8" fill="#ea580c" />
          <circle cx="6.6" cy="6.9" r="0.55" fill="#fff" />
          <circle cx="8.2" cy="6.9" r="0.55" fill="#fff" opacity="0.7" />
          <rect x="7" y="11" width="6" height="1.2" rx="0.4" fill="#ea580c" />
          <rect x="7" y="13.4" width="10" height="1" rx="0.4" fill="#ea580c" opacity="0.45" />
        </>
      )
    case 'miniapp':
      return (
        <>
          <rect x="7" y="3.8" width="10" height="16.4" rx="2.2" fill="#fff" />
          <circle cx="12" cy="17.8" r="0.9" fill={ICON_BG.miniapp} />
          <path fill={ICON_BG.miniapp} d="M9.2 7.2h5.6v5.6H9.2z" opacity="0.85" />
        </>
      )
    case 'mobile':
      return (
        <>
          <rect x="7.2" y="3.5" width="9.6" height="17" rx="1.8" fill="#fff" />
          <rect x="8.6" y="6.2" width="6.8" height="10" rx="0.6" fill={ICON_BG.mobile} opacity="0.85" />
          <circle cx="12" cy="18.2" r="0.7" fill={ICON_BG.mobile} />
        </>
      )
    case 'image':
      return (
        <>
          <rect x="4.5" y="5.5" width="15" height="13" rx="1.8" fill="#fff" />
          <circle cx="9" cy="10" r="1.6" fill={ICON_BG.image} />
          <path fill={ICON_BG.image} d="M5.8 16.2 9.5 12l2.8 2.4 2.2-2.6 3.7 4.4H5.8z" />
        </>
      )
    case 'rag':
      return <path fill="#fff" d="M7 5.5h10v2.2H7V5.5zm0 4.2h7v2.2H7V9.7zm0 4.2h10v2.2H7v-2.2zM5 5.8h1.2v12.4H5V5.8z" />
    case 'agent':
      return (
        <>
          <rect x="7" y="7" width="10" height="9" rx="2.2" fill="#fff" />
          <circle cx="10.2" cy="11" r="1.1" fill="#ea580c" />
          <circle cx="13.8" cy="11" r="1.1" fill="#ea580c" />
          <path fill="#fff" d="M10.5 4.5h3v2.2h-3zM8.2 16.5h7.6v1.8H8.2z" />
        </>
      )
    case 'prompt':
      return (
        <path
          fill="#fff"
          d="M6.5 6.2h11v8.2H13l-2.8 2.6v-2.6H6.5V6.2zm2.2 2.4v1.6h6.6V8.6H8.7zm0 3v1.6h4.4v-1.6H8.7z"
        />
      )
    case 'security':
      return (
        <path fill="#fff" d="M12 3.8 18 6.2v5.2c0 3.8-2.5 6.4-6 7.8-3.5-1.4-6-4-6-7.8V6.2L12 3.8zm0 3.2v8.8c2.2-.9 3.8-2.7 3.8-5.2V8.2L12 7z" />
      )
    case 'office':
      return <path fill="#fff" d="M6 5.5h8.5v2H6v-2zm0 3.5h12v2H6v-2zm0 3.5h10v2H6v-2zm0 3.5h12v2H6v-2z" />
    case 'biz':
      return <path fill="#fff" d="M8 8V5.5h8V8h3v10.5H5V8h3zm2-1.5v1.5h4V6.5h-4zM7.5 10.5v6h9v-6h-9z" />
    case 'model':
      return (
        <path fill="#fff" d="M12 4 18 8v8l-6 4-6-4V8l6-4zm0 2.3L8.2 8.8v6.4L12 17.7l3.8-2.5V8.8L12 6.3z" />
      )
    default:
      return (
        <path fill="#fff" d="M12 4.5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15zm0 2.2a5.3 5.3 0 1 0 0 10.6 5.3 5.3 0 0 0 0-10.6z" />
      )
  }
}

export function resolveIconKey(id: string, category?: string): IconKey {
  const s = id.toLowerCase()
  if (s.includes('cursor')) return 'cursor'
  if (s.includes('claude') || s.includes('anthropic')) return 'claude'
  if (s.includes('cc-switch') || s.includes('ccswitch')) return 'ccswitch'
  if (s.includes('lingma') || s.includes('tongyi')) return 'lingma'
  if (s.includes('codex')) return 'openai'
  if (s.includes('openai') || s.startsWith('api-openai') || s.includes('domain-api')) return 'openai'
  if (s.includes('gemini')) return 'gemini'
  if (s.includes('copilot')) return 'copilot'
  if (s.includes('windsurf')) return 'windsurf'
  if (s.includes('trae')) return 'trae'
  if (s.includes('mcp')) return 'mcp'
  if (s.includes('kimi')) return 'kimi'
  if (s.includes('vscode') || s.includes('continue')) return 'vscode'
  if (s.includes('download') || s.includes('account-setup') || s.includes('what-is') || s.includes('first-chat') || s.includes('first-week'))
    return 'download'
  if (s.includes('landing') || s.includes('website') || s.includes('build-web')) return 'web'
  if (s.includes('miniprogram') || s.includes('mini-program')) return 'miniapp'
  if (s.includes('build-app') || s.endsWith('-app') || s === 'ai-build-app') return 'mobile'
  if (s.includes('image') || s.includes('brand')) return 'image'
  if (s.includes('rag') || s.includes('vector')) return 'rag'
  if (s.includes('agent') || s.includes('workflow') || s.includes('tool-pick')) return 'agent'
  if (s.includes('prompt')) return 'prompt'
  if (s.includes('sec') || s.includes('keys') || s.includes('cost')) return 'security'
  if (s.includes('office') || s.includes('daily')) return 'office'
  if (s.includes('localize') || s.includes('hanhua') || s.includes('chinese-ui')) return 'vscode'
  if (s.startsWith('api-')) return 'openai'
  if (category === '入门起步') return 'download'
  if (category === '国产软件') return 'vscode'
  if (category === '外国软件') return 'cursor'
  if (category === '工具用法') return 'agent'
  if (category === '前端 / JS') return 'web'
  if (category === '小程序与 App') return 'miniapp'
  if (category === 'AI生图') return 'image'
  if (category === 'MCP与Agent') return 'mcp'
  if (category === '提示词工程') return 'prompt'
  if (category === '安全与成本') return 'security'
  if (category === '办公提效') return 'office'
  if (category === 'API与配置') return 'openai'
  return 'default'
}

export function AiIcon({
  icon,
  size = 40,
  className,
  label,
}: {
  icon: IconKey
  size?: number
  className?: string
  label?: string
}) {
  const isBrand = BRAND_ICON_KEYS.has(icon)
  return (
    <span
      className={`ai-icon ${className ?? ''}`}
      style={{ width: size, height: size, background: ICON_BG[icon] }}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
    >
      {isBrand ? (
        <BrandMark
          brand={icon as BrandKey}
          fill={icon === 'vscode' ? undefined : '#fff'}
          className="ai-icon__brand"
        />
      ) : (
        <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58}>
          <Mark k={icon} />
        </svg>
      )}
    </span>
  )
}

export function CourseIcon({
  id,
  category,
  size = 56,
  className,
}: {
  id: string
  category?: string
  size?: number
  className?: string
}) {
  return <AiIcon icon={resolveIconKey(id, category)} size={size} className={className} />
}
