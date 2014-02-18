<?php

// COUNTRY: BRAZIL
// LANGAUAGE: PORTUGUESE - BRAZILIAN

//***********************************************
//											   **
//      Translation for AUTOCOSTS.ORG           **
//      the automobile costs simulator		   **
// 											   **
//      made by João Pimentel Ferreira         **
//       under Creative Commons BY-SA          **
//	  										   **
//***********************************************

// IMPORTANT: Preserve always the same standards, BE CHOERENT between the text variables and the standard options

//Fuel efficiency for car engine standard
$fuel_efficiency_std_option = 2;
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
$CURR_NAME = 'Real';
$CURR_NAME_PLURAL = 'Reais';
$CURR_NAME_BIG_PLURAL = 'REAIS';
$CURR_SYMBOL = 'R$';
$STD_DIST = 'km';
$STD_DIST_FULL = 'quilômetros';
$STD_FUEL_CALC = 'km/l';
$STD_VOLUME_SHORT = 'ltr';

//simple words
$WORD_PER = 'por';     //ex: 4 km _per_ day
$WORDS_PER_EACH = 'por cada';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = 'vezes'; //ex: 4 times per week
$DURING = 'durante';   //spent in tolls 3€ per day _during_ 22 days per month
$WORD_PEOPLE = 'pessoas';   //plural, 3 _people_ 
$YES = 'sim';
$NO = 'não';

$BUTTON_RUN = 'Calcular'; //run simulator button 
$BUTTON_RERUN = 'Recalcular'; //run simulator button 

//WEB PAGE
$WEB_PAGE_TITLE = 'Calculadora dos Custos do Automóvel';
$MAIN_TITLE = 'CALCULADORA DOS CUSTOS DO AUTOMÓVEL';
$INITIAL_TEXT = 
'Faça com esta calculadora as contas, ao <b>verdadeiro custo</b> que tem o seu veículo particular <b>no Brasil</b>. Tratam-se de aproximações, mas é uma excelente ordem de grandeza para que se aperceba de quantos recursos financeiros aloca em média para o seu veículo. Os veículos automotores têm uma série de despesas cujas periodicidades variam bastante, e por norma as pessoas não contabilizam uma série de despesas que vão pagando esporadicamente.
<br>
<br>
Seja realista nos montantes introduzidos. Para valores que considera imprevisíveis, como por exemplo reparações ou multas, pense quanto gastou em média nos últimos anos. Use o ponto para a notação decimal, ex: <span style="color:rgb(255,0,0);">8.7</span> km entre casa e trabalho.<br>
';

$HELP_PROJECT = 'Ajude este projeto' ;
$AC_MOBILE = 'AUTOCUSTOS<br>para dispositivos móveis';
$AC_HEADER = '<big><u>WWW.AUTOCUSTOS.COM</u></big><br><b>CALCULADORA DOS CUSTOS DO AUTOMÓVEL</b>';


//time words
$DAYLY = 'diário';
$WEEKLY = 'semanal';
$MONTHLY = 'mensal';
$TRIMESTERLY = 'trimestral';
$SEMESTERLY = 'semestral';
$YEARLY = 'anual';

$DAY = 'dia';
$DAYS = 'dias';
$WEEK = 'semana';
$MONTH = 'mês';
$MONTHS = 'meses';
$TWO_MONTHS = 'dois meses';
$DIST_EACH_TWO_MONTHS = 'km por cada dois meses';
$TRIMESTER = 'trimestre';
$SEMESTER = 'semestre';
$YEAR = 'ano';

$DAYS_PER_WEEK_SHORT= 'dias/sem';

//simulator words
$COSTS= "Custos";
$FIXED_COSTS = 'Custos fixos';
$FIXED_COSTS_HEADER_1= 'CUSTOS FIXOS';
$FIXED_COSTS_HEADER_2= 'Que não dependem do uso que faz do carro e que paga mesmo que esteja parado'; 
$DAYS_PER = "dias por";

$RUNNING_COSTS = 'Custos variáveis';
$RUNNING_COSTS_HEADER_1 = 'CUSTOS VARIÁVEIS';
$RUNNING_COSTS_HEADER_2 = 'Que dependem do uso que faz do carro';

$PRIVATE_COSTS = 'Custos particulares';
$MONTHLY_AMOUNT = 'Custo mensal';
$RUN_CP_DIST = 'Custos variáveis por km'; //running costs per unit distance
$TOTAL_CP_DIST = 'Custos totais por km'; //total costs per unit distance
$PUBL_TRA_EQUIV= 'Custos equivalentes de deslocação, abdicando da posse de um carro';
$WORD_TOTAL_CAP = 'TOTAL';

//depreciation
$DEPRECIATION = 'Depreciação do veículo';
$AQ_DATE = 'Data de aquisição do veículo';
$COM_VALUE = 'Valor comercial do veículo quando o adquiriu<br><i>se novo, o preço que pagou por ele <br>se usado, o valor comercial quando o adquiriu</i>';
$COM_VALUE_TODAY = 'Valor do veículo à data de hoje:<br><i>se o vendesse agora, quanto valeria?</i>';
$PERIOD_OWN = 'Período de posse';
$FINAL_VALUE = 'Valor hoje';
$AQ_VALUE = 'Valor de aquisição';

//insurance
$INSURANCE = 'Seguro automóvel (excluindo DPVAT)';
$INSURANCE_SHORT = 'Seguro';

//credit
$CREDIT = 'Crédito automóvel';
$CREDIT_PERIOD = 'Período';
$CREDIT_INTERESTS = 'Juros do crédito';
$CREDIT_INTERESTS_MONTH = 'Valor mensal de juros';
$CREDIT_TOTAL_INTERESTS = 'Valor total de juros';
$CREDIT_QUESTION = 'Pediu crédito automóvel?';
$CREDIT_LOAN = 'Montante financiado:<br><i>Quanto pediu ao banco ou à financeira?</i>';
$CREDIT_LOAN2 = 'Montante financiado';
$CREDIT_PERIOD = 'Período do crédito / n.º de prestações';
$CREDIT_AVERAGE_VALUE = 'Valor médio da prestação';
$CREDIT_RESIDUAL_VALUE = 'Valor residual:<br><i>No final do período do crédito,<br> quanto ainda tem que pagar?</i>';
$CREDIT_RESIDUAL_VALUE1 = 'Valor residual';
$CREDIT_INSTALMENT = 'Valor médio mensal';

//inspection
$INSPECTION = 'Vistoria automóvel';
$INSPECTION_SHORT = 'Vistoria';
$INSPECTION_NBMR_TIMES = 'Quantas vezes já levou o seu veículo à vistoria?';
$INSPECTION_PRICE =  'Custo médio da vistoria para o seu veículo';
$EACH_ONE_DURING = 'cada uma durante'; //5 times costing 15€ *each one during* 20 months (inspection)
$TIMES_COSTING = 'vezes custando';     //5 *times costing* 15€ each one during 20 months (inspection)

//road taxes
$ROAD_TAXES = 'IPVA, DPVAT e taxa de licenciamento';
$ROAD_TAXES_SHORT = 'IPVA, DPVAT e licenciamento';
$ROAD_TAXES_VALUE = 'Valor do Imposto sobre a propriedade de veículos automotores, do seguro de Danos Pessoais Causados por Veículos Automotores de Via Terrestre, e taxa de licenciamento para o seu veículo:<br><i>pagamento efetuado ao estado</i>';

//fuel
$FUEL = 'Combustíveis';
$FUEL_DESC = 'gasolina, diesel, álcool, GNV, eletricidade';
$FUEL_CALC = 'Cálculo em';
$FUEL_JOB_CALC = 'Considerando que leva o automóvel para o emprego?';
$FUEL_JOB_CALC1 = 'dia(s) por semana que leva o carro para o emprego';
$FUEL_DAYS = 'Dias por semana que leva o automóvel para o emprego';
$FUEL_DIST_HOME_JOB = 'Quilômetros que faz para ir de casa ao emprego (só ida)'; //$CURR_DIST=km, miles, etc.
$FUEL_DIST_HOME_JOB1 = 'Quilômetros entre casa e o emprego'; //you do 7 km between home and job
$FUEL_DIST_NO_JOB = 'Quilômetros que faz em média nos dias em que não leva<br>o automóvel para o emprego:<br><i>Ex.:por cada fim de semana</i>';
$FUEL_DIST_NO_JOB1 = 'Quilômetros por semana nos dias que não leva o carro para o emprego'; // you do 5 km per week....
$FUEL_DIST = 'Quilômetros que percorre';
$FUEL_CAR_EFF = 'Consumo médio do seu veículo';
$FUEL_PRICE = 'Preço médio que paga pelo combustível';
$FUEL_PRICE1 = 'Preço médio do combustível';
$YOU_DRIVE_TOTTALY_AVG = 'No total faz em média'; //__You drive totally on average__ 5 km per day
$YOU_DRIVE = 'Faz'; //__You drive__ 5 km per day

//MAINTENANCE
$MAINTENANCE = 'Manutenção preventiva';
$MAINTENANCE_DESC = 'Custo médio em manutenção preventiva:<br><i>óleo, filtros, luzes, pneus, freios, alinhamento, ar condicionado, etc.</i>';

//REPAIRS AND IMPROVEMENTS
$REP_IMPROV = 'Reparações e Melhoramentos';
$REP_IMPROV_DESC = 'Custo médio em reparações e melhoramentos:<br><i>peças, alterações, quebras e imprevistos de mecânica geral, riscos, amolgadelas</i>';

//PARKING
$PARKING = 'Estacionamento';
$PARKING_DESC = 'Custos médios com estacionamento do veículo:<br><i>parquímetros na cidade, aluguel de garagem, estacionamento subterrâneo na cidade ou em centros comerciais ou mesmo flanelinhas</i>';

//TOLLS
$TOLLS = 'Pedágios';
$TOLLS_DESC = 'Valor que paga nos pedágios<br><i>pontes, túneis e autoestradas</i>';
$TOLLS_DAY_CALC = 'Cálculo ao dia?';
$TOLLS_DAY_CALC1 = 'Valor diário que paga nos pedágios';
$TOLLS_DAY_CALC_DESC = 'Pense nas viagens mesmo que esporádicas<br>que faz para fora ou no extrato da via fácil/sem parar';

//FINES
$FINES = 'Multas';
$FINES_DESC = 'Valor médio pago em multas:<br><i>pense nas multas de estacionamento, excesso de velocidade, falar ao celular, cinto de segurança, etc.</i>';

//WASHING
$WASHING = 'Lavagens e limpeza';
$WASHING_DESC = 'Valor pago em lavagens e limpeza:<br><i>em posto de combustível ou noutros locais</i>';

//TOTAL
$TOTAL_FIXED = 'TOTAL - Custos fixos';
$TOTAL_FIXED_DESCR = 'Custos que não dependem da utilização do carro, e que paga mesmo que o carro esteja parado';
$TOTAL_FIXED_DESCR2 = 'Depreciação, Seguro, Juros do crédito, IPVA, Inspeção veicular e 50% de manutenção preventiva';

$TOTAL_VARIABLE = 'TOTAL - Custos variáveis';
$TOTAL_VARIABLE_DESCR = 'Custos que dependem do uso que faz do carro, ou seja, dos km percorridos';
$TOTAL_VARIABLE_DESCR2 = 'Combustíveis, Reparações e Melhoramentos, Estacionamento (considerando que só paga, quando usa o carro), pedágios, multas, lavagens e 50% de revisões';


//EXTRA DATA
$EXTRA_DATA = 'DADOS ADICIONAIS';
$EXTRA_DATA1 = 'Dados adicionais';
$EXTRA_DATA_FAMILY_NBR = 'Quantas pessoas, com mais de 4 anos de idade, tem a sua família (com você inclusive)';
$EXTRA_DATA_PRICE_PASS = 'Qual o preço médio por pessoa, que gastaria por mês em transportes públicos caso abdicasse do carro<br><i>caso não se aplique, coloque 0</i>';

//PUBLIC TRANSPORTS
$PUB_TRANS_TEXT = 'Transportes públicos na sua área de residência';
$FAM_NBR = 'Agregado familiar, de pessoas com mais de 4 anos de idade';
$PERSON_OR_PEOPLE = 'pessoa(s)';
$PASS_MONTH_AVG = 'Valor pago em transportes públicos para viagens regulares';
$OTHER_PUB_TRANS = 'Outros transportes públicos';
$OTHER_PUB_TRANS_DESC = "Valor que ainda sobra para outros transportes públicos, fora da sua área de residência, por exemplo de longo curso";
$TAXI_DESL = "Deslocações de táxi";
$ON_TAXI_PAYING = "de táxi a"; //ex: 4 km __on taxi paying__ 5€ per km


//**************************************************
//GRAPHICS
$PARCEL = 'Parcela';
$COSTS = 'Custos';


//****************************************************
//ERROR MESSAGES
$ERROR_INVALID_INSU_VALUE = 'Valor do seguro inválido';
$ERROR_INSU_PERIOD = 'Insira periodicidade do seguro';

$ERROR_FUEL_CURR_DIST = 'Diga se quer fazer o cálculo em Reais ou em km';
$ERROR_FUEL_CAR_EFF = 'Valor do consumo inválido';
$ERROR_FUEL_PRICE = 'Valor do preço dos combustíveis inválido';
$ERROR_CAR_JOB = 'Diga se leva o carro para o emprego';
$ERROR_FUEL_DIST = 'Valor de km por mês inválido';
$ERROR_DAYS_PER_WEEK = 'Dias por semana inválidos';
$ERROR_DIST_HOME_WORK = 'Km entre casa e o trabalho inválidos';
$ERROR_DIST_NO_JOB = 'Km que faz em média nos dias em que não leva carro inválidos';
$ERROR_CURRENCY = 'Reais por mês inválidos';

$ERROR_DEPRECIATION_MONTH = 'Mês de aquisição do veículo inválido';
$ERROR_DEPRECIATION_YEAR = 'Ano de aquisição do veículo inválido';
$ERROR_DEPRECIATION_VALUE = 'Valor de aquisição do veículo inválido';
$ERROR_DEPRECIATION_VALUE_TODAY = 'Valor do veículo à data de hoje inválido';
$ERROR_DEPRECIATION_DATE = 'Data de aquisição do veículo inválida';
$ERROR_DEPRECIATION_NEW_CAR =  'Não se aplica a depreciação do veículo pois este é novo';

$ERROR_CREDIT_QUESTION = 'Diga se tem ou não tem crédito automóvel';
$ERROR_CREDIT_LOAN_VALUE = 'Valor do montante financiado inválido';
$ERROR_CREDIT_PERIOD = 'Valor do período do crédito/n.º de prestações  inválido';
$ERROR_CREDIT_INSTALMENT = 'Valor da prestação inválido';
$ERROR_CREDIT_RESIDUAL_VALUE = 'Valor residual inválido';

$ERROR_INSPECTION_NTIMES = 'Número de vezes inválido';
$ERROR_INSPECTION_COSTS = 'Custo da inspeção inválido';

$INVALID_AMOUNT = 'Montante inválido';

$INVALID_NBR_PP = 'Número de pessoas inválido';
$ERROR_PASS_AMOUNT= 'Valor do passe inválido';

//FINAL RESULT
$YOUR_CAR_COSTS_YOU = 'O seu carro custa-lhe ';
$WITH_THIS_LEVEL_OF_COSTS = 'Com este nível de custos, o seu carro ao longo dos'; //ex: __"With this level of costs, you car during the"__ 15 months of possession....
$MONTHS_POSS = 'meses de posse já lhe custou';   //ex: With this level of costs, you car during the 15 ___"months of possession has already costed"___ 14000 Euros


$TAXI_PRICE_PER_DIST=3;

//*****************************************
//STANDARD COMMON AVERAGE DEFAULT values that apear on the start page
//these values are to be changed by the user but you shall put values that are reasonable
//keep in mind your chosen standard Currency and your volume and fuel efficiency standards

$STD_ACQ_MONTH = '01'; //month of acquisition 
$STD_ACQ_YEAR = '2010'; //year of acquisition 

$STD_PRICE_PAID = '35000'; //price paid for the car
$STD_PRICE_TODAY = '22000'; //the price the car has today

$STD_INSURANCE_SEM = '400'; //price paid for insurance by semester


$STD_LOAN = '20000'; //amount asked for credit
$STD_PERIOD_OF_CREDIT = '48'; //period of the credit in months
$STD_MONTHLY_PAY = '400'; //monthly payment
$STD_RESIDUAL_VALUE = '5000'; //residual value must be paid after credit

$STD_NBR_INSPECTION = '2'; //number of times car went to inspection
$STD_INSPECTION_PRICE = '150'; //normal inspection price

$STD_ROAD_TAX = '400'; //price paid for road taxes per year


$STD_FUEL_PAID_PER_MONTH = '350'; //money spent per month on fuels
$STD_DAYS_PER_WEEK = '5'; //days per week one takes their car to work
$STD_JORNEY_2WORK = '50'; //(standard distance, km or miles) made from home to work (just one way)
 

$STD_JORNEY_WEEKEND = '200'; //(standard distance, km or miles) during the other days, for example weekends
$STD_KM_PER_MONTH = '1000'; //(standard distance, km or miles) made per month
$STD_CAR_FUEL_EFFICIENCY = '10'; //(standard fuel efficiency, km/l l/100km mpg(US) or mpg(imp)) fuel efficiency in the chosen standard
$STD_FUEL_PRICE = '2.8'; //price paid for fuel on chosen currency

$STD_MAINTENANCE_PER_YEAR = '300'; //amount paid for maintenance per year


$STD_REPAIRS = '1000'; //repairs and improvements paid per year on average

$STD_PARKING = '100'; //parking paid per month

$STD_TOLLS = '100'; //amount paid in tolls per trimestre 

$STD_TOLLS_DAY = '6'; //amount paid in tolls per day
$STD_TOLLS_DAYS_PER_MONTH = '22'; //number of days per month the car crosses a tolled way

$STD_FINES = '200'; //fines paid on average per trimestre

$STD_WASHING = '150'; //amount paid in washings per trimestre 

?>
