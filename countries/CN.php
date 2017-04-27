<?php

// COUNTRY: 中国
// LANGAUAGE: 中文

$COUNTRY_NAME = '中国';

//the language is according with the two-letter language code ISO 639-1
//http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

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
$CURR_CODE = 'CNY';
$INVERT_CURRENCY = true; //the best way to present currency sumbol with numbers, when true shows "10£", when false shows "£10" 
$CURR_NAME = '元';
$CURR_NAME_PLURAL = '元';
$CURR_NAME_BIG_PLURAL = '元';
$CURR_SYMBOL = '元';
$STD_DIST = '公里'; //short text version you'd like to apply
$STD_DIST_FULL = '公里';
$STD_FUEL_CALC = '升/百公里'; //text version you'd like to apply
$STD_VOLUME_SHORT = '升'; //short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)
//simple words
$WORD_PER = '每';     //ex: 4 km _per_ day
$WORDS_PER_EACH = '每个';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = '次'; //ex: 4 times per week
$DURING = '期间';   //spent in tolls 3€ per day _during_ 22 days per month
$WORD_PEOPLE = '人';   //plural, 3 _people_ 
$YES = '是';
$NO = '否';
$BUTTON_RUN = '计算'; //run calculator button 
$BUTTON_RERUN = '重新计算'; //run calculator button 
//WEB PAGE
$WEB_PAGE_TITLE = '汽车成本计算器';
$MAIN_TITLE = '汽车成本计算器';
$INITIAL_TEXT = 
'该计算器可核算出在<b>中国</b>拥有一台汽车的<b>实际成本</b>， 可准确预估拥有一台私家车最终需投入的成本。 由于各种汽车账单的时间核算不一， 因此很难弄清您在汽车上到底花了多少钱。您需按照实际情况输入参数值，另外对于车子维修或罚款类的特殊账单，建议您参考过去几年在此类项目上的支出，默认按月计算，请保持到小数点后1位。例如：家庭与公司的距离为8.7公里。';
$DISCLAIMER = "全过程<b>完全匿名</b>，不会对任何姓名、邮箱地址、数据、IP地址或任何个人信息进行永久存储。";

$HELP_PROJECT = '此服务免费且无广告!' ;
$AC_MOBILE = '汽车成本<br> 手机移动端';
$AC_SUB_HEADER = '汽车成本计算器';

//user statistics
$VISITORS = '访客';
$ONLINE = '在线';
$THIS_MONTH = '本月';
$IN_TOTAL = '总计'; //in the sense of "the website had 10000 visitors *in total*"
$USERS = '用户';
$FOR_COUNTRY = '中国'; //in the sense of "10 users filled in *for Portugal". Replace Portugal accordingly.
$IN_TOTAL = '总计'; //in the sense of "10000 users filled in *in total* the form "
$CONTACT = '联系方式';

//time words
$DAYLY = '每日';
$WEEKLY = '每周';
$MONTHLY = '每月';
$TRIMESTERLY = '每季度';
$SEMESTERLY = '半年&#8209;每年';
$YEARLY = '每年';
$MIN = '分钟';
$MINUTES = '分钟';
$HOUR = '小时';
$HOURS = '小时';
$HOUR_ABBR = 'h';
$DAY = '日'; 
$DAYS = '日'; 
$WEEK = '周'; 
$WEEKS = '周'; 
$MONTH = '月'; 
$MONTHS = '月'; 
$TWO_MONTHS = '2个月'; 
$DIST_EACH_TWO_MONTHS = '每2个月的公里数'; 
$TRIMESTER = '3个月'; 
$SEMESTER = '4个月'; 
$YEAR = '年';
$DAYS_PER_WEEK_SHORT= '日/周';
//distance
$DISTANCE = "距离";

//statistics
$AVERAGE_COSTS_PER_TYPE = '每种类型的平均月别成本';
$STATISTIC_TITLE = '汽车成本';
$DEPRECIATION_ST = '折旧';
$INSURANCE_ST = '保险';
$REP_ST = '维修';
$WASHING_ST = '清洗';
$VIRTUAL_SPEED_TITLE = '消费速度';
$KINETIC_SPEED_TITLE = '运动速度';

//calculator words
$COSTS= "成本";
$FIXED_COSTS = '固定成本';
$FIXED_COSTS_HEADER_1= '固定成本'; //capital letters
$FIXED_COSTS_HEADER_2= "与行驶距离无关，但包含维持车辆状态必须支付的费用"; 
$DAYS_PER = "天数每";
$RUNNING_COSTS = '行驶成本';
$RUNNING_COSTS_HEADER_1 = '行驶成本'; //capital letters
$RUNNING_COSTS_HEADER_2 = '与行驶距离相关的费用';
$PRIVATE_COSTS = '个人成本';
$MONTHLY_AMOUNT = '每月金额';
$RUN_CP_DIST = '每公里行驶成本'; //running costs per unit distance
$TOTAL_CP_DIST = '每公里总成本'; //total costs per unit distance
$PUBL_TRA_EQUIV= "假设您没有汽车相应产生的交通成本";
$WORD_TOTAL_CAP = '总计'; //capital word for total
$WORD_PRINT = '打印';
$WORD_DOWNLOAD_PDF = '下载生成PDF报告';
//depreciation
$DEPRECIATION = '车辆折旧费';
$AQ_DATE = '购车日期';
$COM_VALUE = '您购车时<br><i>新车的市场价值 <br>，若购买的二手车，则为您当时购车时汽车的市场价值</i>';
$COM_VALUE_TODAY = '目前汽车的市场价值<br><i>如果现在卖车, 您能卖到多少钱?</i>';
$PERIOD_OWN = '买车年限';
$FINAL_VALUE = '当前价值';
$AQ_VALUE = '购车价格';
//insurance
$INSURANCE = '汽车保险与故障保险费';
$INSURANCE_SHORT = '保险与故障保险费';
//credit
$CREDIT = '汽车贷款';
$CREDIT_PERIOD = '期限';
$CREDIT_INTERESTS = '贷款利率';
$CREDIT_INTERESTS_MONTH = '每月利息';
$CREDIT_TOTAL_INTERESTS = '利息总额';
$CREDIT_QUESTION = '购车时您使用汽车贷款了吗?';
$CREDIT_LOAN = '贷款金额:<br><i>您贷了多少钱?</i>';
$CREDIT_LOAN2 = '贷款金额';
$CREDIT_PERIOD = '贷款期限 / 分期付款数量';
$CREDIT_AVERAGE_VALUE = '每月分期付款金额';
$CREDIT_RESIDUAL_VALUE = '残值:<br><i>还贷末期，您还需要支付多少钱，或是已支付了多少钱?</i>';
$CREDIT_RESIDUAL_VALUE1 = '残值';
$CREDIT_INSTALMENT = '每月平均价值';
//inspection
$INSPECTION = '车检费 (汽车性能测试)';
$INSPECTION_SHORT = '车检';
$INSPECTION_NBMR_TIMES = '您的车做过几次车检?';
$INSPECTION_PRICE =  '每次车检的平均费用';
$EACH_ONE_DURING = '每次间隔时间'; //5 times costing 15€ *each one during* 20 months (inspection)
$TIMES_COSTING = '成本发生的次数';     //5 *times costing* 15€ each one during 20 months (inspection)
//road taxes
$ROAD_TAXES = '汽车购置税 (汽车税)';
$ROAD_TAXES_SHORT = '汽车税';
$ROAD_TAXES_VALUE = '您买车的汽车税:<br><i>上缴国家的税</i>';
//fuel
$FUEL = '燃油费';
$FUEL_DESC = '石油, 柴油, 液化石油气,电';
$FUEL_CALC = '基于以下情况的计算';
$FUEL_JOB_CALC = '假设开车去上班?';
$FUEL_JOB_CALC1 = '每周您开车去上班的天数';
$FUEL_DAYS = '每周您开车去上班的天数';
$FUEL_DIST_HOME_JOB = '从家到公司的驾驶公里数(单程)'; //$CURR_DIST=km, miles, etc.
$FUEL_DIST_HOME_JOB1 = '家到公司的公里数'; //you do 7 km between home and job
$FUEL_DIST_NO_JOB = "不开车上班时，您的平均里程数:<br><i>例如，每周末的里程数</i>";
$FUEL_DIST_NO_JOB1 = "不开车上班时，您的平均里程数"; // you do 5 km per week....
$FUEL_DIST = '您的里程数';
$FUEL_CAR_EFF = '您汽车的燃油效率';
$FUEL_PRICE = '您平均花费的燃油成本';
$FUEL_PRICE1 = '燃油平均价格';
$YOU_DRIVE_TOTTALY_AVG = '您平均驾驶'; //__You drive totally on average of__ 5 km per day
$YOU_DRIVE = '您驾驶'; //__You drive__ 5 km per day
//MAINTENANCE
$MAINTENANCE = '保养费';
$MAINTENANCE_DESC = '保养和故障保险的平均费用:<br><i>发动机油更换、滤嘴、车灯、轮胎、刹车、空调、转向定位等等。</i>';
//REPAIRS AND IMPROVEMENTS
$REP_IMPROV = '维修及改装费';
$REP_IMPROV_DESC = '维修及改装的平均费用:<br><i>汽车部件、调整、故障修复、凹痕、磕碰、上漆等等。</i>';
//PARKING
$PARKING = '停车费';
$PARKING_DESC = '停车平均费用:<br><i>在市区停车，租赁停车位，大厦、购物中心、机场、车站或火车站等内的地下或地上停车场.</i>';
//TOLLS
$TOLLS = '通行费';
$TOLLS_DESC = '平均通行费<br><i>桥、隧道、高速公路，以及去往市中心需交付的拥堵费</i>';
$TOLLS_DAY_CALC = '按天计算?';
$TOLLS_DAY_CALC1 = '每天花费的通行费';
$TOLLS_DAY_CALC_DESC = '还要仔细想想您不经常去的市郊或乡村，以及所有电子通行费单据';
//FINES
$FINES = '交通罚单';
$FINES_DESC = '交通罚单平均费用:<br><i>想想近几年您花费的所有交通罚单 (违规停车、超速行驶、驾驶通话等等。)</i>';
//WASHING
$WASHING = '清洗费';
$WASHING_DESC = '平均洗车费:<br><i>洗车行或任何地方</i>';
//TOTAL
$TOTAL_FIXED = '总计 - 固定成本';
$TOTAL_FIXED_DESCR = "与驾驶距离无关，但即使不用车也必须支付的费用";
$TOTAL_FIXED_DESCR2 = '折旧、保险、贷款利息、税、车检，以及50%的停车费和保养费';
$TOTAL_VARIABLE = '总计 - 行驶成本';
$TOTAL_VARIABLE_DESCR = '与驾驶距离相关的费用';
$TOTAL_VARIABLE_DESCR2 = '燃油费、修理及改装费、停车费 (假设只有在用车的时候才支付)、通行费、交通罚单、清洗费，以及50%的保养费';
//EXTRA DATA
$EXTRA_DATA = '附加数据';
$EXTRA_DATA1 = '附加数据';
$EXTRA_DATA_PUBLIC_TRANSP = '公共交通';
$EXTRA_DATA_FAMILY_NBR = '您的家庭成员中有多少人年龄超过4岁(包括您自己)';
$EXTRA_DATA_PRICE_PASS = "平时每人的公共交通月票成本？<br><i>如果不考虑公共交通，请输入0</i>";
$EXTRA_DATA_INCOME = "收入";
$EXTRA_DATA_INCOME_QUESTION = '您净收入是多少?';
$EXTRA_DATA_WORKING_TIME = '工作时长';
$EXTRA_DATA_WORKING_TIME_QUESTION = '您有工作或是有有收入的职业吗?';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = '驾驶时间';
$EXTRA_DATA_TIME_QUESTION1 = '您从家到公司需要开车几分钟? (单程)';
$EXTRA_DATA_TIME_QUESTION2 = '您不开车上班时，您驾驶时间是多少分钟?';
$EXTRA_DATA_TIME_QUESTION3 = '您开车几分钟?';
//PUBLIC TRANSPORTS
$PUB_TRANS_TEXT = '您家庭日常生活中的公共交通';
$FAM_NBR = '您家庭成员中，有多少人年龄超过4岁';
$PERSON_OR_PEOPLE = '人';
$PASS_MONTH_AVG = '每人月票平均金额';
$OTHER_PUB_TRANS = '其他公共交通';
$OTHER_PUB_TRANS_DESC = "其他公共交通费以外的成本，例如去外地的长途火车或汽车成本";
$TAXI_DESL = "打的";
$ON_TAXI_PAYING = "的士费"; //ex: 4 km __on taxi paying__ 5€ per km
//VIRTUAL SPEED
$FINANCIAL_EFFORT = '经济情况';
$NET_INCOME_PER = '净收入';
$AVERAGE_NET_INCOME_PER = '平均净收入';
$NUMBER_OF_MONTHS = '每年有收入月份数';
$NUMBER_OF_WEEKS = '每年有收入周数';
$NUMBER_OF_HOURS= '每周有收入小时数';
$HOURS_PER = '小时每';
$MONTHS_PER = '月每';
$AVERAGE_WORKING_HOURS_PER = '平均工作小时每';
$WORKING_HOURS_PER = '工作小时每';
$DIST_HOME_JOB = '从家开车去工作';
$DAYS_DRIVE_JOB = '每周开车去工作的天数';
$DIST_JORNEY_WEEKEND = '不开车上班的时候您的驾驶情况';
$AVERAGE_DIST_PER_WEEK = '您每周驾驶的平均距离';
$YOU_DRIVE_PER = '您开车';
$MINUTES_HOME_JOB = '开车上班需要多少分钟';
$DAYS_DRIVE_TO_JOB = '每周您开车去上班的天数';
$TIME_DRIVE_WEEKEND = '您不开车上班时，您驾驶时间是多少分钟';
$MINUTES_DRIVE_PER = '您开车多少分钟每';
$DAYS_DRIVE_PER_MONTH = '每月您开车的天数';
$HOURS_DRIVE_PER = '您开车多少小时每';
$VIRTUAL_SPEED = '消费速度';
$KINETIC_SPEED = '运动速度';
$AVER_YEARLY = '年均';
$WORKING_TIME_MESSAGE = '计算时默认每周平均工作36小时，每年平均工作11个月。';
$HOURS_TO_AFFORD_CAR = '您每年需要工作多少小时才能供一辆车';
$MONTHS_TO_AFFORD_CAR = '您每年需要工作多少个月才能供一辆车';
$TOTAL_COSTS_PER_YEAR = '汽车每年的总成本';
$DAYS_CAR_PAID = '1月1日后，需要多久才能还清车款';
//**************************************************
//GRAPHICS
$PARCEL = '区分';
$COSTS = '成本';
//****************************************************//ERROR MESSAGES
$ERROR_INVALID_INSU_VALUE = '保险金额无效';
$ERROR_INSU_PERIOD = '输入保险周期';
$ERROR_FUEL_CURR_DIST = '必须选择按照元还是按照公里进行计算';
$ERROR_FUEL_CAR_EFF = '燃油效率金额无效';
$ERROR_FUEL_PRICE = '燃油价格无效';
$ERROR_CAR_JOB = '请确认您是否开车上班';
$ERROR_FUEL_DIST = '每月里程数无效';
$ERROR_DAYS_PER_WEEK = '每周工作天数无效';
$ERROR_DIST_HOME_WORK = '家和公司之间公里数无效';
$ERROR_DIST_NO_JOB = "不开车上班时驾驶的公里数无效";
$ERROR_CURRENCY = '每月花费金额无效';
$ERROR_DEPRECIATION_MONTH = '购买月份无效';
$ERROR_DEPRECIATION_YEAR = '购买年份无效';
$ERROR_DEPRECIATION_VALUE = '购买金额无效';
$ERROR_DEPRECIATION_VALUE_TODAY = '当前汽车价值无效';
$ERROR_DEPRECIATION_DATE = '购买日期无效';
$ERROR_DEPRECIATION_NEW_CAR =  '折旧不适用，因为汽车是全新的';
$ERROR_CREDIT_QUESTION = '请确认您是否使用汽车贷款';
$ERROR_CREDIT_LOAN_VALUE = '贷款金额无效';
$ERROR_CREDIT_PERIOD = '贷款期限、贷款期数无效';
$ERROR_CREDIT_INSTALMENT = '分期付款金额无效';
$ERROR_CREDIT_RESIDUAL_VALUE = '残值无效';
$ERROR_INSPECTION_NTIMES = '无效的次数';
$ERROR_INSPECTION_COSTS = '车检费无效';
$INVALID_AMOUNT = '金额无效';
$INVALID_NBR_PP = '人数无效';
$ERROR_PASS_AMOUNT= '月票金额无效';
$ERROR_INCOME = '净收入无效';
$ERROR_WEEKS_PER_YEAR = '每年工作周数无效';
$ERROR_MONTHS_PER_YEAR = '每年工作月份数无效';
$ERROR_HOURS_PER_WEEK = '每周工作小时数无效';
$ERROR_MIN_DRIVE_HOME_JOB = '开车上班的分钟数无效';
$ERROR_MIN_DRIVE_WEEKEND = '不开车上班时您驾驶的分钟数无效';
$ERROR_MIN_DRIVE = '驾驶分钟数无效';
$ERROR_DAYS_PER_MONTH = '每月天数无效';
//FINAL RESULT
$YOUR_CAR_COSTS_YOU = '成本核算结果';
$WITH_THIS_LEVEL_OF_COSTS = '基于这种成本开销，您的车在'; //ex: __"With this level of costs, you car during the"__ 15 months of possession....
$MONTHS_POSS = '个月内已经花费';   //ex: With this level of costs, you car during the 15 ___"months of possession has already costed"___ 14000 Euros
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
$STD_ROAD_TAX = '0'; //price paid for road taxes per year
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