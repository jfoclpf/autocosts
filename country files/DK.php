<?php

// COUNTRY: DANMARK
// LANGAUAGE: DANSK

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
$CURR_NAME = 'Krone';
$CURR_NAME_PLURAL = 'Kroner';
$CURR_NAME_BIG_PLURAL = 'KRONER';
$CURR_SYMBOL = 'kr';
$STD_DIST = 'km'; //short text version you'd like to apply
$STD_DIST_FULL = 'kilometer';
$STD_FUEL_CALC = 'km/l'; //text version you'd like to apply
$STD_VOLUME_SHORT = 'liter'; //short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)

//simple words
$WORD_PER = 'per';     //ex: 4 km _per_ day
$WORDS_PER_EACH = 'hver';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = 'gange'; //ex: 4 times per week
$DURING = 'i';   //spent in tolls 3€ per day _during_ 22 days per month
$WORD_PEOPLE = 'personer';   //plural, 3 _people_ 
$YES = 'ja';
$NO = 'nej';

$BUTTON_RUN = 'Prøv'; //run simulator button 
$BUTTON_RERUN = 'Prøv igen'; //run simulator button 

//WEB PAGE
$WEB_PAGE_TITLE = 'Beregn dine biludgifter';
$MAIN_TITLE = 'BEREGN DINE BILUDGIFTER';
$INITIAL_TEXT = 
"Med denne beregner kan du finde frem til <b>de reelle udgifter</b> ved at eje en bil i <b>Danmark</b>. Den vil som oftest give dig et godt billede af, hvilke udgifter du skal tage højde for som bilejer. Da afbetalinger og udgifter kommer løbende gennem hele året, kan det være svært at få overblik over omkostningerne ved at have bil. <br> <br> Vær realistisk, når du indtaster dine tal. Ved uforudsete udgifter, som for eksempel reparationer eller bøder, bør du overveje, hvor meget du har brugt på disse poster de sidste par år. Som udgangspunkt beregnes disse tal månedligt. Ved decimaler skal du bruge punktum, for eksempel <span style=\"color:rgb(255,0,0);\">8.7</span> km mellem hjem og arbejdsplads.<br>";

$HELP_PROJECT = 'Dette er en gratis tjeneste uden reklamer!'; 
$AC_MOBILE = 'AUTOCOSTS<br>mobilvisning'; 
$AC_DOMAIN = 'AUTOCOSTS.ORG';
$AC_SUB_HEADER = 'BEREGN DINE BILUDGIFTER';

//time words $DAYLY = 'ημερησίως'; 
$WEEKLY = 'dagligt'; 
$MONTHLY = 'ugentligt'; 
$TRIMESTERLY = 'månedligt'; 
$SEMESTERLY = 'hvert kvartal'; 
$YEARLY = 'årligt';

$MIN = 'min';
$MINUTES = 'minuter';
$HOUR = 'time';
$HOURS = 'timer';
$HOUR_ABBR = 't';
$DAY = 'dag'; 
$DAYS = 'dage'; 
$WEEK = 'uge'; 
$WEEKS = 'uger'; 
$MONTH = 'måned'; 
$MONTHS = 'måneder'; 
$TWO_MONTHS = 'to måneder'; 
$DIST_EACH_TWO_MONTHS = 'kilometer for to måneder'; 
$TRIMESTER = 'hver tredje måned'; 
$SEMESTER = 'hvert halve år'; 
$YEAR = 'år';

$DAYS_PER_WEEK_SHORT= 'dage/måneder';

//distance
$DISTANCE = "Distance";

//statistics
$AVERAGE_COSTS_PER_TYPE = 'Gennemsnitligt månedligt pris pr typen';
$COUNTRY_NAME = 'Danmark';
$STATISTIC_TITLE = 'Automobile omkostninger for';
$DEPRECIATION_ST = 'Afskrivninger';
$INSURANCE_ST = 'Forsikring';
$REP_ST = 'Reparationer';
$WASHING_ST = 'Vask';
$VIRTUAL_SPEED_TITLE = 'Virtuel hastighed';
$KINETIC_SPEED_TITLE = 'Kinetisk hastighed';

//calculator words 
$COSTS= "Udgifter"; 
$FIXED_COSTS = 'Faste udgifter'; 
$FIXED_COSTS_HEADER_1= 'FASTE UDGIFTER'; //capital letters 
$FIXED_COSTS_HEADER_2= "Udgifter, der ikke bestemmes af antal kørte km, og som skal betales for at have rådighed over bilen"; 

$RUNNING_COSTS = 'Løbende udgifter'; 
$RUNNING_COSTS_HEADER_1 = 'LØBENDE UDGIFTER'; //capital letters 
$RUNNING_COSTS_HEADER_2 = 'Udgifter der bestemmes af antal kørte km';

$PRIVATE_COSTS = 'Private udgifter'; 
$MONTHLY_AMOUNT = 'Månedligt beløb'; 
$RUN_CP_DIST = 'Løbende udgifter per km'; //running costs per unit distance 
$TOTAL_CP_DIST = 'Totale udgifter per km'; //total costs per unit distance 
$PUBL_TRA_EQUIV= "Tilsvarende transportudgifter hvis du ikke ejer en bil."; 
$WORD_TOTAL_CAP = 'TOTAL'; //capital word for total

$WORD_PRINT = 'Print';
$WORD_DOWNLOAD_PDF = 'Download PDF-rapport';

//depreciation 
$DEPRECIATION = 'Bilens værdiforringelse'; 
$AQ_DATE = 'Dato for køb af bilen'; 
$COM_VALUE = 'Bilens værdi da du købte den <br><i>ved køb af ny bil anføres købsprisen <br>ved køb af brugt bil anføres bilens daværende værdi</i>'; 
$COM_VALUE_TODAY = 'Bilens nuværende værdi<br><i>sælger du din bil nu, hvad kan du så få for den?</i>'; 
$PERIOD_OWN = 'Hvor længe har du ejet bilen'; 
$FINAL_VALUE = 'Bilens endelige værdi'; 
$AQ_VALUE = 'Bilens værdi da du købte den';

//insurance 
$INSURANCE = 'Bilforsikring og autohjælp'; 
$INSURANCE_SHORT = 'Dækning – forsikring og autohjælp';

//credit 
$CREDIT = 'Billån'; 
$CREDIT_PERIOD = 'Løbetid'; 
$CREDIT_INTERESTS = 'Lånerente'; 
$CREDIT_INTERESTS_MONTH = 'Månedligt rentebeløb'; 
$CREDIT_TOTAL_INTERESTS = 'Det fulde rentebeløb'; 
$CREDIT_QUESTION = 'Købte du din bil med lån?'; 
$CREDIT_LOAN = 'Det finansierede beløb:<br><i>Hvor meget lånte du?</i>'; 
$CREDIT_LOAN2 = 'Det finansierede beløb'; 
$CREDIT_PERIOD = 'Lånets løbetid / antal afdrag'; 
$CREDIT_AVERAGE_VALUE = 'Afdragenes størrelse'; 
$CREDIT_RESIDUAL_VALUE = 'Resterende beløb:<br><i>Når lånets løbetid afsluttes, hvor meget mangler du så stadig at betale, eller hvor meget har du betalt?</i>'; 
$CREDIT_RESIDUAL_VALUE1 = 'Resterende beløb'; 
$CREDIT_INSTALMENT = 'Det månedlige beløb';

//inspection 
$INSPECTION = 'Bilsyn'; 
$INSPECTION_SHORT = 'Syn'; 
$INSPECTION_NBMR_TIMES = 'Hvor mange gange har din bil været til syn?'; 
$INSPECTION_PRICE =  'Gennemsnitlige udgifter ved hvert syn'; 
$EACH_ONE_DURING = 'per gang gennem'; //5 times costing 15€ *each one during* 20 months (inspection) 
$TIMES_COSTING = 'gange ved pris af';     //5 *times costing* 15€ each one during 20 months (inspection)

//road taxes 
$ROAD_TAXES = 'Forbrugsafgifter (Bilafgifter, hvis gældende)'; 
$ROAD_TAXES_SHORT = 'Bilafgift'; 
$ROAD_TAXES_VALUE = 'Betalte afgifter på din bil:<br><i>statens afgifter</i>';

//fuel 
$FUEL = 'Brændstof'; 
$FUEL_DESC = 'Benzin, diesel, el'; 
$FUEL_CALC = 'Beregningen baseret på'; 
$FUEL_JOB_CALC = 'Hvis du tager bilen på arbejde?'; 
$FUEL_JOB_CALC1 = 'Dag(e) om ugen du tager bilen på arbejde'; 
$FUEL_DAYS = 'Dag(e) om ugen du tager bilen på arbejde'; 
$FUEL_DIST_HOME_JOB = 'Antal km mellem dit hjem og din arbejdsplads (ikke retur)'; 

//$CURR_DIST=km, miles, etc. 
$FUEL_DIST_HOME_JOB1 = 'km mellem hjem og arbejdsplads'; 
//you drive 7 miles between home and your job 
$FUEL_DIST_NO_JOB = "Kilometer du gennemsnitligt kører de dage, du ikke tager bilen på arbejde:<br><i>for eksempel i weekenden</i>"; 
$FUEL_DIST_NO_JOB1 = "km de dage du ikke tager bilen på arbejde"; // you do 5 miles per week.... 
$FUEL_DIST = 'Kilometer du kører'; 
$FUEL_CAR_EFF = 'Bilens brændstofforbrug'; 
$FUEL_PRICE = 'Gennemsnitlig pris for brændstof/benzin'; 
$FUEL_PRICE1 = 'Gennemsnitlig benzinpris'; 
$YOU_DRIVE_TOTTALY_AVG = 'Antal km kørt per dag'; //__You drive on average a total of __ 5 miles per day 
$YOU_DRIVE = 'Du kører'; //__You drive__ 5 miles per day

//MAINTENANCE 
$MAINTENANCE = 'Vedligehold'; 
$MAINTENANCE_DESC = 'Gennemsnitlige udgifter til vedligehold og autohjælp:<br><i>udskiftning af olie, filtre, lygter, dæk, bremser, klimaanlæg, ratjustering m.v.</i>';

//REPAIRS AND IMPROVEMENTS 
$REP_IMPROV = 'Reparationer og forbedringer'; 
$REP_IMPROV_DESC = 'Gennemsnitlige udgifter til reparationer og forbedringer:<br><i>bildele, tilpasninger, udbedring af reparationer, buler, påkørsler, tuning m.v.</i>';

//PARKING 
$PARKING = 'Parkering'; 
$PARKING_DESC = 'Gennemsnitlige udgifter til parkering:<br><i>parkometre i byen, leje af parkeringsplads, parkeringspladser i offentlige bygninger, enten over eller under jorden, indkøbscentre, lufthavne, bus- eller togstationer og andre infrastrukturer.</i>';

//TOLLS 
$TOLLS = 'Vejafgifter'; 
$TOLLS_DESC = 'Gennemsnitligt beløb brugt på vejafgifter,<br><i>broer, tunneller, motorveje og myldretidsafgifter for at få adgang til særlige veje</i>'; 
$TOLLS_DAY_CALC = 'Beregning baseret på dagligt forbrug?'; 
$TOLLS_DAY_CALC1 = 'Dagligt forbrug på vejafgifter'; 
$TOLLS_DAY_CALC_DESC = 'Tag alle ture uden for din by med i dine overvejelser, inklusive alle former for elektroniske vejafgifter';

//FINES 
$FINES = 'Bøder'; 
$FINES_DESC = 'Gennemsnitligt beløb brugt på bøder:<br><i>overvej, hvad du har brugt på bøder (ulovlig parkering, overtrædelse af fartgrænser, brug af mobiltelefon under kørsel m.v.) inden for de sidste par år.</i>';

//WASHING 
$WASHING = 'Vask og rens'; 
$WASHING_DESC = 'Gennemsnitlige udgifter til bilvask:<br><i>på tankstationer m.v.</i>';

//TOTAL 
$TOTAL_FIXED = 'TOTAL - Faste udgifter'; 
$TOTAL_FIXED_DESCR = "Udgifter, der ikke bestemmes af antal kørte km, og de udgifter, der må betales, selv om bilen ikke er i brug"; 
$TOTAL_FIXED_DESCR2 = 'Værdiforringelse, forsikring, lånerenter, afgifter, syn og 50% af parkering og vedligehold';

$TOTAL_VARIABLE = 'TOTAL - Løbende udgifter'; 
$TOTAL_VARIABLE_DESCR = 'Udgifter der bestemmes af antal kørte km'; 
$TOTAL_VARIABLE_DESCR2 = 'Brændstof, reparationer og forbedringer, parkering (der kun betales når bilen er i brug), afgifter, bøder, vask og 50% af vedligehold';


//EXTRA DATA 
$EXTRA_DATA = 'YDERLIGERE OPLYSNINGER'; 
$EXTRA_DATA1 = 'Yderligere oplysninger'; 
$EXTRA_DATA_PUBLIC_TRANSP = 'Public transports';
$EXTRA_DATA_FAMILY_NBR = 'Hvor mange medlemmer over fire år findes i din husstand (inklusive dig selv)'; 
$EXTRA_DATA_PRICE_PASS = "Hvad er den gennemsnitlige udgift til offentlig transport per måned for hver person i din husstand<br><i>hvis I ikke bruger offentlig transport, så indtast 0</i>";
$EXTRA_DATA_INCOME = "Indkomst";
$EXTRA_DATA_INCOME_QUESTION = 'Hvad er din nettoindkomst?';
$EXTRA_DATA_WORKING_TIME = 'Arbejdstid';
$EXTRA_DATA_WORKING_TIME_QUESTION = 'Har du et job eller en værdig beskæftigelse?';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = 'Tid anvendt på kørsel';
$EXTRA_DATA_TIME_QUESTION1 = 'Hvor mange minutter kører du fra hjem til arbejdsplads? (kun den ene vej)';
$EXTRA_DATA_TIME_QUESTION2 = 'Hvor mange minutter kører du, de dage hvor du ikke tager bilen til arbejde?';
$EXTRA_DATA_TIME_QUESTION3 = 'Hvor mange minutter kører du?';

//PUBLIC TRANSPORTS 
$PUB_TRANS_TEXT = 'Offentlig transport for hele husstanden'; 
$FAM_NBR = 'Antal medlemmer af husstanden over fire år'; 
$PERSON_OR_PEOPLE = 'person(er)'; 
$PASS_MONTH_AVG = 'Gennemsnitlige månedlige udgifter til offentlig transport per person'; 
$OTHER_PUB_TRANS = 'Anden offentlig transport'; 
$OTHER_PUB_TRANS_DESC = "Beløb, der ikke er anført ved anden offentlig transport, for eksempel transport uden for dit normale område, såsom længere ture med tog eller bus"; 
$TAXI_DESL = "Taxa"; 
$ON_TAXI_PAYING = "med taxa ved pris af"; //ex: 4 miles__on taxi paying__ 5€ per mile

//VIRTUAL SPEED
$FINANCIAL_EFFORT = 'Financiel indsats';
$NET_INCOME_PER = 'Nettoindkomst per';
$AVERAGE_NET_INCOME_PER = 'Gennemsnitlig nettoindkomst per';
$NUMBER_OF_MONTHS = 'Antal måneder per år med indkomst';
$NUMBER_OF_WEEKS = 'Antal uger per år med indkomst';
$NUMBER_OF_HOURS= 'Antal timer per uge med indkomst';
$HOURS_PER = 'Timer per';
$MONTHS_PER = 'Måneder per';
$AVERAGE_WORKING_HOURS_PER = 'Gennemsnitligt antal arbejdstimer per';
$WORKING_HOURS_PER = 'Arbejdstimer per';
$DIST_HOME_JOB = 'Du kører fra hjem til arbejdsplads';
$DAYS_DRIVE_JOB = 'Dage per uge du kører til din arbejdsplads';
$DIST_JORNEY_WEEKEND = 'Du kører de dage, hvor du ikke tager bilen til arbejdspladsen';
$AVERAGE_DIST_PER_WEEK = 'Du kører i gennemsnit per uge';
$YOU_DRIVE_PER = 'Du kører  per';
$MINUTES_HOME_JOB = 'Minutter du kører fra hjem til din arbejdsplads';
$DAYS_DRIVE_TO_JOB = 'Dage per uge du kører til din arbejdsplads';
$TIME_DRIVE_WEEKEND = 'Minutter du kører, de dage hvor du ikke tager bilen til din arbejdsplads';
$MINUTES_DRIVE_PER = 'Minutter du kører per';
$DAYS_DRIVE_PER_MONTH = 'Dage du kører per måned';
$HOURS_DRIVE_PER = 'Timer du kører per';
$VIRTUAL_SPEED = 'virtuel hastighed';
$KINETIC_SPEED = 'kinetisk hastighed';
$AVER_YEARLY = 'Årligt gennemsnit';
$WORKING_TIME_MESSAGE = 'I beregninger anvendes en gennemsnitlig arbejdstid på 36 timer om ugen og11 måneder per år';
$HOURS_TO_AFFORD_CAR = 'Timer per år du behøver at arbejde for at have råd til din bil';
$MONTHS_TO_AFFORD_CAR = 'Måneder per år du behøver at arbejde for at have råd til din bil';
$TOTAL_COSTS_PER_YEAR = 'Totalomkostninger per år for bilen';
$DAYS_CAR_PAID = 'Efter hvor mange dage efter 1. januar er bilen betalt';

//************************************************** 
//GRAPHICS 
$PARCEL = 'Pakke'; 
$COSTS = 'Udgifter';


//**************************************************** //ERROR MESSAGES 
$ERROR_INVALID_INSU_VALUE = 'Ugyldigt forsikringsbeløb'; 
$ERROR_INSU_PERIOD = 'Indtast betalingshyppighed på din forsikring';

$ERROR_FUEL_CURR_DIST = 'Du skal nu beslutte, om du vil foretage din beregning baseret på km eller kroner'; 
$ERROR_FUEL_CAR_EFF = 'Ugyldigt benzinforbrug'; 
$ERROR_FUEL_PRICE = 'Ugyldig benzinpris'; 
$ERROR_CAR_JOB = 'Anfør, om du tager bilen på arbejde'; 
$ERROR_FUEL_DIST = 'Ugyldigt antal kørte km per måned'; 
$ERROR_DAYS_PER_WEEK = 'Ugyldigt antal dage per uge'; 
$ERROR_DIST_HOME_WORK = 'Ugyldigt antal km mellem hjem og arbejdsplads'; 
$ERROR_DIST_NO_JOB = "Ugyldigt antal kørte km de dage du ikke tager bilen på arbejde"; 
$ERROR_CURRENCY = 'Ugyldigt antal kroner per måned';

$ERROR_DEPRECIATION_MONTH = 'Ugyldig måned for køb af bil'; 
$ERROR_DEPRECIATION_YEAR = 'Ugyldigt år for køb af bil'; 
$ERROR_DEPRECIATION_VALUE = 'Ugyldig købspris'; 
$ERROR_DEPRECIATION_VALUE_TODAY = 'Ugyldig nuværende værdi på bilen'; 
$ERROR_DEPRECIATION_DATE = 'Ugyldig dato for køb af bil'; 
$ERROR_DEPRECIATION_NEW_CAR =  'Værdiforringelse medregnes ikke, da bilen er ny';

$ERROR_CREDIT_QUESTION = 'Angiv, om du tog et billån'; 
$ERROR_CREDIT_LOAN_VALUE = 'Ugyldigt lånebeløb'; 
$ERROR_CREDIT_PERIOD = 'Ugyldig løbetid, antal afdrag'; 
$ERROR_CREDIT_INSTALMENT = 'Ugyldigt afdragsbeløb'; 
$ERROR_CREDIT_RESIDUAL_VALUE = 'Ugyldig restværdi';

$ERROR_INSPECTION_NTIMES = 'Ugyldigt antal gange'; 
$ERROR_INSPECTION_COSTS = 'Ugyldig udgift til syn';

$INVALID_AMOUNT = 'Ugyldigt beløb';

$INVALID_NBR_PP = 'Ugyldigt antal personer'; 
$ERROR_PASS_AMOUNT= 'Ugyldigt bødebeløb';

$ERROR_INCOME = 'Ugyldig nettoindkomst';
$ERROR_WEEKS_PER_YEAR = 'Ugyldigt antal uger per år';
$ERROR_MONTHS_PER_YEAR = 'Ugyldigt antal måneder per år';
$ERROR_HOURS_PER_WEEK = 'Ugyldigt antal timer per uge';
$ERROR_MIN_DRIVE_HOME_JOB = 'Ugyldigt antal minutter du kører fra hjem til arbejdsplads';
$ERROR_MIN_DRIVE_WEEKEND = 'Ugyldigt antal minutter du kører, de dage hvor du ikke tager bilen til arbejde';
$ERROR_MIN_DRIVE = 'Ugyldigt antal minutter du kører';
$ERROR_DAYS_PER_MONTH = 'Ugyldigt antal dage per måned'; 

$YOUR_CAR_COSTS_YOU = 'Dine biludgifter'; 
$WITH_THIS_LEVEL_OF_COSTS = 'Udgifterne til din bil gennem'; //ex: __"With this level of costs for your car during the"__ 15 months of possession.... 
$MONTHS_POSS = 'måneders ejerskab er fastsat til';   //ex: With this level of costs for your car during the 15 ___"months of possession, it has already been determined to be "___ 14000 Euros/USD


$TAXI_PRICE_PER_DIST=2.5; //amount paid for taxi in chosen currency per chosen unit distance

//***************************************** 
//STANDARD COMMON AVERAGE DEFAULT values that appear on the start page 
//these values are to be changed by the user but you must insert values that are reasonable 
//keep in mind your chosen standard currency as well as your volume and fuel efficiency standards

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