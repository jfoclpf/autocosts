<?php

// COUNTRY: UKRAINE
// LANGAUAGE: UKRAINIAN

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
$CURR_NAME = 'гривня';
$CURR_NAME_PLURAL = 'гривні';
$CURR_NAME_BIG_PLURAL = 'ГРИВНІ';
$CURR_SYMBOL = '₴';
$STD_DIST = 'км'; //short text version you'd like to apply
$STD_DIST_FULL = 'кілометри';
$STD_FUEL_CALC = 'л/100 км'; //text version you'd like to apply
$STD_VOLUME_SHORT = 'л'; //short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)

//simple words
$WORD_PER = 'на';     //ex: 4 km _per_ day
$WORDS_PER_EACH = 'за';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = 'рази'; //ex: 4 times per week
$DURING = 'під час';   //spent in tolls 3€ per day _during_ 22 days per month
$WORD_PEOPLE = 'людини';   //plural, 3 _people_ 
$YES = 'так';
$NO = 'ні';

$BUTTON_RUN = 'Розрахувати'; //run simulator button 
$BUTTON_RERUN = 'Перерахувати'; //run simulator button 

//WEB PAGE
$WEB_PAGE_TITLE = 'Калькулятор витрат на автомобіль';
$MAIN_TITLE = 'КАЛЬКУЛЯТОР ВИТРАТ НА АВТОМОБІЛЬ';
$INITIAL_TEXT = 
"За допомогою цього симулятора ви можете дізнатися <b>реальну вартість</b> утримання автомобіля в <b>Україні</b>. Він дасть вам достатньо точну оцінку витрат на автомобіль.
Нерідко буває складно оцінити загальний обсяг витрат на автомобіль, бо вони виникають у різний час протягом усього року.
<br>
<br>
Уведіть реалістичні дані. Щодо непланових витрат, наприклад, на ремонт після аварії або сплату штрафів, пригадайте, скільки ви витратили на ці статті за останні декілька років. За умовчанням розрахунок здійснюється на основі витрат за місяць. Як розділювач використовуйте крапку, наприклад, <span style=\"color:rgb(255,0,0);\">8.7</span> км між домом і роботою.<br>";

$HELP_PROJECT = 'Це - безкоштовна послуга без реклами!' ;
$AC_MOBILE = 'АВТОВИТРАТИ<br>для мобільних пристроїв';
$AC_DOMAIN = 'AUTOCOSTS.ORG';
$AC_SUB_HEADER = 'КАЛЬКУЛЯТОР ВИТРАТ НА АВТОМОБІЛЬ';

//time words
$DAYLY = 'у день';
$WEEKLY = 'у тиждень';
$MONTHLY = 'у місяць';
$TRIMESTERLY = 'у квартал';
$SEMESTERLY = 'у півроку';
$YEARLY = 'у рік';

$MIN = 'хв';
$MINUTES = 'хвилин(и)';
$HOUR = 'година';
$HOURS = 'годин(и)';
$HOUR_ABBR = 'г';
$DAY = 'день'; 
$DAYS = 'дні(в)'; 
$WEEK = 'тиждень'; 
$WEEKS = 'тижні(в)'; 
$MONTH = 'місяць'; 
$MONTHS = 'місяці(в)'; 
$TWO_MONTHS = 'два місяці'; 
$DIST_EACH_TWO_MONTHS = 'кілометри на кожні два місяці'; 
$TRIMESTER = 'три місяці'; 
$SEMESTER = 'півроку'; 
$YEAR = 'рік';

$DAYS_PER_WEEK_SHORT= 'дні(в)/тиждень';

//distance
$DISTANCE = "Відстань";

//calculator words
$COSTS= "Витрати";
$FIXED_COSTS = 'Постійні витрати';
$FIXED_COSTS_HEADER_1= 'ПОСТІЙНІ ВИТРАТИ'; //capital letters
$FIXED_COSTS_HEADER_2= "Витрати, які не залежать від пробігу і які необхідні для підтримання автомобіля у справному стані"; 
$DAYS_PER = "дні на";

$RUNNING_COSTS = 'Експлуатаційні витрати';
$RUNNING_COSTS_HEADER_1 = 'ЕКСПЛУАТАЦІЙНІ ВИТРАТИ'; //capital letters
$RUNNING_COSTS_HEADER_2 = 'Витрати, які залежать від пробігу';

$PRIVATE_COSTS = 'Індивідуальні витрати';
$MONTHLY_AMOUNT = 'Сумма на місяць';
$RUN_CP_DIST = 'Експлуатаційні витрати на кілометр'; //running costs per unit distance
$TOTAL_CP_DIST = 'Усього витрат на кілометр'; //total costs per unit distance
$PUBL_TRA_EQUIV= "Еквівалентні витрати на транспорт за відсутності у вас власного автомобіля";
$WORD_TOTAL_CAP = 'РАЗОМ'; //capital word for total

$WORD_PRINT = 'Друк';
$WORD_DOWNLOAD_PDF = 'Завантажити звіт у форматі PDF';

//depreciation
$DEPRECIATION = 'Зниження вартості автомобіля';
$AQ_DATE = 'Дата придбання автомобіля';
$COM_VALUE = 'Ринкова вартість автомобіля на момент придбання<br><i>Якщо автомобіль новий, вкажіть ціну, за яку ви його придбали<br>Якщо автомобіль був у вжитку, вкажіть його ринкову вартість на момент придбання</i>';
$COM_VALUE_TODAY = 'Ринкова вартість автомобіля на сьогодні<br><i>Якщо продати автомобіль зараз, скільки ви за нього отримаєте?</i>';
$PERIOD_OWN = 'Тривалість утримання';
$FINAL_VALUE = 'Вартість на сьогодні';
$AQ_VALUE = 'Вартість на момент придбання';

//insurance
$INSURANCE = 'Страхування автомобіля і страхове покриття на випадок пошкоджень у дорозі';
$INSURANCE_CHART = 'Страхування автомобіля';
$INSURANCE_SHORT = 'Страхування і страхове покриття на випадок пошкоджень у дорозі';

//credit
$CREDIT = 'Фінансування придбання автомобіля';
$CREDIT_PERIOD = 'Термін';
$CREDIT_INTERESTS = 'Відсотки за кредитом';
$CREDIT_INTERESTS_MONTH = 'Сума відсотків на місяць';
$CREDIT_TOTAL_INTERESTS = 'Загальна сума відсотків';
$CREDIT_QUESTION = 'Ви скористалися послугами фінансування у момент придбання автомобіля?';
$CREDIT_LOAN = 'Сума фінансування:<br><i>Вкажіть суму, яку ви взяли у кредит.</i>';
$CREDIT_LOAN2 = 'Сума фінансування';
$CREDIT_PERIOD = 'Термін кредиту / кількість внесків у погашення кредиту';
$CREDIT_AVERAGE_VALUE = 'Середній розмір кожного внеску';
$CREDIT_RESIDUAL_VALUE = 'Остаточна вартість:<br><i>Яку суму вам ще залишається погасити або яку суму ви вже погасили на кінець терміну кредиту?</i>';
$CREDIT_RESIDUAL_VALUE1 = 'Остаточна вартість';
$CREDIT_INSTALMENT = 'Середнє значення на місяць';

//inspection
$INSPECTION = 'Технічний огляд автомобіля (державний техогляд)';
$INSPECTION_SHORT = 'Техогляд';
$INSPECTION_NBMR_TIMES = 'Скільки разів ви здійснювали техогляд автомобіля?';
$INSPECTION_PRICE =  'Середня вартість кожного техогляду';
$EACH_ONE_DURING = 'за кожний протягом'; //5 times costing 15€ *each one during* 20 months (inspection)
$TIMES_COSTING = 'рази вартістю';     //5 *times costing* 15€ each one during 20 months (inspection)

//road taxes
$ROAD_TAXES = 'Акциз (податок) на автомобіль';
$ROAD_TAXES_SHORT = 'Податок на автомобіль';
$ROAD_TAXES_VALUE = 'Податок на ваш автомобіль:<br><i>збір на користь держави</i>';

//fuel
$FUEL = 'Пальне';
$FUEL_DESC = 'Бензин, дизельне пальне, газ, електрика';
$FUEL_CALC = 'Розрахунки на основі';
$FUEL_JOB_CALC = 'З урахуванням того, що ви їздите на роботу автомобілем?';
$FUEL_JOB_CALC1 = 'Дні(в), коли ви їздите на роботу автомобілем';
$FUEL_DAYS = 'Дні(в), коли ви їздите на роботу автомобілем';
$FUEL_DIST_HOME_JOB = 'Відстань у кілометрах між домом і роботою, яку ви проїздите автомобілем (лише в один бік)'; //$CURR_DIST=km, miles, etc.
$FUEL_DIST_HOME_JOB1 = 'Відстань у кілометрах між домом і роботою'; //you do 7 km between home and job
$FUEL_DIST_NO_JOB = "Середня відстань у кілометрах, яку ви проїздите у ті дні, коли не їдете на роботу автомобілем:<br><i>наприклад, у вихідні</i>";
$FUEL_DIST_NO_JOB1 = "Середня відстань у кілометрах у ті дні, коли не їдете на роботу автомобілем"; // you do 5 km per week....
$FUEL_DIST = 'Відстань у кілометрах, яку ви проїздите автомобілем';
$FUEL_CAR_EFF = 'Рівень споживання пального вашого автомобіля';
$FUEL_PRICE = 'Середня ціна, за якою ви купляєте пальне';
$FUEL_PRICE1 = 'Середня ціна на пальне';
$YOU_DRIVE_TOTTALY_AVG = 'Усього ви проїздите автомобілем у середньому'; //__You drive totally on average of__ 5 km per day
$YOU_DRIVE = 'Ви проїздите автомобілем'; //__You drive__ 5 km per day

//MAINTENANCE
$MAINTENANCE = 'Технічне обслуговування';
$MAINTENANCE_DESC = 'Середня вартість технічного обслуговування та страхового покриття на випадок пошкоджень у дорозі:<br><i>заміна моторної оливи, фільтрів, ламп, шин, гальм, налаштування кондиціонера, регулювання керма тощо.</i>';

//REPAIRS AND IMPROVEMENTS
$REP_IMPROV = 'Ремонт і вдосконалення';
$REP_IMPROV_DESC = 'Середня вартість ремонту та вдосконалень:<br><i>автозапчастини, модифікації, ремонт несправностей, вм’ятини, пошкодження в результаті зіткнення, тюнінг тощо.</i>';

//PARKING
$PARKING = 'Стоянка';
$PARKING_DESC = 'Середня вартість з урахуванням стоянки:<br><i>паркометри у межах міста, оренда місця для паркування, підземна чи надземна стоянка у громадських будівлях, торгівельних центрах, аеропортах, на автобусних чи залізничних станціях чи інших об’єктах інфраструктури.</i>';

//TOLLS
$TOLLS = 'Плата за проїзд';
$TOLLS_DESC = 'Середня сума витрат на плату за проїзд<br><i>мости, тунелі, автомагістралі і зони платного в’їзду у центрі міста</i>';
$TOLLS_DAY_CALC = 'Розрахунок на основі витрат у день?';
$TOLLS_DAY_CALC1 = 'Сума, яку ви щодня витрачаєте на внесення плати за проїзд';
$TOLLS_DAY_CALC_DESC = 'Також врахуйте поїздки за межі міста або на природу, які ви здійснюєте час від часу, а також витрати за квитанціями будь-яких електронних збирачів плати за проїзд';

//FINES
$FINES = 'Штрафи за порушення ПДР';
$FINES_DESC = 'Середня сума оплачених штрафів:<br><i>пригадайте, яку суму ви виплатили за останні декілька років у вигляді штрафів за порушення ПДР будь-якого виду (стоянка у забороненому місці, порушення швидкісного режиму, користування мобільним телефоном за кермом тощо)</i>';

//WASHING
$WASHING = 'Миття та чистка';
$WASHING_DESC = 'Середня сума рахунку за миття та чистку:<br><i>на станціях обслуговування та в інших місцях</i>';

//TOTAL
$TOTAL_FIXED = 'Постійні витрати - РАЗОМ';
$TOTAL_FIXED_DESCR = "Витрати, які не залежать від пробігу і які здійснюються навіть тоді, коли автомобіль не експлуатується";
$TOTAL_FIXED_DESCR2 = 'Зниження вартості, страхування, відсотки за кредитом, податки, техогляд і 50% витрат на стоянку та технічне обслуговування';

$TOTAL_VARIABLE = 'Експлуатаційні витрати - РАЗОМ';
$TOTAL_VARIABLE_DESCR = 'Витрати, які залежать від пробігу';
$TOTAL_VARIABLE_DESCR2 = 'Пальне, ремонт і вдосконалення, стоянка (з урахуванням того, що стоянка оплачується лише тоді, коли ви користуєтеся автомобілем), плата за проїзд, штрафи, миття і 50% вартості технічного обслуговування';


//EXTRA DATA
$EXTRA_DATA = 'ДОДАТКОВІ ДАНІ';
$EXTRA_DATA1 = 'Додаткові дані';
$EXTRA_DATA_PUBLIC_TRANSP = 'Громадський транспорт';
$EXTRA_DATA_FAMILY_NBR = 'Скільки у вашій сім’ї є людей у віці від 4 років (разом із вами)?';
$EXTRA_DATA_PRICE_PASS = "Яка середня вартість одного місячного абонементу на громадський транспорт, необхідний для звичайної щоденної діяльності кожного члена сім’ї<br><i>Якщо ви не користуєтеся громадським транспортом, уведіть 0</i>";
$EXTRA_DATA_INCOME = "Дохід";
$EXTRA_DATA_INCOME_QUESTION = 'Укажіть розмір свого чистого доходу.';
$EXTRA_DATA_WORKING_TIME = 'Робочий час';
$EXTRA_DATA_WORKING_TIME_QUESTION = 'У вас є робота чи заняття, яке приносить дохід?';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = 'Час за кермом';
$EXTRA_DATA_TIME_QUESTION1 = 'Скільки хвилин ви проводите за кермом дорогою з дому до роботи? (лише в один бік)';
$EXTRA_DATA_TIME_QUESTION2 = 'Скільки хвилин ви проводите за кермом у ті дні, коли ви не їдете на роботу автомобілем?';
$EXTRA_DATA_TIME_QUESTION3 = 'Скільки хвилин ви проводите за кермом?';

//PUBLIC TRANSPORTS
$PUB_TRANS_TEXT = 'Громадський транспорт для щоденної діяльності членів сім’ї';
$FAM_NBR = 'Кількість членів вашої сім’ї у віці від 4 років';
$PERSON_OR_PEOPLE = 'людини (людей)';
$PASS_MONTH_AVG = 'Середня вартість місячного абонементу на людину';
$OTHER_PUB_TRANS = 'Інші види громадського транспорту';
$OTHER_PUB_TRANS_DESC = "Сума, що витрачається на інші види транспорту, наприклад, для поїздок із вашого звичайного району проживання, як от поїзди або автобуси дальнього слідування";
$TAXI_DESL = "Поїздки на таксі";
$ON_TAXI_PAYING = "на таксі за ціною"; //ex: 4 km __on taxi paying__ 5€ per km

//VIRTUAL SPEED
$FINANCIAL_EFFORT = 'Фінансове зусилля';
$NET_INCOME_PER = 'Чистий дохід на';
$AVERAGE_NET_INCOME_PER = 'Середній чистий дохід на';
$NUMBER_OF_MONTHS = 'Кількість місяців у році отримання доходу';
$NUMBER_OF_WEEKS = 'Кількість тижнів у році отримання доходу';
$NUMBER_OF_HOURS= 'Кількість годин у тижні отримання доходу';
$HOURS_PER = 'Годин(и) на';
$MONTHS_PER = 'Місяці(в) на';
$AVERAGE_WORKING_HOURS_PER = 'Середня кількість годин роботи на';
$WORKING_HOURS_PER = 'Кількість годин роботи на';
$DIST_HOME_JOB = 'Ви проїздите автомобілем з дому на роботу';
$DAYS_DRIVE_JOB = 'Кількість днів на тиждень, коли ви їдете автомобілем на роботу';
$DIST_JORNEY_WEEKEND = 'Ви проїздите автомобілем у дні, коли ви не їдете автомобілем на роботу';
$AVERAGE_DIST_PER_WEEK = 'У середньому на тиждень ви проїздите';
$YOU_DRIVE_PER = 'Ви проїздите на';
$MINUTES_HOME_JOB = 'Кількість хвилин, що ви проводите за кермом з дому на роботу';
$DAYS_DRIVE_TO_JOB = 'Кількість днів на тиждень, у які ви їздите на роботу автомобілем';
$TIME_DRIVE_WEEKEND = 'Кількість хвилин, що ви проводите за кермом у дні, коли ви не їдете автомобілем на роботу';
$MINUTES_DRIVE_PER = 'Кількість хвилин, що ви проводите за кермом на';
$DAYS_DRIVE_PER_MONTH = 'Кількість днів на місяць, у які ви їздите автомобілем';
$HOURS_DRIVE_PER = 'Кількість годин, що ви проводите за кермом на';
$VIRTUAL_SPEED = 'віртуальна швидкість';
$KINETIC_SPEED = 'кінетична швидкість';
$AVER_YEARLY = 'У середньому в рік';
$WORKING_TIME_MESSAGE = 'Для цілей розрахунків середня тривалість роботи вважається рівною 36 годинам на тиждень і 11 місяцям на рік';
$HOURS_TO_AFFORD_CAR = 'Кількість годин на рік, які вам потрібно відпрацювати, щоб дозволити собі мати автомобіль';
$MONTHS_TO_AFFORD_CAR = 'Кількість місяців на рік, які вам потрібно відпрацювати, щоб дозволити собі мати автомобіль';
$TOTAL_COSTS_PER_YEAR = 'Сума витрат на автомобіль у рік';
$DAYS_CAR_PAID = 'Через скільки днів, починаючи з 1 січня, буде оплачений автомобіль';

//**************************************************
//GRAPHICS
$PARCEL = 'Пакунок';
$COSTS = 'Витрати';


//****************************************************//ERROR MESSAGES
$ERROR_INVALID_INSU_VALUE = 'Недійсне значення страхової суми';
$ERROR_INSU_PERIOD = 'Вкажіть регулярність здійснення страхових внесків';

$ERROR_FUEL_CURR_DIST = 'Необхідно вказати, на основі чого робити розрахунки - гривні чи кілометри';
$ERROR_FUEL_CAR_EFF = 'Недійсне значення рівня споживання пального';
$ERROR_FUEL_PRICE = 'Недійсне значення ціни на пальне';
$ERROR_CAR_JOB = 'Вкажіть, чи ви їздите на роботу автомобілем';
$ERROR_FUEL_DIST = 'Недійсне значення відстані у кілометрах, яку ви проїздите на місяць';
$ERROR_DAYS_PER_WEEK = 'Недійсна кількість днів на тиждень';
$ERROR_DIST_HOME_WORK = 'Недійсне значення відстані у кілометрах між домом і роботою';
$ERROR_DIST_NO_JOB = "Недійсне значення відстані у кілометрах, яку ви проїздите у ті дні, коли ви не їздите автомобілем на роботу";
$ERROR_CURRENCY = 'Недійсне значення суми у гривнях на місяць';

$ERROR_DEPRECIATION_MONTH = 'Недійсне значення місяця придбання';
$ERROR_DEPRECIATION_YEAR = 'Недійсне значення року придбання';
$ERROR_DEPRECIATION_VALUE = 'Недійсне значення суми придбання';
$ERROR_DEPRECIATION_VALUE_TODAY = 'Недійсне значення вартості автомобіля на сьогодні';
$ERROR_DEPRECIATION_DATE = 'Недійсне значення дати придбання';
$ERROR_DEPRECIATION_NEW_CAR =  'Вартість не знижується, бо цей автомобіль новий';

$ERROR_CREDIT_QUESTION = 'Вкажіть, чи ви залучали фінансування на придбання автомобіля';
$ERROR_CREDIT_LOAN_VALUE = 'Недійсне значення суми фінансування';
$ERROR_CREDIT_PERIOD = 'Недійсне значення терміну кредиту, кількості внесків';
$ERROR_CREDIT_INSTALMENT = 'Недійсне значення розміру внеску';
$ERROR_CREDIT_RESIDUAL_VALUE = 'Недійсне значення остаточної вартості';

$ERROR_INSPECTION_NTIMES = 'Недійсна кількість разів';
$ERROR_INSPECTION_COSTS = 'Недійсне значення вартості техогляду';

$INVALID_AMOUNT = 'Недійсне значення суми';

$INVALID_NBR_PP = 'Недійсна кількість людей';
$ERROR_PASS_AMOUNT= 'Недійсне значення вартості місячного абонементу';

$ERROR_INCOME = 'Недійсне значення чистого доходу';
$ERROR_WEEKS_PER_YEAR = 'Недійсна кількість тижнів на рік';
$ERROR_MONTHS_PER_YEAR = 'Недійсна кількість місяців на рік';
$ERROR_HOURS_PER_WEEK = 'Недійсна кількість годин на тиждень';
$ERROR_MIN_DRIVE_HOME_JOB = 'Недійсна кількість хвилин, які ви проводите за кермом дорогою з дому на роботу';
$ERROR_MIN_DRIVE_WEEKEND = 'Недійсна кількість хвилин, які ви проводите за кермом у ті дні, коли ви не їздите автомобілем на роботу';
$ERROR_MIN_DRIVE = 'Недійсна кількість хвилин, які ви проводите за кермом';
$ERROR_DAYS_PER_MONTH = 'Недійсна кількість днів на місяць';

//FINAL RESULT

$YOUR_CAR_COSTS_YOU = 'Витрати на ваш автомобіль';
$WITH_THIS_LEVEL_OF_COSTS = 'З таким рівнем витрат вартість утримання вашого автомобіля за'; //ex: __"With this level of costs, you car during the"__ 15 months of possession....
$MONTHS_POSS = 'місяці(в) уже склала';   //ex: With this level of costs, you car during the 15 ___"months of possession has already costed"___ 14000 Euros


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