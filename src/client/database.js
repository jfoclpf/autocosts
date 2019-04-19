/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

/* DATABASE MODULE */
/* Module with functions that are used to insert form user data into a database */
/* see our module template: https://github.com/jfoclpf/autocosts/blob/master/contributing.md#modules */

/* global autocosts, $ */

autocosts.databaseModule = (function (thisModule, DOMform, serverInfo, userInfo) {
  var convertDataModule

  function initialize () {
    loadModuleDependencies()
  }

  function loadModuleDependencies () {
    convertDataModule = autocosts.convertDataModule
  }

  // function that is run when the user clicks the Run/Calculate button
  // and which submits the inserted data into the Database
  function submitResultsToDatabase () {
    var databaseObj = convertDataModule.createDatabaseObjectFromForm(DOMform)

    // get current time to know how much time the user took to fill the form
    databaseObj.time_to_fill_form = userInfo.timeCounter.getCurrentTimeInSeconds()

    // get a user unique generated ID
    databaseObj.client_uuid = userInfo.uniqueUserId

    databaseObj.country = serverInfo.selectedCountry // Country is a global variable

    autocosts.main.databaseObj = databaseObj
    submitDataToDB(databaseObj)
  }

  function submitDataToDB (databaseObj) {
    $.ajax({
      url: 'submitUserInput',
      type: 'POST',
      data: {
        databaseObj: databaseObj
      },
      success: function (data) {
        console.log('Values inserted into database with success. Returned: ', data)
        console.log('User took' + ' ' + databaseObj.time_to_fill_form + ' ' + 'seconds to fill the form')
      },
      error: function (error) {
        console.error('There was an error submitting the values into the database', error)
      }
    })
  }

  /* === Public methods to be returned === */

  // thisModule, since this is a parent module and it may have been defined erlier by a children module
  thisModule.initialize = initialize
  thisModule.submitResultsToDatabase = submitResultsToDatabase

  return thisModule
})(autocosts.databaseModule || {},
  document.costs_form,
  autocosts.serverInfo,
  autocosts.userInfo)
