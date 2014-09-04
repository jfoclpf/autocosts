<?php

// COUNTRY: NORGE
// LANGAUAGE: NORSK
//***********************************************
//											   **
//      Translation for AUTOCOSTS.ORG          **
//      the automobile costs simulator		   **
// 											   **
//      made by Joao Pimentel Ferreira         **
//       under Creative Commons BY-SA          **
//	  										   **
//***********************************************

// IMPORTANT: Preserve always the same standards, BE CHOERENT between the text variables and the standard options

//Fuel efficiency for car engine standard
$fuel_efficiency_std_option = 5;
//1 - l/100km - litres per 100 kilometres
//2 - km/l - kilometres per litre
//3 - mpg(imp) - miles per imperial gallon
//4 - mpg(US) - miles per US gallon
//5 - l/mil - litres per 10 kilometers

//Standard distance
$distance_std_option = 3;
//1 - kilometres
//2 - miles
//3 - mil

//Standard volume for the price of fuels, ex: Currency($,£,€,etc.)/(Litre, Imp gallon, US gallon) 
$fuel_price_volume_std = 1;
//1 - litres
//2 - imperial gallons
//3 - US gallons

//standards TEXT VERSION
//IMPORTANT: BE COHERENT with the above standards
$CURR_NAME = 'Krone';
$CURR_NAME_PLURAL = 'Kroner';
$CURR_NAME_BIG_PLURAL = 'KRONER';
$CURR_SYMBOL = 'kr';
$STD_DIST = 'mil'; //short text version you'd like to apply
$STD_DIST_FULL = 'mil';
$STD_FUEL_CALC = 'l/10km'; //text version you'd like to apply
$STD_VOLUME_SHORT = 'l'; //short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)

//simple words
$WORD_PER = 'per';     //ex: 4 km _per_ day
$WORDS_PER_EACH = 'per hver';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = 'ganger'; //ex: 4 times per week
$DURING = 'under';   //spent in tolls 3x per day _during_ 22 days per month
$WORD_PEOPLE = 'personer';   //plural, 3 _people_ 
$YES = 'ja';
$NO = 'no';

$BUTTON_RUN = 'Regn ut'; //run simulator button 
$BUTTON_RERUN = 'Regn ut på nytt'; //run simulator button 

//WEB PAGE
$WEB_PAGE_TITLE = 'Kostnadskalkulator for bil';
$MAIN_TITLE = 'KOSTNADSKALKULATOR FOR BIL';
$INITIAL_TEXT = 
"Denne kalkulatoren lar deg regne ut hva <b>den virkelige prisen</b> på å eie en bil i <b>Norge</b> er. Den vil normalt gi et godt anslag på hva det koster å eie en bil. Ettersom bilregningene kommer til ulike tider på året kan det ofte være vanskelig å få en fullstendig oversikt over hvor mye du bruker på bilen din.
<br>
<br>
Oppgi realistiske verdier. For uventede regninger som bøter eller reparasjoner på skader, tenk på hvor mye du har brukt i løpet av de siste årene. Kalkulasjonene tar som utgangspunkt en periodisitet som er månedlig basert. Bruk punktum for desimalnotering, for eksempel <span style=\"color:rgb(255,0,0);\">1.7</span> mil mellom hjem og arbeidsplass (1&nbsp;mil&nbsp;=&nbsp;10&nbsp;km).<br>";

$HELP_PROJECT = 'Hjelp dette prosjektet' ;
$AC_MOBILE = 'AUTOCOSTS<br> for mobile produkter';
$AC_HEADER = '<big><u>WWW.AUTOCOSTS.ORG</u></big><br><b>KOSTNADSKALKULATOR FOR BIL</b>';


//time words
$DAYLY = 'daglig';
$WEEKLY = 'ukentlig';
$MONTHLY = 'månedlig';
$TRIMESTERLY = 'hvert kvartal';
$SEMESTERLY = 'hvert halvår';
$YEARLY = 'årlig';

$MIN = 'min';
$MINUTES = 'minutes';
$HOUR = 'hour';
$HOURS = 'hours';
$HOUR_ABBR = 'h';
$DAY = 'dag';
$DAYS = 'dager';
$WEEK = 'uke';
$WEEKS = 'weeks';
$MONTH = 'måned';
$MONTHS = 'måneder';
$TWO_MONTHS = 'to måned';
$DIST_EACH_TWO_MONTHS = 'mil for annenhver måned';
$TRIMESTER = 'kvartal';
$SEMESTER = 'halvår';
$YEAR = 'år';

$DAYS_PER_WEEK_SHORT= 'dager/uke';

//distance
$DISTANCE = "Distance";

//calculator words
$COSTS= "Kostnader";
$FIXED_COSTS = 'Stående kostnader';
$FIXED_COSTS_HEADER_1= 'STÅENDE KOSTNADER'; //capital letters
$FIXED_COSTS_HEADER_2= "For de som ikke avhenger av reisedistanse, og må betale for å ha bilen klar til å kjøre."; 

$RUNNING_COSTS = 'Løpende kostnader';
$RUNNING_COSTS_HEADER_1 = 'LØPENDE KOSTNADER'; //capital letters
$RUNNING_COSTS_HEADER_2 = 'For de som avhenger av reisedistansen';

$PRIVATE_COSTS = 'Private kostnader';
$MONTHLY_AMOUNT = 'Månedlig beløp';
$RUN_CP_DIST = 'Løpende kostnader per kilometer'; //running costs per unit distance
$TOTAL_CP_DIST = 'Total kostnad per kilometer'; //total costs per unit distance
$PUBL_TRA_EQUIV= "Tilsvarende transportpriser, tatt i utgangspunkt i at du ikke eier bil";
$WORD_TOTAL_CAP = 'TOTALT'; //capital word for total

$WORD_PRINT = 'Print';
$WORD_DOWNLOAD_PDF = 'Download PDF report';

//depreciation
$DEPRECIATION = 'Nedbetaling av kjøretøyet';
$AQ_DATE = 'Dato for overtakelse av bil';
$COM_VALUE = 'Bilens markedspris da den ble overtatt<br><i>om ny, prisen du betalte for bilen<br>om brukt, markedsprisen på bilen når du overtok den</i>';
$COM_VALUE_TODAY = 'Dagens markedspris på bilen<br><i>hvor mye ville du fått om du skulle solgt den nå?</i>';
$PERIOD_OWN = 'Periode for eierskap';
$FINAL_VALUE = 'Total verdi';
$AQ_VALUE = 'Anskaffelsesverdi';

//insurance
$INSURANCE = 'Bilforsikring og veihjelp';
$INSURANCE_SHORT = 'Forsikring og veihjelp';

//credit
$CREDIT = 'Billån';
$CREDIT_PERIOD = 'Periode';
$CREDIT_INTERESTS = 'Låneinteresse';
$CREDIT_INTERESTS_MONTH = 'Månedlig interessebeløp';
$CREDIT_TOTAL_INTERESTS = 'Totalt interessebeløp';
$CREDIT_QUESTION = 'Tok du opp lån for anskaffelsen av kjøretøyet?';
$CREDIT_LOAN = 'Lånesum:<br><i>Hvor mye lånte du?</i>';
$CREDIT_LOAN2 = 'Lånesum';
$CREDIT_PERIOD = 'Kredittperiode / Antall avdrag';
$CREDIT_AVERAGE_VALUE = 'Gjennomsnittlig beløp per betaling';
$CREDIT_RESIDUAL_VALUE = 'Restverdi:<br><i>Hvor mye har du betalt, eller har igjen å betale, ved slutten av låneperioden? </i>';
$CREDIT_RESIDUAL_VALUE1 = 'Restverdi';
$CREDIT_INSTALMENT = 'Månedlig gjennomsnittsverdi';

//inspection
$INSPECTION = 'Bilinspeksjon';
$INSPECTION_SHORT = 'Bilsjekk';
$INSPECTION_NBMR_TIMES = 'Hvor ofte har du hatt bilen til sjekk?';
$INSPECTION_PRICE =  'Gjennomsnittlig kostnad per bilsjekk';
$EACH_ONE_DURING = 'per sjekk i løpet av'; //5 times costing 15x *each one during* 20 months (inspection)
$TIMES_COSTING = 'ganger som kostet';     //5 *times costing* 15x each one during 20 months (inspection)

//road taxes
$ROAD_TAXES = 'Bilskatt for din bil';
$ROAD_TAXES_SHORT = 'Bilskatt';
$ROAD_TAXES_VALUE = 'Bilskatt for din bil: <br><i> betaling gjort til staten</i>';

//fuel
$FUEL = 'Drivstoff';
$FUEL_DESC = 'Bensin, diesel, LPG, elektrisitet';
$FUEL_CALC = 'Kalkulasjoner basert på';
$FUEL_JOB_CALC = 'Kjører du til jobb?';
$FUEL_JOB_CALC1 = 'Dag(er) i uken du kjører til jobb';
$FUEL_DAYS = 'Dag(er) i uken du kjører til jobb';
$FUEL_DIST_HOME_JOB = 'Mil du kjører mellom hjemme og arbeidstedet (én vei)'; //$CURR_DIST=km, miles, etc.
$FUEL_DIST_HOME_JOB1 = 'mil mellom hjem og arbeidsplass'; //you do 7 km between home and job
$FUEL_DIST_NO_JOB = "Mil du kjører i gjennomsnitt de dagene du ikke arbeider:<br><i>for eksempel i helgene </i>";
$FUEL_DIST_NO_JOB1 = "Mil i gjennomsnitt i løpet av dagene du ikke kjører til arbeidsplassen "; // you do 5 km per week....
$FUEL_DIST = 'Mil du kjører';
$FUEL_CAR_EFF = 'Bilens drivstoffeffektivitet';
$FUEL_PRICE = 'Gjennomsnittlig pris for drivstofforbruket';
$FUEL_PRICE1 = 'Gjennomsnittlig drivstoffpris';
$YOU_DRIVE_TOTTALY_AVG = 'Du kjører i gjennomsnitt totalt'; //__You drive totally on average of__ 5 km per day
$YOU_DRIVE = 'Du kjører'; //__You drive__ 5 km per day

//MAINTENANCE
$MAINTENANCE = 'Vedlikehold';
$MAINTENANCE_DESC = 'Gjennomsnittlig kostnad på vedlikehold og veiforsikring:<br><i>bytte av motorolje, filter, lys, bildekk, bremser, klimaanlegg, kalibrering av styret, etc.</i>';

//REPAIRS AND IMPROVEMENTS
$REP_IMPROV = 'Reparasjoner og forbedringer';
$REP_IMPROV_DESC = 'Gjennomsnittlig kostnad på reparasjoner og forbedringer:<br><i>bildeler, modifikasjoner, feilreparasjoner, bulker, kollisjoner, lakkering, etc.</i>';

//PARKING
$PARKING = 'Parkering';
$PARKING_DESC = 'Gjennomsnittlig kostnad på bilparkering:<br><i>parkeringsautomater, leie av parkeringsplass, parkeringshus, kjøpesentre, flyplasser, buss- eller togstasjoner og annen infrastruktur.</i>';

//TOLLS
$TOLLS = 'Bompenger';
$TOLLS_DESC = 'Gjennomsnittlig beløp brukt på bompenger <br><i>broer, tunneler, motorveier og rushtrafikkavgifter</i>';
$TOLLS_DAY_CALC = 'Baser utregninger på per dag?';
$TOLLS_DAY_CALC1 = 'Daglig beløp brukt på bompenger';
$TOLLS_DAY_CALC_DESC = 'Tenk helhetlig på ferieturer og utflukter, eller på kvitteringer fra bompengautomater';

//FINES
$FINES = 'Trafikkbøter';
$FINES_DESC = 'Gjennomsnittlig beløp betalt i trafikkbøter:<br><i>tenk på hvor mye du har brukt de siste årene på ulike trafikkbøter (ulovlig parkering, overtredelse av fartsgrense, mobiltelefon, etc.)</i>';

//WASHING
$WASHING = 'Bilvask';
$WASHING_DESC = 'Gjennomsnittlig vaskepris:<br><i>på servicestasjoner og andre steder</i>';

//TOTAL
$TOTAL_FIXED = 'TOTALT - Stående kostnader';
$TOTAL_FIXED_DESCR = "Kostnader som ikke avhenger av kjørelengden og som må betales selv om bilen alltid står i ro";
$TOTAL_FIXED_DESCR2 = 'Nedbetaling, forsikring, finansiell interesse, skatt, inspeksjon, og 50 % av parkering og vedlikehold';

$TOTAL_VARIABLE = 'TOTALT - Løpende  kostnader';
$TOTAL_VARIABLE_DESCR = 'Kostnader som avhenger av kjørelengde';
$TOTAL_VARIABLE_DESCR2 = 'Drivstoff, reparasjoner, forbedringer, parkering (tatt i betraktning at du kun betaler når du bruker bilen), bompenger, trafikkbøter, vask og 50 % av vedlikehold';

//EXTRA DATA
$EXTRA_DATA = 'ØVRIG INFORMASJON';
$EXTRA_DATA1 = 'Øvrig informasjon';
$EXTRA_DATA_PUBLIC_TRANSP = 'Public transports';
$EXTRA_DATA_FAMILY_NBR = 'Hvor mange personer eldre enn 4 år er det i familien din (inkludert deg)';
$EXTRA_DATA_PRICE_PASS = "Hva er den gjennomsnittlige prisen på et månedskort per person til offentlig transport<br><i>om offentlig transport ikke er en mulighet for deg, sett inn 0</i>";
$EXTRA_DATA_INCOME = "Income";
$EXTRA_DATA_INCOME_QUESTION = 'What is your net income?';
$EXTRA_DATA_WORKING_TIME = 'Working time';
$EXTRA_DATA_WORKING_TIME_QUESTION = 'Do you have a job or a worthy occupation?';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = 'Time spent in driving';
$EXTRA_DATA_TIME_QUESTION1 = 'How many minutes you drive from home to workplace? (just one way)';
$EXTRA_DATA_TIME_QUESTION2 = 'How many minutes you drive in the days you don\'t take the car to workplace?';
$EXTRA_DATA_TIME_QUESTION3 = 'How many minutes you drive?';

//PUBLIC TRANSPORTS
$PUB_TRANS_TEXT = 'Offentlig transport for familiens dagligliv';
$FAM_NBR = 'Antall familiemedlemmer som er eldre enn 4 år';
$PERSON_OR_PEOPLE = 'person(er)';
$PASS_MONTH_AVG = 'Gjennomsnittlig pris på månedskort per person';
$OTHER_PUB_TRANS = 'Annen offentlig transport';
$OTHER_PUB_TRANS_DESC = "Beløp som var igjen til annen offentlig transport, for eksempel tog eller buss";
$TAXI_DESL = "Taxi-transport";
$ON_TAXI_PAYING = "med taxi, betaler"; //ex: 4 km __on taxi paying__ 5€ per km

//VIRTUAL SPEED
$FINANCIAL_EFFORT = 'Financial effort';
$NET_INCOME_PER = 'Net income per';
$AVERAGE_NET_INCOME_PER = 'Average net income per';
$NUMBER_OF_MONTHS = 'Number of months per year of income';
$NUMBER_OF_WEEKS = 'Number of weeks per year of income';
$NUMBER_OF_HOURS= 'Number of hours per week of income';
$HOURS_PER = 'Hours per';
$MONTHS_PER = 'Months per';
$AVERAGE_WORKING_HOURS_PER = 'Average working hours per';
$WORKING_HOURS_PER = 'Working hours per';
$DIST_HOME_JOB = 'You drive from home to work';
$DAYS_DRIVE_JOB = 'Days per week you drive to work';
$DIST_JORNEY_WEEKEND = 'You drive during the days you don\'t take the car to workplace';
$AVERAGE_DIST_PER_WEEK = 'You drive on average per week';
$YOU_DRIVE_PER = 'You drive per';
$MINUTES_HOME_JOB = 'Minutes you drive from home to workplace';
$DAYS_DRIVE_TO_JOB = 'Days per week you drive to work';
$TIME_DRIVE_WEEKEND = 'Minutes you drive in the days you don\'t take the car to workplace';
$MINUTES_DRIVE_PER = 'Minutes you drive per';
$DAYS_DRIVE_PER_MONTH = 'Days you drive per month';
$HOURS_DRIVE_PER = 'Hours you drive per';
$VIRTUAL_SPEED = 'virtual speed';
$KINETIC_SPEED = 'kinetic speed';
$AVER_YEARLY = 'Average yearly';
$WORKING_TIME_MESSAGE = 'It was considered for calculations an average working time of 36 hours per week and 11 months per year';
$HOURS_TO_AFFORD_CAR = 'Hours per year you need to work to afford your car';
$MONTHS_TO_AFFORD_CAR = 'Months per year you need to work to afford your car';
$TOTAL_COSTS_PER_YEAR = 'Total costs per year for automobile';
$DAYS_CAR_PAID = 'For how many days, after the 1st of January, the car is paid';

//**************************************************
//GRAPHICS
$PARCEL = 'Pakke';
$COSTS = 'Kostnad';


//****************************************************
//ERROR MESSAGES
$ERROR_INVALID_INSU_VALUE = 'Ugyldig forsikringspris';
$ERROR_INSU_PERIOD = 'Oppgi periodisitet på forsikringen';

$ERROR_FUEL_CURR_DIST = 'Du må oppgi om du ønsker kalkuleringene basert på kroner eller mil';
$ERROR_FUEL_CAR_EFF = 'Ugyldig drivstoffeffektivitet';
$ERROR_FUEL_PRICE = 'Ugyldig drivstoffpris';
$ERROR_CAR_JOB = 'Vennligst oppgi om du kjører til jobb';
$ERROR_FUEL_DIST = 'Ugyldig antall kilometer kjørt per måned';
$ERROR_DAYS_PER_WEEK = 'Ugyldig antall dager per uke';
$ERROR_DIST_HOME_WORK = 'Ugyldig antall kilometer mellom hjem og arbeidsplass';
$ERROR_DIST_NO_JOB = "Ugyldig antall kilometer du kjører de dagene du ikke arbeider";
$ERROR_CURRENCY = 'Ugyldig kroner per måned';

$ERROR_DEPRECIATION_MONTH = 'Ugyldig anskaffelsesmåned';
$ERROR_DEPRECIATION_YEAR = 'Ugyldig anskaffelsesår';
$ERROR_DEPRECIATION_VALUE = 'Ugyldig anskaffelsesverdi';
$ERROR_DEPRECIATION_VALUE_TODAY = 'Ugyldig verdi for bilens nåværende verdi';
$ERROR_DEPRECIATION_DATE = 'Ugyldig dato for anskaffelse';
$ERROR_DEPRECIATION_NEW_CAR =  'Nedbetaling er ikke tellende ettersom bilen er ny';

$ERROR_CREDIT_QUESTION = 'Vennligst oppgi om du tok opp billån';
$ERROR_CREDIT_LOAN_VALUE = 'Ugyldig finansiert beløp';
$ERROR_CREDIT_PERIOD = 'Ugyldig kredittperiode, antall avdrag';
$ERROR_CREDIT_INSTALMENT = 'Ugyldig avdragsbeløp';
$ERROR_CREDIT_RESIDUAL_VALUE = 'Ugyldig restverdi';

$INVALID_AMOUNT = 'Ugyldig beløp';

$INVALID_NBR_PP = 'Ugyldig antall personer';
$ERROR_INSPECTION_NTIMES = 'Ugyldig antall ganger';
$ERROR_INSPECTION_COSTS = 'Ugyldig inspeksjonskostnad';

$ERROR_PASS_AMOUNT= 'Ugyldig månedlig beløp på bøter';

$ERROR_INCOME = 'Invalid net income';
$ERROR_WEEKS_PER_YEAR = 'Invalid number of weeks per year';
$ERROR_MONTHS_PER_YEAR = 'Invalid number of months per year';
$ERROR_HOURS_PER_WEEK = 'Invalid number of hours per week';
$ERROR_MIN_DRIVE_HOME_JOB = 'Invalid number of minutes you drive from home to workplace';
$ERROR_MIN_DRIVE_WEEKEND = 'Invalid number of minutes you drive in the days you don\'t take the car to workplace';
$ERROR_MIN_DRIVE = 'Invalid number of minutes you drive';
$ERROR_DAYS_PER_MONTH = 'Invalid number of days per month';

//FINAL RESULT
$YOUR_CAR_COSTS_YOU = 'Bilen din koster';
$WITH_THIS_LEVEL_OF_COSTS = 'Med dette kostnadsnivået har bilen i løpet av det'; //ex: __"With this level of costs, you car during the"__ 15 months of possession....
$MONTHS_POSS = 'måneder lange eierskapet allerede kostet';   //ex: With this level of costs, you car during the 15 ___"months of possession has already costed"___ 14000 Euros


$TAXI_PRICE_PER_DIST=1.5; //price paid for taxi in chosen currency per chosen unit distance

//*****************************************
//STANDARD COMMON AVERAGE DEFAULT values that apear on the start page
//these values are to be changed by the user but you shall put values that are reasonable
//keep in mind your chosen standard Currency and your volume and fuel efficiency standards

$STD_ACQ_MONTH = ''; //month of acquisition 
$STD_ACQ_YEAR = ''; //year of acquisition 
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