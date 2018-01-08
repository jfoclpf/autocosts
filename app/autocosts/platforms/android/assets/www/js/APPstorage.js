function isThereStorage(){

    var storage = window.localStorage;    
        
    if (storage.getItem("isThereStorage") === null){
        return false; 
    }
    else{
        return true;
    }

}

function getCountryOnStorage(){
    var storage = window.localStorage;
    
    var country = storage.getItem("Country");    
    if(country === null){
        return false;
    }
    else{
        return country;
    }

}

function saveToStorage(){

    var storage = window.localStorage;
    
    storage.removeItem("storageObject");
 
    //gets values from the form   
    var objectToStore = createObjToDB();
    objectToStore = sanityChecks(objectToStore);
    
    // Put the object into storage
    localStorage.setItem("storageObject", JSON.stringify(objectToStore));
        
    storage.setItem("Country", Country);
    storage.setItem("isThereStorage", "true");
    
    window.console && console.log("saveToStorage() stored the country " + Country + ", with the object: ", objectToStore);
}

function readFromStorage(){
    
    if (!isThereStorage()){
        return;
    }
    
    var storage = window.localStorage;
    
    var readObj = localStorage.getItem('storageObject');
    readObj = JSON.parse(readObj);
    window.console && console.log("readFromStorage() got the object: ", readObj);
    
    submitDataToForm(readObj);    
}