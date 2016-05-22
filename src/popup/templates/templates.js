import { window, Handlebars } from './../../globals'
import helpers from './helpers'
import filters from './filters'

function Templates (sources) {
  this.templates = this.compileIntoTemplates(sources)
  helpers.register()
  window.addEventListener('message', this.generateHtmlFromContext)
}

Templates.prototype.compileIntoTemplates = sources => {
  const templates = {}
  Object.keys(sources).forEach(sourceKey => {
    templates[sourceKey] = Handlebars.compile(sources[sourceKey])
  })
  return templates
}

Templates.prototype.generateHtmlFromContext = event => {
  if (event.data.command === 'render-request') {
    const context = event.data.context
    const mode = event.data.mode
    const origin = event.origin || event.originalEvent.origin

    applyFilterToContext(context, mode)
    const templateHtml = this.templates[mode](context)

    event.source.postMessage({
      command: 'render-response',
      templateHtml: templateHtml
    }, origin)
  }
}

function applyFilterToContext (context, mode) {
  Object.defineProperty(context, 'barks', {
    get: filters[mode]
  })
}

export default Templates
