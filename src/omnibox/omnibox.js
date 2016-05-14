;(function omnibox (_c) {
  _c.omnibox.onInputChanged.addListener((text, suggest) => {
    suggest([{
      content: '+', description: 'add bark'
    }])
  })

  _c.omnibox.onInputEntered.addListener(omniboxText => {
    if (omniboxText === '+') {
      _c.runtime.sendMessage('+')
    }
  })
}(chrome))
