## Coding rules
### Syntax
 - <a href="https://standardjs.com/">standardJS</a>
 
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
   |--- commons
   |
   |--- getFilesModule
   |
   |--- initializeModule
   |
   |--- calculatorModule
   |        |
   |        |--- conversionsModule
   |
   |--- convertDataModule
   |
   |--- userFormModule
   |        |
   |        |--- validateFormModule
   |
   |--- resultsModule
   |        |
   |        |--- runResultsModule
   |        |--- chartsModule
   |        |--- pdfModule
   |
   |--- databaseModule
```

### Pattern

By the following pattern we also ensure all methods and variables are kept private until explicitly exposed.

File: `myModuleA.js`:

```js
root.myModuleA = (function (thisModule) {
    
    //dependency
    var myModuleB;
    
    function initialize() {
        loadModuleDependencies();
    }
     
    function loadModuleDependencies(){
        myModuleB = root.myModuleB;
    }

    function A(){
        ...
    }

    function B(){
        ...
    }
  
    function C(){
        ...
    }  

    /* === Public methods to be returned ===*/

    //own module, since it may have been defined erlier by children modules    
    thisModule.initialize = initialize;
    thisModule.C = C;
    
    return thisModule;
    
})(root.myModuleA || {});

```

### Submodules

File: `myModuleA1.js`:

```js
root.myModuleA = root.myModuleA || {};
root.myModuleA.mySubmoduleA1 = (function() {

    //dependency
    var myModuleB;
    
    function initialize() {
        loadModuleDependencies();
    }
     
    function loadModuleDependencies(){
        myModuleB = root.myModuleB;
    }

    function E(){
        myModuleB.P();
        ...
    }
    
    function F(){
        ...
    }
    
    return {
        initialize: initialize,
        F: F
    };

})();
```

With this structure it is possible to load all files on a fully asynchronous way, without concern on dependencies nor order of loading, that is:

```js

$.when($.getScript('myModuleA.js'), $.getScript('myModuleA1.js')).then(function(){
    root.myModuleA.initialize();
    root.myModuleA.mySubmoduleA1.initialize();
    //now all the methods are available
    root.myModuleA.mySubmoduleA1.F();
    root.myModuleA.C();
});
```

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
