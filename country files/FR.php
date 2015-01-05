<?php

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
$WEB_PAGE_TITLE = 'Calculatrice des coûts automobiles';
$MAIN_TITLE = "CALCULATRICE DES COÛTS AUTOMOBILES";
$INITIAL_TEXT = "Cette calculatrice vous permettra de trouver <b>le vrai coût de revient</b> de votre voiture en <b>France</b>. Il vous donnera normalement une estimation correcte de ce qu’il faut réellement dépenser pour se permettre d’avoir une voiture. Comme les factures liées à votre automobile arrivent à différents moments de l’année, il est souvent difficile d’évaluer la somme totale dépensée.<br><br> Soyez réaliste avec les valeurs que vous entrez. Pour des factures inattendues telles que des frais de réparations après un accident ou des amendes, pensez à combien vous avez dépensé sur ces postes les années précédentes. Les calculs sont faits par défaut sur une base mensuelle. Utilisez le symbole du point pour la notation décimale, par exemple <span style=\"color:rgb(255,0,0);\">8.7</span> kilomètres entre la maison et le lieu de travail.<br>";

$HELP_PROJECT = 'Ce service est gratuit, sans publicité!';
$AC_MOBILE = 'AUTOCOSTS<br>pour appareils mobiles';
$AC_DOMAIN = 'AUTOCOUTS.FR';
$AC_SUB_HEADER = 'CALCULATRICE DES COÛTS AUTOMOBILES';

//time words
$DAYLY = 'quotidiennement';
$WEEKLY = 'hebdomadairement';
$MONTHLY = 'mensuellement';
$TRIMESTERLY = 'trimestriellement';
$SEMESTERLY = 'semi-annuellement';
$YEARLY = 'annuellement';

$MIN = 'min';
$MINUTES = 'minutes';
$HOUR = 'heure';
$HOURS = 'heures';
$HOUR_ABBR = 'h';
$DAY = 'jour';
$DAYS = 'jours';
$WEEK = 'semaine';
$WEEKS = 'semaines';
$MONTH = 'mois';
$MONTHS = 'mois';
$TWO_MONTHS = 'deux mois';
$DIST_EACH_TWO_MONTHS = 'kilomètres tous les deux mois';
$TRIMESTER = 'trimestre';
$SEMESTER = 'semestre';
$YEAR = 'an';

$DAYS_PER_WEEK_SHORT= 'jours/semaine';

//distance
$DISTANCE = "Distance";

//statistics
$AVERAGE_COSTS_PER_TYPE = 'Coût mensuel moyen par type';
$COUNTRY_NAME = 'France';
$STATISTIC_TITLE = 'Coûts d\'automobile pour la';
$DEPRECIATION_ST = 'Dépréciation';
$INSURANCE_ST = 'Assurance';
$REP_ST = 'Réparations';
$WASHING_ST = 'Lavage';
$VIRTUAL_SPEED_TITLE = 'Vitesse virtuelle';
$KINETIC_SPEED_TITLE = 'Vitesse cinétique';

//calculator words
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
$RUN_CP_DIST = 'Frais courants par kilomètre'; //running costs per unit distance
$TOTAL_CP_DIST = 'Coût total par kilomètre'; //total costs per unit distance
$PUBL_TRA_EQUIV= "Coûts équivalent de transport, si vous ne possédez pas de voiture";
$WORD_TOTAL_CAP = 'TOTAL'; //capital word for total

$WORD_PRINT = 'Imprimer';
$WORD_DOWNLOAD_PDF = 'Téléchargez le rapport en format PDF';

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
$EXTRA_DATA_PUBLIC_TRANSP = 'Transports publics';
$EXTRA_DATA_FAMILY_NBR = 'Combien de personnes agées de plus de 4 ans sont dans votre famille (en vous comptant)';
$EXTRA_DATA_PRICE_PASS = "Quel est le prix moyen par personne du pass mensuel de transports publiq utilisé dans votre vie courante<br><i>si le transport public n’est pas une option pour vous, entrez 0</i>";
$EXTRA_DATA_INCOME = "Revenu";
$EXTRA_DATA_INCOME_QUESTION = 'Quel est votre revenu net?';
$EXTRA_DATA_WORKING_TIME = 'Temps de travail';
$EXTRA_DATA_WORKING_TIME_QUESTION = 'Avez-vous un emploi ou une autonomie financière?';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = 'Le temps consacré à la conduite';
$EXTRA_DATA_TIME_QUESTION1 = 'Combien de minutes conduisez-vous de la maison au travail?(un seul sens)';
$EXTRA_DATA_TIME_QUESTION2 = 'Combien de minutes conduisez-vous les jours où vous ne prenez pas la voiture pour votre lieu de travail?';
$EXTRA_DATA_TIME_QUESTION3 = 'Combien de minutes conduisez-vous?';

//PUBLIC TRANSPORTS
$PUB_TRANS_TEXT = 'Transports publiques dans la vie quotidienne de votre famille';
$FAM_NBR = 'Nombre de membres de votre famille à avoir plus de 4 ans';
$PERSON_OR_PEOPLE = 'personne(s)';
$PASS_MONTH_AVG = 'Prix moyen du passe mensuel de transport par personne';
$OTHER_PUB_TRANS = 'Autres transports public';
$OTHER_PUB_TRANS_DESC = "Somme encore disponible pour d’autres modes de transport publique, par exemple pour sortir de votre zone de résidence, tels que les trains et les bus longue distance";
$TAXI_DESL = "Transportation par taxi";
$ON_TAXI_PAYING = "en taxi en payant"; //ex: 4 km __on taxi paying__ 5€ per km

//VIRTUAL SPEED
$FINANCIAL_EFFORT = 'Effort financier';
$NET_INCOME_PER = 'Revenu net par';
$AVERAGE_NET_INCOME_PER = 'Revenu net moyen par';
$NUMBER_OF_MONTHS = 'Nombre de mois par année de revenu';
$NUMBER_OF_WEEKS = 'Nombre de semaines par année de revenu';
$NUMBER_OF_HOURS= 'Nombre de heures par semaine de revenu';
$HOURS_PER = 'Heures par';
$MONTHS_PER = 'Mois par';
$AVERAGE_WORKING_HOURS_PER = 'Heures moyennes de travail par';
$WORKING_HOURS_PER = 'Heures de travail par';
$DIST_HOME_JOB = 'Vous conduisez de la maison au lieu de travail';
$DAYS_DRIVE_JOB = 'Les jours par semaine où vous conduisez pour travailler';
$DIST_JORNEY_WEEKEND = 'Vous conduisez pendant les jours où vous ne prenez pas la voiture pour le lieu de travail';
$AVERAGE_DIST_PER_WEEK = 'Vous conduisez en moyenne par semaine';
$YOU_DRIVE_PER = 'Vous conduisez par';
$MINUTES_HOME_JOB = 'Minutes que vous conduisez de la maison au lieu de travail';
$DAYS_DRIVE_TO_JOB = 'Jours par semaine que vous conduisez pour travailler';
$TIME_DRIVE_WEEKEND = 'Minutes que vous conduisez dans les jours où vous ne prenez pas la voiture pour le lieu de travail';
$MINUTES_DRIVE_PER = 'Minutes que vous conduisez par';
$DAYS_DRIVE_PER_MONTH = 'Jours que vous conduisez par mois';
$HOURS_DRIVE_PER = 'Heures que vous conduisez par';
$VIRTUAL_SPEED = 'vitesse virtuelle';
$KINETIC_SPEED = 'vitesse cinétique';
$AVER_YEARLY = 'moyenne annuelle';
$WORKING_TIME_MESSAGE = 'Il a été considéré pour les calculs une durée moyenne de travail de 36 heures par semaine et de 11 mois par année';
$HOURS_TO_AFFORD_CAR = 'Heures par an que vous avez besoin de travailler pour payer votre voiture';
$MONTHS_TO_AFFORD_CAR = 'Mois par an que vous avez besoin de travailler pour payer votre voiture';
$TOTAL_COSTS_PER_YEAR = 'Total des coûts par an pour la voiture';
$DAYS_CAR_PAID = 'Pendant combien de jours, après le 1er Janvier, la voiture est payée';

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

$ERROR_INCOME = 'Revenu net non valide';
$ERROR_WEEKS_PER_YEAR = 'Nombre de semaines par an non valide';
$ERROR_MONTHS_PER_YEAR = 'Nombre de mois par an non valide';
$ERROR_HOURS_PER_WEEK = 'Nombre de heures par semaine non valide';
$ERROR_MIN_DRIVE_HOME_JOB = 'Nombre de minutes que vous conduisez de la maison au lieu de travail non valide';
$ERROR_MIN_DRIVE_WEEKEND = 'Nombre de minutes que vous conduisez dans les jours où vous ne prennez pas la voiture pour votre lieu de travail non valide';
$ERROR_MIN_DRIVE = 'Nombre de minutes que vous conduisez non valide';
$ERROR_DAYS_PER_MONTH = 'Nombre de jours par mois non valide';

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
$STD_ACQ_YEAR = '2000'; //year of acquisition 
$STD_PRICE_PAID = ''; //price paid for the car
$STD_PRICE_TODAY = ''; //the price the car has today

$STD_INSURANCE_SEM = ''; //price paid for insurance by semester

$STD_LOAN = ''; //amount asked for credit
$STD_PERIOD_OF_CREDIT = ''; //period of the credit in months
$STD_MONTHLY_PAY = ''; //monthly payment
$STD_RESIDUAL_VALUE = ''; //residual value must be paid after credit

$STD_NBR_INSPECTION = ''; //number of times car went to inspection
$STD_INSPECTION_PRICE = ''; //normal inspection price

$STD_ROAD_TAX = ''; //price paid for road taxes per year

$STD_FUEL_PAID_PER_MONTH = ''; //money spent per month on fuels
$STD_DAYS_PER_WEEK = ''; //days per week one takes their car to work
$STD_JORNEY_2WORK = ''; //(standard distance, km or miles) made from home to work (just one way) 
$STD_JORNEY_WEEKEND = ''; //(standard distance, km or miles) during the other days, for example weekends
$STD_KM_PER_MONTH = ''; //(standard distance, km or miles) made per month
$STD_CAR_FUEL_EFFICIENCY = ''; //(standard fuel efficiency, km/l l/100km mpg(US) or mpg(imp)) fuel efficiency in the chosen standard
$STD_FUEL_PRICE = ''; //price paid for fuel on chosen currency

$STD_MAINTENANCE_PER_YEAR = ''; //amount paid for maintenance per year

$STD_REPAIRS = ''; //repairs and improvements paid per year on average

$STD_PARKING = ''; //parking paid per month

$STD_TOLLS = ''; //amount paid in tolls per trimestre 
$STD_TOLLS_DAY = ''; //amount paid in tolls per day
$STD_TOLLS_DAYS_PER_MONTH = ''; //number of days per month the car crosses a tolled way

$STD_FINES = ''; //fines paid on average per trimestre

$STD_WASHING = ''; //amount paid in washings per trimestre

$STD_NR_PPL_FAMILY = ''; //number of people in the family
$STD_PASS_PRICE = ''; //price of the monthly pass

$STD_INCOME_YEAR = ''; // net income per year
$STD_INCOME_MONTH = ''; // net income per month
$STD_INCOME_WEEK = ''; // net income per week
$STD_INCOME_HOUR = ''; // net income per hour
$STD_HOURS_WEEK = ''; // hours per week
$STD_MONTHS_YEAR = ''; // months per year
$STD_WEEKS_YEAR = ''; // weeks per year
$STD_HOURS_WEEK = ''; // work hours per week
$STD_TIME_HOME_JOB = ''; // minutes you drive from home to workplace
$STD_TIME_WEEKEND = '';// minutes you drive in the days you don't take the car to workplace
$STD_TIME_IN_DRIVING = ''; // time spent in driving (minutes/day)
$STD_DAYS_MONTH = ''; // days per month
?>
