                                             
# Translations

This file explians the meaning of each key and value for each JSON country file.<br> 
Each file is adapted for each country, and not language, thus US.json is different from CA.json, since they have different standards for fuel efficiency for example.

The language codes for each file name, are according to the two-letter <a href="http:en.wikipedia.org/wiki/List_of_ISO_639-1_codes">language code ISO 639-1</a>
<br>

## Country

Example:

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>country_name</td><td>"United Kingdom"</td><td>The country name in its own language</td></tr>
<tr><td>curr_code</td><td>"GBP"</td><td><a href="https://en.wikipedia.org/wiki/ISO_4217">The 3-letter ISO currency code</a></td></tr>
</table>

IMPORTANT: Preserve always the same standards, BE CHOERENT between the text variables and the standard options<br>

## Fuel efficiency 

Fuel efficiency for car engine standard<br>
<br>
The <b>value</b> of the key <b>fuel_efficiency_std_option</b> shall be the number according to the table:

<table>
<tr><th>key value </th><th>standard </th><th> description</th></tr>
<tr><td>1 </td><td> l/100km </td><td> litres per 100 kilometres</td></tr>
<tr><td>2 </td><td> km/l    </td><td> kilometres per litre</td></tr>
<tr><td>3 </td><td> mpg(imp) </td><td> miles per imperial gallon</td></tr>
<tr><td>4 </td><td> mpg(US) </td><td> miles per US gallon</td></tr>
<tr><td>5 </td><td> l/mil </td><td> litres per 10 kilometers </td></tr>
<tr><td>6 </td><td> km/gal(US) </td><td> km per US gallon </td></tr>
</table>

## Standard distance

The <b>value</b> of the key <b>distance_std_option</b> shall be the number according to the table:

<table>
<tr><th>key value</th><th>description</th></tr>
<tr><td>1</td><td>kilometres</td></tr>
<tr><td>2</td><td>miles</td></tr>
</table>

## Standard volume for the price of fuels

ex: Currency(,£,€,etc.)/(Litre, Imp gallon, US gallon) <br>
The <b>value</b> of the key <b>fuel_price_volume_std</b> shall be the number according to the table:

<table>
<tr><th>key value</th><th>description</th></tr>
<tr><td>1</td><td>litres</td></tr>
<tr><td>2</td><td>imperial gallons</td></tr>
<tr><td>3</td><td>US gallons</td></tr>
</table>

## standards in text

in text version<br>
<br>
IMPORTANT: BE COHERENT with the above standards<br>
<br>
Example for USA<br>
<br>
CURR_CODE = 'USD'; the 3-letter currency ISO code<br>
CURR_NAME = 'Dollar';<br>
CURR_NAME_PLURAL = 'Dollars';<br>
CURR_NAME_BIG_PLURAL = 'DOLLARS';<br>
CURR_SYMBOL = '&#36;';<br>
STD_DIST = 'mi'; short text version you'd like to apply<br>
STD_DIST_FULL = 'miles';<br>
STD_FUEL_CALC = 'mpg(US)'; text version you'd like to apply<br>
STD_VOLUME_SHORT = 'gallon'; short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)<br>

## simple words

WORD_PER = 'per';     ex: 4 km _per_ day<br>
WORDS_PER_EACH = 'per each';   ex: 4 miles _ per each_ two months<br>
WORD_TIMES = 'times'; ex: 4 times per week<br>
DURING = 'during';   spent in tolls 3€ per day _during_ 22 days per month<br>
WORD_PEOPLE = 'people';   plural, 3 _people_ <br>
YES = 'yes';<br>
NO = 'no';<br>
BUTTON_RUN = 'Run'; run calculator button <br>
BUTTON_RERUN = 'Rerun'; run calculator button <br>

## web page wordings

WEB_PAGE_TITLE = 'Automobile costs calculator';<br>
MAIN_TITLE = 'AUTOMOBILE COSTS CALCULATOR';<br>
INITIAL_TEXT = <br>
"This calculator will allow you to find <b>the true cost</b> of owning a car in the <b>United States</b>. It will normally give you a good estimate of what you really need to spend on car ownership. As car payments and expenses come due throughout the year, it's often difficult to really get a good understanding of total spending on your car. Be realistic on the values you input. For unexpected expenses, such as accident repairs or fines, think about how much you have spent on such items over the last few years. By default, these values are calculated on a monthly basis. Use the the dot symbol for decimal notation, for example 8.7 miles between home and the workplace.";
DISCLAIMER = "This calculator is <b>completely anonymous</b>, as it doesn't request nor permanently store, any name, email, cookies, IP address nor any other personal information.";<br>
<br>
HELP_PROJECT = 'This is a free service with no advertisements!'; <br>
AC_MOBILE = 'AUTOCOSTS<br>for mobile devices'; <br>
AC_SUB_HEADER = 'AUTOMOBILE COSTS CALCULATOR';<br>

## user statistics

VISITORS = 'Visitors';<br>
ONLINE = 'online';<br>
THIS_MONTH = 'this month';<br>
IN_TOTAL = 'in total'; in the sense of "the website had 10000 visitors *in total*"<br>
USERS = 'Users';<br>
FOR_COUNTRY = 'for USA'; in the sense of "10 users filled in *for Portugal". Replace Portugal accordingly.<br>
IN_TOTAL = 'in total'; in the sense of "10000 users filled in *in total* the form "<br>
CONTACT = 'Contact';<br>

## time words

DAYLY = 'daily'; <br>
WEEKLY = 'weekly'; <br>
MONTHLY = 'monthly'; <br>
TRIMESTERLY = 'quarterly'; <br>
SEMESTERLY = 'half&#8209;yearly'; <br>
YEARLY = 'yearly';<br>
MIN = 'min';<br>
MINUTES = 'minutes';<br>
HOUR = 'hour';<br>
HOURS = 'hours';<br>
HOUR_ABBR = 'h';<br>
DAY = 'day'; <br>
DAYS = 'days'; <br>
WEEK = 'week'; <br>
WEEKS = 'weeks'; <br>
MONTH = 'month'; <br>
MONTHS = 'months'; <br>
TWO_MONTHS = 'two months'; <br>
DIST_EACH_TWO_MONTHS = 'miles for every two months'; <br>
TRIMESTER = 'trimester'; <br>
SEMESTER = 'semester'; <br>
YEAR = 'year';<br>
DAYS_PER_WEEK_SHORT= 'days/week';<br>

## distance

DISTANCE = "Distance";<br>

## statistics

AVERAGE_COSTS_PER_TYPE = 'Average monthly cost per type';<br>
STATISTIC_TITLE = 'Automobile costs for';<br>
DEPRECIATION_ST = 'Depreciation';<br>
INSURANCE_ST = 'Insurance';<br>
REP_ST = 'Repairs';<br>
WASHING_ST = 'Washing';<br>
VIRTUAL_SPEED_TITLE = 'Consumer speed';<br>
KINETIC_SPEED_TITLE = 'Kinetic speed';<br>

## calculator words 

COSTS= "Costs"; <br>
FIXED_COSTS = 'Standing costs'; <br>
FIXED_COSTS_HEADER_1= 'STANDING COSTS'; capital letters <br>
FIXED_COSTS_HEADER_2= "Those that don't depend on the traveled distance, and one must pay to have the car available for use"; <br>
RUNNING_COSTS = 'Running costs'; <br>
RUNNING_COSTS_HEADER_1 = 'RUNNING COSTS'; capital letters <br>
RUNNING_COSTS_HEADER_2 = 'Those that depend on the traveled distance';<br>
PRIVATE_COSTS = 'Private costs'; <br>
MONTHLY_AMOUNT = 'Monthly amount'; <br>
RUN_CP_DIST = 'Running costs per mile'; running costs per unit distance <br>
TOTAL_CP_DIST = 'Total costs per mile'; total costs per unit distance <br>
PUBL_TRA_EQUIV= "Equivalent transport costs, considering you don't own a car"; <br>
WORD_TOTAL_CAP = 'TOTAL'; capital word for total<br>
WORD_PRINT = 'Print';<br>
WORD_DOWNLOAD_PDF = 'Download PDF report';<br>

## depreciation 

DEPRECIATION = 'Depreciation of the vehicle'; <br>
AQ_DATE = 'Car acquisition date'; <br>
COM_VALUE = 'Commercial value of the car when you bought it<br><i>if new, the price you paid for the car<br>if used, the commercial value the car had when you acquired it</i>'; <br>
COM_VALUE_TODAY = 'Commercial value of the car today<br><i>if you sell it now, how much would you get?</i>'; <br>
PERIOD_OWN = 'Time period of ownership'; <br>
FINAL_VALUE = 'Final value'; <br>
AQ_VALUE = 'Acquisition value';<br>

## insurance 

INSURANCE = 'Vehicle insurance and breakdown coverage'; <br>
INSURANCE_SHORT = 'Insurance and breakdown coverage';<br>

## credit 

CREDIT = 'Car finance'; <br>
CREDIT_PERIOD = 'Period'; <br>
CREDIT_INTERESTS = 'Loan interest'; <br>
CREDIT_INTERESTS_MONTH = 'Monthly amount spent on interest'; <br>
CREDIT_TOTAL_INTERESTS = 'Total amount of interest paid'; <br>
CREDIT_QUESTION = 'Did you use auto financing to acquire the vehicle?'; <br>
CREDIT_LOAN = 'Financed amount:<br><i>How much did you borrow?</i>'; <br>
CREDIT_LOAN2 = 'Financed amount'; <br>
CREDIT_PERIOD = 'Credit period / number of installments'; <br>
CREDIT_AVERAGE_VALUE = 'Average amount of each installment'; <br>
CREDIT_RESIDUAL_VALUE = 'Residual value:<br><i>At the end of the credit period, how much will you still need to pay or have paid?</i>'; <br>
CREDIT_RESIDUAL_VALUE1 = 'Residual value'; <br>
CREDIT_INSTALMENT = 'Monthly average value';<br>

## inspection 

INSPECTION = 'Vehicle inspection'; <br>
INSPECTION_SHORT = 'Inspection'; <br>
INSPECTION_NBMR_TIMES = 'How many times have you taken your car for vehicle inspection?'; <br>
INSPECTION_PRICE =  'Average cost per each vehicle inspection'; <br>
EACH_ONE_DURING = 'each one during'; 5 times costing 15€ *each one during* 20 months (inspection) <br>
TIMES_COSTING = 'times costing';     5 *times costing* 15€ each one during 20 months (inspection)<br>

## road taxes 

ROAD_TAXES = 'Vehicle Excise Tax (Auto taxes, if applicable)'; <br>
ROAD_TAXES_SHORT = 'Car Tax'; <br>
ROAD_TAXES_VALUE = 'Car taxes paid for owning your car:<br><i>payment made to the state</i>';<br>

## fuel 

FUEL = 'Fuel'; <br>
FUEL_DESC = 'Gas, diesel, electricity'; <br>
FUEL_CALC = 'Calculations based on'; <br>
FUEL_JOB_CALC = 'Considering you drive to work?'; <br>
FUEL_JOB_CALC1 = 'Day(s) per week you drive to work'; <br>
FUEL_DAYS = 'Day(s) per week you drive to work'; <br>
FUEL_DIST_HOME_JOB = 'Miles you drive between home and the workplace (one way)'; <br>
CURR_DIST=km, miles, etc. <br>
FUEL_DIST_HOME_JOB1 = 'miles between home and the workplace'; <br>
you drive 7 miles between home and your job <br>
FUEL_DIST_NO_JOB = "Miles you drive on average during the days you don't take your car to the workplace:<br><i>for example per each weekend</i>"; <br>
FUEL_DIST_NO_JOB1 = "miles on average during the days you don't take your car to the workplace";  you do 5 miles per week.... 
FUEL_DIST = 'Miles you drive'; <br>
FUEL_CAR_EFF = 'Fuel efficiency of your vehicle'; <br>
FUEL_PRICE = 'Average price you pay for fuel/gas'; <br>
FUEL_PRICE1 = 'Average price of gas'; <br>
YOU_DRIVE_TOTTALY_AVG = 'Total mileage driven on average'; __You drive on average a total of __ 5 miles per day 
YOU_DRIVE = 'You drive'; __You drive__ 5 miles per day

## maintenance 

MAINTENANCE = 'Maintenance'; <br>
MAINTENANCE_DESC = 'Average cost of maintenance and breakdown coverage:<br><i>engine oil substitution, filters, lights, tires, breaks, air conditioning, steering alignment, etc.</i>';<br>

## Repairs and Improvements

REP_IMPROV = 'Repairs and improvements'; <br>
REP_IMPROV_DESC = 'Average cost on repairs and improvements:<br><i>car parts, modifications, faulty repairs, dents, collisions, tuning, etc.</i>';<br>

## Parking

PARKING = 'Parking'; <br>
PARKING_DESC = 'Average cost with parking:<br><i>parking meters in the city, renting a parking space, underground or overground parking lots in public buildings, shopping centers, airports, bus or train stations or any other infrastructures.</i>';<br>

## Tools

TOLLS = 'Tolls'; <br>
TOLLS_DESC = 'Average amount spent on toll roads,<br><i>bridges, tunnels, interstates, and congestion charges to gain access to toll driving areas </i>'; <br>
TOLLS_DAY_CALC = 'Calculation based on day?'; <br>
TOLLS_DAY_CALC1 = 'Daily amount you spend on tolls'; <br>
TOLLS_DAY_CALC_DESC = 'Think about the rare trips you make beyond your town/city or to the countryside, or any kind of electronic toll collection';<br>

## Fines

FINES = 'Traffic tickets'; <br>
FINES_DESC = 'Average amount paid in traffic tickets:<br><i>think in the last few years about how much you paid in any kind of traffic tickets (illegal parking, speed limit violation, mobile phone usage fines, etc.)</i>';<br>

## Washing

WASHING = 'Washing and cleaning'; <br>
WASHING_DESC = 'Average car-washing and valet parking expenses:<br><i>in service stations and other places</i>';<br>

## Total 

TOTAL_FIXED = 'TOTAL - Standing costs'; <br>
TOTAL_FIXED_DESCR = "Costs that don't depend on the traveled distance and those costs which must be paid even if the car is not in use"; <br>
TOTAL_FIXED_DESCR2 = 'Depreciation, Insurance, Financing interest, Taxes, Inspection and 50% of parking and maintenance';<br>
TOTAL_VARIABLE = 'TOTAL - Running costs'; <br>
TOTAL_VARIABLE_DESCR = 'Costs that depend on the number of miles you drive'; <br>
TOTAL_VARIABLE_DESCR2 = 'Fuels, repairs, and improvements, Parking (considering you only pay when you use the car), tolls, traffic tickets, washing, and 50% of maintenance';<br>

## Additional data

EXTRA_DATA = 'ADDITIONAL DATA'; <br>
EXTRA_DATA1 = 'Additional data'; <br>
EXTRA_DATA_PUBLIC_TRANSP = 'Public transports';<br>
EXTRA_DATA_FAMILY_NBR = 'How many people older than 4 years old you have in your family (including you)'; <br>
EXTRA_DATA_PRICE_PASS = "What is the average price per person of public transportation on a monthly basis for your normal daily life<br><i>if public transport isn't an option for you, insert 0</i>";<br>
EXTRA_DATA_INCOME = "Income";<br>
EXTRA_DATA_INCOME_QUESTION = 'What is your net income?';<br>
EXTRA_DATA_WORKING_TIME = 'Working time';<br>
EXTRA_DATA_WORKING_TIME_QUESTION = 'Do you have a job or a worthy occupation?';<br>
EXTRA_DATA_TIME_SPENT_IN_DRIVING = 'Time spent in driving';<br>
EXTRA_DATA_TIME_QUESTION1 = 'How many minutes you drive from home to workplace? (just one way)';<br>
EXTRA_DATA_TIME_QUESTION2 = 'How many minutes you drive in the days you don\'t take the car to workplace?';<br>
EXTRA_DATA_TIME_QUESTION3 = 'How many minutes you drive?';<br>

## Public Transports

PUB_TRANS_TEXT = 'Public transportation for your family for daily life'; <br>
FAM_NBR = 'Number of members of your family older than 4 years old'; <br>
PERSON_OR_PEOPLE = 'person(s)'; <br>
PASS_MONTH_AVG = 'Average amount of of monthly transportation ticket pass costs per person'; <br>
OTHER_PUB_TRANS = 'Other public transportation'; <br>
OTHER_PUB_TRANS_DESC = "Amount that was still remaining from other public transportation, for example out of your residential area, such as a long journey by trains or buses"; <br>
TAXI_DESL = "Taxi transportation"; <br>
ON_TAXI_PAYING = "by paying for a taxi"; ex: 4 miles__on taxi paying__ 5€ per mile<br>

## Virtual speed

FINANCIAL_EFFORT = 'Financial effort';<br>
NET_INCOME_PER = 'Net income per';<br>
AVERAGE_NET_INCOME_PER = 'Average net income per';<br>
NUMBER_OF_MONTHS = 'Number of months per year of income';<br>
NUMBER_OF_WEEKS = 'Number of weeks per year of income';<br>
NUMBER_OF_HOURS= 'Number of hours per week of income';<br>
HOURS_PER = 'Hours per';<br>
MONTHS_PER = 'Months per';<br>
AVERAGE_WORKING_HOURS_PER = 'Average working hours per';<br>
WORKING_HOURS_PER = 'Working hours per';<br>
DIST_HOME_JOB = 'You drive from home to work';<br>
DAYS_DRIVE_JOB = 'Days per week you drive to work';<br>
DIST_JORNEY_WEEKEND = 'You drive during the days you don\'t take the car to workplace';<br>
AVERAGE_DIST_PER_WEEK = 'You drive on average per week';<br>
YOU_DRIVE_PER = 'You drive per';<br>
MINUTES_HOME_JOB = 'Minutes you drive from home to workplace';<br>
DAYS_DRIVE_TO_JOB = 'Days per week you drive to work';<br>
TIME_DRIVE_WEEKEND = 'Minutes you drive in the days you don\'t take the car to workplace';<br>
MINUTES_DRIVE_PER = 'Minutes you drive per';<br>
DAYS_DRIVE_PER_MONTH = 'Days you drive per month';<br>
HOURS_DRIVE_PER = 'Hours you drive per';<br>
VIRTUAL_SPEED = 'consumer speed';<br>
KINETIC_SPEED = 'kinetic speed';<br>
AVER_YEARLY = 'Average yearly';<br>
WORKING_TIME_MESSAGE = 'It was considered for calculations an average working time of 36 hours per week and 11 months per year';<br>
HOURS_TO_AFFORD_CAR = 'Hours per year you need to work to afford your car';<br>
MONTHS_TO_AFFORD_CAR = 'Months per year you need to work to afford your car';<br>
TOTAL_COSTS_PER_YEAR = 'Total costs per year for automobile';<br>
DAYS_CAR_PAID = 'For how many days, after the 1st of January, the car is paid';<br>

## Graphics 

PARCEL = 'Parcel'; <br>
COSTS = 'Costs';<br>

## Error messages

ERROR_INVALID_INSU_VALUE = 'Invalid insurance amount'; <br>
ERROR_INSU_PERIOD = 'Insert payment frequency of insurance payments';<br>
ERROR_FUEL_CURR_DIST = 'You must determine if you want to make calculations based on miles or USD'; <br>
ERROR_FUEL_CAR_EFF = 'Invalid gas efficiency amount'; <br>
ERROR_FUEL_PRICE = 'Invalid gas price'; <br>
ERROR_CAR_JOB = 'Please indicate if you take your car to the workplace'; <br>
ERROR_FUEL_DIST = 'Invalid amount of miles traveled per month'; <br>
ERROR_DAYS_PER_WEEK = 'Invalid number of days per week'; <br>
ERROR_DIST_HOME_WORK = 'Invalid miles between home and the workplace'; <br>
ERROR_DIST_NO_JOB = "Invalid number of miles you drive during the days you don't drive your car to the workplace"; <br>
ERROR_CURRENCY = 'Invalid USD per month';<br>
ERROR_DEPRECIATION_MONTH = 'Invalid acquisition month'; <br>
ERROR_DEPRECIATION_YEAR = 'Invalid acquisition year'; <br>
ERROR_DEPRECIATION_VALUE = 'Invalid acquisition amount'; <br>
ERROR_DEPRECIATION_VALUE_TODAY = 'Invalid present vehicle value'; <br>
ERROR_DEPRECIATION_DATE = 'Invalid acquisition date'; <br>
ERROR_DEPRECIATION_NEW_CAR =  'The depreciation does not apply because this vehicle is new';<br>
ERROR_CREDIT_QUESTION = 'Please determine if you used car financing'; <br>
ERROR_CREDIT_LOAN_VALUE = 'Invalid financed amount'; <br>
ERROR_CREDIT_PERIOD = 'Invalid period of credit, number of installment payments'; <br>
ERROR_CREDIT_INSTALMENT = 'Invalid installment amount'; <br>
ERROR_CREDIT_RESIDUAL_VALUE = 'Invalid residual value';<br>
ERROR_INSPECTION_NTIMES = 'Invalid number of times'; <br>
ERROR_INSPECTION_COSTS = 'Invalid inspection cost';<br>
INVALID_AMOUNT = 'Invalid amount';<br>
INVALID_NBR_PP = 'Invalid number of people'; <br>
ERROR_PASS_AMOUNT= 'Invalid monthly ticket amount';<br>
ERROR_INCOME = 'Invalid net income';<br>
ERROR_WEEKS_PER_YEAR = 'Invalid number of weeks per year';<br>
ERROR_MONTHS_PER_YEAR = 'Invalid number of months per year';<br>
ERROR_HOURS_PER_WEEK = 'Invalid number of hours per week';<br>
ERROR_MIN_DRIVE_HOME_JOB = 'Invalid number of minutes you drive from home to workplace';<br>
ERROR_MIN_DRIVE_WEEKEND = 'Invalid number of minutes you drive in the days you don\'t take the car to workplace';<br>
ERROR_MIN_DRIVE = 'Invalid number of minutes you drive';<br>
ERROR_DAYS_PER_MONTH = 'Invalid number of days per month';<br>
YOUR_CAR_COSTS_YOU = 'Your car costs'; <br>
WITH_THIS_LEVEL_OF_COSTS = 'With this level of costs, your vehicle during the'; ex: "With this level of costs for your car during the"__ 15 months of possession.... <br>
MONTHS_POSS = 'months of possession has already been determined';   ex: With this level of costs for your car during the 15 "months of possession, it has already been determined to be " 14000 Euros/USD<br>
TAXI_PRICE_PER_DIST=2.5; amount paid for taxi in chosen currency per chosen unit distance<br>


## Standard Value

Values that appear on the start page <br>
these values are to be changed by the user but you must insert values that are reasonable <br>
keep in mind your chosen standard currency as well as your volume and fuel efficiency standards<br>
<br>
STD_ACQ_MONTH = '01'; month of acquisition <br>
STD_ACQ_YEAR = '2000'; year of acquisition <br>
STD_PRICE_PAID = ''; price paid for the car<br>
STD_PRICE_TODAY = ''; the price the car has today<br>
STD_INSURANCE_SEM = ''; price paid for insurance by semester<br>
STD_LOAN = ''; amount asked for credit<br>
STD_PERIOD_OF_CREDIT = ''; period of the credit in months<br>
STD_MONTHLY_PAY = ''; monthly payment<br>
STD_RESIDUAL_VALUE = ''; residual value must be paid after credit<br>
STD_NBR_INSPECTION = ''; number of times car went to inspection<br>
STD_INSPECTION_PRICE = ''; normal inspection price<br>
STD_ROAD_TAX = ''; price paid for road taxes per year<br>
STD_FUEL_PAID_PER_MONTH = ''; money spent per month on fuels<br>
STD_DAYS_PER_WEEK = ''; days per week one takes their car to work<br>
STD_JORNEY_2WORK = ''; (standard distance, km or miles) made from home to work (just one way) <br>
STD_JORNEY_WEEKEND = ''; (standard distance, km or miles) during the other days, for example weekends<br>
STD_KM_PER_MONTH = ''; (standard distance, km or miles) made per month<br>
STD_CAR_FUEL_EFFICIENCY = ''; (standard fuel efficiency, km/l l/100km mpg(US) or mpg(imp)) fuel efficiency in the chosen standard<br>
STD_FUEL_PRICE = ''; price paid for fuel on chosen currency<br>
STD_MAINTENANCE_PER_YEAR = ''; amount paid for maintenance per year<br>
STD_REPAIRS = ''; repairs and improvements paid per year on average<br>
STD_PARKING = ''; parking paid per month<br>
STD_TOLLS = ''; amount paid in tolls per trimestre<br> 
STD_TOLLS_DAY = ''; amount paid in tolls per day<br>
STD_TOLLS_DAYS_PER_MONTH = ''; number of days per month the car crosses a tolled way<br>
STD_FINES = ''; fines paid on average per trimestre<br>
STD_WASHING = ''; amount paid in washings per trimestre<br>
STD_NR_PPL_FAMILY = ''; number of people in the family<br>
STD_PASS_PRICE = ''; price of the monthly pass<br>
STD_INCOME_YEAR = '';  net income per year<br>
STD_INCOME_MONTH = '';  net income per month<br>
STD_INCOME_WEEK = '';  net income per week<br>
STD_INCOME_HOUR = '';  net income per hour<br>
STD_HOURS_WEEK = '';  hours per week<br>
STD_MONTHS_YEAR = '';  months per year<br>
STD_WEEKS_YEAR = '';  weeks per year<br>
STD_HOURS_WEEK = '';  work hours per week<br>
STD_TIME_HOME_JOB = '';  minutes you drive from home to workplace<br>
STD_TIME_WEEKEND = ''; minutes you drive in the days you don't take the car to workplace<br>
STD_TIME_IN_DRIVING = '';  time spent in driving (minutes/day)<br>
STD_DAYS_MONTH = '';  days per month<br>
<br>
