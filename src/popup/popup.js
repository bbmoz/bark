import './popup.css'

;(function popup (_c, _w) {
  const $templates = _w.document.getElementById('iframe-templates')
  const $main = _w.document.querySelector('main')
  const $radios = {
    smart: document.getElementById('mode-smart'),
    date: document.getElementById('mode-date'),
    active: document.getElementById('mode-active')
  }
  const $checkmarks = {
    tab: document.getElementById('settings-tab'),
    sync: document.getElementById('settings-sync')
  }

  let isSync = false
  let isTab = false

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

  function generateContextFromBarks (cb) {
    _c.storage.sync.get('barks', barks => {
      const context = barks instanceof Array ? barks.map(bark => {
        return {
          name: bark
        }
      }) : []
      cb(context)
    })
  }

  function requestUpdateBarksView () {
    const mode = _w.document.querySelector('input[name="mode"]:checked').value

    generateContextFromBarks(context => {
      if (context.length > 0) {
        $templates.contentWindow.postMessage({
          command: 'render-request',
          context: context,
          mode: mode
        }, '*')
      }
    })
  }

  function updateBarksView (event) {
    const command = event.data.command

    if (command === 'render-response') {
      $main.innerHTML = event.data.templateHtml
    }
  }

  _c.runtime.onMessage.addListener(updateBarks)
  $radios.smart.addEventListener('click', requestUpdateBarksView)
  $radios.date.addEventListener('click', requestUpdateBarksView)
  $radios.active.addEventListener('click', requestUpdateBarksView)
  $templates.addEventListener('load', requestUpdateBarksView)
  _w.addEventListener('message', updateBarksView)
  $checkmarks.tab.addEventListener('change', function (event) {
    isTab = event.target.checked
  })
  $checkmarks.sync.addEventListener('change', function (event) {
    isSync = event.target.checked
  })
}(chrome, window))
