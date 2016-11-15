<?php

// COUNTRY: Nicaragua
// LANGAUAGE: español

$LANGUAGE_CODE = 'es-419';

//***********************************************
//											   **
//      Translation for AUTOCOSTS.INFO          **
//      the automobile costs calculator		   **
//	  										   **
//***********************************************

// IMPORTANT: Preserve always the same standards, BE CHOERENT between the text variables and the standard options

//Fuel efficiency for car engine standard
$fuel_efficiency_std_option = 2;
//1 - l/100km - litres per 100 kilometres
//2 - km/l - kilometres per litre
//3 - mpg(imp) - miles per imperial gallon
//4 - mpg(US) - miles per US gallon
//5 - l/mil - litres per 10 kilometers 
//6 - km/gal(US) - km per US gallon 



//Standard distance
$distance_std_option = 1;
//1 - kilometres
//2 - miles

//Standard volume for the price of fuels, ex: Currency($,£,€,etc.)/(Litre, Imp gallon, US gallon) 
$fuel_price_volume_std = 1;
//1 - litres
//2 - imperial gallons
//3 - US gallons

//Sources: 
//https://en.wikipedia.org/wiki/Gasoline_and_diesel_usage_and_pricing#Typical_gasoline_prices_around_the_world
//http://www.ine.gob.ni/DGH/monitoreos/2016/08/RES_agosto_02.pdf


//standards TEXT VERSION
//IMPORTANT: BE COHERENT with the above standards
$CURR_CODE = 'NIO';
$CURR_NAME = 'Córdoba';
$CURR_NAME_PLURAL = 'Córdobas';
$CURR_NAME_BIG_PLURAL = 'CÓRDOBAS';
$CURR_SYMBOL = 'C&#36;'; 
$STD_DIST = 'km'; //short text version you'd like to apply 
$STD_DIST_FULL = 'kilómetros';
$STD_FUEL_CALC = 'km/l'; //text version you'd like to apply
$STD_VOLUME_SHORT = 'l'; //short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)




//simple words
$WORD_PER = 'por';     //ex: 4 km _per_ day
$WORDS_PER_EACH = 'por cada';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = 'veces'; //ex: 4 times per week
$DURING = 'durante';   //spent in tolls 3€ per day _during_ 22 days per month
$WORD_PEOPLE = 'personas';   //plural, 3 _people_ 
$YES = 'sí';
$NO = 'no';

$BUTTON_RUN = 'Ejecutar'; //run calculator button 
$BUTTON_RERUN = 'Volver'; //run calculator button 

//WEB PAGE
$WEB_PAGE_TITLE = 'Calculadora de costos de automóvil';
$MAIN_TITLE = 'CALCULADORA DE COSTOS DE AUTOMÓVIL';
$INITIAL_TEXT = 
"Esta calculadora te permitirá conocer <b>el verdadero costo</b> de ser propietario de un vehículo <b>en Nicaragua</b>. Te dará una buena estimación general de lo que realmente necesitas gastar para permitirte tener un vehículo. Como los gastos del vehículo pueden variar durante el periodo de un año, a veces es muy difícil saber el gasto total del mantenimiento. Sé realista acerca del precio que pagas. Piensa en los gastos, como las reparaciones después de un accidente o las multas de los últimos años. De forma predeterminada, estos cálculos se hacen por mes. Para representar el valor decimal, utiliza el punto, por ejemplo 8.7 kilómetros entre la casa y el trabajo.<br>";

$HELP_PROJECT = 'Este servicio es gratuito, sin publicidad';
$AC_MOBILE = 'GASTO DEL AUTO<br>para móviles';
$AC_DOMAIN = 'AUTOCOSTOS.INFO';
$AC_SUB_HEADER = 'CALCULADORA DE COSTOS DE AUTOMÓVIL';

//time words
$DAYLY = 'diario';
$WEEKLY = 'semanal';
$MONTHLY = 'mensual';
$TRIMESTERLY = 'trimestral';
$SEMESTERLY = 'semestral';
$YEARLY = 'anual';

$MIN = 'min';
$MINUTES = 'minutos';
$HOUR = 'hora';
$HOURS = 'horas';
$HOUR_ABBR = 'h';
$DAY = 'día';
$DAYS = 'días';
$WEEK = 'semana';
$WEEKS = 'semanas';
$MONTH = 'mes';
$MONTHS = 'meses';
$TWO_MONTHS = 'bimestre';
$DIST_EACH_TWO_MONTHS = 'kilómetros por bimestre';
$TRIMESTER = 'trimestre';
$SEMESTER = 'semestre';
$YEAR = 'año';

$DAYS_PER_WEEK_SHORT= 'días/semana';

//distance
$DISTANCE = "Distancia";

//statistics
$AVERAGE_COSTS_PER_TYPE = 'Costo mensual promedio por tipo';
$COUNTRY_NAME = 'Nicaragua';
$STATISTIC_TITLE = 'Costos de Automóviles de';
$DEPRECIATION_ST = 'Depreciación';
$INSURANCE_ST = 'Seguro';
$REP_ST = 'Reparaciones';
$WASHING_ST = 'Lavado';
$VIRTUAL_SPEED_TITLE = 'Velocidad de consumidor';
$KINETIC_SPEED_TITLE = 'Velocidad cinética';

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
$TOTAL_CP_DIST = 'Costo total por kilómetro'; //total costs per unit distance
$PUBL_TRA_EQUIV= "Gastos de transporte que tendrías que pagar al no tener tu propio vehículo";
$WORD_TOTAL_CAP = 'TOTAL'; //capital word for total

$WORD_PRINT = 'Imprimir';
$WORD_DOWNLOAD_PDF = 'Descargar Informe en PDF';

//depreciation
$DEPRECIATION = 'Depreciación del vehículo';
$AQ_DATE = 'Fecha de adquisición del vehículo';
$COM_VALUE = 'Precio en el mercado del vehículo en el momento de compra <br><i>si era nuevo, el precio pagado por el vehículo<br>si era usado, el precio en el mercado en el momento de compra</i>';
$COM_VALUE_TODAY = 'El valor comercial del vehículo hoy<br><i>si lo vendes ahora, ¿cuánto puedes conseguir?</i>';
$PERIOD_OWN = 'Periodo de posesión';
$FINAL_VALUE = 'Precio de hoy';
$AQ_VALUE = 'Precio de compra';

//insurance
$INSURANCE = 'Seguro de responsabilidad civil por daños a terceros';
$INSURANCE_SHORT = 'Seguro';

//credit
$CREDIT = 'Financiación del vehículo';
$CREDIT_PERIOD = 'Periodo';
$CREDIT_INTERESTS = 'Intereses del préstamo';
$CREDIT_INTERESTS_MONTH = 'Cuota mensual de intereses';
$CREDIT_TOTAL_INTERESTS = 'Importe total de intereses';
$CREDIT_QUESTION = '¿Has financiado la compra del vehículo?';
$CREDIT_LOAN = 'Cuota financiada:<br><i>¿Qué cantidad de crédito pediste?</i>';
$CREDIT_LOAN2 = 'Cuota financiada';
$CREDIT_PERIOD = 'Periodo de crédito / cantidad de cuotas';
$CREDIT_AVERAGE_VALUE = 'Promedio de valor de cada cuota';
$CREDIT_RESIDUAL_VALUE = 'Valor residual:<br><i>Al final del periodo de crédito, ¿cuánto tienes que pagar todavía o cuánto ya pagaste?</i>';
$CREDIT_RESIDUAL_VALUE1 = 'Valor residual';
$CREDIT_INSTALMENT = 'Valor promedio mensual';

//inspection
$INSPECTION = 'Inspección técnico-mecánica y de emisión de gases';
$INSPECTION_SHORT = 'Inspección';
$INSPECTION_NBMR_TIMES = '¿Cuántas veces has llevado el vehículo a inspección?';
$INSPECTION_PRICE =  'Valor promedio por cada inspección del vehículo';
$EACH_ONE_DURING = 'cada una durante'; //5 times costing 15€ *each one during* 20 months (inspection)
$TIMES_COSTING = 'veces, costando';     //5 *times costing* 15€ each one during 20 months (inspection)

//road taxes
$ROAD_TAXES = 'Impuestos del vehículo';
$ROAD_TAXES_SHORT = ' Impuestos del vehículo';
$ROAD_TAXES_VALUE = 'Impuesto de rodamiento municipal :<br><i>pago realizado al estado</i>';

//fuel
$FUEL = 'Combustible';
$FUEL_DESC = 'Gasolina, diesel, electricidad.';
$FUEL_CALC = 'Cálculos basados en';
$FUEL_JOB_CALC = 'Considerando que vas al trabajo en tu vehículo';
$FUEL_JOB_CALC1 = 'día(s) por semana que vas al trabajo en tu vehículo';
$FUEL_DAYS = 'Día(s) por semana que vas al trabajo en tu vehículo';
$FUEL_DIST_HOME_JOB = 'Kilómetros que recorres entre tu casa y trabajo (solo ida)'; //$CURR_DIST= km, miles, etc.
$FUEL_DIST_HOME_JOB1 = 'kilómetros entre tu casa y el trabajo'; //you do 7 km between home and job
$FUEL_DIST_NO_JOB = "Promedio de kilómetros que recorres los días que utilizas el vehículo para actividades no laborales:<br><i>por ejemplo, cada fin de semana</i>";
$FUEL_DIST_NO_JOB1 = "kilómetros promedio de los días que no utilizas el vehículo para ir al trabajar"; // you do 5 km per week....
$FUEL_DIST = 'Kilómetros recorridos';
$FUEL_CAR_EFF = 'Eficacia del combustible de tu vehículo';
$FUEL_PRICE = 'Gasto promedio en combustible';
$FUEL_PRICE1 = 'Precio medio del combustible';
$YOU_DRIVE_TOTTALY_AVG = 'Conduces una media de'; //__You drive totally on average of__ 5 km per day
$YOU_DRIVE = 'Conduces'; //__You drive__ 5 km per day

//MAINTENANCE
$MAINTENANCE = 'Mantenimiento';
$MAINTENANCE_DESC = 'Promedio de gastos de mantenimiento y de cobertura de averías:<br><i>cambio de aceite de motor, filtros, luces, llantas, frenos, aire acondicionado, alineación de dirección, etc.</i>';

//REPAIRS AND IMPROVEMENTS
$REP_IMPROV = 'Reparaciones y mejoras';
$REP_IMPROV_DESC = 'Gasto promedio en reparaciones y mejoras:<br><i> piezas del vehículo, modificaciones, reparaciones de averías, abolladuras, colisiones, puesta a punto, etc.</i>';

//PARKING
$PARKING = 'Estacionamiento';
$PARKING_DESC = 'Promedio de gastos por el estacionamiento:<br><i>parquímetros en la ciudad, alquiler de espacio de estacionamiento, estacionamiento subterráneo o en el exterior de edificios públicos, centros comerciales, aeropuertos, estaciones de tren o autobús o cualquier otro tipo de infraestructura.</i>';

//TOLLS
$TOLLS = 'Peaje';
$TOLLS_DESC = 'Promedio de gastos de peaje<br><i>puentes, túneles, autopistas, tarifas de congestión para acceder al centro de la ciudad.</i>';
$TOLLS_DAY_CALC = 'Cálculo por día';
$TOLLS_DAY_CALC1 = 'Promedio de gastos de peaje diario';
$TOLLS_DAY_CALC_DESC = 'Piensa incluso en los viajes excepcionales que haces a las afueras de la ciudad o al campo, o en cualquier otro tipo de peaje electrónico';

//FINES
$FINES = 'Multas';
$FINES_DESC = 'Promedio de gastos en multas:<br><i>piensa cuánto gastaste en cualquier tipo de multa en los últimos años (por estacionamiento ilegal, por exceso de velocidad, por uso del celular, etc.)</i>';

//WASHING
$WASHING = 'Lavado y limpieza';
$WASHING_DESC = 'Promedio gastado en el lavado:<br><i>en estaciones de servicio y otros lugares</i>';

//TOTAL
$TOTAL_FIXED = 'TOTAL – Gastos fijos ';
$TOTAL_FIXED_DESCR = "Gastos que no dependen de la distancia recorrida y que tienen que pagarse incluso si el vehículo está parado";
$TOTAL_FIXED_DESCR2 = 'Depreciación, Seguro, Intereses del préstamo, Impuestos, Inspección y 50% del costo del estacionamiento y mantenimiento';

$TOTAL_VARIABLE = 'TOTAL – Gastos de explotación';
$TOTAL_VARIABLE_DESCR = 'Gastos que dependen de la cantidad de kilómetros recorridos';
$TOTAL_VARIABLE_DESCR2 = 'Combustible, reparación y mejoras, estacionamiento (considerando que lo has pagado solo al utilizar el vehículo), peaje, multas, lavado y 50% de mantenimiento';


//EXTRA DATA
$EXTRA_DATA = 'INFORMACIÓN ADICIONAL';
$EXTRA_DATA1 = 'Información adicional';
$EXTRA_DATA_PUBLIC_TRANSP = 'Transporte público';
$EXTRA_DATA_FAMILY_NBR = '¿Cuántas personas mayores de 4 años hay en tu familia (incluyéndote a ti)?';
$EXTRA_DATA_PRICE_PASS = "Promedio de gastos mensuales por abono de transporte público por persona, un día normal y corriente<br><i>si el transporte público no es una opción para ti, introduce 0</i>";
$EXTRA_DATA_INCOME = "Ingresos";
$EXTRA_DATA_INCOME_QUESTION = '¿Cuáles son tus ingresos netos?';
$EXTRA_DATA_WORKING_TIME = 'Tiempo de trabajo';
$EXTRA_DATA_WORKING_TIME_QUESTION = '¿Tienes un trabajo o una ocupación digna?';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = 'Tiempo empleado en la conducción';
$EXTRA_DATA_TIME_QUESTION1 = '¿Cuántos minutos conduces desde tu casa al trabajo? (solo ida)';
$EXTRA_DATA_TIME_QUESTION2 = '¿Cuántos minutos conduces los días que no vas a trabajar en tu vehículo?';
$EXTRA_DATA_TIME_QUESTION3 = '¿Cuántos minutos conduces?';

//PUBLIC TRANSPORTS
$PUB_TRANS_TEXT = 'Transporte público en la vida diaria de tu familia';
$FAM_NBR = 'Cantidad de miembros de tu familia mayores de 4 años';
$PERSON_OR_PEOPLE = 'persona(s)';
$PASS_MONTH_AVG = 'Promedio de gastos en el abono mensual por persona';
$OTHER_PUB_TRANS = 'Otros transportes públicos';
$OTHER_PUB_TRANS_DESC = "Cuota que pagaste por otro tipo de transporte público fuera de tu zona, como viajes en tren y autobuses de larga distancia";
$TAXI_DESL = "Transporte en taxi";
$ON_TAXI_PAYING = "en taxi pagando"; //ex: 4 km __on taxi paying__ 5€ per km

//VIRTUAL SPEED
$FINANCIAL_EFFORT = 'Esfuerzo financiero';
$NET_INCOME_PER = 'Ingresos netos';
$AVERAGE_NET_INCOME_PER = 'Ingresos medios netos por';
$NUMBER_OF_MONTHS = 'Cantidad de meses de ingresos por año';
$NUMBER_OF_WEEKS = 'Cantidad de semanas de ingresos por año';
$NUMBER_OF_HOURS= 'Cantidad de horas de ingresos por semana';
$HOURS_PER = 'Horas por';
$MONTHS_PER = 'Meses por';
$AVERAGE_WORKING_HOURS_PER = 'Promedio de horas de trabajo por';
$WORKING_HOURS_PER = 'Horas de trabajo por';
$DIST_HOME_JOB = 'Conduces de casa al trabajo';
$DAYS_DRIVE_JOB = 'Cantidad de días semanales que vas en tu vehículo a trabajar';
$DIST_JORNEY_WEEKEND = 'Distancia que recorres los días que no vas en tu vehículo a trabajar';
$AVERAGE_DIST_PER_WEEK = 'Manejas semanalmente un promedio de';
$YOU_DRIVE_PER = 'Recorres por';
$MINUTES_HOME_JOB = 'Cantidad de minutos que manejas para llegar de casa al trabajo';
$DAYS_DRIVE_TO_JOB = 'Cantidad de días por semana que vas en tu vehículo al trabajo';
$TIME_DRIVE_WEEKEND = 'Cantidad de minutos empleados en conducción los días que no vas en tu vehículo al trabajo';
$MINUTES_DRIVE_PER = 'Cantidad de minutos que manejas por';
$DAYS_DRIVE_PER_MONTH = 'Cantidad de días mensuales que manejas';
$HOURS_DRIVE_PER = 'Cantidad de horas por';
$VIRTUAL_SPEED = 'velocidad de consumidor';
$KINETIC_SPEED = 'velocidad cinética';
$AVER_YEARLY = 'Promedio anual';
$WORKING_TIME_MESSAGE = 'Se consideró para el cálculo una duración media de 36 horas semanales y de 11 meses anuales';
$HOURS_TO_AFFORD_CAR = 'Cantidad de horas al año que debes trabajar para pagar el vehículo';
$MONTHS_TO_AFFORD_CAR = 'Cantidad de meses al año que debes trabajar para pagar el vehículo';
$TOTAL_COSTS_PER_YEAR = 'Gasto anual total por el vehículo';
$DAYS_CAR_PAID = 'Cantidad de días, después del 1 de enero, por los que el vehículo ya está pagado';

//**************************************************
//GRAPHICS
$PARCEL = 'Parcela';
$COSTS = 'Costo';


//****************************************************
//ERROR MESSAGES
$ERROR_INVALID_INSU_VALUE = 'Cuota de seguro no válida';
$ERROR_INSU_PERIOD = 'Ingresa la periodicidad del seguro';

$ERROR_FUEL_CURR_DIST = 'Debes indicar si prefieres hacer el cálculo basado en córdobas o kilómetros';
$ERROR_FUEL_CAR_EFF = 'Valor de eficacia de combustible no válido';
$ERROR_FUEL_PRICE = 'Precio de combustible no válido';
$ERROR_CAR_JOB = 'Indica, por favor, si utilizas el vehículo para ir al trabajo';
$ERROR_FUEL_DIST = 'Cantidad de kilómetros recorridos mensualmente no válida';
$ERROR_DAYS_PER_WEEK = 'Cantidad de días por semana no válida';
$ERROR_DIST_HOME_WORK = 'Cantidad de kilómetros entre la casa y el trabajo no válida';
$ERROR_DIST_NO_JOB = "Cantidad de kilómetros recorridos los días que no vas en tu vehículo al trabajo no válida";
$ERROR_CURRENCY = 'Valor de córdobas por mes no válido';

$ERROR_DEPRECIATION_MONTH = 'Mes de adquisición no válido';
$ERROR_DEPRECIATION_YEAR = 'Año de adquisición no valido';
$ERROR_DEPRECIATION_VALUE = 'Cuota de adquisición no válida';
$ERROR_DEPRECIATION_VALUE_TODAY = 'Precio actual no válido';
$ERROR_DEPRECIATION_DATE = 'Fecha de adquisición no válida';
$ERROR_DEPRECIATION_NEW_CAR =  'La depreciación no se puede aplicar porque este vehículo es nuevo';

$ERROR_CREDIT_QUESTION = 'Indica por favor si has financiado tu vehículo';
$ERROR_CREDIT_LOAN_VALUE = 'Cuota financiada no válida';
$ERROR_CREDIT_PERIOD = 'Periodo de crédito o cantidad de cuotas no válido';
$ERROR_CREDIT_INSTALMENT = 'Valor de cuota no válido';
$ERROR_CREDIT_RESIDUAL_VALUE = 'Valor residual no válido';

$ERROR_INSPECTION_NTIMES = 'Cantidad de veces no válida';
$ERROR_INSPECTION_COSTS = 'Costo de verificación no válido';

$INVALID_AMOUNT = 'Cuota no válida';

$INVALID_NBR_PP = 'Cantidad de miembros no válida';
$ERROR_PASS_AMOUNT= 'Costo mensual de abono no válido';

$ERROR_INCOME = 'Ingresos netos no válidos';
$ERROR_WEEKS_PER_YEAR = 'Cantidad de semanas anuales no válida';
$ERROR_MONTHS_PER_YEAR = 'Cantidad de meses anuales no válida';
$ERROR_HOURS_PER_WEEK = 'Cantidad de horas semanales no válida';
$ERROR_MIN_DRIVE_HOME_JOB = 'Cantidad de minutos empleados en conducción de casa al trabajo no válida';
$ERROR_MIN_DRIVE_WEEKEND = 'Cantidad de minutos empleados en conducción los días que no vas en coche al trabajo no válida';
$ERROR_MIN_DRIVE = 'Cantidad de minutos empleados en conducción no válida';
$ERROR_DAYS_PER_MONTH = 'Cantidad de días mensuales no válida';

//FINAL RESULT
$YOUR_CAR_COSTS_YOU = 'Tu vehículo cuesta';
$WITH_THIS_LEVEL_OF_COSTS = 'Con este nivel de gastos, tu vehículo durante'; //ex: __"With this level of costs, you car during the"__ 15 months of possession....
$MONTHS_POSS = 'meses de posesión ha costado ya';   //ex: With this level of costs, you car during the 15 ___"months of possession has already costed"___ 14000 Euros


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