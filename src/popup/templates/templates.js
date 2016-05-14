const templates = (function templates () {
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
      templates[sourceKey] = _h.compile(sources[sourceKey])
    })
    return templates
  }

  return compileIntoTemplates(sources)
}())

export default templates