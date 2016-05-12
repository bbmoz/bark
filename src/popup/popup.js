;(function popup (_c, _w) {
  var zone = []

  function updateNumZoned (amount) {
    _c.browserAction.getBadgeText(function (badgeText) {
      var newBadgeText = badgeText ? +badgeText + amount : 0
      _c.browserAction.setBadgeText({
        text: newBadgeText
      })
    })
  }

  function addCurPageToZoned () {
    _c.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, function (tabs) {
      var curPageUrl = tabs[0].url
      zone.push(curPageUrl)
    })
  }

  _c.runtime.onMessage.addListener(function (msg) {
    if (msg === '+') {
      updateNumZoned(1)
      addCurPageToZoned()
    }
  })

  _w.getElementById('btn-change').addEventListener('click', function () {
    // change browser bookmarks tree to be the one from app
  })

  _w.getElementById('btn-save').addEventListener('click', function () {
    // save bookmark tree from app to be viewed and used later
  })
}(chrome, window))
