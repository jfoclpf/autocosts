<?php

// COUNTRY: 日本
// LANGAUAGE: 日本語

$COUNTRY_NAME = '日本';

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
$CURR_CODE = 'JPY';
$CURR_NAME = '円';
$CURR_NAME_PLURAL = '円';
$CURR_NAME_BIG_PLURAL = '円';
$CURR_SYMBOL = '¥';
$STD_DIST = 'km'; //short text version you'd like to apply
$STD_DIST_FULL = 'km';
$STD_FUEL_CALC = 'km/L'; //text version you'd like to apply
$STD_VOLUME_SHORT = 'L'; //short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)
//simple words
$WORD_PER = '毎';     //ex: 4 km _per_ day
$WORDS_PER_EACH = 'それぞれに';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = '回数'; //ex: 4 times per week
$DURING = '期間';   //spent in tolls 3€ per day _during_ 22 days per month
$WORD_PEOPLE = '人';   //plural, 3 _people_ 
$YES = 'はい';
$NO = 'いいえ';
$BUTTON_RUN = '運行'; //run calculator button 
$BUTTON_RERUN = '再実行'; //run calculator button 
//WEB PAGE
$WEB_PAGE_TITLE = '自動車原価計算機';
$MAIN_TITLE = '自動車原価計算機';
$INITIAL_TEXT = 
"この計算機によって見つけること <b>本当のコスト</b> 自動車を持つ <b>日本で</b>. これは正式的にあなたが自動車を買うとき、本当に必要な費用の合理的な計算を提供します。
モーター勘定書が一年の違う時点に入るので、自動車がかかった総額はよく計算しにくいです。入力値を現実的に考えてください。予想外の勘定書について、たとえば、事故の修理費あるいは罰金、過去の数年間で、それらの方面にはいくらかかったかを考えてください。これらの手落ちが毎月によって計算します。ドット記号と十進法を使ってください。たとえば、自宅から職場からは8.7マイルだ。";
$DISCLAIMER = "この計算機は<b>完全に匿名だ</b>,名前、電子メール、クッキー、IPアドレス、その他の個人情報を要求したり、永続的に保存したりすることはありません。";

$HELP_PROJECT = 'これは無料サービスで広告がありません!' ;
$AC_MOBILE = '自動料金<br>移動設備のため';
$AC_SUB_HEADER = '自動車原価計算機';

//user statistics
$VISITORS = '訪問者';
$ONLINE = 'オンライン';
$THIS_MONTH = '今月';
$IN_TOTAL = '合計'; //in the sense of "the website had 10000 visitors *in total*"
$USERS = '使用者';
$FOR_COUNTRY = '日本'; //in the sense of "10 users filled in *for Portugal". Replace Portugal accordingly.
$IN_TOTAL = '合計'; //in the sense of "10000 users filled in *in total* the form "
$CONTACT = '接触';

//time words
$DAYLY = '毎日';
$WEEKLY = '毎週';
$MONTHLY = '毎月';
$TRIMESTERLY = '四分の一毎に';
$SEMESTERLY = '半分&#8209;毎年';
$YEARLY = '毎年';
$MIN = 'min';
$MINUTES = '分';
$HOUR = '一時間';
$HOURS = '何時間';
$HOUR_ABBR = 'h';
$DAY = '一日'; 
$DAYS = '何日'; 
$WEEK = '一週'; 
$WEEKS = '何週'; 
$MONTH = '月'; 
$MONTHS = '何月'; 
$TWO_MONTHS = '二ヶ月'; 
$DIST_EACH_TWO_MONTHS = '二ヶ月ごとの道のり'; 
$TRIMESTER = '三ヶ月'; 
$SEMESTER = '半年'; 
$YEAR = '一年';
$DAYS_PER_WEEK_SHORT= '日/週';
//distance
$DISTANCE = "距離";

//statistics
$AVERAGE_COSTS_PER_TYPE = '一つずつのタイプの平均月額費用';
$STATISTIC_TITLE = '自動車コストの目的';
$DEPRECIATION_ST = '減価償却費';
$INSURANCE_ST = '保険';
$REP_ST = '修理料';
$WASHING_ST = '洗浄料';
$VIRTUAL_SPEED_TITLE = '消費者のスピード';
$KINETIC_SPEED_TITLE = '運動スピード';

//calculator words
$COSTS= "コスト";
$FIXED_COSTS = '常設のコスト';
$FIXED_COSTS_HEADER_1= '常設のコスト'; //capital letters
$FIXED_COSTS_HEADER_2= "それらは移動距離が決定するものではありません。それに運転する予定の車には支払わなければならないです。"; 
$DAYS_PER = "毎日";
$RUNNING_COSTS = '運転コスト';
$RUNNING_COSTS_HEADER_1 = '運転コスト'; //capital letters
$RUNNING_COSTS_HEADER_2 = 'それらは移動距離が決定するものです。';
$PRIVATE_COSTS = '個人的コスト';
$MONTHLY_AMOUNT = '月額';
$RUN_CP_DIST = '一マイルごとの運転コスト'; //running costs per unit distance
$TOTAL_CP_DIST = '一マイル全部のコスト'; //total costs per unit distance
$PUBL_TRA_EQUIV= "車を所有していないと考えると、同等の輸送費";
$WORD_TOTAL_CAP = '総額'; //capital word for total
$WORD_PRINT = 'プリント';
$WORD_DOWNLOAD_PDF = 'レポートのダウンロード';
//depreciation
$DEPRECIATION = '車両の減価償却費';
$AQ_DATE = '車を取得する日付';
$COM_VALUE = '車を買うとき、この車の商業的価値<br><i>新しいものとしたら、車の価格<br>中古のものとしたら、車の商業的価値はあなたがこれを入手したときのものです。</i>';
$COM_VALUE_TODAY = '車の今日の商業的価値<br><i>今売れば、いくらがもらえますか?</i>';
$PERIOD_OWN = '占有期間';
$FINAL_VALUE = '今の価値';
$AQ_VALUE = '所得価額';
//insurance
$INSURANCE = '自動車保険と故障カバー';
$INSURANCE_SHORT = '自動車保険と故障カバー';
//credit
$CREDIT = '車ファイナンス';
$CREDIT_PERIOD = '期間';
$CREDIT_INTERESTS = 'ローンの利潤';
$CREDIT_INTERESTS_MONTH = 'マイ月の利潤';
$CREDIT_TOTAL_INTERESTS = '全部の利潤';
$CREDIT_QUESTION = '車ファイナンスを使って車を入手したことがありますか?';
$CREDIT_LOAN = 'ファイナンス額:<br><i>いくら借りたのですか?</i>';
$CREDIT_LOAN2 = 'ファイナンス額';
$CREDIT_PERIOD = 'クレジット期間/クレジットの分割払い金額';
$CREDIT_AVERAGE_VALUE = '各分割払いの平均金額';
$CREDIT_RESIDUAL_VALUE = '残余価値:<br><i>クレジット期間の最後, まだ支払う必要のある額と支払った額はいくらですか?</i>';
$CREDIT_RESIDUAL_VALUE1 = '残余価値';
$CREDIT_INSTALMENT = '月平均値';
//inspection
$INSPECTION = '車両検査（MOTテスト）';
$INSPECTION_SHORT = '検査';
$INSPECTION_NBMR_TIMES = '車両検査を何回したことがありますか?';
$INSPECTION_PRICE =  '各車両検査の平均費用';
$EACH_ONE_DURING = 'それぞれの間に'; //5 times costing 15€ *each one during* 20 months (inspection)
$TIMES_COSTING = '回数によるコスト';     //5 *times costing* 15€ each one during 20 months (inspection)
//road taxes
$ROAD_TAXES = '自動車消費税（自動車税）';
$ROAD_TAXES_SHORT = '自動車税';
$ROAD_TAXES_VALUE = 'あなたの自動車税:<br><i>政府への支払い</i>';
//fuel
$FUEL = '燃料';
$FUEL_DESC = 'ガソリン、ディーゼル、LPG、電気';
$FUEL_CALC = '計算基準';
$FUEL_JOB_CALC = '車での通勤を考えれば?';
$FUEL_JOB_CALC1 = '毎週車で通勤する日数';
$FUEL_DAYS = '毎週車で通勤する日数';
$FUEL_DIST_HOME_JOB = '自宅から職場まで運転する距離（片道のみ）'; //$CURR_DIST=km, miles, etc.
$FUEL_DIST_HOME_JOB1 = '自宅から職場までの距離'; //you do 7 km between home and job
$FUEL_DIST_NO_JOB = "車で通勤しない日々、平均運転距離:<br><i>たとえば頻度は毎週</i>";
$FUEL_DIST_NO_JOB1 = "車で通勤しない日々の平均距離"; // you do 5 km per week....
$FUEL_DIST = '運転する距離';
$FUEL_CAR_EFF = '車の燃費';
$FUEL_PRICE = '燃料がかかった平均費用';
$FUEL_PRICE1 = '燃料の平均価格';
$YOU_DRIVE_TOTTALY_AVG = 'ある期間で平均運転総距離'; //__You drive totally on average of__ 5 km per day
$YOU_DRIVE = 'あなたが運転します'; //__You drive__ 5 km per day
//MAINTENANCE
$MAINTENANCE = 'メンテナンス';
$MAINTENANCE_DESC = 'メンテナンスと故障カバーの平均コスト:<br><i>エンジンオイル交換、フィルター、ライト、タイヤ、ブレーキ、空調、ステアリングアラインメントなど。</i>';
//REPAIRS AND IMPROVEMENTS
$REP_IMPROV = '修理と改善';
$REP_IMPROV_DESC = '修理と改善の平均コスト:<br><i>車の部品、修正、誤動作修理、凹み、衝突、チューニングなど。</i>';
//PARKING
$PARKING = '駐車';
$PARKING_DESC = '駐車の平均コスト:<br><i>町の駐車時間測定器、駐車空間を借りること、公衆の地下あるいは地上の駐車場、ショピングセンター、空港、バス停、鉄道駅あるいはほかのインフラストラクチャ。</i>';
//TOLLS
$TOLLS = '通行料';
$TOLLS_DESC = '平均通行料<br><i>橋、トンネル、高速道路、市内中心部への渋滞料金</i>';
$TOLLS_DAY_CALC = '計算は日々よりですか?';
$TOLLS_DAY_CALC1 = '毎日通行料の出費';
$TOLLS_DAY_CALC_DESC = '町の外や田舎へのまれな旅行、あるいはあらゆる種類の電子料金収受書の領収書のことも考えてください。';
//FINES
$FINES = '交通チケット';
$FINES_DESC = '交通チケットの平均費用:<br><i>近年、どのような種類の交通チケット（違法駐車、速度制限違反、携帯電話など）でどれくらい支払ったと思いますか？</i>';
//WASHING
$WASHING = '洗濯とクリーニング';
$WASHING_DESC = '平均洗浄料とバレット請求書:<br><i>サービスステーションやその他の場所で</i>';
//TOTAL
$TOTAL_FIXED = '合計 - 常設コスト';
$TOTAL_FIXED_DESCR = "移動距離に依存しないコストと車が使われなくても支払わなければならない費用 ";
$TOTAL_FIXED_DESCR2 = '減価償却費、保険金、金融利息、税金、検査、駐車場とメンテナンスの50％';
$TOTAL_VARIABLE = '合計 - 使用コスト';
$TOTAL_VARIABLE_DESCR = '運転することより生じるコスト';
$TOTAL_VARIABLE_DESCR2 = '燃料、修理と改善、駐車場（車を使うときにのみ支払うことを考えてください）、通行料、交通チケット、洗浄、およびメンテナンスの50％';
//EXTRA DATA
$EXTRA_DATA = '追加データ';
$EXTRA_DATA1 = '追加データ';
$EXTRA_DATA_PUBLIC_TRANSP = '公共交通機関';
$EXTRA_DATA_FAMILY_NBR = '家族の中で４才以上のは何人いますか（あなた自分も含めます）';
$EXTRA_DATA_PRICE_PASS = "日常生活では、一人ずつ毎月の公共交通機関定期券の平均費用いくらですか <br><i>公共交通機関を選択しない人、インサート 0</i>";
$EXTRA_DATA_INCOME = "収入";
$EXTRA_DATA_INCOME_QUESTION = '純収入はいくらですか?';
$EXTRA_DATA_WORKING_TIME = '労働時間';
$EXTRA_DATA_WORKING_TIME_QUESTION = '仕事がありますか？職業はなんですか?';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = '運転がかかる時間';
$EXTRA_DATA_TIME_QUESTION1 = '職場まで運転すれば何分かかりますか? (片道のみ)';
$EXTRA_DATA_TIME_QUESTION2 = '通勤が運転しない日々、何分運転しますか?';
$EXTRA_DATA_TIME_QUESTION3 = '何分くらい運転しますか?';
//PUBLIC TRANSPORTS
$PUB_TRANS_TEXT = '家族の日常生活で使う公共交通機関';
$FAM_NBR = '家族の中で４才以上の人数';
$PERSON_OR_PEOPLE = '人数';
$PASS_MONTH_AVG = '一人ずつ毎月の公共交通機関定期券の平均費用';
$OTHER_PUB_TRANS = 'ほかの公共交通機関';
$OTHER_PUB_TRANS_DESC = "他の公共交通機関に残った金額、例えば、住宅地域意外の長距離の列車やバス";
$TAXI_DESL = "タクシー";
$ON_TAXI_PAYING = "タクシーの料金"; //ex: 4 km __on taxi paying__ 5€ per km
//VIRTUAL SPEED
$FINANCIAL_EFFORT = 'ファイナンス努力';
$NET_INCOME_PER = '純収入ごとに';
$AVERAGE_NET_INCOME_PER = '平均純収入ごと';
$NUMBER_OF_MONTHS = '毎年収入の中で毎月の収入';
$NUMBER_OF_WEEKS = '毎年収入の中で毎週の収入';
$NUMBER_OF_HOURS= '毎週収入の中で一時間ごとの';
$HOURS_PER = '毎時間';
$MONTHS_PER = '毎月';
$AVERAGE_WORKING_HOURS_PER = '平均労働時間';
$WORKING_HOURS_PER = '労働時間毎に';
$DIST_HOME_JOB = '自宅から職場まで運転する';
$DAYS_DRIVE_JOB = '毎週運転で通勤する日数う';
$DIST_JORNEY_WEEKEND = '車で通勤していない日に運転する状況';
$AVERAGE_DIST_PER_WEEK = '毎週平均の運転時間';
$YOU_DRIVE_PER = '運転毎に';
$MINUTES_HOME_JOB = '自宅から職場まで運転する分';
$DAYS_DRIVE_TO_JOB = '毎週運転通勤の日数';
$TIME_DRIVE_WEEKEND = '車で通勤していない日に運転する分';
$MINUTES_DRIVE_PER = '毎回運転の分';
$DAYS_DRIVE_PER_MONTH = '毎月運転する日数';
$HOURS_DRIVE_PER = '毎回運転する時間';
$VIRTUAL_SPEED = '消費者スピード';
$KINETIC_SPEED = '運動スピード';
$AVER_YEARLY = '年平均';
$WORKING_TIME_MESSAGE = '計算では、週36時間、年11ヶ月の平均労働時間が考慮されていました';
$HOURS_TO_AFFORD_CAR = '車を買うために働く必要のある年当たりの時間';
$MONTHS_TO_AFFORD_CAR = '車を買うために働く必要のある月当たりの時間';
$TOTAL_COSTS_PER_YEAR = '自動車の年間総費用';
$DAYS_CAR_PAID = '1月1日以降、車の費用が支払われたのは何日ですか';
//**************************************************
//GRAPHICS
$PARCEL = '小包';
$COSTS = 'コスト';
//****************************************************//ERROR MESSAGES
$ERROR_INVALID_INSU_VALUE = '無効な保険金額';
$ERROR_INSU_PERIOD = '保険の期間を挿入します';
$ERROR_FUEL_CURR_DIST = 'ポンドまたはマイルに基づいて計算を行うことが欲しいナラ、参照する必要があります';
$ERROR_FUEL_CAR_EFF = '無効な燃費額';
$ERROR_FUEL_PRICE = '無効な燃料価額';
$ERROR_CAR_JOB = '車を職場に運転していくなら明記してください';
$ERROR_FUEL_DIST = '毎月無効な運転距離';
$ERROR_DAYS_PER_WEEK = '毎週無効な運転日数';
$ERROR_DIST_HOME_WORK = '自宅から職場まで無効な運転距離';
$ERROR_DIST_NO_JOB = "運転通勤しない日々の無効な距離";
$ERROR_CURRENCY = '毎月の無効なポンド';
$ERROR_DEPRECIATION_MONTH = '無効な所得月数';
$ERROR_DEPRECIATION_YEAR = '無効な所得年数';
$ERROR_DEPRECIATION_VALUE = '無効な所得額';
$ERROR_DEPRECIATION_VALUE_TODAY = '今日の無効な車両価値';
$ERROR_DEPRECIATION_DATE = '無効な所得の日付';
$ERROR_DEPRECIATION_NEW_CAR =  '車両が新しいなら減価償却は適用されません';
$ERROR_CREDIT_QUESTION = '自動車ファイナンスを使用した場合は参照してください';
$ERROR_CREDIT_LOAN_VALUE = '無効な金額';
$ERROR_CREDIT_PERIOD = '無効なクレジット期間、分割払いの数';
$ERROR_CREDIT_INSTALMENT = '無効な分割払いの金額';
$ERROR_CREDIT_RESIDUAL_VALUE = '無効な残余価値';
$ERROR_INSPECTION_NTIMES = '無効な回数';
$ERROR_INSPECTION_COSTS = '無効な検査コスト';
$INVALID_AMOUNT = '無効な金額';
$INVALID_NBR_PP = '無効な人数';
$ERROR_PASS_AMOUNT= '毎月無効なチケットの金額';
$ERROR_INCOME = '無効な純収入';
$ERROR_WEEKS_PER_YEAR = '毎年無効な週数';
$ERROR_MONTHS_PER_YEAR = '毎年無効な月数';
$ERROR_HOURS_PER_WEEK = '毎週無効な時間数';
$ERROR_MIN_DRIVE_HOME_JOB = '自宅から職場まで運転する無効な分';
$ERROR_MIN_DRIVE_WEEKEND = '運転通勤していない運転する日々に無効な分';
$ERROR_MIN_DRIVE = '無効な運転する分';
$ERROR_DAYS_PER_MONTH = '毎月無効な日数';
//FINAL RESULT
$YOUR_CAR_COSTS_YOU = '車のコスト';
$WITH_THIS_LEVEL_OF_COSTS = '交通機関がこのレベルでは'; //ex: __"With this level of costs, you car during the"__ 15 months of possession....
$MONTHS_POSS = '所有する月にかかった費用';   //ex: With this level of costs, you car during the 15 ___"months of possession has already costed"___ 14000 Euros
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