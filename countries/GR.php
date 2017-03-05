<?php

// COUNTRY: ΕΛΛΑΔΑ
// LANGAUAGE: ΕΛΛΗΝΙΚΑ

$COUNTRY_NAME = 'Ελλάδα';
$LANGUAGE_CODE = 'el';

//the language is according with the two-letter language code ISO 639-1
//http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

//***********************************************
//											   **
//      Translation for AUTOCOSTS.INFO         **
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
$CURR_CODE = 'EUR';
$CURR_NAME = 'Ευρώ';
$CURR_NAME_PLURAL = 'Ευρώ';
$CURR_NAME_BIG_PLURAL = 'ΕΥΡΩ';
$CURR_SYMBOL = '&euro;';
$STD_DIST = 'χλμ'; //short text version you'd like to apply
$STD_DIST_FULL = 'χιλιόμετρα';
$STD_FUEL_CALC = 'χλμ/λίτρο'; //text version you'd like to apply
$STD_VOLUME_SHORT = 'λίτρο'; //short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)

//simple words
$WORD_PER = 'ανά';     //ex: 4 km _per_ day
$WORDS_PER_EACH = 'κάθε';   //ex: 4 miles _ per each_ two months
$WORD_TIMES = 'φορές'; //ex: 4 times per week
$DURING = 'για';   //spent in tolls 3€ per day _during_ 22 days per month
$WORD_PEOPLE = 'άτομα';   //plural, 3 _people_ 
$YES = 'ναι';
$NO = 'όχι';

$BUTTON_RUN = 'Υπολογισμός'; //run calculator button 
$BUTTON_RERUN = 'Νέος υπολογισμός'; //run calculator button 

//WEB PAGE
$WEB_PAGE_TITLE = 'Υπολογιστής εξόδων αυτοκινήτου';
$MAIN_TITLE = 'ΥΠΟΛΟΓΙΣΤΗΣ ΕΞΟΔΩΝ ΑΥΤΟΚΙΝΗΤΟΥ';
$INITIAL_TEXT = 
"Αυτή η εφαρμογή θα σας επιτρέψει να υπολογίσετε <b>τα πραγματικά έξοδα</b> ενός αυτοκινήτου στην <b>Ελλάδα</b>. Θα σας δώσει μια σωστή εκτίμηση για το πόσα πραγματικά χρειάζεται να ξοδεύετε ως ιδιοκτήτες ενός αυτοκινήτου. Καθώς τα έξοδα του αυτοκινήτου τρέχουν όλο το χρόνο, συχνά είναι δύσκολο να έχει κανείς μια πλήρη εικόνα των συνολικών εξόδων του αυτοκινήτου του. Να είστε ρεαλιστές με τα δεδομένα που εισάγετε. Για έκτακτα έξοδα, όπως επιδιορθώσεις έπειτα από τροχαία ατυχήματα ή πρόστιμα, υπολογίστε πόσα έχετε δαπανήσει σε παρόμοιες περιπτώσεις τα τελευταία χρόνια. Από προεπιλογή, οι τιμές αυτές έχουν υπολογιστεί σε μηνιαία βάση. Χρησιμοποιήστε το σημείο για δεκαδικούς, για παράδειγμα 8.7 χιλιόμετρα μεταξύ σπιτιού και εργασίας.<br>";

$HELP_PROJECT = 'Η υπηρεσία παρέχεται δωρεάν, χωρίς διαφημίσεις!'; 
$AC_MOBILE = 'ΕΞΟΔΑ ΑΥΤΟΚΙΝΗΤΟΥ<br>για φορητές συσκευές'; 
$AC_DOMAIN = 'AUTOCOSTS.INFO/GR';
$AC_SUB_HEADER = 'ΥΠΟΛΟΓΙΣΤΗΣ ΕΞΟΔΩΝ ΑΥΤΟΚΙΝΗΤΟΥ';

//time words $DAYLY = 'ημερησίως'; 
$WEEKLY = 'εβδομαδιαίως'; 
$MONTHLY = 'μηνιαίως'; 
$TRIMESTERLY = 'τριμηνιαίως'; 
$SEMESTERLY = 'εξαμηνιαίως'; 
$YEARLY = 'ετησίως';

$MIN = 'λπτ';
$MINUTES = 'λεπτά';
$HOUR = 'ώρα';
$HOURS = 'ώρες';
$HOUR_ABBR = 'ω.';
$DAY = 'ημέρα'; 
$DAYS = 'ημέρες'; 
$WEEK = 'εβδομάδα'; 
$WEEKS = 'εβδομάδες'; 
$MONTH = 'μήνα'; 
$MONTHS = 'μήνες'; 
$TWO_MONTHS = 'δύο μήνες'; 
$DIST_EACH_TWO_MONTHS = 'χιλιόμετρα ανά δύο μήνες'; 
$TRIMESTER = 'τρίμηνο'; 
$SEMESTER = 'εξάμηνο'; 
$YEAR = 'έτος';

$DAYS_PER_WEEK_SHORT= 'ημέρες/εβδομάδα';

//distance
$DISTANCE = "Απόσταση";

//statistics
$AVERAGE_COSTS_PER_TYPE = 'Μέσο μηνιαίο κόστος ανά τύπο';
$STATISTIC_TITLE = 'Δαπάνες αυτοκινήτων για την';
$DEPRECIATION_ST = 'Απόσβεση';
$INSURANCE_ST = 'Ασφάλιση';
$REP_ST = 'Επισκευές';
$WASHING_ST = 'Пλύσιμο';
$VIRTUAL_SPEED_TITLE = 'Eικονική ταχύτητα';
$KINETIC_SPEED_TITLE = 'Tαχύτητα κίνησης';

//calculator words $COSTS= "'Εξοδα"; 
$FIXED_COSTS = 'Πάγια έξοδα'; 
$FIXED_COSTS_HEADER_1= 'ΠΑΓΙΑ ΕΞΟΔΑ'; //capital letters 
$FIXED_COSTS_HEADER_2= "Όσα δεν σχετίζονται με τις αποστάσεις που διανύει το αυτοκίνητο και πρέπει να τα πληρώνει ο ιδιοκτήτης για να έχει αυτοκίνητο στη διάθεσή του"; 

$RUNNING_COSTS = 'Λειτουργικά έξοδα'; 
$RUNNING_COSTS_HEADER_1 = 'ΛΕΙΤΟΥΡΓΙΚΑ ΕΞΟΔΑ'; //capital letters 
$RUNNING_COSTS_HEADER_2 = 'Όσα εξαρτώνται από τις αποστάσεις που διανύει ένα αυτοκίνητο.';

$PRIVATE_COSTS = 'Προσωπικά έξοδα'; 
$MONTHLY_AMOUNT = 'Μηνιαίο ποσό'; 
$RUN_CP_DIST = 'Λειτουργικά έξοδα ανά χιλιόμετρο'; //running costs per unit distance 
$TOTAL_CP_DIST = 'Συνολικά έξοδα ανά χιλιόμετρο'; //total costs per unit distance 
$PUBL_TRA_EQUIV= "Αντίστοιχα ποσά μετακίνησης σε περίπτωση που δεν διαθέτετε αυτοκίνητο."; 
$WORD_TOTAL_CAP = 'ΣΥΝΟΛΟ'; //capital word for total

$WORD_PRINT = 'Εκτύπωση';
$WORD_DOWNLOAD_PDF = 'Λήψη αναφοράς σε μορφή PDF';

//depreciation 
$DEPRECIATION = 'Υποτίμηση της αξίας του οχήματος'; 
$AQ_DATE = 'Ημερομηνία απόκτησης του αυτοκινήτου'; 
$COM_VALUE = 'Εμπορική αξία του αυτοκινήτου όταν το αγοράσατε<br><i>αν πρόκειται για καινούργιο, εισάγετε την τιμή αγοράς του<br>αν πρόκειται για μεταχειρισμένο, εισάγετε την εμπορική αξία που είχε το αυτοκίνητο όταν το αποκτήσατε</i>'; 
$COM_VALUE_TODAY = 'Σημερινή εμπορική αξία του αυτοκινήτου<br><i>αν το πουλήσετε σήμερα, πόσα χρήματα θα πάρετε;</i>'; 
$PERIOD_OWN = 'Διάστημα κατοχής του οχήματος'; 
$FINAL_VALUE = 'Τελική αξία'; 
$AQ_VALUE = 'Αξία κτήσης';

//insurance 
$INSURANCE = 'Ασφάλεια οχήματος και κάλυψη σε περίπτωση βλάβης'; 
$INSURANCE_SHORT = 'Ασφάλεια και κάλυψη σε περίπτωση βλάβης';

//credit 
$CREDIT = 'Χρηματοδότηση για την αγορά αυτοκινήτου'; 
$CREDIT_PERIOD = 'Περίοδος'; 
$CREDIT_INTERESTS = 'Επιτόκιο δανείου'; 
$CREDIT_INTERESTS_MONTH = 'Μηνιαίο επιτόκιο'; 
$CREDIT_TOTAL_INTERESTS = 'Συνολικό ποσό επιτοκίου'; 
$CREDIT_QUESTION = 'Πήρατε δάνειο για να αποκτήσετε το όχημα;'; 
$CREDIT_LOAN = 'Ποσό δανείου:<br><i>Πόσα χρήματα δανειστήκατε;</i>'; 
$CREDIT_LOAN2 = 'Ποσό δανείου'; 
$CREDIT_PERIOD = 'Περίοδος δανείου / αριθμός δόσεων'; 
$CREDIT_AVERAGE_VALUE = 'Μέσος όρος κάθε δόσης'; 
$CREDIT_RESIDUAL_VALUE = 'Καθαρή απομένουσα αξία:<br><i>Αφου τελειώσει η περίοδος δανείου, πόσα θα χρωστάτε ακόμη ή πόσα έχετε ήδη καταβάλλει;</i>'; 
$CREDIT_RESIDUAL_VALUE1 = 'Καθαρή απομένουσα αξία'; 
$CREDIT_INSTALMENT = 'Μέση μηνιαία αξία';

//inspection 
$INSPECTION = 'ΚΤΕΟ'; 
$INSPECTION_SHORT = 'ΚΤΕΟ'; 
$INSPECTION_NBMR_TIMES = 'Πόσες φορές έχετε περάσει το αυτοκίνητό σας από ΚΤΕΟ;'; 
$INSPECTION_PRICE =  'Μέσο κόστος για κάθε έλεγχο ΚΤΕΟ'; 
$EACH_ONE_DURING = 'ένα κάθε'; //5 times costing 15€ *each one during* 20 months (inspection) 
$TIMES_COSTING = 'φορές από';     //5 *times costing* 15€ each one during 20 months (inspection)

//road taxes 
$ROAD_TAXES = 'Τέλη κυκλοφορίας (αν ισχύουν)'; 
$ROAD_TAXES_SHORT = 'Φόρος οχήματος'; 
$ROAD_TAXES_VALUE = 'Φόροι που επιβάλλοντται στους ιδιοκτήτες αυτοκινήτων:<br><i>το ποσό εισπράττεται από το Κράτος</i>';

//fuel 
$FUEL = 'Καύσιμα'; 
$FUEL_DESC = 'Βενζίνη, πετρέλαιο, ηλεκτρισμός'; 
$FUEL_CALC = 'Υπολογισμοί με βάση'; 
$FUEL_JOB_CALC = 'Πηγαίνετε με το αυτοκίνητο στη δουλειά;'; 
$FUEL_JOB_CALC1 = 'Ημέρα/ημέρες την εβδομάδα που πηγαίνετε στη δουλειά με το αυτοκίνητο'; 
$FUEL_DAYS = 'Ημέρα/ημέρες την εβδομάδα που πηγαίνετε στη δουλειά με το αυτοκίνητο'; 
$FUEL_DIST_HOME_JOB = 'Χιλιόμετρα που διανύετε από το σπίτι ως τη δουλειά(μόνο για να πάτε)'; 

//$CURR_DIST=km, miles, etc. 
$FUEL_DIST_HOME_JOB1 = 'χιλιόμετρα που διανύετε από το σπίτι ως τη δουλειά'; 
//you drive 7 miles between home and your job 
$FUEL_DIST_NO_JOB = "Μέσος όρος χιλιομέτρων που διανύετε τις ημέρες που δεν πάτε στη δουλειά με το αυτοκίνητό σας:<br><i>για παράδειγμα κάθε Σαββατοκύριακο</i>"; 
$FUEL_DIST_NO_JOB1 = "μέσος όρος χιλιομέτρων που διανύετε τις ημέρες που δεν πάτε στη δουλειά με το αυτοκίνητό σας"; // you do 5 miles per week.... 
$FUEL_DIST = 'Χιλιόμετρα που διανύετε'; 
$FUEL_CAR_EFF = 'Αποδοτικότητα καυσίμων του οχήματός σας'; 
$FUEL_PRICE = 'Μέσος όρος χρημάτων που πληρώνετε για καύσιμα/βενζίνη'; 
$FUEL_PRICE1 = 'Μέση τιμή βενζίνης'; 
$YOU_DRIVE_TOTTALY_AVG = 'Μέση κατανάλωση καυσίμων'; //__You drive on average a total of __ 5 miles per day 
$YOU_DRIVE = 'Διανύετε'; //__You drive__ 5 miles per day

//MAINTENANCE 
$MAINTENANCE = 'Συντήρηση'; 
$MAINTENANCE_DESC = 'Μέσο κόστος συντήρησης και κάλυψης σε περίπτωση βλάβης:<br><i>αλλαγή λαδιών μηχανής, φίλτρα, φώτα, ελαστικά, φρένα, κλιματισμός, ευθυγράμμιση, κτλ.</i>';

//REPAIRS AND IMPROVEMENTS 
$REP_IMPROV = 'Επισκευές και βελτιώσεις'; 
$REP_IMPROV_DESC = 'Μέσο κόστος για επισκευές και βελτιώσεις:<br><i>ανταλλακτικά αυτοκινήτου, μετατροπές, επισκευές ελαττωμάτων, χτυπήματα, συγκρούσεις, αναβάθμιση, κτλ.</i>';

//PARKING 
$PARKING = 'Στάθμευση'; 
$PARKING_DESC = 'Μέσο κόστος στάθμευσης:<br><i>παρκόμετρα στην πόλη, ενοικίαση χώρου στάθμευσης, υπόγειοι και επίγειοι χώροι στάθμευσης οχημάτων σε δημόσια κτίρια, εμπορικά κέντρα, αεροδρόμια, σταθμούς λεωφορείων ή τρένων ή σε οποιοδήποτε άλλο χώρο.</i>';

//TOLLS 
$TOLLS = 'Διόδια'; 
$TOLLS_DESC = 'Μέσος όρος για διόδια σε δρόμους,<br><i>γέφυρες, τούνελ, εθνικές οδούς και τέλη κυκλοφοριακής συμφόρησης για πρόσβαση σε περιοχή με διόδια</i>'; 
$TOLLS_DAY_CALC = 'Ημερήσιος υπολογισμός'; 
$TOLLS_DAY_CALC1 = 'Ποσό που ξοδεύετε στα διόδια ημερησίως'; 
$TOLLS_DAY_CALC_DESC = 'Σκεφτείτε τα σπάνια ταξίδια που κάνετε εκτός πόλης ή στην εξοχή ή οποιοδήποτε άλλο είδος ηλεκτρονικών διοδίων.';

//FINES 
$FINES = 'Κλήσεις Τροχαίας'; 
$FINES_DESC = 'Μέσος όρος χρημάτων που καταβάλετε σε κλήσεις:<br><i>σκεφτείτε πόσο χρήματα έχετε ξοδέψει τα τελευταία χρόνια σε κλήσεις (παράνομη στάθμευση, παραβίαση του ορίου ταχύτητας, πρόστιμο για τη χρήση κινητού τηλεφώνου, κτλ.)</i>';

//WASHING 
$WASHING = 'Πλύσιμο και καθαρισμός'; 
$WASHING_DESC = 'Μέσος όρος εξόδων για τον καθαρισμό του αυτοκινήτου και για παρκαδόρους:<br><i>σε βενζινάδικα και αλλού</i>';

//TOTAL 
$TOTAL_FIXED = 'ΣΥΝΟΛΟ - Πάγια τέλη'; 
$TOTAL_FIXED_DESCR = "Έξοδα που δεν εξαρτώνται από την απόσταση του διανύετε και τέλη που καταβάλλονται ακόμη και αν το αυτοκίνητο δεν χρησιμοποιείται"; 
$TOTAL_FIXED_DESCR2 = 'Υποτίμηση, Ασφάλεια, Δάνειο, Τέλη, Έλεγχος και 50% των εξόδων στάθμευσης και συντήρησης';

$TOTAL_VARIABLE = 'ΣΥΝΟΛΟ - Λειτουργικά έξοδα'; 
$TOTAL_VARIABLE_DESCR = 'Έξοδα που εξαρτώνται από τα χιλιόμετρα που διανύετε'; 
$TOTAL_VARIABLE_DESCR2 = 'Καύσιμα, επισκευές και βελτιώσεις, στάθμευση (δεδομένου ότι πληρώνετε μόνο όταν χρησιμοποιείτε το όχημα), διόδια, κλήσεις, πλύσιμο και 50% των εξόδων συντήρησης';


//EXTRA DATA 
$EXTRA_DATA = 'ΕΠΙΠΛΕΟΝ ΔΕΔΟΜΕΝΑ'; 
$EXTRA_DATA1 = 'Επιπλέον δεδομένα'; 
$EXTRA_DATA_PUBLIC_TRANSP = 'Μέσα Μαζικής Μεταφοράς';
$EXTRA_DATA_FAMILY_NBR = 'Πόσα άτομα άνω των 4 ετών υπάρχουν στην οικογένειά σας (συμπεριλάβετε και εσάς)'; 
$EXTRA_DATA_PRICE_PASS = "Πόσα ξοδεύετε ανά άτομο μηνιαίως σε μέσα μαζικής μεταφοράς στην καθημερινότητά σας<br><i>αν δεν χρησιμοποιείτε μέσα μαζικής μεταφοράς σημειώστε 0</i>";
$EXTRA_DATA_INCOME = "Εισόδημα";
$EXTRA_DATA_INCOME_QUESTION = 'Πόσο είναι το καθαρό σας εισόδημα;';
$EXTRA_DATA_WORKING_TIME = 'Χρόνος εργασίας';
$EXTRA_DATA_WORKING_TIME_QUESTION = 'Ασκείτε κάποιο επάγγελμα;';
$EXTRA_DATA_TIME_SPENT_IN_DRIVING = 'Χρόνος που αφιερώνετε στην οδήγηση';
$EXTRA_DATA_TIME_QUESTION1 = 'Πόση ώρα οδηγείτε για να μεταβείτε από το σπίτι σας στην εργασίας σας;(απλή μετάβαση)';
$EXTRA_DATA_TIME_QUESTION2 = 'Πόση ώρα οδηγείτε τις ημέρες που δεν πάτε στην εργασία σας με το αυτοκίνητο;';
$EXTRA_DATA_TIME_QUESTION3 = 'Πόση ώρα οδηγείτε;';

//PUBLIC TRANSPORTS 
$PUB_TRANS_TEXT = 'Μέσα μαζικής μεταφοράς για την καθημερινότητα της οικογένειάς σας'; 
$FAM_NBR = 'Αριθμός ατόμων στην οικογένειά σας που είναι άνω των 4 ετών'; 
$PERSON_OR_PEOPLE = 'άτομο(-α)'; 
$PASS_MONTH_AVG = 'Μέσο κόστος μηνιαίας κάρτας μεταφορών ανά άτομο'; 
$OTHER_PUB_TRANS = 'Άλλο μέσο μαζικής μεταφοράς'; 
$OTHER_PUB_TRANS_DESC = "Ποσό από άλλο είδος μαζικής μεταφοράς, για παράδειγμα εκτός της περιοχής που μένετε, όπως μεγάλα ταξίδια με τρένο ή λεωφορείο"; 
$TAXI_DESL = "Μεταφορά με ταξί"; 
$ON_TAXI_PAYING = "πληρώνοντας για ταξί"; //ex: 4 miles__on taxi paying__ 5€ per mile

//VIRTUAL SPEED
$FINANCIAL_EFFORT = 'Χρηματοδότηση';
$NET_INCOME_PER = 'Καθαρό εισόδημα ανά';
$AVERAGE_NET_INCOME_PER = 'Μέσος όρος καθαρού εισοδήματος ανά';
$NUMBER_OF_MONTHS = 'Αριθμός μηνών ανά έτος εισοδήματος';
$NUMBER_OF_WEEKS = 'Αριθμός εβδομάδων ανά έτος εισοδήματος';
$NUMBER_OF_HOURS= 'Αριθμός ωρών ανά εβδομάδα εισοδήματος';
$HOURS_PER = 'Ώρες ανά';
$MONTHS_PER = 'Μήνες ανά';
$AVERAGE_WORKING_HOURS_PER = 'Μέσος όρος ωρών εργασίας ανά';
$WORKING_HOURS_PER = 'Ώρες εργασίας ανά';
$DIST_HOME_JOB = 'Οδηγείτε από το σπίτι στην εργασία σας';
$DAYS_DRIVE_JOB = 'Ημέρες ανά εβδομάδα που πηγαίνετε στην εργασία σας με το αυτοκίνητο';
$DIST_JORNEY_WEEKEND = 'Οδηγείτε τις ημέρες που δεν παίρνετε το αυτοκίνητό στην εργασία σας';
$AVERAGE_DIST_PER_WEEK = 'Οδηγείτε κατα μέσο όρο την εβδομάδα';
$YOU_DRIVE_PER = 'Οδηγείτε ανά';
$MINUTES_HOME_JOB = 'Λεπτά που οδηγείτε για να μεταβείτε από το σπίτι στην εργασία σας';
$DAYS_DRIVE_TO_JOB = 'Ημέρες την εβδομάδα που πηγαίνετε στην εργασία σας με το αυτοκίνητο';
$TIME_DRIVE_WEEKEND = 'Λεπτά που οδηγείτε τις ημέρες που δεν πηγαίνετε με το αυτοκίνητο στη δουλειά σας';
$MINUTES_DRIVE_PER = 'Λεπτά που οδηγείτε ανά';
$DAYS_DRIVE_PER_MONTH = 'Ημέρες που οδηγείτε ανά μήνα';
$HOURS_DRIVE_PER = 'Ώρες που οδηγείτε ανά';
$VIRTUAL_SPEED = 'εικονική ταχύτητα';
$KINETIC_SPEED = 'ταχύτητα κίνησης';
$AVER_YEARLY = 'Μέσος όρος ετησίως';
$WORKING_TIME_MESSAGE = 'Για να γίνει ο υπολογισμός τέθηκε ως δεδομένο ένας μέσος όρος 36 ωρών την εβδομάδα και 11 μηνών ετησίως';
$HOURS_TO_AFFORD_CAR = 'Ώρες που χρειάζεται να εργάζεστε ετησίως ώστε να μπορείτε να συντηρείτε το αυτοκίνητό σας';
$MONTHS_TO_AFFORD_CAR = 'Μήνες που χρειάζεται να εργάζεστε ετησίως ώστε να μπορείτε να συντηρείτε το αυτοκίνητό σας';
$TOTAL_COSTS_PER_YEAR = 'Συνόλικό ετήσιο κόστος του οχήματος';
$DAYS_CAR_PAID = 'Για πόσες ημέρες, μέτα την 1η Ιανουαρίου, καταβάλετε χρήματα για το αυτοκίνητο';

//************************************************** 
//GRAPHICS 
$PARCEL = 'Πακέτο'; 
$COSTS = 'Κόστος';


//**************************************************** //ERROR MESSAGES 
$ERROR_INVALID_INSU_VALUE = 'Μη έγκυρο ποσό ασφάλισης'; 
$ERROR_INSU_PERIOD = 'Εισάγετε τη συχνότητα καταβολής των πληρωμών της ασφάλειας';

$ERROR_FUEL_CURR_DIST = 'Πρέπει να ορίσετε αν επιθυμείτε να κάνετε υπολογισμούς βάσει χιλιομέτρων ή ευρώ.'; 
$ERROR_FUEL_CAR_EFF = 'Μη έγκυρο ποσό αποδοτικότητας καυσίμων'; 
$ERROR_FUEL_PRICE = 'Μη έγκυρη τιμή βενζίνης'; 
$ERROR_CAR_JOB = 'Παρακαλούμε αναφέρετε αν πηγαίνετε στη δουλειά σας με το αυτοκίνητο.'; 
$ERROR_FUEL_DIST = 'Μη έγκυρη τιμή για τα χιλιόμετρα που διανύετε κάθε μήνα'; 
$ERROR_DAYS_PER_WEEK = 'Μη έγκυρος αριθμός ημερών ανά εβδομάδα'; 
$ERROR_DIST_HOME_WORK = 'Μη έγκυρος αριθμός χιλιομέτρων μεταξύ σπιτιού και εργασίας'; 
$ERROR_DIST_NO_JOB = "Μη έγκυρος αριθμός χιλιομέτρων που διανύετε με το αυτοκίνητο τις ημέρες που δεν παίρνετε το αυτοκίνητο στη δουλειά σας"; 
$ERROR_CURRENCY = 'Μη έγκυρο ποσό ευρώ ανά μήνα';

$ERROR_DEPRECIATION_MONTH = 'Μη έγκυρος μήνας απόκτησης'; 
$ERROR_DEPRECIATION_YEAR = 'Μη έγκυρο έτος απόκτησης'; 
$ERROR_DEPRECIATION_VALUE = 'Μη έγκυρο ποσό απόκτησης'; 
$ERROR_DEPRECIATION_VALUE_TODAY = 'Μη έγκυρη τωρινή αξία οχήματος'; 
$ERROR_DEPRECIATION_DATE = 'Μη έγκυρη ημερομηνία απόκτησης'; 
$ERROR_DEPRECIATION_NEW_CAR =  'Η υποτίμηση δεν ισχύει γιατί το όχημα είναι καινούργιο';

$ERROR_CREDIT_QUESTION = 'Παρακαλούμε διευκρινίστε εάν πήρατε δάνειο για το αυτοκίνητο'; 
$ERROR_CREDIT_LOAN_VALUE = 'Μη έγκυρο ποσό δανείου'; 
$ERROR_CREDIT_PERIOD = 'Μη έγκυρη περίοδος δανείου, αριθμός δόσεων'; 
$ERROR_CREDIT_INSTALMENT = 'Μη έγκυρο ποσό δόσης'; 
$ERROR_CREDIT_RESIDUAL_VALUE = 'Μη έγκυρη καθαρή απομένουσα αξία';

$ERROR_INSPECTION_NTIMES = 'Μη έγκυρος αριθμός ελέγχων ΚΤΕΟ'; 
$ERROR_INSPECTION_COSTS = 'Μη έγκυρο κόστος ελέγχου ΚΤΕΟ';

$INVALID_AMOUNT = 'Μη έγκυρο ποσό';

$INVALID_NBR_PP = 'Μη έγκυρος αριθμός ατόμων'; 
$ERROR_PASS_AMOUNT= 'Μη έγκυρο ποσό μηνιαίων εισιτηρίων';

$ERROR_INCOME = 'Μη έγκυρο καθαρό εισόδημα';
$ERROR_WEEKS_PER_YEAR = 'Μη έγκυρος αριθμός εβδομάδων ετησίως';
$ERROR_MONTHS_PER_YEAR = 'Μη έγκυρος αριθμός μηνών ετησίως';
$ERROR_HOURS_PER_WEEK = 'Μη έγκυρος αριθμός ωρών ανά εβδομάδα';
$ERROR_MIN_DRIVE_HOME_JOB = 'Μη έγκυρος αριθμός λεπτών που οδηγείτε από το σπίτι στην εργασία σας';
$ERROR_MIN_DRIVE_WEEKEND = 'Μη έγκυρος αριθμός λεπτών που οδηγείτε τις ημέρες που δεν παίρνετε το αυτοκίνητο στη δουλειά';
$ERROR_MIN_DRIVE = 'Μη έγκυρος αριθμός λεπτών που οδηγείτε';
$ERROR_DAYS_PER_MONTH = 'Μη έγκυρος αριθμός ημερών ανά μήνα';

$YOUR_CAR_COSTS_YOU = 'Το αυτοκίνητό σας, σάς στοιχίζει'; 
$WITH_THIS_LEVEL_OF_COSTS = 'Με αυτά τα έξοδα, για τους'; //ex: __"With this level of costs for your car during the"__ 15 months of possession.... 
$MONTHS_POSS = 'μήνες που έχετε στην κατοχή σας το όχημα, σας έχει στοιχίσει ήδη';   //ex: With this level of costs for your car during the 15 ___"months of possession, it has already been determined to be "___ 14000 Euros/USD


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