                                             
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
<tr><td>1 </td><td> L/100km </td><td> litres per 100 kilometres</td></tr>
<tr><td>2 </td><td> km/L    </td><td> kilometres per litre</td></tr>
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
<tr><td>3</td><td>nordic mile (10km)</td></tr>  
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
<tr><td>curr_code</td><td> USD </td><td> the 3-letter currency ISO code</td></tr>
<tr><td>curr_name</td><td> Dollar </td><td> </td></tr>
<tr><td>curr_name_plural</td><td> Dollars </td><td> </td></tr>
<tr><td>curr_name_big_plural</td><td> DOLLARS </td><td> </td></tr>
<tr><td>curr_symbol</td><td> &#36; </td><td> </td></tr>
<tr><td>std_dist</td><td> mi </td><td>short text version you'd like to apply </td></tr>
<tr><td>std_dist_full</td><td> miles </td><td> </td></tr>
<tr><td>std_fuel_calc</td><td> mpg(US) </td><td> text version you d'like to apply</td></tr>
<tr><td>std_volume_short</td><td> gallon </td><td> short text version you'd like to apply for fuel price per volume unit (litres, imperial gallons or US gallons, be coherent)</td></tr>
</table>

## simple words

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>word_per</td><td> per </td><td>4 km per day</td></tr>
<tr><td>words_per_each</td><td> per each </td><td>4 miles per each two months</td></tr>
<tr><td>word_times</td><td> times </td><td>4 times per week</td></tr>
<tr><td>during</td><td> during </td><td>spent in tolls 3€ per day during 22 days per month</td></tr>
<tr><td>word_people</td><td> people </td><td>plural, 3 people</td></tr>
<tr><td>yes</td><td> yes </td><td></td></tr>
<tr><td>next</td><td> Next </td><td></td></tr>
<tr><td>edit_form</td><td> Edit form </td><td></td></tr>
<tr><td>share</td><td> Share </td><td></td></tr>
<tr><td>close</td><td> Close </td><td></td></tr>
<tr><td>calculate_car_costs</td><td> Calculate car costs </td><td></td></tr>
<tr><td>button_run</td><td> Run </td><td>run calculator button</td></tr>
<tr><td>button_rerun</td><td> Rerun </td><td>run calculator button</td></tr>
</table>

## web page wordings

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>web_page_title</td><td> Automobile costs calculator </td><td></td></tr>
<tr><td>main_title</td><td> AUTOMOBILE COSTS CALCULATOR </td><td></td></tr>
<tr><td>sub_title</td><td> The average total costs in [country] is [yearly_costs] per year, representing [nbrMonths] months of average salary. Find the true cost of owning a car in your country. </td><td></td></tr>
<tr><td>initial_text</td><td>This calculator will allow you to find <b>the true cost</b> of owning a car in the <b>United States</b>. It will normally give you a good estimate of what you really need to spend on car ownership. As car payments and expenses come due throughout the year, it's often difficult to really get a good understanding of total spending on your car. Be realistic on the values you input. For unexpected expenses, such as accident repairs or fines, think about how much you have spent on such items over the last few years. By default, these values are calculated on a monthly basis. Use the the dot symbol for decimal notation, for example 8.7 miles between home and the workplace.</td><td></td></tr>
<tr><td>disclaimer</td><td>This calculator is <b>completely anonymous</b>, as it doesn't request nor permanently store, any name, email, cookies, IP address nor any other personal information.</td><td></td></tr>
</table>

<br>

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>help_project</td><td> This is a free service with no advertisements! </td><td></td></tr>
<tr><td>ac_mobile</td><td> AUTOCOSTS<br>for mobile devices </td><td></td></tr>
<tr><td>ac_sub_header</td><td> AUTOMOBILE COSTS CALCULATOR </td><td></td></tr>
</table>

## user statistics

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>visitors</td><td> Visitors </td><td></td></tr>
<tr><td>online</td><td> online </td><td></td></tr>
<tr><td>this_month</td><td> this month </td><td></td></tr>
<tr><td>in_total</td><td> in total </td><td>in the sense of "the website had 10000 visitors *in total*"</td></tr>
<tr><td>users</td><td> Users </td><td></td></tr>
<tr><td>for_country</td><td> for USA </td><td>in the sense of "10 users filled in *for Portugal". Replace Portugal accordingly.</td></tr>
<tr><td>in_total</td><td> in total </td><td>in the sense of "10000 users filled in *in total* the form "</td></tr>
<tr><td>contact</td><td> Contact </td><td></td></tr>
</table>

## time words

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
  <tr><td>dayly</td><td> daily </td><td></td></tr>
<tr><td>weekly</td><td> weekly </td><td></td></tr>
<tr><td>monthly</td><td> monthly </td><td></td></tr>
<tr><td>trimesterly</td><td> quarterly </td><td></td></tr>
<tr><td>semesterly</td><td> half&#8209;yearly </td><td></td></tr>
<tr><td>yearly</td><td> yearly </td><td></td></tr>
<tr><td>min</td><td> min </td><td></td></tr>
<tr><td>minutes</td><td> minutes </td><td></td></tr>
<tr><td>hour</td><td> hour </td><td></td></tr>
<tr><td>hours</td><td> hours </td><td></td></tr>
<tr><td>hour_abbr</td><td> h </td><td></td></tr>
<tr><td>day</td><td> day </td><td></td></tr>
<tr><td>days</td><td> days </td><td></td></tr>
<tr><td>week</td><td> week </td><td></td></tr>
<tr><td>weeks</td><td> weeks </td><td></td></tr>
<tr><td>month</td><td> month </td><td></td></tr>
<tr><td>months</td><td> months </td><td></td></tr>
<tr><td>twoMonths</td><td> two months </td><td></td></tr>
<tr><td>dist_each_twoMonths</td><td> miles for every two months </td><td></td></tr>
<tr><td>trimester</td><td> trimester </td><td></td></tr>
<tr><td>semester</td><td> semester </td><td></td></tr>
<tr><td>year</td><td> year </td><td></td></tr>
<tr><td>days_per_week_short</td><td> days/week </td><td></td></tr>
</table>

## distance

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>distance</td><td>"Distance"</td><td></td></tr>
</table>

## statistics

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>average_costs_per_type</td><td> Average monthly cost per type </td><td></td></tr>
<tr><td>statistic_title</td><td> Automobile costs for </td><td></td></tr>
<tr><td>depreciation_st</td><td> Depreciation </td><td></td></tr>
<tr><td>insurance_st</td><td> Insurance </td><td></td></tr>
<tr><td>rep_st</td><td> Repairs </td><td></td></tr>
<tr><td>washing_st</td><td> Washing </td><td></td></tr>
<tr><td>virtual_speed_title</td><td> Consumer speed </td><td></td></tr>
<tr><td>kinetic_speed_title</td><td> Kinetic speed </td><td></td></tr>
</table>

## calculator words 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>costs</td><td>"Costs"</td><td></td></tr>
<tr><td>fixed_costs</td><td> Standing costs </td><td></td></tr>
<tr><td>fixed_costs_header_1</td><td> STANDING COSTS </td><td>capital letters</td></tr>
<tr><td>fixed_costs_header_2</td><td>Those that don't depend on the traveled distance, and one must pay to have the car available for use</td><td></td></tr>
<tr><td>running_costs</td><td> Running costs </td><td></td></tr>
<tr><td>running_costs_header_1</td><td> RUNNING COSTS </td><td>capital letters</td></tr>
<tr><td>running_costs_header_2</td><td> Those that depend on the traveled distance </td><td></td></tr>
<tr><td>private_costs</td><td> Private costs </td><td></td></tr>
<tr><td>monthly_amount</td><td> Monthly amount </td><td></td></tr>
<tr><td>run_cp_dist</td><td> Running costs per mile </td><td>running costs per unit distance</td></tr>
<tr><td>total_cp_dist</td><td> Total costs per mile </td><td>total costs per unit distance</td></tr>
<tr><td>publ_tra_equiv</td><td>Equivalent transport costs, considering you don't own a car</td><td></td></tr>
<tr><td>word_total_cap</td><td> TOTAL </td><td>capital word for total</td></tr>
<tr><td>word_print</td><td> Print </td><td></td></tr>
<tr><td>press_enter_or_tab</td><td> press <b>Enter</b> or <b>Tab</b> </td><td></td></tr>
<tr><td>calculate_car_costs</td><td> Calculate car costs </td><td></td></tr>
<tr><td>in_months_of_possession</td><td> in [nbrMonths] months of possession </td><td></td></tr>
<tr><td>of_your_income</td><td> of your income </td><td></td></tr>
</table>

## depreciation 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>depreciation</td><td> Depreciation of the vehicle </td><td></td></tr>
<tr><td>aq_date</td><td> Car acquisition date </td><td></td></tr>
<tr><td>com_value</td><td> Commercial value of the car when you bought it<br><i>if new, the price you paid for the car<br>if used, the commercial value the car had when you acquired it</i> </td><td></td></tr>
<tr><td>com_value_today</td><td> Commercial value of the car today<br><i>if you sell it now, how much would you get?</i> </td><td></td></tr>
<tr><td>period_own</td><td> Time period of ownership </td><td></td></tr>
<tr><td>final_value</td><td> Final value </td><td></td></tr>
<tr><td>aq_value</td><td> Acquisition value </td><td></td></tr>
</table>

## insurance 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>insurance</td><td> Vehicle insurance and breakdown coverage </td><td></td></tr>
<tr><td>insurance_short</td><td> Insurance and breakdown coverage </td><td></td></tr>
</table>

## credit 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>credit</td><td> Car finance </td><td></td></tr>
<tr><td>credit_period</td><td> Period </td><td></td></tr>
<tr><td>credit_interests</td><td> Loan interest </td><td></td></tr>
<tr><td>credit_interests_month</td><td> Monthly amount spent on interest </td><td></td></tr>
<tr><td>credit_total_interests</td><td> Total amount of interest paid </td><td></td></tr>
<tr><td>credit_question</td><td> Did you use auto financing to acquire the vehicle? </td><td></td></tr>
<tr><td>credit_loan</td><td> Financed amount:<br><i>How much did you borrow?</i> </td><td></td></tr>
<tr><td>credit_loan2</td><td> Financed amount </td><td></td></tr>
<tr><td>credit_period</td><td> Credit period / number of installments </td><td></td></tr>
<tr><td>credit_average_value</td><td> Average amount of each installment </td><td></td></tr>
<tr><td>credit_residual_value</td><td> Residual value:<br><i>At the end of the credit period, how much will you still need to pay or have paid?</i> </td><td></td></tr>
<tr><td>credit_residual_value1</td><td> Residual value </td><td></td></tr>
<tr><td>credit_instalment</td><td> Monthly average value </td><td></td></tr>
</table>

## inspection 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>inspection</td><td> Vehicle inspection </td><td></td></tr>
<tr><td>inspection_short</td><td> Inspection </td><td></td></tr>
<tr><td>inspection_nbmr_times</td><td> How many times have you taken your car for vehicle inspection? </td><td></td></tr>
<tr><td>inspection_price</td><td> Average cost per each vehicle inspection </td><td></td></tr>
<tr><td>each_one_during</td><td> each one during </td><td>5 times costing 15€ *each one during* 20 months (inspection)</td></tr>
<tr><td>times_costing</td><td> times costing </td><td>5 *times costing* 15€ each one during 20 months (inspection)</td></tr>
</table>

## road taxes 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>road_taxes</td><td> Vehicle Excise Tax (Auto taxes, if applicable) </td><td></td></tr>
<tr><td>road_taxes_short</td><td> Car Tax </td><td></td></tr>
<tr><td>road_taxes_value</td><td> Car taxes paid for owning your car:<br><i>payment made to the state</i> </td><td></td></tr>
</table>

## fuel 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>fuel</td><td> Fuel </td><td></td></tr>
<tr><td>fuel_desc</td><td> Gas, diesel, electricity </td><td></td></tr>
<tr><td>fuel_calc</td><td> Calculations based on </td><td></td></tr>
<tr><td>fuel_job_calc</td><td> Considering you drive to work? </td><td></td></tr>
<tr><td>fuel_job_calc1</td><td> Day(s) per week you drive to work </td><td></td></tr>
<tr><td>fuel_days</td><td> Day(s) per week you drive to work </td><td></td></tr>
<tr><td>fuel_dist_home_job</td><td> Miles you drive between home and the workplace (one way) </td><td></td></tr>
<tr><td>curr_dist</td><td></td><td>km, miles, etc.</td></tr>
<tr><td>fuel_dist_home_job1</td><td> miles between home and the workplace </td><td>you drive 7 miles between home and your job</td></tr>
<tr><td>fuel_dist_no_job</td><td>Miles you drive on average during the days you don't take your car to the workplace:<br><i>for example per each weekend</i></td><td></td></tr>
<tr><td>fuel_dist_no_job1</td><td>"miles on average during the days you don't take your car to the workplace"</td><td>you do 5 miles per week....</td></tr> 
<tr><td>fuel_dist</td><td> Miles you drive </td><td></td></tr>
<tr><td>fuel_car_eff</td><td> Fuel efficiency of your vehicle </td><td></td></tr>
<tr><td>fuel_price</td><td> Average price you pay for fuel/gas </td><td></td></tr>
<tr><td>fuel_price1</td><td> Average price of gas </td><td></td></tr>
<tr><td>you_drive_totally_avg</td><td> Total mileage driven on average </td><td><b>You drive on average a total of</b> 5 miles per day</td></tr>
<tr><td>you_drive</td><td> You drive </td><td><b>You drive</b> 5 miles per day</td></tr>
</table>

## maintenance 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>maintenance</td><td> Maintenance </td><td></td></tr>
<tr><td>maintenance_desc</td><td> Average cost of maintenance and breakdown coverage:<br><i>engine oil substitution, filters, lights, tires, breaks, air conditioning, steering alignment, etc.</i> </td><td></td></tr>
</table>

## Repairs and Improvements

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>rep_improv</td><td> Repairs and improvements </td><td></td></tr>
<tr><td>rep_improv_desc</td><td> Average cost on repairs and improvements:<br><i>car parts, modifications, faulty repairs, dents, collisions, tuning, etc.</i> </td><td></td></tr>
</table>

## Parking

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>parking</td><td> Parking </td><td></td></tr>
<tr><td>parking_desc</td><td> Average cost with parking:<br><i>parking meters in the city, renting a parking space, underground or overground parking lots in public buildings, shopping centers, airports, bus or train stations or any other infrastructures.</i> </td><td></td></tr>
</table>

## Tolls

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>tolls</td><td> Tolls </td><td></td></tr>
<tr><td>tolls_desc</td><td> Average amount spent on toll roads,<br><i>bridges, tunnels, interstates, and congestion charges to gain access to toll driving areas </i> </td><td></td></tr>
<tr><td>tolls_day_calc</td><td> Calculation based on day? </td><td></td></tr>
<tr><td>tolls_day_calc1</td><td> Daily amount you spend on tolls </td><td></td></tr>
<tr><td>tolls_day_calc_desc</td><td> Think about the rare trips you make beyond your town/city or to the countryside, or any kind of electronic toll collection </td><td></td></tr>
</table>

## Fines

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>fines</td><td> Traffic tickets </td><td></td></tr>
<tr><td>fines_desc</td><td> Average amount paid in traffic tickets:<br><i>think in the last few years about how much you paid in any kind of traffic tickets (illegal parking, speed limit violation, mobile phone usage fines, etc.)</i> </td><td></td></tr>
</table>

## Washing

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>washing</td><td> Washing and cleaning </td><td></td></tr>
<tr><td>washing_desc</td><td> Average car-washing and valet parking expenses:<br><i>in service stations and other places</i> </td><td></td></tr>
</table>

## Total 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>total_fixed</td><td> TOTAL - Standing costs </td><td></td></tr>
<tr><td>total_fixed_descr</td><td>Costs that don't depend on the traveled distance and those costs which must be paid even if the car is not in use</td><td></td></tr>
<tr><td>total_fixed_descr2</td><td> Depreciation, Insurance, Financing interest, Taxes, Inspection and 50% of parking and maintenance </td><td></td></tr>
<tr><td>total_variable</td><td> TOTAL - Running costs </td><td></td></tr>
<tr><td>total_variable_descr</td><td> Costs that depend on the number of miles you drive </td><td></td></tr>
<tr><td>total_variable_descr2</td><td> Fuels, repairs, and improvements, Parking (considering you only pay when you use the car), tolls, traffic tickets, washing, and 50% of maintenance </td><td></td></tr>
</table>

## Additional data

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>extra_data</td><td> ADDITIONAL DATA </td><td></td></tr>
<tr><td>extra_data1</td><td> Additional data </td><td></td></tr>
<tr><td>extra_data_public_transp</td><td> Public transports </td><td></td></tr>
<tr><td>extra_data_family_nbr</td><td> How many people older than 4 years old you have in your family (including you) </td><td></td></tr>
<tr><td>extra_data_price_pass</td><td>What is the average price per person of public transportation on a monthly basis for your normal daily life<br><i>if public transport isn't an option for you, insert 0</i></td><td></td></tr>
<tr><td>extra_data_income</td><td>Income</td><td></td></tr>
<tr><td>extra_data_income_question</td><td> What is your net income? </td><td></td></tr>
<tr><td>extra_data_working_time</td><td> Working time </td><td></td></tr>
<tr><td>extra_data_working_time_question</td><td> Do you have a job or a worthy occupation? </td><td></td></tr>
<tr><td>extra_data_time_spent_in_driving</td><td> Time spent in driving </td><td></td></tr>
<tr><td>extra_data_time_question1</td><td> How many minutes you drive from home to workplace? (just one way) </td><td></td></tr>
<tr><td>extra_data_time_question2</td><td> How many minutes you drive in the days you don't take the car to workplace? </td><td></td></tr>
<tr><td>extra_data_time_question3</td><td> How many minutes you drive? </td><td></td></tr>
</table>

## Public Transports

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>pub_trans_text</td><td> Public transportation for your family for daily life </td><td></td></tr>
<tr><td>fam_nbr</td><td> Number of members of your family older than 4 years old </td><td></td></tr>
<tr><td>person_or_people</td><td> person(s) </td><td></td></tr>
<tr><td>pass_month_avg</td><td> Average amount of of monthly transportation ticket pass costs per person </td><td></td></tr>
<tr><td>other_pub_trans</td><td> Other public transportation </td><td></td></tr>
<tr><td>other_pub_trans_desc</td><td>Amount that was still remaining from other public transportation, for example out of your residential area, such as a long journey by trains or buses</td><td></td></tr>
<tr><td>taxi_desl</td><td>Taxi transportation</td><td></td></tr>
<tr><td>on_taxi_paying</td><td>by paying for a taxi</td><td>ex: 4 miles <b>on taxi paying</b> 5€ per mile</td></tr>
</table>

## Virtual speed

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>financial_effort</td><td> Financial effort </td><td></td></tr>
<tr><td>net_income_per</td><td> Net income per </td><td></td></tr>
<tr><td>average_net_income_per</td><td> Average net income per </td><td></td></tr>
<tr><td>number_of_months</td><td> Number of months per year of income </td><td></td></tr>
<tr><td>number_of_weeks</td><td> Number of weeks per year of income </td><td></td></tr>
<tr><td>number_of_hours</td><td> Number of hours per week of income </td><td></td></tr>
<tr><td>hours_per</td><td> Hours per </td><td></td></tr>
<tr><td>months_per</td><td> Months per </td><td></td></tr>
<tr><td>average_working_hours_per</td><td> Average working hours per </td><td></td></tr>
<tr><td>working_hours_per</td><td> Working hours per </td><td></td></tr>
<tr><td>dist_home_job</td><td> You drive from home to work </td><td></td></tr>
<tr><td>days_drive_job</td><td> Days per week you drive to work </td><td></td></tr>
<tr><td>dist_jorney_weekend</td><td> You drive during the days you don't take the car to workplace </td><td></td></tr>
<tr><td>average_dist_per_week</td><td> You drive on average per week </td><td></td></tr>
<tr><td>you_drive_per</td><td> You drive per </td><td></td></tr>
<tr><td>minutes_home_job</td><td> Minutes you drive from home to workplace </td><td></td></tr>
<tr><td>days_drive_to_job</td><td> Days per week you drive to work </td><td></td></tr>
<tr><td>time_drive_weekend</td><td> Minutes you drive in the days you don't take the car to workplace </td><td></td></tr>
<tr><td>minutes_drive_per</td><td> Minutes you drive per </td><td></td></tr>
<tr><td>days_drive_per_month</td><td> Days you drive per month </td><td></td></tr>
<tr><td>hours_drive_per</td><td> Hours you drive per </td><td></td></tr>
<tr><td>virtual_speed</td><td> consumer speed </td><td></td></tr>
<tr><td>kinetic_speed</td><td> kinetic speed </td><td></td></tr>
<tr><td>aver_yearly</td><td> Average yearly </td><td></td></tr>
<tr><td>working_time_message</td><td> It was considered for calculations an average working time of 36 hours per week and 11 months per year </td><td></td></tr>
<tr><td>hours_to_afford_car</td><td> Hours per year you need to work to afford your car </td><td></td></tr>
<tr><td>months_to_afford_car</td><td> Months per year you need to work to afford your car </td><td></td></tr>
<tr><td>total_costs_per_year</td><td> Total costs per year for automobile </td><td></td></tr>
<tr><td>days_car_paid</td><td> For how many days, after the 1st of January, the car is paid </td><td></td></tr>
</table>

## Graphics 

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>parcel</td><td> Parcel </td><td></td></tr>
<tr><td>costs</td><td> Costs </td><td></td></tr>
</table>

## Error messages

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>error_invalid_insu_value</td><td> Invalid insurance amount </td><td></td></tr>
<tr><td>error_insu_period</td><td> Insert payment frequency of insurance payments </td><td></td></tr>
<tr><td>error_fuel_curr_dist</td><td> You must determine if you want to make calculations based on miles or USD </td><td></td></tr>
<tr><td>error_fuel_car_eff</td><td> Invalid gas efficiency amount </td><td></td></tr>
<tr><td>error_fuel_price</td><td> Invalid gas price </td><td></td></tr>
<tr><td>error_car_job</td><td> Please indicate if you take your car to the workplace </td><td></td></tr>
<tr><td>error_fuel_dist</td><td> Invalid amount of miles traveled per month </td><td></td></tr>
<tr><td>error_days_per_week</td><td> Invalid number of days per week </td><td></td></tr>
<tr><td>error_dist_home_work</td><td> Invalid miles between home and the workplace </td><td></td></tr>
<tr><td>error_dist_no_job</td><td>Invalid number of miles you drive during the days you don't drive your car to the workplace</td><td></td></tr>
<tr><td>error_currency</td><td> Invalid USD per month </td><td></td></tr>
<tr><td>error_depreciation_month</td><td> Invalid acquisition month </td><td></td></tr>
<tr><td>error_depreciation_year</td><td> Invalid acquisition year </td><td></td></tr>
<tr><td>error_depreciation_value</td><td> Invalid acquisition amount </td><td></td></tr>
<tr><td>error_depreciation_value_today</td><td> Invalid present vehicle value </td><td></td></tr>
<tr><td>error_depreciation_date</td><td> Invalid acquisition date </td><td></td></tr>
<tr><td>error_depreciation_new_car</td><td> The depreciation does not apply because this vehicle is new </td><td></td></tr>
<tr><td>error_credit_question</td><td> Please determine if you used car financing </td><td></td></tr>
<tr><td>error_credit_loan_value</td><td> Invalid financed amount </td><td></td></tr>
<tr><td>error_credit_period</td><td> Invalid period of credit, number of installment payments </td><td></td></tr>
<tr><td>error_credit_instalment</td><td> Invalid installment amount </td><td></td></tr>
<tr><td>error_credit_residual_value</td><td> Invalid residual value </td><td></td></tr>
<tr><td>error_inspection_ntimes</td><td> Invalid number of times </td><td></td></tr>
<tr><td>error_inspection_costs</td><td> Invalid inspection cost </td><td></td></tr>
<tr><td>invalid_amount</td><td> Invalid amount </td><td></td></tr>
<tr><td>invalid_nbr_pp</td><td> Invalid number of people </td><td></td></tr>
<tr><td>error_pass_amount</td><td> Invalid monthly ticket amount </td><td></td></tr>
<tr><td>error_income</td><td> Invalid net income </td><td></td></tr>
<tr><td>error_weeks_per_year</td><td> Invalid number of weeks per year </td><td></td></tr>
<tr><td>error_months_per_year</td><td> Invalid number of months per year </td><td></td></tr>
<tr><td>error_hours_per_week</td><td> Invalid number of hours per week </td><td></td></tr>
<tr><td>error_min_drive_home_job</td><td> Invalid number of minutes you drive from home to workplace </td><td></td></tr>
<tr><td>error_min_drive_weekend</td><td> Invalid number of minutes you drive in the days you don't take the car to workplace </td><td></td></tr>
<tr><td>error_min_drive</td><td> Invalid number of minutes you drive </td><td></td></tr>
<tr><td>error_days_per_month</td><td> Invalid number of days per month </td><td></td></tr>
<tr><td>your_car_costs_you</td><td> Your car costs </td><td></td></tr>
<tr><td>with_this_level_of_costs</td><td> With this level of costs, your vehicle during the </td><td>ex: "With this level of costs for your car during the" 15 months of possession.... </td></tr>
<tr><td>months_poss</td><td> months of possession has already been determined </td><td>ex: With this level of costs for your car during the 15 "months of possession, it has already been determined to be " 14000 Euros/USD</td></tr>
<tr><td>taxi_price_per_dist</td><td>2.5</td><td>amount paid for taxi in chosen currency per chosen unit distance</td></tr>
</table>

## Standard Value

Values that appear on the start page.<br>
These values are to be changed by the user but you must insert values that are reasonable.<br>
Keep in mind your chosen standard currency as well as your volume and fuel efficiency standards.<br><br>

<table>
<tr><th>key name</th><th>value</th><th>description</th></tr>
<tr><td>std_acq_month</td><td> 01 </td><td>month of acquisition</td></tr>
<tr><td>std_acq_year</td><td> 2000 </td><td>year of acquisition</td></tr>
<tr><td>std_price_paid</td><td>  </td><td>price paid for the car</td></tr>
<tr><td>std_price_today</td><td>  </td><td>the price the car has today</td></tr>
<tr><td>std_insurance_sem</td><td>  </td><td>price paid for insurance by semester</td></tr>
<tr><td>std_loan</td><td>  </td><td>amount asked for credit</td></tr>
<tr><td>std_period_of_credit</td><td>  </td><td>period of the credit in months</td></tr>
<tr><td>std_monthly_pay</td><td>  </td><td>monthly payment</td></tr>
<tr><td>std_residual_value</td><td>  </td><td>residual value must be paid after credit</td></tr>
<tr><td>std_nbr_inspection</td><td>  </td><td>number of times car went to inspection</td></tr>
<tr><td>std_inspection_price</td><td>  </td><td>normal inspection price</td></tr>
<tr><td>std_road_tax</td><td>  </td><td>price paid for road taxes per year</td></tr>
<tr><td>std_fuel_paid_per_month</td><td>  </td><td>money spent per month on fuels</td></tr>
<tr><td>std_days_per_week</td><td>  </td><td>days per week one takes their car to work</td></tr>
<tr><td>std_jorney_2work</td><td>  </td><td>(standard distance, km or miles) made from home to work (just one way)</td></tr>
<tr><td>std_jorney_weekend</td><td>  </td><td>(standard distance, km or miles) during the other days, for example weekends</td></tr>
<tr><td>std_km_per_month</td><td>  </td><td>(standard distance, km or miles) made per month</td></tr>
<tr><td>std_car_fuel_efficiency</td><td>  </td><td>(standard fuel efficiency, km/L L/100km mpg(US) or mpg(imp)) fuel efficiency in the chosen standard</td></tr>
<tr><td>std_fuel_price</td><td>  </td><td>price paid for fuel on chosen currency</td></tr>
<tr><td>std_maintenance_per_year</td><td>  </td><td>amount paid for maintenance per year</td></tr>
<tr><td>std_repairs</td><td>  </td><td>repairs and improvements paid per year on average</td></tr>
<tr><td>std_parking</td><td>  </td><td>parking paid per month</td></tr>
<tr><td>std_tolls</td><td>  </td><td>amount paid in tolls per trimestre</td></tr>
<tr><td>std_tolls_day</td><td>  </td><td>amount paid in tolls per day</td></tr>
<tr><td>std_tolls_days_per_month</td><td>  </td><td>number of days per month the car crosses a tolled way</td></tr>
<tr><td>std_fines</td><td>  </td><td>fines paid on average per trimestre</td></tr>
<tr><td>std_washing</td><td>  </td><td>amount paid in washings per trimestre</td></tr>
<tr><td>std_nr_ppl_family</td><td>  </td><td>number of people in the family</td></tr>
<tr><td>std_pass_price</td><td>  </td><td>price of the monthly pass</td></tr>
<tr><td>std_income_year</td><td>  </td><td>net income per year</td></tr>
<tr><td>std_income_month</td><td>  </td><td>net income per month</td></tr>
<tr><td>std_income_week</td><td>  </td><td>net income per week</td></tr>
<tr><td>std_income_hour</td><td>  </td><td>net income per hour</td></tr>
<tr><td>std_hours_week</td><td>  </td><td>hours per week</td></tr>
<tr><td>std_months_year</td><td>  </td><td>months per year</td></tr>
<tr><td>std_weeks_year</td><td>  </td><td>weeks per year</td></tr>
<tr><td>std_hours_week</td><td>  </td><td>work hours per week</td></tr>
<tr><td>std_time_home_job</td><td>  </td><td>minutes you drive from home to workplace</td></tr>
<tr><td>std_time_weekend</td><td>  </td><td>minutes you drive in the days you don't take the car to workplace</td></tr>
<tr><td>std_time_in_driving</td><td>  </td><td>time spent in driving (minutes/day)</td></tr>
<tr><td>std_days_month</td><td>  </td><td>days per month</td></tr>
</table>
