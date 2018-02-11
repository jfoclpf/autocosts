/*functions which deal with the user POST submission*/

const mysql = require('mysql'); //module to get info from DB

module.exports = function (req, res, serverData){
    
    var DBInfo = serverData.settings.dataBase.credentials;    
    
    //object got from POST
    var objectToDb = req.body.objectToDb;    
              
    //console.log(objectToDb);
    console.log('\nInserting user data into ' +
                'DB table ' + DBInfo.database + '->' + DBInfo.db_tables.users_insertions);

    var queryInsert = "INSERT INTO " + DBInfo.db_tables.users_insertions + " ( \
        time_to_fill_form, \
        uuid_client, \
        country, \
        insertion_date, \
        acquisition_month, \
        acquisition_year, \
        commercial_value_at_acquisition, \
        commercial_value_at_now, \
        insure_type, \
        insurance_value, \
        credit, \
        credit_borrowed_amount, \
        credit_number_installments, \
        credit_amount_installment, \
        credit_residual_value, \
        inspection_number_inspections, \
        inspection_average_inspection_cost, \
        vehicle_excise_tax, \
        fuel_calculation, \
        fuel_currency_based_currency_value, \
        fuel_currency_based_periodicity, \
        fuel_distance_based_car_to_work, \
        fuel_distance_based_car_to_work_number_days_week, \
        fuel_distance_based_car_to_work_distance_home_work, \
        fuel_distance_based_car_to_work_distance_weekend, \
        fuel_distance_based_no_car_to_work_distance, \
        fuel_distance_based_no_car_to_fuel_period_distance, \
        fuel_distance_based_fuel_efficiency, \
        fuel_distance_based_fuel_price, \
        maintenance, \
        repairs, \
        parking, \
        tolls_daily, \
        tolls_no_daily_value, \
        tolls_no_daily_period, \
        tolls_daily_expense, \
        tolls_daily_number_days, \
        tickets_value, \
        tickets_periodicity, \
        washing_value, \
        washing_periodicity, \
        household_number_people, \
        public_transportation_month_expense, \
        income_type, \
        income_per_year, \
        income_per_month, \
        income_months_per_year, \
        income_per_week, \
        income_weeks_per_year, \
        income_per_hour, \
        income_hours_per_week, \
        income_hour_weeks_per_year, \
        work_time, \
        work_time_month_per_year, \
        work_time_hours_per_week, \
        distance_drive_to_work, \
        distance_days_per_week, \
        distance_home_job, \
        distance_journey_weekend, \
        distance_per_month, \
        distance_period, \
        time_spent_home_job, \
        time_spent_weekend, \
        time_spent_min_drive_per_day, \
        time_spent_days_drive_per_month \
    ) \
    VALUES ( " +
        "'" + objectToDb.time_to_fill_form + "', " +
        "'" + objectToDb.client_uuid + "', " +
        "'" + objectToDb.country + "', " +
        " NOW() , " +
        "'" + objectToDb.acquisition_month + "', " +
        "'" + objectToDb.acquisition_year + "', " +
        "'" + objectToDb.commercial_value_at_acquisition + "', " +
        "'" + objectToDb.commercial_value_at_now + "', " +
        "'" + objectToDb.insure_type + "', " +
        "'" + objectToDb.insurance_value + "', " +
        "'" + objectToDb.credit + "', " +
        "'" + objectToDb.credit_borrowed_amount + "', " +
        "'" + objectToDb.credit_number_installments + "', " +
        "'" + objectToDb.credit_amount_installment + "', " +
        "'" + objectToDb.credit_residual_value + "', " +
        "'" + objectToDb.inspection_number_inspections + "', " +
        "'" + objectToDb.inspection_average_inspection_cost + "', " +
        "'" + objectToDb.vehicle_excise_tax + "', " +
        "'" + objectToDb.fuel_calculation + "', " +
        "'" + objectToDb.fuel_currency_based_currency_value + "', " +
        "'" + objectToDb.fuel_currency_based_periodicity + "', " +
        "'" + objectToDb.fuel_distance_based_car_to_work + "', " +
        "'" + objectToDb.fuel_distance_based_car_to_work_number_days_week + "', " +
        "'" + objectToDb.fuel_distance_based_car_to_work_distance_home_work + "', " +
        "'" + objectToDb.fuel_distance_based_car_to_work_distance_weekend + "', " +
        "'" + objectToDb.fuel_distance_based_no_car_to_work_distance + "', " +
        "'" + objectToDb.fuel_distance_based_no_car_to_fuel_period_distance + "', " +
        "'" + objectToDb.fuel_distance_based_fuel_efficiency + "', " +
        "'" + objectToDb.fuel_distance_based_fuel_price + "', " +
        "'" + objectToDb.maintenance + "', " +
        "'" + objectToDb.repairs + "', " +
        "'" + objectToDb.parking + "', " +
        "'" + objectToDb.tolls_daily + "', " +
        "'" + objectToDb.tolls_no_daily_value + "', " +
        "'" + objectToDb.tolls_no_daily_period + "', " +
        "'" + objectToDb.tolls_daily_expense + "', " +
        "'" + objectToDb.tolls_daily_number_days + "', " +
        "'" + objectToDb.tickets_value + "', " +
        "'" + objectToDb.tickets_periodicity + "', " +
        "'" + objectToDb.washing_value + "', " +
        "'" + objectToDb.washing_periodicity + "', " +
        "'" + objectToDb.household_number_people + "', " +
        "'" + objectToDb.public_transportation_month_expense + "', " +
        "'" + objectToDb.income_type + "', " +
        "'" + objectToDb.income_per_year + "', " +
        "'" + objectToDb.income_per_month + "', " +
        "'" + objectToDb.income_months_per_year + "', " +
        "'" + objectToDb.income_per_week + "', " +
        "'" + objectToDb.income_weeks_per_year + "', " +
        "'" + objectToDb.income_per_hour + "', " +
        "'" + objectToDb.income_hours_per_week + "', " +
        "'" + objectToDb.income_hour_weeks_per_year + "', " +
        "'" + objectToDb.work_time + "', " +
        "'" + objectToDb.work_time_month_per_year + "', " +
        "'" + objectToDb.work_time_hours_per_week + "', " +
        "'" + objectToDb.distance_drive_to_work + "', " +
        "'" + objectToDb.distance_days_per_week + "', " +
        "'" + objectToDb.distance_home_job + "', " +
        "'" + objectToDb.distance_journey_weekend + "', " +
        "'" + objectToDb.distance_per_month + "', " +
        "'" + objectToDb.distance_period + "', " +
        "'" + objectToDb.time_spent_home_job + "', " +
        "'" + objectToDb.time_spent_weekend + "', " +
        "'" + objectToDb.time_spent_min_drive_per_day + "', " +
        "'" + objectToDb.time_spent_days_drive_per_month + "'" +
    ")";

    var db = mysql.createConnection(DBInfo);

    db.connect(function(err){
        if (err) {
            console.error('error connecting: ' + err.stack);
            throw err;
        }
        console.log('User ' + DBInfo.user + 
                    ' connected successfully to DB ' + DBInfo.database + 
                    ' at ' + DBInfo.host);
    });

    db.query(queryInsert, function(err, results, fields) {
        if (err) {                                
            // error handling code goes here
            console.log("Error inserting user data into DB: ", err);
            res.status(501).send('Error inserting user data into DB');
        }
        else{
            console.log('User data successfully added into ' +
                        'DB table ' + DBInfo.database + '->' + DBInfo.db_tables.users_insertions + '\n\n');        
            console.log("Result from db query is : ", results);
            res.send(results);
        }                               
    });
    
    db.end();
}