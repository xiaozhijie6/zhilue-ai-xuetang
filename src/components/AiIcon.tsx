/** 教程主题图标（完整 SVG，非空白占位） */

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

export const ICON_BG: Record<IconKey, string> = {
  cursor: '#1a1a1a',
  claude: '#d97757',
  openai: '#10a37f',
  gemini: '#4285f4',
  copilot: '#7c3aed',
  mcp: '#0f766e',
  kimi: '#1e3a5f',
  vscode: '#0078d4',
  windsurf: '#0ea5e9',
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
  windsurf: 'IDE',
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
    case 'cursor':
      return (
        <path fill="#fff" d="M8 4.5 18 14.2l-4.2.7 2.4 5.6-2.6 1.1-2.4-5.5-3.7 3.5V4.5z" />
      )
    case 'claude':
      return (
        <path
          fill="#fff"
          d="M12 3.5c.6 2.8 2.2 5 4.6 6.4-2.4 1.3-4 3.5-4.6 6.6-.6-3.1-2.2-5.3-4.6-6.6C9.8 8.5 11.4 6.3 12 3.5z"
        />
      )
    case 'openai':
      return (
        <path
          fill="#fff"
          d="M12 4.2a3.4 3.4 0 0 1 2.9 1.6 3.4 3.4 0 0 1 3.5 1.3 3.4 3.4 0 0 1 .6 3.7 3.4 3.4 0 0 1-1.6 2.9 3.4 3.4 0 0 1-1.3 3.5 3.4 3.4 0 0 1-3.7.6 3.4 3.4 0 0 1-2.9-1.6 3.4 3.4 0 0 1-3.5-1.3 3.4 3.4 0 0 1-.6-3.7 3.4 3.4 0 0 1 1.6-2.9 3.4 3.4 0 0 1 1.3-3.5 3.4 3.4 0 0 1 3.7-.6zm0 3.1a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4z"
        />
      )
    case 'gemini':
      return (
        <path
          fill="#fff"
          d="M12 3.2c.4 3.2 2.4 5.4 5.6 6-3.2.6-5.2 2.8-5.6 6-.4-3.2-2.4-5.4-5.6-6 3.2-.6 5.2-2.8 5.6-6z"
        />
      )
    case 'copilot':
      return (
        <>
          <circle cx="9" cy="10" r="2.2" fill="#fff" />
          <circle cx="15" cy="10" r="2.2" fill="#fff" />
          <path fill="#fff" d="M7.2 14.5c1.2 1.6 2.8 2.4 4.8 2.4s3.6-.8 4.8-2.4c-1.4.7-3 .9-4.8.9s-3.4-.2-4.8-.9z" />
        </>
      )
    case 'mcp':
      return (
        <path
          fill="#fff"
          d="M8 5h3.2v3.2H8V5zm4.8 0H16v3.2h-3.2V5zM8 9.8h3.2V13H8V9.8zm4.8 0H16V13h-3.2V9.8zM11.2 13.8h1.6V16h-1.6v-2.2z"
        />
      )
    case 'kimi':
      return (
        <text x="12" y="15.2" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800" fontFamily="KaiTi, 楷体, STKaiti, serif">
          K
        </text>
      )
    case 'vscode':
      return <path fill="#fff" d="M5.5 7.2 10 4.8v14.4l-4.5-2.4V7.2zm13 1.2L14 6.2v11.6l4.5-2.2V8.4zM11 5.5l7.5 3.8v5.4L11 18.5V5.5z" />
    case 'windsurf':
      return (
        <path
          fill="#fff"
          d="M4.5 14c2.2-1.2 4-3.4 5.2-6.2C11 10.6 12.8 12.8 15 14c-2.4.4-4.4 1.4-6 3-1.6-1.6-3.6-2.6-6-3z"
        />
      )
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

/** 封面用大插画：带场景元素，避免只剩一个小图标 */
export function CoverArt({ icon }: { icon: IconKey }) {
  const accent = ICON_BG[icon]
  return (
    <svg className="course-cover__scene" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`cg-${icon}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <pattern id={`grid-${icon}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#fff" strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="320" height="200" fill={`url(#grid-${icon})`} />
      <circle cx="268" cy="36" r="56" fill="#fff" fillOpacity="0.08" />
      <circle cx="40" cy="168" r="48" fill="#fff" fillOpacity="0.06" />
      <rect x="0" y="0" width="320" height="200" fill={`url(#cg-${icon})`} />

      {icon === 'download' && (
        <g transform="translate(108,42)">
          <rect x="0" y="0" width="104" height="72" rx="10" fill="#fff" fillOpacity="0.95" />
          <rect x="10" y="12" width="84" height="8" rx="4" fill={accent} opacity="0.25" />
          <rect x="10" y="28" width="56" height="8" rx="4" fill={accent} opacity="0.18" />
          <path d="M52 48v28M40 64l12 14 12-14" stroke={accent} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="28" y="88" width="48" height="6" rx="3" fill="#fff" fillOpacity="0.9" />
        </g>
      )}
      {icon === 'web' && (
        <g transform="translate(70,36)">
          <rect x="0" y="0" width="180" height="120" rx="12" fill="#fff" fillOpacity="0.96" />
          <rect x="0" y="0" width="180" height="22" rx="12" fill={accent} />
          <circle cx="14" cy="11" r="3" fill="#fff" opacity="0.9" />
          <circle cx="24" cy="11" r="3" fill="#fff" opacity="0.55" />
          <rect x="14" y="36" width="70" height="10" rx="4" fill={accent} opacity="0.85" />
          <rect x="14" y="54" width="152" height="6" rx="3" fill={accent} opacity="0.2" />
          <rect x="14" y="68" width="120" height="6" rx="3" fill={accent} opacity="0.15" />
          <rect x="14" y="88" width="48" height="18" rx="6" fill={accent} />
        </g>
      )}
      {icon === 'miniapp' && (
        <g transform="translate(118,28)">
          <rect x="0" y="0" width="84" height="144" rx="16" fill="#fff" fillOpacity="0.96" />
          <rect x="10" y="18" width="64" height="88" rx="8" fill={accent} opacity="0.15" />
          <rect x="18" y="30" width="48" height="8" rx="4" fill={accent} />
          <rect x="18" y="46" width="48" height="28" rx="6" fill={accent} opacity="0.45" />
          <rect x="18" y="82" width="30" height="6" rx="3" fill={accent} opacity="0.35" />
          <circle cx="42" cy="128" r="5" fill={accent} />
        </g>
      )}
      {icon === 'mobile' && (
        <g transform="translate(112,24)">
          <rect x="0" y="0" width="96" height="152" rx="18" fill="#fff" fillOpacity="0.96" />
          <rect x="10" y="20" width="76" height="100" rx="8" fill={accent} opacity="0.2" />
          <rect x="18" y="32" width="60" height="12" rx="4" fill={accent} />
          <rect x="18" y="54" width="40" height="40" rx="8" fill={accent} opacity="0.5" />
          <rect x="62" y="54" width="16" height="40" rx="6" fill={accent} opacity="0.3" />
          <circle cx="48" cy="136" r="5" fill={accent} />
        </g>
      )}
      {icon === 'image' && (
        <g transform="translate(68,40)">
          <rect x="0" y="10" width="100" height="90" rx="12" fill="#fff" fillOpacity="0.9" transform="rotate(-8 50 55)" />
          <rect x="40" y="0" width="120" height="100" rx="12" fill="#fff" fillOpacity="0.98" />
          <circle cx="78" cy="36" r="12" fill={accent} opacity="0.7" />
          <path d="M48 88 78 52l22 20 18-16 24 32H48z" fill={accent} opacity="0.55" />
        </g>
      )}
      {icon === 'cursor' && (
        <g transform="translate(72,40)">
          <rect x="0" y="0" width="176" height="112" rx="12" fill="#fff" fillOpacity="0.1" stroke="#fff" strokeOpacity="0.35" />
          <rect x="12" y="14" width="72" height="84" rx="8" fill="#fff" fillOpacity="0.12" />
          <rect x="96" y="14" width="68" height="36" rx="8" fill="#fff" fillOpacity="0.92" />
          <path d="M118 28l22 18-8 2 5 12-6 3-5-11-8 7z" fill={accent} />
          <rect x="96" y="60" width="68" height="8" rx="4" fill="#fff" fillOpacity="0.35" />
          <rect x="96" y="76" width="48" height="8" rx="4" fill="#fff" fillOpacity="0.22" />
        </g>
      )}
      {!['download', 'web', 'miniapp', 'mobile', 'image', 'cursor'].includes(icon) && (
        <g transform="translate(112,52)">
          <rect x="0" y="0" width="96" height="96" rx="24" fill="#fff" fillOpacity="0.95" />
          <g transform="translate(24,24) scale(2)">
            <Mark k={icon} />
          </g>
        </g>
      )}
    </svg>
  )
}

export function resolveIconKey(id: string, category?: string): IconKey {
  const s = id.toLowerCase()
  if (s.includes('cursor')) return 'cursor'
  if (s.includes('claude') || s.includes('anthropic')) return 'claude'
  if (s.includes('cc-switch') || s.includes('ccswitch')) return 'mcp'
  if (s.includes('lingma') || s.includes('tongyi')) return 'openai'
  if (s.includes('codex')) return 'openai'
  if (s.includes('openai') || s.startsWith('api-openai') || s.includes('domain-api')) return 'openai'
  if (s.includes('gemini')) return 'gemini'
  if (s.includes('copilot')) return 'copilot'
  if (s.includes('windsurf')) return 'windsurf'
  if (s.includes('trae')) return 'cursor'
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
  if (s.startsWith('api-')) return 'openai'
  if (category === '下载与入门') return 'download'
  if (category === 'AI编程工具与智能体安装') return 'cursor'
  if (category === 'AI编程工具') return 'agent'
  if (category === '用AI做产品') return 'web'
  if (category === 'AI生图') return 'image'
  if (category === 'MCP与工具协议') return 'mcp'
  if (category === '提示词工程') return 'prompt'
  if (category === '安全合规') return 'security'
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
  return (
    <span
      className={`ai-icon ${className ?? ''}`}
      style={{ width: size, height: size, background: ICON_BG[icon] }}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
    >
      <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58}>
        <Mark k={icon} />
      </svg>
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
