import { chrome } from './../globals'

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  suggest([{
    content: '+', description: 'add bark'
  }])
})

chrome.omnibox.onInputEntered.addListener(omniboxText => {
  if (omniboxText === '+') {
    chrome.runtime.sendMessage('+')
  }
})
