import './popup.css'
import { chrome, window, document } from './../globals'

function Popup ($templates, $main, $modes, $settings) {
  this.$templates = $templates
  this.$main = $main
  this.$modes = $modes
  this.$settings = $settings
  this._addListeners()
}

Popup.prototype._addListeners = () => {
  chrome.runtime.onMessage.addListener(this.updateBarksFromOmnibox)
  this.$modes.smart.addEventListener('click', this.requestUpdateBarksView)
  this.$modes.date.addEventListener('click', this.requestUpdateBarksView)
  this.$modes.active.addEventListener('click', this.requestUpdateBarksView)
  this.$templates.addEventListener('load', this.requestUpdateBarksView)
  window.addEventListener('message', this.updateBarksView)
  this.$settings.tab.addEventListener('change', this.enableOrDisableTabPage)
  this.$settings.sync.addEventListener('change', this.enableOrDisableBookmarksSync)
}

Popup.prototype.updateBarksFromOmnibox = omniboxMsg => {
  if (omniboxMsg === '+') {
    addCurPageUrlToBarksStorage(() => {
      requestUpdateBarksView()
    })
  }
}

Popup.prototype.requestUpdateBarksView = () => {
  const mode = document.querySelector('input[name="mode"]:checked').value
  generateContextFromBarks(context => {
    if (context.length > 0) {
      this.$templates.contentWindow.postMessage({
        command: 'render-request',
        context: context,
        mode: mode
      }, '*')
    }
  })
}

Popup.prototype.updateBarksView = (event) => {
  if (event.data.command === 'render-response') {
    this.$main.innerHTML = event.data.templateHtml
  }
}

Popup.prototype.enableOrDisableTabPage = (event) => {
  if (event.target.checked === true) {

  } else {

  }
}

Popup.prototype.enableOrDisableBookmarksSync = (event) => {
  if (event.target.checked === true) {

  } else {

  }
}

function addCurPageUrlToBarksStorage (done) {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, tabs => {
    const curPageUrl = tabs[0].url
    addToBarksStorage(curPageUrl, done)
  })
}

function addToBarksStorage (pageUrl, done) {
  chrome.storage.sync.get('barks', barks => {
    const newBarks = barks instanceof Array
      ? barks.concat(pageUrl)
      : [pageUrl]
    chrome.storage.sync.set({
      'barks': newBarks
    }, () => {
      if (chrome.runtime.lastError == null) {
        addOneToBarksBadge()
        done()
      }
    })
  })
}

function addOneToBarksBadge () {
  chrome.browserAction.getBadgeText(badgeText => {
    const newBadgeText = badgeText ? +badgeText + 1 : 0
    chrome.browserAction.setBadgeText({
      text: newBadgeText
    })
  })
}

function generateContextFromBarks (done) {
  chrome.storage.sync.get('barks', barks => {
    const context = barks instanceof Array
      ? barks.map(bark => { return { name: bark } })
      : []
    done(context)
  })
}

export default Popup
