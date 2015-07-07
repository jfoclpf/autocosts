<?php

// COUNTRY: MAGYARORSZÁG
// LANGAUAGE: MAGYAR

//***********************************************
//											   **
//      Translation for AUTOCOSTS.ORG          **
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
$CURR_CODE = 'HUF';
$CURR_NAME = 'Forint';
$CURR_NAME_PLURAL = 'Forint';
$CURR_NAME_BIG_PLURAL = 'HUF';
$CURR_SYMBOL = 'ft';
$STD_DIST = 'km'; //short text version you'd like to apply
$STD_DIST_FULL = 'kilométer';
$STD_FUEL_CALC = 'l/100km'; //text version you'd like to apply
$STD_VOLUME_SHORT = 'l'; //short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)

//simple words
$WORD_PER = 'per';     //ex: 4 km _per_ day
$WORDS_PER_EACH = 'egy minden';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = 'alkalommal'; //ex: 4 times per week
$DURING = 'alatt';   //spent in tolls 3€ per day _during_ 22 days per month
$WORD_PEOPLE = 'személy';   //plural, 3 _people_ 
$YES = 'igen';
$NO = 'nem';

$BUTTON_RUN = 'Futtatás'; //run calculator button 
$BUTTON_RERUN = 'Újrafuttatás'; //run calculator button 

//WEB PAGE
$WEB_PAGE_TITLE = 'Gépjármű költségkalkulátor';
$MAIN_TITLE = 'GÉPJÁRMŰ KÖLTSÉGKALKULÁTOR';
$INITIAL_TEXT = 
"Ez a kalkulátor bemutatja egy saját tulajdonú autó vonzatának <b>a valós költségét </b> <b>Magyarországon</b>. Általánosságban egy megbízható becslést ad arról, mennyit kell valójában megspórolni egy saját autóhoz.
Mivel az Ön járműfenntartási költségei az év folyamán más-más helyen jelentkeznek, gyakran igen nehéz reálisan felmérni, mi mindent kell megfizetni egy saját autóhoz.
<br>
<br>
Legyen pontos az adatok bevitelénél. Váratlan kiadások - mint például a balesettel kapcsolatos javítások és bírságok - esetében gondoljon arra, mennyit költött az elmúlt pár évben hasonlókra. Az alapbeállításnál ezek havi számításokként szerepelnek. Használja a pont jelet a tizedesek beírásához, például <span style=\"color:rgb(255,0,0);\">8.7</span> kilométer a lakás és a munkahely között.<br>";

$HELP_PROJECT = 'Támogassa projektünket' ;
$AC_MOBILE = 'AUTÓKÖLTSÉGEK<br>mobileszközökhöz';
$AC_DOMAIN = 'AUTOCOSTS.ORG';
$AC_SUB_HEADER = 'GÉPJÁRMŰ KÖLTSÉGKALKULÁTOR';

//time words
$DAYLY = 'napi';
$WEEKLY = 'heti';
$MONTHLY = 'havi';
$TRIMESTERLY = 'negyedévi';
$SEMESTERLY = 'félévi';
$YEARLY = 'évi';

$MIN = 'min';
$MINUTES = 'percek';
$HOUR = 'óra';
$HOURS = 'óra';
$HOUR_ABBR = 'ó';
$DAY = 'nap';
$DAYS = 'nap';
$WEEK = 'hét';
$WEEKS = 'hét';
$MONTH = 'hónap';
$MONTHS = 'hó';
$TWO_MONTHS = 'két hónap';
$DIST_EACH_TWO_MONTHS = 'kilométer, kéthavi idoszakra';
$TRIMESTER = 'negyedév';
$SEMESTER = 'félév';
$YEAR = 'év';

$DAYS_PER_WEEK_SHORT= 'nap/hét';

//distance
$DISTANCE = "Távolság";

//statistics
$AVERAGE_COSTS_PER_TYPE = 'Az átlagos havi költség típusú';
$COUNTRY_NAME = 'Magyarország';
$STATISTIC_TITLE = 'Automobile költségeit';
$DEPRECIATION_ST = 'Értékcsökkenés';
$INSURANCE_ST = 'Biztosítás';
$REP_ST = 'Javításhoz';
$WASHING_ST = 'Mosás';
$VIRTUAL_SPEED_TITLE = 'Virtuális sebesség';
$KINETIC_SPEED_TITLE = 'Mozgásból eredő sebesség';

//calculator words
$COSTS= "költségek";
$FIXED_COSTS = 'Készenléti költségek';
$FIXED_COSTS_HEADER_1= 'KÉSZENLÉTI KÖLTSÉGEK'; //capital letters
$FIXED_COSTS_HEADER_2= "Azok, amelyek nem függenek a megtett úttól, de az autó kifogástalan üzemeltetéséhez szükséges megfizetni"; 

$RUNNING_COSTS = 'Üzemeltetési  költségek';
$RUNNING_COSTS_HEADER_1 = 'ÜZEMELTETÉSI KÖLTSÉGEK'; //capital letters
$RUNNING_COSTS_HEADER_2 = 'Amelyek a megtett úttól függenek';

$PRIVATE_COSTS = 'Magánköltségek';
$MONTHLY_AMOUNT = 'Havi összeg';
$RUN_CP_DIST = 'Kilométerenkénti üzemeltetési költség'; //running costs per unit distance
$TOTAL_CP_DIST = 'Kilométerenkénti teljes költség'; //total costs per unit distance
$PUBL_TRA_EQUIV= "Megfelelő közlekedési kiadások, amennyiben nincs autója";
$WORD_TOTAL_CAP = 'ÖSSZESEN'; //capital word for total

$WORD_PRINT = 'Nyomtatás';
$WORD_DOWNLOAD_PDF = 'PDF-jelentés letöltése';

//depreciation
$DEPRECIATION = 'Gépjármű értékcsökkenése';
$AQ_DATE = 'Autóvásárlás napja';
$COM_VALUE = 'Az autó kereskedelmi értéke a vásárlás pillanatában, <br><i>ha újonnan vette; az ár, amit kifizetett utána, <br>ha használtan vette; az autó kereskedelmi értéke a tulajdonba kerülés pillanatában </i>';
$COM_VALUE_TODAY = 'Az autó jelenlegi kereskedelmi értéke,<br><i>ha most eladná, mennyit kapna érte?</i>';
$PERIOD_OWN = 'Birtoklás idotartama';
$FINAL_VALUE = 'Végső érték';
$AQ_VALUE = 'Beszerzési érték';

//insurance
$INSURANCE = 'Gépjármű- és autósegély biztosítás';
$INSURANCE_SHORT = 'Biztosítás és autósegély';

//credit
$CREDIT = 'Autóvásárlási hitel';
$CREDIT_PERIOD = 'Idoszak';
$CREDIT_INTERESTS = 'Autóhitel kamatai';
$CREDIT_INTERESTS_MONTH = 'Havi kamatok összege';
$CREDIT_TOTAL_INTERESTS = 'Kamatok teljes összege';
$CREDIT_QUESTION = 'Használt-e autóhitelt az autó vásárlásához?';
$CREDIT_LOAN = 'Hitel összege:<br><i>Mennyi hitelt vett fel?</i>';
$CREDIT_LOAN2 = 'Hitel összege';
$CREDIT_PERIOD = 'Hitel futamideje / részletfizetések száma';
$CREDIT_AVERAGE_VALUE = 'Egy-egy részlet átlagos értéke';
$CREDIT_RESIDUAL_VALUE = 'Fennmaradó érték:<br><i>Mekkora összeget kell még fizetnie vagy mennyit fizetett a futamido végére?</i>';
$CREDIT_INSTALMENT = 'Átlagos havi érték';

//inspection
$INSPECTION = 'Műszaki vizsga';
$INSPECTION_SHORT = 'Vizsga';
$INSPECTION_NBMR_TIMES = 'Hány alkalommal kellett vizsgáztatnia az autót?';
$INSPECTION_PRICE =  'Egy-egy vizsga átlagos költsége';
$EACH_ONE_DURING = 'egyenként, adott idore:'; //5 times costing 15€ *each one during* 20 months (inspection)
$TIMES_COSTING = 'alkalommal,';     //5 *times costing* 15€ each one during 20 months (inspection)

//road taxes
$ROAD_TAXES = 'Gépjárműadók (Járműadó)';
$ROAD_TAXES_SHORT = 'Járműadó';
$ROAD_TAXES_VALUE = 'Autójának járműadója:<br><i>az állam felé teljesített befizetés</i>';

//fuel
$FUEL = 'Üzemanyag';
$FUEL_DESC = 'Benzin, gázolaj, PB-gáz, villany';
$FUEL_CALC = 'A kiszámítás alapja';
$FUEL_JOB_CALC = 'Autóval jár munkába?';
$FUEL_JOB_CALC1 = '-nap(ok) száma, amikor autóval jár munkába';
$FUEL_DAYS = '-nap(ok) száma, amikor autóval jár munkába';
$FUEL_DIST_HOME_JOB = 'Távolság kilométerben, amit megtesz a lakása és a munkahelye között (egy nap).'; //$CURR_DIST=km, miles, etc.
$FUEL_DIST_HOME_JOB1 = 'kilométer a lakása és a munkahelye között'; //you do 7 km between home and job
$FUEL_DIST_NO_JOB = "Átlagosan megtett távolság kilométerben azokon a napokon, amikor nem autóval megy dolgozni:<br><i>például hétvégenként</i>";
$FUEL_DIST_NO_JOB1 = "átlagosan megtett kilométer azokon a napokon, amikor nem autóval megy dolgozni"; // you do 5 km per week....
$FUEL_DIST = 'Megtett kilométer';
$FUEL_CAR_EFF = 'Autójának üzemanyag-fogyasztási hatékonysága';
$FUEL_PRICE = 'Átlagosan fizetett üzemanyagár';
$FUEL_PRICE1 = 'Átlagos üzemanyagár';
$YOU_DRIVE_TOTTALY_AVG = 'Autóval átlagosan, összesen:'; //__You drive totally on average of__ 5 km per day
$YOU_DRIVE = 'Autóval'; //__You drive__ 5 km per day

//MAINTENANCE
$MAINTENANCE = 'Karbantartás';
$MAINTENANCE_DESC = 'Az átlagos karbantartási és az autómentési költségek:<br><i>olajcsere, szűrök, világítás, abroncsok, fékek, légkondicionálás, futóműbeállítás, stb.</i>';

//REPAIRS AND IMPROVEMENTS
$REP_IMPROV = 'Javítások és fejlesztések';
$REP_IMPROV_DESC = 'A javítások és fejlesztések átlagos költsége:<br><i>autóalkatrészek, módosítások, hangolások, horpadások,ütközések, meghibásodások javítása, stb.</i>';

//PARKING
$PARKING = 'Parkolás';
$PARKING_DESC = 'Autóparkolás átlagos költsége:<br><i>parkolóórák a városban, parkolóhely bérlése, föld alatti vagy föld feletti parkolók középületekben, bevásárló központokban, repülőtereken, busz- és vonatállomásokon és minden más létesítményben.</i>';

//TOLLS
$TOLLS = 'Díjak';
$TOLLS_DESC = 'Átlagosan kifizetett díjak összege<br><i>a városok megközelítéséhez kifizetett dijak hidakon, alagútakon, valamint az autópálya- és dugódijak</i>';
$TOLLS_DAY_CALC = 'Napi kalkuláció?';
$TOLLS_DAY_CALC1 = 'Díjakra kifizetett teljes napi összeg';
$TOLLS_DAY_CALC_DESC = 'Gondoljon továbbá a ritkább kiruccanásaira, amelyeket a város külso területeire vagy vidékre tesz meg, valamint bármilyen elektronikusan érkezo nyugtákra.';

//FINES
$FINES = 'Közlekedési bírságok';
$FINES_DESC = 'Közlekedési bírságokra költött átlagos összeg:<br><i>gondoljon itt arra, hogy mekkora összeget fizetett ki az utolsó pár évben bármilyen közlekedési bírságra(tilosban parkolás, sebességkorlátozás megszegése, mobil használata vezetés közben, stb.)</i>';

//WASHING
$WASHING = 'Autómosás és tisztítás';
$WASHING_DESC = 'Autómosásra vagy parkolójegyre kiadott összeg átlaga:<br><i>töltőállomásokon és más helyeken</i>';

//TOTAL
$TOTAL_FIXED = 'ÖSSZESEN - Állandó költségek összesen';
$TOTAL_FIXED_DESCR = "Olyan költségek, amelyek nem függenek a megtett úttól és meg kell azt fizetni a használaton kívül helyezett autókra is.";
$TOTAL_FIXED_DESCR2 = 'Értékcsökkenés, Biztosítás, Hitelkamatok, Adók, Vizsgáztatás, valamint a parkolás és a karbantartás 50%-a.';

$TOTAL_VARIABLE = 'ÖSSZESEN - Fenntartási költségek összesen';
$TOTAL_VARIABLE_DESCR = 'Olyan költségek, amelyek a megtett kilométertől függenek.';
$TOTAL_VARIABLE_DESCR2 = 'Üzemanyagok, Javítási és fejlesztési költségek, Parkolás (díjak, amelyek az autó használatával járnak), díjak és közlekedési bírságok, az autómosás és a karbantartás 50%-a.';


//EXTRA DATA
$EXTRA_DATA = 'EGYÉB ADATOK';
$EXTRA_DATA1 = 'Egyéb adatok';
$EXTRA_DATA_PUBLIC_TRANSP = 'Tömegközlekedés';
$EXTRA_DATA_FAMILY_NBR = 'Hány 4 évnél idosebb személy él a háztartásában (Önt is beleértve)';
$EXTRA_DATA_PRICE_PASS = "Mekkora az átlagos személyenkénti kiadása a mindennapi életben a tömegközlekedéshez szükséges havi bérletre<br><i>ha a tömegközlekedés nem megoldás az Ön számára, akkor a kockában írjon nullát 0</i>";
$EXTRA_DATA_INCOME = "Jövedelem";
$EXTRA_DATA_INCOME_QUESTION = 'Mennyi a nettó jövedelme?';
$EXTRA_DATA_WORKING_TIME = 'Munkaidő';
$EXTRA_DATA_WORKING_TIME_QUESTION = 'Van állása vagy annak megfelelő elfoglaltsága?';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = 'Vezetéssel töltött idő';
$EXTRA_DATA_TIME_QUESTION1 = 'Hány percig tart az út autóval otthonától a munkahelyéig? (csak az odautat számolva)';
$EXTRA_DATA_TIME_QUESTION2 = 'Hány percet tölt vezetéssel azokon a napokon, amikor nem autóval megy a munkahelyére?';
$EXTRA_DATA_TIME_QUESTION3 = 'Hány percet tölt vezetéssel?';

//PUBLIC TRANSPORTS
$PUB_TRANS_TEXT = 'Használt tömegközlekedési eszközök háztartása mindennapi életében';
$FAM_NBR = 'A háztartása 4 évnél idősebb tagjainak száma';
$PERSON_OR_PEOPLE = 'személy(ek)';
$PASS_MONTH_AVG = 'A személyenkénti havi bérlet összege';
$OTHER_PUB_TRANS = 'Más tömegközlekedési eszköz költsége';
$OTHER_PUB_TRANS_DESC = "Olyan összeg, amely más tömegközlekedési eszközre jut, például a nagytávolságokra, személyszállításra használt vonatok és buszok";
$TAXI_DESL = "Taxiközlekedés";
$ON_TAXI_PAYING = "taxival, tarifája:,"; //ex: 4 km __on taxi paying__ 5€ per km

//VIRTUAL SPEED
$FINANCIAL_EFFORT = 'Pénzügyi felmérés';
$NET_INCOME_PER = 'Nettó jövedelem ilyen megoszlásban:';
$AVERAGE_NET_INCOME_PER = 'Átlagos nettó jövedelem a következő megoszlásban';
$NUMBER_OF_MONTHS = 'Hány hónapban van jövedelme egy évben';
$NUMBER_OF_WEEKS = 'Hány héten van jövedelme egy évben';
$NUMBER_OF_HOURS= 'Jövedelem heti óraszáma';
$HOURS_PER = 'Órák megoszlása';
$MONTHS_PER = 'Hónapok megoszlása';
$AVERAGE_WORKING_HOURS_PER = 'Átlagos munkaórák megoszlása';
$WORKING_HOURS_PER = 'Munkaórák megoszlása';
$DIST_HOME_JOB = 'Autóval megy otthonából a munkahelyére';
$DAYS_DRIVE_JOB = 'Hetente ennyi napon megy autóval munkahelyére';
$DIST_JORNEY_WEEKEND = 'Azokon a napokon is vezet, amikor nem autóval megy a munkahelyére';
$AVERAGE_DIST_PER_WEEK = 'Hetente átlagosan ennyit vezet';
$YOU_DRIVE_PER = 'Autóvezetéssel töltött idő megoszlása';
$MINUTES_HOME_JOB = 'Autóvezetéssel töltött percek száma otthona és munkahelye között';
$DAYS_DRIVE_TO_JOB = 'Hetente ennyi napon megy autóval munkahelyére';
$TIME_DRIVE_WEEKEND = 'Vezetéssel töltött percek száma azokon a napokon, amikor nem autóval megy a munkahelyére';
$MINUTES_DRIVE_PER = 'Vezetéssel töltött percek száma a következő megoszlásban';
$DAYS_DRIVE_PER_MONTH = 'Havonta vezetéssel töltött napok száma';
$HOURS_DRIVE_PER = 'Vezetéssel töltött órák száma a következő megoszlásban';
$VIRTUAL_SPEED = 'virtuális sebesség';
$KINETIC_SPEED = 'mozgásból eredő sebesség';
$AVER_YEARLY = 'Évente átlagosan';
$WORKING_TIME_MESSAGE = 'A számításokhoz átlagosan heti 36 óra, évente pedig 11 hónap munkaidőt vettünk figyelembe';
$HOURS_TO_AFFORD_CAR = 'Évente ennyi órát kell dolgoznia az autója fenntartása érdekében';
$MONTHS_TO_AFFORD_CAR = 'Évente ennyi hónapot kell dolgoznia az autója fenntartása érdekében';
$TOTAL_COSTS_PER_YEAR = 'Az autóra fordított összköltség éves szinten';
$DAYS_CAR_PAID = 'Január 1-jét követően hány napig fizet autója után';

//**************************************************
//GRAPHICS
$PARCEL = 'Csomag';
$COSTS = 'Költségek';


//****************************************************
//ERROR MESSAGES
$ERROR_INVALID_INSU_VALUE = 'Érvénytelen biztosítási összeg';
$ERROR_INSU_PERIOD = 'Adja meg a biztosítási befizetések gyakoriságát';

$ERROR_FUEL_CURR_DIST = 'Jelölje, hogy forint- vagy kilométerszámításokat szeretne elvégezni.';
$ERROR_FUEL_CAR_EFF = 'Érvénytelen üzemanyag hatékonysági érték';
$ERROR_FUEL_PRICE = 'Érvénytelen üzemanyagár';
$ERROR_CAR_JOB = 'Kérem jelölje meg, autóval jár-e dolgozni.';
$ERROR_FUEL_DIST = 'Érvénytelen havonta megtett kilométerérték';
$ERROR_DAYS_PER_WEEK = 'Érvénytelen heti napok száma';
$ERROR_DIST_HOME_WORK = 'Érvénytelen a lakás és a munkahely közötti távolság kilométerben megadott értéke';
$ERROR_DIST_NO_JOB = "Érvénytelen kilométerek azokra a napokra, amikor nem autóval megy dolgozni";
$ERROR_CURRENCY = 'Érvénytelen havi forintérték';

$ERROR_DEPRECIATION_MONTH = 'A vásárlás hónapja érvénytelen';
$ERROR_DEPRECIATION_YEAR = 'A vásárlás éve érvénytelen';
$ERROR_DEPRECIATION_VALUE = 'A vásárlás értéke érvénytelen';
$ERROR_DEPRECIATION_VALUE_TODAY = 'Az autó jelenlegi értékének adata érvénytelen';
$ERROR_DEPRECIATION_DATE = 'A vásárlás dátuma érvénytelen';
$ERROR_DEPRECIATION_NEW_CAR =  'Az értékcsökkenés nem alkalmazható, mert ez egy új jármu';

$ERROR_CREDIT_QUESTION = 'Adja meg, ha autóhitelt vett igénybe';
$ERROR_CREDIT_LOAN_VALUE = 'Érvénytelen hitelösszeg';
$ERROR_CREDIT_PERIOD = 'Érvénytelen a hitel futamideje, illetve a részletfizetések száma';
$ERROR_CREDIT_INSTALMENT = 'Érvénytelen a részletfizetések összege';
$ERROR_CREDIT_RESIDUAL_VALUE = 'Érvénytelen a fennmaradó érték';

$ERROR_INSPECTION_NTIMES = 'Érvénytelen az alkalmak értéke';
$ERROR_INSPECTION_COSTS = 'Érvénytelen a vizsgáztatás költsége';

$INVALID_AMOUNT = 'Érvénytelen összeg';

$INVALID_NBR_PP = 'A személyek száma érvénytelen';
$ERROR_PASS_AMOUNT= 'A havi bérlet értéke érvénytelen';

$ERROR_INCOME = 'Érvénytelen nettó jövedelem';
$ERROR_WEEKS_PER_YEAR = 'Az egy évre megadott napok száma nem megfelelő';
$ERROR_MONTHS_PER_YEAR = 'Az egy évre megadott hónapok száma nem megfelelő';
$ERROR_HOURS_PER_WEEK = 'Az egy hétre megadott órák száma nem megfelelő';
$ERROR_MIN_DRIVE_HOME_JOB = 'Az otthona és a munkahelye között autóvezetéssel töltött percek száma nem megfelelő';
$ERROR_MIN_DRIVE_WEEKEND = 'A megadott percek száma nem megfelelő azokra a napokra vonatkozóan, amikor nem autóval megy a munkahelyére';
$ERROR_MIN_DRIVE = 'A megadott, vezetéssel töltött percek száma nem megfelelő';
$ERROR_DAYS_PER_MONTH = 'A havi bontásban megadott napok száma nem megfelelő';

//FINAL RESULT
$YOUR_CAR_COSTS_YOU = 'Autójának költségei';
$WITH_THIS_LEVEL_OF_COSTS = 'Autója fenntartása ezen a költségszinten a tulajdonába kerülése'; //ex: __"With this level of costs, you car during the"__ 15 months of possession....
$MONTHS_POSS = 'hónap óta a következo összköltséget jelentette:';   //ex: With this level of costs, you car during the 15 ___"months of possession has already costed"___ 14000 Euros

$TAXI_PRICE_PER_DIST=300; //price paid for taxi in chosen currency per chosen unit distance

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