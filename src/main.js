import './style.css'
import { projects } from './projects.js'

const app = document.querySelector('#app')

function escapeHtml(s) {
  const div = document.createElement('div')
  div.textContent = s
  return div.innerHTML
}

function typeLabel(type) {
  if (type === 'app') return 'App'
  if (type === 'tool') return 'Tool'
  return 'Website'
}

function getHashProjectId() {
  const raw = window.location.hash.replace(/^#/, '')
  const m = raw.match(/^\/project\/([^/]+)/)
  return m ? decodeURIComponent(m[1]) : null
}

function cardSummary(project) {
  if (project.summary) return project.summary
  const p = project.paragraphs?.[0] || project.description
  if (!p) return ''
  return p.length > 220 ? `${p.slice(0, 217).trim()}…` : p
}

function renderHighlights(items) {
  if (!items?.length) return ''
  const lis = items.map((t) => `<li>${escapeHtml(t)}</li>`).join('')
  return `<ul class="magazine__highlights-list" aria-label="Highlights">${lis}</ul>`
}

function buildMagazineChunks(project) {
  const paras =
    project.paragraphs?.length
      ? project.paragraphs
      : project.description
        ? [project.description]
        : []
  const imgs = [project.image, ...(project.detailImages || [])].filter(Boolean)
  const chunks = []

  if (paras.length === 0) {
    if (imgs[0]) chunks.push({ kind: 'figure', src: imgs[0], variant: 'hero' })
    if (imgs.length > 1) chunks.push({ kind: 'gallery', images: imgs.slice(1) })
    return chunks
  }

  if (paras[0]) chunks.push({ kind: 'p', lead: true, text: paras[0] })
  if (imgs[0]) chunks.push({ kind: 'figure', src: imgs[0], variant: 'hero' })

  let pi = 1
  let ii = 1
  while (pi < paras.length) {
    chunks.push({ kind: 'p', lead: false, text: paras[pi] })
    pi++
    if (ii < imgs.length) {
      chunks.push({ kind: 'figure', src: imgs[ii], variant: 'inline' })
      ii++
    }
  }
  if (ii < imgs.length) {
    chunks.push({ kind: 'gallery', images: imgs.slice(ii) })
  }
  return chunks
}

function renderMagazineBody(project, chunks) {
  const title = escapeHtml(project.title)
  let shot = 0
  return chunks
    .map((c) => {
      if (c.kind === 'p') {
        const cls = c.lead ? 'magazine__p magazine__p--lead' : 'magazine__p'
        return `<p class="${cls}">${escapeHtml(c.text)}</p>`
      }
      if (c.kind === 'figure') {
        shot++
        const isHero = c.variant === 'hero'
        return `
      <figure class="magazine__figure ${isHero ? 'magazine__figure--hero' : 'magazine__figure--inline'}">
        <img
          src="${escapeHtml(c.src)}"
          alt="${title} — ${isHero ? 'cover' : `screenshot ${shot}`}"
          width="1200"
          height="800"
          loading="${isHero ? 'eager' : 'lazy'}"
          decoding="async"
        />
      </figure>`
      }
      if (c.kind === 'gallery') {
        const grid = c.images
          .map((src, i) => {
            shot++
            return `
        <figure class="magazine__gallery-item">
          <img
            src="${escapeHtml(src)}"
            alt="${title} — screenshot ${shot}"
            width="900"
            height="600"
            loading="lazy"
            decoding="async"
          />
        </figure>`
          })
          .join('')
        return `<div class="magazine__gallery">${grid}</div>`
      }
      return ''
    })
    .join('')
}

function renderMagazineArticle(project) {
  const label = typeLabel(project.type)
  const tags =
    project.tags
      ?.map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
      .join('') ?? ''
  const subtitle = project.subtitle
    ? `<p class="magazine__deck">${escapeHtml(project.subtitle)}</p>`
    : ''
  const actions = renderLinks(project, { forDetail: true })
  const actionsHtml = actions
    ? `<div class="magazine__actions">${actions}</div>`
    : ''
  const chunks = buildMagazineChunks(project)
  const body = renderMagazineBody(project, chunks)
  const highlights = project.highlights?.length
    ? `<section class="magazine__section magazine__section--highlights" aria-labelledby="highlights-heading">
        <h2 id="highlights-heading" class="magazine__section-title">At a glance</h2>
        ${renderHighlights(project.highlights)}
      </section>`
    : ''
  const stack = project.stack
    ? `<section class="magazine__section magazine__section--stack" aria-labelledby="stack-heading">
        <h2 id="stack-heading" class="magazine__section-title">Stack &amp; constraints</h2>
        <p class="magazine__stack-text">${escapeHtml(project.stack)}</p>
      </section>`
    : ''

  return `
    <article class="magazine" data-id="${escapeHtml(project.id)}">
      <header class="magazine__header">
        <span class="magazine__type">${label}</span>
        <p class="magazine__kicker">${escapeHtml(project.tagline)}</p>
        <h1 class="magazine__headline">${escapeHtml(project.title)}</h1>
        ${subtitle}
      </header>
      <div class="magazine__body">
        ${body}
      </div>
      ${highlights}
      ${stack}
      <footer class="magazine__footer">
        <div class="magazine__tags">${tags}</div>
        ${actionsHtml}
      </footer>
    </article>
  `
}

function renderLinks(project, { forDetail } = { forDetail: false }) {
  const rows = []
  const detailHref = `#/project/${encodeURIComponent(project.id)}`
  if (!forDetail) {
    rows.push(
      `<a class="project__link project__link--primary" href="${detailHref}">View details</a>`
    )
  }
  const live =
    project.liveUrl ||
    project.links?.find((l) => /^https?:\/\//i.test(l.href))?.href
  if (live && /^https?:\/\//i.test(live)) {
    rows.push(
      `<a class="project__link${forDetail ? ' project__link--primary' : ''}" href="${escapeHtml(live)}" target="_blank" rel="noreferrer">Visit live</a>`
    )
  }
  if (forDetail && project.links?.length) {
    for (const l of project.links) {
      if (!l.href || l.href === '#' || l.href === live) continue
      if (/^https?:\/\//i.test(l.href)) {
        rows.push(
          `<a class="project__link" href="${escapeHtml(l.href)}" target="_blank" rel="noreferrer">${escapeHtml(l.label)}</a>`
        )
      }
    }
  }
  return rows.join('')
}

function projectArticle(project) {
  const label = typeLabel(project.type)
  const tags =
    project.tags
      ?.map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
      .join('') ?? ''
  const subtitle = project.subtitle
    ? `<p class="project__subtitle">${escapeHtml(project.subtitle)}</p>`
    : ''
  const stack = project.stack
    ? `<p class="project__stack">${escapeHtml(project.stack)}</p>`
    : ''
  const actions = renderLinks(project, { forDetail: true })
  const actionsHtml = actions
    ? `<div class="project__actions project__actions--detail">${actions}</div>`
    : ''
  const gallery = renderDetailGallery(project)

  return `
    <article class="project project--detail" data-id="${escapeHtml(project.id)}">
      <div class="project__media">
        <img
          src="${escapeHtml(project.image)}"
          alt="${escapeHtml(project.title)}"
          width="1200"
          height="800"
          loading="eager"
          decoding="async"
        />
        <span class="project__type">${label}</span>
      </div>
      ${gallery}
      <div class="project__body">
        <p class="project__eyebrow">${escapeHtml(project.tagline)}</p>
        <h1 class="project__title">${escapeHtml(project.title)}</h1>
        ${subtitle}
        ${renderParagraphs(project)}
        ${renderHighlights(project.highlights)}
        ${stack}
        <div class="project__tags">${tags}</div>
        ${actionsHtml}
      </div>
    </article>
  `
}

function projectCard(project, index) {
  const align = index % 2 === 0 ? 'project-card--left' : 'project-card--right'
  const label = typeLabel(project.type)
  const detailHref = `#/project/${encodeURIComponent(project.id)}`
  const summary = escapeHtml(cardSummary(project))
  const tags = (project.tags || [])
    .slice(0, 6)
    .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
    .join('')
  const cta = renderLinks(project, { forDetail: false })

  return `
    <article class="project-card ${align}" data-id="${escapeHtml(project.id)}">
      <a class="project-card__hit" href="${detailHref}">
        <div class="project-card__media reveal">
          <img
            src="${escapeHtml(project.image)}"
            alt="${escapeHtml(project.title)}"
            width="900"
            height="600"
            loading="lazy"
            decoding="async"
          />
          <span class="project__type">${label}</span>
        </div>
        <div class="project-card__body reveal reveal--delay">
          <p class="project__eyebrow">${escapeHtml(project.tagline)}</p>
          <h2 class="project-card__title">${escapeHtml(project.title)}</h2>
          <p class="project-card__summary">${summary}</p>
          <div class="project-card__tags">${tags}</div>
        </div>
      </a>
      <div class="project-card__cta">${cta}</div>
    </article>
  `
}

function renderHero() {
  return `
    <header class="hero">
      <p class="hero__eyebrow">Portfolio</p>
      <h1 class="hero__title">Apps &amp; sites I’ve built</h1>
      <p class="hero__lede">
        Scroll down once through the list—each project appears a single time. Open any card for screenshots and the full write-up.
      </p>
    </header>
  `
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible')
        revealObserver.unobserve(e.target)
      }
    }
  },
  { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
)

function observeReveals(nodes) {
  nodes.forEach((el) => {
    if (el.hasAttribute('data-reveal-watched')) return
    el.setAttribute('data-reveal-watched', '')
    revealObserver.observe(el)
  })
}

function renderProjectCards() {
  const stream = document.querySelector('#projects-stream')
  if (!stream) return

  const html = projects.map((p, i) => projectCard(p, i)).join('')
  stream.innerHTML = html
  observeReveals(stream.querySelectorAll('.reveal:not([data-reveal-watched])'))
}

function renderDetail(project) {
  document.title = `${project.title} — Portfolio`

  app.innerHTML = `
    <div class="detail">
      <a class="detail__back" href="#/">← All projects</a>
      ${renderMagazineArticle(project)}
      <footer class="footer footer--detail">
        <p>© ${new Date().getFullYear()}</p>
      </footer>
    </div>
  `
  window.scrollTo(0, 0)
}

function renderLanding() {
  document.title = 'Projects — Portfolio'

  app.innerHTML = `
    ${renderHero()}
    <main class="stream">
      <div id="projects-stream"></div>
      <footer class="footer">
        <p>© ${new Date().getFullYear()}</p>
      </footer>
    </main>
  `

  renderProjectCards()
}

function route() {
  const id = getHashProjectId()
  if (id) {
    const project = projects.find((p) => p.id === id)
    if (project) {
      renderDetail(project)
      return
    }
  }
  renderLanding()
}

window.addEventListener('hashchange', route)
route()
