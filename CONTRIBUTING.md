## Coding rules
### Some coding rules
 - Use four spaces for indentations
 - Comment the code in English
 - The local variables names, object properties, functions names and directories names shall obey [CamelCase](https://en.wikipedia.org/wiki/Camel_case)
 
 ### Costs items
 The car cost items' terminology should be, for programmatic and variable naming purposes:

```
depreciation,
roadTaxes,
credit,
fines,
fuel,
inspection,
insurance,
maintenance,
parking,
repairsImprovements,
tolls,
washing
```

### Country codes
For country codes, the [2-letter ISO country](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code must be used.

## Filenames

 - If a certain javascript file has only one module, the filename shall be that module's name without the ending `Module`. For example, if a file has only the module `autocosts.abcModule`, the file name shall be `abc.js`.

 - The directories structure tries to respect the directory structure for [JavaScript/Node Projects](https://github.com/jfoclpf/autocosts/blob/master/docs/nodeJS-directory-structure.md).

## Modules

<a href="https://medium.freecodecamp.org/javascript-modules-a-beginner-s-guide-783f7d7a5fcc">Javscript modules should be used</a>. This approach lets us decide what variables/methods we want to keep private (e.g. myGrades) and what variables/methods we want to expose by putting them in the return statement (e.g. average & failing). 

The name of a module, except the main module `autocosts`, should always end the wording `Module`.

### Tree

```
autocosts
   |
   |--- getFilesModule
   |
   |--- initializeModule
   |
   |--- calculatorModule
   |        |
   |        |--- conversionsModule
   |
   |--- transferDataModule
   |
   |--- userFormModule
   |        |
   |        |--- validateFormModule
   |
   |--- resultsModule
            |
            |--- runResultsModule
            |--- chartsModule
            |--- pdfModule
```

### Pattern

By the following pattern we also ensure all methods and variables are kept private until explicitly exposed.

```js
var myGradesCalculate = (function () {
    
  // Keep this variable private inside this closure scope
  var myGrades = [93, 95, 88, 0, 55, 91];
  
  function average() {
    var total = myGrades.reduce(function(accumulator, item) {
      return accumulator + item;
      }, 0);
      
    return 'Your average grade is ' + total / myGrades.length + '.';
  }

  function failing() {
    var failingGrades = myGrades.filter(function(item) {
        return item < 70;
      });

    return 'You failed ' + failingGrades.length + ' times.';
  }

  // Explicitly reveal public pointers to the private functions 
  // that we want to reveal publicly

  return {
    average: average,
    failing: failing
  };
})();

myGradesCalculate.failing(); // 'You failed 2 times.' 
myGradesCalculate.average(); // 'Your average grade is 70.33333333333333.'
```

### Submodules

```js
var Module = (function() {

    function B() {
        console.log("Module: B");
        Module.Utils.C(); /* Accessing submodule public methods */
    };

    return {
        B: B
    };

})();

Module.Utils = (function() {

    function C() {
        console.log("Module.Utils: C");
    };

    return {
        C: C
    }

})();

Module.B();
```

Output:

```js
Module: B
Module.Utils: C
```

## Wiki page

Check also our [wiki home page](https://github.com/jfoclpf/autocosts/wiki).
