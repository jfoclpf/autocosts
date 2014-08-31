<?php

// COUNTRY: POLSKA
// LANGAUAGE: POLSKY

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
//1 - l/100km – litrów na 100 kilometrów 
//2 - km/l – kilometrów na litr 

//Standard distance
$distance_std_option = 1;
//1 – kilometrów 

//Standard volume for the price of fuels, ex: Currency($,£,€,etc.)/(Litre, Imp gallon, US gallon) 
$fuel_price_volume_std = 1;
//1 – litry

//standards TEXT VERSION
//IMPORTANT: BE COHERENT with the above standards
$CURR_NAME = 'Zloty';
$CURR_NAME_PLURAL = 'złotych';
$CURR_NAME_BIG_PLURAL = 'PLN';
$CURR_SYMBOL = 'zł';
$STD_DIST = 'km'; //short text version you'd like to apply 
$STD_DIST_FULL = 'kilometrów';
$STD_FUEL_CALC = 'l/100km'; //text version you'd like to apply
$STD_VOLUME_SHORT = 'l'; //short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)

//simple words
$WORD_PER = 'na';     //ex: 4 km _per_ day
$WORDS_PER_EACH = 'na każdy/-e';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = 'razy'; //ex: 4 times per week
$DURING = 'w ciągu';   //spent in tolls 3€ per day _during_ 22 days per month
$WORD_PEOPLE = 'osoby';   //plural, 3 _people_ 
$YES = 'tak';
$NO = 'nie';

$BUTTON_RUN = 'Wykonaj'; //run simulator button 
$BUTTON_RERUN = 'Wykonaj ponownie'; //run simulator button 

//WEB PAGE
$WEB_PAGE_TITLE = 'Kalkulator kosztów utrzymania pojazdu';
$MAIN_TITLE = 'KALKULATOR KOSZTÓW SAMOCHODOWYCH';
$INITIAL_TEXT ="Ten kalkulator pozwoli Ci poznać <b>prawdziwy koszt,</b> jaki wiąże się z posiadaniem samochodu w <b>Polsce</b>. Da Ci wyobrażenie, ile tak naprawdę musisz wydać jako właściciel pojazdu.
Ponieważ rachunki związane z utrzymaniem samochodu napływają w ciągu całego roku w sposób nieregularny, nie zawsze jest łatwo obliczyć całkowitą wielkość poniesionych wydatków.
<br>
<br>
Wprowadzaj realistyczne wartości. W kwestii niespodziewanych wydatków, takich jak naprawy powypadkowe czy mandaty karne, zastanów się, ile na nie wydałeś/aś w ciągu ostatnich kilku lat. Kalkulator dokonuje domyślnie wyliczeń miesięcznych. Do zapisu liczb dziesiętnych używaj symbolu kropki, na przykład <span style=\"color:rgb(255,0,0);\">8.7</span> kilometrów między domem a miejscem pracy.<br>";

$HELP_PROJECT = 'Wesprzyj ten projekt' ;
$AC_MOBILE = 'AUTOKOSZTY<br>na urządzenia mobilne';
$AC_HEADER = '<big><u>WWW.AUTOCOSTS.ORG</u></big><br><b>KALKULATOR KOSZTÓW SAMOCHODOWYCH</b>';


//time words
$DAYLY = 'dziennie';
$WEEKLY = 'tygodniowo';
$MONTHLY = 'miesięcznie';
$TRIMESTERLY = 'kwartalnie';
$SEMESTERLY = 'półrocznie';
$YEARLY = 'rocznie';

$MIN = 'min';
$MINUTES = 'minutes';
$HOUR = 'hour';
$HOURS = 'hours';
$HOUR_ABBR = 'h';
$DAY = 'dzień';
$DAYS = 'dni';
$WEEK = 'tydzień';
$WEEKS = 'weeks';
$MONTH = 'miesiąc';
$MONTHS = 'miesiące(ęcy)';
$TWO_MONTHS = 'dwa miesiące';
$DIST_EACH_TWO_MONTHS = 'kilometrów w okresie każdych dwóch miesięcy';
$TRIMESTER = 'kwartał';
$SEMESTER = 'półrocze';
$YEAR = 'rok';

$DAYS_PER_WEEK_SHORT= ' dni / tydzień ';

//distance
$DISTANCE = "Distance";

//simulator words
$COSTS= "Koszty";
$FIXED_COSTS = 'Koszty stałe';
$FIXED_COSTS_HEADER_1= 'KOSZTY STAŁE'; //capital letters
$FIXED_COSTS_HEADER_2= "Koszty niezależne od pokonywanych odległości, które właściciel musi ponieść aby samochód nadawał się do jazdy"; 
$DAYS_PER = "dni na";

$RUNNING_COSTS = 'Koszty bieżące';
$RUNNING_COSTS_HEADER_1 = 'KOSZTY BIEŻĄCE'; //capital letters
$RUNNING_COSTS_HEADER_2 = 'Koszty zależne od pokonywanych odległości';

$PRIVATE_COSTS = 'Koszty prywatne';
$MONTHLY_AMOUNT = 'Miesięczna kwota';
$RUN_CP_DIST = 'Koszty bieżące na kilometr'; //running costs per unit distance
$TOTAL_CP_DIST = 'Całkowity koszt na kilometr'; //total costs per unit distance
$PUBL_TRA_EQUIV= "Równoważne koszty transportu, zakładając, że nie posiadasz samochodu";
$WORD_TOTAL_CAP = 'RAZEM'; //capital word for total

//depreciation
$DEPRECIATION = 'Utrata wartości pojazdu';
$AQ_DATE = 'Data nabycia pojazdu';
$COM_VALUE = 'Wartość handlowa samochodu w momencie jego zakupu<br><i>jeśli nowy, cena jaką zapłaciłeś/aś za samochód<br>jeśli używany, wartość handlowa samochodu w momencie jego nabycia</i>';
$COM_VALUE_TODAY = 'Aktualna wartość handlowa samochodu<br><i>jeśli chciałbyś/chciałabyś go teraz sprzedać, ile za niego dostaniesz?</i>';
$PERIOD_OWN = 'Okres posiadania';
$FINAL_VALUE = 'Ostateczna wartość';
$AQ_VALUE = 'Wartość nabycia';

//insurance
$INSURANCE = 'Ubezpieczenie pojazdu';
$INSURANCE_SHORT = 'Ubezpieczenie oraz na wypadek awarii';

//credit
$CREDIT = 'Kredyt samochodowy';
$CREDIT_PERIOD = 'Okres';
$CREDIT_INTERESTS = 'Odsetki kredytowe';
$CREDIT_INTERESTS_MONTH = 'Miesięczna kwota odsetek';
$CREDIT_TOTAL_INTERESTS = 'Całkowita kwota odsetek';
$CREDIT_QUESTION = 'Czy korzystałeś/aś z kredytu samochodowego w celu nabycia pojazdu?';
$CREDIT_LOAN = 'Kwota kredytu:<br><i>Ile pożyczyłeś/aś?</i>';
$CREDIT_LOAN2 = 'Kwota kredytu';
$CREDIT_PERIOD = 'Okres kredytu / liczba rat';
$CREDIT_AVERAGE_VALUE = 'Przeciętna kwota każdej raty';
$CREDIT_RESIDUAL_VALUE = 'Wartość końcowa:<br><i>Na koniec okresu kredytowania, ile musisz jeszcze zapłacić lub zapłaciłeś/aś?</i>';
$CREDIT_RESIDUAL_VALUE1 = 'Wartość końcowa';
$CREDIT_INSTALMENT = 'Średnia miesięczna wartość';

//inspection
$INSPECTION = 'Badanie techniczne pojazdu';
$INSPECTION_SHORT = 'Badanie techniczne';
$INSPECTION_NBMR_TIMES = 'Ile razy zleciłeś/aś badanie techniczne swojego pojazdu?';
$INSPECTION_PRICE =  'Średni koszt każdego z badań technicznych';
$EACH_ONE_DURING = 'każde w ciągu'; //5 times costing 15€ *each one during* 20 months (inspection)
$TIMES_COSTING = 'razy na kwotę';     //5 *times costing* 15€ each one during 20 months (inspection)

//road taxes
$ROAD_TAXES = 'Podatek drogowy';
$ROAD_TAXES_SHORT = 'Podatek drogowy';
$ROAD_TAXES_VALUE = 'Podatek drogowy od Twojego samochodu:<br><i>płatność na rzecz państwa</i>';

//fuel
$FUEL = 'Paliwo';	
$FUEL_DESC = 'Benzyna, olej napędowy, gaz LPG, prąd';
$FUEL_CALC = 'Wyliczenia w oparciu o';
$FUEL_JOB_CALC = 'Zakładając, że dojeżdżasz do pracy?';
$FUEL_JOB_CALC1 = 'Dzień/dni tygodniowo, gdy dojeżdżasz do pracy';
$FUEL_DAYS = 'Liczba dni w tygodniu, gdy dojeżdżasz do pracy';
$FUEL_DIST_HOME_JOB = 'Odległość między domem a miejscem pracy, jaką pokonujesz (w jedną stronę)'; //$CURR_DIST= km, miles, etc.
$FUEL_DIST_HOME_JOB1 = 'odległość między domem a miejscem pracy'; //you do 7 km between home and job
$FUEL_DIST_NO_JOB = "Dystans, jaki przeciętnie pokonujesz w dni, kiedy nie zabierasz samochodu do pracy:<br><i>na przykład w każdy weekend</i>";
$FUEL_DIST_NO_JOB1 = "przeciętny dystans w dni, kiedy nie zabierasz samochodu do pracy"; // you do 5 km per week....
$FUEL_DIST = 'Dystans, jaki pokonujesz';
$FUEL_CAR_EFF = 'Zużycie paliwa w Twoim samochodzie';
$FUEL_PRICE = 'Średnia cena, jaką płacisz za paliwo';
$FUEL_PRICE1 = 'Średnia cena paliwa';
$YOU_DRIVE_TOTTALY_AVG = 'Całkowicie, pokonujesz średnio'; //__You drive totally on average of__ 5 km per day
$YOU_DRIVE = 'Pokonujesz'; //__You drive__ 5 km per day

//MAINTENANCE
$MAINTENANCE = 'Przeglądy okresowe';
$MAINTENANCE_DESC = 'Przeciętny koszt przeglądów i ubezpieczenia na wypadek awarii:<br><i>wymiana oleju silnikowego, filtrów, świateł, opon, hamulców, serwis klimatyzacji, regulacja układu kierowniczego, itd.</i>';

//REPAIRS AND IMPROVEMENTS
$REP_IMPROV = 'Naprawy i udoskonalenia';
$REP_IMPROV_DESC = 'Średni koszt napraw i udoskonaleń:<br><i>części samochodowe, modyfikacje, usunięcie nieprawidłowości, wgniecenia, kolizje, tuning, itp.</i>';

//PARKING
$PARKING = 'Parkowanie';
$PARKING_DESC = 'Średni koszt parkowania samochodu:<br><i>miejskie parkometry, wynajęcie miejsca postojowego, podziemne lub naziemne parkingi w budynkach użyteczności publicznej, centrach handlowych, na lotniskach, dworcach autobusowych lub kolejowych oraz wszelkich innych tego typu miejscach.</i>';

//TOLLS
$TOLLS = 'Opłaty drogowe';
$TOLLS_DESC = 'Średnia kwota wydana na opłaty drogowe<br><i>mosty, tunele, autostrady oraz opłaty za wjazd do centrum miasta</i>';
$TOLLS_DAY_CALC = 'Kalkulacje dzienne?';
$TOLLS_DAY_CALC1 = 'Dzienna kwota jaką wydajesz na opłaty drogowe';
$TOLLS_DAY_CALC_DESC = 'Pomyśl nawet o sporadycznych wycieczkach na obrzeża miasta albo na wieś, a także o wszelkiego rodzaju miejscach elektronicznego poboru opłat, z których korzystałeś/aś';

//FINES
$FINES = 'Mandaty karne';
$FINES_DESC = 'Średnia kwota wydana na mandaty karne:<br><i>pomyśl ile w ostatnich latach wydałeś/aś na jakiekolwiek mandaty (nieprawidłowe parkowanie, przekroczenie dozwolonej prędkości, korzystanie z telefonu komórkowego w czasie jazdy, itp.)</i>';

//WASHING
$WASHING = 'Mycie i czyszczenie';
$WASHING_DESC = 'Przeciętny rachunek za mycie i czyszczenie wnętrza:<br><i>na stacjach usługowych oraz w innych miejscach</i>';

//TOTAL
$TOTAL_FIXED = 'RAZEM – Koszty stałe';
$TOTAL_FIXED_DESCR = "Koszty niezależne od pokonywanych odległości, które właściciel musi ponieść nawet jeśli samochód tylko stoi";
$TOTAL_FIXED_DESCR2 = 'Utrata wartości pojazdu, Ubezpieczenie, Odsetki kredytowe, Podatki, Badanie techniczne oraz 50% parkowania i przeglądów';

$TOTAL_VARIABLE = 'RAZEM – Koszty bieżące';
$TOTAL_VARIABLE_DESCR = 'Koszty zależne od liczby przebytych mil';
$TOTAL_VARIABLE_DESCR2 = 'Paliwo, Naprawy i udoskonalenia, Parkowanie (zakładając, że płacisz za nie tylko wtedy gdy korzystasz z samochodu), opłaty drogowe, mandaty karne, mycie oraz 50% kosztów przeglądów';


//EXTRA DATA
$EXTRA_DATA = 'DODATKOWE DANE';
$EXTRA_DATA1 = 'Dodatkowe dane';
$EXTRA_DATA_PUBLIC_TRANSP = 'Public transports';
$EXTRA_DATA_FAMILY_NBR = 'Ile osób w wieku powyżej 4 roku życia liczy Twoja rodzina (wliczając Ciebie)';
$EXTRA_DATA_PRICE_PASS = "Jaka jest średnia, dostosowana do potrzeb życia codziennego, cena miesięcznego biletu okresowego dla jednej osoby, <br><i>jeśli opcja transportu publicznego Cię nie dotyczy, wpisz 0</i>";
$EXTRA_DATA_INCOME = "Income";
$EXTRA_DATA_INCOME_QUESTION = 'What is your net income?';
$EXTRA_DATA_WORKING_TIME = 'Working time';
$EXTRA_DATA_WORKING_TIME_QUESTION = 'Do you have a job or a worthy occupation?';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = 'Time spent in driving';
$EXTRA_DATA_TIME_QUESTION1 = 'How many minutes you drive from home to workplace? (just one way)';
$EXTRA_DATA_TIME_QUESTION2 = 'How many minutes you drive in the days you don\'t take the car to workplace?';
$EXTRA_DATA_TIME_QUESTION3 = 'How many minutes you drive?';

//PUBLIC TRANSPORTS
$PUB_TRANS_TEXT = 'Transport publiczny na potrzeby codziennego życia rodziny';
$FAM_NBR = 'Liczba członków rodziny powyżej 4 roku życia';
$PERSON_OR_PEOPLE = 'osoba(y)';
$PASS_MONTH_AVG = 'Średnia cena miesięcznego biletu okresowego dla jednej osoby';
$OTHER_PUB_TRANS = 'Inny transport publiczny';
$OTHER_PUB_TRANS_DESC = "Pozostała kwota przeznaczona na inne środki transportu, takie jak pociągi dalekobieżne czy autobusy, wydana na przykład na podróż poza miejsce(m) zamieszkania";
$TAXI_DESL = "Przejazdy taksówką";
$ON_TAXI_PAYING = "taksówką, płacąc"; //ex: 4 km __on taxi paying__ 5€ per km

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
$HOURS_DRIVE_PER = ' Hours you drive per';
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
$PARCEL = 'Paczka';
$COSTS = 'Koszty';


//****************************************************
//ERROR MESSAGES
$ERROR_INVALID_INSU_VALUE = 'Nieprawidłowa kwota ubezpieczenia';
$ERROR_INSU_PERIOD = 'Wprowadź okresowość ubezpieczenia';

$ERROR_FUEL_CURR_DIST = 'Należy zaznaczyć czy chcesz dokonać wyliczeń w oparciu o euro czy kilometr';
$ERROR_FUEL_CAR_EFF = 'Nieprawidłowa wydajność paliwa';
$ERROR_FUEL_PRICE = 'Nieprawidłowa cena paliwa';
$ERROR_CAR_JOB = 'Należy wskazać czy zabierasz samochód do pracy';
$ERROR_FUEL_DIST = 'Nieprawidłowa liczba mil przebytych miesięcznie';
$ERROR_DAYS_PER_WEEK = 'Nieprawidłowa liczba dni tygodniowo';
$ERROR_DIST_HOME_WORK = 'Nieprawidłowa odległość między domem a miejscem pracy';
$ERROR_DIST_NO_JOB = "Nieprawidłowa liczba kilometr jakie pokonujesz w dni, kiedy nie jedziesz samochodem do pracy";
$ERROR_CURRENCY = 'Nieprawidłowa kwota miesięcznie';

$ERROR_DEPRECIATION_MONTH = 'Nieprawidłowy miesiąc nabycia';
$ERROR_DEPRECIATION_YEAR = 'Nieprawidłowy rok nabycia';
$ERROR_DEPRECIATION_VALUE = 'Nieprawidłowa kwota nabycia';
$ERROR_DEPRECIATION_VALUE_TODAY = 'Nieprawidłowa aktualna wartość pojazdu';
$ERROR_DEPRECIATION_DATE = 'Nieprawidłowa data nabycia';
$ERROR_DEPRECIATION_NEW_CAR =  'Utrata wartości nie dotyczy, gdyż pojazd jest nowy';

$ERROR_CREDIT_QUESTION = 'Należy zaznaczyć czy korzystałeś/aś z kredytu samochodowego';
$ERROR_CREDIT_LOAN_VALUE = 'Nieprawidłowa kwota kredytu';
$ERROR_CREDIT_PERIOD = 'Nieprawidłowy okres kredytu, liczba rat';
$ERROR_CREDIT_INSTALMENT = 'Nieprawidłowa kwota raty';
$ERROR_CREDIT_RESIDUAL_VALUE = 'Nieprawidłowa wartość końcowa';

$ERROR_INSPECTION_NTIMES = 'Nieprawidłowa ilość razy';
$ERROR_INSPECTION_COSTS = 'Nieprawidłowy koszt badania technicznego';

$INVALID_AMOUNT = 'Nieprawidłowa kwota';

$INVALID_NBR_PP = 'Nieprawidłowa liczba osób';
$ERROR_PASS_AMOUNT= 'Nieprawidłowa kwota biletu miesięcznego';

$ERROR_INCOME = 'Invalid net income';
$ERROR_WEEKS_PER_YEAR = 'Invalid number of weeks per year';
$ERROR_MONTHS_PER_YEAR = 'Invalid number of months per year';
$ERROR_HOURS_PER_WEEK = 'Invalid number of hours per week';
$ERROR_MIN_DRIVE_HOME_JOB = 'Invalid number of minutes you drive from home to workplace';
$ERROR_MIN_DRIVE_WEEKEND = 'Invalid number of minutes you drive in the days you don\'t take the car to workplace';
$ERROR_MIN_DRIVE = 'Invalid number of minutes you drive';
$ERROR_DAYS_PER_MONTH = 'Invalid number of days per month';

//FINAL RESULT
$YOUR_CAR_COSTS_YOU = 'Twoje koszty samochodowe to';
$WITH_THIS_LEVEL_OF_COSTS = 'Przy takim poziomie wydatków, Twój pojazd w okresie';//ex: __"With this level of costs, you car during the"__ 15 months of possession....
$MONTHS_POSS = 'miesięcy od chwili zakupu kosztuje Cię już';   //ex: With this level of costs, you car during the 15 ___"months of possession has already costed"___ 14000 Euros


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
