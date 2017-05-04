<?php

// COUNTRY: INDIA
// LANGAUAGE: HINDI

$COUNTRY_NAME = 'India';

//the language is according with the two-letter language code ISO 639-1
//http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

//***********************************************
//											   **
//      Translation for AUTOCOSTS.INFO          **
//      the automobile costs calculator		   **
//	  										   **
//***********************************************

//Preserve always the same standards, 
//be coherent between the text variables and these selected standard options

//Select the Fuel efficiency/consumption for car, standard in the country
$fuel_efficiency_std_option = 2;
//1 - l/100km - litres per 100 kilometres
//2 - km/l - kilometres per litre
//3 - mpg(imp) - miles per imperial gallon
//4 - mpg(US) - miles per US gallon

//Select the Standard distance, standard in the country
$distance_std_option = 1;
//1 - kilometres
//2 - miles

//Select the Volume Standard for the Price of liquid fuels, ex: Currency($,£,€,etc.)/(Litre, Imp gallon, US gallon) 
$fuel_price_volume_std = 1;
//1 - litres
//2 - imperial gallons
//3 - US gallons


//standards TEXT VERSION
//IMPORTANT: BE COHERENT with the above standards
$CURR_CODE = 'INR'; //Three letter currency code according to ISO 4217 http://en.wikipedia.org/wiki/ISO_4217
$CURR_NAME = 'रूपया'; //Currency name written out
$CURR_NAME_PLURAL = 'रुपये'; //Currency name written out in plural
$CURR_NAME_BIG_PLURAL = 'रुपये'; //Currency name written out in plural and in capital letters 
$CURR_SYMBOL = '&#8377;'; //HTML currency symbol code http://www.freeformatter.com/html-entities.html; if there is not HTML code, just the symbol
$STD_DIST = 'km'; //short text version to apply for the Standard Distance 
$STD_DIST_FULL = 'kilometres'; //long normal version for the Standard Distance
$STD_FUEL_CALC = 'km/l'; //text version to apply to the Fuel efficiency / Consumption of the car
$STD_VOLUME_SHORT = 'l'; //short text version to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)
//simple words
$WORD_PER = 'प्रति';     //ex: 4 km _per_ day
$WORDS_PER_EACH = 'हर';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = 'बार'; //ex: 4 times per week
$DURING = 'दौरन';   //spent in tolls 3€ per day _during_ 22 days per month
$WORD_PEOPLE = 'लोग';   //plural, 3 _people_ 
$YES = 'हाँ';
$NO = 'नहीँ';
$BUTTON_RUN = 'चलाएँ'; //run calculator button 
$BUTTON_RERUN = 'फिर चलाएँ'; //run calculator button 
//WEB PAGE
$WEB_PAGE_TITLE = 'गाड़ी से जुड़े ख़र्च जानिये';
$MAIN_TITLE = 'गाड़ी से जुड़े ख़र्च जानिये';
$INITIAL_TEXT = 
"यह कॅलक्यूलेटर आपको, <b>भारत में</b>,<b>आपकी गाड़ी से जुड़ी सारे खर्च</b> जानने में मदद करेगा. साधारणतः यह आपको आपकी गाड़ी के लिए वाजिब खर्च का अनुमान दर्शाएगा. 
क्योंकि गाड़ी पर होनेवाले विभिन्न खर्चे साल में कभी भी आते है, इसलिए उस पर हुए कुल खर्च को समझना थोड़ा मुश्किल हो जाता है. जितना मुमकिन हो, कॅलक्यूलेटर में लगभग सही सही मूल्य डालें. अनपेक्षित खर्चो के लिए, जैसे कोई दुर्घटना से हुई हानि कि मरमत या कोई जुर्माना, याद किजिये के पिछले कुछ सालों में आपने कितने रुपये खर्च किए है. डिफ़ॉल्ट रूप से, यह सारे हिसाब मासिक आधारित है. दशांश के लिए बिन्दु का प्रयोग करें, उदाहरण: घर और ऑफिस के बीच 8.7 किलोमीटर का फ़ासला है.";
$DISCLAIMER = "यह कॅलक्युलेटर <b>पूरी तरह गुमनाम है</b>, क्योंकि यह आपसे कोई नाम, email, cookies, IP address या कोई भी निजी जानकारी नही पूछता; नाहि निरंतर संग्रह करता है.";

$HELP_PROJECT = 'यह एक मुफ्त सेवा है और इसमे कोई विज्ञापन भी नही!' ;
$AC_MOBILE = 'AUTOCOSTS<br>मोबाइल उपकरणों के लिए';
$AC_SUB_HEADER = 'गाड़ी से जुड़े ख़र्च जानिये';

//user statistics
$VISITORS = 'विसिटर्स';
$ONLINE = 'ऑनलाइन';
$THIS_MONTH = 'इस महीने';
$IN_TOTAL = 'कुल मिलाकर'; //in the sense of "the website had 10000 visitors *in total*"
$USERS = 'युजर्स';
$FOR_COUNTRY = 'भारत देश के लिए'; //in the sense of "10 users filled in *for Portugal". Replace Portugal accordingly.
$IN_TOTAL = 'कुल मिलाकर'; //in the sense of "10000 users filled in *in total* the form "
$CONTACT = 'संपर्क';

//time words
$DAYLY = 'रोजाना';
$WEEKLY = 'हर हफ्‍़ते';
$MONTHLY = 'प्रतिमास';
$TRIMESTERLY = 'त्रैमासिक';
$SEMESTERLY = 'छमाही'; //&#8209; is just a non-breakeble space, erase if you need
$YEARLY = 'सालाना ';
$MIN = 'मिनट';
$MINUTES = 'मिनट';
$HOUR = 'घंटा';
$HOURS = 'घंटे';
$HOUR_ABBR = 'h';
$DAY = 'दिन'; 
$DAYS = 'दिन'; 
$WEEK = 'हफ़्ता'; 
$WEEKS = 'हफ्‍़ते'; 
$MONTH = 'महीना'; 
$MONTHS = 'महीने'; 
$TWO_MONTHS = 'दो महीने'; 
$DIST_EACH_TWO_MONTHS = 'हर दो महीनों बाद के किलोमीटर'; 
$TRIMESTER = 'त्रैमासिक'; 
$SEMESTER = 'छमासी'; 
$YEAR = 'साल';
$DAYS_PER_WEEK_SHORT= 'दिन/सप्ताह';
//distance
$DISTANCE = "फ़ासला";

//statistics
$AVERAGE_COSTS_PER_TYPE = 'औसत मासिक खर्च प्रति प्रकार';
$STATISTIC_TITLE = 'गाड़ी पर होनेवाले विभिन्न खर्च';
$DEPRECIATION_ST = 'मूल्य-ह्रास';
$INSURANCE_ST = 'बीमा';
$REP_ST = 'मरम्मत';
$WASHING_ST = 'धुलाई';
$VIRTUAL_SPEED_TITLE = 'उपभोक्ता कि गति';
$KINETIC_SPEED_TITLE = 'काइनेटिक गति';

//calculator words
$COSTS= "लागत";
$FIXED_COSTS = 'स्थिर खर्च';
$FIXED_COSTS_HEADER_1= 'स्थिर खर्च'; //capital letters
$FIXED_COSTS_HEADER_2= "ऐसे खर्च जो गाड़ी को चलाने के काबिल रखने के लिए हो लेकिन कुल चलाये हुए फ़सलें पर नही"; 
$DAYS_PER = "दिन प्रति";
$RUNNING_COSTS = 'चालू लागत';
$RUNNING_COSTS_HEADER_1 = 'चालू लागत'; //capital letters
$RUNNING_COSTS_HEADER_2 = 'ऐसे खर्च, जो गाड़ी के कुल चलाये हुए फ़सलें, पर निर्भर हो';
$PRIVATE_COSTS = 'निजी खर्च';
$MONTHLY_AMOUNT = 'मासिक रकम';
$RUN_CP_DIST = 'चालू लागत प्रति किलोमीटर'; //running costs per unit distance
$TOTAL_CP_DIST = 'कुल लागत प्रति किलोमीटर'; //total costs per unit distance
$PUBL_TRA_EQUIV= "अगर आपकी अपनी गाड़ी ना होती, तो कोई अन्य समान यातायात के साधन पर होनेवाले खर्च ";
$WORD_TOTAL_CAP = 'कुल '; //capital word for total
$WORD_PRINT = 'प्रिंट करें ';
$WORD_DOWNLOAD_PDF = 'PDF रिपोर्टें डाउनलोड करें';
//depreciation
$DEPRECIATION = 'वाहन का मूल्य-ह्रास';
$AQ_DATE = 'गाड़ी खरीदने कि तारीख';
$COM_VALUE = 'खरीदने के समय पर गाड़ी की व्यावसायिक कीमत  <br><i>अगर आपने नई गाड़ी खरीदी थी तो आपने दी हु़ई कीमत <br>अगर आपने किसी और कि गाड़ी खरीदी थी, तो उस समय पर गाड़ी कि व्यावसायिक कीमत/ मूल्यांकन</i>';
$COM_VALUE_TODAY = 'गाड़ी कि आज कि व्यावसायिक कीमत<br><i>अगर आज आप अपनी गाड़ी  बेचते है, तो आप को क्या कीमत मिलेगी?</i>';
$PERIOD_OWN = 'गाड़ी पर आपके अधिकार का काल ';
$FINAL_VALUE = 'आज का मूल्य';
$AQ_VALUE = 'खरीदने कि कीमत';
//insurance
$INSURANCE = 'गाड़ी का बीमा और व्यवधान रक्षा';
$INSURANCE_SHORT = 'बीमा और व्यवधान रक्षा';
//credit
$CREDIT = 'गाड़ी के लिए क़र्ज़';
$CREDIT_PERIOD = 'काल';
$CREDIT_INTERESTS = 'क़र्ज़ का ब्याज';
$CREDIT_INTERESTS_MONTH = 'ब्याज कि मासिक रकम';
$CREDIT_TOTAL_INTERESTS = 'ब्याज कि कुल रकम';
$CREDIT_QUESTION = 'क्या आपने गाड़ी खरीदने के लिए कर्ज़ किया था?';
$CREDIT_LOAN = 'वित्त प्रबन्धित रकम:<br><i>आपने कितना कर्ज़ लिया था??</i>';
$CREDIT_LOAN2 = 'वित्त प्रबन्धित रकम';
$CREDIT_PERIOD = 'ऋण अवधि / ऋण के किस्तों की संख्या';
$CREDIT_AVERAGE_VALUE = 'औसत राशि प्रति किश्त';
$CREDIT_RESIDUAL_VALUE = 'अवशेष मूल्य:<br><i>कर्ज़ के अवधि के अंत में, आपको और कितना भुगतान करना होगा या आपने भुगतान किया था?</i>';
$CREDIT_RESIDUAL_VALUE1 = 'अवशेष मूल्य';
$CREDIT_INSTALMENT = 'मासिक औसत मूल्य';
//inspection
$INSPECTION = 'गाड़ी का मुआइना (MOT test)';
$INSPECTION_SHORT = 'मुआइना';
$INSPECTION_NBMR_TIMES = 'आपने अपनी गाड़ी कितने बार मुआइना के लिए भेजी है?';
$INSPECTION_PRICE =  'हर मुआइना कि औसत खर्च';
$EACH_ONE_DURING = 'सब के सब, इस कालावधि के दौरन'; //5 times costing 15€ *each one during* 20 months (inspection)
$TIMES_COSTING = 'बार, हर एक बार कि कीमत';     //5 *times costing* 15€ each one during 20 months (inspection)
//road taxes
$ROAD_TAXES = 'उत्पाद शुल्क/ एक्साइस् ड्यूटी (कार कर)';
$ROAD_TAXES_SHORT = 'गाड़ी से जुड़े टैक्स';
$ROAD_TAXES_VALUE = 'आपकी गाड़ी से जुड़े टैक्स :<br><i>राज्य को किया गया भुगतान.</i>';
//fuel
$FUEL = 'ईंधन';
$FUEL_DESC = 'पेट्रोल, डीजल, एलपीजी, बिजली';
$FUEL_CALC = 'हिसाब, आपके चुने पर्याय पर आधारित होगा';
$FUEL_JOB_CALC = 'क्या हम मान ले के आप अपनी गाड़ी से कार्यस्थल पर जाते है??';
$FUEL_JOB_CALC1 = 'सप्ताह के कितने दिन आप अपनी गाड़ी से कार्यस्थल पर जाते है?';
$FUEL_DAYS = 'सप्ताह के कितने दिन आप अपनी गाड़ी से कार्यस्थल पर जाते है?';
$FUEL_DIST_HOME_JOB = 'घर से कार्यस्थल पर जाते समय आप कितना फ़ासला, अपनी गाड़ी से तय करते है ( एक तरफा)'; //$CURR_DIST=km, miles, etc.
$FUEL_DIST_HOME_JOB1 = 'किलोमीटर का फ़ासला, आपके घर और कार्यस्थल के बीच'; //you do 7 km between home and job
$FUEL_DIST_NO_JOB = "जिस दिन आप गाड़ी कार्यस्थल पर नही ले जाते, उस दिन आपकी गाड़ी औसतन कितना दौड़ती है??:<br><i>उदाहरण हर शनिवार या रविवार </i>";
$FUEL_DIST_NO_JOB1 = "जिस दिन आप गाड़ी कार्यस्थल पर नही ले जाते, उस दिन आपकी गाड़ी औसतन इतना दौड़ती है"; // you do 5 km per week....
$FUEL_DIST = 'आप इतने किलोमीटर चलाते है';
$FUEL_CAR_EFF = 'आपके वाहन की ईंधन कार्यक्षमता';
$FUEL_PRICE = 'आप ईंधन के लिए औसतन कितनी किमत देते है';
$FUEL_PRICE1 = 'ईंधन का औसतन मूल्य ';
$YOU_DRIVE_TOTTALY_AVG = 'कुल मिलाकर, औसतन आप इतनी गाड़ी चलाते है'; //__You drive totally on average of__ 5 km per day
$YOU_DRIVE = 'आप चलाते है'; //__You drive__ 5 km per day
//MAINTENANCE
$MAINTENANCE = 'देखभाल';
$MAINTENANCE_DESC = 'देखभाल और व्यवधान रक्षा पर होनेवाले औसत खर्च:<br><i>इंजन तेल बदलना, फिल्टर, लाइट्स, टायर, ब्रेक, वातानुकूलन, स्टीयरिंग अलाइनमेंट, इत्यादि.</i>';
//REPAIRS AND IMPROVEMENTS
$REP_IMPROV = 'मरम्मत और सुधार ';
$REP_IMPROV_DESC = 'मरम्मत और सुधार पर औसतन खर्च:<br><i>कार के पुर्जे, तब्दिलिया, कोई खराबी कि मरम्मत, डेंट्स, दुर्घटना, ट्यूनिंग, इत्यादि</i>';
//PARKING
$PARKING = 'पार्किंग';
$PARKING_DESC = 'पार्किंग के साथ औसतन खर्च:<br><i>शहर में पार्किंग का खर्च, पार्किंग कि जगह का किराया, सार्वजनिक इमारतों में भूमिगत या ऊपरी पार्किंग स्थल, शॉपिंग सेंटर, हवाई अड्डे, बस या ट्रेन स्टेशनों या अन्य कोई आधारिक संरचनाए.</i>';
//TOLLS
$TOLLS = 'टॉल';
$TOLLS_DESC = 'टॉल के साथ औसतन खर्च<br><i>पुल, सुरंगों, मोटरवे और भीड़ प्रभार शहर के केंद्र तक पहुंच प्राप्त करने के लिए</i>';
$TOLLS_DAY_CALC = 'क्या गिनती दिन पर निर्भर है?';
$TOLLS_DAY_CALC1 = 'टॉल पर रोज़ का खर्च';
$TOLLS_DAY_CALC_DESC = 'आप अपने शहर के बाहरी इलाकों या ग्रामीण इलाकों में जो दुर्लभ यात्राएं करते हैं, या किसी भी प्रकार के इलेक्ट्रॉनिक टोल भरते हो, तो उसका भी समावेश करें';
//FINES
$FINES = 'ट्रैफिक से संबंधित जुर्माने';
$FINES_DESC = 'ट्रैफिक से संबंधित जुर्माने के औसत खर्च:<br><i>याद किजिये पिछले कुछ वर्षों में आप किसी भी प्रकार के ट्रैफिक से संबंधित जुर्माने (अवैध पार्किंग, गति सीमा उल्लंघन, मोबाइल फोन, इत्यादि) पर कितना खर्च कर चुके हैं.)</i>';
//WASHING
$WASHING = 'धुलाई और सफाई';
$WASHING_DESC = 'धुलाई और पार्किंग सेवक पर औसत खर्च:<br><i>सेवा केंद्रों और अन्य जगहों में</i>';
//TOTAL
$TOTAL_FIXED = 'कुल - स्थिर खर्च';
$TOTAL_FIXED_DESCR = "ऐसे खर्च, जो गाड़ी की पूरी कि हुई दूरी पर निर्भर नहीं होती हैं और अगर कार इस्तेमाल में ना हो, तब भी भुगतान करने होते है";
$TOTAL_FIXED_DESCR2 = 'मूल्यह्रास, बीमा, गाड़ी के कर्ज़ का ब्याज, करों, मुआइना ,और पार्किंग और देखभाल का 50%';
$TOTAL_VARIABLE = 'कुल - चालू लागत';
$TOTAL_VARIABLE_DESCR = 'आपके द्वारा चलाये जानेवाले किलोमीटर की संख्या पर निर्भर खर्च';
$TOTAL_VARIABLE_DESCR2 = 'ईंधन, मरम्मत और सुधार, पार्किंग (अगर हम मन ले आप जब कार का उपयोग करते हैं, केवल तभी इसका भुगतान करते हैं), टोल, ट्रैफिक से संबंधित जुर्माने, धोने और देखभाल का 50%';
//EXTRA DATA
$EXTRA_DATA = 'अतिरिक्त डेटा';
$EXTRA_DATA1 = 'अतिरिक्त डेटा';
$EXTRA_DATA_PUBLIC_TRANSP = 'सार्वजनिक परिवहन';
$EXTRA_DATA_FAMILY_NBR = 'आपके परिवार में 4 साल से अधिक आयु वाले कितने लोग हैं (आप सहित)';
$EXTRA_DATA_PRICE_PASS = "सार्वजनिक परिवहन के मासिक सीजन टिकट का प्रति व्यक्ति औसतन कीमत क्या है, अपने सामान्य दैनिक जीवन के लिए<br><i>अगर सार्वजनिक परिवहन आपके लिए विकल्प नहीं है, तो 0 डालें</i>";
$EXTRA_DATA_INCOME = "आमदनी";
$EXTRA_DATA_INCOME_QUESTION = 'आपकी शुद्ध/ निवल आय क्या है?';
$EXTRA_DATA_WORKING_TIME = 'काम का समय';
$EXTRA_DATA_WORKING_TIME_QUESTION = 'क्या आपके पास नौकरी या योग्य व्यवसाय है?';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = 'ड्राइविंग में बिताया समय ';
$EXTRA_DATA_TIME_QUESTION1 = 'घर से कार्यस्थल तक आप कितने मिनट ड्राइव करते हैं? (एक तरफा)';
$EXTRA_DATA_TIME_QUESTION2 = 'जब आप कार को कार्यस्थल पर नहीं ले जाते हैं, ऐसे दिनों में आप कितने देर गाड़ी चलाते हैं?';
$EXTRA_DATA_TIME_QUESTION3 = 'आप कितने मिनट गाड़ी चलाते है ?';
//PUBLIC TRANSPORTS
$PUB_TRANS_TEXT = 'अपने परिवार के दैनिक जीवन के लिए सार्वजनिक परिवहन';
$FAM_NBR = 'आपके परिवार में 4 साल से अधिक आयु वाले लोगों कि संख्या';
$PERSON_OR_PEOPLE = 'व्यक्ति';
$PASS_MONTH_AVG = 'मासिक सीजन टिकट की प्रति व्यक्ति के लिए औसत राशि';
$OTHER_PUB_TRANS = 'अन्य सार्वजनिक परिवहन';
$OTHER_PUB_TRANS_DESC = "राशि जो अभी भी अन्य सार्वजनिक परिवहन के लिए छोड़ी गई थी, उदाहरण के लिए आपके आवासीय क्षेत्र से बाहर, जैसे कि लंबी यात्रा कि गाडिया या बसो";
$TAXI_DESL = "टैक्सी परिवहन ";
$ON_TAXI_PAYING = "टैक्सी से, किराया"; //ex: 4 km __on taxi paying__ 5€ per km
//VIRTUAL SPEED
$FINANCIAL_EFFORT = 'वित्तीय प्रयास';
$NET_INCOME_PER = 'शुद्ध आय प्रति ';
$AVERAGE_NET_INCOME_PER = 'औसत शुद्ध आय प्रति ';
$NUMBER_OF_MONTHS = 'प्रति वर्ष, कितने महीने फलदार/ आय होती है';
$NUMBER_OF_WEEKS = 'प्रति वर्ष, कितने हफ्ते उपजाऊ/ आय प्रप्ति होते है';
$NUMBER_OF_HOURS= 'हर हफ्ते, कितने घंटों के काम का मूल्य मिलता है';
$HOURS_PER = 'घंटे प्रति';
$MONTHS_PER = 'महीने प्रति';
$AVERAGE_WORKING_HOURS_PER = 'औसत कामकाज के घंटे प्रति';
$WORKING_HOURS_PER = 'कार्य समय प्रति';
$DIST_HOME_JOB = 'आप घर से कार्यस्थल जाने के लिए ड्राइव करते हैं';
$DAYS_DRIVE_JOB = 'सप्ताह के कुल दिन जब आप काम पर अपनी गाड़ी से जाते है';
$DIST_JORNEY_WEEKEND = 'जब आप गाड़ी को कार्यस्थल पर नहीं ले जाते हैं, तब आप इतना ड्राइव करते हैं';
$AVERAGE_DIST_PER_WEEK = 'औसतन, आप प्रति सप्ताह इतना ड्राइव करते हैं';
$YOU_DRIVE_PER = 'आप गाड़ी चलाते है, प्रति';
$MINUTES_HOME_JOB = 'मिनट, आप घर से कार्यस्थल पहुँचने में लगाते हैं';
$DAYS_DRIVE_TO_JOB = 'सप्ताह के कुल दिन जब आप काम पर गाड़ी से जाते है';
$TIME_DRIVE_WEEKEND = 'जिस दिन आप कार को कार्यस्थल पर नहीं ले जाते हैं, उस दिन आप इतना समय ड्राइव करते हैं ';
$MINUTES_DRIVE_PER = 'इतने मिनट आप ड्राइव करते हैं, प्रति';
$DAYS_DRIVE_PER_MONTH = 'महीने के कुल दिन जब आप ड्राइव करते है';
$HOURS_DRIVE_PER = 'इतने घंटे आप ड्राइव करते है, प्रति';
$VIRTUAL_SPEED = 'उपभोक्ता कि गति';
$KINETIC_SPEED = 'गाड़ी चलाने कि गति';
$AVER_YEARLY = 'वार्षिक औसत';
$WORKING_TIME_MESSAGE = 'गणना के लिए, प्रति सप्ताह औसतन 36 घंटे और प्रति वर्ष 11 महीने काम करने का समय माना जाता था';
$HOURS_TO_AFFORD_CAR = 'अपनी ख़ुद कि गाड़ी बनाये रखने के लिए, प्रति वर्ष आपको इतने घंटे काम करने की आवश्यकता है ';
$MONTHS_TO_AFFORD_CAR = 'अपनी ख़ुद कि गाड़ी बनाये रखने के लिए, प्रति वर्ष आपको इतने महीने काम करने की आवश्यकता है';
$TOTAL_COSTS_PER_YEAR = 'गाड़ी के लिए प्रति वर्ष कि कुल लागत';
$DAYS_CAR_PAID = '1 जनवरी के बाद, कितने दिनों के लिए कार का भुगतान किया जाता है';
//**************************************************
//GRAPHICS
$PARCEL = 'पार्सल';
$COSTS = 'खर्च';
//****************************************************//ERROR MESSAGES
$ERROR_INVALID_INSU_VALUE = 'अवैध बीमा राशि';
$ERROR_INSU_PERIOD = 'बीमा की आवधिकता डालें';
$ERROR_FUEL_CURR_DIST = 'कृपया जाँच ले के आप रुपए या किलोमीटर पर आधारित हिसाब करना चाहेंगे';
$ERROR_FUEL_CAR_EFF = 'अवैध ईंधन कार्यक्षमता राशि';
$ERROR_FUEL_PRICE = 'अवैध ईंधन मूल्य';
$ERROR_CAR_JOB = 'कृपया बताएं कि क्या आप अपनी गाड़ी को कार्यस्थल पर ले जाते हैं';
$ERROR_FUEL_DIST = 'किलोमीटर प्रति महीना के लिए अवैध उत्तर';
$ERROR_DAYS_PER_WEEK = 'दिन प्रति सप्ताह के लिए अवैध संख्या';
$ERROR_DIST_HOME_WORK = 'घर और कार्यस्थल के बीच कि दूरी के लिए अवैध किलोमीटर';
$ERROR_DIST_NO_JOB = "जिन दिनों के दौरान आप अपनी कार को कार्यस्थल पर नहीं ले जाते हैं, उस दिन के फ़सलों के लिए अवैध संख्या";
$ERROR_CURRENCY = 'रुपए प्रति माह के लिए अवैध रकम';
$ERROR_DEPRECIATION_MONTH = 'गाड़ी खरीदने के महीने के लिए अवैध उत्तर';
$ERROR_DEPRECIATION_YEAR = 'गाड़ी खरीदने के साल के लिए अवैध उत्तर';
$ERROR_DEPRECIATION_VALUE = 'गाड़ी खरीदने कि क़ीमत के लिए अवैध रकम';
$ERROR_DEPRECIATION_VALUE_TODAY = 'गाड़ी कि आज कि क़ीमत के लिए अवैध रकम';
$ERROR_DEPRECIATION_DATE = 'गाड़ी खरीदने कि तारीख के लिए अवैध उत्तर';
$ERROR_DEPRECIATION_NEW_CAR =  'यह गाड़ी नई होने के कारण, मूल्यह्रास लागू नहीं होता है';
$ERROR_CREDIT_QUESTION = 'कृपया जाँच ले के आपने गाड़ी खरीदने के लिए वाहन कर्ज़ लिया था या नही';
$ERROR_CREDIT_LOAN_VALUE = 'वाहन कर्ज़ के लिए अवैध उत्तर';
$ERROR_CREDIT_PERIOD = 'क्रेडिट कि अवधि, किश्तों की संख्या के लिए अवैध उत्तर';
$ERROR_CREDIT_INSTALMENT = 'किस्त राशि के लिए अवैध उत्तर';
$ERROR_CREDIT_RESIDUAL_VALUE = 'अमान्य अवशेष मूल्य';
$ERROR_INSPECTION_NTIMES = 'अमान्य संख्या';
$ERROR_INSPECTION_COSTS = 'अवैध मुआइना का खर्च';
$INVALID_AMOUNT = 'अवैध राशि';
$INVALID_NBR_PP = 'लोगों की अमान्य संख्या';
$ERROR_PASS_AMOUNT= 'मासिक जुर्माने कि अवैध राशि';
$ERROR_INCOME = 'अवैध शुद्ध/ निवल आय';
$ERROR_WEEKS_PER_YEAR = 'हफ्ते प्रति वर्ष की अमान्य संख्या';
$ERROR_MONTHS_PER_YEAR = 'महीने प्रति वर्ष की अमान्य संख्या';
$ERROR_HOURS_PER_WEEK = 'घंटे प्रति सप्ताह की अमान्य संख्या';
$ERROR_MIN_DRIVE_HOME_JOB = 'आपके घर से कार्यस्थल तक ड्राइव करने के लिए बिताये अवैध संख्या';
$ERROR_MIN_DRIVE_WEEKEND = 'जिस दिन आप कार को कार्यस्थल पर नहीं ले जाते हैं, उस दिन आपके द्वारा ड्राइव किए जाने वाले मिनटों की अवैध संख्या';
$ERROR_MIN_DRIVE = 'आपके द्वारा ड्रायविंग में बिताये मिनटों की अमान्य संख्या';
$ERROR_DAYS_PER_MONTH = 'दिन प्रति माह के लिए अवैध संख्या';
//FINAL RESULT
$YOUR_CAR_COSTS_YOU = 'आपकी कार की लागत';
$WITH_THIS_LEVEL_OF_COSTS = 'लागत के इस स्तर के साथ, आपकी गाड़ी के '; //ex: __"With this level of costs, you car during the"__ 15 months of possession....
$MONTHS_POSS = 'महीनों के मालिकी में पहले ही आपने खर्च किए हैं';   //ex: With this level of costs, you car during the 15 ___"months of possession has already costed"___ 14000 Euros
$TAXI_PRICE_PER_DIST=1.5; //price paid for taxi in chosen currency per chosen unit distance
//*****************************************
//STANDARD COMMON AVERAGE DEFAULT values that apear on the start page
//these values are to be changed by the user but you shall put values that are reasonable
//keep in mind your chosen standard Currency and your volume and fuel efficiency standards
$STD_ACQ_MONTH = '01'; //month of acquisition 
$STD_ACQ_YEAR = '2000'; //year of acquisition 
$STD_PRICE_PAID = '500000'; //price paid for the car
$STD_PRICE_TODAY = '250000'; //the price the car has today
$STD_INSURANCE_SEM = '3500'; //price paid for insurance by semester
$STD_LOAN = '300000'; //amount asked for credit
$STD_PERIOD_OF_CREDIT = '60'; //period of the credit in months
$STD_MONTHLY_PAY = '5000'; //monthly payment
$STD_RESIDUAL_VALUE = '10000'; //residual value must be paid after credit
$STD_NBR_INSPECTION = '3'; //number of times car went to inspection
$STD_INSPECTION_PRICE = '1000'; //normal inspection price
$STD_ROAD_TAX = '60000'; //price paid for road taxes per year
$STD_FUEL_PAID_PER_MONTH = '10000'; //money spent per month on fuels
$STD_DAYS_PER_WEEK = '6'; //days per week one takes their car to work
$STD_JORNEY_2WORK = '20'; //(standard distance, km or miles) made from home to work (just one way) 
$STD_JORNEY_WEEKEND = '50'; //(standard distance, km or miles) during the other days, for example weekends
$STD_KM_PER_MONTH = '550'; //(standard distance, km or miles) made per month
$STD_CAR_FUEL_EFFICIENCY = '14'; //(standard fuel efficiency, km/l l/100km mpg(US) or mpg(imp)) fuel efficiency in the chosen standard
$STD_FUEL_PRICE = '80'; //price paid for fuel on chosen currency
$STD_MAINTENANCE_PER_YEAR = '50000'; //amount paid for maintenance per year
$STD_REPAIRS = '10000'; //repairs and improvements paid per year on average
$STD_PARKING = '500'; //parking paid per month
$STD_TOLLS = '3000'; //amount paid in tolls per trimestre 
$STD_TOLLS_DAY = '80'; //amount paid in tolls per day
$STD_TOLLS_DAYS_PER_MONTH = '15'; //number of days per month the car crosses a tolled way
$STD_FINES = '500'; //fines paid on average per trimestre
$STD_WASHING = '500'; //amount paid in washings per trimestre
$STD_NR_PPL_FAMILY = '4'; //number of people in the family
$STD_PASS_PRICE = '1000'; //price of the monthly pass
$STD_INCOME_YEAR = '1200000'; // net income per year
$STD_INCOME_MONTH = '104000'; // net income per month
$STD_INCOME_WEEK = '22000'; // net income per week
$STD_INCOME_HOUR = '700'; // net income per hour
$STD_HOURS_WEEK = '40'; // hours per week
$STD_MONTHS_YEAR = '12'; // months per year
$STD_WEEKS_YEAR = '52'; // weeks per year
$STD_HOURS_WEEK = '40'; // work hours per week
$STD_TIME_HOME_JOB = '90'; // minutes you drive from home to workplace
$STD_TIME_WEEKEND = '200';// minutes you drive in the days you don't take the car to workplace
$STD_TIME_IN_DRIVING = '200'; // time spent in driving (minutes/day)
$STD_DAYS_MONTH = '26'; // days per month
?>