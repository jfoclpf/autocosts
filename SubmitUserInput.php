<?php

include('dbService.php');

echo insertUserInputData($_POST['objectToDb']);

function insertUserInputData($objectToDb)
{

    $queryInsert = "INSERT INTO users_insertions (
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
    public_transportation_month_expense
    )

    VALUES (
    '$objectToDb[time_to_fill_form]',
    '$objectToDb[client_uuid]',
    '$objectToDb[country]',
     NOW(),
    '$objectToDb[acquisition_month]',
    '$objectToDb[acquisition_year]',
    '$objectToDb[commercial_value_at_acquisition]',
    '$objectToDb[commercial_value_at_now]',
    '$objectToDb[insure_type]',
    '$objectToDb[insurance_value]',
    '$objectToDb[credit]',
    '$objectToDb[credit_borrowed_amount]',
    '$objectToDb[credit_number_installments]',
    '$objectToDb[credit_amount_installment]',
    '$objectToDb[credit_residual_value]',
    '$objectToDb[inspection_number_inspections]',
    '$objectToDb[inspection_average_inspection_cost]',
    '$objectToDb[vehicle_excise_tax]',
    '$objectToDb[fuel_calculation]',
    '$objectToDb[fuel_currency_based_currency_value]',
    '$objectToDb[fuel_currency_based_periodicity]',
    '$objectToDb[fuel_distance_based_car_to_work]',
    '$objectToDb[fuel_distance_based_car_to_work_number_days_week]',
    '$objectToDb[fuel_distance_based_car_to_work_distance_home_work]',
    '$objectToDb[fuel_distance_based_car_to_work_distance_weekend]',
    '$objectToDb[fuel_distance_based_no_car_to_work_distance]',
    '$objectToDb[fuel_distance_based_no_car_to_fuel_period_distance]',
    '$objectToDb[fuel_distance_based_fuel_efficiency]',
    '$objectToDb[fuel_distance_based_fuel_price]',
    '$objectToDb[maintenance]',
    '$objectToDb[repairs]',
    '$objectToDb[parking]',
    '$objectToDb[tolls_daily]',
    '$objectToDb[tolls_no_daily_value]',
    '$objectToDb[tolls_no_daily_period]',
    '$objectToDb[tolls_daily_expense]',
    '$objectToDb[tolls_daily_number_days]',
    '$objectToDb[tickets_value]',
    '$objectToDb[tickets_periodicity]',
    '$objectToDb[washing_value]',
    '$objectToDb[washing_periodicity]',
    '$objectToDb[household_number_people]',
    '$objectToDb[public_transportation_month_expense]'
    )";

    $result = executeQueryInDB($queryInsert);


    return $result;
}