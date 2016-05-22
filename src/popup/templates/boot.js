/* eslint-disable no-new */
import Templates from './templates'
import { document } from './../../globals'

const sources = {
  smart: document.getElementById('templates-smart').innerHTML,
  date: document.getElementById('templates-standard').innerHTML,
  active: document.getElementById('templates-standard').innerHTML
}

new Templates(sources)
