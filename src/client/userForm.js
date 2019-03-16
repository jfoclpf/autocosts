/** *** DOCUMENT JS FUNCTIONS *******/
/* ==================================================== */
/* Functions which work only on the form */

/************************************************************************************************************/
/************************************************************************************************************/

// USER FORM INTERFACE MODULE
// see our module template: https://github.com/jfoclpf/autocosts/blob/master/CONTRIBUTING.md#modules

/* global autocosts, $ */

autocosts.userFormModule = (function (thisModule, translatedStrings) {
  var validateFormModule, commonsModule

  function initialize () {
    loadModuleDependencies()
    setFormSettings()
    setFormHandlers()
    setIconListClickHandlers()
  }

  function loadModuleDependencies () {
    validateFormModule = autocosts.userFormModule.validateFormModule
    commonsModule = autocosts.commonsModule
  }

  // initial settings regarding the calculator form itself
  // that is, after the user has pressed "calculate" button on the landing page
  function setFormSettings () {
    // shows numeric keypad on iOS mobile devices
    if (commonsModule.getMobileOperatingSystem() === 'iOS') {
      $('.form_part input[type="number"]').attr('pattern', '\\d*')
    }

    // hides all buttons "next"
    $('.next').hide()

    var $firstField = $('#form .field_container').first() // field depreciation
    setIcon($firstField, 'active')
    updatesAllIcons($firstField)

    // hides form part head titles, except first
    // that is, it only shows Head Title "1. Standing costs"
    $('.form_part_head_title').each(function (index) {
      if (index === 0) {
        $(this).show()
      } else {
        $(this).hide()
      }
    })

    // hides all fields except the first
    $('.field_container').each(function (index) {
      if (index === 0) {
        $(this).show()
      } else {
        $(this).hide()
      }
    })

    $('.calculate_bottom_bar').hide()

    $('#main_form select').val('1') // set all the selects to "month"

    // PART 1
    // depreciation
    $('#acquisitionYear').attr('max', (new Date()).getFullYear())

    // credit
    $('#sim_credDiv').hide()

    // inspection
    $('#numberInspections').val(0)
    $('#averageInspectionCost').parent().prev().addBack().hide()

    // PART 2
    // fuel
    $('#currency_div_form2').show()
    $('#distance_div_form2').hide()

    // tolls
    calculateTollsOnDay(false)

    // fines
    $('#tickets_period_select').val('5') // set fines period to year
    // washing
    $('#washing_period_select').val('3') // set washing period to trimester

    // PART 3
    // sets "Considering you drive to work?",  Distance section in Form Part 3, to No
    driveToJob(false)
    // Income in Form Part 3 - set to year
    setIncomePeriod('year')
  }

  // handlers regarding the calculator form itself
  // that is, after the user has pressed "calculate" button on the landing page
  function setFormHandlers () {
    // On 'input' would fire every time the input changes, so when one pastes something
    // (even with right click), deletes and types anything. If one uses the 'change' handler,
    // this will only fire after the user deselects the input box, which is not what we want.
    $('input[type="number"]').on('input', function () { inputHandler($(this)) })

    // it calls the same functions inputHandler after the radio button is changed
    // this onchange event is trigered after the onclick events down here
    $('input[type="radio"]').on('change', function () { inputHandler($(this)) })

    // keys handlers; function keyDownHandler is in formFunctions.js
    $(document).keydown(function (e) { keyDownHandler($(this), e) })
    $('input[type="number"]').keydown(function (e) { keyDownHandler($(this), e) })

    // PART 1
    // depreciation
    // changes the max allowed month, according to selected year
    $('#acquisitionYear').on('input', function () {
      // Return today's date and time
      var currentTime = new Date()
      var year = currentTime.getFullYear()

      if ($(this).val() === year) {
        var month = currentTime.getMonth() + 1
        $('#acquisitionMonth').attr('max', month)
      } else {
        $('#acquisitionMonth').attr('max', 12)
      }

      inputHandler($('#acquisitionMonth'))
    })

    // insurance
    setRadioButton('insurancePaymentPeriod', 'semestral') // insurance radio button set to half-yearly

    // credit
    $('#cred_auto_true').on('click', function () { $('#sim_credDiv').show() })
    $('#cred_auto_false').on('click', function () { $('#sim_credDiv').hide() })
    $('#cred_auto_false').prop('checked', true) // radio button of credit set to "no"

    // inspection
    $('#numberInspections').on('input', nbrInspectOnChanged)

    // PART 2
    // fuel
    $('#radio_fuel_km').on('click', function () { fuelCalculationMethodChange('distance') })
    $('#radio_fuel_euros').on('click', function () { fuelCalculationMethodChange('currency') })
    $('#car_job_form2_yes').on('click', function () { carToJob(true) })
    $('#car_job_form2_no').on('click', function () { carToJob(false) })
    $('#radio_fuel_euros').prop('checked', true) // radio button of fuel set to "money"
    $('#car_job_form2_no').prop('checked', true) // radio button (considering you drive to work? => no)

    // sets radio button in Form Part 2, section Fuel calculations, to Currency
    fuelCalculationMethodChange('currency')

    // tolls
    $('#tolls_daily_true').on('click', function () { calculateTollsOnDay(true) })
    $('#tolls_daily_false').on('click', function () { calculateTollsOnDay(false) })
    $('#tolls_daily_false').prop('checked', true) // radio button (toll calculations based on day? => no)

    // PART 3
    $('#drive_to_work_yes_form3').on('change', function () { driveToJob(true) })
    $('#drive_to_work_no_form3').on('change', function () { driveToJob(false) })
    $('#working_time_yes_form3').on('change', function () { workingTimeToggle(true) })
    $('#working_time_no_form3').on('change', function () { workingTimeToggle(false) })
    // income
    $('#radio_income_year').on('change', function () { setIncomePeriod('year') })
    $('#radio_income_month').on('change', function () { setIncomePeriod('month') })
    $('#radio_income_week').on('change', function () { setIncomePeriod('week') })
    $('#radio_income_hour').on('change', function () { setIncomePeriod('hour') })
    $('#radio_income_year').prop('checked', true) // radio button (what is your net income => per year)

    // further handlers

    // button "next"; function buttonNextHandler is on formFunctions.js
    $('.button.btn-orange').on('click', function () {
      buttonNextHandler($(this))
      // this is necessary to avoid default behaviour
      // avoid from scrolling to the top of page
      return false
    })

    // mouse on click event on field containers
    $('.field_container').on('click', function () {
      // console.log('$(".field_container").on("click", function()');

      var $this = $(this)

      // only if is already visible, but faded out, that is, with opacitiy lower than 1
      if ($this.is(':visible')) {
        // clears the animation queue
        $this.stop(true, true)

        $this.fadeTo('fast', 1, function () {
          inputHandler($this)
          updatesAllIcons($this)
        })
      }
    })
  }

  // set links on the items costs list
  // https://user-images.githubusercontent.com/3984909/50729986-9746ee80-1143-11e9-9124-85de9efcacad.png
  // these links shoud scroll the page to the correspondent costs section
  function setIconListClickHandlers () {
    $('.container .steps').find('.icon').each(function () {
      var fieldN

      var $this = $(this)

      // it has one class "fieldN", gets N
      var classesStr = $this.attr('class').split(' ') // get array of classes
      $.each(classesStr, function (index, value) {
        if (value.indexOf('field') !== -1) {
          fieldN = parseInt(value.replace('field', ''), 10)
        }
      })

      if (!fieldN) {
        console.error("The field has no class with the expression 'field#' ")
        return
      }

      // on click scrolls to the correponding section, and shows it
      $this.click(function () {
        var $that = $('.form_part .field_container.field' + fieldN)
        if ($(this).hasClass('active') || $(this).hasClass('done')) {
          $that.stop(true).fadeTo('fast', 1)
          scrollsPageTo($that, false)
        }
      })
    })
  }

  // When button "Next" is clicked, this function is called; var $thisButton makes reference to the "Next" button itself
  // It creates a loop which goes through all divs with class="field_container" or class="form_part_head_title"
  // It scrolls down the page till a field_container is: NOT valid OR NOT visible
  // Example: as it reaches for the 1st time "Credit" item (field3), function fieldStatus returns "fully_hidden"
  // since all items are hidden initially when the form is loaded (except the 1st item), and as such the loop breaks herein.
  // But since "Credit" cost item by default has radio button set at NO, this "Credit" field_container doesn't show any
  // 'input[type="number"]' and thus after showing this field_container, fieldStatus returns "no_inputs", and as such
  // we show the "Next" button, since when the user sets radio button to NO in "Credit", that is OK, but it shows no inputs
  function buttonNextHandler ($thisButton, callback) {
    // console.log("function buttonNextHandler($thisButton)");

    // closest get top parent finding element with class "field_container",
    var $fieldHead = $thisButton.closest('.field_container')

    if (fieldStatus($fieldHead) !== 'fully_valid' && fieldStatus($fieldHead) !== 'no_inputs') {
      console.error("'Next' button clicked, when field was not OK for showing 'next' button")
    }

    // hides own next button
    $thisButton.closest('.next').stop(true).hide()

    // fades own field
    $fieldHead.stop(true).fadeTo('slow', 0.1)

    // scrolls down till a field_container is: not valid OR not visible
    $fieldHead.nextAll('.field_container, .form_part_head_title').each(function (index, value) {
      var $i = $(this) // the $(this) from the loop .each

      // these are the section titles
      if ($i.hasClass('form_part_head_title')) {
        $i.stop(true).show()
      } else if ($i.hasClass('field_container')) {
        // these are the field containers, that is, divs with cost items: depreciation, insurance, etc.

        // It scrolls down the page till it finds a field_container
        // which does have some inputs and, in this condition, it is not fully_valid
        if (fieldStatus($i) !== 'no_inputs' && fieldStatus($i) !== 'fully_valid') {
          // we make sure the cost_item/field_container main div is now visible
          $i.stop(true).show()

          // now we're sure that, even after showing the field, the content is not hidden,
          // since a field may have the content hidden, due to user form settings
          if (fieldStatus($i) !== 'hidden') {
            // by ensuring now the field_container is visible, if it has no inputs show next button
            // for example "Credit" field container
            if (fieldStatus($i) === 'no_inputs') {
              $i.find('.next').stop(true).show() // shows "next" button
            }

            // scrols the center of the page to the corresponding div
            scrollsPageTo($i, true)

            updatesAllIcons($i)

            // returns to the callback the target .field_container, that is, $i
            if (typeof callback === 'function') {
              callback($i)
            }

            // breaks the .each loop
            return false
          }
        } else {
          $i.find('.next').stop(true).hide() // hides "next" button
        }
      } else {
        console.error('Error in buttonNextHandler')
      }
    })
  }

  // This function fires every time the
  // $(document).keydown OR $('input[type="number"]').keydown
  // check initialize.js in function loadsButtonsHandlers
  function keyDownHandler ($this, event) {
    // console.log("keyDownHandler");

    // key Enter (13) ot TAB (9)
    if (event.keyCode === 13 || event.keyCode === 9) {
      var $buttonNext

      if ($this.is('input[type="number"]')) {
        event.preventDefault()
        event.stopImmediatePropagation()

        // get button "Next" when available in the own field
        $buttonNext = $this.closest('.field_container').find('.next:visible')
        // otherwise get button "Next" anywhere
        if (!$buttonNext.length) {
          $buttonNext = $('.next:visible').first()
        }
      } else {
        $buttonNext = $('.next:visible').first()
      }

      // if there exists a "next" button
      if ($buttonNext.length) {
        // clicks the "next" button and focus the respective available input
        buttonNextHandler($buttonNext.last(), function ($fieldHead) {
          $fieldHead.find('*').promise().done(function () {
            $fieldHead.find('input[type="number"]:visible').first().focus()
          })
        })
      } else if ($this.is('input[type="number"]')) {
        // it does not exist a "next" button; just go to the next input

        var $inputs = $('input[type="number"]:visible')
        var thisInputIndex = $inputs.index($this)
        var $nextInput = $inputs.eq(thisInputIndex + 1)
        $nextInput.focus()
      }

      return false
    }
  }

  // This function fires every time .onInput in
  // input[type="number"] OR input input[type="radio"]
  // that is when the numbers inputs are changed or when the radio buttons are clicked
  // check initialize.js in function loadsButtonsHandlers
  function inputHandler ($this) {
    // console.log("inputHandler($this)");

    // if the number is invalid empty the input
    if ($this.is('input[type="number"]') && !isNumber(parseFloat($this.val()))) {
      $this.val('')
    }

    var $fieldHead = $this.closest('.field_container')

    // the icon on the icon list, with class "steps"
    if (fieldStatus($this) === 'wrong') {
      setIcon($this, 'wrong')
    } else if (fieldStatus($this) === 'fully_valid') {
      setIcon($this, 'done')
    } else {
      setIcon($this, 'active')
    }

    var $buttonNext = $fieldHead.find('.next')

    // shows active field
    $fieldHead.show().stop(true).fadeTo('fast', 1)
    // fades previous fields

    // just runs after all descedents (.find) have completed
    $fieldHead.find('*').promise().done(function () {
      // console.log("Check whether show/hide Next Button on " + $fieldHead.attr('class'));

      // shows or hides button "next" accordingly
      // Example: "Credit" field container starts with radio button to NO by default, and thus has no visible inputs
      if (fieldStatus($this) === 'fully_valid' || fieldStatus($this) === 'no_inputs') {
        // if the current field is valid, show "next" button
        $buttonNext.stop(true).show()
      } else {
        $buttonNext.stop(true).hide()
      }

      if (isReadyToCalc()) {
        $('.calculate_bottom_bar').fadeIn('slow')
      } else {
        $('.calculate_bottom_bar').fadeOut('slow')
      }
    })

    // add red underline in case input is wrong
    if ($this.is('input[type="number"]')) {
      if (numberInputStatus($this) === 'valid') {
        $this.css('border-bottom', '1px #b0b2be solid')
        inputErrorMsg($this, 'hide')
      } else {
        $this.css('border-bottom', '2px solid #ef474c')
        inputErrorMsg($this, 'show')
      }
    }
  }

  // hiddens or shows the left icons, except itself/$this, according to validity of the fields
  function updatesAllIcons ($this) {
    // console.log("updatesAllIcons($this)");

    var $fieldHead = $this.closest('.field_container')

    if (fieldStatus($this) === 'wrong') {
      setIcon($this, 'wrong')
    } else {
      setIcon($this, 'active')
    }

    // remainig field_containers except itself
    $fieldHead.siblings('.field_container').each(function () {
      var status = fieldStatus($(this))

      switch (status) {
        case 'fully_hidden':
        case 'hidden':
          setIcon($(this), 'hidden')
          break
        case 'wrong':
          $(this).stop(true).fadeTo('fast', 1)
          setIcon($(this), 'wrong')
          break
        case 'fully_valid':
        case 'no_inputs':
          $(this).stop(true).fadeTo('slow', 0.1)
          $(this).find('.next').stop(true).hide()
          setIcon($(this), 'done')
          break
        case 'valid':
          if (status !== 'fully_hidden') {
            setIcon($(this), 'wrong')
          }
          break
      }

      // updates the icon sections visibility (section: "Running Costs", "Additional Data")
      $('#form .steps li.list').each(function (i) {
        if (i === 0) {
          return // first section (Standing Costs) always visible, thus don't touch
        }
        // .is() return true if at least one of these elements matches the given arguments
        if ($(this).find('ul .icon').is(':visible')) {
          // at least one icon is visible within the section (Running Costs, Additional Data)
          $(this).show()
        } else {
          $(this).hide()
        }
      })
    })
  }

  // For a certain element inside the div with class ".field_container",
  // checks on every visible and active number input element, if all these elements are valid
  // Field refers to insurance, credit, tolls, etc., that is, cost items
  // Output may be:
  // "fully_valid"  => visible/enabled inputs (>=1); all inputs are filled and with valid numbers
  // "valid"        => visible/enabled inputs (>=1); some inputs are valid, others are empty
  // "empty"        => visible/enabled inputs (>=1); all inputs are empty
  // "wrong"        => visible/enabled inputs (>=1); at least one input is wrong
  // "no_inputs"    => the field_container main div is visible; but no visible/enabled inputs in the field_container
  // "hidden"       => the field container inner divs are all hidden
  // "fully_hidden" => the field_container main div with class "field_container" is hidden
  function fieldStatus ($this) {
    // console.log("fieldStatus($this)");

    if ($this.length !== 1) {
      console.error("'fieldStatus' function called for more than one element")
      return
    }

    // goes to top ascendents till it finds the class "field_container"
    // .closest: for each element in the set, get the first element that matches the selector by testing
    // the element itself and traversing up through its ancestors in the DOM tree.
    var $fieldHead = $this.closest('.field_container')

    if (!$fieldHead.is(':visible')) {
      return 'fully_hidden'
    }
    if ($fieldHead.children(':visible').length === 0) {
      return 'hidden'
    }

    // goes to every descendent input[type="number"]
    var $inputElements = $fieldHead.find('input[type="number"]')

    var numberStatus
    var inputsCount = 0; var validCount = 0; var emptyCount = 0; var wrongCount = 0

    $inputElements.each(function (index) {
      // if the input element is hidden or disabled doesn't check its value
      if ($(this).is(':visible') && !$(this).prop('disabled')) {
        inputsCount++

        numberStatus = numberInputStatus($(this))
        if (numberStatus === 'wrong') {
          wrongCount++
          // since this input is wrong, the whole field is wrong and hence breaks the loop
          return false
        } else if (numberStatus === 'valid') {
          validCount++
        } else if (numberStatus === 'empty') {
          emptyCount++
        } else {
          console.error('Error in function fieldStatus')
          return false
        }
      }
    })

    // when at least one input is wrong, returns "wrong"
    if (wrongCount >= 1) {
      return 'wrong'
    }

    if (inputsCount === 0) {
      return 'no_inputs'
    }

    if (emptyCount >= 1 && validCount >= 1) {
      return 'valid'
    }

    if (emptyCount >= 1 && validCount === 0) {
      return 'empty'
    }

    if (emptyCount === 0 && validCount >= 1) {
      return 'fully_valid'
    }

    console.error('Error in function fieldStatus')
    return false
  }

  // $this refers to input[type="number"]; output may be:
  // "valid" => It has input numbers/data, the input is valid
  // "empty" => Input has not numbers, that is, it is empty
  // "wrong" => It has input numbers/data, but it is invalid/wrong
  function numberInputStatus ($this) {
    // console.log("numberInputStatus($this)");

    if ($this.val() === '') {
      return 'empty'
    }

    var val, min, max, bValueGreaterThanMin, bValueSmallerThanMax

    // A text input's value attribute will always return a string.
    // One needs to parseFloat to convert string to float
    val = parseFloat($this.val())
    // console.log(index + ": " + val);

    if (!isNumber(val)) {
      return 'wrong'
    }

    if ($this.hasClass('input_integer')) {
      if (!isInteger(val)) {
        return 'wrong'
      }
    }

    min = parseFloat($this.attr('min'))
    max = parseFloat($this.attr('max'))
    bValueGreaterThanMin = Boolean($this.attr('data-valueGreaterThanMin'))
    bValueSmallerThanMax = Boolean($this.attr('data-valueSmallerThanMax'))
    // console.log(min, max, bValueGreaterThanMin);

    if (isNumber(min) && isNumber(max)) {
      if (val < min || val > max) {
        return 'wrong'
      }
      if (bValueGreaterThanMin && val === min) {
        return 'wrong'
      }
      if (bValueSmallerThanMax && val === max) {
        return 'wrong'
      }
    } else if (isNumber(min)) {
      if (val < min) {
        return 'wrong'
      }
      if (bValueGreaterThanMin && val === min) {
        return 'wrong'
      }
    } else if (isNumber(max)) {
      if (val > max) {
        return 'wrong'
      }
      if (bValueSmallerThanMax && val === max) {
        return 'wrong'
      }
    } else {
      console.error('Error in function numberInputStatus')
      return false
    }

    return 'valid'
  }

  // sets correspondent icon on costs items vertical list (inside <div class="steps"> on form.hbs)
  // https://user-images.githubusercontent.com/3984909/50729986-9746ee80-1143-11e9-9124-85de9efcacad.png
  // $this is the current field with class "field_container"
  // status may be "inactive", "active", "done", "wrong" or "hidden"
  function setIcon ($this, status) {
    // getFieldNum (with false) returns string "field1", "field2", "field3", etc. of field_container
    var fieldN = getFieldNum($this, false) // the field number will be taken from class name

    // icon from the left icon list
    var $icon = $('#form .steps .icon.' + fieldN)

    $icon.removeClass('active done wrong')
    $icon.find('span').removeClass('wrong')
    $icon.show()

    switch (status) {
      case 'inactive':
        break
      case 'active':
        $icon.addClass('active')
        $icon.closest('.list').addClass('active')
        showIconSection()
        break
      case 'done':
        $icon.addClass('active done')
        $icon.closest('.list').addClass('active')
        showIconSection()
        break
      case 'wrong':
        $icon.addClass('active wrong')
        $icon.find('span').addClass('wrong')// text
        showIconSection()
        break
      case 'hidden':
        $icon.hide()
        break
      default:
        console.error("'status' parameter not correct in 'setIcon' function, using class .icon." + fieldN)
    }

    // if status not hidden show icon section (section: 'Running Costs', etc.)
    function showIconSection () {
      $icon.closest('li.list').show()
    }
  }

  // when numBool is false returns string "field1", "field2", "field3", etc. of field_container
  // when numBool is true returns integer 1, 2, 3, etc. of field_container with class field1, field2, etc.
  function getFieldNum ($this, numBool) {
    var $fieldHead = $this.closest('.field_container')
    var fieldN // the field number will be taken from class name

    // gets all classes from $fieldHead
    var classList = $fieldHead.attr('class').split(/\s+/)
    $.each(classList, function (index, item) {
      // if there is a class which contains the string "field"?
      if (item.indexOf('field') >= 0) {
        fieldN = item
      }
    })

    if (!fieldN) {
      console.error("The field has no class with the expression 'field#' ")
    }

    if (numBool) {
      return parseInt(fieldN.replace('field', ''), 10)
    } else {
      return fieldN
    }
  }

  // when the input value is wrong
  // status is show or hide the error message
  function inputErrorMsg ($this, status) {
    if (!$this.is('input[type="number"]')) {
      console.error('Error on inputErrorMsg')
      return
    }

    var errId = 'error_msg_' + $this.prop('id')

    if (status === 'show' && !$('#' + errId).length) {
      // if default function paramters are not set, get min and max from HTML attributes
      var min = $this.attr('min')
      var max = $this.attr('max')
      var bValueGreaterThanMin = Boolean($this.attr('data-valueGreaterThanMin'))
      var bValueSmallerThanMax = Boolean($this.attr('data-valueSmallerThanMax'))

      var strEnterAValue
      if ($this.hasClass('input_integer')) {
        strEnterAValue = translatedStrings.enter_an_integer
      } else {
        strEnterAValue = translatedStrings.enter_an_amount
      }

      $this.after(function () {
        var errorMessage

        if (min && max && !bValueGreaterThanMin) {
          errorMessage = translatedStrings.between + ' ' + min + ' ' + translatedStrings.and + ' ' + max
        } else if (min && max && bValueGreaterThanMin) {
          errorMessage = translatedStrings.between + ' ' + min + ' ' + translatedStrings.and + ' ' + max + ', ' +
                        translatedStrings.and + ' ' + translatedStrings.greater_than + ' ' + min
        } else if (min && !bValueGreaterThanMin) {
          errorMessage = translatedStrings.greater_or_equal_to + ' ' + min
        } else if (min && bValueGreaterThanMin) {
          errorMessage = translatedStrings.greater_than + ' ' + min
        } else if (max && !bValueSmallerThanMax) {
          errorMessage = translatedStrings.smaller_or_equal_to + ' ' + max
        } else if (max && bValueSmallerThanMax) {
          errorMessage = translatedStrings.smaller_than + ' ' + max
        }

        if (errorMessage) {
          return '<div class="error_msg" id="' + errId + '">' + strEnterAValue + ' ' + errorMessage + '</div>'
        } else {

        }
      })
    } else if (status === 'hide') {
      $('#' + errId).remove()
    }
  }

  // scrols the page to the corresponding div, considering the header
  // toCenterOfPage; if false scrolls to top of page
  function scrollsPageTo ($this, toCenterOfPageBool) {
    var scrollingTime = 600

    // scrolls to center of page
    if (toCenterOfPageBool) {
      // returns integer 1, 2, 3, etc. for "field1", "field2", "field3", etc. of field_container
      var fieldN = getFieldNum($this, true)

      if (fieldN <= 15) {
        // gets relative postion with respect to parent element
        var fixedTopPos = $this.offset().top - $('.form_part').scrollTop() - $('header').outerHeight() - 200

        $('html').animate({ scrollTop: fixedTopPos }, scrollingTime, 'linear', function () {
          if ($('.bottom_spacer').css('padding-top') !== '450px') {
            $('.bottom_spacer').animate({ 'padding-top': '450px' }, scrollingTime, 'linear')
          }
        })
      } else if (fieldN <= 17) {
        // scrolls to end of page and change bottom spacer
        if ($('.bottom_spacer').css('padding-top') !== '150px') {
          $('.bottom_spacer').animate({ 'padding-top': '150px' }, scrollingTime, 'linear', function () {
            $('html').animate({ scrollTop: $(document).height() }, scrollingTime, 'linear')
          })
        } else {
          $('html').animate({ scrollTop: $(document).height() }, scrollingTime, 'linear')
        }
      } else {
        console.error('Error on scrollsPageTo(), invalid index: ' + fieldN)
      }
    } else {
      // scrolls to top of page

      $([document.documentElement, document.body]).animate({
        scrollTop: $this.offset().top - $('header').outerHeight()
      }, scrollingTime)
    }
  }

  /*************************************************************************************************************************/
  /*************************************************************************************************************************/

  // When the form is filled and the calculator is already ready to calculate car costs
  // The form is ready to be calculated when Standing Costs (form part 1) and Running Costs (form part 2) are filled
  // The Extra data (form part 3) is optional
  function isReadyToCalc () {
    var status; var fieldN; var isOk = true

    $('.form_part').find('.field_container').each(function (index, item) {
      fieldN = getFieldNum($(this), true)

      // fields 1 to 12 refer to Standing and Running Costs
      if (fieldN >= 0 && fieldN <= 12) {
        status = fieldStatus($(this))
        if (status !== 'hidden' && status !== 'no_inputs') {
          if (status !== 'fully_valid') {
            isOk = false
            return false
          }
        }
      }
    })

    if (!isOk) {
      return false
    }

    // double-check with validating functions from file validateForm.js
    // Standing (part1) and Running (part2) Costs
    if (!validateFormModule.isUserDataFormPart1_Ok() || !validateFormModule.isUserDataFormPart2_Ok()) {
      return false
    }

    return true
  }

  /*************************************************************************************************************************/
  /*************************************************************************************************************************/

  // FORM CALCULATOR FUNCTIONS

  // when number of inspections is zero in form part 1, hides field for cost of each inspection
  function nbrInspectOnChanged () {
    var numberOfInspections = parseInt($('#numberInspections').val(), 10)
    if (numberOfInspections === 0 || isNaN(numberOfInspections)) {
      // addBack() forms a group of parent and prevOfParent
      $('#averageInspectionCost').parent().prev().addBack().hide()
    } else {
      $('#averageInspectionCost').parent().prev().addBack().show()
    }
    inputHandler($('#numberInspections'))
  }

  // FUEL - Form Part 2
  // 'Calculations based on:' currency or distance
  function fuelCalculationMethodChange (fuelCalculationMethod) {
    if (fuelCalculationMethod === 'distance') {
      // selects actively radio button to which this function is associated
      $('#radio_fuel_km').prop('checked', true)

      $('#currency_div_form2').hide() // hide
      $('#distance_div_form2, .fuel_efficiency').show() // show

      carToJob(false)

      // DISTANCE - Form Part 3
      // If user sets distance here, the calculator does not needs to further question about the distance
      $('#distance_form3').hide()
      driveToJob(false)
    } else if (fuelCalculationMethod === 'currency') {
      // selects actively radio button to which this function is associated
      $('#radio_fuel_euros').prop('checked', true)

      $('#currency_div_form2').show() // show
      $('#distance_div_form2, .fuel_efficiency, #div_car_job_no_form2, #div_car_job_yes_form2').hide() // hide

      // DISTANCE - Form Part 3
      // If user sets currency here, the calculator needs anyway to know what the distance traveled,
      // and thus it will ask the distance travelled by the user on Form Part 3
      $('#distance_form3').show()

      $('#time_spent_part1_form3').hide()
      $('#time_spent_part2_form3').show()
      $('#drive_to_work_no_form3').prop('checked', true)
    } else {
      console.error('Either is distance or currency')
    }
  }

  // FUEL - Form Part 2
  // "Considering you drive to work?" yes or no
  function carToJob (carToJobFlag) {
    // "Considering you drive to work?" YES
    if (carToJobFlag) {
      // selects actively radio button to which this function is associated
      $('#car_job_form2_yes').prop('checked', true)

      $('#div_car_job_yes_form2, #time_spent_part1_form3').show()
      $('#div_car_job_no_form2, #time_spent_part2_form3').hide()

      // working time section in form part 3
      workingTimeToggle(true)
      $('#working_time_part1_form3').hide()
      $('#working_time_part2_form3').show()
    } else {
      // "Considering you drive to work?" NO

      // selects actively radio button to which this function is associated
      $('#car_job_form2_no').prop('checked', true)

      $('#div_car_job_yes_form2, #time_spent_part1_form3').hide()
      $('#div_car_job_no_form2, #time_spent_part2_form3').show()

      // set to "no" the question "Do you have a job or a worthy occupation?"
      // in Working Time section of Form Part 3
      workingTimeToggle(false)
      $('#working_time_no_form3').prop('checked', true)
      $('#working_time_part1_form3').show()
      $('#working_time_part2_form3').hide()
    }
  }

  // DISTANCE - Form Part 3
  // Drive to Job yes/no radio button
  function driveToJob (flag) {
    // Drive to Job - YES
    if (flag) {
      // selects actively radio button to which this function is associated
      $('#drive_to_work_yes_form3').prop('checked', true)

      // Distance section - form part 3
      $('#car_no_job_distance_form3').hide()
      $('#car_to_job_distance_form3').show()

      // set to "no" the question "Do you have a job or a worthy occupation?"
      // in Working Time section - Form Part 3
      workingTimeToggle(true)
      $('#working_time_part1_form3').hide()
      $('#working_time_part2_form3').show()

      // Time Spent in Driving - Form Part 3
      $('#time_spent_part2_form3').hide()
      $('#time_spent_part1_form3').show()
    } else {
      // NO

      // selects actively radio button to which this function is associated
      $('#drive_to_work_no_form3').prop('checked', true)

      // Distance section - form part 3
      $('#car_to_job_distance_form3').hide()
      $('#car_no_job_distance_form3').show()

      // Working Time - Form Part 3
      workingTimeToggle(true)
      $('#working_time_part1_form3').show()
      $('#working_time_part2_form3').hide()

      // Time spent in driving section
      $('#time_spent_part1_form3').hide()
      $('#time_spent_part2_form3').show()
    }
  }

  function calculateTollsOnDay (tollsDailyFlag) {
    if (tollsDailyFlag) {
      $('#daily_tolls_false_div').hide()
      $('#daily_tolls_true_div').show()
    } else {
      $('#daily_tolls_false_div').show()
      $('#daily_tolls_true_div').hide()
    }
  }

  // INCOME - Form Part 3
  // Shows the active div and Hides the remainder divs. Ex: if "year" selected, shows #income_per_year_form3 and hides remainder
  // If "hour" selected hides also #working_time_form3. It needs working time to calculate the average yearly *income per hour*
  // With *income per hour* it can calculate consumer speed. But if "hour" is selected income per hour is already known
  function setIncomePeriod (value) {
    // see why is 0: https://github.com/jfoclpf/autocosts/issues/54
    var animSpeed = 0

    switch (value) {
      case 'year':
        $('#income_per_month_form3, #income_per_week_form3, #income_per_hour_form3')
          .fadeOut(animSpeed).promise().done(function () {
            $('#income_per_year_form3, #working_time_form3').fadeIn(animSpeed)
          })
        break
      case 'month':
        $('#income_per_year_form3, #income_per_week_form3, #income_per_hour_form3')
          .fadeOut(animSpeed).promise().done(function () {
            $('#income_per_month_form3, #working_time_form3').fadeIn(animSpeed)
          })
        break
      case 'week':
        $('#income_per_year_form3, #income_per_month_form3, #income_per_hour_form3')
          .fadeOut(animSpeed).promise().done(function () {
            $('#income_per_week_form3, #working_time_form3').fadeIn(animSpeed)
          })
        break
      case 'hour':
        $('#income_per_year_form3, #income_per_week_form3, #income_per_month_form3, #working_time_form3')
          .fadeOut(animSpeed).promise().done(function () {
            $('#income_per_hour_form3').fadeIn(animSpeed)
          })
        break
    }
  }

  // WORKING TIME - Form Part 3
  function workingTimeToggle (value) {
    if (value) {
      // selects actively radio button to which this function is associated
      $('#working_time_yes_form3').prop('checked', true)
      $('#working_time_input_form3').show()
    } else {
      // selects actively radio button to which this function is associated
      $('#working_time_no_form3').prop('checked', true)
      $('#working_time_input_form3').hide()
    }
  }

  // clears all the form inputs whose unit is a currency
  /* function clearCurrencyInputs () {
    $('.currencyInput').val('')
  } */

  // sets in a radio button with a specific option
  function setRadioButton (name, option) {
    $('input[name="' + name + '"][value="' + option + '"]').prop('checked', true)
  }

  // check if number or parsed string is integer
  function isInteger (n) {
    return (parseFloat(n) === parseInt(n, 10))
  }

  // isNaN stands for "is Not a Number", this function works whether n is a "number" or a "string"
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
  function isNumber (n) {
    return !isNaN(n) && isFinite(parseFloat(n))
  }

  /* === Public methods to be returned === */

  // own module, since it may have been defined erlier by children modules
  thisModule.initialize = initialize
  thisModule.isReadyToCalc = isReadyToCalc

  thisModule.fieldStatus = fieldStatus // temp

  return thisModule
})(autocosts.userFormModule || {},
  autocosts.serverInfo.translatedStrings)
