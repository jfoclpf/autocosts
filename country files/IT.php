<?php

// COUNTRY: ITALIA
// LANGAUAGE: ITALIANO

//***********************************************
//											   **
//      Translation for AUTOCOSTS.INFO          **
//      the automobile costs calculator		   **
//	  										   **
//***********************************************

// IMPORTANT: Preserve always the same standards, BE CHOERENT between the text variables and the standard options

//Fuel efficiency for car engine standard
$fuel_efficiency_std_option = 2;
//1 - l/100km - litri per 100 chilometri
//2 - km/l - chilometri per litro

//Standard distance
$distance_std_option = 1;
//1 - chilometri

//Standard volume for the price of fuels, ex: Currency($,£,€,etc.)/(Litre, Imp gallon, US gallon) 
$fuel_price_volume_std = 1;
//1 - litri

//standards TEXT VERSION
//IMPORTANT: BE COHERENT with the above standards
$CURR_CODE = 'EUR';
$CURR_NAME = 'Euro';
$CURR_NAME_PLURAL = 'Euro';
$CURR_NAME_BIG_PLURAL = 'EURO';
$CURR_SYMBOL = '&euro;';
$STD_DIST = 'km'; //short text version you'd like to apply 
$STD_DIST_FULL = 'chilometri';
$STD_FUEL_CALC = 'km/l'; //text version you'd like to apply
$STD_VOLUME_SHORT = 'ltr'; //short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)

//simple words
$WORD_PER = 'per';     //ex: 4 km _per_ day
$WORDS_PER_EACH = 'per ogni';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = 'volte'; //ex: 4 times per week
$DURING = 'durante';   //spent in tolls 3€ per day _during_ 22 days per month
$WORD_PEOPLE = 'persone';   //plural, 3 _people_ 
$YES = 'sì';
$NO = 'no';

$BUTTON_RUN = 'Attivare'; //run calculator button 
$BUTTON_RERUN = 'Riattivare'; //run calculator button 

//WEB PAGE
$WEB_PAGE_TITLE = 'Calcolatrice dei costi di auto';
$MAIN_TITLE = 'CALCOLATRICE DEI COSTI DI AUTO';
$INITIAL_TEXT = 
"Spesso è difficile rendersi conto di quali siano i costi reali associati ad un’auto, dato che le bollette automobilistiche arrivano in diversi momenti dell’anno. Questa calcolatrice vi permetterà di valutare quanto costi realmente avere un’auto in <b>Italia</b>, dandovi una buona stima di quanto dovete spendere <b>veramente</b> per permettervi un’auto. Siate realistici con i dati inseriti. Per le spese inaspettate, come per esempio la riparazione dopo un incidente o le multe, pensate a quanto avete speso per queste negli ultimi anni. Per impostazione predefinita, queste spese si calcolano su base mensile. Usate il simbolo di punto per la notazione decimale, per esempio 8.7 chilometri per il tragitto da casa al lavoro.
<br>";

$HELP_PROJECT = 'Questo servizio è gratuito, senza pubblicità!' ;
$AC_MOBILE = 'COSTI AUTO<br>per dispositivi mobili';
$AC_DOMAIN = 'AUTOCOSTI.IT';
$AC_SUB_HEADER = 'CALCOLATRICE DEI COSTI DI AUTO';

//time words
$DAYLY = 'al giorno';
$WEEKLY = 'a settimana';
$MONTHLY = 'al mese';
$TRIMESTERLY = 'trimestrale';
$SEMESTERLY = 'semestrale';
$YEARLY = 'all’anno';

$MIN = 'min';
$MINUTES = 'minuti';
$HOUR = 'ora';
$HOURS = 'ore';
$HOUR_ABBR = 'ore';
$DAY = 'giorno';
$DAYS = 'giorni';
$WEEK = 'settimana';
$WEEKS = 'settimane';
$MONTH = 'mese';
$MONTHS = 'mesi';
$TWO_MONTHS = 'due mesi';
$DIST_EACH_TWO_MONTHS = 'chilometri per ogni due mesi';
$TRIMESTER = 'trimestre';
$SEMESTER = 'semestre';
$YEAR = 'anno';

$DAYS_PER_WEEK_SHORT= 'giorni/settimana';

//distance
$DISTANCE = "Distanza";

//statistics
$AVERAGE_COSTS_PER_TYPE = 'Il costo medio mensile per tipo';
$COUNTRY_NAME = 'l\'Italia';
$STATISTIC_TITLE = 'Costi automobili per';
$DEPRECIATION_ST = 'Ammortamento';
$INSURANCE_ST = 'Assicurazione';
$REP_ST = 'Riparazione';
$WASHING_ST = 'Lavaggio';
$VIRTUAL_SPEED_TITLE = 'Velocità virtuale';
$KINETIC_SPEED_TITLE = 'Velocità cinetica';

//calculator words
$COSTS= "Costi";
$FIXED_COSTS = 'Costi fissi';
$FIXED_COSTS_HEADER_1= 'COSTI FISSI'; //capital letters
$FIXED_COSTS_HEADER_2= "Quelli che non dipendono dalla distanza percorsa ed i quali devono essere pagati per avere l'auto sempre disponibile"; 
$DAYS_PER = "giorni a";

$RUNNING_COSTS = 'Costi di funzionamento';
$RUNNING_COSTS_HEADER_1 = 'COSTI DI FUNZIONAMENTO'; //capital letters
$RUNNING_COSTS_HEADER_2 = 'Quelli che dipendono dalla distanza percorsa';

$PRIVATE_COSTS = 'Costi privati';
$MONTHLY_AMOUNT = 'Importo mensile';
$RUN_CP_DIST = 'Costi di funzionamento per chilometro'; //running costs per unit distance
$TOTAL_CP_DIST = 'Costo totale per chilometro'; //total costs per unit distance
$PUBL_TRA_EQUIV= "Costi di trasporto equivalenti, se non aveste una macchina";
$WORD_TOTAL_CAP = 'TOTALE'; //capital word for total

$WORD_PRINT = 'Stampa';
$WORD_DOWNLOAD_PDF = 'Scarica il rapporto PDF';

//depreciation
$DEPRECIATION = 'Svalutazione dell’auto';
$AQ_DATE = 'Data di acquisto dell’auto';
$COM_VALUE = 'Valore commerciale dell’auto quando l’avete comprata<br><i>se è nuova, il prezzo che avete pagato per l’auto<br>se è usata, il valore commerciale dell’auto quando l’avete acquistata</i>';
$COM_VALUE_TODAY = 'Valore commerciale dell’auto oggi<br><i>se la vendeste oggi, a quanto la potreste vendere?</i>';
$PERIOD_OWN = 'Periodo di possesso';
$FINAL_VALUE = 'Valore finale';
$AQ_VALUE = 'Valore d’acquisto';

//insurance
$INSURANCE = 'Assicurazione auto e copertura guasti';
$INSURANCE_SHORT = 'Assicurazione e copertura guasti';

//credit
$CREDIT = 'Finanziamento auto';
$CREDIT_PERIOD = 'Periodo';
$CREDIT_INTERESTS = 'Tasso di interesse del prestito';
$CREDIT_INTERESTS_MONTH = 'Tasso mensile dell’interesse';
$CREDIT_TOTAL_INTERESTS = 'Importo totale degli interessi';
$CREDIT_QUESTION = 'Avete usato un finanziamento per acquistare l’auto?';
$CREDIT_LOAN = 'Importo finanziato:<br><i>Quanto avete prestato?</i>';
$CREDIT_LOAN2 = 'Importo finanziato';
$CREDIT_PERIOD = 'Durata del finanziamento / numero delle rate del finanziamento';
$CREDIT_AVERAGE_VALUE = 'Importo medio di ogni rata';
$CREDIT_RESIDUAL_VALUE = 'Importo residuo:<br><i>Alla fine del finanziamento, quale sarà l’importo residuo da pagare o l’avete già pagato?</i>';
$CREDIT_RESIDUAL_VALUE1 = 'Importo residuo';
$CREDIT_INSTALMENT = 'Importo mensile medio';

//inspection
$INSPECTION = 'Ispezione tecnica del veicolo (Revisione)';
$INSPECTION_SHORT = 'Ispezione';
$INSPECTION_NBMR_TIMES = 'Quante volte avete portato la vostra auto alla revisione?';
$INSPECTION_PRICE =  'Costo medio di ogni revisione';
$EACH_ONE_DURING = 'ognuna nel periodo di'; //5 times costing 15€ *each one during* 20 months (inspection)
$TIMES_COSTING = 'volte costo';     //5 *times costing* 15€ each one during 20 months (inspection)

//road taxes
$ROAD_TAXES = 'Tassa automobilistica (Bollo auto)';
$ROAD_TAXES_SHORT = 'Bollo auto';
$ROAD_TAXES_VALUE = 'Bollo auto per la vostra auto:<br><i>pagamento effettuato allo Stato</i>';

//fuel
$FUEL = 'Carburante';
$FUEL_DESC = 'Benzina, diesel, LPG, energia elettrica';
$FUEL_CALC = 'Calcolo basato su';
$FUEL_JOB_CALC = 'Prendete la macchina per andare al lavoro?';
$FUEL_JOB_CALC1 = 'giorno/i a settimana in cui prendete la macchina per andare al lavoro';
$FUEL_DAYS = 'Giorno/i a settimana in cui prendete la macchina per andare al lavoro ';
$FUEL_DIST_HOME_JOB = 'Chilometri di tragitto in macchina tra casa e lavoro (in una direzione solo)'; //$CURR_DIST= km, miles, etc.
$FUEL_DIST_HOME_JOB1 = 'chilometri tra casa e lavoro'; //you do 7 km between home and job
$FUEL_DIST_NO_JOB = "Chilometri percorsi nella media nei giorni in cui non prendete la macchina per andare al lavoro:<br><i>per esempio, per ogni fine settimana</i>";
$FUEL_DIST_NO_JOB1 = "chilometri nella media nei giorni in cui non prendete la macchina per andare al lavoro"; // you do 5 km per week....
$FUEL_DIST = 'Chilometri di tragitto in macchina';
$FUEL_CAR_EFF = 'Efficienza nel consume carburante della vostra macchina';
$FUEL_PRICE = 'Prezzo medio che pagate per il carburante';
$FUEL_PRICE1 = 'Prezzo medio carburante';
$YOU_DRIVE_TOTTALY_AVG = 'Percorrete in macchina una media di'; //__You drive totally on average of__ 5 km per day
$YOU_DRIVE = 'Percorrete in macchina'; //__You drive__ 5 km per day

//MAINTENANCE
$MAINTENANCE = 'Manutenzione';
$MAINTENANCE_DESC = 'Costo medio di manutenzione e Copertura guasti:<br><i>sostituzione olio motore, filtri, illuminazione, gomme, freni, aria condizionata, allineamento sterzo, ecc.</i>';

//REPAIRS AND IMPROVEMENTS
$REP_IMPROV = 'Riparazioni e miglioramenti';
$REP_IMPROV_DESC = 'Costo medio di riparazioni e miglioramenti:<br><i>pezzi di ricambio, modifiche, riparazione guasti, bozze,urti, aggiustamenti, ecc.</i>';

//PARKING
$PARKING = 'Parcheggio';
$PARKING_DESC = 'Costo medio del parcheggio auto:<br><i>parchimetri in città, noleggio del posto parcheggio, pargheggi sotterranei o in superficie, nei centri commerciali, aeroporti, stazioni ferroviarie o degli autobus, o in qualsiasi altra infrastruttura.</i>';

//TOLLS
$TOLLS = 'Pedaggi';
$TOLLS_DESC = 'Importo medio speso per pedaggi<br><i>ponti, gallerie, autostrade e costi di congestion per arrivare in centro città</i>';
$TOLLS_DAY_CALC = 'Calcolo su base giornaliera?';
$TOLLS_DAY_CALC1 = 'Importo giornaliero speso per pedaggi';
$TOLLS_DAY_CALC_DESC = 'Considerate anche i rari viaggi fuoricittà o in campagna, o ricevute di qualsiasi tipo di pagameto elettronico del pedaggio';

//FINES
$FINES = 'Multe';
$FINES_DESC = 'Importo medio delle multe:<br><i>considerate quanto avete pagato in multe stradali di vari tipi negli ultimi anni (parcheggio illegale, violazione limite velocità, uso di telefonino alla guida,ecc.)</i>';

//WASHING
$WASHING = 'Lavaggio e pulizia';
$WASHING_DESC = 'Spesa media per lavaggio e parcheggiatore:<br><i>nelle stazioni di servizio ed in altri posti</i>';

//TOTAL
$TOTAL_FIXED = 'TOTALE – Costi fissi';
$TOTAL_FIXED_DESCR = "Costi che non dipendono dalla distanza percorsa ed i quali devono essere pagati anche se la macchina rimane sempre ferma";
$TOTAL_FIXED_DESCR2 = 'Svalutazione, Assicurazione, Interessi del finanziamento, Bolli, Revisione e 50% del parcheggio e manutenzione';

$TOTAL_VARIABLE = 'TOTALE – Costi attivi';
$TOTAL_VARIABLE_DESCR = 'Costi che dipendono dal numero di chilometri percorsi in macchina';
$TOTAL_VARIABLE_DESCR2 = 'Carburante, Riparazioni e miglioramenti, Parcheggio (nel caso in cui lo pagate solo quando usate la macchina), pedaggi, multe, lavaggio, e 50% del manutenzione';


//EXTRA DATA
$EXTRA_DATA = 'DATI INTEGRATIVI';
$EXTRA_DATA1 = 'Dati integrativi';
$EXTRA_DATA_PUBLIC_TRANSP = 'Trasporti pubblici';
$EXTRA_DATA_FAMILY_NBR = 'Quante persone di età maggiore di 4 anni fanno parte della vostra famiglia (Lei incluso)';
$EXTRA_DATA_PRICE_PASS = "Qual è il prezzo medio dell’abbonamento mensile di trasporto pubblico per persona, nella vostra normale vita quotidiana<br><i>Se il trasporto pubblico non è un’alternativa par voi, inserire 0</i>";
$EXTRA_DATA_INCOME = "Reddito";
$EXTRA_DATA_INCOME_QUESTION = 'Qual è il vostro reddito netto?';
$EXTRA_DATA_WORKING_TIME = 'Ore lavorative';
$EXTRA_DATA_WORKING_TIME_QUESTION = 'Avete un lavoro o un impiego valido?';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = 'Tempo speso alla guida';
$EXTRA_DATA_TIME_QUESTION1 = 'Per quanti minuti guidate nel tragitto casa-lavoro? (solo andata)';
$EXTRA_DATA_TIME_QUESTION2 = 'Per quanti minuti guidate nei giorni in cui non usate la macchina per andare al lavoro?';
$EXTRA_DATA_TIME_QUESTION3 = 'Per quanti minuti guidate?';

//PUBLIC TRANSPORTS
$PUB_TRANS_TEXT = 'Trasporto pubblico nella vita quotidiana della vostra famiglia';
$FAM_NBR = 'Numbero di membri della vostra famiglia di età maggiore di 4 anni';
$PERSON_OR_PEOPLE = 'persona/e';
$PASS_MONTH_AVG = 'Costo medio dell’abbonamento mensile per persona';
$OTHER_PUB_TRANS = 'Altri mezzi pubblici';
$OTHER_PUB_TRANS_DESC = "Importo dei costi di trasporto con altri mezzi pubblici per esempio fuori della vostra zona residenziale, come lunghi viaggi in treno o in autobus";
$TAXI_DESL = "Trasporto con taxi";
$ON_TAXI_PAYING = "delle spese per il taxi"; //ex: 4 km __on taxi paying__ 5€ per km

//VIRTUAL SPEED
$FINANCIAL_EFFORT = 'Impegno finanziario';
$NET_INCOME_PER = 'Reddito netto per';
$AVERAGE_NET_INCOME_PER = 'Reddito netto medio per';
$NUMBER_OF_MONTHS = 'Numero di mesi per anno di reddito';
$NUMBER_OF_WEEKS = 'Numero di settimane per anno di reddito';
$NUMBER_OF_HOURS= 'Numero di ore per settimana di reddito';
$HOURS_PER = 'Ore per';
$MONTHS_PER = 'Mesi per';
$AVERAGE_WORKING_HOURS_PER = 'Ore lavorative medie per';
$WORKING_HOURS_PER = 'Ore lavorative per';
$DIST_HOME_JOB = 'Guidate da casa al lavoro';
$DAYS_DRIVE_JOB = 'Giorni per settimana in cui guidate per andare al lavoro';
$DIST_JORNEY_WEEKEND = 'Guidate nei giorni in cui non prendete la macchina per andare al lavoro';
$AVERAGE_DIST_PER_WEEK = 'Guidate in media per settimana';
$YOU_DRIVE_PER = 'Guidate per';
$MINUTES_HOME_JOB = 'Minuti in cui guidate da casa al lavoro';
$DAYS_DRIVE_TO_JOB = 'Giorni per settimana in cui guidate per andare al lavoro';
$TIME_DRIVE_WEEKEND = 'Minuti trascorsi alla guida nei giorni in cui non prendete la macchina per andare al lavoro';
$MINUTES_DRIVE_PER = 'Minuti in cui guidate per';
$DAYS_DRIVE_PER_MONTH = 'Giorni in cui guidate per';
$HOURS_DRIVE_PER = 'Ore in cui guidate per';
$VIRTUAL_SPEED = 'velocità virtuale';
$KINETIC_SPEED = 'velocità cinetica';
$AVER_YEARLY = 'Media annuale';
$WORKING_TIME_MESSAGE = 'Per eseguire i calcoli, è stata considerata una media di ore lavorative pari a 36 ore per settimana e 11 mesi per anno';
$HOURS_TO_AFFORD_CAR = 'Ore per anno in cui avete bisogno di lavorare per potervi permettere una macchina';
$MONTHS_TO_AFFORD_CAR = 'Mesi per anno in cui avete bisogno di lavorare per potervi permettere una macchina';
$TOTAL_COSTS_PER_YEAR = 'Costi totali per anno per automobile';
$DAYS_CAR_PAID = 'Per quanti giorni, dopo il primo gennaio, la macchina è pagata';

//**************************************************
//GRAPHICS
$PARCEL = 'Pacchetto';
$COSTS = 'Costi';


//****************************************************
//ERROR MESSAGES
$ERROR_INVALID_INSU_VALUE = 'Importo invalido di assicurazione';
$ERROR_INSU_PERIOD = 'Periodicità dei pagamenti di assicurazione';

$ERROR_FUEL_CURR_DIST = 'Dovete specificare se volete fare i calcoli basati su euro o chilometri';
$ERROR_FUEL_CAR_EFF = 'Importo invalido di efficenza nel consume carburante';
$ERROR_FUEL_PRICE = 'Invalid prezzo carburante';
$ERROR_CAR_JOB = 'Si prega indicare se prendete la macchina per andare al lavoro';
$ERROR_FUEL_DIST = 'Importo invalido di chilometri trascorsi al mese';
$ERROR_DAYS_PER_WEEK = 'Numero invalido di giorni a settimana';
$ERROR_DIST_HOME_WORK = 'Numero invalido di chilometri tra casa e lavoro';
$ERROR_DIST_NO_JOB = "Numero invalido di chilometri trascorsi nei giorni in cui non prendete la macchina per andare al lavoro";
$ERROR_CURRENCY = 'Importo invalid di euro al mese';

$ERROR_DEPRECIATION_MONTH = 'Importo acquisto al mese invalido';
$ERROR_DEPRECIATION_YEAR = 'Importo acquisto all’anno invalido';
$ERROR_DEPRECIATION_VALUE = 'Importo acquisto invalido';
$ERROR_DEPRECIATION_VALUE_TODAY = 'Valore veicolo oggi invalido';
$ERROR_DEPRECIATION_DATE = 'Data d’acquisto invalida';
$ERROR_DEPRECIATION_NEW_CAR =  'Svalutazione non applicabile perché il veicolo è nuovo';

$ERROR_CREDIT_QUESTION = 'Si prega specificare se avete usato finanziamento auto';
$ERROR_CREDIT_LOAN_VALUE = 'Importo finanziamento invalido';
$ERROR_CREDIT_PERIOD = 'Durata del finanziamento, numero delle rate invalidi';
$ERROR_CREDIT_INSTALMENT = 'Importo delle rate invalido';
$ERROR_CREDIT_RESIDUAL_VALUE = 'Importo rimanente invalido';

$ERROR_INSPECTION_NTIMES = 'Numero di volte invalido';
$ERROR_INSPECTION_COSTS = 'Costo revisione invalido';

$INVALID_AMOUNT = 'Importo invalido';

$INVALID_NBR_PP = 'Numero di persone invalido';
$ERROR_PASS_AMOUNT= 'Importo dell’abbonamento mensile invalido';

$ERROR_INCOME = 'Reddito netto invalido';
$ERROR_WEEKS_PER_YEAR = 'Numero di settimane per anno invalido';
$ERROR_MONTHS_PER_YEAR = 'Numero di mesi per anno invalido';
$ERROR_HOURS_PER_WEEK = 'Numero di ore per settimana invalido';
$ERROR_MIN_DRIVE_HOME_JOB = 'Numero di minuti in cui guidate da casa al lavoro invalido';
$ERROR_MIN_DRIVE_WEEKEND = 'Numero di minuti in cui guidate nei giorni in cui non prendete la macchina per andare al lavoro invalido';
$ERROR_MIN_DRIVE = 'Numero di minuti in cui guidate invalido';
$ERROR_DAYS_PER_MONTH = 'Numero di giorni per mese invalido';

//FINAL RESULT
$YOUR_CAR_COSTS_YOU = 'Vostri costi di auto';
$WITH_THIS_LEVEL_OF_COSTS = 'Con questo livello di costi, vostra macchina nel periodo di possesso di'; //ex: __"With this level of costs, you car during the"__ 15 months of possession....
$MONTHS_POSS = 'mesi ha già costato';   //ex: With this level of costs, you car during the 15 ___"months of possession has already costed"___ 14000 Euros


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
