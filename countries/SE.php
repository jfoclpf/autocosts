<?php

// COUNTRY: SVERIGE
// LANGUAGE: SVENSKA

$COUNTRY_NAME = 'Sverige';

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
//5 - l/mil - liter per 10 kilometers

//Standard distance
$distance_std_option = 3;
//1 - kilometres
//2 - miles
//3 - mil

//Standard volume for the price of fuels, ex: Currency($,LEI,EUR,etc.)/(Litre, Imp gallon, US gallon) 
$fuel_price_volume_std = 1;
//1 - litres
//2 - imperial gallons
//3 - US gallons

//standards TEXT VERSION
//IMPORTANT: BE COHERENT with the above standards
$CURR_CODE = 'SEK';
$CURR_NAME = 'Krona';
$CURR_NAME_PLURAL = 'Kronor';
$CURR_NAME_BIG_PLURAL = 'KRONOR';
$CURR_SYMBOL = 'kr';
$STD_DIST = 'mil'; //short text version you'd like to apply
$STD_DIST_FULL = 'mil';
$STD_FUEL_CALC = 'l/mil(10km)'; //text version you'd like to apply
$STD_VOLUME_SHORT = 'litres'; //short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)

//simple words
$WORD_PER = 'per';     //ex: 4 km _per_ day
$WORDS_PER_EACH = 'per varje';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = 'gånger'; //ex: 4 times per week
$DURING = 'under';   //spent in tolls 3x per day _during_ 22 days per month
$WORD_PEOPLE = 'människor';   //plural, 3 _people_ 
$YES = 'ja';
$NO = 'nej';
$BUTTON_RUN = 'Kör'; //run calculator button 
$BUTTON_RERUN = 'Kör igen'; //run calculator button 

//WEB PAGE
$WEB_PAGE_TITLE = 'Kalkylator för fordonskostnader';
$MAIN_TITLE = 'KALKYLATOR FÖR FORDONSKOSTNADER';
$INITIAL_TEXT = 
"Denna calculator hjälper dig att ta reda på <b>den riktiga kostnaden</b> för att äga en bil i <b>Sverige</b>. Den ger dig vanligtvis en bra uppskattning för vad du egentligen behöver spendera för att ha råd med en bil.
Eftersom dina fordonsrelaterade räkningar kommer vid olika tillfällen under året så kan det ofta vara svårt att räkna ut den totala kostnaden för din bil. Var realistisk när du fyller i alla värden. För oväntade kostnader som reparationer och böter, tänk efter hur mycket du har spenderat på dessa under de senaste åren. Som standard görs dessa uträkningar månadsvis. Använd punktsymbolen för att skriva i decimalform, till exempel 1.7 mil mellan hem och arbete (1&nbsp;mil&nbsp;=&nbsp;10&nbsp;km).<br>";

$HELP_PROJECT = 'Assistera detta projekt';
$AC_MOBILE = 'AUTOCOSTS<br> för fordon';
$AC_HEADER = '<big><u>WWW.AUTOCOSTS.INFO</u></big><br><b>KALKYLATOR FÖR FORDONSKOSTNADER</b>';
$AC_SUB_HEADER = 'KALKYLATOR FÖR FORDONSKOSTNADER';

//time words
$DAYLY = 'daglig';
$WEEKLY = 'veckovis';
$MONTHLY = 'månadsvis';
$TRIMESTERLY = 'kvartal';
$SEMESTERLY = 'halvår';
$YEARLY = 'årlig';
$MIN = 'min';
$MINUTES = 'minuter';
$HOUR = 'timme';
$HOURS = 'timmar';
$HOUR_ABBR = 't';
$DAY = 'dag';
$DAYS = 'dagar';
$WEEK = 'vecka';
$WEEKS = 'veckor';
$MONTH = 'månad';
$MONTHS = 'månader';
$TWO_MONTHS = 'två månader';
$DIST_EACH_TWO_MONTHS = 'mil för varannan månad';
$TRIMESTER = 'kvartal';
$SEMESTER = 'halvåret';
$YEAR = 'år';
$DAYS_PER_WEEK_SHORT= 'dagar/vecka';

//distance
$DISTANCE = "Sträcka";

//statistics
$AVERAGE_COSTS_PER_TYPE = 'Genomsnittlig månadskostnad per typ';
$STATISTIC_TITLE = 'Automobile kostnader för';
$DEPRECIATION_ST = 'Avskrivningar';
$INSURANCE_ST = 'Försäkring';
$REP_ST = 'Reparationer';
$WASHING_ST = 'Tvättning';
$VIRTUAL_SPEED_TITLE = 'Virtuell hastighet';
$KINETIC_SPEED_TITLE = 'Kinetisk hastighet';

//calculator words
$COSTS= "Kostnader";
$FIXED_COSTS = 'Stående kostnad';
$FIXED_COSTS_HEADER_1= 'STÅENDE KOSTNAD'; //capital letters
$FIXED_COSTS_HEADER_2= "De som inte är beroende av körsträckan, utan måste betalas för att ha fordonet i bruk."; 
$RUNNING_COSTS = 'Driftskostnad';
$RUNNING_COSTS_HEADER_1 = 'DRIFTSKOSTNA'; //capital letters
$RUNNING_COSTS_HEADER_2 = 'De som är beroende av körsträckan';
$PRIVATE_COSTS = 'Privata kostnader';
$MONTHLY_AMOUNT = 'Månadsbelopp';
$RUN_CP_DIST = 'Driftskostnad per kilometer'; //running costs per unit distance
$TOTAL_CP_DIST = 'Total kostnad per kilometer'; //total costs per unit distance
$PUBL_TRA_EQUIV= "Motsvarande resekostnader, eftersom du inte äger en bil";
$WORD_TOTAL_CAP = 'TOTALT'; //capital word for total
$WORD_PRINT = 'Skriv ut';
$WORD_DOWNLOAD_PDF = 'Ladda ner PDF-rapport';

//depreciation
$DEPRECIATION = 'Värdeminskning av fordonet';
$AQ_DATE = 'Bilens förvärvsdatum';
$COM_VALUE = 'Bilens kommersiella värde vid köp<br><i>om ny, priset du betalade för bilen<br>om använd, det kommersiella värdet bilen hade när du förvärvade den</i>';
$COM_VALUE_TODAY = 'Bilens kommersiella värde idag<br><i>om du säljer den nu, hur mycket skulle du få?</i>';
$PERIOD_OWN = 'Ägandeperiod';
$FINAL_VALUE = 'Slutgiltigt värde';
$AQ_VALUE = 'Förvärvsvärde';

//insurance
$INSURANCE = 'Fordonförsäkring och Vägassistans';
$INSURANCE_SHORT = 'Försäkring and Vägassistans';

//credit
$CREDIT = 'Bilfinansiering';
$CREDIT_PERIOD = 'Period';
$CREDIT_INTERESTS = 'Låneräntor';
$CREDIT_INTERESTS_MONTH = 'Månadsbelopp för räntor';
$CREDIT_TOTAL_INTERESTS = 'Total kostnad av räntor';
$CREDIT_QUESTION = 'Använde du bilfinansiering för att förvärva fordonet?';
$CREDIT_LOAN = 'Finansierat belopp:<br><i>Hur mycket lånade du?</i>';
$CREDIT_LOAN2 = 'Finansierat belopp';
$CREDIT_PERIOD = 'Kreditperiod / antal amorteringar';
$CREDIT_AVERAGE_VALUE = 'Genomsnittligt belopp per amorteringt';
$CREDIT_RESIDUAL_VALUE = 'Restvärde:<br><i>Vid avslutad kreditperiod, hur mycket har du kvar att betala eller hur mycket har du betalat?</i>';
$CREDIT_RESIDUAL_VALUE1 = 'Restvärde';
$CREDIT_INSTALMENT = 'Genomsnittligt månadsvärde';

//inspection
$INSPECTION = 'Kontrollbesiktning';
$INSPECTION_SHORT = 'Besiktning';
$INSPECTION_NBMR_TIMES = 'Hur många gånger har du tagit din bil på kontrollbesiktning?';
$INSPECTION_PRICE =  'Genomsnittlig kostnad för varje kontrollbesiktning';
$EACH_ONE_DURING = 'var och en under'; //5 times costing 15€ *each one during* 20 months (inspection)
$TIMES_COSTING = 'gånger kostnad';     //5 *times costing* 15€ each one during 20 months (inspection)

//road taxes
$ROAD_TAXES = 'Fordonskatt för din bil (bilskatt)';
$ROAD_TAXES_SHORT = 'Fordonsskatt';
$ROAD_TAXES_VALUE = 'Fordonskatt för din bil:<br><i> betalning till staten</i>';

//fuel
$FUEL = 'Bränsle';
$FUEL_DESC = 'Bensin, diesel, gasol, elektricitet';
$FUEL_CALC = 'Uträkningar baserade på';
$FUEL_JOB_CALC = 'Med tanke på att du kör till arbetet?';
$FUEL_JOB_CALC1 = 'Dag(ar) per vecka du kör till arbetet';
$FUEL_DAYS = 'Dag(ar) per vecka du kör till arbetet';
$FUEL_DIST_HOME_JOB = 'Mil du kör mellan hem och arbete (endast enkel väg)'; //$CURR_DIST=km, miles, etc.
$FUEL_DIST_HOME_JOB1 = 'mil mellan hem och arbete'; //you do 7 km between home and job
$FUEL_DIST_NO_JOB = "Mil du kör i genomsnitt under de dagar du inte kör till arbetet:<br><i>till exempel per varje vecka</i>";
$FUEL_DIST_NO_JOB1 = "Mil i genomsnitt under de dagar du inte tar bilen till arbetet"; // you do 5 km per week....
$FUEL_DIST = 'Mil du kör';
$FUEL_CAR_EFF = 'Ditt fordons bensineffektivitet';
$FUEL_PRICE = 'Genomsnittligt pris du betalar för bränsle';
$FUEL_PRICE1 = 'Genomsnittligt bränslepris';
$YOU_DRIVE_TOTTALY_AVG = 'Du kör i genomsnitt'; //__You drive totally on average of__ 5 km per day
$YOU_DRIVE = 'Du kör'; //__You drive__ 5 km per day

//MAINTENANCE
$MAINTENANCE = 'Underhåll';
$MAINTENANCE_DESC = 'Genomsnittlig kostnad av underhåll och Vägassistans:<br><i>oljebyte, filter, lampor, däck, bromsar, luftkonditionering, framvagnsinställning, etc.</i>';

//REPAIRS AND IMPROVEMENTS
$REP_IMPROV = 'Reparationer och förbättringar';
$REP_IMPROV_DESC = 'Genomsnittlig kostnad av reparationer och förbättringar:<br><i>bildelar, modifieringar, reparation av felfunktionerande delar, bucklor, kollisioner, inställningar, etc.</i>';

//PARKING
$PARKING = 'Parkering';
$PARKING_DESC = 'Genomsnittlig kostnad för parkering:<br><i>parkeringsautomater i staden, hyrning av parkeringsplats, parkeringsplatser ovan jord och under jord i offentliga byggnader, köpcentrum, flygplatser, buss- eller tågstationer eller andra infrastrukturer.</i>';

//TOLLS
$TOLLS = 'Vägtull';
$TOLLS_DESC = 'Genomsnittligt belopp som spenderats på vägtullar<br><i>broar, tunnlar, motorvägar och trängselskatt för att få tillgång till stadskärna</i>';
$TOLLS_DAY_CALC = 'Uträkning baserad per dag?';
$TOLLS_DAY_CALC1 = 'Dagligt belopp du spenderar på vägtullar';
$TOLLS_DAY_CALC_DESC = 'Tänk även på de sällsynta resor du tar till utkanten av din stad eller ut på landet, eller på kvitton av alla sorter från elektroniska vägtullar';

//FINES
$FINES = 'Trafikböter';
$FINES_DESC = 'Genomsnittligt belopp betalt för trafikböter:<br><i>tänk på de senaste åren hur mycket du betalat för alla sorters trafikböter (otillåten parkering, hastighetsöverträdelse, otillåtet användande av mobiltelefon, etc.)</i>';

//WASHING
$WASHING = 'Tvätt och rengöring';
$WASHING_DESC = 'Genomsnittlig summa för tvätt och rengöring:<br><i>på bensinstationer och andra platser</i>';

//TOTAL
$TOTAL_FIXED = 'TOTALT - Stående kostnader';
$TOTAL_FIXED_DESCR = "Kostnader som inte beror på körsträckor och måste betalas även om bilen alltid står stilla";
$TOTAL_FIXED_DESCR2 = 'Nedvärdering, Försäkring, Lån och räntor, Skatter, Kontrollbesiktning och 50% av parkering och underhåll';
$TOTAL_VARIABLE = 'TOTALT - Driftskostnader';
$TOTAL_VARIABLE_DESCR = 'Kostnader som beror på hur många kilometer du kör';
$TOTAL_VARIABLE_DESCR2 = 'Bränsle, Reparationer och förbättringar, Parkering (eftersom du bara betalar detta när du använder bilen), vägtullar, trafikböter, tvätt och 50% av underhåll';

//EXTRA DATA
$EXTRA_DATA = 'KOMPLETTERANDE UPPGIFTER';
$EXTRA_DATA1 = 'Kompletterande uppgifter';
$EXTRA_DATA_PUBLIC_TRANSP = 'Kollektivtrafik';
$EXTRA_DATA_FAMILY_NBR = 'Hur många personer äldre än 4 år finns i din familj (inklusive dig själv)';
$EXTRA_DATA_PRICE_PASS = "Vad är den genomsnittliga kostnaden för ett månadskort med kollektivtrafik, för användning i din normala vardag<br><i>om kollektivtrafik inte är ett möjlighet för dig, infoga 0</i>";
$EXTRA_DATA_INCOME = "Inkomst";
$EXTRA_DATA_INCOME_QUESTION = 'Vad är din nettoinkomst?';
$EXTRA_DATA_WORKING_TIME = 'Arbetstid';
$EXTRA_DATA_WORKING_TIME_QUESTION = 'Har du ett arbete eller ett värdigt yrke?';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = 'Tid spenderad med att köra bil';
$EXTRA_DATA_TIME_QUESTION1 = 'Hur många minuter kör du för att komma hemifrån till arbetet? (bara enkel väg)';
$EXTRA_DATA_TIME_QUESTION2 = 'Hur många minuter kör du de dagar som du inte tar bilen till arbetet?';
$EXTRA_DATA_TIME_QUESTION3 = 'Hur många minuter kör du?';

//PUBLIC TRANSPORTS
$PUB_TRANS_TEXT = 'Kollektivtrafik för din familjs normala vardag';
$FAM_NBR = 'Antal av personer i din familj över 4 år';
$PERSON_OR_PEOPLE = 'person(er)';
$PASS_MONTH_AVG = 'Genomsnittligt belopp för ett månadskort per person';
$OTHER_PUB_TRANS = 'Övrig kollektivtrafik';
$OTHER_PUB_TRANS_DESC = "Belopp som användes för övrig kollektivtrafik, till exempel från ditt bostadsområde, så som långa tågresor eller bussresor";
$TAXI_DESL = "Taxitransporter";
$ON_TAXI_PAYING = "betalt för taxi"; //ex: 4 km __on taxi paying__ 5€ per km

//VIRTUAL SPEED
$FINANCIAL_EFFORT = 'Ekonomisk insats';
$NET_INCOME_PER = 'Nettoinkomst per';
$AVERAGE_NET_INCOME_PER = 'Genomsnittlig nettoinkomst per';
$NUMBER_OF_MONTHS = 'Antal månader per år med inkomst';
$NUMBER_OF_WEEKS = 'Antal veckor per år med inkomst';
$NUMBER_OF_HOURS= 'Antal timmar per vecka med inkomst';
$HOURS_PER = 'Timmar per';
$MONTHS_PER = 'Månader per';
$AVERAGE_WORKING_HOURS_PER = 'Genomsnittligt antal arbetstimmar per';
$WORKING_HOURS_PER = 'Arbetstimmar per';
$DIST_HOME_JOB = 'Du kör hemifrån till arbetet';
$DAYS_DRIVE_JOB = 'Antal dagar per vecka som du kör till arbetet';
$DIST_JORNEY_WEEKEND = 'Du kör under de dagar som du inte tar bilen till arbetet';
$AVERAGE_DIST_PER_WEEK = 'Du kör i genomsnitt per vecka';
$YOU_DRIVE_PER = 'Du kör per';
$MINUTES_HOME_JOB = 'Minuter du kör hemifrån till arbetet';
$DAYS_DRIVE_TO_JOB = 'Antal dagar per vecka du kör till arbetet';
$TIME_DRIVE_WEEKEND = 'Minuter du kör de dagar du inte tar bilen till arbetet';
$MINUTES_DRIVE_PER = 'Minuter du kör per';
$DAYS_DRIVE_PER_MONTH = 'Dagar du kör per månad';
$HOURS_DRIVE_PER = 'Timmar du kör per';
$VIRTUAL_SPEED = 'virtuell hastighet';
$KINETIC_SPEED = 'kinetisk hastighet';
$AVER_YEARLY = 'I genomsnitt årligen';
$WORKING_TIME_MESSAGE = 'En genomsnittlig arbetstid på 36 timmar per vecka och 11 månader per år har använts för uträkningarna';
$HOURS_TO_AFFORD_CAR = 'Timmar per år som du måste arbeta för att ha råd med din bil';
$MONTHS_TO_AFFORD_CAR = 'Månader per år som du måste arbeta för att ha råd med din bil';
$TOTAL_COSTS_PER_YEAR = 'Total kostnad per år för bilen';
$DAYS_CAR_PAID = 'Hur många dagar efter 1 januri som bilen är betald';

//**************************************************
//GRAPHICS
$PARCEL = 'Paket';
$COSTS = 'Kostnad';

//****************************************************
//ERROR MESSAGES
$ERROR_INVALID_INSU_VALUE = 'Ogiltigt försäkringsbelopp';
$ERROR_INSU_PERIOD = 'Infoga peridocitet för försäkring';
$ERROR_FUEL_CURR_DIST = 'Du måste hänvisa om du vill göra uträkningen baserad på kronor eller mil';
$ERROR_FUEL_CAR_EFF = 'Ogiltigt belopp för bränsleeffektivitet';
$ERROR_FUEL_PRICE = 'Ogiltigt bränslepris';
$ERROR_CAR_JOB = 'Vänligen indikera om du kör bilen till arbetet';
$ERROR_FUEL_DIST = 'Ogiltigt antal mil körda per månad';
$ERROR_DAYS_PER_WEEK = 'Ogiltigt antal dagar per vecka';
$ERROR_DIST_HOME_WORK = 'Ogiltigt antal mil mellan hem och arbete';
$ERROR_DIST_NO_JOB = "Ogiltigt antal mil du kör under de dagar du inte tar bilen till ditt arbete";
$ERROR_CURRENCY = 'Ogiltig summa kronor per månad';
$ERROR_DEPRECIATION_MONTH = 'Ogiltig förvärvsmånad';
$ERROR_DEPRECIATION_YEAR = 'Ogiltigt förvärvsår';
$ERROR_DEPRECIATION_VALUE = 'Ogiltig förvärvssumma';
$ERROR_DEPRECIATION_VALUE_TODAY = 'Ogiltigt dagsvärde';
$ERROR_DEPRECIATION_DATE = 'Ogiltigt förvärvsdatum';
$ERROR_DEPRECIATION_NEW_CAR =  'Nedvärderingen är inte gällande eftersom fordonet är nytt';
$ERROR_CREDIT_QUESTION = 'Vänligen indikera om du använt bilfinansiering';
$ERROR_CREDIT_LOAN_VALUE = 'Ogiltig finansieringssumma';
$ERROR_CREDIT_PERIOD = 'Ogiltig låneperiod, antal amorteringar';
$ERROR_CREDIT_INSTALMENT = 'Ogiltig amorteringssumma';
$ERROR_CREDIT_RESIDUAL_VALUE = 'Ogiltigt restvärde';
$INVALID_AMOUNT = 'Ogiltig mängd';
$INVALID_NBR_PP = 'Ogiltigt antal personer';
$ERROR_INSPECTION_NTIMES = 'Ogiltigt antal gånger.</i>';
$ERROR_INSPECTION_COSTS = 'Ogiltig kontrollbesiktning.</i>';
$ERROR_PASS_AMOUNT= 'Ogiltig biljettkostnad per månad';
$ERROR_INCOME = 'Ogiltig nettoinkomst';
$ERROR_WEEKS_PER_YEAR = 'Ogiltigt antal veckor per år';
$ERROR_MONTHS_PER_YEAR = 'Ogiltigt antal månader per år';
$ERROR_HOURS_PER_WEEK = 'Ogiltigt antal timmar per vecka';
$ERROR_MIN_DRIVE_HOME_JOB = 'Ogiltigt antal minuter som du kör hemifrån till arbetet';
$ERROR_MIN_DRIVE_WEEKEND = 'Ogiltigt antal minuter som du kör de dagar som du inte tar bilen till arbetet';
$ERROR_MIN_DRIVE = 'Ogiltigt antal minuter som du kör';
$ERROR_DAYS_PER_MONTH = 'Ogiltigt antal dagar per månad';

//FINAL RESULT
$YOUR_CAR_COSTS_YOU = 'Dina bilkostnader';
$WITH_THIS_LEVEL_OF_COSTS = 'Med denna nivå av kostnader, har ditt fordon under de'; //ex: __"With this level of costs, you car during the"__ 15 months of possession....
$MONTHS_POSS = 'månader av ägande redan kostat';   //ex: With this level of costs, you car during the 15 ___"months of possession has already costed"___ 14000 Euros
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