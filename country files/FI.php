<?php

// COUNTRY: SUOMESSA
// LANGAUAGE: SUOMI

//***********************************************
//											   **
//      Translation for AUTOCOSTS.ORG          **
//      the automobile costs simulator		   **
// 											   **
//      made by Joăo Pimentel Ferreira         **
//       under Creative Commons BY-SA          **
//	  										   **
//***********************************************

// IMPORTANT: Preserve always the same standards, BE CHOERENT between the text variables and the standard options

//Fuel efficiency for car engine standard
$fuel_efficiency_std_option = 1;
//1 - l/100km - litraa sadalla kilometrillä
//2 - km/l - kilometreinä litraa
//3 - mpg(imp) - Englanti mailia imperial gallonaa
//4 - mpg(US) - US mailia per gallonaa US

//Standard distance
$distance_std_option = 1;
//1 - kilometriä
//2 - mile

//Standard volume for the price of fuels, ex: Currency($,Ł,,etc.)/(Litre, Imp gallon, US gallon) 
$fuel_price_volume_std = 1;
//1 - litraa
//2 - Englanti gallonaa
//3 - US gallonaa

//standards TEXT VERSION
//IMPORTANT: BE COHERENT with the above standards
$CURR_NAME = 'Euro';
$CURR_NAME_PLURAL = 'Euroa';
$CURR_NAME_BIG_PLURAL = 'EUROA';
$CURR_SYMBOL = '&euro;';
$STD_DIST = 'km'; //short text version you'd like to apply
$STD_DIST_FULL = 'kilometriä';
$STD_FUEL_CALC = 'l/100km'; //text version you'd like to apply
$STD_VOLUME_SHORT = 'ltr'; //short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)

//simple words
$WORD_PER = 'per';     //ex: 4 km _per_ day
$WORDS_PER_EACH = 'kutakin';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = 'kertaa'; //ex: 4 times per week
$DURING = 'aikana';   //spent in tolls 3 per day _during_ 22 days per month
$WORD_PEOPLE = 'ihmisiä';   //plural, 3 _people_ 
$YES = 'kyllä';
$NO = 'ei';

$BUTTON_RUN = 'Käynnistä'; //run simulator button 
$BUTTON_RERUN = 'Käynnistä uudelleen'; //run simulator button 

//WEB PAGE
$WEB_PAGE_TITLE = 'Auton kustannuslaskuri';
$MAIN_TITLE = 'AUTON KUSTANNUSLASKURI';
$INITIAL_TEXT = 
"Tämän simulaattorin avulla selvität auton omistuksen  <b>todelliset kustannukset</b> <b>Suomessa</b>. Normaalisti se antaa sinulle hyvän arvion siitä, kuinka paljon todella joutuisit maksamaan auton omistamisesta. Todellisten kustannuksen arviointi on usein vaikeaa, sillä auton käyttöön liittyvät laskut tulevat eri aikoihin vuodesta.
<br>
<br>
Ole realistinen syöttämistäsi arvoista. Ajattele kuinka paljon yleensä olet kuluttanut odottamattomiin laskuihin, kuten vahinkojen korjauksiin tai sakkoihin viimeisten parin vuoden aikana. Nämä laskelmat perustuvat kuukausittaisiin kuluihin. Käytä piste-symbolia desimaalien syöttämiseen, esimerkiksi kodin ja työpaikan välisen <span style=\"color:rgb(255,0,0);\">8.7</span> kilometrin arvioimisessa.<br>";

$HELP_PROJECT = 'Auta tätä projektia' ;
$AC_MOBILE = 'AUTOKULUT<br> mobiililaitteille';
$AC_DOMAIN = 'AUTOCOSTS.ORG';
$AC_SUB_HEADER = 'AUTON KUSTANNUSLASKURI';

//time words
$DAYLY = 'päivittäin';
$WEEKLY = 'viikottain';
$MONTHLY = 'kuukausittain';
$TRIMESTERLY = 'neljännesvuosittain';
$SEMESTERLY = 'puolivuosittain';
$YEARLY = 'vuosittain';

$MIN = 'min';
$MINUTES = 'minutes';
$HOUR = 'hour';
$HOURS = 'hours';
$HOUR_ABBR = 'h';
$DAY = 'päivä';
$DAYS = 'päivää';
$WEEK = 'viikko';
$WEEKS = 'weeks';
$MONTH = 'kuukausi';
$MONTHS = 'kuukautta';
$TWO_MONTHS = 'kaksi kuukautta';
$DIST_EACH_TWO_MONTHS = 'kilometriä kullekin kahdelle kuukaudelle';
$TRIMESTER = 'neljännes';
$SEMESTER = 'lukukauden';
$YEAR = 'vuosi';

$DAYS_PER_WEEK_SHORT= 'päivää/viikko';

//distance
$DISTANCE = "Etäisyys";

//statistics
$AVERAGE_COSTS_PER_TYPE = 'Keskimääräinen kuukausittainen kustannus per tyyppi';
$COUNTRY_NAME = 'Suomessa';
$STATISTIC_TITLE = 'Automobile kustannukset';
$DEPRECIATION_ST = 'Arvonalennus';
$INSURANCE_ST = 'Vakuutus';
$REP_ST = 'Korjaus';
$WASHING_ST = 'Pesu';
$VIRTUAL_SPEED_TITLE = 'Virtuaalinopeus';
$KINETIC_SPEED_TITLE = 'Kineettinen nopeus';

//calculator words
$COSTS= "Kulut";
$FIXED_COSTS = 'Seisontakulut';
$FIXED_COSTS_HEADER_1= 'SEISONTAKULUT'; //capital letters
$FIXED_COSTS_HEADER_2= "Heille, joiden tilanne ei riipu kilometrimäärästä ja joiden täytyy maksaa pitääkseen auto valmiina käyttöä varten."; 

$RUNNING_COSTS = 'Käyttökulut';
$RUNNING_COSTS_HEADER_1 = 'KÄYTTÖKULUT'; //capital letters
$RUNNING_COSTS_HEADER_2 = 'Heille, joiden tilanne riippuu kilometrimäärästä';

$PRIVATE_COSTS = 'Yksityiset kulut';
$MONTHLY_AMOUNT = 'Kuukausittainen summa';
$RUN_CP_DIST = 'Käyttökulut per kilometri'; //running costs per unit distance
$TOTAL_CP_DIST = 'Kokonaiskulut per kilometri'; //total costs per unit distance
$PUBL_TRA_EQUIV= "Vastaava julkisen liikenteen kustannus, mikäli et omista autoa";
$WORD_TOTAL_CAP = 'SUMMA'; //capital word for total

$WORD_PRINT = 'Print';
$WORD_DOWNLOAD_PDF = 'Download PDF report';

//depreciation
$DEPRECIATION = 'Ajoneuvon arvon aleneminen';
$AQ_DATE = 'Auton ostopäivä';
$COM_VALUE = 'Auton kauppa-arvo ostohetkellä <br><i> jos uusi, autosta maksamasi summa<br> jos käytetty, auton kauppa-arvo ostohetkellä</i>';
$COM_VALUE_TODAY = 'Auton tämän hetkinen kauppa-arvo<br><i> jos myyt sen nyt, paljonko saisit siitä?</i>';
$PERIOD_OWN = 'Omistuksen pituus';
$FINAL_VALUE = 'Lopullinen arvo';
$AQ_VALUE = 'Ostoarvo';

//insurance
$INSURANCE = 'Kulkuneuvon vakuutus ja tapaturmavakuutus';
$INSURANCE_SHORT = 'Vakuutus ja tapaturmavakuutus';

//credit
$CREDIT = 'Auton rahoitus';
$CREDIT_PERIOD = 'Kausi';
$CREDIT_INTERESTS = 'Lainan korot';
$CREDIT_INTERESTS_MONTH = 'Korkojen kuukausittainen summa';
$CREDIT_TOTAL_INTERESTS = 'Korkojen kokonaissumma';
$CREDIT_QUESTION = 'Käytitkö lainarahoitusta ostaaksesi kulkuneuvosi?';
$CREDIT_LOAN = 'Lainattu summa:<br><i>Paljonko lainasit?</i>';
$CREDIT_LOAN2 = 'Rahoitettu summa';
$CREDIT_PERIOD = 'Luottokausi / maksuerien lukumäärä';
$CREDIT_AVERAGE_VALUE = 'Kunkin maksuerän keskimääräinen summa';
$CREDIT_RESIDUAL_VALUE = 'Jäljellä oleva summa:<br><i>Paljonko sinun tulee vielä maksaa tai paljonko olet jo maksanut tämän lainakauden lopussa?</i>';
$CREDIT_RESIDUAL_VALUE1 = 'Jäljellä oleva summa';
$CREDIT_INSTALMENT = 'Keskimääräinen, kuukausittainen arvo';

//inspection
$INSPECTION = 'Ajoneuvon katsastus (Katsastukset)';
$INSPECTION_SHORT = 'Katsastus';
$INSPECTION_NBMR_TIMES = 'Kuinka monta kertaa olet vienyt kulkuneuvosi katsastettavaksi?';
$INSPECTION_PRICE =  'Keskimääräinen katsastuksen hinta';
$EACH_ONE_DURING = 'kunkin kerran aikana'; //5 times costing 15 *each one during* 20 months (inspection)
$TIMES_COSTING = 'kertaa maksaen';     //5 *times costing* 15 each one during 20 months (inspection)

//road taxes
$ROAD_TAXES = 'Kulkuneuvon verotus (autovero)';
$ROAD_TAXES_SHORT = 'Autovero';
$ROAD_TAXES_VALUE = 'Auto autovero:<br><i> hallitukselle tekemäsi maksu</i>';

//fuel
$FUEL = 'Polttoaine';
$FUEL_DESC = 'Bensiini, diesel, nestekaasu; sähkö';
$FUEL_CALC = 'Laskelmat perustuvat';
$FUEL_JOB_CALC = 'Olettaen, että ajat töihin?';
$FUEL_JOB_CALC1 = 'Päivänä viikossa, kun ajat töihin';
$FUEL_DAYS = 'Päivänä viikossa, kun ajat töihin';
$FUEL_DIST_HOME_JOB = 'Kilometriä, jotka ajat kotisi ja työpaikkasi välillä (yhteen suuntaan)'; //$CURR_DIST=km, miles, etc.
$FUEL_DIST_HOME_JOB1 = 'kilometriä kodin ja työpaikan välillä'; //you do 7 km between home and job
$FUEL_DIST_NO_JOB = "Kilometriä, jotka ajat keskimäärin päivässä kun et ota autoa töihin:<br><i>esimerkiksi per viikonloppu</i>";
$FUEL_DIST_NO_JOB1 = "kilometriä, jotka ajat keskimäärin niinä päivinä, kun et ota autoa töihin"; // you do 5 km per week....
$FUEL_DIST = 'Ajamaasi kilometriä';
$FUEL_CAR_EFF = 'Kulkuneuvosi polttoainetehokkuus';
$FUEL_PRICE = 'Keskimääräinen polttoaineesta maksamasi hinta';
$FUEL_PRICE1 = 'Polttoaineen keskimääräinen hinta';
$YOU_DRIVE_TOTTALY_AVG = 'Ajat kuluttaen keskimäärin'; //__You drive totally on average of__ 5 km per day
$YOU_DRIVE = 'Ajat'; //__You drive__ 5 km per day

//MAINTENANCE
$MAINTENANCE = 'Huolto';
$MAINTENANCE_DESC = 'Huollon ja hajoamisten keskivertokustannukset:<br><i>moottoriöljyn vaihto, suodattimet, valot, renkaat, jarrut, ilmastointi, ohjaus, jne.</i>';

//REPAIRS AND IMPROVEMENTS
$REP_IMPROV = 'Korjaukset ja parannukset';
$REP_IMPROV_DESC = 'Korjausten ja parannusten keskimääräiset kustannukset:<br><i>auton osat, muokkaukset, vikojen korjaukset, kolhut, kolarit, tuunaaminen, jne.</i>';

//PARKING
$PARKING = 'Pysäköinti';
$PARKING_DESC = 'Auton pysäköinnin keskimääräinen hinta:<br><i> kaupungin parkkimittarit, parkkipaikan vuokraus, maanalaisten tai parkkihallien käyttö, ostoskeskukset, lentokentät, bussi- tai juna-asemat tai muut infrastruktuurit.</i>';

//TOLLS
$TOLLS = 'Tiemaksut';
$TOLLS_DESC = 'Keskimääräinen tiemaksujen summa <br><i>sillat, tunnelit, moottoritiet ja ruuhkamaksut päästäksesi keskustaan</i>';
$TOLLS_DAY_CALC = 'Laskelman perustaminen päivittäisiin kuluihin?';
$TOLLS_DAY_CALC1 = 'Päivittäinen tiemaksuihin menevä summa';
$TOLLS_DAY_CALC_DESC = 'Ajattele myös reissuja, jotka teet oman asuinkaupunkisi ulkopuolelle tai kuitteja mistä vain sähköisistä maksulaitteista';

//FINES
$FINES = 'Liikennesakot';
$FINES_DESC = 'Liikennesakkoihin menevä keskimääräinen summa:<br><i> Ajattele, kuinka paljon olet käyttänyt kaikenlaisiin liikennesakkoihin (laiton pysäköinti, matkapuhelimen käyttö tms) parin viime vuoden aikana</i>';

//WASHING
$WASHING = 'Pesu ja puhdistus';
$WASHING_DESC = 'Auton pesuun menevä keskimääräinen summa:<br><i> huoltoasemilla tai muissa paikoissa</i>';

//TOTAL
$TOTAL_FIXED = 'SUMMA - Seisontakulut';
$TOTAL_FIXED_DESCR = "Kulut, jotka eivät riipu matkustamastasi kilometrimäärästä ja jotka sinun on maksettava, vaikka auto olisi aina paikoillaan";
$TOTAL_FIXED_DESCR2 = 'Arvon aleneminen, vakuutus, lainan korot, verot, katsastus ja 50% parkki- ja huoltomaksuista';

$TOTAL_VARIABLE = 'SUMMA - Käyttökulut';
$TOTAL_VARIABLE_DESCR = 'Kulut, jotka riippuvat ajamastasi kilometrimäärästä';
$TOTAL_VARIABLE_DESCR2 = 'Polttoaineet, korjaukset ja parannukset, pysäköinti (olettaen, että maksat vain käyttäessäsi autoa), tiemaksut, liikennesakot, pesu ja 50% huoltokuluista';


//EXTRA DATA
$EXTRA_DATA = 'LISÄTIEDOT';
$EXTRA_DATA1 = 'Lisätiedot';
$EXTRA_DATA_PUBLIC_TRANSP = 'Julkiset kuljetukset';
$EXTRA_DATA_FAMILY_NBR = 'Kuinka monta yli 4-vuotiasta ihmistä perheessäsi on (itsesi mukaan lukien)';
$EXTRA_DATA_PRICE_PASS = "Paljonko keskimääräinen julkisen liikenteen kuukausilipun hinta on, normaalina arkipäivänä? <br><i>Jos julkinen liikenne ei ole vaihtoehto, syötä 0</i>";
$EXTRA_DATA_INCOME = "Tulot";
$EXTRA_DATA_INCOME_QUESTION = 'Paljonko nettotulosi ovat?';
$EXTRA_DATA_WORKING_TIME = 'Työaika';
$EXTRA_DATA_WORKING_TIME_QUESTION = 'Onko sinulla työpaikka tai ammatti?';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = 'Ajamiseen käytetty aika';
$EXTRA_DATA_TIME_QUESTION1 = 'Montako minuuttia työmatkasi kotoa töihin kestää? (yhteen suuntaan)';
$EXTRA_DATA_TIME_QUESTION2 = 'Montako minuuttia työmatkasi kestää, kun et käytä autoa työmatkalla?';
$EXTRA_DATA_TIME_QUESTION3 = 'Montako minuuttia ajo kestää?';

//PUBLIC TRANSPORTS
$PUB_TRANS_TEXT = 'Julkinen liikenne perheesi arkielämään';
$FAM_NBR = 'Perheesi yli 4-vuotiaiden henkien lukumäärä';
$PERSON_OR_PEOPLE = 'henkilö(ä)';
$PASS_MONTH_AVG = 'Kuukausilipun keskimääräinen kustannus per henkilö';
$OTHER_PUB_TRANS = 'Muu julkinen liikenn';
$OTHER_PUB_TRANS_DESC = "Summa, joka jäi jäljelle muuta julkista liikennettä varten esimerkiksi asuinalueesi ulkopuolelle, kuten kaukoliikennejunat tai -bussit";
$TAXI_DESL = "Taksikuljetus";
$ON_TAXI_PAYING = "taksin maksaessa"; //ex: 4 km __on taxi paying__ 5 per km

//VIRTUAL SPEED
$FINANCIAL_EFFORT = 'Talousellinen panostus';
$NET_INCOME_PER = 'Nettotulot per';
$AVERAGE_NET_INCOME_PER = 'Keskimääräiset nettotulosi per';
$NUMBER_OF_MONTHS = 'Ansaintakuukaudet vuodessa';
$NUMBER_OF_WEEKS = 'Ansaintaviikot vuodessa';
$NUMBER_OF_HOURS= 'Ansaintatunnit viikossa';
$HOURS_PER = 'Tuntia per';
$MONTHS_PER = 'Kuukautta per';
$AVERAGE_WORKING_HOURS_PER = 'Keskimääräiset työtunnit per';
$WORKING_HOURS_PER = 'Työtunnit per';
$DIST_HOME_JOB = 'Töistä kotiin ajo';
$DAYS_DRIVE_JOB = 'Päivät viikossa, jolloin ajat töistä kotiin';
$DIST_JORNEY_WEEKEND = 'Ajot päivinä, jolloin et aja töihin';
$AVERAGE_DIST_PER_WEEK = 'Keskimääräinen ajomääräsi viikossa';
$YOU_DRIVE_PER = 'Ajosi per';
$MINUTES_HOME_JOB = 'Työmatkasi pituus minuuteissa kotoa töihin';
$DAYS_DRIVE_TO_JOB = 'Työpäivien määrä viikossa, jolloin ajat töihin';
$TIME_DRIVE_WEEKEND = 'Työmatkasi pituus minuuteissa, kun et aja autolla töihin';
$MINUTES_DRIVE_PER = 'Ajominuutit per';
$DAYS_DRIVE_PER_MONTH = 'Ajopäivät kuukaudessa';
$HOURS_DRIVE_PER = 'Ajotunnit per';
$VIRTUAL_SPEED = 'virtuaalinopeus';
$KINETIC_SPEED = 'kineettinen nopeus';
$AVER_YEARLY = 'vuosittainen keskiarvo';
$WORKING_TIME_MESSAGE = 'Keskimääräinen laskennallinen työajan keskiarvo on 36 viikossa ja 11 kuukautta vuodessa';
$HOURS_TO_AFFORD_CAR = 'Tuntia per vuosi, joiden tulo kuluu auton ylläpitoon';
$MONTHS_TO_AFFORD_CAR = 'Kuukautta per vuosi, joiden tulo kuluu auton ylläpitoon';
$TOTAL_COSTS_PER_YEAR = 'Autosi vuosittainen kokonaiskustannus';
$DAYS_CAR_PAID = 'Montako päivää tammikuun 1. jälkeen maksat autoasi';

//**************************************************
//GRAPHICS
$PARCEL = 'Paketti';
$COSTS = 'Kulut';


//****************************************************
//ERROR MESSAGES
$ERROR_INVALID_INSU_VALUE = 'Virheellinen vakuutuksen summa';
$ERROR_INSU_PERIOD = 'Syötä vakuutuksesi kaudet';

$ERROR_FUEL_CURR_DIST = 'Sinun tulee ilmoittaa, jos haluat laskemasi punnissa tai maileissa';
$ERROR_FUEL_CAR_EFF = 'Virheellinen polttoainetehokkuuden summa';
$ERROR_FUEL_PRICE = 'Virheellinen polttoaineen hinta';
$ERROR_CAR_JOB = 'Ilmoita, otatko autosi töihin';
$ERROR_FUEL_DIST = 'Virheellinen kuukausittain matkustamiesi kilometrien määrä';
$ERROR_DAYS_PER_WEEK = 'Virheellinen päivien lukumäärä per viikko';
$ERROR_DIST_HOME_WORK = 'Virheellinen kilometrimäärä kotisi ja työpaikkasi välillä';
$ERROR_DIST_NO_JOB = "Virheellinen kilometrimäärä päiville, jolloin et ota autoa töihin";
$ERROR_CURRENCY = 'Virheellinen rahamäärä kuukaudessa';

$ERROR_DEPRECIATION_MONTH = 'Virheellinen ostokuukausi';
$ERROR_DEPRECIATION_YEAR = 'Virheellinen ostovuosi';
$ERROR_DEPRECIATION_VALUE = 'Virheellinen ostosumma';
$ERROR_DEPRECIATION_VALUE_TODAY = 'Virheellinen kulkuneuvon arvo';
$ERROR_DEPRECIATION_DATE = 'Virheellinen ostopäivä';
$ERROR_DEPRECIATION_NEW_CAR =  'Arvon aleneminen ei päde, koska kulkuneuvo on uusi';

$ERROR_CREDIT_QUESTION = 'Ilmoita, jos käytit lainarahoitusta';
$ERROR_CREDIT_LOAN_VALUE = 'Virheellinen rahoitussumma';
$ERROR_CREDIT_PERIOD = 'Virheellinen luottokausi tai maksuerien lukumäärä';
$ERROR_CREDIT_INSTALMENT = 'Virheellinen erien summa';
$ERROR_CREDIT_RESIDUAL_VALUE = 'Virheellinen jäljellä oleva arvo';

$ERROR_INSPECTION_NTIMES = 'Virheellinen lukumäärä';
$ERROR_INSPECTION_COSTS = 'Virheellinen katsastuksen hinta';

$INVALID_AMOUNT = 'Virheellinen summa';

$INVALID_NBR_PP = 'Virheellinen ihmisten lukumäärä';
$ERROR_PASS_AMOUNT= 'Virheellinen kuukausilipun summa';

$ERROR_INCOME = 'Virheellinen nettotulo';
$ERROR_WEEKS_PER_YEAR = 'Virheellinen viikkojen määrä vuodessa';
$ERROR_MONTHS_PER_YEAR = 'Virheellinen kuukausien määrä vuodessa';
$ERROR_HOURS_PER_WEEK = 'Virheellinen tuntien määrä viikossa';
$ERROR_MIN_DRIVE_HOME_JOB = 'Virheellinen minuuttimäärä työmatkan pituudessa';
$ERROR_MIN_DRIVE_WEEKEND = 'Virheellinen minuuttimäärä työmatkan pituudessa, kun et aja töihin';
$ERROR_MIN_DRIVE = 'Virheellinen ajominuuttimäärä';
$ERROR_DAYS_PER_MONTH = 'Virheellinen päivien määrä kuukautta kohti';

//FINAL RESULT
$YOUR_CAR_COSTS_YOU = 'Autosi kulut';
$WITH_THIS_LEVEL_OF_COSTS = 'Näillä kuluilla, sinun autosi käyttö'; //ex: __"With this level of costs, you car during the"__ 15 months of possession....
$MONTHS_POSS = 'kuukauden omistusaikasi aikana on maksanut jo';   //ex: With this level of costs, you car during the 15 ___"months of possession has already costed"___ 14000 Euros


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