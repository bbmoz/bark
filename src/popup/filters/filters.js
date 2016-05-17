import smart from './smart'
import active from './active'
import date from './date'

export default (function filters () {
  return {
    smart: smart,
    active: active,
    date: date
  }
}())
