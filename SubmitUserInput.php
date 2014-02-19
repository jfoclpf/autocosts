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
    borrowed_amount,
    number_installments,
    amount_installment,
    residual_value,
    number_inspections,
    average_inspection_cost,
    vehicle_excise_tax,
    fuel_calculation,
    fuel_corrency_value,
    fuel_periocity,
    car_to_job,
    car_to_work_number_days_week,
    car_to_work_distance_home_work,
    car_to_work_distance_weekend,
    fuel_efficiency,
    no_car_to_work_distance,
    fuel_period_distance,
    fuel_effeciency,
    fuel_price,
    maintenance,
    repairs,
    parking,
    tolls_daily,
    no_daily_tolls_value,
    tolls_period,
    daily_expense_tolls,
    number_days_tolls,
    tickets_value,
    tickes_periocity,
    washing_value,
    washing_periocity,
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
    '$objectToDb[borrowed_amount]',
    '$objectToDb[number_installments]',
    '$objectToDb[amount_installment]',
    '$objectToDb[residual_value]',
    '$objectToDb[number_inspections]',
    '$objectToDb[average_inspection_cost]',
    '$objectToDb[vehicle_excise_tax]',
    '$objectToDb[fuel_calculation]',
    '$objectToDb[fuel_corrency_value]',
    '$objectToDb[fuel_periocity]',
    '$objectToDb[car_to_job]',
    '$objectToDb[car_to_work_number_days_week]',
    '$objectToDb[car_to_work_distance_home_work]',
    '$objectToDb[car_to_work_distance_weekend]',
    '$objectToDb[fuel_efficiency]',
    '$objectToDb[no_car_to_work_distance]',
    '$objectToDb[fuel_period_distance]',
    '$objectToDb[fuel_effeciency]',
    '$objectToDb[fuel_price]',
    '$objectToDb[maintenance]',
    '$objectToDb[repairs]',
    '$objectToDb[parking]',
    '$objectToDb[tolls_daily]',
    '$objectToDb[no_daily_tolls_value]',
    '$objectToDb[tolls_period]',
    '$objectToDb[daily_expense_tolls]',
    '$objectToDb[number_days_tolls]',
    '$objectToDb[tickets_value]',
    '$objectToDb[tickes_periocity]',
    '$objectToDb[washing_value]',
    '$objectToDb[washing_periocity]',
    '$objectToDb[household_number_people]',
    '$objectToDb[public_transportation_month_expense]'
    )";

    $result = executeQueryInDB($queryInsert);


    return $result;
}