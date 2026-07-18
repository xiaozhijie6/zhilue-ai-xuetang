import { ICON_BG, resolveIconKey } from './AiIcon'
import {
  BrandMark,
  BRAND_BG,
  BRAND_LABEL,
  resolveBrand,
  type BrandKey,
} from './BrandMark'

/** 非软件课：内容艺术字 */
const COVER_GLYPHS: Record<string, string> = {
  'ai-what-is': '认知',
  'ai-first-chat': '对话',
  'ai-download-guide': '下载',
  'ai-account-setup': '账号',
  'newbie-first-week': '入门',
  'prompt-basics': '提示',
  'ai-daily-office': '办公',
  'api-keys-security': '密钥',
  'tool-pick-compare': '选型',
  'prompt-system': '系统',
  'rag-basics': '检索',
  'agent-tools': '工具',
  'ai-build-website': '网页',
  'ai-landing-page': '落地',
  'ai-build-miniprogram': '小程',
  'ai-build-app': '应用',
  'ai-image-gen': '生图',
  'ai-image-brand': '品牌',
  'hallucination-defense': '幻觉',
  'cost-control': '成本',
}

const CATEGORY_GLYPHS: Record<string, string> = {
  下载与入门: '入门',
  AI编程工具与智能体安装: '安装',
  AI编程工具: '用法',
  用AI做产品: '作品',
  AI生图: '生图',
  提示词工程: '提示',
  API与配置: '接口',
  MCP与工具协议: '协议',
  安全合规: '安全',
}

function coverGlyph(id: string, category: string, title?: string): string {
  if (COVER_GLYPHS[id]) return COVER_GLYPHS[id]
  if (CATEGORY_GLYPHS[category]) return CATEGORY_GLYPHS[category]
  if (title) {
    const cleaned = title.replace(/[（(].*$/, '').replace(/\s+/g, '')
    if (cleaned.length >= 2) return cleaned.slice(0, 2)
  }
  return '知略'
}

function variantIndex(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return h % 4
}

function brandCaption(brand: BrandKey, title?: string, category?: string) {
  return {
    name: BRAND_LABEL[brand],
    sub: title || category || BRAND_LABEL[brand],
  }
}

/** 教程封面：软件课用官网图标，其余用内容艺术字 */
export function CourseCover({
  id,
  category,
  level,
  hot,
  compact,
  title,
}: {
  id: string
  category: string
  teacher?: string
  level?: string
  hot?: boolean
  compact?: boolean
  title?: string
}) {
  const brand = resolveBrand(id)
  const icon = resolveIconKey(id, category)
  const bg = brand ? BRAND_BG[brand] : ICON_BG[icon]
  const glyph = coverGlyph(id, category, title)
  const variant = variantIndex(id)
  const caption = brand ? brandCaption(brand, title, category) : { name: glyph, sub: title || category }

  return (
    <div
      className={`course-cover ${brand ? 'course-cover--brand' : `course-cover--v${variant}`} ${compact ? 'course-cover--compact' : ''}`}
      style={{ ['--cover' as string]: bg }}
      aria-hidden={compact ? true : undefined}
    >
      {brand ? (
        <div className="course-cover__brand">
          <span className="course-cover__logo-plate">
            <BrandMark
              brand={brand}
              fill={brand === 'vscode' ? undefined : BRAND_BG[brand]}
              className="course-cover__logo"
            />
          </span>
        </div>
      ) : (
        <div className="course-cover__art">
          <span className="course-cover__watermark">{glyph}</span>
          <span className="course-cover__glyph">{glyph}</span>
          {!compact && <span className="course-cover__en">{category}</span>}
        </div>
      )}
      {!compact && (
        <>
          <div className="course-cover__tags">
            {hot && <em className="course-cover__hot">热门</em>}
            {level && <em>{level}</em>}
          </div>
          <div className="course-cover__caption">
            <strong>{caption.name}</strong>
            <span>{caption.sub}</span>
          </div>
        </>
      )}
    </div>
  )
}
