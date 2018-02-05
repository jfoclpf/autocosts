Automobile costs calculator
=========

This calculator allows users to find the true cost of owning a car. It will normally give them a good estimate of what they really need to spend on car ownership. As car payments and expenses come due throughout the year, it's often difficult to really get a good understanding of total spending on a car. By default, these values are calculated on a monthly basis. 

This calculator is and shall be completely anonymous, as it doesn't request nor permanently store, any name, email, cookies, IP address nor any other personal information.

## Website
https://autocosts.info<br>
Playground: https://autocosts.info/XX 

### The list of available countries
https://autocustos.info/list

The translations are in corresponding `json` files, namely in the folder `src/countries/`.<br>
The list of available countries is from the file `src/countries/list.json`

### The registered associated domains
https://autocosts.info/domains


## How to install

Clone it, install it and build it<br>
`git clone https://github.com/jfoclpf/autocosts.git`<br>
`cd autocosts/ && npm install`


The directory that corresponds to the website public HTML is `build/`. This directory is built upon installation. For more information run `./build.sh -h`.



## Available services
The available services are defined in the global `SWITCH` JS object in the file `src/client/Globals.js`

## Android APP<br>

The <a href="https://play.google.com/store/apps/details?id=info.autocosts">Android APP can be found in Play Store</a>. It uses <a href="https://cordova.apache.org/">Apache Cordova</a> to convert JavaScript built code into APP built files (for example APK files in Android)

## Contributions
* Use four spaces for indentations
* Always comment the code in English
* Respect the folders structure

## License<br>
GNU GPLv3<br>
http://www.gnu.org/licenses/gpl-3.0.en.html <br>
http://choosealicense.com/licenses/gpl-3.0/
