// 本代码由 Gemini 3 Pro Agent 生成
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { PageList } from "../PageList"
import { i18n } from "../../i18n"
import { QuartzPluginData } from "../../plugins/vfile"
import { getDate } from "../Date"
import style from "../styles/listPage.scss"

const ArchiveContent: QuartzComponent = (props: QuartzComponentProps) => {
  const { allFiles, cfg } = props
  
  // Filter and sort
  const pages = allFiles.sort((a, b) => {
      const d1 = getDate(cfg, a)
      const d2 = getDate(cfg, b)
      return (d2?.getTime() ?? 0) - (d1?.getTime() ?? 0)
  })

  // Group by year
  const pagesByYear = new Map<number, QuartzPluginData[]>()
  pages.forEach(page => {
      const date = getDate(cfg, page)
      if (date) {
          const year = date.getFullYear()
          if (!pagesByYear.has(year)) {
              pagesByYear.set(year, [])
          }
          pagesByYear.get(year)!.push(page)
      }
  })

  const years = Array.from(pagesByYear.keys()).sort((a, b) => b - a)

  return (
    <div class="popover-hint">
      <article class="popover-hint">
        <p>{i18n(cfg.locale).pages.archive.totalCount({ count: pages.length })}</p>
        {years.map(year => (
            <div>
                <h2 id={year.toString()}>{year}</h2>
                <div class="page-listing">
                    <PageList {...props} allFiles={pagesByYear.get(year)!} />
                </div>
            </div>
        ))}
      </article>
    </div>
  )
}

ArchiveContent.css = style

export default (() => ArchiveContent) satisfies QuartzComponentConstructor
