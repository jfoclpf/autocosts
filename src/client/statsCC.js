/* globals $ autocosts */
/* eslint prefer-const: "off" */
/* eslint no-var: "off" */

$(document).ready(function () {
  var globalVariables = document.getElementById('global_variables')
  var countryCode = globalVariables.dataset.country
  console.log('Loaded stats page for: ' + countryCode)

  var $countrySelect = $('div.statistics .header select.countrySelectStats')

  // adapt the width of the select box to its content
  // adjusts the size of select according to content
  var resizeSelectToContent = function ($this) {
    var arrowWidth = 5
    // create test element
    var text = $this.find('option:selected').text()
    var $test = $('<span>').html(text).css({
      'font-size': $this.css('font-size'), // ensures same size text
      visibility: 'hidden', // prevents FOUC */
      'white-space': 'nowrap'
    })
    // add to parent, get width, and get out
    $test.appendTo($this.parent())
    var width = $test.width()
    $test.remove()
    // set select width
    $this.width(width + arrowWidth)
  }

  resizeSelectToContent($countrySelect)

  $countrySelect.on('change', function () {
    var cc = this.value.toLowerCase()

    if (autocosts.serverInfo.booleans.isThisARecognizedHost) {
      window.location.href = window.location.protocol + '//' +
        autocosts.paths.url.canonicalHostname[cc.toUpperCase()] +
        autocosts.paths.url.canonicalPathname[cc.toUpperCase()] +
        '/stats'
    } else {
      window.location.href = window.location.origin + '/' + cc.toLowerCase() + '/stats'
    }
  })

  $('.sidebar.right').remove()
})
