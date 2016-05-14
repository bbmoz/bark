const templates = (function templates (_hb) {
  const sources = {
    active: `
      {{#active-list barks}}
        {{name}}
      {{/active-list}}
    `,
    date: `
      {{#date-list barks}}
        {{name}}
      {{/date-list}}
    `,
    smart: `
      {{#smart-list barks}}
        {{name}}
      {{/smart-list}}
    `
  }

  function compileIntoTemplates (sources) {
    const templates = {}
    Object.keys(sources).forEach(sourceKey => {
      templates[sourceKey] = _hb.compile(sources[sourceKey])
    })
    return templates
  }

  return compileIntoTemplates(sources)
}(Handlebars))

export default templates
