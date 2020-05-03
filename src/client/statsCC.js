/* globals $ */

$(document).ready(function () {
  var globalVariables = document.getElementById('global_variables')
  var countryCode = globalVariables.dataset.country
  console.log('Loaded stats page for: ' + countryCode)

  var $countrySelect = $('div.statistics .header select.countrySelectStats')

  // adapt the width of the select box to its content
  var text = $countrySelect.find('option:selected').text()
  var $aux = $('<select/>').append($('<option/>').text(text))
  $countrySelect.after($aux)
  $countrySelect.width($aux.width() + 10)
  $aux.remove()

  $countrySelect.on('change', function () {
    window.location.href = window.location.origin + '/stats/' + this.value
  })

  $('.sidebar.right').remove()
})
