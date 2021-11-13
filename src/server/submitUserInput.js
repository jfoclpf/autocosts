/* functions which deal with the user POST submission */

/* jslint node: true */

'use strict'

const mysql = require('mysql') // module to get info from database
const debug = require('debug')('app:submitUserInput')
const sqlFormatter = require('sql-formatter')
const async = require('async')

module.exports = function (req, res, serverData) {
  const DBInfo = serverData.settings.database.credentials

  // object got from POST
  const databaseObj = req.body.databaseObj

  debug(databaseObj)
  debug('\nInserting user data into ' +
                'database table ' + DBInfo.database + '->' + DBInfo.db_tables.users_insertions)

  // builds sql query to insert user data
  let queryInsert = 'INSERT INTO ' + DBInfo.db_tables.users_insertions + ' ('
  const databaseKeys = Object.keys(databaseObj)
  for (let i = 0; i < databaseKeys.length; i++) {
    queryInsert += databaseKeys[i] + (i !== databaseKeys.length - 1 ? ', ' : ')')
  }
  queryInsert += ' ' + 'VALUES('
  for (let i = 0; i < databaseKeys.length; i++) {
    queryInsert += '\'' + databaseObj[databaseKeys[i]] + '\'' + (i !== databaseKeys.length - 1 ? ', ' : ')')
  }
  debug(sqlFormatter.format(queryInsert))

  const db = mysql.createConnection(DBInfo)

  async.series([
    function (next) {
      db.connect(function (err) {
        if (err) {
          debug('error connecting: ' + err.stack)
          next(Error(err))
        } else {
          debug('User ' + DBInfo.user + ' connected successfully to database ' + DBInfo.database + ' at ' + DBInfo.host)
          next()
        }
      })
    },
    function (next) {
      db.query(queryInsert, function (err, results, fields) {
        if (err) {
          // error handling code goes here
          debug('Error inserting user data into database: ', err)
          res.status(501).send(JSON.stringify(err))
          next(Error(err))
        } else {
          debug('User data successfully added into ' +
            'database table ' + DBInfo.database + '->' + DBInfo.db_tables.users_insertions + '\n\n')
          debug('Result from db query is : ', results)
          res.send(results)
          next()
        }
      })
    },
    function (next) {
      db.end(function (err) {
        if (err) {
          next(Error(err))
        } else {
          debug('DB closed with success')
          next()
        }
      })
    }
  ],
  function (err, results) {
    if (err) {
      // if any error occurs in the process, closes the database connection
      db.end(function (errDbEnd) {
        if (errDbEnd) {
          debug(Error(errDbEnd))
        }
      })
    } else {
      debug('end of script ok')
    }
  })
}
