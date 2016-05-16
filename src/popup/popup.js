;(function popup (_c, _w) {
  const $templates = _w.document.getElementById('iframe-templates')
  const $main = _w.document.querySelector('main')
  const $radios = {
    smart: document.getElementById('mode-smart'),
    date: document.getElementById('mode-date'),
    active: document.getElementById('mode-active')
  }
  const context = { // test
    barks: [{
      name: 'bark #1'
    }, {
      name: 'bark #2'
    }, {
      name: 'bark #3'
    }]
  }

  function updateBadgeNumNewBarks (amount) {
    _c.browserAction.getBadgeText(badgeText => {
      const newBadgeText = badgeText ? +badgeText + amount : 0
      _c.browserAction.setBadgeText({
        text: newBadgeText
      })
    })
  }

  function addToBarksStorage (pageUrl) {
    _c.storage.sync.get('barks', barks => {
      const newBarks = barks instanceof Array ? barks.concat(pageUrl) : [pageUrl]
      _c.storage.sync.set({
        'barks': newBarks
      })
    })
  }

  function addCurPageUrlToBarksStorage () {
    _c.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, tabs => {
      const curPageUrl = tabs[0].url
      addToBarksStorage(curPageUrl)
    })
  }

  function updateBarks (omniboxMsg) {
    if (omniboxMsg === '+') {
      updateBadgeNumNewBarks(1)
      addCurPageUrlToBarksStorage()
    }
  }

  function requestUpdateBarksView () {
    $templates.contentWindow.postMessage({
      command: 'render-request',
      context: context,
      mode: _w.document.querySelector('input[name="mode"]:checked').value
    }, '*')
  }

  function updateBarksView (event) {
    const [command, templateHtml] = [event.data.command, event.data.templateHtml]

    if (command === 'render-response') {
      $main.innerHTML = templateHtml
    }
  }

  _c.runtime.onMessage.addListener(updateBarks)
  $radios.smart.addEventListener('click', updateBarksView)
  $radios.date.addEventListener('click', updateBarksView)
  $radios.active.addEventListener('click', updateBarksView)
  _w.addEventListener('message', updateBarksView)
  $templates.addEventListener('load', requestUpdateBarksView)
}(chrome, window))
