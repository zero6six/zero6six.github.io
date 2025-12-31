// 本代码由 Gemini 3 Pro Agent 生成
import { QuartzEmitterPlugin } from "../types"
import { QuartzComponentProps } from "../../components/types"
import HeaderConstructor from "../../components/Header"
import BodyConstructor from "../../components/Body"
import { pageResources, renderPage } from "../../components/renderPage"
import { FullPageLayout } from "../../cfg"
import { FullSlug } from "../../util/path"
import { defaultListPageLayout, sharedPageComponents } from "../../../quartz.layout"
import { ArchiveContent, TableOfContents } from "../../components"
import { write } from "./helpers"
import { getDate } from "../../components/Date"
import { i18n } from "../../i18n"

export const ArchivePage: QuartzEmitterPlugin<Partial<FullPageLayout>> = (userOpts) => {
  const opts: FullPageLayout = {
    ...sharedPageComponents,
    ...defaultListPageLayout,
    pageBody: ArchiveContent(),
    right: [TableOfContents()],
    ...userOpts,
  }

  const { head: Head, header, beforeBody, pageBody, afterBody, left, right, footer: Footer } = opts
  const Header = HeaderConstructor()
  const Body = BodyConstructor()

  return {
    name: "ArchivePage",
    getQuartzComponents() {
      return [Head, Header, Body, ...header, ...beforeBody, pageBody, ...afterBody, ...left, ...right, Footer]
    },
    async *emit(ctx, content, resources) {
      const cfg = ctx.cfg.configuration
      const slug = "archive" as FullSlug
      const title = i18n(cfg.locale).pages.archive.title

      const allFiles = content.map((c) => c[1].data)
      
      const years = new Set<number>()
      allFiles.forEach(file => {
          const date = getDate(cfg, file)
          if (date) {
              years.add(date.getFullYear())
          }
      })
      const sortedYears = Array.from(years).sort((a, b) => b - a)
      
      const toc = sortedYears.map(year => ({
          depth: 2,
          text: year.toString(),
          slug: year.toString()
      }))

      const fileData = {
          slug,
          frontmatter: {
              title,
              tags: [],
          },
          toc, 
          collapseToc: false,
      }

      const externalResources = pageResources(slug, resources)
      const componentData: QuartzComponentProps = {
        ctx,
        fileData: fileData as any,
        externalResources,
        cfg,
        children: [],
        tree: { type: 'root', children: [] },
        allFiles,
      }

      const rendered = renderPage(cfg, slug, componentData, opts, externalResources)
      yield write({
        ctx,
        content: rendered,
        slug,
        ext: ".html",
      })
    }
  }
}
