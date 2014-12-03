<?php

// COUNTRY: España
// LANGAUAGE: español

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
//1 - l/100km - litros por 100 kilómetros
//2 - km/l - kilómetros por litro

//Standard distance
$distance_std_option = 1;
//1 - kilómetros

//Standard volume for the price of fuels, ex: Currency($,£,€,etc.)/(Litre, Imp gallon, US gallon) 
$fuel_price_volume_std = 1;
//1 - litros

//standards TEXT VERSION
//IMPORTANT: BE COHERENT with the above standards
$CURR_NAME = 'Euro';
$CURR_NAME_PLURAL = 'Euros';
$CURR_NAME_BIG_PLURAL = 'EUROS';
$CURR_SYMBOL = '&euro;';
$STD_DIST = 'km'; //short text version you'd like to apply 
$STD_DIST_FULL = 'kilómetros';
$STD_FUEL_CALC = 'l/100km'; //text version you'd like to apply
$STD_VOLUME_SHORT = 'L'; //short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)

//simple words
$WORD_PER = 'por';     //ex: 4 km _per_ day
$WORDS_PER_EACH = 'por cada';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = 'veces'; //ex: 4 times per week
$DURING = 'durante';   //spent in tolls 3€ per day _during_ 22 days per month
$WORD_PEOPLE = 'personas';   //plural, 3 _people_ 
$YES = 'sí';
$NO = 'no';

$BUTTON_RUN = 'Ejecutar'; //run simulator button 
$BUTTON_RERUN = 'Volver'; //run simulator button 

//WEB PAGE
$WEB_PAGE_TITLE = 'Calculadora de gastos de coche';
$MAIN_TITLE = 'CALCULADORA DE GASTOS DE COCHE';
$INITIAL_TEXT = 
"Esta calculadora te permitirá conocer <b>el coste verdadero</b> de ser propietario de un coche <b>en España</b>. Generalmente te dará una buena estimación de lo que realmente necesitas gastar para permitirte tener un automóvil. Como los gastos del coche pueden variar durante el periodo de un año, a veces es muy difícil saber el gasto total del mantenimiento del coche.
<br>
<br>
Sé realista acerca del precio que pagas. Piensa en los gastos inesperados como reparación después del accidente o multas de los últimos años. Por defecto, estos cálculos se hacen por mes. Para representar el valor decimal, utiliza el punto, por ejemplo <span style=\"color:rgb(255,0,0);\">8.7</span> kilómetros entre la casa y el lugar del trabajo.<br>";

$HELP_PROJECT = 'Este servicio es gratuito, sin publicidad';
$AC_MOBILE = 'GASTO DEL COCHE<br>para móviles';
$AC_DOMAIN = 'AUTOGASTOS.ES';
$AC_SUB_HEADER = 'CALCULADORA DE GASTOS DE COCHE';

//time words
$DAYLY = 'diario';
$WEEKLY = 'semanal';
$MONTHLY = 'mensual';
$TRIMESTERLY = 'trimestral';
$SEMESTERLY = 'semestral';
$YEARLY = 'anual';

$MIN = 'min';
$MINUTES = 'minutes';
$HOUR = 'hour';
$HOURS = 'hours';
$HOUR_ABBR = 'h';
$DAY = 'día';
$DAYS = 'días';
$WEEK = 'semana';
$WEEKS = 'weeks';
$MONTH = 'mes';
$MONTHS = 'meses';
$TWO_MONTHS = 'dos meses';
$DIST_EACH_TWO_MONTHS = 'kilómetros por cada dos meses';
$TRIMESTER = 'trimestre';
$SEMESTER = 'semestre';
$YEAR = 'año';

$DAYS_PER_WEEK_SHORT= 'días/semana';

//distance
$DISTANCE = "Distancia";

//calculator words
$COSTS= "Gastos";
$FIXED_COSTS = 'Gastos fijos';
$FIXED_COSTS_HEADER_1= 'GASTOS FIJOS'; //capital letters
$FIXED_COSTS_HEADER_2= "Aquellos que no dependen de la distancia del trayecto y tienen que ser pagados para que el vehículo pueda ponerse en marcha"; 
$DAYS_PER = "días por";

$RUNNING_COSTS = 'Gastos de explotación';
$RUNNING_COSTS_HEADER_1 = 'GASTOS DE EXPLOTACION'; //capital letters
$RUNNING_COSTS_HEADER_2 = 'Aquellos que dependen de la distancia del trayecto';

$PRIVATE_COSTS = 'Gastos privados';
$MONTHLY_AMOUNT = 'Cuota mensual';
$RUN_CP_DIST = 'Gastos de explotación por kilómetro'; //running costs per unit distance
$TOTAL_CP_DIST = 'Coste total por kilómetro'; //total costs per unit distance
$PUBL_TRA_EQUIV= "Gastos de transporte que tuviera que pagar al no poseer su propio coche";
$WORD_TOTAL_CAP = 'TOTAL'; //capital word for total

$WORD_PRINT = 'Print';
$WORD_DOWNLOAD_PDF = 'Download PDF report';

//depreciation
$DEPRECIATION = 'Depreciación del vehículo';
$AQ_DATE = 'Fecha de adquisición del coche';
$COM_VALUE = 'El precio de mercado del coche en el momento de compra <br><i>si era nuevo, el precio pagado por él<br>si era usado, el precio del mercado en el momento de compra</i>';
$COM_VALUE_TODAY = 'El valor comercial de coche hoy<br><i>¿si lo vendes ahora cuánto  puedes conseguir?</i>';
$PERIOD_OWN = 'Periodo de posesión';
$FINAL_VALUE = 'Precio de hoy';
$AQ_VALUE = 'Precio de compra';

//insurance
$INSURANCE = 'Seguro de vehículo y cobertura de averías';
$INSURANCE_SHORT = 'Seguro y la cobertura de averías';

//credit
$CREDIT = 'Financiación del coche';
$CREDIT_PERIOD = 'Periodo';
$CREDIT_INTERESTS = 'Intereses préstamo';
$CREDIT_INTERESTS_MONTH = 'Cuota mensual de intereses';
$CREDIT_TOTAL_INTERESTS = 'Importe total de intereses';
$CREDIT_QUESTION = '¿Has financiado la compra del vehículo?';
$CREDIT_LOAN = 'Cuota financiada:<br><i>¿Qué cantidad de crédito pediste?</i>';
$CREDIT_LOAN2 = 'Cuota financiada';
$CREDIT_PERIOD = 'Periodo de crédito / número de plazos';
$CREDIT_AVERAGE_VALUE = 'Promedio de cuota por cada plazo';
$CREDIT_RESIDUAL_VALUE = 'Valor residual:<br><i>Al final del periodo de crédito, ¿cuánto tienes que pagar todavía o cuánto ya pagaste?</i>';
$CREDIT_RESIDUAL_VALUE1 = 'Valor residual';
$CREDIT_INSTALMENT = 'Valor promedio mensual';

//inspection
$INSPECTION = 'Inspección técnica del vehículo (ITV)';
$INSPECTION_SHORT = 'Inspección';
$INSPECTION_NBMR_TIMES = '¿Cuántas veces has llevado el coche a la inspección?';
$INSPECTION_PRICE =  'Valor promedio por cada inspección del vehículo';
$EACH_ONE_DURING = 'cada uno durante'; //5 times costing 15€ *each one during* 20 months (inspection)
$TIMES_COSTING = 'veces costando';     //5 *times costing* 15€ each one during 20 months (inspection)

//road taxes
$ROAD_TAXES = 'Impuestos del vehículo';
$ROAD_TAXES_SHORT = ' Impuestos del vehículo';
$ROAD_TAXES_VALUE = 'Impuestos de tu coche:<br><i>pago realizado al estado</i>';

//fuel
$FUEL = 'Combustible';
$FUEL_DESC = 'Gasolina, gasoil, GLP, electricidad';
$FUEL_CALC = 'Cálculos basados en';
$FUEL_JOB_CALC = 'Considerando que vas al trabajo en coche';
$FUEL_JOB_CALC1 = 'día(s) por semana que vas al trabajo en coche';
$FUEL_DAYS = 'Día(s) por semana que vas al trabajo en coche';
$FUEL_DIST_HOME_JOB = 'Kilómetros que recorres entre tu casa y lugar del trabajo (solo ida)'; //$CURR_DIST= km, miles, etc.
$FUEL_DIST_HOME_JOB1 = 'kilómetros entre tu casa y el lugar del trabajo'; //you do 7 km between home and job
$FUEL_DIST_NO_JOB = "promedio de kilómetros que recorres los días que utilizas el coche para no ir a trabajar:<br><i>por exemplo, a cada fin de semana</i>";
$FUEL_DIST_NO_JOB1 = "kilómetros promedios los días que no utilizas el coche para ir al trabajar"; // you do 5 km per week....
$FUEL_DIST = 'Kilómetros recorridos';
$FUEL_CAR_EFF = 'Eficacia del combustible de tu coche';
$FUEL_PRICE = 'Gasto promedio por el combustible';
$FUEL_PRICE1 = 'Precio medio del combustible';
$YOU_DRIVE_TOTTALY_AVG = 'Conduces una media de'; //__You drive totally on average of__ 5 km per day
$YOU_DRIVE = 'Conduces'; //__You drive__ 5 km per day

//MAINTENANCE
$MAINTENANCE = 'Mantenimiento';
$MAINTENANCE_DESC = 'Promedio de gastos de mantenimiento y de cobertura de averías:<br><i>sustitución de aceite de motor, filtros, luces, llantas, frenos, aire acondicionado, alineación de dirección, etc.</i>';

//REPAIRS AND IMPROVEMENTS
$REP_IMPROV = 'Reparaciones y mejoras';
$REP_IMPROV_DESC = 'Gasto promedio en reparaciones y mejoras:<br><i> piezas de coche, modificaciones, reparaciones de averías, abolladuras, colisiones, puesta a punto, etc.</i>';

//PARKING
$PARKING = 'Aparcamiento';
$PARKING_DESC = 'Promedio de gastos por el aparcamiento:<br><i>parquímetros en la ciudad, alquiler de espacio de estacionamiento, aparcamiento subterráneo o exterior de los edificios públicos, centros comerciales, aeropuertos, autobuses, estaciones de tren o cualquier otro tipo de infraestructura.</i>';

//TOLLS
$TOLLS = 'Peaje';
$TOLLS_DESC = 'Promedio de gastos de peaje<br><i>puentes, túneles, autopistas, tarifas de congestión para acceder a los centros de la ciudad.</i>';
$TOLLS_DAY_CALC = 'Cálculo en base de día';
$TOLLS_DAY_CALC1 = 'Promedio de gastos de peaje a diario';
$TOLLS_DAY_CALC_DESC = 'Piensa incluso en los viajes excepcionales que haces a las afueras de la ciudad o al campo, o en cualquier otro tipo de cobro de peaje electrónico';

//FINES
$FINES = 'Multas';
$FINES_DESC = 'Promedio de gastos en multas:<br><i>piensa cuánto gastaste en cualquier tipo de multa en los últimos años (estacionamiento ilegal, exceso de velocidad, uso del móvil, etc.)</i>';

//WASHING
$WASHING = 'Lavado y limpieza';
$WASHING_DESC = 'Promedio gastado en el lavado:<br><i>en las estaciones de servicio y otros lugares</i>';

//TOTAL
$TOTAL_FIXED = 'TOTAL –Gastos fijos ';
$TOTAL_FIXED_DESCR = "Gastos que no dependen de la distancia recorrida y que tienen que pagarse incluso si el coche está parado";
$TOTAL_FIXED_DESCR2 = 'Depreciación, Seguro, Intereses del préstamo, Impuestos, Inspección y 50% del coste del aparcamiento y mantenimiento';

$TOTAL_VARIABLE = 'TOTAL – Gastos de explotación';
$TOTAL_VARIABLE_DESCR = 'Gastos que dependen de la cantidad de kilómetros recorridos';
$TOTAL_VARIABLE_DESCR2 = 'Combustible, reparación y mejoramiento, aparcamiento (considerando que lo has pagado solo al utilizar el coche), peaje, multas, lavado y 50% de mantenimiento';


//EXTRA DATA
$EXTRA_DATA = 'INFORMACIÓN ADICIONAL';
$EXTRA_DATA1 = 'Información adicional';
$EXTRA_DATA_PUBLIC_TRANSP = 'Transporte público';
$EXTRA_DATA_FAMILY_NBR = '¿Cuántas personas mayores de 4 años hay en tu familia (incluyéndote a ti)?';
$EXTRA_DATA_PRICE_PASS = "Promedio de gastos mensuales por abono de transporte público por persona un día normal y corriente<br><i>si el transporte público no es una opción para ti, introduce 0</i>";
$EXTRA_DATA_INCOME = "Ingresos";
$EXTRA_DATA_INCOME_QUESTION = '¿Cuáles son tus ingresos netos?';
$EXTRA_DATA_WORKING_TIME = 'Tiempo de trabajo';
$EXTRA_DATA_WORKING_TIME_QUESTION = '¿Tienes un trabajo o una ocupación digna?';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = 'Tiempo empleado en la conducción';
$EXTRA_DATA_TIME_QUESTION1 = '¿Cuántos minutos conduces desde tu casa al lugar de trabajo? (solo ida)';
$EXTRA_DATA_TIME_QUESTION2 = '¿Cuántos minutos conduces los días que no llevas el coche al lugar del trabajo?';
$EXTRA_DATA_TIME_QUESTION3 = '¿Cuántos minutos conduces?';

//PUBLIC TRANSPORTS
$PUB_TRANS_TEXT = 'Transporte público en la vida diaria de su familia';
$FAM_NBR = 'Número de miembros de tu familia mayores de 4 años';
$PERSON_OR_PEOPLE = 'persona(s)';
$PASS_MONTH_AVG = 'Promedio de gastos en el abono mensual por persona';
$OTHER_PUB_TRANS = 'Otros transportes públicos';
$OTHER_PUB_TRANS_DESC = "Cuota que pagaste por otro tipo de transporte público fuera de tu zona, como para los viajes en trenes y buses de largo recorrido";
$TAXI_DESL = "Transporte en taxi";
$ON_TAXI_PAYING = "en taxi pagando"; //ex: 4 km __on taxi paying__ 5€ per km

//VIRTUAL SPEED
$FINANCIAL_EFFORT = 'Esfuerzo financiero';
$NET_INCOME_PER = 'Ingresos netos';
$AVERAGE_NET_INCOME_PER = 'Ingresos medios netos por';
$NUMBER_OF_MONTHS = 'Número de meses de ingresos por año';
$NUMBER_OF_WEEKS = 'Número de semanas de ingresos por año';
$NUMBER_OF_HOURS= 'Número de horas de ingresos por semana';
$HOURS_PER = 'Horas por';
$MONTHS_PER = 'Meses por';
$AVERAGE_WORKING_HOURS_PER = 'Promedio de horas de trabajo por';
$WORKING_HOURS_PER = 'Horas de trabajo por';
$DIST_HOME_JOB = 'Conduces de casa al trabajo';
$DAYS_DRIVE_JOB = 'Número de días semanales que vas en coche a trabajar';
$DIST_JORNEY_WEEKEND = 'La distancia que recorres los días que no vas en coche a trabajar';
$AVERAGE_DIST_PER_WEEK = 'Conduces semanalmente un promedio de';
$YOU_DRIVE_PER = 'Recorres por';
$MINUTES_HOME_JOB = 'Número de minutos que conduces para llegar de casa al trabajo';
$DAYS_DRIVE_TO_JOB = 'Número de días por semana que vas en coche al trabajo';
$TIME_DRIVE_WEEKEND = 'Número de minutos empleados en conducción los días que no vas en coche al trabajo';
$MINUTES_DRIVE_PER = 'Número de minutos que conduces por';
$DAYS_DRIVE_PER_MONTH = 'Número de días mensuales que conduces';
$HOURS_DRIVE_PER = 'Número de horas por';
$VIRTUAL_SPEED = 'velocidad virtual';
$KINETIC_SPEED = 'velocidad cinética';
$AVER_YEARLY = 'Promedio anual';
$WORKING_TIME_MESSAGE = 'Se consideró para el cálculo una duración media de 36 horas semanales y de 11 meses anuales';
$HOURS_TO_AFFORD_CAR = 'Número de horas al año que debes trabajar para pagar por el coche';
$MONTHS_TO_AFFORD_CAR = 'Número de meses al año que debes trabajar para pagar por el coche';
$TOTAL_COSTS_PER_YEAR = 'Gasto anual total por el automóvil';
$DAYS_CAR_PAID = '¿Por cuántos días, después del 1 de enero, el coche ya está pagado?';

//**************************************************
//GRAPHICS
$PARCEL = 'Parcela';
$COSTS = 'Coste';


//****************************************************
//ERROR MESSAGES
$ERROR_INVALID_INSU_VALUE = 'Cuota de seguro no válida';
$ERROR_INSU_PERIOD = 'Introduzca la periodicidad del seguro';

$ERROR_FUEL_CURR_DIST = 'Debes indicar si prefieres hacer el cálculo basado en euro o kilómetros';
$ERROR_FUEL_CAR_EFF = 'Valor de eficacia de combustible no válido';
$ERROR_FUEL_PRICE = 'Precio de combustible no válido';
$ERROR_CAR_JOB = 'Indica, por favor, si utilizas el coche para ir al trabajo';
$ERROR_FUEL_DIST = 'Cantidad de kilómetros recorridos mensualmente no válida';
$ERROR_DAYS_PER_WEEK = 'Número de días por semana no válido';
$ERROR_DIST_HOME_WORK = 'Cantidad de kilómetros entre la casa y el lugar del trabajo no válida';
$ERROR_DIST_NO_JOB = "Cantidad de kilómetros recorridos los días que no vas en coche al trabajo no válida";
$ERROR_CURRENCY = 'Valor de euros por mes no válido';

$ERROR_DEPRECIATION_MONTH = 'Mes de adquisición no válido';
$ERROR_DEPRECIATION_YEAR = 'Año de adquisición no valido';
$ERROR_DEPRECIATION_VALUE = 'Cuota de adquisición no válida';
$ERROR_DEPRECIATION_VALUE_TODAY = 'El precio actual no válido';
$ERROR_DEPRECIATION_DATE = 'Fecha de adquisición no válida';
$ERROR_DEPRECIATION_NEW_CAR =  'La depreciación no se puede aplicar porque este vehículo es nuevo';

$ERROR_CREDIT_QUESTION = 'Indica por favor si has financiado tu coche';
$ERROR_CREDIT_LOAN_VALUE = 'Cuota financiada no válida';
$ERROR_CREDIT_PERIOD = 'Periodo de crédito o número de plazos no válido';
$ERROR_CREDIT_INSTALMENT = 'Cuota de plazo no válida';
$ERROR_CREDIT_RESIDUAL_VALUE = 'Valor residual no válido';

$ERROR_INSPECTION_NTIMES = 'Número de veces no válido';
$ERROR_INSPECTION_COSTS = 'Coste de inspección no válido';

$INVALID_AMOUNT = 'Cuota no válida';

$INVALID_NBR_PP = 'Número de miembros no válido';
$ERROR_PASS_AMOUNT= 'Coste mensual de abono no válido';

$ERROR_INCOME = 'Ingresos netos no válidos';
$ERROR_WEEKS_PER_YEAR = 'Número de semanas anuales no válido';
$ERROR_MONTHS_PER_YEAR = 'Número de meses anuales no válido';
$ERROR_HOURS_PER_WEEK = 'Número de horas semanales no válido';
$ERROR_MIN_DRIVE_HOME_JOB = 'Número de minutos empleados en conducción de casa al trabajo no válido';
$ERROR_MIN_DRIVE_WEEKEND = 'Número de minutos empleados en conducción los días que no vas en coche al trabajo no válido';
$ERROR_MIN_DRIVE = 'Número de minutos empleados en conducción no válido';
$ERROR_DAYS_PER_MONTH = 'Número de días mensuales no válido';

//FINAL RESULT
$YOUR_CAR_COSTS_YOU = 'Tu coche cuesta';
$WITH_THIS_LEVEL_OF_COSTS = 'Con este nivel de gastos, tu vehículo durante'; //ex: __"With this level of costs, you car during the"__ 15 months of possession....
$MONTHS_POSS = 'meses de posesión han costado ya';   //ex: With this level of costs, you car during the 15 ___"months of possession has already costed"___ 14000 Euros


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