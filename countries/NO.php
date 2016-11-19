<?php

// COUNTRY: NORGE
// LANGUAGE: NORSK

$COUNTRY_NAME = 'Norge';
$LANGUAGE_CODE = 'no';

//the language is according with the two-letter language code ISO 639-1
//http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

//***********************************************
//											   **
//      Translation for AUTOCOSTS.INFO         **
//      the automobile costs calculator		   **
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
$CURR_CODE = 'NOK';
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
$BUTTON_RUN = 'Regn ut'; //run calculator button 
$BUTTON_RERUN = 'Regn ut på nytt'; //run calculator button 

//WEB PAGE
$WEB_PAGE_TITLE = 'Kostnadskalkulator for bil';
$MAIN_TITLE = 'KOSTNADSKALKULATOR FOR BIL';
$INITIAL_TEXT = 
"Denne kalkulatoren lar deg regne ut hva <b>den virkelige prisen</b> på å eie en bil i <b>Norge</b> er. Den vil normalt gi et godt anslag på hva det koster å eie en bil. Ettersom bilregningene kommer til ulike tider på året kan det ofte være vanskelig å få en fullstendig oversikt over hvor mye du bruker på bilen din. Oppgi realistiske verdier. For uventede regninger som bøter eller reparasjoner på skader, tenk på hvor mye du har brukt i løpet av de siste årene. Kalkulasjonene tar som utgangspunkt en periodisitet som er månedlig basert. Bruk punktum for desimalnotering, for eksempel 1.7 mil mellom hjem og arbeidsplass (1&nbsp;mil&nbsp;=&nbsp;10&nbsp;km).<br>";

$HELP_PROJECT = 'Støtt dette prosjektet' ;
$AC_MOBILE = 'AUTOCOSTS<br> for mobile produkter';
$AC_DOMAIN = 'AUTOCOSTS.INFO';
$AC_SUB_HEADER = 'KOSTNADSKALKULATOR FOR BIL';

//time words
$DAYLY = 'daglig';
$WEEKLY = 'ukentlig';
$MONTHLY = 'månedlig';
$TRIMESTERLY = 'hvert kvartal';
$SEMESTERLY = 'hvert halvår';
$YEARLY = 'årlig';
$MIN = 'min';
$MINUTES = 'minutter';
$HOUR = 'time';
$HOURS = 'timer';
$HOUR_ABBR = 't';
$DAY = 'dag';
$DAYS = 'dager';
$WEEK = 'uke';
$WEEKS = 'uker';
$MONTH = 'måned';
$MONTHS = 'måneder';
$TWO_MONTHS = 'to måned';
$DIST_EACH_TWO_MONTHS = 'mil for annenhver måned';
$TRIMESTER = 'kvartal';
$SEMESTER = 'halvår';
$YEAR = 'år';
$DAYS_PER_WEEK_SHORT= 'dager/uke';
//distance
$DISTANCE = "Avstand";

//statistics
$AVERAGE_COSTS_PER_TYPE = 'Gjennomsnittlig månedlig kostnad per typen';
$STATISTIC_TITLE = 'Bildeler kostnader for';
$DEPRECIATION_ST = 'Avskrivninger';
$INSURANCE_ST = 'Forsikring';
$REP_ST = 'Reparasjoner';
$WASHING_ST = 'Vasking';
$VIRTUAL_SPEED_TITLE = 'Virtuell hastighet';
$KINETIC_SPEED_TITLE = 'Kinetisk hastighet';

//calculator words
$COSTS= "Kostnader";
$FIXED_COSTS = 'Faste kostnader';
$FIXED_COSTS_HEADER_1= 'FASTE KOSTNADER'; //capital letters
$FIXED_COSTS_HEADER_2= "For de som ikke avhenger av reisedistanse, og må betale for å ha bilen klar til å kjøre."; 
$RUNNING_COSTS = 'Påløpende kostnader';
$RUNNING_COSTS_HEADER_1 = 'PÅLØPENDE KOSTNADER'; //capital letters
$RUNNING_COSTS_HEADER_2 = 'For de som avhenger av reisedistansen';
$PRIVATE_COSTS = 'Private kostnader';
$MONTHLY_AMOUNT = 'Månedlig beløp';
$RUN_CP_DIST = 'Løpende kostnader per kilometer'; //running costs per unit distance
$TOTAL_CP_DIST = 'Total kostnad per kilometer'; //total costs per unit distance
$PUBL_TRA_EQUIV= "Tilsvarende transportpriser, tatt i utgangspunkt i at du ikke eier bil";
$WORD_TOTAL_CAP = 'TOTALT'; //capital word for total
$WORD_PRINT = 'Skriv ut';
$WORD_DOWNLOAD_PDF = 'Last ned rapport i PDF-format';
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
$ROAD_TAXES = 'Bilskatt for bilen';
$ROAD_TAXES_SHORT = 'Bilskatt';
$ROAD_TAXES_VALUE = 'Bilskatt for bilen: <br><i> betalt til staten</i>';
//fuel
$FUEL = 'Drivstoff';
$FUEL_DESC = 'Bensin, diesel, LPG, elektrisk';
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
$TOTAL_FIXED = 'TOTALT - Faste kostnader';
$TOTAL_FIXED_DESCR = "Kostnader som ikke avhenger av kjørelengden og som må betales selv om bilen alltid står i ro";
$TOTAL_FIXED_DESCR2 = 'Nedbetaling, forsikring, finansiell interesse, skatt, inspeksjon, og 50 % av parkering og vedlikehold';
$TOTAL_VARIABLE = 'TOTALT - Påløpende  kostnader';
$TOTAL_VARIABLE_DESCR = 'Kostnader som avhenger av kjørelengde';
$TOTAL_VARIABLE_DESCR2 = 'Drivstoff, reparasjoner, forbedringer, parkering (tatt i betraktning at du kun betaler når du bruker bilen), bompenger, trafikkbøter, vask og 50 % av vedlikehold';
//EXTRA DATA
$EXTRA_DATA = 'ØVRIG INFORMASJON';
$EXTRA_DATA1 = 'Øvrig informasjon';
$EXTRA_DATA_PUBLIC_TRANSP = 'Offentlig transport';
$EXTRA_DATA_FAMILY_NBR = 'Hvor mange personer eldre enn 4 år er det i familien din (inkludert deg)';
$EXTRA_DATA_PRICE_PASS = "Hva er den gjennomsnittlige prisen på et månedskort per person til offentlig transport<br><i>om offentlig transport ikke er en mulighet for deg, sett inn 0</i>";
$EXTRA_DATA_INCOME = "Income";
$EXTRA_DATA_INCOME_QUESTION = 'Hva er din netto inntekt?';
$EXTRA_DATA_WORKING_TIME = 'Arbeidstid';
$EXTRA_DATA_WORKING_TIME_QUESTION = 'Har du en jobb eller virksomhet?';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = 'Tid brukt på kjøring';
$EXTRA_DATA_TIME_QUESTION1 = 'Hvor mange minutter bruker du på å kjøre til jobb fra hjemme? (kun én vei)';
$EXTRA_DATA_TIME_QUESTION2 = 'Hvor mange minutter bruker du på å kjøre de dagene du ikke kjører til jobb?';
$EXTRA_DATA_TIME_QUESTION3 = 'Hvor mange minutter kjører du?';
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
$FINANCIAL_EFFORT = 'Økonomisk innsats';
$NET_INCOME_PER = 'Netto inntekt per';
$AVERAGE_NET_INCOME_PER = 'Gjennomsnittlig netto inntekt per';
$NUMBER_OF_MONTHS = 'Måneder i året med inntekt';
$NUMBER_OF_WEEKS = 'Uker i året med inntekt';
$NUMBER_OF_HOURS= 'Timer i uken med inntekt';
$HOURS_PER = 'Timer per';
$MONTHS_PER = 'Måneder per';
$AVERAGE_WORKING_HOURS_PER = 'Gjennomsnittlig arbeidstimer per';
$WORKING_HOURS_PER = 'Arbeidstimer per';
$DIST_HOME_JOB = 'Du kjører til jobb fra hjemme';
$DAYS_DRIVE_JOB = 'Dager i uken du kjører til jobb';
$DIST_JORNEY_WEEKEND = 'Du kjører de dagene du ikke kjører til jobb';
$AVERAGE_DIST_PER_WEEK = 'Du kjører i gjennenomsnitt per uke';
$YOU_DRIVE_PER = 'Du kjører per';
$MINUTES_HOME_JOB = 'Minutter du kjører fra hjem til arbeidsplass';
$DAYS_DRIVE_TO_JOB = 'Dager i uken du kjører til jobb';
$TIME_DRIVE_WEEKEND = 'Minutter du kjører de dagene du ikke kjører til jobb';
$MINUTES_DRIVE_PER = 'Minutter du kjøer per';
$DAYS_DRIVE_PER_MONTH = 'Dager du kjører per måned';
$HOURS_DRIVE_PER = 'Timer du kjører per';
$VIRTUAL_SPEED = 'virtuell hastighet';
$KINETIC_SPEED = 'kinetisk hastighet';
$AVER_YEARLY = 'Årlig gjennomsnitt';
$WORKING_TIME_MESSAGE = 'Beregningene tar utgangspunkt for gjennomsnittlig arbeidstid på 36 timer i uken og 11 måneder i året';
$HOURS_TO_AFFORD_CAR = 'Timer per år du trenger å jobbe for å ha råd til bilen';
$MONTHS_TO_AFFORD_CAR = 'Hvor mange måneder per år du trenger å jobbe for å ha råd til bilen';
$TOTAL_COSTS_PER_YEAR = 'Total kostnad per år for bil';
$DAYS_CAR_PAID = 'Hvor mange dager, etter 1. januar, biler er betalt';
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
$ERROR_INCOME = 'Ugyldig netto inntekt';
$ERROR_WEEKS_PER_YEAR = 'Ugyldig antall uker per år';
$ERROR_MONTHS_PER_YEAR = 'Ugyldig antall måneder per år';
$ERROR_HOURS_PER_WEEK = 'Ugyldig timer i uken';
$ERROR_MIN_DRIVE_HOME_JOB = 'Ugyldig antall minutter for kjøretid til jobb';
$ERROR_MIN_DRIVE_WEEKEND = 'Ugyldig antall miutter kjøretid for de dagene du ikke kjører til jobb';
$ERROR_MIN_DRIVE = 'Ugyldig kjøretid i minutter';
$ERROR_DAYS_PER_MONTH = 'Ugyldig antall dager i måneden';
//FINAL RESULT
$YOUR_CAR_COSTS_YOU = 'Bilen din koster';
$WITH_THIS_LEVEL_OF_COSTS = 'Med dette kostnadsnivået har bilen i løpet av det'; //ex: __"With this level of costs, you car during the"__ 15 months of possession....
$MONTHS_POSS = 'måneder lange eierskapet allerede kostet';   //ex: With this level of costs, you car during the 15 ___"months of possession has already costed"___ 14000 Euros
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