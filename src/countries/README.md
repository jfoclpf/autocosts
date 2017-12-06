                                             
# Translations

This file explains the meaning of each key and value for each JSON country file.<br> 
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

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>CURR_CODE</td><td>'USD'</td><td> the 3-letter currency ISO code</td></tr>
<tr><td>CURR_NAME</td><td>'Dollar'</td><td> </td></tr>
<tr><td>CURR_NAME_PLURAL</td><td>'Dollars'</td><td> </td></tr>
<tr><td>CURR_NAME_BIG_PLURAL</td><td>'DOLLARS'</td><td> </td></tr>
<tr><td>CURR_SYMBOL</td><td>'&#36;'</td><td> </td></tr>
<tr><td>STD_DIST</td><td>'mi'</td><td>short text version you'd like to apply </td></tr>
<tr><td>STD_DIST_FULL</td><td>'miles'</td><td> </td></tr>
<tr><td>STD_FUEL_CALC</td><td>'mpg(US)'</td><td> text version you'd like to apply</td></tr>
<tr><td>STD_VOLUME_SHORT</td><td>'gallon'</td><td> short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)</td></tr>
</table>

## simple words

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>WORD_PER</td><td>'per'</td><td>4 km per day</td></tr>
<tr><td>WORDS_PER_EACH</td><td>'per each'</td><td>4 miles per each two months</td></tr>
<tr><td>WORD_TIMES</td><td>'times'</td><td>4 times per week</td></tr>
<tr><td>DURING</td><td>'during'</td><td>spent in tolls 3€ per day during 22 days per month</td></tr>
<tr><td>WORD_PEOPLE</td><td>'people'</td><td>plural, 3 people</td></tr>
<tr><td>YES</td><td>'yes'</td><td></td></tr>
<tr><td>NO</td><td>'no'</td><td></td></tr>
<tr><td>BUTTON_RUN</td><td>'Run'</td><td>run calculator button</td></tr>
<tr><td>BUTTON_RERUN</td><td>'Rerun'</td><td>run calculator button</td></tr>
</table>

## web page wordings

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>WEB_PAGE_TITLE</td><td>'Automobile costs calculator'</td><td></td></tr>
<tr><td>MAIN_TITLE</td><td>'AUTOMOBILE COSTS CALCULATOR'</td><td></td></tr>
<tr><td>INITIAL_TEXT</td><td>This calculator will allow you to find <b>the true cost</b> of owning a car in the <b>United States</b>. It will normally give you a good estimate of what you really need to spend on car ownership. As car payments and expenses come due throughout the year, it's often difficult to really get a good understanding of total spending on your car. Be realistic on the values you input. For unexpected expenses, such as accident repairs or fines, think about how much you have spent on such items over the last few years. By default, these values are calculated on a monthly basis. Use the the dot symbol for decimal notation, for example 8.7 miles between home and the workplace.";
DISCLAIMER = "This calculator is <b>completely anonymous</b>, as it doesn't request nor permanently store, any name, email, cookies, IP address nor any other personal information.</td><td></td></tr>
</table>

<br>

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>HELP_PROJECT</td><td>'This is a free service with no advertisements!'</td><td></td></tr>
<tr><td>AC_MOBILE</td><td>'AUTOCOSTS<br>for mobile devices'</td><td></td></tr>
<tr><td>AC_SUB_HEADER</td><td>'AUTOMOBILE COSTS CALCULATOR'</td><td></td></tr>
</table>

## user statistics

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>VISITORS</td><td>'Visitors'</td><td></td></tr>
<tr><td>ONLINE</td><td>'online'</td><td></td></tr>
<tr><td>THIS_MONTH</td><td>'this month'</td><td></td></tr>
<tr><td>IN_TOTAL</td><td>'in total'</td><td>in the sense of "the website had 10000 visitors *in total*"</td></tr>
<tr><td>USERS</td><td>'Users'</td><td></td></tr>
<tr><td>FOR_COUNTRY</td><td>'for USA'</td><td>in the sense of "10 users filled in *for Portugal". Replace Portugal accordingly.</td></tr>
<tr><td>IN_TOTAL</td><td>'in total'</td><td>in the sense of "10000 users filled in *in total* the form "</td></tr>
<tr><td>CONTACT</td><td>'Contact'</td><td></td></tr>
</table>

## time words

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
  <tr><td>DAYLY</td><td>'daily'</td><td></td></tr>
<tr><td>WEEKLY</td><td>'weekly'</td><td></td></tr>
<tr><td>MONTHLY</td><td>'monthly'</td><td></td></tr>
<tr><td>TRIMESTERLY</td><td>'quarterly'</td><td></td></tr>
<tr><td>SEMESTERLY</td><td>'half&#8209;yearly'</td><td></td></tr>
<tr><td>YEARLY</td><td>'yearly'</td><td></td></tr>
<tr><td>MIN</td><td>'min'</td><td></td></tr>
<tr><td>MINUTES</td><td>'minutes'</td><td></td></tr>
<tr><td>HOUR</td><td>'hour'</td><td></td></tr>
<tr><td>HOURS</td><td>'hours'</td><td></td></tr>
<tr><td>HOUR_ABBR</td><td>'h'</td><td></td></tr>
<tr><td>DAY</td><td>'day'</td><td></td></tr>
<tr><td>DAYS</td><td>'days'</td><td></td></tr>
<tr><td>WEEK</td><td>'week'</td><td></td></tr>
<tr><td>WEEKS</td><td>'weeks'</td><td></td></tr>
<tr><td>MONTH</td><td>'month'</td><td></td></tr>
<tr><td>MONTHS</td><td>'months'</td><td></td></tr>
<tr><td>TWO_MONTHS</td><td>'two months'</td><td></td></tr>
<tr><td>DIST_EACH_TWO_MONTHS</td><td>'miles for every two months'</td><td></td></tr>
<tr><td>TRIMESTER</td><td>'trimester'</td><td></td></tr>
<tr><td>SEMESTER</td><td>'semester'</td><td></td></tr>
<tr><td>YEAR</td><td>'year'</td><td></td></tr>
<tr><td>DAYS_PER_WEEK_SHORT</td><td>'days/week'</td><td></td></tr>
</table>

## distance

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>DISTANCE</td><td>"Distance"</td><td></td></tr>
</table>

## statistics

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>AVERAGE_COSTS_PER_TYPE</td><td>'Average monthly cost per type'</td><td></td></tr>
<tr><td>STATISTIC_TITLE</td><td>'Automobile costs for'</td><td></td></tr>
<tr><td>DEPRECIATION_ST</td><td>'Depreciation'</td><td></td></tr>
<tr><td>INSURANCE_ST</td><td>'Insurance'</td><td></td></tr>
<tr><td>REP_ST</td><td>'Repairs'</td><td></td></tr>
<tr><td>WASHING_ST</td><td>'Washing'</td><td></td></tr>
<tr><td>VIRTUAL_SPEED_TITLE</td><td>'Consumer speed'</td><td></td></tr>
<tr><td>KINETIC_SPEED_TITLE</td><td>'Kinetic speed'</td><td></td></tr>
</table>

## calculator words 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>COSTS</td><td>"Costs"</td><td></td></tr>
<tr><td>FIXED_COSTS</td><td>'Standing costs'</td><td></td></tr>
<tr><td>FIXED_COSTS_HEADER_1</td><td>'STANDING COSTS'</td><td>capital letters</td></tr>
<tr><td>FIXED_COSTS_HEADER_2</td><td>"Those that don't depend on the traveled distance, and one must pay to have the car available for use"</td><td></td></tr>
<tr><td>RUNNING_COSTS</td><td>'Running costs'</td><td></td></tr>
<tr><td>RUNNING_COSTS_HEADER_1</td><td>'RUNNING COSTS'</td><td>capital letters</td></tr>
<tr><td>RUNNING_COSTS_HEADER_2</td><td>'Those that depend on the traveled distance'</td><td></td></tr>
<tr><td>PRIVATE_COSTS</td><td>'Private costs'</td><td></td></tr>
<tr><td>MONTHLY_AMOUNT</td><td>'Monthly amount'</td><td></td></tr>
<tr><td>RUN_CP_DIST</td><td>'Running costs per mile'</td><td>running costs per unit distance</td></tr>
<tr><td>TOTAL_CP_DIST</td><td>'Total costs per mile'</td><td>total costs per unit distance</td></tr>
<tr><td>PUBL_TRA_EQUIV</td><td>"Equivalent transport costs, considering you don't own a car"</td><td></td></tr>
<tr><td>WORD_TOTAL_CAP</td><td>'TOTAL'</td><td>capital word for total</td></tr>
<tr><td>WORD_PRINT</td><td>'Print'</td><td></td></tr>
<tr><td>WORD_DOWNLOAD_PDF</td><td>'Download PDF report'</td><td></td></tr>
</table>

## depreciation 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>DEPRECIATION</td><td>'Depreciation of the vehicle'</td><td></td></tr>
<tr><td>AQ_DATE</td><td>'Car acquisition date'</td><td></td></tr>
<tr><td>COM_VALUE</td><td>'Commercial value of the car when you bought it<br><i>if new, the price you paid for the car<br>if used, the commercial value the car had when you acquired it</i>'</td><td></td></tr>
<tr><td>COM_VALUE_TODAY</td><td>'Commercial value of the car today<br><i>if you sell it now, how much would you get?</i>'</td><td></td></tr>
<tr><td>PERIOD_OWN</td><td>'Time period of ownership'</td><td></td></tr>
<tr><td>FINAL_VALUE</td><td>'Final value'</td><td></td></tr>
<tr><td>AQ_VALUE</td><td>'Acquisition value'</td><td></td></tr>
</table>

## insurance 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>INSURANCE</td><td>'Vehicle insurance and breakdown coverage'</td><td></td></tr>
<tr><td>INSURANCE_SHORT</td><td>'Insurance and breakdown coverage'</td><td></td></tr>
</table>

## credit 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>CREDIT</td><td>'Car finance'</td><td></td></tr>
<tr><td>CREDIT_PERIOD</td><td>'Period'</td><td></td></tr>
<tr><td>CREDIT_INTERESTS</td><td>'Loan interest'</td><td></td></tr>
<tr><td>CREDIT_INTERESTS_MONTH</td><td>'Monthly amount spent on interest'</td><td></td></tr>
<tr><td>CREDIT_TOTAL_INTERESTS</td><td>'Total amount of interest paid'</td><td></td></tr>
<tr><td>CREDIT_QUESTION</td><td>'Did you use auto financing to acquire the vehicle?'</td><td></td></tr>
<tr><td>CREDIT_LOAN</td><td>'Financed amount:<br><i>How much did you borrow?</i>'</td><td></td></tr>
<tr><td>CREDIT_LOAN2</td><td>'Financed amount'</td><td></td></tr>
<tr><td>CREDIT_PERIOD</td><td>'Credit period / number of installments'</td><td></td></tr>
<tr><td>CREDIT_AVERAGE_VALUE</td><td>'Average amount of each installment'</td><td></td></tr>
<tr><td>CREDIT_RESIDUAL_VALUE</td><td>'Residual value:<br><i>At the end of the credit period, how much will you still need to pay or have paid?</i>'</td><td></td></tr>
<tr><td>CREDIT_RESIDUAL_VALUE1</td><td>'Residual value'</td><td></td></tr>
<tr><td>CREDIT_INSTALMENT</td><td>'Monthly average value'</td><td></td></tr>
</table>

## inspection 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>INSPECTION</td><td>'Vehicle inspection'</td><td></td></tr>
<tr><td>INSPECTION_SHORT</td><td>'Inspection'</td><td></td></tr>
<tr><td>INSPECTION_NBMR_TIMES</td><td>'How many times have you taken your car for vehicle inspection?'</td><td></td></tr>
<tr><td>INSPECTION_PRICE</td><td>'Average cost per each vehicle inspection'</td><td></td></tr>
<tr><td>EACH_ONE_DURING</td><td>'each one during'</td><td>5 times costing 15€ *each one during* 20 months (inspection)</td></tr>
<tr><td>TIMES_COSTING</td><td>'times costing'</td><td>5 *times costing* 15€ each one during 20 months (inspection)</td></tr>
</table>

## road taxes 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>ROAD_TAXES</td><td>'Vehicle Excise Tax (Auto taxes, if applicable)'</td><td></td></tr>
<tr><td>ROAD_TAXES_SHORT</td><td>'Car Tax'</td><td></td></tr>
<tr><td>ROAD_TAXES_VALUE</td><td>'Car taxes paid for owning your car:<br><i>payment made to the state</i>'</td><td></td></tr>
</table>

## fuel 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>FUEL</td><td>'Fuel'</td><td></td></tr>
<tr><td>FUEL_DESC</td><td>'Gas, diesel, electricity'</td><td></td></tr>
<tr><td>FUEL_CALC</td><td>'Calculations based on'</td><td></td></tr>
<tr><td>FUEL_JOB_CALC</td><td>'Considering you drive to work?'</td><td></td></tr>
<tr><td>FUEL_JOB_CALC1</td><td>'Day(s) per week you drive to work'</td><td></td></tr>
<tr><td>FUEL_DAYS</td><td>'Day(s) per week you drive to work'</td><td></td></tr>
<tr><td>FUEL_DIST_HOME_JOB</td><td>'Miles you drive between home and the workplace (one way)'</td><td></td></tr>
<tr><td>CURR_DIST</td><td></td><td>km, miles, etc.</td></tr>
<tr><td>FUEL_DIST_HOME_JOB1</td><td>'miles between home and the workplace'</td><td>you drive 7 miles between home and your job</td></tr>
<tr><td>FUEL_DIST_NO_JOB</td><td>"Miles you drive on average during the days you don't take your car to the workplace:<br><i>for example per each weekend</i>"</td><td></td></tr>
<tr><td>FUEL_DIST_NO_JOB1</td><td>"miles on average during the days you don't take your car to the workplace"</td><td>you do 5 miles per week....</td></tr> 
<tr><td>FUEL_DIST</td><td>'Miles you drive'</td><td></td></tr>
<tr><td>FUEL_CAR_EFF</td><td>'Fuel efficiency of your vehicle'</td><td></td></tr>
<tr><td>FUEL_PRICE</td><td>'Average price you pay for fuel/gas'</td><td></td></tr>
<tr><td>FUEL_PRICE1</td><td>'Average price of gas'</td><td></td></tr>
<tr><td>YOU_DRIVE_TOTTALY_AVG</td><td>'Total mileage driven on average'</td><td><b>You drive on average a total of</b> 5 miles per day</td></tr>
<tr><td>YOU_DRIVE</td><td>'You drive'</td><td><b>You drive</b> 5 miles per day</td></tr>
</table>

## maintenance 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>MAINTENANCE</td><td>'Maintenance'</td><td></td></tr>
<tr><td>MAINTENANCE_DESC</td><td>'Average cost of maintenance and breakdown coverage:<br><i>engine oil substitution, filters, lights, tires, breaks, air conditioning, steering alignment, etc.</i>'</td><td></td></tr>
</table>

## Repairs and Improvements

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>REP_IMPROV</td><td>'Repairs and improvements'</td><td></td></tr>
<tr><td>REP_IMPROV_DESC</td><td>'Average cost on repairs and improvements:<br><i>car parts, modifications, faulty repairs, dents, collisions, tuning, etc.</i>'</td><td></td></tr>
</table>

## Parking

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>PARKING</td><td>'Parking'</td><td></td></tr>
<tr><td>PARKING_DESC</td><td>'Average cost with parking:<br><i>parking meters in the city, renting a parking space, underground or overground parking lots in public buildings, shopping centers, airports, bus or train stations or any other infrastructures.</i>'</td><td></td></tr>
</table>

## Tolls

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>TOLLS</td><td>'Tolls'</td><td></td></tr>
<tr><td>TOLLS_DESC</td><td>'Average amount spent on toll roads,<br><i>bridges, tunnels, interstates, and congestion charges to gain access to toll driving areas </i>'</td><td></td></tr>
<tr><td>TOLLS_DAY_CALC</td><td>'Calculation based on day?'</td><td></td></tr>
<tr><td>TOLLS_DAY_CALC1</td><td>'Daily amount you spend on tolls'</td><td></td></tr>
<tr><td>TOLLS_DAY_CALC_DESC</td><td>'Think about the rare trips you make beyond your town/city or to the countryside, or any kind of electronic toll collection'</td><td></td></tr>
</table>

## Fines

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>FINES</td><td>'Traffic tickets'</td><td></td></tr>
<tr><td>FINES_DESC</td><td>'Average amount paid in traffic tickets:<br><i>think in the last few years about how much you paid in any kind of traffic tickets (illegal parking, speed limit violation, mobile phone usage fines, etc.)</i>'</td><td></td></tr>
</table>

## Washing

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>WASHING</td><td>'Washing and cleaning'</td><td></td></tr>
<tr><td>WASHING_DESC</td><td>'Average car-washing and valet parking expenses:<br><i>in service stations and other places</i>'</td><td></td></tr>
</table>

## Total 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>TOTAL_FIXED</td><td>'TOTAL - Standing costs'</td><td></td></tr>
<tr><td>TOTAL_FIXED_DESCR</td><td>"Costs that don't depend on the traveled distance and those costs which must be paid even if the car is not in use"</td><td></td></tr>
<tr><td>TOTAL_FIXED_DESCR2</td><td>'Depreciation, Insurance, Financing interest, Taxes, Inspection and 50% of parking and maintenance'</td><td></td></tr>
<tr><td>TOTAL_VARIABLE</td><td>'TOTAL - Running costs'</td><td></td></tr>
<tr><td>TOTAL_VARIABLE_DESCR</td><td>'Costs that depend on the number of miles you drive'</td><td></td></tr>
<tr><td>TOTAL_VARIABLE_DESCR2</td><td>'Fuels, repairs, and improvements, Parking (considering you only pay when you use the car), tolls, traffic tickets, washing, and 50% of maintenance'</td><td></td></tr>
</table>

## Additional data

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>EXTRA_DATA</td><td>'ADDITIONAL DATA'</td><td></td></tr>
<tr><td>EXTRA_DATA1</td><td>'Additional data'</td><td></td></tr>
<tr><td>EXTRA_DATA_PUBLIC_TRANSP</td><td>'Public transports'</td><td></td></tr>
<tr><td>EXTRA_DATA_FAMILY_NBR</td><td>'How many people older than 4 years old you have in your family (including you)'</td><td></td></tr>
<tr><td>EXTRA_DATA_PRICE_PASS</td><td>"What is the average price per person of public transportation on a monthly basis for your normal daily life<br><i>if public transport isn't an option for you, insert 0</i>"</td><td></td></tr>
<tr><td>EXTRA_DATA_INCOME</td><td>"Income"</td><td></td></tr>
<tr><td>EXTRA_DATA_INCOME_QUESTION</td><td>'What is your net income?'</td><td></td></tr>
<tr><td>EXTRA_DATA_WORKING_TIME</td><td>'Working time'</td><td></td></tr>
<tr><td>EXTRA_DATA_WORKING_TIME_QUESTION</td><td>'Do you have a job or a worthy occupation?'</td><td></td></tr>
<tr><td>EXTRA_DATA_TIME_SPENT_IN_DRIVING</td><td>'Time spent in driving'</td><td></td></tr>
<tr><td>EXTRA_DATA_TIME_QUESTION1</td><td>'How many minutes you drive from home to workplace? (just one way)'</td><td></td></tr>
<tr><td>EXTRA_DATA_TIME_QUESTION2</td><td>'How many minutes you drive in the days you don't take the car to workplace?'</td><td></td></tr>
<tr><td>EXTRA_DATA_TIME_QUESTION3</td><td>'How many minutes you drive?'</td><td></td></tr>
</table>

## Public Transports

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>PUB_TRANS_TEXT</td><td>'Public transportation for your family for daily life'</td><td></td></tr>
<tr><td>FAM_NBR</td><td>'Number of members of your family older than 4 years old'</td><td></td></tr>
<tr><td>PERSON_OR_PEOPLE</td><td>'person(s)'</td><td></td></tr>
<tr><td>PASS_MONTH_AVG</td><td>'Average amount of of monthly transportation ticket pass costs per person'</td><td></td></tr>
<tr><td>OTHER_PUB_TRANS</td><td>'Other public transportation'</td><td></td></tr>
<tr><td>OTHER_PUB_TRANS_DESC</td><td>"Amount that was still remaining from other public transportation, for example out of your residential area, such as a long journey by trains or buses"</td><td></td></tr>
<tr><td>TAXI_DESL</td><td>"Taxi transportation"</td><td></td></tr>
<tr><td>ON_TAXI_PAYING</td><td>"by paying for a taxi"</td><td>ex: 4 miles <b>on taxi paying</b> 5€ per mile</td></tr>
</table>

## Virtual speed

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>FINANCIAL_EFFORT</td><td>'Financial effort'</td><td></td></tr>
<tr><td>NET_INCOME_PER</td><td>'Net income per'</td><td></td></tr>
<tr><td>AVERAGE_NET_INCOME_PER</td><td>'Average net income per'</td><td></td></tr>
<tr><td>NUMBER_OF_MONTHS</td><td>'Number of months per year of income'</td><td></td></tr>
<tr><td>NUMBER_OF_WEEKS</td><td>'Number of weeks per year of income'</td><td></td></tr>
<tr><td>NUMBER_OF_HOURS</td><td>'Number of hours per week of income'</td><td></td></tr>
<tr><td>HOURS_PER</td><td>'Hours per'</td><td></td></tr>
<tr><td>MONTHS_PER</td><td>'Months per'</td><td></td></tr>
<tr><td>AVERAGE_WORKING_HOURS_PER</td><td>'Average working hours per'</td><td></td></tr>
<tr><td>WORKING_HOURS_PER</td><td>'Working hours per'</td><td></td></tr>
<tr><td>DIST_HOME_JOB</td><td>'You drive from home to work'</td><td></td></tr>
<tr><td>DAYS_DRIVE_JOB</td><td>'Days per week you drive to work'</td><td></td></tr>
<tr><td>DIST_JORNEY_WEEKEND</td><td>'You drive during the days you don't take the car to workplace'</td><td></td></tr>
<tr><td>AVERAGE_DIST_PER_WEEK</td><td>'You drive on average per week'</td><td></td></tr>
<tr><td>YOU_DRIVE_PER</td><td>'You drive per'</td><td></td></tr>
<tr><td>MINUTES_HOME_JOB</td><td>'Minutes you drive from home to workplace'</td><td></td></tr>
<tr><td>DAYS_DRIVE_TO_JOB</td><td>'Days per week you drive to work'</td><td></td></tr>
<tr><td>TIME_DRIVE_WEEKEND</td><td>'Minutes you drive in the days you don't take the car to workplace'</td><td></td></tr>
<tr><td>MINUTES_DRIVE_PER</td><td>'Minutes you drive per'</td><td></td></tr>
<tr><td>DAYS_DRIVE_PER_MONTH</td><td>'Days you drive per month'</td><td></td></tr>
<tr><td>HOURS_DRIVE_PER</td><td>'Hours you drive per'</td><td></td></tr>
<tr><td>VIRTUAL_SPEED</td><td>'consumer speed'</td><td></td></tr>
<tr><td>KINETIC_SPEED</td><td>'kinetic speed'</td><td></td></tr>
<tr><td>AVER_YEARLY</td><td>'Average yearly'</td><td></td></tr>
<tr><td>WORKING_TIME_MESSAGE</td><td>'It was considered for calculations an average working time of 36 hours per week and 11 months per year'</td><td></td></tr>
<tr><td>HOURS_TO_AFFORD_CAR</td><td>'Hours per year you need to work to afford your car'</td><td></td></tr>
<tr><td>MONTHS_TO_AFFORD_CAR</td><td>'Months per year you need to work to afford your car'</td><td></td></tr>
<tr><td>TOTAL_COSTS_PER_YEAR</td><td>'Total costs per year for automobile'</td><td></td></tr>
<tr><td>DAYS_CAR_PAID</td><td>'For how many days, after the 1st of January, the car is paid'</td><td></td></tr>
</table>

## Graphics 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>PARCEL</td><td>'Parcel'</td><td></td></tr>
<tr><td>COSTS</td><td>'Costs'</td><td></td></tr>
</table>

## Error messages

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>ERROR_INVALID_INSU_VALUE</td><td>'Invalid insurance amount'</td><td></td></tr>
<tr><td>ERROR_INSU_PERIOD</td><td>'Insert payment frequency of insurance payments'</td><td></td></tr>
<tr><td>ERROR_FUEL_CURR_DIST</td><td>'You must determine if you want to make calculations based on miles or USD'</td><td></td></tr>
<tr><td>ERROR_FUEL_CAR_EFF</td><td>'Invalid gas efficiency amount'</td><td></td></tr>
<tr><td>ERROR_FUEL_PRICE</td><td>'Invalid gas price'</td><td></td></tr>
<tr><td>ERROR_CAR_JOB</td><td>'Please indicate if you take your car to the workplace'</td><td></td></tr>
<tr><td>ERROR_FUEL_DIST</td><td>'Invalid amount of miles traveled per month'</td><td></td></tr>
<tr><td>ERROR_DAYS_PER_WEEK</td><td>'Invalid number of days per week'</td><td></td></tr>
<tr><td>ERROR_DIST_HOME_WORK</td><td>'Invalid miles between home and the workplace'</td><td></td></tr>
<tr><td>ERROR_DIST_NO_JOB</td><td>"Invalid number of miles you drive during the days you don't drive your car to the workplace"</td><td></td></tr>
<tr><td>ERROR_CURRENCY</td><td>'Invalid USD per month'</td><td></td></tr>
<tr><td>ERROR_DEPRECIATION_MONTH</td><td>'Invalid acquisition month'</td><td></td></tr>
<tr><td>ERROR_DEPRECIATION_YEAR</td><td>'Invalid acquisition year'</td><td></td></tr>
<tr><td>ERROR_DEPRECIATION_VALUE</td><td>'Invalid acquisition amount'</td><td></td></tr>
<tr><td>ERROR_DEPRECIATION_VALUE_TODAY</td><td>'Invalid present vehicle value'</td><td></td></tr>
<tr><td>ERROR_DEPRECIATION_DATE</td><td>'Invalid acquisition date'</td><td></td></tr>
<tr><td>ERROR_DEPRECIATION_NEW_CAR</td><td>'The depreciation does not apply because this vehicle is new'</td><td></td></tr>
<tr><td>ERROR_CREDIT_QUESTION</td><td>'Please determine if you used car financing'</td><td></td></tr>
<tr><td>ERROR_CREDIT_LOAN_VALUE</td><td>'Invalid financed amount'</td><td></td></tr>
<tr><td>ERROR_CREDIT_PERIOD</td><td>'Invalid period of credit, number of installment payments'</td><td></td></tr>
<tr><td>ERROR_CREDIT_INSTALMENT</td><td>'Invalid installment amount'</td><td></td></tr>
<tr><td>ERROR_CREDIT_RESIDUAL_VALUE</td><td>'Invalid residual value'</td><td></td></tr>
<tr><td>ERROR_INSPECTION_NTIMES</td><td>'Invalid number of times'</td><td></td></tr>
<tr><td>ERROR_INSPECTION_COSTS</td><td>'Invalid inspection cost'</td><td></td></tr>
<tr><td>INVALID_AMOUNT</td><td>'Invalid amount'</td><td></td></tr>
<tr><td>INVALID_NBR_PP</td><td>'Invalid number of people'</td><td></td></tr>
<tr><td>ERROR_PASS_AMOUNT</td><td>'Invalid monthly ticket amount'</td><td></td></tr>
<tr><td>ERROR_INCOME</td><td>'Invalid net income'</td><td></td></tr>
<tr><td>ERROR_WEEKS_PER_YEAR</td><td>'Invalid number of weeks per year'</td><td></td></tr>
<tr><td>ERROR_MONTHS_PER_YEAR</td><td>'Invalid number of months per year'</td><td></td></tr>
<tr><td>ERROR_HOURS_PER_WEEK</td><td>'Invalid number of hours per week'</td><td></td></tr>
<tr><td>ERROR_MIN_DRIVE_HOME_JOB</td><td>'Invalid number of minutes you drive from home to workplace'</td><td></td></tr>
<tr><td>ERROR_MIN_DRIVE_WEEKEND</td><td>'Invalid number of minutes you drive in the days you don\'t take the car to workplace'</td><td></td></tr>
<tr><td>ERROR_MIN_DRIVE</td><td>'Invalid number of minutes you drive'</td><td></td></tr>
<tr><td>ERROR_DAYS_PER_MONTH</td><td>'Invalid number of days per month'</td><td></td></tr>
<tr><td>YOUR_CAR_COSTS_YOU</td><td>'Your car costs'</td><td></td></tr>
<tr><td>WITH_THIS_LEVEL_OF_COSTS</td><td>'With this level of costs, your vehicle during the'</td><td>ex: "With this level of costs for your car during the" 15 months of possession.... </td></tr>
<tr><td>MONTHS_POSS</td><td>'months of possession has already been determined'</td><td>ex: With this level of costs for your car during the 15 "months of possession, it has already been determined to be " 14000 Euros/USD</td></tr>
<tr><td>TAXI_PRICE_PER_DIST</td><td>2.5</td><td>amount paid for taxi in chosen currency per chosen unit distance</td></tr>
</table>

## Standard Value

Values that appear on the start page.<br>
These values are to be changed by the user but you must insert values that are reasonable.<br>
Keep in mind your chosen standard currency as well as your volume and fuel efficiency standards.<br><br>

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>STD_ACQ_MONTH</td><td>'01'</td><td>month of acquisition</td></tr>
<tr><td>STD_ACQ_YEAR</td><td>'2000'</td><td>year of acquisition</td></tr>
<tr><td>STD_PRICE_PAID</td><td>''</td><td>price paid for the car</td></tr>
<tr><td>STD_PRICE_TODAY</td><td>''</td><td>the price the car has today</td></tr>
<tr><td>STD_INSURANCE_SEM</td><td>''</td><td>price paid for insurance by semester</td></tr>
<tr><td>STD_LOAN</td><td>''</td><td>amount asked for credit</td></tr>
<tr><td>STD_PERIOD_OF_CREDIT</td><td>''</td><td>period of the credit in months</td></tr>
<tr><td>STD_MONTHLY_PAY</td><td>''</td><td>monthly payment</td></tr>
<tr><td>STD_RESIDUAL_VALUE</td><td>''</td><td>residual value must be paid after credit</td></tr>
<tr><td>STD_NBR_INSPECTION</td><td>''</td><td>number of times car went to inspection</td></tr>
<tr><td>STD_INSPECTION_PRICE</td><td>''</td><td>normal inspection price</td></tr>
<tr><td>STD_ROAD_TAX</td><td>''</td><td>price paid for road taxes per year</td></tr>
<tr><td>STD_FUEL_PAID_PER_MONTH</td><td>''</td><td>money spent per month on fuels</td></tr>
<tr><td>STD_DAYS_PER_WEEK</td><td>''</td><td>days per week one takes their car to work</td></tr>
<tr><td>STD_JORNEY_2WORK</td><td>''</td><td>(standard distance, km or miles) made from home to work (just one way)</td></tr>
<tr><td>STD_JORNEY_WEEKEND</td><td>''</td><td>(standard distance, km or miles) during the other days, for example weekends</td></tr>
<tr><td>STD_KM_PER_MONTH</td><td>''</td><td>(standard distance, km or miles) made per month</td></tr>
<tr><td>STD_CAR_FUEL_EFFICIENCY</td><td>''</td><td>(standard fuel efficiency, km/l l/100km mpg(US) or mpg(imp)) fuel efficiency in the chosen standard</td></tr>
<tr><td>STD_FUEL_PRICE</td><td>''</td><td>price paid for fuel on chosen currency</td></tr>
<tr><td>STD_MAINTENANCE_PER_YEAR</td><td>''</td><td>amount paid for maintenance per year</td></tr>
<tr><td>STD_REPAIRS</td><td>''</td><td>repairs and improvements paid per year on average</td></tr>
<tr><td>STD_PARKING</td><td>''</td><td>parking paid per month</td></tr>
<tr><td>STD_TOLLS</td><td>''</td><td>amount paid in tolls per trimestre</td></tr>
<tr><td>STD_TOLLS_DAY</td><td>''</td><td>amount paid in tolls per day</td></tr>
<tr><td>STD_TOLLS_DAYS_PER_MONTH</td><td>''</td><td>number of days per month the car crosses a tolled way</td></tr>
<tr><td>STD_FINES</td><td>''</td><td>fines paid on average per trimestre</td></tr>
<tr><td>STD_WASHING</td><td>''</td><td>amount paid in washings per trimestre</td></tr>
<tr><td>STD_NR_PPL_FAMILY</td><td>''</td><td>number of people in the family</td></tr>
<tr><td>STD_PASS_PRICE</td><td>''</td><td>price of the monthly pass</td></tr>
<tr><td>STD_INCOME_YEAR</td><td>''</td><td>net income per year</td></tr>
<tr><td>STD_INCOME_MONTH</td><td>''</td><td>net income per month</td></tr>
<tr><td>STD_INCOME_WEEK</td><td>''</td><td>net income per week</td></tr>
<tr><td>STD_INCOME_HOUR</td><td>''</td><td>net income per hour</td></tr>
<tr><td>STD_HOURS_WEEK</td><td>''</td><td>hours per week</td></tr>
<tr><td>STD_MONTHS_YEAR</td><td>''</td><td>months per year</td></tr>
<tr><td>STD_WEEKS_YEAR</td><td>''</td><td>weeks per year</td></tr>
<tr><td>STD_HOURS_WEEK</td><td>''</td><td>work hours per week</td></tr>
<tr><td>STD_TIME_HOME_JOB</td><td>''</td><td>minutes you drive from home to workplace</td></tr>
<tr><td>STD_TIME_WEEKEND</td><td>''</td><td>minutes you drive in the days you don't take the car to workplace</td></tr>
<tr><td>STD_TIME_IN_DRIVING</td><td>''</td><td>time spent in driving (minutes/day)</td></tr>
<tr><td>STD_DAYS_MONTH</td><td>''</td><td>days per month</td></tr>
</table>
