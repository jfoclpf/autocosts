<?php
// COUNTRY: TÜRKİYE
// LANGAUAGE: TÜRKÇE
//***********************************************
//											   **
//      Translation for AUTOCOSTS.INFO          **
//      the automobile costs calculator		   **
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
$CURR_CODE = 'TRY';
$CURR_NAME = 'Lira';
$CURR_NAME_PLURAL = 'Lira';
$CURR_NAME_BIG_PLURAL = 'LIRA';
$CURR_SYMBOL = '&#8378;';
$STD_DIST = 'km'; //short text version you'd like to apply
$STD_DIST_FULL = 'kilometre';
$STD_FUEL_CALC = '1/100km'; //text version you'd like to apply
$STD_VOLUME_SHORT = 'litre'; //short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)
//simple words
$WORD_PER = 'her';     //ex: 4 km _per_ day
$WORDS_PER_EACH = 'her bir';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = 'kere'; //ex: 4 times per week
$DURING = 'boyunca';   //spent in tolls 3€ per day _during_ 22 days per month
$WORD_PEOPLE = 'kişi';   //plural, 3 _people_ 
$YES = 'evet';
$NO = 'hayır';
$BUTTON_RUN = 'Çalıştır'; //run calculator button 
$BUTTON_RERUN = 'Tekrar çalıştır'; //run calculator button 
//WEB PAGE
$WEB_PAGE_TITLE = 'Otomobil masraf hesaplayıcı';
$MAIN_TITLE = 'OTOMOBİL MASRAF HESAPLAYICI';
$INITIAL_TEXT = 
"Bu hesaplayıcı <b>Türkiye’de</b> bir otomobil sahibi olmanın <b>gerçek maliyetini</b> görmenize olanak sağlayacaktır. Araç sahibi olmak için gerçekte ne kadar harcamanız gerektiği konusunda size genellikle iyi bir tahmin sunar. Araç ödemeleri ve harcamaları yıl boyunca değişik zamanlarda yapıldığından, aracınıza yaptığınız toplam masrafı doğru bir şekilde anlamak genellikle zordur. <br> <br> Girdiğiniz değerlerde gerçekçi olun. Tamir ve cezalar gibi beklenmedik harcamalar için son birkaç yıl içinde bu gibi kalemlere ne kadar harcamış olduğunuzu düşünün. Bu değerlerin aylık olarak hesaplandığı varsayılmaktadır. Ondalık sayılar için nokta sembolünü kullanın, örneğin ev ile iş arası <span style=\"color:rgb(255,0,0);\">8.7</span> kilometre.<br>";
$HELP_PROJECT = 'Bu, reklam almayan ücretsiz bir hizmettir!'; 
$AC_MOBILE = 'AUTOCOSTS<br>mobil cihazlar için'; 
$AC_DOMAIN = 'AUTOCOSTS.INFO';
$AC_SUB_HEADER = 'OTOMOBİL MASRAF HESAPLAYICI';

//time words 
$DAYLY = 'günlük'; 
$WEEKLY = 'haftalık'; 
$MONTHLY = 'aylık'; 
$TRIMESTERLY = 'üç aylık'; 
$SEMESTERLY = 'altı aylık'; 
$YEARLY = 'yıllık';
$MIN = 'dk';
$MINUTES = 'dakika';
$HOUR = 'saat';
$HOURS = 'saat';
$HOUR_ABBR = 's';
$DAY = 'gün'; 
$DAYS = 'gün'; 
$WEEK = 'hafta'; 
$WEEKS = 'hafta'; 
$MONTH = 'ay'; 
$MONTHS = 'ay'; 
$TWO_MONTHS = 'iki ay'; 
$DIST_EACH_TWO_MONTHS = 'her iki ay için kilometre'; 
$TRIMESTER = 'üç ay'; 
$SEMESTER = 'altı ay'; 
$YEAR = 'yıl';
$DAYS_PER_WEEK_SHORT= 'gün/hafta';
//distance
$DISTANCE = "Mesafe";

//statistics
$AVERAGE_COSTS_PER_TYPE = 'Cinsine bağlı olan ortalama aylık maliyeti';
$COUNTRY_NAME = 'Türkiye';
$STATISTIC_TITLE = 'otomobil maliyetleri';
$DEPRECIATION_ST = 'Amortisman';
$INSURANCE_ST = 'Sigorta';
$REP_ST = 'Tamirat';
$WASHING_ST = 'Yıkama';
$VIRTUAL_SPEED_TITLE = 'Fiili hız';
$KINETIC_SPEED_TITLE = 'Kinetik hız';

//calculator words 
$COSTS= "Masraflar"; 
$FIXED_COSTS = 'Sabit masraflar'; 
$FIXED_COSTS_HEADER_1= 'SABİT MASRAFLAR'; //capital letters  
$FIXED_COSTS_HEADER_2= "Kat edilen mesafeye bağlı olmayan ve kişinin, aracın kullanıma hazır olabilmesini sağlamak için yapması gereken masraflar"; 
$RUNNING_COSTS = 'Kullanım masrafları'; 
$RUNNING_COSTS_HEADER_1 = 'KULLANIM MASRAFLARI'; //capital letters 
$RUNNING_COSTS_HEADER_2 = 'Kat edilen mesafeye bağlı olan masraflar';
$PRIVATE_COSTS = 'Özel masraflar'; 
$MONTHLY_AMOUNT = 'Aylık tutar'; 
$RUN_CP_DIST = 'Kilometre başına kullanım masrafı'; //running costs per unit distance 
$TOTAL_CP_DIST = 'Kilometre başına toplam masraf'; //total costs per unit distance  
$PUBL_TRA_EQUIV= "Aracınızın olmadığı düşünüldüğünde harcayacağınız ulaşım masrafları"; 
$WORD_TOTAL_CAP = 'TOPLAM'; //capital word for total
$WORD_PRINT = 'Yazdır';
$WORD_DOWNLOAD_PDF = 'PDF raporunu indir';
//depreciation 
$DEPRECIATION = 'Aracın amortismanı'; 
$AQ_DATE = 'Aracın satın alınma tarihi'; 
$COM_VALUE = 'Aracın satın alım tarihindeki ticari değeri <br><i>yeniyse, araca ödediğiniz tutar <br>kullanılmışsa, aracın satın aldığınız tarihteki ticari değeri</i>'; 
$COM_VALUE_TODAY = 'Aracın bugünkü ticari değeri<br><i>aracınızı bugün satacak olsanız ne kadar eder?</i>'; 
$PERIOD_OWN = 'Sahip olunan zaman aralığı'; 
$FINAL_VALUE = 'Mevcut değer'; 
$AQ_VALUE = 'Satın alma değeri';
//insurance 
$INSURANCE = 'Araç sigortası ve kasko'; 
$INSURANCE_SHORT = 'Sigorta ve arıza teminatı';
//credit 
$CREDIT = 'Araç finansmanı'; 
$CREDIT_PERIOD = 'Süre'; 
$CREDIT_INTERESTS = 'Kredi faizi'; 
$CREDIT_INTERESTS_MONTH = 'Faize harcanan aylık tutar'; 
$CREDIT_TOTAL_INTERESTS = 'Ödenen faizin toplam miktarı'; 
$CREDIT_QUESTION = 'Aracı satın almak için araç kredisi kullandınız mı?';  
$CREDIT_LOAN = 'Kredi miktarı:<br><i>Ne kadar borç aldınız?</i>'; 
$CREDIT_LOAN2 = 'Kredi miktarı'; 
$CREDIT_PERIOD = 'Kredi periyodu / taksit sayısı'; 
$CREDIT_AVERAGE_VALUE = 'Her bir taksidin ortalama tutarı'; 
$CREDIT_RESIDUAL_VALUE = 'Kalıntı değer:<br><i>Kredi süresi sonunda hala ödemeniz gereken veya ödemiş olduğunuz tutar ne kadar?</i>'; 
$CREDIT_RESIDUAL_VALUE1 = 'Kalıntı değer'; 
$CREDIT_INSTALMENT = 'Aylık ortalama değer';
//inspection 
$INSPECTION = 'Araç muayenesi'; 
$INSPECTION_SHORT = 'Muayene'; //short term or acronym used for vehicle inspection
$INSPECTION_NBMR_TIMES = 'Aracınızı kaç kere araç muayenesine götürdünüz?'; 
$INSPECTION_PRICE =  'Her bir araç muayenesinin ortalama maliyeti'; 
$EACH_ONE_DURING = 'süresi'; //5 times costing 15€ *each one during* 20 months (inspection) 
$TIMES_COSTING = 'kere maliyeti';     //5 *times costing* 15€ each one during 20 months (inspection)
//road taxes 
$ROAD_TAXES = 'Motorlu Taşıtlar Vergisi (varsa, Otomobil vergileri)'; 
$ROAD_TAXES_SHORT = 'Araba Vergisi';  
$ROAD_TAXES_VALUE = 'Aracınıza sahip olmak için ödediğiniz araba vergileri:<br><i>devlete yapılan ödeme</i>';
//fuel 
$FUEL = 'Yakıt'; 
$FUEL_DESC = 'Gaz, dizel, elektrik'; 
$FUEL_CALC = 'Lütfen hesaplama yapılırken baz alınacak seçeneği işaretleyiniz'; 
$FUEL_JOB_CALC = 'İşe araba ile mi gidiyorsunuz?'; 
$FUEL_JOB_CALC1 = 'Her hafta işe araba ile gittiğiniz gün sayısı'; 
$FUEL_DAYS = 'Her hafta işe araba ile gittiğiniz gün(ler)'; 
$FUEL_DIST_HOME_JOB = 'Ev ile iş arasında araba ile kat ettiğiniz kilometre miktarı (tek yön)'; 
//$CURR_DIST=km, miles, etc. 
$FUEL_DIST_HOME_JOB1 = 'ev ile iş yeri arası kilometre'; 
//you drive 7 miles between home and your job 
$FUEL_DIST_NO_JOB = "Arabanızı işyerine götürmediğiniz günlerde kat ettiğiniz ortalama kilometre miktarı:<br><i>örneğin haftasonları</i>"; 
$FUEL_DIST_NO_JOB1 = "arabanızı işyerine götürmediğiniz günlerde kat ettiğiniz ortalama kilometre miktarı"; // you do 5 miles per week.... 
$FUEL_DIST = 'Kat ettiğiniz kilometre'; 
$FUEL_CAR_EFF = 'Aracınızın yakıt tüketimi'; 
$FUEL_PRICE = 'Yakıt/gaz için ödediğiniz ortalama tutar'; 
$FUEL_PRICE1 = 'Ortalama yakıt fiyatı';  
$YOU_DRIVE_TOTTALY_AVG = 'Ortalama kat edilen toplam kilometre'; //__You drive on average a total of __ 5 miles per day 
$YOU_DRIVE = 'Kat edersiniz'; //__You drive__ 5 miles per day
//MAINTENANCE 
$MAINTENANCE = 'Bakım '; 
$MAINTENANCE_DESC = 'Bakım ve arıza sigortasının ortalama maliyeti:<br><i>motor yağ değişimi, filtreler, lambalar, lastikler, frenler, klima, direksiyon ayarı, v.b.</i>';
//REPAIRS AND IMPROVEMENTS 
$REP_IMPROV = 'Tamir ve iyileştirmeler'; 
$REP_IMPROV_DESC = 'Bakım ve arıza tamir ve iyileştirmeler:<br><i>araba parçaları, modifikasyonlar, arıza tamiri, ezikler, çarpışmalar, ayarlar, v.b.</i>';
//PARKING 
$PARKING = 'Park etme'; 
$PARKING_DESC = 'Park etmek için harcanan ortalama tutar:<br><i>şehirdeki parkmetreler, park yeri kiralama, kamu binalarının önünde veya yeraltında bulunan otoparklar, alışveriş merkezleri, havaalanları, otobüs veya tren istasyonları veya başka herhangi bir yer.</i>';
//TOLLS 
$TOLLS = 'Geçiş ücretleri'; 
$TOLLS_DESC = 'Paralı yollara harcanan ortalama tutar,<br><i>köprüler, tüneller, ülkeler arası</i>'; 
$TOLLS_DAY_CALC = 'Hesaplama günlük mü?'; 
$TOLLS_DAY_CALC1 = 'Geçiş ücretlerine harcadığınız günlük tutar'; 
$TOLLS_DAY_CALC_DESC = 'Şehrinizin/kasabanızın dışına veya kırsal bölgelere yaptığınız seyrek yolculukları veya her çeşit otomatik geçiş sistemi kullanımını düşünün';
//FINES 
$FINES = 'Trafik cezaları'; 
$FINES_DESC = 'Trafik cezalarına ödenen ortalama tutar:<br><i>son birkaç yılda her türlü trafik cezasına ödediğiniz tutarı düşünün (hatalı park etme, hız sınırı aşma, araç kullanırken cep telefonu kullanma, v.b).</i>';
//WASHING 
$WASHING = 'Yıkama ve temizleme'; 
$WASHING_DESC = 'Araba yıkama ve vale park hizmeti için yapılan ortalama harcamalar:<br><i>benzin istasyonu ve diğer yerlerde</i>.';
//TOTAL 
$TOTAL_FIXED = 'TOPLAM - Sabit masraflar'; 
$TOTAL_FIXED_DESCR = "Kat edilen mesafeye bağlı olmayan ve araba kullanılmasa bile ödenmesi gereken masraflar"; 
$TOTAL_FIXED_DESCR2 = 'Amortisman, Sigorta, Kredi faizi, Vergiler, Muayene ve park etme ve bakım masraflarının %50’si';
$TOTAL_VARIABLE = 'TOPLAM - Kullanım masrafları'; 
$TOTAL_VARIABLE_DESCR = 'Kat ettiğiniz kilometreye bağlı masraflar'; 
$TOTAL_VARIABLE_DESCR2 = 'Yakıt, tamir ve iyileştirme, Park etme (sadece arabayı kullandığınızda ödediğinizi dikkate alarak), geçiş ücretleri, trafik cezaları, yıkama, ve bakım masraflarının %50’si';
//EXTRA DATA 
$EXTRA_DATA = 'EK BİLGİLER'; 
$EXTRA_DATA1 = 'Ek bilgiler'; 
$EXTRA_DATA_PUBLIC_TRANSP = 'Toplu taşımalar';
$EXTRA_DATA_FAMILY_NBR = 'Ailenizde 4 yaşından büyük kaç kişi bulunmaktadır (siz dahil)';  
$EXTRA_DATA_PRICE_PASS = "Normal günlük hayatınızda kişi başına ödediğiniz aylık ortalama toplu taşıma ücreti nedir <br><i>toplu taşıma kullanmıyorsanız, 0</i> giriniz.";
$EXTRA_DATA_INCOME = "Gelir";
$EXTRA_DATA_INCOME_QUESTION = 'Net geliriniz ne kadar?';
$EXTRA_DATA_WORKING_TIME = 'Çalışma saati';
$EXTRA_DATA_WORKING_TIME_QUESTION = 'İşiniz veya bir mesleğiniz var mı?';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = 'Araç sürerek harcanan zaman';
$EXTRA_DATA_TIME_QUESTION1 = 'Evden işe gitmek kaç dakikanızı alıyor? (sadece tek yön)';
$EXTRA_DATA_TIME_QUESTION2 = 'İşe araba ile gitmediğiniz günlerde kaç dakika araba kullanıyorsunuz?';
$EXTRA_DATA_TIME_QUESTION3 = 'Kaç dakika araba kullanıyorsunuz?';
//PUBLIC TRANSPORTS 
$PUB_TRANS_TEXT = 'Günlük hayatınızda aileniz için toplu taşıma'; 
$FAM_NBR = 'Ailenizde 4 yaşından büyük kişi sayısı'; 
$PERSON_OR_PEOPLE = 'kişi'; 
$PASS_MONTH_AVG = 'Kişi başına aylık akbil maliyetinin ortalama tutarı';  
$OTHER_PUB_TRANS = 'Diğer toplu taşıma'; 
$OTHER_PUB_TRANS_DESC = "Diğer toplu taşımadan kalmış olan tutar, örneğin tren veya otobüs gibi yerleşim yerinizin dışına yapılan uzun yolculuklar"; 
$TAXI_DESL = "Taksi ile ulaşım"; 
$ON_TAXI_PAYING = "taksiye ödeyerek"; //ex: 4 miles__on taxi paying__ 5€ per mile
//VIRTUAL SPEED
$FINANCIAL_EFFORT = 'Finansal durum';
$NET_INCOME_PER = 'Net gelir';
$AVERAGE_NET_INCOME_PER = 'Ortalama net gelir';
$NUMBER_OF_MONTHS = 'Bir yılda gelir elde edilen ay sayısı';
$NUMBER_OF_WEEKS = 'Bir yılda gelir elde edilen hafta sayısı';
$NUMBER_OF_HOURS= 'Bir haftada gelir elde edilen saat sayısı';
$HOURS_PER = 'Saat';
$MONTHS_PER = 'Hafta';
$AVERAGE_WORKING_HOURS_PER = 'Ortalama çalışma saati';
$WORKING_HOURS_PER = 'Çalışma saati';
$DIST_HOME_JOB = 'Evden işe giderken araba kullanıyorsunuz';
$DAYS_DRIVE_JOB = 'Her hafta işe araba ile gittiğiniz günler';
$DIST_JORNEY_WEEKEND = 'İşe araba ile gitmediğiniz günlerde araba kullanıyorsunuz';
$AVERAGE_DIST_PER_WEEK = 'Haftada ortalama şu kadar araba kullanıyorsunuz';
$YOU_DRIVE_PER = 'Araba kullanıyorsunuz';
$MINUTES_HOME_JOB = 'Evden işe araba kullandığınız dakika sayısı';
$DAYS_DRIVE_TO_JOB = 'Her hafta işe giderken araba kullandığınız günler';
$TIME_DRIVE_WEEKEND = 'İşe araba ile gitmediğiniz günlerde araba kullandığınız dakika sayısı';
$MINUTES_DRIVE_PER = 'Araba kullandığınız dakika sayısı';
$DAYS_DRIVE_PER_MONTH = 'Her ay araba kullandığınız günler';
$HOURS_DRIVE_PER = ' Araba kullandığınız saat sayısı';
$VIRTUAL_SPEED = 'fiili hız';
$KINETIC_SPEED = 'kinetik hız';
$AVER_YEARLY = 'Yıllık ortalama';
$WORKING_TIME_MESSAGE = 'Hesaplamalar yapılırken ortalama çalışma süresi haftada 36 saat ve yılda 11 ay olarak düşünülmüştür';
$HOURS_TO_AFFORD_CAR = 'Arabanızın giderlerini karşılamak için bir yıl içinde çalışmanız gereken saat sayısı';
$MONTHS_TO_AFFORD_CAR = 'Arabanızın giderlerini karşılamak için bir yıl içinde çalışmanız gereken ay sayısı';
$TOTAL_COSTS_PER_YEAR = 'Otomobilin yıllık toplam masrafı';
$DAYS_CAR_PAID = '1 Ocak sonrasında araba için kaç günlük ödeme yapılmış';
//************************************************** 
//GRAPHICS 
$PARCEL = 'Parsel'; 
$COSTS = 'Masraflar';
//**************************************************** //ERROR MESSAGES 
$ERROR_INVALID_INSU_VALUE = 'Geçersiz sigorta tutarı'; 
$ERROR_INSU_PERIOD = 'Sigorta ödemelerinin ödeme sıklığını girin';
$ERROR_FUEL_CURR_DIST = 'Hesaplamaları kilometreye veya LİRAYA göre mi yapmak istediğinizi belirlemelisiniz'; 
$ERROR_FUEL_CAR_EFF = 'Geçersiz yakıt verimliliği tutarı'; 
$ERROR_FUEL_PRICE = 'Geçersiz yakıt fiyatı'; 
$ERROR_CAR_JOB = 'Lütfen arabanızı iş yerine götürüp götürmediğinizi belirtin';  
$ERROR_FUEL_DIST = 'Geçersiz her ay kat edilen kilometre miktarı'; 
$ERROR_DAYS_PER_WEEK = 'Geçersiz haftalık gün sayısı'; 
$ERROR_DIST_HOME_WORK = 'Geçersiz ev ile işyeri arası kilometre'; 
$ERROR_DIST_NO_JOB = "Geçersiz aracınızı iş yerine götürmediğiniz süre boyunca kat ettiğiniz kilometre miktarı"; 
$ERROR_CURRENCY = 'Geçersiz aylık LİRA';
$ERROR_DEPRECIATION_MONTH = 'Geçersiz satın alma ayı'; 
$ERROR_DEPRECIATION_YEAR = 'Geçersiz satın alma yılı'; 
$ERROR_DEPRECIATION_VALUE = 'Geçersiz satın alma tutarı'; 
$ERROR_DEPRECIATION_VALUE_TODAY = 'Geçersiz mevcut araç değeri'; 
$ERROR_DEPRECIATION_DATE = 'Geçersiz satın alma tarihi'; 
$ERROR_DEPRECIATION_NEW_CAR =  'Araç yeni olduğu için amortisman uygulanamaz';
$ERROR_CREDIT_QUESTION = 'Lütfen araç kredisi kullanıp kullanmadığınızı belirleyin'; 
$ERROR_CREDIT_LOAN_VALUE = 'Geçersiz kredi tutarı'; 
$ERROR_CREDIT_PERIOD = 'Geçersiz kredi süresi, taksit ödeme sayısı'; 
$ERROR_CREDIT_INSTALMENT = 'Geçersiz taksit tutarı'; 
$ERROR_CREDIT_RESIDUAL_VALUE = 'Geçersiz kalıntı değer';
$ERROR_INSPECTION_NTIMES = 'Geçersiz yapılan muayene miktarı'; 
$ERROR_INSPECTION_COSTS = 'Geçersiz muayene masrafı';
$INVALID_AMOUNT = 'Geçersiz tutar';
$INVALID_NBR_PP = 'Geçersiz kişi sayısı'; 
$ERROR_PASS_AMOUNT= 'Geçersiz aylık ceza tutarı';
$ERROR_INCOME = 'Geçersiz net gelir';
$ERROR_WEEKS_PER_YEAR = 'Geçersiz yıllık hafta sayısı';
$ERROR_MONTHS_PER_YEAR = 'Geçersiz yıllık ay sayısı';
$ERROR_HOURS_PER_WEEK = 'Geçersiz haftalık saat sayısı';
$ERROR_MIN_DRIVE_HOME_JOB = 'Geçersiz evden işe araba kullandığınız dakika sayısı';
$ERROR_MIN_DRIVE_WEEKEND = 'Geçersiz işe araba ile gitmediğiniz günlerde araba kullandığınız dakika sayısı';
$ERROR_MIN_DRIVE = 'Geçersiz araba kullandığınız dakika sayısı';
$ERROR_DAYS_PER_MONTH = 'Geçersiz aylık gün sayısı';
$YOUR_CAR_COSTS_YOU = 'Arabanızın size maliyeti'; 
$WITH_THIS_LEVEL_OF_COSTS = 'Bu seviyedeki masraflarla'; //ex: __"With this level of costs for your car during the"__ 15 months of possession.... 
$MONTHS_POSS = 'aydır sahip olduğunuz aracın şimdiye kadar size olan maliyeti';   //ex: With this level of costs for your car during the 15 ___"months of possession, it has already been determined to be "___ 14000 Euros/USD
$TAXI_PRICE_PER_DIST=2.5; //amount paid for taxi in chosen currency per chosen unit distance
//***************************************** 
//STANDARD COMMON AVERAGE DEFAULT values that appear on the start page 
//these values are to be changed by the user but you must insert values that are reasonable 
//keep in mind your chosen standard currency as well as your volume and fuel efficiency standards
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