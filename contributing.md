## Coding rules
### Syntax
 - <a href="https://standardjs.com/">standardJS</a>

### Costs items
The car cost items' terminology should be, for programmatic and variable naming purposes:

```
depreciation
roadTaxes
credit
fines
fuel
inspection
insurance
maintenance
parking
repairsImprovements
tolls
washing
```

### Country codes
For country codes, the [2-letter ISO country](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code must be used.

### Standards

These standards should be used (for example, for variable names or object properties)

#### Time Periods

```
hour
week
month
twoMonths
trimester
semester
year
```

#### Distance

| Coding | meaning
| ----------| ------------
| **km**        | kilometer   
| **mi**        | mile        
| **mil(10km)** | [nordic mile](https://en.wikipedia.org/wiki/Scandinavian_mile)

#### Fuel Price Volume

| Coding | meaning | note
| ----------| ------------| --------
| **L** | metric litre | [SI symbol](https://www.nist.gov/pml/weights-and-measures/si-units-volume) and from [IEEE abbreviation list](https://www.ewh.ieee.org/soc/ias/pub-dept/abbreviation.pdf)
| **gal(UK)** | imperial gallon | `gal` is the standard abbreviation of gallon according to [IEEE](https://www.ewh.ieee.org/soc/ias/pub-dept/abbreviation.pdf)
| **gal(US)** | USA gallon | `gal` is the standard abbreviation of gallon according to [IEEE](https://www.ewh.ieee.org/soc/ias/pub-dept/abbreviation.pdf)

#### Fuel Efficiency

| Coding | meaning
| ----------| ------------
| **L/100km** | litres per 100 kilometres
| **km/L** | kilometre per litre
| **mpg(imp)** | miles per imperial gallon
| **mpg(US)** | miles per USA gallon
| **L/mil(10km)** | litres per nordic mile
| **mil(10km)/L** | nordic miles per litre
| **km/gal(US)** | kilometres per USA gallon

### JS Object Structure

#### userData 'class'

The core function [`calculateCosts`](src/client/core/calculator.js) which receives the user data from either the user input [HTML form](src/views/main/form.hbs) or the database, obeys the following structure:

```javascript
{
  countryCode,
  currency,

  depreciation: {
    dateOfAcquisition: {
      month,
      year,
      valueOfTheVehicle
    },
    dateOfUserInput: {
      month,
      year,
      valueOfTheVehicle
    }
  },

  insurance: {
    amountPerPeriod,
    period
  },

  credit: {
    creditBool, // type boolean
    yesCredit: {
      borrowedAmount,
      numberInstallments,
      amountInstallment,
      residualValue
    }
  },

  inspection: {
    averageInspectionCost,
    numberOfInspections
  },

  roadTaxes: {
    amountPerYear
  },

  //Form Part 2
  fuel: {
    typeOfCalculation, // type string: "money" or "distance"
    currencyBased: {
      amountPerPeriod,
      period // type string: "month", "twoMonths",  "trimester", "semester", "year"
    },
    distanceBased: {
      considerCarToJob, // type boolean
      carToJob: {
        daysPerWeek,
        distanceBetweenHomeAndJob,
        distanceDuringWeekends,
        distanceStandardUnit // type string: "km", "mi", "mil(10km)"
      },
      noCarToJob : {
        distancePerPeriod,
        period, // type string: "month", "twoMonths",  "trimester", "semester", "year"
        distanceStandardUnit // type string: "km", "mi", "mil(10km)"
      },
      fuelEfficiency,
      fuelEfficiencyStandard, // type string, "L/100km", "mpg(US)", etc.
      fuelPrice, // type number; currency per unit of volume standard. Ex: 1.4, that is 1.4 EUR / L
      fuelPriceVolumeStandard // type string: 'L', 'gal(UK)', 'gal(US)'
    }
  },

  maintenance:  {
    amountPerYear
  },

  repairsImprovements:  {
    amountPerYear
  },

  parking: {
    amountPerMonth
  },

  tolls: {
    calculationBasedOnDay, // type boolean
    yesBasedOnDay: {
      amountPerDay,
      daysPerMonth
    },
    noBasedOnDay: {
      amountPerPeriod,
      period // type string: "month", "twoMonths",  "trimester", "semester", "year"
    }
  },

  fines: {
    amountPerPeriod,
    period // type string: "month", "twoMonths",  "trimester", "semester", "year"
  },

  washing: {
    amountPerPeriod,
    period // type string: "month", "twoMonths",  "trimester", "semester", "year"
  },

  //Form Part 3
  publicTransports: {
    numberOfPeopleInFamily,
    monthlyPassCost,
    taxi: {
      costPerUnitDistance, // type number, ex: 0.5, that is [currency]/km
      distanceStandardUnit // type string: "km", "mi", "mil(10km)"
    }
  },

  income: {
    incomePeriod, // type string: "month", "twoMonths",  "trimester", "semester", "year"
    year: {
      amount
    },
    month: {
      amountPerMonth,
      monthsPerYear
    },
    week: {
      amountPerWeek,
      weeksPerYear
    },
    hour: {
      amountPerHour,
      hoursPerWeek,
      weeksPerYear
    }
  },

  workingTime: {
    isActivated,
    monthsPerYear,
    hoursPerWeek
  },

  distance: {
    considerCarToJob, // type boolean
    carToJob: {
      daysPerWeek,
      distanceBetweenHomeAndJob,
      distanceDuringWeekends,
      distanceStandardUnit // type string: "km", "mi", "mil(10km)"
    },
    noCarToJob: {
      distancePerPeriod,
      period,
      distanceStandardUnit // type string: "km", "mi", "mil(10km)"
    }
  },

  timeSpentInDriving: {
    carToJob: {
      minutesBetweenHomeAndJob,
      minutesDuringWeekend
    },
    noCarToJob: {
      minutesPerDay,
      daysPerMonth
    }
  }
}
```  

#### calculatedData 'class'

The core function [`calculateCosts`](src/client/core/calculator.js) returns an object with the following structure:


```javascript
{
  countryCode,
  currency,

  costs: {
    totalPerYear,
    totalEver,

    perMonth: {
      items: {
        depreciation,
        insurance,
        credit,
        inspection,
        roadTaxes,
        fuel,
        maintenance,
        repairsImprovements,
        parking,
        tolls,
        fines,
        washing
      },
      standingCosts,
      runningCosts,
      total
    },

    perUnitDistance: { //"km", "mile", etc.
      runningCosts,
      totalCosts
    },
  },

  speeds: {
    averageKineticSpeed,
    averageConsumerSpeed       //see for more details https://en.wikipedia.org/wiki/Effects_of_the_car_on_societies#Private_or_internal_costs
  },

  publicTransports: {
    calculated,                              //boolean whether the public transports info was calculated
    toBeDisplayed:                           //boolean whether makes sense to display public transports
    totalCostsOfStandardPublicTransports,    //total costs of public transports in the city with monthly pass              
    furtherPublicTransports: {               //further alternative public transports (train, outside residence city, etc.),
      display,                             //boolean for further alternative public transports
      totalCosts,                          //costs set to these further public transports
    },
    taxi: {
      totalCosts,                          //usage of taxi as an alternative to car
      costPerUnitDistance,                 //average price of taxi per unit distance            
      possibleDistanceDoneByTaxi,          //km/miles/etc. that could be done by taxi with amount of this.taxiCosts
    },
    totalAlternativeCostsWhenUserHasNoCar,   //total alternative costs by not having a car       
    ratios: {
      ptCostsOverCarCosts,                   //public transports over car costs ratio

      //ratio (costs of public transports)/(car costs) under which it shows public transports as alternative         
      ptCostsOverCarCostsThresholdForShowPt,

      //ratio (costs of public transports)/(car costs) under which shows other alternatives, with further public transports (intercity trains for example)                                                   
      ptCostsOverCarCostsThresholdForShowFurtherPt,
    }
  },

  financialEffort: {
    calculated,            //boolean whether the public transports info was calculated
    income: {
      averagePerHour,
      averagePerWeek,
      averagePerMonth,
      perYear,
    },
    workingTime: {
      hoursPerWeek,      //hours of work per week
      weeksPerYear,      //weeks of work per year
      monthsPerYear,     //months of work per year
      hoursPerMonth,     //average total working hours per month
      hoursPerYear,      //average total working hours per year
    },        
    totalCarCostsPerYear,               //total costs per year
    workingHoursPerYearToAffordCar,     //hours per year to afford the car
    workingMonthsPerYearToAffordCar,    //months per year to afford the car
    daysForCarToBePaid,                 //number of days till the car is paid
    financialEffortPercentage           //percentage of income that car costs represent
  },

  drivingDistance: {
    calculated,                //boolean
    perWeek,                   //average distance driven per month
    perMonth,                  //total distance driven per month
    perYear,                   //total distance driven per year
    betweenHomeAndJob,         //distance between home and job (one-way)
    duringEachWeekend,         //distance the user drives during weekend
  },

  timeSpentInDriving: {
    calculated,                //boolean
    minutesBetweenHomeAndJob,  //time (in minutes) driven between home and job
    minutesInEachWeekend,      //time (in minutes) driven during weekends
    minutesPerWeek,            //time (in minutes) driven per week
    minutesPerDay,             //time (in minutes) driven per day
    daysPerMonth,              //number of days driven per month
    hoursPerMonth,             //number of hours driven per month
    hoursPerYear               //number of hours driven per year
  },

  externalCosts: {
    calculated,                //boolean
    handbookOfeExternalCostsURL,
    pollution,
    greenhouseGases,
    noise,
    fatalities,
    congestion,
    infrastructure,
    totalPerMonth
  },

  details: {
    numberOfDaysPerWeekUserDrivesToJob, //number of days per week, the user drives to job
    ageOfCarInMonths,
    credit: {
      numberOfMonthlyInstalments,
      totalPaidInInterests
    }
  },

  standardUnits: {
    speed, // km/h, mi/h, mil(10km)/h
    distance, // km, mi, mil(10km)
    fuelEfficiency, // L/100km, km/L, etc.
    fuelPriceVolume // L, gal(UK) or gal(US)
  }
}
```

## Filenames

 - If a certain javascript file has only one module, the filename shall be that module's name without the ending `Module`. For example, if a file has only the module `autocosts.abcModule`, the file name shall be `abc.js`.

 - The directories structure tries to respect the directory structure for [JavaScript/Node Projects](https://github.com/jfoclpf/autocosts/blob/master/docs/nodeJS-directory-structure.md).

## Modules

![Front-end client module architecture](docs/moduleArchitecture.jpg)

<a href="https://medium.freecodecamp.org/javascript-modules-a-beginner-s-guide-783f7d7a5fcc">Javscript modules should be used</a>. This approach lets us decide what variables/methods we want to keep private (e.g. myGrades) and what variables/methods we want to expose by putting them in the return statement (e.g. average & failing).

The name of a module, except the main module `autocosts`, should always end the wording `Module`.

### Tree

```
autocosts
   |
   |--- commons
   |
   |--- getFilesModule
   |
   |--- initializeModule
   |
   |--- userFormModule
   |
   |--- convertDataModule
   |
   |--- validateDataModule
   |
   |--- runResultsModule
   |
   |--- calculatorModule
   |        |--- conversionsModule
   |
   |--- showResultsModule
            |--- chartsModule
            |--- pdfModule

```

### Pattern

By the following pattern we also ensure all methods and variables are kept private until explicitly exposed.

File: `myModuleA.js`:

```js
root.myModuleA = (function (thisModule) {

    //dependency
    var myModuleB

    function initialize() {
        loadModuleDependencies()
    }

    function loadModuleDependencies(){
        myModuleB = root.myModuleB
    }

    function A(){
        ...
    }

    function C(){
        ...
    }  

    /* === Public methods to be returned ===*/
    //own module, since it may have been defined erlier by children modules    
    thisModule.initialize = initialize
    thisModule.C = C

    return thisModule

})(root.myModuleA || {})

```

### Submodules

File: `myModuleA1.js`:

```js
root.myModuleA = root.myModuleA || {};
root.myModuleA.mySubmoduleA1 = (function() {

    //dependency
    var myModuleB

    function initialize() {
        loadModuleDependencies()
    }

    function loadModuleDependencies(){
        myModuleB = root.myModuleB
    }

    function E(){
        myModuleB.P()
        ...
    }

    function F(){
        ...
    }

    return {
        initialize: initialize,
        F: F
    };

})()
```

With this structure it is possible to load all files on a fully asynchronous way, without concern on dependencies nor order of loading, that is:

```js
$.when($.getScript('myModuleA.js'), $.getScript('myModuleA1.js')).then(function(){
    root.myModuleA.initialize()
    root.myModuleA.mySubmoduleA1.initialize()
    //now all the methods are available
    root.myModuleA.mySubmoduleA1.F()
    root.myModuleA.C()
})
```

## Flow Data structure

![Flow Data structure](docs/flowDataStructure.jpg)

## URL parts terminology

We follow Javascript on browsers variable:  `window.location`

```
protocol://username:password@hostname:port/pathname?search#hash
-----------------------------href------------------------------
                             -----host----
-----------      origin      -------------
```

 - `protocol` - protocol scheme of the URL, including the final ':'
 - `hostname` - domain name
 - `port` - port number
 - `pathname` - /pathname
 - `search` - ?parameters
 - `hash` - #fragment_identifier
 - `username` - username specified before the domain name
 - `password` - password specified before the domain name
 - `href` - the entire URL
 - `origin` - protocol://hostname:port
 - `host` - hostname:port

Variable names should be proceeded by `url`, for example `urlHref` for the whole url.

## Wiki page

Check also our [wiki home page](https://github.com/jfoclpf/autocosts/wiki).
