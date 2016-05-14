import helpers from './templates/helpers'
import templates from './templates/templates'

;(function popup (_c, _w, _hb, __h, __t) {
  function addToBarks (pageUrl) {
    _c.storage.sync.get('barks', barks => {
      const newBarks = barks instanceof Array ? barks.concat(pageUrl) : [pageUrl]
      _c.storage.sync.set({
        'barks': newBarks
      })
    })
  }

  function updateBadgeNumNewBarks (amount) {
    _c.browserAction.getBadgeText(badgeText => {
      const newBadgeText = badgeText ? +badgeText + amount : 0
      _c.browserAction.setBadgeText({
        text: newBadgeText
      })
    })
  }

  function addCurPageUrlToBarks () {
    _c.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, tabs => {
      const curPageUrl = tabs[0].url
      addToBarks(curPageUrl)
    })
  }

  function registerHandlebarsHelpers () {
    Object.keys(__h).forEach(helperKey => {
      _hb.registerHelper(helperKey, __h[helperKey])
    })
  }

  _c.runtime.onMessage.addListener(msg => {
    if (msg === '+') {
      updateBadgeNumNewBarks(1)
      addCurPageUrlToBarks()
    }
  })

  registerHandlebarsHelpers()

  // test context
  const testContext = {
    barks: [{
      name: 'bark #1'
    }, {
      name: 'bark #2'
    }, {
      name: 'bark #3'
    }]
  }
  const mainHtml = __t.smart(testContext)
  _w.document.querySelector('main').innerHTML = mainHtml
}(chrome, window, Handlebars, helpers, templates))
