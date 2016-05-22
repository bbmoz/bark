import helpers from './helpers'
import filters from './filters'

;(function templates (_w, _hb, __h, __f) {
  const sources = {
    smart: _w.document.getElementById('templates-smart').innerHTML,
    date: _w.document.getElementById('templates-standard').innerHTML,
    active: _w.document.getElementById('templates-standard').innerHTML
  }

  function compileIntoTemplates (sources) {
    const compiledTemplates = {}

    Object.keys(sources).forEach(sourceKey => {
      compiledTemplates[sourceKey] = _hb.compile(sources[sourceKey])
    })

    return compiledTemplates
  }

  function applyFilterToContext (context, mode) {
    Object.defineProperty(context, 'barks', {
      get: __f[mode]
    })
  }

  function generateHtmlFromContext (event) {
    const command = event.data.command

    if (command === 'render-request') {
      const context = event.data.context
      const mode = event.data.mode
      const origin = event.origin || event.originalEvent.origin

      applyFilterToContext(context, mode)
      const templateHtml = compiledTemplates[mode](context)

      event.source.postMessage({
        command: 'render-response',
        templateHtml: templateHtml
      }, origin)
    }
  }

  __h.register()
  _w.addEventListener('message', generateHtmlFromContext)
  const compiledTemplates = compileIntoTemplates(sources)
}(window, Handlebars, helpers, filters))
