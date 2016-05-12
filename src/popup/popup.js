;(function popup (_c, _w) {
  function updateZone (pageUrl) {
    _c.storage.sync.get('libmark:zone', function (zone) {
      var newZone = zone instanceof Array ? zone.concat(pageUrl) : [pageUrl]
      _c.storage.sync.set({
        'libmark:zone': newZone
      })
    })
  }

  function updateBadgeNumZoned (amount) {
    _c.browserAction.getBadgeText(function (badgeText) {
      var newBadgeText = badgeText ? +badgeText + amount : 0
      _c.browserAction.setBadgeText({
        text: newBadgeText
      })
    })
  }

  function addCurPageUrlToZone () {
    _c.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, function (tabs) {
      var curPageUrl = tabs[0].url
      updateZone(curPageUrl)
    })
  }

  _c.runtime.onMessage.addListener(function (msg) {
    if (msg === '+') {
      updateBadgeNumZoned(1)
      addCurPageUrlToZone()
    }
  })

  _w.getElementById('btn-change').addEventListener('click', function () {
    // change browser bookmarks tree to be the one from app
  })

  _w.getElementById('btn-save').addEventListener('click', function () {
    // save bookmark tree from app to be viewed and used later
  })
}(chrome, window))
