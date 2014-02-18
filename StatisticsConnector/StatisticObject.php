<?php

class StatisticObject {

    var $currency;
    var $country;
    var $acquisitionDate;
    var $valueAtAcquisition;
    var $valueToday;
    var $insurancePeriodicity;
    var $insuranceValue;
    var $financedAmount;
    var $creditPeriod;
    var $installmentAmount;
    var $residualValue;
    var $numberOfInspections;
    var $averageInspectionCost;
    var $autoTaxes;






    function getCurrency(){
        return $this->currency;
    }

    function setCurrency($currency) {
        $this->currency = $currency;
    }

    function getCountry(){
        return $this->country;
    }

    function setCountry($country) {
        $this->country = $country;
    }
}