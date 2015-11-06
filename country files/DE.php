<?php

// COUNTRY: DEUTSCHLAND
// LANGAUAGE: DEUTSCH

//***********************************************
//											   **
//      Translation for AUTOCOSTS.INFO          **
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
$CURR_CODE = 'EUR';
$CURR_NAME = 'Euro';
$CURR_NAME_PLURAL = 'Euro';
$CURR_NAME_BIG_PLURAL = 'EURO';
$CURR_SYMBOL = '&euro;';
$STD_DIST = 'km'; //short text version you'd like to apply
$STD_DIST_FULL = 'Kilometer';
$STD_FUEL_CALC = 'l/100km'; //text version you'd like to apply
$STD_VOLUME_SHORT = 'ltr'; //short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)

//simple words
$WORD_PER = 'pro';     //ex: 4 km _per_ day
$WORDS_PER_EACH = 'für jede';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = 'mal'; //ex: 4 times per week
$DURING = 'an';   //spent in tolls 3€ per day _during_ 22 days per month
$WORD_PEOPLE = 'Personen';   //plural, 3 _people_ 
$YES = 'Ja';
$NO = 'Nein';

$BUTTON_RUN = 'Berechnen'; //run calculator button 
$BUTTON_RERUN = 'Neu berechnen'; //run calculator button 

//WEB PAGE
$WEB_PAGE_TITLE = 'Autokostenrechner';
$MAIN_TITLE = 'AUTOKOSTENRECHNER';
$INITIAL_TEXT = 
"Mit diesem Kostenrechner haben Sie die Möglichkeit zu erfahren, wieviel Sie <b>tatsächlich</b> ausgeben müssen als Autobesitzer in <b>Deutschland</b>. Sie erhalten einen umfassenden Überblick über alle laufenden und versteckten Kosten, damit Sie besser beurteilen können, welche Ausgaben Sie haben oder auf Sie zukommen.
Da die Autorechnungen zu unterschiedlichen Zeiten im Jahr bezahlt werden müssen, ist es oftmals schwer abzuschätzen, wie viel Sie tatsächlich für Ihr Auto ausgeben müssen.
<br>
<br>
Seien Sie realistisch mit Ihren Angaben! Bei unerwarteten Rechnungen wie z.B. der Reparatur von Unfallschäden oder Strafzetteln, denken Sie bitte daran, wie viel Sie in den letzten Jahren dafür ausgegeben haben. Standardmäßig werden die monatlichen Kosten ermittelt. Bei Dezimalschreibweise geben Sie bitte einen Punkt anstatt eines Kommas ein z.B. <span style=\"color:rgb(255,0,0);\">8.7</span> Kilometer für die Entfernung zwischen Ihrem Zuhause und Ihrem Arbeitsplatz.<br>";

$HELP_PROJECT = 'Unterstützen Sie dieses Projekt!' ;
$AC_MOBILE = 'Autokostenrechner<br>für Mobilgeräte';
$AC_DOMAIN = 'AUTOKOSTEN.COM.DE';
$AC_SUB_HEADER = 'AUTOKOSTENRECHNER';

//time words
$DAYLY = 'Täglich';
$WEEKLY = 'Pro Woche';
$MONTHLY = 'Pro Monat';
$TRIMESTERLY = 'Vierteljahr';
$SEMESTERLY = 'Halbjahr';
$YEARLY = 'Jahr';

$MIN = 'Min.';
$MINUTES = 'Minuten';
$HOUR = 'Stunde';
$HOURS = 'Stunden';
$HOUR_ABBR = 'std.';
$DAY = 'Tag';
$DAYS = 'Tage';
$WEEK = 'Woche';
$WEEKS = 'Wochen';
$MONTH = 'Monat';
$MONTHS = 'Monate';
$TWO_MONTHS = 'Zwei Monate';
$DIST_EACH_TWO_MONTHS = 'Meilen in zwei Monaten';
$TRIMESTER = 'Vierteljahr';
$SEMESTER = 'Halbjahr';
$YEAR = 'Jahr';

$DAYS_PER_WEEK_SHORT= 'Tage/Woche';

//distance
$DISTANCE = "Entfernung";

//statistics
$AVERAGE_COSTS_PER_TYPE = 'Durchschnittliche monatliche Kosten pro Typ';
$COUNTRY_NAME = 'Deutschland';
$STATISTIC_TITLE = 'Autokosten für';
$DEPRECIATION_ST = 'Abschreibung';
$INSURANCE_ST = 'Versicherung';
$REP_ST = 'Reparaturen';
$WASHING_ST = 'Waschen';
$VIRTUAL_SPEED_TITLE = 'Verbrauchende Geschwindigkeit';
$KINETIC_SPEED_TITLE = 'Kinetische Geschwindigkeit';

//calculator words
$COSTS= "Kosten";
$FIXED_COSTS = 'Standkosten';
$FIXED_COSTS_HEADER_1= 'STANDKOSTEN'; //capital letters
$FIXED_COSTS_HEADER_2= "Diese Kosten sind unabhängig von den gefahrenen Kilometern. Sie sind notwendig um das Fahrzeug in einem betriebsbereiten Zustand zu halten"; 
$DAYS_PER = "tagen pro";

$RUNNING_COSTS = 'Laufende Kosten';
$RUNNING_COSTS_HEADER_1 = 'LAUFENDE KOSTEN'; //capital letters
$RUNNING_COSTS_HEADER_2 = 'Kosten, abhängig von gefahrenen Kilometern';

$PRIVATE_COSTS = 'Private Kosten';
$MONTHLY_AMOUNT = 'Monatlicher Betrag';
$RUN_CP_DIST = 'Laufende Kosten pro Kilometer'; //running costs per unit distance
$TOTAL_CP_DIST = 'Gesamtkosten pro Kilometer'; //total costs per unit distance
$PUBL_TRA_EQUIV= "So viel müssten Sie für öffentliche Verkehrsmittel bezahlen, wenn Sie kein Auto besitzen würden";
$WORD_TOTAL_CAP = 'GESAMT'; //capital word for total

$WORD_PRINT = 'Drucken';
$WORD_DOWNLOAD_PDF = 'PDF-Bericht herunterladen';

//depreciation
$DEPRECIATION = 'Preisverlust des Fahrzeugs';
$AQ_DATE = 'Kaufdatum des Fahrzeugs';
$COM_VALUE = 'Wert des Fahrzeugs am Tag des Erwerbs<br><i>Falls das Auto neu ist - Neuwagenpreis einfügen<br> Falls das Auto gebraucht ist, Gebrauchtwagenpreis einfügen</i>';
$COM_VALUE_TODAY = 'Aktueller Wert des Autos<br><i>Wenn Sie es heute verkaufen würden, wie viel Geld würden Sie dafür bekommen?</i>';
$PERIOD_OWN = 'Zeitraum in Ihrem Besitz';
$FINAL_VALUE = 'Endwert';
$AQ_VALUE = 'Anschaffungswert';

//insurance
$INSURANCE = 'KFZ-Versicherung und Schutzbrief';
$INSURANCE_SHORT = 'Versicherung und Schutzbrief';

//credit
$CREDIT = 'Fahrzeugfinanzierung';
$CREDIT_PERIOD = 'Laufzeit';
$CREDIT_INTERESTS = 'Darlehenszinsen';
$CREDIT_INTERESTS_MONTH = 'Monatliche Zinsen';
$CREDIT_TOTAL_INTERESTS = 'Gesamtsumme Zinsen';
$CREDIT_QUESTION = 'Finanzieren Sie Ihr Auto mit Hilfe eines Autokredites?';
$CREDIT_LOAN = 'Finanzierungssumme:<br><i>Wieviel haben Sie sich geliehen?</i>';
$CREDIT_LOAN2 = 'Finanzierungsbetrag';
$CREDIT_PERIOD = 'Kreditlaufzeit / Anzahl der Raten';
$CREDIT_AVERAGE_VALUE = 'Durchschnittsbetrag pro Rate';
$CREDIT_RESIDUAL_VALUE = 'Schlussrate:<br><i>Am Ende der Laufzeit - wie viel müssten Sie noch bezahlen oder haben Sie bezahlt?</i>';
$CREDIT_RESIDUAL_VALUE1 = 'Schlussrate';
$CREDIT_INSTALMENT = 'Durchschnittliche Monatsrate';

//inspection
$INSPECTION = 'Inspektionen bzw. TÜV-Kosten';
$INSPECTION_SHORT = 'Inspektion';
$INSPECTION_NBMR_TIMES = 'Wie viele Male habe Sie Ihr Fahrzeug zur Inspektion gebracht?';
$INSPECTION_PRICE =  'Durchschnittliche Inspektionskosten';
$EACH_ONE_DURING = 'im Zeitraum von'; //5 times costing 15€ *each one during* 20 months (inspection)
$TIMES_COSTING = 'mal Kosten jeweils';     //5 *times costing* 15€ each one during 20 months (inspection)

//road taxes
$ROAD_TAXES = 'KFZ-Steuer';
$ROAD_TAXES_SHORT = 'KFZ-Steuer';
$ROAD_TAXES_VALUE = 'KFZ-Steuer für Ihr Fahrzeug:<br><i>Steurn, Abgaben, Plaketten</i>';

//fuel
$FUEL = 'Kraftstoff';
$FUEL_DESC = 'Benzin, Diesel, LPG, Strom';
$FUEL_CALC = 'Berechnung basiert auf';
$FUEL_JOB_CALC = 'Arbeitsweg einkalkulieren?';
$FUEL_JOB_CALC1 = 'Tag(e) pro Woche, an denen Sie zur Arbeit fahren';
$FUEL_DAYS = 'Tag(e) pro Woche, an denen Sie zur Arbeit fahren';
$FUEL_DIST_HOME_JOB = 'Fahrtweg zur Arbeit (einfache Fahrt)'; //$CURR_DIST=km, miles, etc.
$FUEL_DIST_HOME_JOB1 = 'Fahrtweg zur Arbeit'; //you do 7 km between home and job
$FUEL_DIST_NO_JOB = "Anzahl gefahrener Kilometer an arbeitsfreien Tagen:<br><i>z.B. pro Wochenende</i>";
$FUEL_DIST_NO_JOB1 = "Anzahl gefahrener Kilometer an arbeitsfreien Tagen"; // you do 5 km per week....
$FUEL_DIST = 'Gefahrene Kilometer';
$FUEL_CAR_EFF = 'Kraftstoffverbrauch Ihres Fahrzeugs';
$FUEL_PRICE = 'Durchschnittlicher Preis, den Sie für Kraftstoff bezahlen';
$FUEL_PRICE1 = 'Durchschnittlicher Kraftstoffpreis';
$YOU_DRIVE_TOTTALY_AVG = 'Sie fahren insgesamt durchschnittlich'; //__You drive totally on average of__ 5 km per day
$YOU_DRIVE = 'Sie fahren'; //__You drive__ 5 km per day

//MAINTENANCE
$MAINTENANCE = 'Wartungskosten';
$MAINTENANCE_DESC = 'Durchschnittliche Wartungskosten:<br><i>Ölwechsel, Filter, Leuchtmittel, Reifen, Bremsen, Klimaanlage, Lenkung einstellen, etc.</i>';

//REPAIRS AND IMPROVEMENTS
$REP_IMPROV = 'Reparaturen und Verbesserungen';
$REP_IMPROV_DESC = 'Durchschnittliche Kosten für Reparaturen und Verbesserungen:<br><i>Autoteile, Modifikationen, Reparaturen fehlerhafter Teile, Dellen, Unfälle, Tuning, etc.</i>';

//PARKING
$PARKING = 'Parkgebühren';
$PARKING_DESC = 'Durschnittliche Kosten für Parkgebühren:<br><i>Parkuhren, Parkplatzmiete, Parkgebühren in öffentlichen Gebäuden, Einkaufszentren, Flughäfen, Bus- oder Zugbahnhofparkplätze oder jegliche andere Parkgebühren.</i>';

//TOLLS
$TOLLS = 'Mautgebühren';
$TOLLS_DESC = 'Durchschnittliche Kosten für Mautgebühren<br><i>Brücken, Tunnel, Autobahnen, City-Maut etc.</i>';
$TOLLS_DAY_CALC = 'Berechnung anhand von bestimmter Anzahl von Tagen durchführen?';
$TOLLS_DAY_CALC1 = 'Tägliche Mautgebühren';
$TOLLS_DAY_CALC_DESC = 'Denken Sie auch an Reisen ins Ausland bzw. jegliche elektronische Mautgebührenerhebung';

//FINES
$FINES = 'Strafzettel';
$FINES_DESC = 'Durchschnittliche Kosten für Strafzettel:<br><i>Wie viel Geld haben Sie in den letzten Jahren für Strafzettel ausgegeben? (Falschparken, Geschwindigkeitsüberschreitungen, Handy am Steuer, etc.)</i>';

//WASHING
$WASHING = 'Waschen und Pflege';
$WASHING_DESC = 'Durchschnittliche Kosten für Waschen und andere Servicedienstleistungen:<br><i>z.B. in Waschanlagen/ Tankstellen etc.</i>';

//TOTAL
$TOTAL_FIXED = 'GESAMT - Standkosten';
$TOTAL_FIXED_DESCR = "Kosten, die nicht auf gefahrenen Kilometer basieren und auch bezahlt werden müssen wenn das Fahrzeug steht";
$TOTAL_FIXED_DESCR2 = 'Wertminderung, Versicherung, Finanzierungen, Steuern, Inspektion und 50% der Park- und Reparaturgebühren';

$TOTAL_VARIABLE = 'GESAMT - Laufende Kosten';
$TOTAL_VARIABLE_DESCR = 'Kosten, basierend auf gefahrenen Kilometern';
$TOTAL_VARIABLE_DESCR2 = 'Treibstoffe, Reparaturen und Modifikationen, Parkplatzkosten (ausgehend von der Tatsache, dass diese Kosten nur enstehen, wenn Sie das Auto nutzen), Maut, Strafzettel, Waschen und 50% der Wartungsgebühren';


//EXTRA DATA
$EXTRA_DATA = 'Zusätzliche Angaben';
$EXTRA_DATA1 = 'Zusätzliche Angaben';
$EXTRA_DATA_PUBLIC_TRANSP = 'Öffentliche Verkehrsmittel';
$EXTRA_DATA_FAMILY_NBR = 'Wie viele Personen, die älter als 4 Jahre sind, leben in Ihrem Haushalt?  (Sie eingeschlossen)';
$EXTRA_DATA_PRICE_PASS = "Was kostet Sie eine Monatskarte für öffentliche Verkehrsmittel?<br><i>Falls öffentliche Verkehrsmittel für Sie keine Option sind, geben Sie bitte 0</i> ein";
$EXTRA_DATA_INCOME = "Einkommen";
$EXTRA_DATA_INCOME_QUESTION = 'Was ist Ihr Nettoeinkommen?';
$EXTRA_DATA_WORKING_TIME = 'Arbeitszeit';
$EXTRA_DATA_WORKING_TIME_QUESTION = 'Haben Sie eine Arbeitsstelle oder eine bezahlte Beschäftigung?';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = 'Fahrzeit';
$EXTRA_DATA_TIME_QUESTION1 = 'Wie viele Minuten dauert die Hinfahrt von Ihrer Wohnung zum Arbeitsplatz?';
$EXTRA_DATA_TIME_QUESTION2 = 'Wie viele Minuten dauert die Fahrt an Tagen, wenn Sie nicht mit dem Auto zum Arbeitsplatz fahren?';
$EXTRA_DATA_TIME_QUESTION3 = 'Wie viele Minuten dauert die Fahrt?';

//PUBLIC TRANSPORTS
$PUB_TRANS_TEXT = 'Öffentliche Verkehrsmittel für Sie bzw. Ihre Familie';
$FAM_NBR = 'Anzahl der Familienmitglieder, die älter als 4 Jahre sind';
$PERSON_OR_PEOPLE = 'Person(en)';
$PASS_MONTH_AVG = 'Durchschnittlicher Preis für eine Monatskarte pro Person';
$OTHER_PUB_TRANS = 'Andere öffentliche Verkehrsmittel';
$OTHER_PUB_TRANS_DESC = 'Kosten für öffentliche Verkehrsmittel außerhalb Ihres üblichen Wohngebiets z.B. für längere Zug- oder Busreisen';
$TAXI_DESL = 'Kosten für Taxen';
$ON_TAXI_PAYING = 'Taxifahrtkosten'; //ex: 4 km __on taxi paying__ 5€ per km

//VIRTUAL SPEED
$FINANCIAL_EFFORT = 'Finanzieller Aufwand';
$NET_INCOME_PER = 'Nettoeinkommen pro';
$AVERAGE_NET_INCOME_PER = 'Durchschnittliches Nettoeinkommen pro';
$NUMBER_OF_MONTHS = 'Anzahl an Monaten pro Einkommensjahr';
$NUMBER_OF_WEEKS = 'Anzahl an Wochen pro Einkommensjahr';
$NUMBER_OF_HOURS= 'Anzahl an Stunden pro Einkommensjahr';
$HOURS_PER = 'Stunden pro';
$MONTHS_PER = 'Monate pro';
$AVERAGE_WORKING_HOURS_PER = 'Durchschnittliche Arbeitsstunden pro';
$WORKING_HOURS_PER = 'Arbeitsstunden pro';
$DIST_HOME_JOB = 'Entfernung von Ihrer Wohnung zum Arbeitsplatz';
$DAYS_DRIVE_JOB = 'Tage pro Woche, in denen Sie zum Arbeitsplatz fahren';
$DIST_JORNEY_WEEKEND = 'Wenn Sie nicht mit dem Auto zum Arbeitsplatz fahren, fahren Sie';
$AVERAGE_DIST_PER_WEEK = 'Sie fahren pro Woche durchschnittlich';
$YOU_DRIVE_PER = 'Sie fahren pro';
$MINUTES_HOME_JOB = 'Entfernung in Fahrminuten von Ihrer Wohnung zum Arbeitsplatz';
$DAYS_DRIVE_TO_JOB = 'Tage pro Woche, in denen Sie zum Arbeitsplatz fahren';
$TIME_DRIVE_WEEKEND = 'Fahrminuten an den Tagen, wenn Sie nicht mit dem Auto zum Arbeitsplatz fahren';
$MINUTES_DRIVE_PER = 'Fahrminuten pro';
$DAYS_DRIVE_PER_MONTH = 'Fahrtage pro';
$HOURS_DRIVE_PER = 'Fahrstunden pro';
$VIRTUAL_SPEED = 'verbrauchende Geschwindigkeit';
$KINETIC_SPEED = 'kinetische Geschwindigkeit';
$AVER_YEARLY = 'jährlicher Durchschnitt';
$WORKING_TIME_MESSAGE = 'Für die Berechnungen wurde eine durchschnittliche Arbeitszeit von 36 Stunden pro Woche und 11 Monate pro Jahr vorausgesetzt';
$HOURS_TO_AFFORD_CAR = 'Anzahl an zu leistenden Arbeitsstunden pro Jahr, um die Kosten Ihres Autos zu decken';
$MONTHS_TO_AFFORD_CAR = 'Anzahl an Arbeitsmonaten pro Jahr, um die Kosten Ihres Autos zu decken';
$TOTAL_COSTS_PER_YEAR = 'jährliche Gesamtautokosten';
$DAYS_CAR_PAID = 'Für wie viele Tage beginnend mit dem 01. Januar sind die Autokosten gedeckt';

//**************************************************
//GRAPHICS
$PARCEL = 'Bereich';
$COSTS = 'Kosten';


//****************************************************
//ERROR MESSAGES
$ERROR_INVALID_INSU_VALUE = 'Versicherungssumme ungültig';
$ERROR_INSU_PERIOD = 'Häufigkeit der Versicherungsraten einfügen';

$ERROR_FUEL_CURR_DIST = 'Bitte geben Sie an, ob Ihre Berechnung auf Euro oder Kilometern basieren soll';
$ERROR_FUEL_CAR_EFF = 'Angabe zur Kraftstoffeffizienz ungültig';
$ERROR_FUEL_PRICE = 'Kraftstoffpreis ungültig';
$ERROR_CAR_JOB = 'Bitte geben Sie an, ob Sie mit Ihrem Auto zur Arbeit fahren';
$ERROR_FUEL_DIST = 'Anzahl an, pro Monat gefahrenen, Kilometern ungültig';
$ERROR_DAYS_PER_WEEK = 'Anzahl an Kilometern pro Woche ungültig';
$ERROR_DIST_HOME_WORK = 'Anzahl an Kilometern zwischen Wohnort und Arbeitsstelle ungültig';
$ERROR_DIST_NO_JOB = "Anzahl an gefahrenen Kilometern an arbeitsfreien Tagen ungültig";
$ERROR_CURRENCY = 'Eurobetrag pro Monat ungültig';

$ERROR_DEPRECIATION_MONTH = 'Monatsangabe ungültig';
$ERROR_DEPRECIATION_YEAR = 'Jahresangabe ungültig';
$ERROR_DEPRECIATION_VALUE = 'Kaufpreis ungültig';
$ERROR_DEPRECIATION_VALUE_TODAY = 'Heutiger Fahrzeugwert ungültig';
$ERROR_DEPRECIATION_DATE = 'Erwerbsdatum ungültig';
$ERROR_DEPRECIATION_NEW_CAR =  'Wertverlust wird nicht miteinberechnet, da Fahrzeug neu ist';

$ERROR_CREDIT_QUESTION = 'Bitte geben Sie an, ob Sie eine Fahrzeugfinanzierung in Anspruch genommen haben';
$ERROR_CREDIT_LOAN_VALUE = 'Finanzierungssumme ungültig';
$ERROR_CREDIT_PERIOD = 'Kreditlaufzeit, Anzahl der Raten ungültig';
$ERROR_CREDIT_INSTALMENT = 'Monatsrate ungültig';
$ERROR_CREDIT_RESIDUAL_VALUE = 'Schlussrate ungültig';

$ERROR_INSPECTION_NTIMES = 'Anzahl ungültig';
$ERROR_INSPECTION_COSTS = 'Inspektionskosten ungültig';

$INVALID_AMOUNT = 'Menge ungültig';

$INVALID_NBR_PP = 'Personenanzahl ungültig';
$ERROR_PASS_AMOUNT= 'Betrag der monatlichen Strafzettel ungültig';

$ERROR_INCOME = 'Nettoeinkommen ungültig';
$ERROR_WEEKS_PER_YEAR = 'Anzahl der Wochen pro Jahr ungültig';
$ERROR_MONTHS_PER_YEAR = 'Anzahl der Monate pro Jahr ungültig';
$ERROR_HOURS_PER_WEEK = 'Anzahl der Stunden pro Woche ungültig';
$ERROR_MIN_DRIVE_HOME_JOB = 'Anzahl der Fahrminuten von Ihrer Wohnung zum Arbeitsplatz ungültig';
$ERROR_MIN_DRIVE_WEEKEND = 'Anzahl der Fahrminuten an Wochenendtagen ungültig';
$ERROR_MIN_DRIVE = 'Anzahl der Fahrminuten ungültig';
$ERROR_DAYS_PER_MONTH = 'Anzahl der Tage pro Monat ungültig';

//FINAL RESULT
$YOUR_CAR_COSTS_YOU = 'Ihr Auto kostet Sie';
$WITH_THIS_LEVEL_OF_COSTS = 'Zum gegenwärtigen Stand, hat Ihr Auto, während der'; //ex: __"With this level of costs, you car during the"__ 15 months of possession....
$MONTHS_POSS = 'Monate in Ihrem Besitz, Kosten verursacht in Höhe von';   //ex: With this level of costs, you car during the 15 ___"months of possession has already costed"___ 14000 Euros


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