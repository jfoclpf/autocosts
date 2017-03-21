<?php

// COUNTRY: ROMÂNIA
// LANGUAGE: ROMÂNĂ

$COUNTRY_NAME = 'România';

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
$CURR_CODE = 'RON';
$CURR_NAME = 'Lei';
$CURR_NAME_PLURAL = 'Lei';
$CURR_NAME_BIG_PLURAL = 'LEI';
$CURR_SYMBOL = 'lei';
$STD_DIST = 'km'; //short text version you'd like to apply
$STD_DIST_FULL = 'kilometri';
$STD_FUEL_CALC = 'l/100km'; //text version you'd like to apply
$STD_VOLUME_SHORT = 'ltr'; //short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)

//simple words
$WORD_PER = 'pe';     //ex: 4 km _per_ day
$WORDS_PER_EACH = 'la fiecare';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = 'ori'; //ex: 4 times per week
$DURING = 'în timpul';   //spent in tolls 3x per day _during_ 22 days per month
$WORD_PEOPLE = 'oameni';   //plural, 3 _people_ 
$YES = 'da';
$NO = 'nu';

$BUTTON_RUN = 'Rulaţi'; //run calculator button 
$BUTTON_RERUN = 'Rulaţi din nou'; //run calculator button 

//WEB PAGE
$WEB_PAGE_TITLE = 'Calculator costuri automobil';
$MAIN_TITLE = 'CALCULATOR COSTURI AUTOMOBIL';
$INITIAL_TEXT = 
"Acest calculator vă permite să identificaţi <b>adevăratul cost</b> al deţinerii unei maşini în <b>România</b>. în mod normal vă va oferi o bună estimare a costurilor pe care trebuie să le faceţi ca să vă permiteţi deţinerea unei maşini.
Deoarece facturile pentru combustibil apar în diferite momente de timp peste an, este uneori dificil să puteţi aprecia costurile reale totale pe care le aveţi cu maşina dumneavoastră. Fiţi realist când introduceţi valorile solicitate de program. Pentru costuri neaşteptate, cum ar fi costuri de reparaţie sau amenzi, gândiţi-vă cât aţi cheltuit pe aceste lucruri în timpul ultimilor ani. Ca regulă, aceste calcule sunt lunare. Folositi simbolul punct pentru notaţiile decimale, de exemplu 8.7 kilometri între casă şi locul de muncă";
$DISCLAIMER = "Esta calculadora es <b>completamente anónima</b> y no solicita ni almacena, ningún nombre, correo electrónico, <i>cookies</i>, dirección IP, ni ninguna otra información personal.";

$HELP_PROJECT = 'Sprijiniţi acest proiect' ;
$AC_MOBILE = 'AUTOCOSTS<br> pentru aparate mobile';
$AC_SUB_HEADER = 'CALCULATOR COSTURI AUTOMOBILE';

//time words
$DAYLY = 'zilnic';
$WEEKLY = 'săptămânal';
$MONTHLY = 'lunar';
$TRIMESTERLY = 'trimestrial';
$SEMESTERLY = 'semestrial';
$YEARLY = 'anual';

$MIN = 'min';
$MINUTES = 'minute';
$HOUR = 'oră';
$HOURS = 'ore';
$HOUR_ABBR = 'h';
$DAY = 'zi';
$DAYS = 'zile';
$WEEK = 'săptămână';
$WEEKS = 'săptămâni';
$MONTH = 'lună';
$MONTHS = 'luni';
$TWO_MONTHS = 'două luni';
$DIST_EACH_TWO_MONTHS = 'kilometri la fiecare două luni';
$TRIMESTER = 'trimestru';
$SEMESTER = 'semestru';
$YEAR = 'an';

$DAYS_PER_WEEK_SHORT= 'zile/săptămâni';

//distance
$DISTANCE = "Distance";

//statistics
$AVERAGE_COSTS_PER_TYPE = 'Costul mediu lunar pe tip';
$STATISTIC_TITLE = 'Costurile de automobile pentru';
$DEPRECIATION_ST = 'Deprecierea';
$INSURANCE_ST = 'Asigurare';
$REP_ST = 'Reparatii';
$WASHING_ST = 'Spălat';
$VIRTUAL_SPEED_TITLE = 'Viteză virtuală';
$KINETIC_SPEED_TITLE = 'Viteză kinetică';

//calculator words
$COSTS= "Costuri";
$FIXED_COSTS = 'Costuri fixe';
$FIXED_COSTS_HEADER_1= 'COSTURI FIXE'; //capital letters
$FIXED_COSTS_HEADER_2= "Acelea care nu depind de distanţa parcursă, şi pentru care trebuie să plătiţi pentru a avea maşina disponibilă pentru circulaţie."; 

$RUNNING_COSTS = 'Costuri mobile';
$RUNNING_COSTS_HEADER_1 = 'COSTURI MOBILE'; //capital letters
$RUNNING_COSTS_HEADER_2 = 'Acelea care depind de distanţa parcursă';

$PRIVATE_COSTS = 'Costuri personale';
$MONTHLY_AMOUNT = 'Suma lunară';
$RUN_CP_DIST = 'Costuri mobile pe kilometru'; //running costs per unit distance
$TOTAL_CP_DIST = 'Cost total pe kilometru'; //total costs per unit distance
$PUBL_TRA_EQUIV= "Costuri echivalente de transport, luând în considerare că nu deţineţi o maşină";
$WORD_TOTAL_CAP = 'TOTAL'; //capital word for total

$WORD_PRINT = 'Printaţi';
$WORD_DOWNLOAD_PDF = 'Descărcaţi raportul în format PDF';

//depreciation
$DEPRECIATION = 'Deprecierea vehiculului';
$AQ_DATE = 'Data de achiziţie a maşinii';
$COM_VALUE = 'Valoarea comercială a maşinii la cumpărare<br><i> dacă este nouă, preţul plătit pentru maşină<br> dacă este o maşină second-hand, valoarea comercială a maşinii la momentul achiziţiei</i>';
$COM_VALUE_TODAY = 'Valoarea comercială a maşinii astăzi<br><i> dacă o vindeţi acum, cât de mult aţi obţine pe ea?</i>';
$PERIOD_OWN = 'Perioada de posesie';
$FINAL_VALUE = 'Valoarea finală';
$AQ_VALUE = 'Valoarea de achiziţie';

//insurance
$INSURANCE = 'Asigurarea autovehiculului şi asistenţa tehnică';
$INSURANCE_SHORT = 'Asigurare şi asistenţă tehnică';

//credit
$CREDIT = 'Finanţare maşină';
$CREDIT_PERIOD = 'Perioadă';
$CREDIT_INTERESTS = 'Dobânzi la împrumut';
$CREDIT_INTERESTS_MONTH = 'Suma lunară a valorii dobânzilor';
$CREDIT_TOTAL_INTERESTS = 'Suma totală a valorii dobânzilor';
$CREDIT_QUESTION = 'Aţi folosit o metodă de finanţare a maşinii pentru achiziţia acesteia?';
$CREDIT_LOAN = 'Suma împrumutată:<br><i>Care este valoarea împrumutului efectuat?</i>';
$CREDIT_LOAN2 = 'Suma împrumutată';
$CREDIT_PERIOD = 'Perioada de creditare / numărul de rate plăţi credit';
$CREDIT_AVERAGE_VALUE = 'Valoarea medie pentru fiecare rată de achitat';
$CREDIT_RESIDUAL_VALUE = 'Valoarea reziduală:<br><i>La sfărşitul perioadei de credit, cât de mult mai trebuie să plătiţi sau aţi achitat?</i>';
$CREDIT_RESIDUAL_VALUE1 = 'Valoarea reziduală';
$CREDIT_INSTALMENT = 'Valoarea medie lunară';

//inspection
$INSPECTION = 'Inspecţia tehnică a maşinii (ITP)';
$INSPECTION_SHORT = 'Inspecţie';
$INSPECTION_NBMR_TIMES = 'De câte ori aţi dus maşina la inspecţie?';
$INSPECTION_PRICE =  'Costul mediu pentru fiecare inspecţie a automobilului';
$EACH_ONE_DURING = 'la fiecare'; //5 times costing 15x *each one during* 20 months (inspection)
$TIMES_COSTING = 'ori costul a';     //5 *times costing* 15x each one during 20 months (inspection)

//road taxes
$ROAD_TAXES = 'Taxe şi accize pentru vehicul (Taxe auto)';
$ROAD_TAXES_SHORT = 'Taxe auto';
$ROAD_TAXES_VALUE = 'Taxe auto pentru vehiculul dumneavoastră:<br><i> plată efectuată către stat</i>';

//fuel
$FUEL = 'Combustibil';
$FUEL_DESC = 'Benzină, motorină, LPG, electricitate';
$FUEL_CALC = 'Calculations based on';
$FUEL_JOB_CALC = 'Circulaţi cu maşina la servici?';
$FUEL_JOB_CALC1 = 'Zi(le) pe săptămână  când conduceţi pentru a merge la servici';
$FUEL_DAYS = 'Zi(le) pe săptămână  când conduceţi pentru a merge la servici';
$FUEL_DIST_HOME_JOB = 'Kilometri parcurşi între casă şi locul de muncă (doar dus)'; //$CURR_DIST=km, miles, etc.
$FUEL_DIST_HOME_JOB1 = 'kilometri între casă şi locul de muncă'; //you do 7 km between home and job
$FUEL_DIST_NO_JOB = "Kilometri parcurşi în medie în zilele în care nu vă duceţi cu maşina la servici:<br><i>de exemplu, în fiecare săptămână</i>";
$FUEL_DIST_NO_JOB1 = "kilometri parcurşi în medie în zilele în care nu vă duceţi cu maşina la servici"; // you do 5 km per week....
$FUEL_DIST = 'Kilometri parcurşi';
$FUEL_CAR_EFF = 'Eficienţa consumului de combustibil la autovehiculul dumneavoastră';
$FUEL_PRICE = 'Preţul mediu pe care îl plătiţi pentru combustibil';
$FUEL_PRICE1 = 'Preţul mediu al combustibilului';
$YOU_DRIVE_TOTTALY_AVG = 'Parcurge-ţi în total în jur de '; //__You drive totally on average of__ 5 km per day
$YOU_DRIVE = 'Parcurge-ţi'; //__You drive__ 5 km per day

//MAINTENANCE
$MAINTENANCE = 'Întreţinere';
$MAINTENANCE_DESC = 'Costul mediu de întreţinere şi asistenţă tehnică:<br><i>înlocuirea uleiului, filtre, lumini, anvelope, frâne, aer condiţionat, controlul direcţiei, etc.</i>';

//REPAIRS AND IMPROVEMENTS
$REP_IMPROV = 'Reparaţii şi îmbunătăţiri';
$REP_IMPROV_DESC = 'Costul mediu al reparaţiilor şi îmbunătăţirilor:<br><i>piese auto, modificări, reparaţii pentru probleme tehnice, ciocniri, coliziuni, tuning, etc.</i>';

//PARKING
$PARKING = 'Parcare';
$PARKING_DESC = 'Costul mediu cu parcarea autovehiculului:<br><i> taxatoare de parcare în oraş, închirierea unui spaţiu de parcare, loturi de parcare subterane sau supraterane în clădiri publice, centre de cumpărături, aeroporturi, staţii de autobuz sau tren sau orice alte infrastructuri asemenea.</i>';

//TOLLS
$TOLLS = 'Taxe de drum';
$TOLLS_DESC = 'Suma medie cheltuită cu taxele de drum <br><i>porturi, tunele, autostrăzi sau taxe de congestie pentru a accesa centrul oraşului</i>';
$TOLLS_DAY_CALC = 'Calculaţi în funcţie de zi?';
$TOLLS_DAY_CALC1 = 'Suma zilnică cheltuită cu taxele de drum';
$TOLLS_DAY_CALC_DESC = 'Luaţi în considerare chiar şi cele mai rare călătorii efectuate în afara oraşului sau la ţară, sau chitanţele pentru orice fel de metodă de colectare a taxelor de drum';

//FINES
$FINES = 'Amenzi';
$FINES_DESC = 'Suma medie achitată pe amenzi:<br><i> luaţi în considerare cât de mult aţi plătit în ultimii ani pe orice fel de amenzi în trafic (parcare ilegală, depăşirea nepermisă a vitezei, utilizarea greşită a telefonului mobil în timpul conducerii automobilului, etc.)</i>';

//WASHING
$WASHING = 'Spălare şi curăţare';
$WASHING_DESC = 'Suma cheltuită în medie pentru spălarea şi îngrijirea maşinii:<br><i> în service-urile special amenajate sau în alte locuri</i>';

//TOTAL
$TOTAL_FIXED = 'TOTAL - Costuri fixe';
$TOTAL_FIXED_DESCR = "Costuri care nu depind de distanţa parcursă şi care trebuie achitate chiar dacă autovehicului este oprit permanent";
$TOTAL_FIXED_DESCR2 = 'Depreciere, asigurare, dobânzi împrumut, taxe, inspecţie tehnică şi 50% parcare şi întreţinere';

$TOTAL_VARIABLE = 'TOTAL - Costuri mobile';
$TOTAL_VARIABLE_DESCR = 'Costuri care depind de numărul de kilometri parcurşi';
$TOTAL_VARIABLE_DESCR2 = 'Combustibil, reparaţii şi îmbunătăţiri, parcare (considerând că achitaţi doar când utilizaţi maşina), taxe de drum, amenzi în trafic, spălare, şi 50% întreţinere vehicul';


//EXTRA DATA
$EXTRA_DATA = 'DATE ADIŢIONALE';
$EXTRA_DATA1 = 'Date adiţionale';
$EXTRA_DATA_PUBLIC_TRANSP = 'Public transports';
$EXTRA_DATA_FAMILY_NBR = 'Cât de multe persoane peste vârsta de 4 ani se află în familia dumneavoastră (inclusiv dumneavoastră)';
$EXTRA_DATA_PRICE_PASS = "Care este preţul mediu pe persoană pentru utilizarea transportului public, lunar, în mod obişnuit <br><i>dacă transportul public nu se aplică pentru dumneavoastră, inseraţi 0</i>";
$EXTRA_DATA_INCOME = "Venit";
$EXTRA_DATA_INCOME_QUESTION = 'Care este venitul dvs. net?';
$EXTRA_DATA_WORKING_TIME = 'Timp de lucru';
$EXTRA_DATA_WORKING_TIME_QUESTION = 'Aveţi un loc de muncă sau o ocupaţie lucrativă?';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = 'Timp petrecut la volan';
$EXTRA_DATA_TIME_QUESTION1 = 'Câte minute călătoriţi cu maşina de acasă la locul de muncă? (doar dus)';
$EXTRA_DATA_TIME_QUESTION2 = 'Câte minute călătoriţi cu maşina în zilele în care nu mergeţi cu maşina la locul de muncă?';
$EXTRA_DATA_TIME_QUESTION3 = 'Câte minute călătoriţi cu maşina?';

//PUBLIC TRANSPORTS
$PUB_TRANS_TEXT = 'Transport public cotidian pentru familia dumneavoastră';
$FAM_NBR = 'Numărul persoanelor din familia dumneavoastră în vârstă de peste 4 ani';
$PERSON_OR_PEOPLE = 'persoană(persoane)';
$PASS_MONTH_AVG = 'Suma medie pentru abonamente de transport public, pe persoană';
$OTHER_PUB_TRANS = 'Alte mijloace de utilizare a transportului public';
$OTHER_PUB_TRANS_DESC = "Suma disponibilă pentru alte mijloace de utilizare a transportului public, de exemplu, în afara localităţii, cum ar fi trenuri sau autobuze pentru călătorii lungi";
$TAXI_DESL = "Transport cu taxiul";
$ON_TAXI_PAYING = "plăţi cu taxiul"; //ex: 4 km __on taxi paying__ 5x per km

//VIRTUAL SPEED
$FINANCIAL_EFFORT = 'Efort financiar';
$NET_INCOME_PER = 'Venit net pe';
$AVERAGE_NET_INCOME_PER = 'Venit net mediu pe';
$NUMBER_OF_MONTHS = 'Număr de luni pe venit anual';
$NUMBER_OF_WEEKS = 'Număr de săptămâni pe venit anual';
$NUMBER_OF_HOURS= 'Număr de ore pe venit săptămânal';
$HOURS_PER = 'Ore pe';
$MONTHS_PER = 'Luni pe';
$AVERAGE_WORKING_HOURS_PER = 'Număr mediu de ore de muncă pe';
$WORKING_HOURS_PER = 'Ore de muncă pe';
$DIST_HOME_JOB = 'Şofaţi de acasă la locul de muncă';
$DAYS_DRIVE_JOB = 'Zile pe săptămână în care şofaţi către locul de muncă';
$DIST_JORNEY_WEEKEND = 'Sofaţi, în zilele în care nu mergeţi cu maşina la locul de muncă';
$AVERAGE_DIST_PER_WEEK = 'Şofaţi, în medie, pe săptămână';
$YOU_DRIVE_PER = 'Şofaţi, pe';
$MINUTES_HOME_JOB = 'Minute în care şofaţi de acasă la locul de muncă';
$DAYS_DRIVE_TO_JOB = 'Zile pe săptămână în care călătoriţi cu maşina către servici';
$TIME_DRIVE_WEEKEND = 'Minute şofate în zilele în care nu mergeţi cu maşina la servici';
$MINUTES_DRIVE_PER = 'Minute şofate, pe';
$DAYS_DRIVE_PER_MONTH = 'Zile petrecute la volan, pe lună';
$HOURS_DRIVE_PER = 'Zile în care şofaţi, pe';
$VIRTUAL_SPEED = 'viteză virtuală';
$KINETIC_SPEED = 'viteză kinetică';
$AVER_YEARLY = 'În medie, pe an';
$WORKING_TIME_MESSAGE = 'Pentru calcula s-a utilizat un timp mediu de ore de muncă de 36 de ore pe săptămână, şi 11 luni pe an';
$HOURS_TO_AFFORD_CAR = 'Ore pe an în care trebuie să munciţi pentru a vă permite maşina';
$MONTHS_TO_AFFORD_CAR = 'Luni pe an în care trebuie să munciţi pentru a vă permite maşina';
$TOTAL_COSTS_PER_YEAR = 'Costuri totale pe an cu autovehiculul';
$DAYS_CAR_PAID = 'Numărul de zile, după 1 Ianuarie, în care maşina este plătită';

//**************************************************
//GRAPHICS
$PARCEL = 'Pachet';
$COSTS = 'Cost';


//****************************************************
//ERROR MESSAGES
$ERROR_INVALID_INSU_VALUE = 'Suma de asigurare nu este validă';
$ERROR_INSU_PERIOD = 'Inseraţi periodicitatea asigurării';

$ERROR_FUEL_CURR_DIST = 'Specificaţi dacă doriţi un calcul bazat pe euro sau kilometri';
$ERROR_FUEL_CAR_EFF = 'Suma de eficienţă a combustibilului nu este validă';
$ERROR_FUEL_PRICE = 'Valoarea pentru preţul combustibilului nu este validă';
$ERROR_CAR_JOB = 'Vă rugăm specificaţi dacă călătoriţi cu maşina la servici';
$ERROR_FUEL_DIST = 'Suma numărului de kilometri parcurşi pe lună nu este validă';
$ERROR_DAYS_PER_WEEK = 'Valoarea numărului de zile pe săptămână nu este validă';
$ERROR_DIST_HOME_WORK = 'Valoarea numărului de kilometri între casă şi locul de muncă nu este validă';
$ERROR_DIST_NO_JOB = "Valoarea numărului de kilometri parcurşi în zilele în care nu folosiţi maşina pentru a merge la servici ne este validă";
$ERROR_CURRENCY = 'Valoarea în lei nu este validă';

$ERROR_DEPRECIATION_MONTH = 'Luna de achiziţie nu este introdusă corect';
$ERROR_DEPRECIATION_YEAR = 'Anul de achiziţie nu este introdus corect';
$ERROR_DEPRECIATION_VALUE = 'Suma corespunzătoare achiziţiei nu este introdusă corect';
$ERROR_DEPRECIATION_VALUE_TODAY = 'Suma corespunzătoare valorii curente nu este introdusă corect';
$ERROR_DEPRECIATION_DATE = 'Data de achiziţie nu este introdusă corect';
$ERROR_DEPRECIATION_NEW_CAR =  'Valoarea de depreciere nu se aplică, deoarece acest vehicul este nou';

$ERROR_CREDIT_QUESTION = 'Vă rugăm specificaţi dacă folosiţi metode de finanţare';
$ERROR_CREDIT_LOAN_VALUE = 'Suma de finanţare nu este introdusă corect';
$ERROR_CREDIT_PERIOD = 'Perioada de creditare, sau numărul de rate, nu sunt introduse corect';
$ERROR_CREDIT_INSTALMENT = 'Suma ratei nu este introdusă corect';
$ERROR_CREDIT_RESIDUAL_VALUE = 'Valoarea reziduală nu este introdusă corect';

$INVALID_AMOUNT = 'Valoarea invalid introdusă';

$INVALID_NBR_PP = 'Numărul de persoane nu este introdus corect';
$ERROR_INSPECTION_NTIMES = 'Nu aţi specificat de câte ori, sau numărul este invalid';
$ERROR_INSPECTION_COSTS = 'Costurile de inspecţie nu sunt introduse corect';

$ERROR_PASS_AMOUNT= 'Valoarea abonamentului lunar nu este introdusă corect';

$ERROR_INCOME = 'Venit net invalid';
$ERROR_WEEKS_PER_YEAR = 'Număr de săptămâni pe an invalid';
$ERROR_MONTHS_PER_YEAR = 'Număr de luni pe an invalid';
$ERROR_HOURS_PER_WEEK = 'Număr de ore pe săptămână invalid';
$ERROR_MIN_DRIVE_HOME_JOB = 'Număr invalid de minute şofate de acasă la locul de muncă';
$ERROR_MIN_DRIVE_WEEKEND = 'Număr invalid de minute şofate în zilele în care nu vă deplasaţi cu maşina la locul de muncă';
$ERROR_MIN_DRIVE = 'Număr invalid de minute şofate';
$ERROR_DAYS_PER_MONTH = 'Număr invalid de zile pe lună';

//FINAL RESULT
$YOUR_CAR_COSTS_YOU = 'Costurile maşinii dumneavoastră';
$WITH_THIS_LEVEL_OF_COSTS = 'Cu acest nivel de costuri, vehiculul dumneavoastră, pe perioada de'; //ex: __"With this level of costs, you car during the"__ 15 months of possession....
$MONTHS_POSS = 'luni de când îl deţineţi, vă costă deja';   //ex: With this level of costs, you car during the 15 ___"months of possession has already costed"___ 14000 Euros


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