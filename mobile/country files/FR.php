﻿<?php

// COUNTRY: FRANCE
// LANGAUAGE: FRANCES

//***********************************************
//											   **
//      Translation for AUTOCOSTS.ORG          **
//      the automobile costs simulator		   **
// 											   **
//      made by João Pimentel Ferreira         **
//       under Creative Commons BY-SA          **
//	  										   **
//***********************************************

// IMPORTANT: Preserve always the same standards, BE CHOERENT between the text variables and the standard options

//Fuel efficiency for car engine standard
$fuel_efficiency_std_option = 1;
//1 - l/100km - litres par 100 kilomètres
//2 - km/l - kilomètres par litre

//Standard distance
$distance_std_option = 1;
//1 - kilomètres

//Standard volume for the price of fuels, ex: Currency($,£,€,etc.)/(Litre, Imp gallon, US gallon) 
$fuel_price_volume_std = 1;
//1 - litres

//standards TEXT VERSION
//IMPORTANT: BE COHERENT with the above standards
$CURR_NAME = 'Euro';
$CURR_NAME_PLURAL = 'Euros';
$CURR_NAME_BIG_PLURAL = 'EUROS';
$CURR_SYMBOL = '&euro;';
$STD_DIST = 'km'; //short text version you'd like to apply 
$STD_DIST_FULL = 'kilomètres';
$STD_FUEL_CALC = 'l/100km'; //text version you'd like to apply
$STD_VOLUME_SHORT = 'l'; //short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)

//simple words
$WORD_PER = 'par';     //ex: 4 km _per_ day
$WORDS_PER_EACH = 'tous les';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = 'fois'; //ex: 4 times per week
$DURING = 'pendant';   //spent in tolls 3€ per day _during_ 22 days per month
$WORD_PEOPLE = 'personnes';   //plural, 3 _people_ 
$YES = 'oui';
$NO = 'non';

$BUTTON_RUN = 'Lancez'; //run simulator button 
$BUTTON_RERUN = 'Relancez'; //run simulator button 

//WEB PAGE
$WEB_PAGE_TITLE = 'Simulateur des coûts automobiles';
$MAIN_TITLE = "SIMULATEUR DES COÛTS AUTOMOBILES";
$INITIAL_TEXT = "Ce simulateur vous permettra de trouver <b>le vrai coût de revient</b> de votre voiture au <b>France</b>. Il vous donnera normalement une estimation correcte de ce qu’il faut réellement dépenser pour se permettre d’avoir une voiture. Comme les factures liées à votre automobile arrivent à différents moments de l’année, il est souvent difficile d’évaluer la somme totale dépensée.<br><br> Soyez réaliste avec les valeurs que vous entrez. Pour des factures inattendues telles que des frais de réparations après un accident ou des amendes, pensez à combien vous avez dépensé sur ces postes les années précédentes. Les calculs sont faits par défaut sur une base mensuelle. Utilisez le symbole du point pour la notation décimale, par exemple <span style=\"color:rgb(255,0,0);\">8.7</span> kilomètres entre la maison et le lieu de travail.<br>";

$HELP_PROJECT = 'Aidez ce projet';
$AC_MOBILE = 'AUTOCOSTS<br>pour appareils mobiles';
$AC_HEADER = '<big><u>WWW.AUTOCOSTS.ORG</u></big><br><b>SIMULATEUR DES COÛTS AUTOMOBILES </b>';


//time words
$DAYLY = 'quotidiennement';
$WEEKLY = 'hebdomadairement';
$MONTHLY = 'mensuellement';
$TRIMESTERLY = 'trimestriellement';
$SEMESTERLY = 'semi-annuellement';
$YEARLY = 'annuellement';

$DAY = 'jour';
$DAYS = 'jours';
$WEEK = 'semaine';
$MONTH = 'mois';
$MONTHS = 'mois';
$TWO_MONTHS = 'deux mois';
$DIST_EACH_TWO_MONTHS = 'kilomètres tous les deux mois';
$TRIMESTER = 'trimestre';
$SEMESTER = 'semestre';
$YEAR = 'an';

$DAYS_PER_WEEK_SHORT= 'jours/semaine';

//simulator words
$COSTS= "Coûts";
$FIXED_COSTS = 'Frais permanents';
$FIXED_COSTS_HEADER_1= 'FRAIS PERMANENTS'; //capital letters
$FIXED_COSTS_HEADER_2= "Ce sont ceux ne dépendant pas de la distance parcourue, et devant être payés même si la voiture est toujours arrêtée"; 
$DAYS_PER = "jours par";

$RUNNING_COSTS = 'Frais courants';
$RUNNING_COSTS_HEADER_1 = 'FRAIS COURANTS'; //capital letters
$RUNNING_COSTS_HEADER_2 = 'Ceux qui dépendent de la distance parcourue';

$PRIVATE_COSTS = 'Coûts privés';
$MONTHLY_AMOUNT = 'Somme mensuelle';
$RUN_CP_DIST = 'Frais courants par kilomètro'; //running costs per unit distance
$TOTAL_CP_DIST = 'Coût total par kilomètro'; //total costs per unit distance
$PUBL_TRA_EQUIV= "Coûts équivalent de transport, si vous ne possédez pas de voiture";
$WORD_TOTAL_CAP = 'TOTAL'; //capital word for total

//depreciation
$DEPRECIATION = 'Dépréciation du véhicule';
$AQ_DATE = 'Date d’acquisition du véhicule';
$COM_VALUE = 'Valeur commerciale du véhicule au moment de l’achat. <br><i>s’il s’agit d’un véhicule neuf, c’est son prix d’achat<br> s’il s’agit d’un véhicule d’occasion, c’est sa valeur commerciale au moment de l’achat</i>';
$COM_VALUE_TODAY = 'Valeur commerciale actuelle du véhicule<br><i>Si vous le vendiez maintenant, combien obtiendriez-vous ?</i>';
$PERIOD_OWN = 'Période de possession';
$FINAL_VALUE = "Valeur aujourd'hui";
$AQ_VALUE = 'Valeur à l’achat';

//insurance
$INSURANCE = 'Assurance du véhicle et services d’assistance';
$INSURANCE_SHORT = 'Assurance et services d’assistance';

//credit
$CREDIT = 'Financement de la voiture';
$CREDIT_PERIOD = 'Durée';
$CREDIT_INTERESTS = 'Intérêts de l’emprunt';
$CREDIT_INTERESTS_MONTH = 'Paiement mensuel des intérêts';
$CREDIT_TOTAL_INTERESTS = 'Montant total des intérêts';
$CREDIT_QUESTION = 'Avez-vous financé l’achat de votre voiture ?';
$CREDIT_LOAN = 'Montant financé:<br><i>combien avez-vous emprunté?</i>';
$CREDIT_LOAN2 = 'Montant financé';
$CREDIT_PERIOD = 'Durée du crédit / nombre de versements';
$CREDIT_AVERAGE_VALUE = 'Montant moyen de chaque paiement';
$CREDIT_RESIDUAL_VALUE = 'Valeur résiduelle :<br><i>À la fin de la période de crédit, quelle montant devez-vous payer ou avez-vous payé ?</i>';
$CREDIT_RESIDUAL_VALUE1 = 'Valeur résiduelle';
$CREDIT_INSTALMENT = 'Valeur moyenne mensuelle';

//inspection
$INSPECTION = 'Inspection du véhicule (contrôle technique)';
$INSPECTION_SHORT = 'Inspection';
$INSPECTION_NBMR_TIMES = 'Combien de fois avez-vous fait inspecter votre véhicule?';
$INSPECTION_PRICE =  'Coût moyen de chaque inspection de véhicule';
$EACH_ONE_DURING = 'chacune valide'; //5 times costing 15€ *each one during* 20 months (inspection)
$TIMES_COSTING = 'fois le coût de';     //5 *times costing* 15€ each one during 20 months (inspection)

//road taxes
$ROAD_TAXES = "Droits d'accise sur les véhicules (taxe automobile)";
$ROAD_TAXES_SHORT = 'Taxe automobile';
$ROAD_TAXES_VALUE = 'Taxe automobile sur votre voiture :<br><i>paiement fait à l’état</i>';

//fuel
$FUEL = 'Carburant';
$FUEL_DESC = 'Essence, diesel, GPL, electricité';
$FUEL_CALC = 'Calculs basés sur';
$FUEL_JOB_CALC = 'Conduisez-vous pour aller travailler ?';
$FUEL_JOB_CALC1 = 'jour(s) par semaine où vous conduisez pour aller travailler';
$FUEL_DAYS = 'Nombre de jour(s) par semaine où vous conduisez pour aller travailler';
$FUEL_DIST_HOME_JOB = 'Kilomètres conduits entre votre maison et votre travail (dans une direction)'; //$CURR_DIST=km, miles, etc.
$FUEL_DIST_HOME_JOB1 = 'kilomètres entre votre maison et votre travail '; //you do 7 km between home and job
$FUEL_DIST_NO_JOB = "Kilomètres conduits en moyenne les jours où vous n’emmenez pas votre voiture au travail<br><i>par exemple par chaque weekend</i>";
$FUEL_DIST_NO_JOB1 = "kilomètres en moyenne les jours où vous n’emmenez pas votre voiture au travail"; // you do 5 km per week....
$FUEL_DIST = 'Kilomètres que vous conduisez';
$FUEL_CAR_EFF = 'Consommation de carburant de votre véhicule';
$FUEL_PRICE = 'Prix moyen que vous payez pour le carburant';
$FUEL_PRICE1 = 'Prix moyen du carburant';
$YOU_DRIVE_TOTTALY_AVG = 'Au final, vous conduisez en moyenne'; //__You drive totally on average of__ 5 km per day
$YOU_DRIVE = 'Vous conduisez'; //__You drive__ 5 km per day

//MAINTENANCE
$MAINTENANCE = 'Entretien';
$MAINTENANCE_DESC = 'Coût moyen de l’entretien et de l’assistance dépannage:<br><i>changement d’huile moteur, filtres, feux, pneus, freins, air conditionné, réglage de la direction, etc.</i>';
	
//REPAIRS AND IMPROVEMENTS
$REP_IMPROV = 'Réparations et améliorations';
$REP_IMPROV_DESC = 'Coût moyen des réparations et améliorations :<br><i>pièces détachées, modifications, réparation de dysfonctionnement, bosses, collisions, réglages, etc.</i>';

//PARKING
$PARKING = 'Stationnement';
$PARKING_DESC = 'Coût moyen de stationnement :<br><i>parcmètres dans la ville, location d’une place de stationnement, parcs de stationnement souterrains ou en surface dans des bâtiments publics, centres commerciaux, aéroports, stations de bus ou gares ou toute autre infrastructure.</i>';

//TOLLS
$TOLLS = 'Péages';
$TOLLS_DESC = 'Montant moyen dépensé aux péages<br><i>ponts, tunnels, autoroutes et taxes de congestion pour accéder au centre-ville</i>';
$TOLLS_DAY_CALC = 'Calcul basé sur le quotidien ?';
$TOLLS_DAY_CALC1 = 'Montant quotidien dépensé aux péages';
$TOLLS_DAY_CALC_DESC = 'Pensez même aux rares voyages que vous faîtes dans la banlieue de votre ville ou à la campagne, ou aux reçus provenant de tous types de télépéages';

//FINES
$FINES = 'Contraventions';
$FINES_DESC = 'Montant moyen payé pour les contraventions :<br><i>pensez à combien vous avez dépensé ces dernières années en contraventions de toute nature (stationnement illégal, dépassement de la limitation de vitesse, cellulaire, etc.)</i>';

//WASHING
$WASHING = 'Lavage et nettoyage';
$WASHING_DESC = 'Facture moyenne du nettoyage et du service de valet :<br><i>dans les stations-services et autres lieux</i>';

//TOTAL
$TOTAL_FIXED = 'TOTAL - Frais permanents ';
$TOTAL_FIXED_DESCR = "Ce sont ceux ne dépendant pas de la distance parcourue, et qui doivent être payés même si la voiture est arrêtée";
$TOTAL_FIXED_DESCR2 = 'Dépréciation, assurance, intérêts du financement, taxes, inspection et 50% du stationnement et de l’entretien';

$TOTAL_VARIABLE = 'TOTAL – Frais courants';
$TOTAL_VARIABLE_DESCR = ' Ceux qui dépendent du nombre de milles parcourus ';
$TOTAL_VARIABLE_DESCR2 = 'Carburants, réparation et améliorations, stationnement (à condition que celui-ci soit payé uniquement quand vous utilisez la voiture), péages, contraventions, lavage, et 50% de l’entretien';


//EXTRA DATA
$EXTRA_DATA = 'INFORMATION ADDITIONNELLE';
$EXTRA_DATA1 = 'Information additionnelle';
$EXTRA_DATA_FAMILY_NBR = 'Combien de personnes agées de plus de 4 ans sont dans votre famille (en vous comptant)';
$EXTRA_DATA_PRICE_PASS = "Quel est le prix moyen par personne du passe mensuel de transports publiques utilisé dans votre vie courante<br><i>si le transport public n’est pas une option pour vous, entrez 0</i>";

//PUBLIC TRANSPORTS
$PUB_TRANS_TEXT = 'Transports publiques dans la vie quotidienne de votre famille';
$FAM_NBR = 'Nombre de membres de votre famille à avoir plus de 4 ans';
$PERSON_OR_PEOPLE = 'personne(s)';
$PASS_MONTH_AVG = 'Prix moyen du passe mensuel de transport par personne';
$OTHER_PUB_TRANS = 'Autres transports public';
$OTHER_PUB_TRANS_DESC = "Somme encore disponible pour d’autres modes de transport publique, par exemple pour sortir de votre zone de résidence, tels que les trains et les bus longue distance";
$TAXI_DESL = "Transportation par taxi";
$ON_TAXI_PAYING = "en taxi en payant"; //ex: 4 km __on taxi paying__ 5€ per km


//**************************************************
//GRAPHICS
$PARCEL = 'Section';
$COSTS = 'Coûts';


//****************************************************
//ERROR MESSAGES
$ERROR_INVALID_INSU_VALUE = 'Montant d’assurance non valide';
$ERROR_INSU_PERIOD = 'Entrez la périodicité de l’assurance';

$ERROR_FUEL_CURR_DIST = 'Vous devez indiquer si vous voulez faire vos calculs par euro ou par kilomètro';
$ERROR_FUEL_CAR_EFF = 'Montant non valide de la consommation de carburant';
$ERROR_FUEL_PRICE = 'Prix du carburant non valide';
$ERROR_CAR_JOB = 'Veuillez indiquer si vous amenez votre véhicule sur le lieu de travail';
$ERROR_FUEL_DIST = 'Nombre de milles parcourus par mois non valide';
$ERROR_DAYS_PER_WEEK = 'Nombre non valide de jours par semaine';
$ERROR_DIST_HOME_WORK = 'Nombre non valide de kilomètres entre la maison et le travail';
$ERROR_DIST_NO_JOB = "Le nombre de kilomètres que vous parcourez quand vous n’amenez pas votre voiture au travail n’est pas valide";
$ERROR_CURRENCY = 'Euro par mois non valides';

$ERROR_DEPRECIATION_MONTH = 'Mois d’acquisition non valide';
$ERROR_DEPRECIATION_YEAR = 'Année d’acquisition non valide';
$ERROR_DEPRECIATION_VALUE = 'Montant d’acquisition non valide';
$ERROR_DEPRECIATION_VALUE_TODAY = 'Valeur actuelle du véhicule non valide';
$ERROR_DEPRECIATION_DATE = 'Date d’acquisition non valide';
$ERROR_DEPRECIATION_NEW_CAR = 'La dépréciation ne s’applique pas parce que le véhicule est neuf';

$ERROR_CREDIT_QUESTION = 'Veuillez indiquer si vous avez financé votre voiture';
$ERROR_CREDIT_LOAN_VALUE = 'Montant financé non valide';
$ERROR_CREDIT_PERIOD = 'Durée du crédit non valide, nombre de versements';
$ERROR_CREDIT_INSTALMENT = 'Nombre de versements non valide';
$ERROR_CREDIT_RESIDUAL_VALUE = 'Valeur résiduelle non valide';

$ERROR_INSPECTION_NTIMES = 'Nombre de fois non valide';
$ERROR_INSPECTION_COSTS = 'Coût d’inspection non valide';

$INVALID_AMOUNT = 'Montant non valide';

$INVALID_NBR_PP = 'Nombre non valide de personne';
$ERROR_PASS_AMOUNT= 'Montant mensuel des amendes non valide';

//FINAL RESULT
$YOUR_CAR_COSTS_YOU = 'Les coûts de vôtre voiture sont';
$WITH_THIS_LEVEL_OF_COSTS = 'Avec ce niveau de coûts, votre véhicule ayant été'; //ex: __"With this level of costs, you car during the"__ 15 months of possession....
$MONTHS_POSS = 'mois en votre possession a déjà coûté';   //ex: With this level of costs, you car during the 15 ___"months of possession has already costed"___ 14000 Euros


$TAXI_PRICE_PER_DIST=1.5; //price paid for taxi in chosen currency per chosen unit distance

//*****************************************
//STANDARD COMMON AVERAGE DEFAULT values that apear on the start page
//these values are to be changed by the user but you shall put values that are reasonable
//keep in mind your chosen standard Currency and your volume and fuel efficiency standards

$STD_ACQ_MONTH = '01'; //month of acquisition 
$STD_ACQ_YEAR = '2005'; //year of acquisition 
$STD_PRICE_PAID = '15000'; //price paid for the car
$STD_PRICE_TODAY = '2000'; //the price the car has today

$STD_INSURANCE_SEM = '78.5'; //price paid for insurance by semester

$STD_LOAN = '20000'; //amount asked for credit
$STD_PERIOD_OF_CREDIT = '48'; //period of the credit in months
$STD_MONTHLY_PAY = '400'; //monthly payment
$STD_RESIDUAL_VALUE = '5000'; //residual value must be paid after credit

$STD_NBR_INSPECTION = '5'; //number of times car went to inspection
$STD_INSPECTION_PRICE = '55'; //normal inspection price

$STD_ROAD_TAX = '80'; //price paid for road taxes per year

$STD_FUEL_PAID_PER_MONTH = '200'; //money spent per month on fuels
$STD_DAYS_PER_WEEK = '5'; //days per week one takes their car to work
$STD_JORNEY_2WORK = '20'; //(standard distance, km or miles) made from home to work (just one way) 
$STD_JORNEY_WEEKEND = '15'; //(standard distance, km or miles) during the other days, for example weekends
$STD_KM_PER_MONTH = '300'; //(standard distance, km or miles) made per month
$STD_CAR_FUEL_EFFICIENCY = '7'; //(standard fuel efficiency, km/l l/100km mpg(US) or mpg(imp)) fuel efficiency in the chosen standard
$STD_FUEL_PRICE = '1.39'; //price paid for fuel on chosen currency

$STD_MAINTENANCE_PER_YEAR = '350'; //amount paid for maintenance per year

$STD_REPAIRS = '150'; //repairs and improvements paid per year on average

$STD_PARKING = '50'; //parking paid per month

$STD_TOLLS = '50'; //amount paid in tolls per trimestre 
$STD_TOLLS_DAY = '1.6'; //amount paid in tolls per day
$STD_TOLLS_DAYS_PER_MONTH = '22'; //number of days per month the car crosses a tolled way

$STD_FINES = '20'; //fines paid on average per trimestre

$STD_WASHING = '10'; //amount paid in washings per trimestre

?>