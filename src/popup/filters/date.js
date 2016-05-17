export default (function date () {
  function dateFilter () {
    return this
      .concat()
      .sort(function (a, b) {
        return a.date - b.date
      })
  }

  return dateFilter
}())
