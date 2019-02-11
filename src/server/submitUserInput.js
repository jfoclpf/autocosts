/* functions which deal with the user POST submission */

const mysql = require('mysql') // module to get info from DB
const debug = require('debug')('app:submitUserInput')

module.exports = function (req, res, serverData) {
  var DBInfo = serverData.settings.dataBase.credentials

  // object got from POST
  var databaseObj = req.body.databaseObj

  debug(databaseObj)
  debug('\nInserting user data into ' +
                'DB table ' + DBInfo.database + '->' + DBInfo.db_tables.users_insertions)

  var queryInsert = 'INSERT INTO ' + DBInfo.db_tables.users_insertions + ` (
        time_to_fill_form,
        uuid_client,
        country,
        insertion_date,
        acquisition_month,
        acquisition_year,
        commercial_value_at_acquisition,
        commercial_value_at_now,
        insure_type,
        insurance_value,
        credit,
        credit_borrowed_amount,
        credit_number_installments,
        credit_amount_installment,
        credit_residual_value,
        inspection_number_inspections,
        inspection_average_inspection_cost,
        vehicle_excise_tax,
        fuel_calculation,
        fuel_currency_based_currency_value,
        fuel_currency_based_periodicity,
        fuel_distance_based_car_to_work,
        fuel_distance_based_car_to_work_number_days_week,
        fuel_distance_based_car_to_work_distance_home_work,
        fuel_distance_based_car_to_work_distance_weekend,
        fuel_distance_based_no_car_to_work_distance,
        fuel_distance_based_no_car_to_fuel_period_distance,
        fuel_distance_based_fuel_efficiency,
        fuel_distance_based_fuel_price,
        maintenance,
        repairs,
        parking,
        tolls_daily,
        tolls_no_daily_value,
        tolls_no_daily_period,
        tolls_daily_expense,
        tolls_daily_number_days,
        tickets_value,
        tickets_periodicity,
        washing_value,
        washing_periodicity,
        household_number_people,
        public_transportation_month_expense,
        income_type,
        income_per_year,
        income_per_month,
        income_months_per_year,
        income_per_week,
        income_weeks_per_year,
        income_per_hour,
        income_hours_per_week,
        income_hour_weeks_per_year,
        work_time,
        work_time_month_per_year,
        work_time_hours_per_week,
        distance_drive_to_work,
        distance_days_per_week,
        distance_home_job,
        distance_journey_weekend,
        distance_per_month,
        distance_period,
        time_spent_home_job,
        time_spent_weekend,
        time_spent_min_drive_per_day,
        time_spent_days_drive_per_month
    )
    VALUES ( ` +
        "'" + databaseObj.time_to_fill_form + "', " +
        "'" + databaseObj.client_uuid + "', " +
        "'" + databaseObj.country + "', " +
        ' NOW() , ' +
        "'" + databaseObj.acquisition_month + "', " +
        "'" + databaseObj.acquisition_year + "', " +
        "'" + databaseObj.commercial_value_at_acquisition + "', " +
        "'" + databaseObj.commercial_value_at_now + "', " +
        "'" + databaseObj.insure_type + "', " +
        "'" + databaseObj.insurance_value + "', " +
        "'" + databaseObj.credit + "', " +
        "'" + databaseObj.credit_borrowed_amount + "', " +
        "'" + databaseObj.credit_number_installments + "', " +
        "'" + databaseObj.credit_amount_installment + "', " +
        "'" + databaseObj.credit_residual_value + "', " +
        "'" + databaseObj.inspection_number_inspections + "', " +
        "'" + databaseObj.inspection_average_inspection_cost + "', " +
        "'" + databaseObj.vehicle_excise_tax + "', " +
        "'" + databaseObj.fuel_calculation + "', " +
        "'" + databaseObj.fuel_currency_based_currency_value + "', " +
        "'" + databaseObj.fuel_currency_based_periodicity + "', " +
        "'" + databaseObj.fuel_distance_based_car_to_work + "', " +
        "'" + databaseObj.fuel_distance_based_car_to_work_number_days_week + "', " +
        "'" + databaseObj.fuel_distance_based_car_to_work_distance_home_work + "', " +
        "'" + databaseObj.fuel_distance_based_car_to_work_distance_weekend + "', " +
        "'" + databaseObj.fuel_distance_based_no_car_to_work_distance + "', " +
        "'" + databaseObj.fuel_distance_based_no_car_to_fuel_period_distance + "', " +
        "'" + databaseObj.fuel_distance_based_fuel_efficiency + "', " +
        "'" + databaseObj.fuel_distance_based_fuel_price + "', " +
        "'" + databaseObj.maintenance + "', " +
        "'" + databaseObj.repairs + "', " +
        "'" + databaseObj.parking + "', " +
        "'" + databaseObj.tolls_daily + "', " +
        "'" + databaseObj.tolls_no_daily_value + "', " +
        "'" + databaseObj.tolls_no_daily_period + "', " +
        "'" + databaseObj.tolls_daily_expense + "', " +
        "'" + databaseObj.tolls_daily_number_days + "', " +
        "'" + databaseObj.tickets_value + "', " +
        "'" + databaseObj.tickets_periodicity + "', " +
        "'" + databaseObj.washing_value + "', " +
        "'" + databaseObj.washing_periodicity + "', " +
        "'" + databaseObj.household_number_people + "', " +
        "'" + databaseObj.public_transportation_month_expense + "', " +
        "'" + databaseObj.income_type + "', " +
        "'" + databaseObj.income_per_year + "', " +
        "'" + databaseObj.income_per_month + "', " +
        "'" + databaseObj.income_months_per_year + "', " +
        "'" + databaseObj.income_per_week + "', " +
        "'" + databaseObj.income_weeks_per_year + "', " +
        "'" + databaseObj.income_per_hour + "', " +
        "'" + databaseObj.income_hours_per_week + "', " +
        "'" + databaseObj.income_hour_weeks_per_year + "', " +
        "'" + databaseObj.work_time + "', " +
        "'" + databaseObj.work_time_month_per_year + "', " +
        "'" + databaseObj.work_time_hours_per_week + "', " +
        "'" + databaseObj.distance_drive_to_work + "', " +
        "'" + databaseObj.distance_days_per_week + "', " +
        "'" + databaseObj.distance_home_job + "', " +
        "'" + databaseObj.distance_journey_weekend + "', " +
        "'" + databaseObj.distance_per_month + "', " +
        "'" + databaseObj.distance_period + "', " +
        "'" + databaseObj.time_spent_home_job + "', " +
        "'" + databaseObj.time_spent_weekend + "', " +
        "'" + databaseObj.time_spent_min_drive_per_day + "', " +
        "'" + databaseObj.time_spent_days_drive_per_month + "'" +
    ')'

  var db = mysql.createConnection(DBInfo)

  db.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack)
      throw err
    }
    debug('User ' + DBInfo.user +
                    ' connected successfully to DB ' + DBInfo.database +
                    ' at ' + DBInfo.host)
  })

  db.query(queryInsert, function (err, results, fields) {
    if (err) {
      // error handling code goes here
      debug('Error inserting user data into DB: ', err)
      res.status(501).send('Error inserting user data into DB')
    } else {
      debug('User data successfully added into ' +
                        'DB table ' + DBInfo.database + '->' + DBInfo.db_tables.users_insertions + '\n\n')
      debug('Result from db query is : ', results)
      res.send(results)
    }
  })

  db.end()
}
