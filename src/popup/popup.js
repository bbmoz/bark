;(function popup (_c, _w) {
  const $templates = document.getElementById('iframe-templates')
  const context = {
    barks: [{
      name: 'bark #1'
    }, {
      name: 'bark #2'
    }, {
      name: 'bark #3'
    }]
  }

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

  _c.runtime.onMessage.addListener(msg => {
    if (msg === '+') {
      updateBadgeNumNewBarks(1)
      addCurPageUrlToBarks()
    }
  })

  function updateBarksView () {
    $templates.contentWindow.postMessage({
      command: 'render',
      context: context,
      name: _w.document.querySelector('input[name="mode"]:checked').value
    })
  }

  function updateTemplatesIframe () {
    const doc = $templates.contentDocument != null ? $templates.contentDocument : $templates.contentWindow.document
    const [body, html] = [doc.body, doc.documentElement]
    $templates.style.visibility = 'hidden'
    $templates.style.height = '10px'
    $templates.style.height = Math.max(
      body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight
    )
    $templates.style.visibility = 'visible'
  }

  document.getElementById('mode-smart').addEventListener('click', updateBarksView)
  document.getElementById('mode-date').addEventListener('click', updateBarksView)
  document.getElementById('mode-active').addEventListener('click', updateBarksView)
  updateBarksView()

  $templates.addEventListener('load', updateTemplatesIframe)

  _w.addEventListener('message', event => {
    if (event.data.command === 'render-done') {
      updateTemplatesIframe()
    }
  })
}(chrome, window))
