;(function popup (_c, _w) {
  function updateZone (pageUrl) {
    _c.storage.sync.get('bark:zone', zone => {
      const newZone = zone instanceof Array ? zone.concat(pageUrl) : [pageUrl]
      _c.storage.sync.set({
        'bark:zone': newZone
      })
    })
  }

  function updateBadgeNumZoned (amount) {
    _c.browserAction.getBadgeText(badgeText => {
      const newBadgeText = badgeText ? +badgeText + amount : 0
      _c.browserAction.setBadgeText({
        text: newBadgeText
      })
    })
  }

  function addCurPageUrlToZone () {
    _c.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, tabs => {
      const curPageUrl = tabs[0].url
      updateZone(curPageUrl)
    })
  }

  _c.runtime.onMessage.addListener(msg => {
    if (msg === '+') {
      updateBadgeNumZoned(1)
      addCurPageUrlToZone()
    }
  })

  _w.getElementById('btn-change').addEventListener('click', event => {
    // change browser bookmarks tree to be the one from app
  })

  _w.getElementById('btn-save').addEventListener('click', event => {
    // save bookmark tree from app to be viewed and used later
  })
}(chrome, window))
