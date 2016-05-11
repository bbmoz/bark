;(function omnibox (_c) {
  _c.omnibox.onInputChanged.addListener(function (text, suggest) {
    suggest([{
      content: text + ' +', description: 'add to zone'
    }])
  })

  _c.omnibox.onInputEntered.addListener(function (omniboxText) {
    if (omniboxText === 'libmark +') {
      _c.runtime.sendMessage('+')
    }
  })
}(chrome))
