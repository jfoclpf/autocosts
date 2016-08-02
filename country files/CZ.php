<?php

// COUNTRY: ČESKÁ
// LANGAUAGE: ČESKÝ

$LANGUAGE_CODE = 'cs';
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
$fuel_efficiency_std_option = 1;
//1 - l/100km - litres per 100 kilometres
//2 - km/l - kilometres per litre
//3 - mpg(imp) - miles per imperial gallon
//4 - mpg(US) - miles per US gallon

//Standard distance
$distance_std_option = 1;
//1 - kilometres
//2 - miles

//Standard volume for the price of fuels, ex: Currency($,£,€,etc.)/(Litre, Imp gallon, US gallon) 
$fuel_price_volume_std = 1;
//1 - litres
//2 - imperial gallons
//3 - US gallons

//standards TEXT VERSION
//IMPORTANT: BE COHERENT with the above standards
$CURR_CODE = 'CZK';
$CURR_NAME = 'Koruna česká';
$CURR_NAME_PLURAL = 'Koruny české';
$CURR_NAME_BIG_PLURAL = 'KORUNY ČESKÈ';
$CURR_SYMBOL = 'Kč';
$STD_DIST = 'km'; //short text version you'd like to apply
$STD_DIST_FULL = 'kilometr';
$STD_FUEL_CALC = 'l/100km'; //text version you'd like to apply
$STD_VOLUME_SHORT = 'l'; //short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)

//simple words
$WORD_PER = 'za';     //ex: 4 km _per_ day
$WORDS_PER_EACH = 'za každý';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = 'krát'; //ex: 4 times per week
$DURING = 'během';   //spent in tolls 3x per day _during_ 22 days per month
$WORD_PEOPLE = 'osoby';   //plural, 3 _people_ 
$YES = 'ano';
$NO = 'ne';

$BUTTON_RUN = 'Vypočítat'; //run calculator button 
$BUTTON_RERUN = 'Nový výpočet'; //run calculator button 

//WEB PAGE
$WEB_PAGE_TITLE = 'Kalkulator výdajů na auto';
$MAIN_TITLE = 'KALKULATOR VÝDAJŮ NA AUTO';
$INITIAL_TEXT = 
"Tento kalkulátor vám umožní zjistit <b>skutečné náklady</b> na vlastnictví auta v <b>České republice</b>. Obdržíte spolehlivý odhad toho, co ve skutečnosti musíte zaplatit, když chcete vlastnit auto. Vzhledem k tomu, že účtenky za provoz vozidla přicházejí nepravidelně v průběhu roku, je často obtížné odhadnout, jaké jsou skutečné celkové náklady na provoz vašeho auta. Zadávejte skutečné vstupné hodnoty. Co se týče nečekaných výdajů, jako jsou opravy po haváriích, nebo pokuty, vzpomeňte si, kolik jste utratili za tyto položky v průběhu několika posledních let. Ve výchozím nastavení jsou tyto výpočty prováděny měsíčně. Při zadávání desetinných čísel použijte desetinnou tečku, nikoliv čárku, například: 8.7 kilometrů mezi vaším domovem a místem práce.<br>";

$HELP_PROJECT = 'Podpořte tento projekt' ;

$AC_MOBILE = 'AUTONAKLADY<br>pro mobilní zařízení';
$AC_DOMAIN = 'AUTOCOSTS.INFO';
$AC_SUB_HEADER = 'KALKULÁTOR VÝDAJŮ NA AUTO';

//time words
$DAYLY = 'za den';
$WEEKLY = 'za týden';
$MONTHLY = 'za měsíc';
$TRIMESTERLY = 'za čtvrtrok';
$SEMESTERLY = 'za půlrok';
$YEARLY = 'za rok';

$MIN = 'min';
$MINUTES = 'minut';
$HOUR = 'hodina';
$HOURS = 'hodin';
$HOUR_ABBR = 'h';
$DAY = 'den';
$DAYS = 'dny';
$WEEK = 'týden';
$WEEKS = 'týden';
$MONTH = 'měsíc';
$MONTHS = 'měsíců';
$TWO_MONTHS = 'dva měsíce';
$DIST_EACH_TWO_MONTHS = 'kilometrů za každé dva měsíce';
$TRIMESTER = 'čtvrtrok';
$SEMESTER = 'půlrok';
$YEAR = 'rok';

$DAYS_PER_WEEK_SHORT= 'dny/týdnů';

//distance
$DISTANCE = "Vzdálenost";

//statistics
$AVERAGE_COSTS_PER_TYPE = 'Průměrná měsíční cena dle typu';
$COUNTRY_NAME = 'Češku';
$STATISTIC_TITLE = 'Náklady na automobilový';
$DEPRECIATION_ST = 'Znehodnocení';
$INSURANCE_ST = 'Pojištění';
$REP_ST = 'Opravy';
$WASHING_ST = 'Mytí';
$VIRTUAL_SPEED_TITLE = 'Skutečná rychlost';
$KINETIC_SPEED_TITLE = 'Kinetická rychlost';

//calculator words
$COSTS= "Náklady";
$FIXED_COSTS = 'Fixní náklady';
$FIXED_COSTS_HEADER_1= 'FIXNI NÁKLADY'; //capital letters
$FIXED_COSTS_HEADER_2= "Tyto náklady jsou nezávislé na počtu ujetých kilometrů. Jsou nezbytné pro udržení vozidla ve stavu připravenosti"; 

$RUNNING_COSTS = 'Provozní náklady';
$RUNNING_COSTS_HEADER_1 = 'PROVOZNI NÁKLADY'; //capital letters
$RUNNING_COSTS_HEADER_2 = 'Náklady, které jsou závislé na ujeté vzdálenosti';

$PRIVATE_COSTS = 'Soukromé náklady';
$MONTHLY_AMOUNT = 'Měsíční částka';
$RUN_CP_DIST = 'Provozní náklady na kilometr'; //running costs per unit distance
$TOTAL_CP_DIST = 'Celkové náklady na kilometr'; //total costs per unit distance
$PUBL_TRA_EQUIV= "Ekvivalentní náklady na dopravu, za předpokladu, že nevlastníte auto";
$WORD_TOTAL_CAP = 'CELKEM'; //capital word for total

$WORD_PRINT = 'Tisk';
$WORD_DOWNLOAD_PDF = 'Stáhnout sestavu ve formátu PDF';

//depreciation
$DEPRECIATION = 'Opotřebení vozidla';
$AQ_DATE = 'Datum pořízení auta';
$COM_VALUE = 'Tržní hodnota auta, v čase, když jste jej zakoupili<br><i> v případě nového auta se jedná o nákupní cenu<br>v případě používaného, tržní hodnota v čase jeho nabytí</i>';
$COM_VALUE_TODAY = 'Aktuální tržní hodnota auta<br><i>kolik by jste mohli dostat, kdyby jste ho teď prodali?</i>';
$PERIOD_OWN = 'Doba držení vozidla';
$FINAL_VALUE = 'Konečná hodnota';
$AQ_VALUE = 'Pořizovací hodnota';

//insurance
$INSURANCE = 'Povinné ručení a havarijní pojištění';
$INSURANCE_SHORT = 'Pojištění a havarijní pojišténí';

//credit
$CREDIT = 'Financování vozidla';
$CREDIT_PERIOD = 'Období';
$CREDIT_INTERESTS = 'Úroky z půjček';
$CREDIT_INTERESTS_MONTH = 'Měsíční suma úroků';
$CREDIT_TOTAL_INTERESTS = 'Celková suma úroků';
$CREDIT_QUESTION = 'Použili jste financování vozidla na jeho získání?';
$CREDIT_LOAN = 'Financovaná částka:<br><i>Kolik jste jsi půjčili?</i>';
$CREDIT_LOAN2 = 'Financovaná částka';
$CREDIT_PERIOD = 'Úvěrové období/počet splátek úvěru';
$CREDIT_AVERAGE_VALUE = 'Průměrná hodnota za každou splátku';
$CREDIT_RESIDUAL_VALUE = 'Zůstatková hodnota:<br><i>Na konci úvěrového období, kolik budete ještě muset zaplatit, nebo jste zaplatili?</i>';
$CREDIT_RESIDUAL_VALUE1 = 'Zůstatková hodnota';
$CREDIT_INSTALMENT = 'Průměrná měsíční hodnota';

//inspection
$INSPECTION = 'Prohlídka vozidla (Technická prohlídka STK)';
$INSPECTION_SHORT = 'Prohlídka';
$INSPECTION_NBMR_TIMES = 'Kolikrát jste odvezli vaše vozidlo na technickou pohlídku?';
$INSPECTION_PRICE =  'Průměrné náklady za každou prohlídku vozidla';
$EACH_ONE_DURING = 'každá z nich v průběhu'; //5 times costing 15x *each one during* 20 months (inspection)
$TIMES_COSTING = 'krát vyúčtovano';     //5 *times costing* 15x each one during 20 months (inspection)

//road taxes
$ROAD_TAXES = 'Silniční daň (Daň z motorových vozidel)';
$ROAD_TAXES_SHORT = 'Daň za vaše auto';
$ROAD_TAXES_VALUE = 'Daň za vaše auto:<br><i>částka vyplacená státu</i>';

//fuel
$FUEL = 'Palivo';
$FUEL_DESC = 'Benzín, nafta, LPG, elektřina';
$FUEL_CALC = 'Výpočty na základě';
$FUEL_JOB_CALC = 'S ohledem na to, že jezdíte do práce?';
$FUEL_JOB_CALC1 = 'Den(y) za týden, které jezdíte do práce';
$FUEL_DAYS = 'Den(y) za týden, které jezdíte do práce';
$FUEL_DIST_HOME_JOB = 'Kilometry, které najezdíte mezi domovem a místem vaší práce (jen jedna cesta)'; //$CURR_DIST=km, miles, etc.
$FUEL_DIST_HOME_JOB1 = 'kilometrů mezi domovem a místem vaší práce'; //you do 7 km between home and job
$FUEL_DIST_NO_JOB = "Kilometry, které průměrně najezdíte za ty dny, kdy nejezdíte autem do práce:<br><i>například za každý víkend</i>";
$FUEL_DIST_NO_JOB1 = "kilometry, které průměrně najezdíte za ty dny, kdy nejezdíte autem do práce"; // you do 5 km per week....
$FUEL_DIST = 'Kilometry, které najezdíte';
$FUEL_CAR_EFF = 'Spotřeba paliva vášho vozidla';
$FUEL_PRICE = 'Průměrná cena, kterou zaplatíte za palivo';
$FUEL_PRICE1 = 'Průměrná cena paliva';
$YOU_DRIVE_TOTTALY_AVG = 'Celkově najezdíte v průměru'; //__You drive totally on average of__ 5 km per day
$YOU_DRIVE = 'Najedzíte'; //__You drive__ 5 km per day

//MAINTENANCE
$MAINTENANCE = 'Údržba';
$MAINTENANCE_DESC = 'Průměrné náklady na údržbu a havarijní pojištění: <br><i>výměnu motorového oleje, filtrů, světel, pneumatik, odstranění poruch, klimatizace, seřízení ovládání, atd.</i>';

//REPAIRS AND IMPROVEMENTS
$REP_IMPROV = 'Opravy a vylepšení';
$REP_IMPROV_DESC = 'Průměrné náklady na opravy a vylepšení:<br><i> autodíly, úpravy, opravy poruch, promáčknutí, nárazů, tuning, atd.</i>';

//PARKING
$PARKING = 'Parkování';
$PARKING_DESC = 'Průměrné náklady na parkování:<br><i>parkovací hodiny ve městě, pronájem parkovacího místa, podzemní nebo nadzemní parkoviště ve veřejných budovách, nákupních centrech, na letištích, autobusových zastávkách, nádraží nebo jakýchliv jiných objektech infrastruktury.</i>';

//TOLLS
$TOLLS = 'Mýtné poplatky';
$TOLLS_DESC = 'Průměrná zaplacená částka za mýtné<br><i>mosty, tunely, dálnice a poplatky za vjezd do centra města</i>';
$TOLLS_DAY_CALC = 'Výpočet na základě denních výdajů?';
$TOLLS_DAY_CALC1 = 'Denní částka, kterou utratíte za mýtné';
$TOLLS_DAY_CALC_DESC = 'Započítejte také výlety, které uskutečníte čas od času mimo město nebo do přírody, stejně jako stvrzenky z jakéhokoliv elektronického mýtného';

//FINES
$FINES = 'Pokuty za dopravní přestupky';
$FINES_DESC = 'Průměrná částka zaplacena za pokuty za dopravní přestupky:<br><i>Vzpomněnte si, kolik jste zaplatili za posledních několik let za jakékoliv dopravní přestupky (nedovolené parkování, překročení povolené rychlosti, použití mobilného telefonu za jízdy, atd.)</i>';

//WASHING
$WASHING = 'Mytí a čištění';
$WASHING_DESC = 'Průměrné náklady za mytí a čištění:<br><i>na čerpacích stanicích a v jiných místech</i>';

//TOTAL
$TOTAL_FIXED = 'CELKEM - Fixní náklady';
$TOTAL_FIXED_DESCR = "Náklady, které jsou nezávislé na počtu ujetých kilometrů. Jsou nezbytné pro udržení vozidla ve stavu připravenosti";
$TOTAL_FIXED_DESCR2 = 'Opotřebení vozidla, povinné ručení, úroky z financování, daně, servisní prohlídka a 50% z nákladů na parkování a údržbu';

$TOTAL_VARIABLE = 'CELKEM - Provozní náklady';
$TOTAL_VARIABLE_DESCR = 'Náklady, které jsou závislé od počtu naježděných kilometrů';
$TOTAL_VARIABLE_DESCR2 = 'Palivo, opravy a vylepšení, parkování (když uvážíme, že je platíte jenom když používáte vozidlo), mýtné, pokuty za dopravní přestupky a 50% z nákladů na údržbu';


//EXTRA DATA
$EXTRA_DATA = 'DOPLŇUJÍCÍ ÚDAJE';
$EXTRA_DATA1 = 'Doplňující údaje';
$EXTRA_DATA_PUBLIC_TRANSP = 'Veřejná doprava';
$EXTRA_DATA_FAMILY_NBR = 'Kolik lidí, starších 4 let, je ve vaší rodině (včetně vás)';
$EXTRA_DATA_PRICE_PASS = "Jaká je průměrná cena měsíční jízdenky na veřejnou dopravu pro jednu osobu, nevyhnutnou pro vaši běžnou každodenní činnost<br><i>jestli nepoužíváte veřejnou dopravu, nebo není k dispozici, vložte 0</i>";
$EXTRA_DATA_INCOME = "Příjem";
$EXTRA_DATA_INCOME_QUESTION = 'Jaký je váš čistý příjem?';
$EXTRA_DATA_WORKING_TIME = 'Pracovní doba';
$EXTRA_DATA_WORKING_TIME_QUESTION = 'Máte práci nebo odpovídající zaměstnání?';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = 'Čas strávený řízením';
$EXTRA_DATA_TIME_QUESTION1 = 'Kolik minut vám trvá jízda z domova na pracoviště? (pouze jedním směrem)';
$EXTRA_DATA_TIME_QUESTION2 = 'Kolik minut najezdíte ve dnech, kdy na pracoviště nejezdíte autem? ?';
$EXTRA_DATA_TIME_QUESTION3 = 'Kolik minut najezdíte?';

//PUBLIC TRANSPORTS
$PUB_TRANS_TEXT = 'Veřejná doprava pro každodenní život členů vaší rodiny';
$FAM_NBR = 'Počet členů vaší rodiny starších 4 let';
$PERSON_OR_PEOPLE = 'osoba(y)';
$PASS_MONTH_AVG = 'Průměrná cena měsíční jízdenky pro jednu osobu';
$OTHER_PUB_TRANS = 'Jiná veřejní doprava';
$OTHER_PUB_TRANS_DESC = "Částka, která ještě zůstala na jiné druhy veřejné dopravy, například mimo vaší obytní zónu, takových jako cestováni vlakem nebo dálkovým autobusem";
$TAXI_DESL = "Taxi doprava";
$ON_TAXI_PAYING = "zaplacené za taxislužbu"; //ex: 4 km __on taxi paying__ 5€ per km

//VIRTUAL SPEED
$FINANCIAL_EFFORT = 'Finanční úsilí';
$NET_INCOME_PER = 'Čistý příjem za';
$AVERAGE_NET_INCOME_PER = 'Průměrný čistý příjem za';
$NUMBER_OF_MONTHS = 'Počet měsíců ročního příjmu';
$NUMBER_OF_WEEKS = 'Počet týdnů ročního příjmu';
$NUMBER_OF_HOURS= 'Počet hodin týdenního příjmu';
$HOURS_PER = 'Hodin za';
$MONTHS_PER = 'Měsíců za';
$AVERAGE_WORKING_HOURS_PER = 'Průměrná pracovní doba za';
$WORKING_HOURS_PER = 'Pracovní doba za';
$DIST_HOME_JOB = 'Jezdíte z domu do práce';
$DAYS_DRIVE_JOB = 'Dní v týdnu jezdíte do práce';
$DIST_JORNEY_WEEKEND = 'Najezdíte během dní, kdy na pracoviště nejezdíte autem?';
$AVERAGE_DIST_PER_WEEK = 'Najezdíte v průměru za týden';
$YOU_DRIVE_PER = 'Najezdíte za';
$MINUTES_HOME_JOB = 'Minut jezdíte z domu na pracoviště';
$DAYS_DRIVE_TO_JOB = 'Dní v týdnu jezdíte do práce';
$TIME_DRIVE_WEEKEND = 'Minut najezdíte ve dnech, kdy na pracoviště nejezdíte autem?';
$MINUTES_DRIVE_PER = 'Minut najezdíte za';
$DAYS_DRIVE_PER_MONTH = 'Dní najezdíte za měsíc';
$HOURS_DRIVE_PER = 'Hodin najezdíte za';
$VIRTUAL_SPEED = 'skutečná rychlost';
$KINETIC_SPEED = 'kinetická rychlost';
$AVER_YEARLY = 'Průměrná roční';
$WORKING_TIME_MESSAGE = 'Při výpočtu se uvažovalo s průměrným pracovním časem 36 hodin týdně a 11 měsíců ročně';
$HOURS_TO_AFFORD_CAR = 'Hodin ročně je třeba odpracovat, aby jste si mohli dovolit auto';
$MONTHS_TO_AFFORD_CAR = 'Měsíců ročně je třeba odpracovat, aby jste si mohli dovolit auto';
$TOTAL_COSTS_PER_YEAR = 'Celkové roční náklady na auto';
$DAYS_CAR_PAID = 'Na kolik dní po 1. lednu je auto zaplaceno';

//**************************************************
//GRAPHICS
$PARCEL = 'Část';
$COSTS = 'Náklady';


//****************************************************
//ERROR MESSAGES
$ERROR_INVALID_INSU_VALUE = 'Chybná pojistná suma';
$ERROR_INSU_PERIOD = 'Vložte periodičnost pojištění';

$ERROR_FUEL_CURR_DIST = 'Musíte uvést, jestli chcete dělat výpočty v korunách nebo v kilometrech';
$ERROR_FUEL_CAR_EFF = ' Chybná suma spotřeby paliva';
$ERROR_FUEL_PRICE = ' Chybná cena za palivo';
$ERROR_CAR_JOB = 'Prosím označte, jestli si chcete brát vaše auto na pracovište';
$ERROR_FUEL_DIST = ' Chybná suma naježděných za měsíc kilometrů';
$ERROR_DAYS_PER_WEEK = ' Chybný počet dnů v týdnu';
$ERROR_DIST_HOME_WORK = ' Chybný počet kilometrů mezi vaším domovem a místem práce';
$ERROR_DIST_NO_JOB = "Chybný počet kilometrů, které najezdíte za ty dny, kdy nejezdíte autem do práce";
$ERROR_CURRENCY = 'Chybně koruny za měsíc';

$ERROR_DEPRECIATION_MONTH = 'Chybně zjištěný měsíc';
$ERROR_DEPRECIATION_YEAR = 'Chybně zjištěný rok';
$ERROR_DEPRECIATION_VALUE = 'Chybně  zjištěná suma';
$ERROR_DEPRECIATION_VALUE_TODAY = 'Chybná konečná hodnota vozidla';
$ERROR_DEPRECIATION_DATE = 'Chybně zjištěný datum';
$ERROR_DEPRECIATION_NEW_CAR = 'Opotřebení se neuvádi, protože toto vozidlo je nové';

$ERROR_CREDIT_QUESTION = 'Prosím, uveďte, jestli využíváte financování auta';
$ERROR_CREDIT_LOAN_VALUE = 'Chybná financovaná částka';
$ERROR_CREDIT_PERIOD = 'Chybná doba úvěru, počet splátek';
$ERROR_CREDIT_INSTALMENT = 'Chybná výška splátky';
$ERROR_CREDIT_RESIDUAL_VALUE = 'Chybná zůstatková hodnota';

$INVALID_AMOUNT = 'Chybná suma';

$INVALID_NBR_PP = 'Chybný počet osob';
$ERROR_INSPECTION_NTIMES = 'Chybný počet opakování';
$ERROR_INSPECTION_COSTS = 'Chybné náklady na technickou prohlídku';

$ERROR_PASS_AMOUNT= 'Chybná částka za měsíční jízdenku';

$ERROR_INCOME = 'Chybný čistý příjem';
$ERROR_WEEKS_PER_YEAR = 'Chybný počet týdnů za rok';
$ERROR_MONTHS_PER_YEAR = 'Chybný počet měsíců za rok';
$ERROR_HOURS_PER_WEEK = 'Chybný počet hodin za týden';
$ERROR_MIN_DRIVE_HOME_JOB = 'Chybný počet minut, který najezdíte z domu na pracoviště';
$ERROR_MIN_DRIVE_WEEKEND = 'Chybný počet minut, který najezdíte ve dnech, kdy na pracoviště nejezdíte autem';
$ERROR_MIN_DRIVE = 'Chybný počet najezděných minut ';
$ERROR_DAYS_PER_MONTH = 'Chybný počet dnů za měsíc';

//FINAL RESULT
$YOUR_CAR_COSTS_YOU = 'Náklady na vaše vozidlo jsou';
$WITH_THIS_LEVEL_OF_COSTS = 'S touto úrovní nákladů, vás vaše vozidlo během'; //ex: __"With this level of costs, you car during the"__ 15 months of possession....
$MONTHS_POSS = 'mesíců držení už stálo';   //ex: With this level of costs, you car during the 15 ___"months of possession has already costed"___ 14000 Euros


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