/* globals $ */

$(document).ready(function () {
  var globalVariables = document.getElementById('global_variables')
  var countryCode = globalVariables.dataset.country_code
  console.log('Loaded stats page for: ' + countryCode)

  $('#countrySelectStats').val(countryCode)

  $('#countrySelectStats').on('change', function () {
    window.location.href = window.location.origin + '/tables/' + this.value + '.htm'
  })

  // download Table Button
  $('.downloadButton').on('click', function (e) {
    e.preventDefault() // stop the browser from following
    // forward to the respective page, from ..../AA.htm to ..../AA.jpg
    var urlToGo = window.location.origin + '/tables/' + countryCode + '.jpg'
    var win = window.open(urlToGo, '_blank')
    win.focus()
  })

  $('.main-title a').attr('href', '/' + countryCode)
})
