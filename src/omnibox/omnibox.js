;(function omnibox (_c) {
  _c.omnibox.onInputChanged.addListener(function (text, suggest) {
    suggest([{
      content: '+', description: 'zone'
    }])
  })

  _c.omnibox.onInputEntered.addListener(function (omniboxText) {
    if (omniboxText === '+') {
      _c.runtime.sendMessage('+')
    }
  })
}(chrome))
