/* eslint-disable no-new */
import Popup from './popup'
import { document } from './../globals'

const $templates = document.getElementById('iframe-templates')
const $main = document.querySelector('main')
const $modes = {
  smart: document.getElementById('mode-smart'),
  date: document.getElementById('mode-date'),
  active: document.getElementById('mode-active')
}
const $settings = {
  tab: document.getElementById('settings-tab'),
  sync: document.getElementById('settings-sync')
}

new Popup($templates, $main, $modes, $settings)
