;(function popup (_c) {
  var zoned = []

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
      zoned.push(curPageUrl)
    })
  }

  _c.runtime.onMessage.addListener(function (msg) {
    if (msg === '+') {
      updateNumZoned(1)
      addCurPageToZoned()
    }
  })
}(chrome))
