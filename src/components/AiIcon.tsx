/** AI 工具 / 主题图标占位（示意色与形态，作封面用） */

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
  | 'anthropic'
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
  anthropic: '#c4845a',
  rag: '#0d9488',
  agent: '#ea580c',
  prompt: '#e8891c',
  security: '#475569',
  office: '#2563eb',
  biz: '#b45309',
  model: '#6366f1',
  default: '#334155',
}

function Mark({ k }: { k: IconKey }) {
  switch (k) {
    case 'cursor':
      return (
        <path
          fill="#fff"
          d="M8 4.5 18 14.2l-4.2.7 2.4 5.6-2.6 1.1-2.4-5.5-3.7 3.5V4.5z"
        />
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
          d="M8 5h3.2v3.2H8V5zm4.8 0H16v3.2h-3.2V5zM8 9.8h3.2V13H8V9.8zm4.8 0H16V13h-3.2V9.8zM11.2 13.8h1.6V16h-1.6v-2.2zM6.2 7.8H8v1.6H6.2V7.8zm9.8 0H18v1.6h-2V7.8z"
        />
      )
    case 'kimi':
      return (
        <text x="12" y="15.2" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800" fontFamily="system-ui">
          K
        </text>
      )
    case 'vscode':
      return (
        <path fill="#fff" d="M5.5 7.2 10 4.8v14.4l-4.5-2.4V7.2zm13 1.2L14 6.2v11.6l4.5-2.2V8.4zM11 5.5l7.5 3.8v5.4L11 18.5V5.5z" />
      )
    case 'windsurf':
      return (
        <path
          fill="#fff"
          d="M4.5 14c2.2-1.2 4-3.4 5.2-6.2C11 10.6 12.8 12.8 15 14c-2.4.4-4.4 1.4-6 3-1.6-1.6-3.6-2.6-6-3zM14 7.5c1.2 1.8 2.6 3 4.5 3.8-1.4.6-2.6 1.6-3.5 3-1-1.4-2.2-2.4-3.6-3 1-1.2 1.9-2.5 2.6-3.8z"
        />
      )
    case 'anthropic':
      return (
        <path fill="#fff" d="M12 4.5 16.8 19h-2.4l-1-2.8H10.6l-1 2.8H7.2L12 4.5zm0 4.2-1.5 4.3h3L12 8.7z" />
      )
    case 'rag':
      return (
        <path
          fill="#fff"
          d="M7 5.5h10v2.2H7V5.5zm0 4.2h7v2.2H7V9.7zm0 4.2h10v2.2H7v-2.2zM5 5.8h1.2v12.4H5V5.8z"
        />
      )
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
        <path
          fill="#fff"
          d="M12 3.8 18 6.2v5.2c0 3.8-2.5 6.4-6 7.8-3.5-1.4-6-4-6-7.8V6.2L12 3.8zm0 3.2v8.8c2.2-.9 3.8-2.7 3.8-5.2V8.2L12 7z"
        />
      )
    case 'office':
      return (
        <path
          fill="#fff"
          d="M6 5.5h8.5v2H6v-2zm0 3.5h12v2H6v-2zm0 3.5h10v2H6v-2zm0 3.5h12v2H6v-2z"
        />
      )
    case 'biz':
      return (
        <path
          fill="#fff"
          d="M8 8V5.5h8V8h3v10.5H5V8h3zm2-1.5v1.5h4V6.5h-4zM7.5 10.5v6h9v-6h-9z"
        />
      )
    case 'model':
      return (
        <path
          fill="#fff"
          d="M12 4 18 8v8l-6 4-6-4V8l6-4zm0 2.3L8.2 8.8v6.4L12 17.7l3.8-2.5V8.8L12 6.3z"
        />
      )
    default:
      return (
        <path
          fill="#fff"
          d="M12 4.5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15zm0 2.2a5.3 5.3 0 1 0 0 10.6 5.3 5.3 0 0 0 0-10.6z"
        />
      )
  }
}

export function resolveIconKey(id: string, category?: string): IconKey {
  const s = id.toLowerCase()
  if (s.includes('cursor')) return 'cursor'
  if (s.includes('claude') || s.includes('anthropic') || s.includes('ccswitch')) return 'claude'
  if (s.includes('codex') || s.includes('openai') || s.startsWith('api-openai')) return 'openai'
  if (s.includes('gemini')) return 'gemini'
  if (s.includes('copilot') || s.includes('cody') || s.includes('jetbrains') || s.includes('amazon'))
    return 'copilot'
  if (s.includes('mcp')) return 'mcp'
  if (s.includes('kimi')) return 'kimi'
  if (s.includes('vscode') || s.includes('continue') || s.includes('zed')) return 'vscode'
  if (s.includes('windsurf') || s.includes('trae') || s.includes('aider') || s.includes('cline'))
    return 'windsurf'
  if (s.includes('rag') || s.includes('vector') || s.includes('chunk')) return 'rag'
  if (s.includes('agent') || s.includes('multi-agent') || s.includes('workflow') || s.includes('openhands') || s.includes('replit') || s.includes('devin'))
    return 'agent'
  if (s.includes('prompt')) return 'prompt'
  if (s.includes('sec') || s.includes('inject') || s.includes('keys')) return 'security'
  if (s.includes('office') || s.includes('excel')) return 'office'
  if (s.includes('biz') || s.includes('ind-')) return 'biz'
  if (s.includes('model') || s.includes('moe')) return 'model'
  if (s.startsWith('api-')) return 'openai'
  if (category === 'AI编程工具') return 'cursor'
  if (category === 'MCP与工具协议') return 'mcp'
  if (category === '知识库与RAG') return 'rag'
  if (category === '提示词工程') return 'prompt'
  if (category === 'Agent与自动化') return 'agent'
  if (category === '安全合规') return 'security'
  if (category === '办公提效') return 'office'
  if (category === '商业落地' || category === '行业场景') return 'biz'
  if (category === '大模型认知') return 'model'
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
