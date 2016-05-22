import { chrome } from './../globals'

chrome.devtools.panels.create(
  'bark',
  'icon.png',
  'popup.html'
)
