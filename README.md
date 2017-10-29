Automobile costs calculator
=========

This calculator allows users to find the true cost of owning a car. It will normally give them a good estimate of what they really need to spend on car ownership. As car payments and expenses come due throughout the year, it's often difficult to really get a good understanding of total spending on a car. By default, these values are calculated on a monthly basis. 

This calculator is completely anonymous, as it doesn't request nor permanently store, any name, email, cookies, IP address nor any other personal information.

### Website
https://autocosts.info<br>

### The list of available countries
https://autocustos.info/list

### The registered associated domains
https://autocosts.info/domains

## Available services
The available services are defined in the global `SWITCH` JS object in the file <a href="https://github.com/jfoclpf/autocosts/blob/master/js/Globals.js.php">Globals.js.php</a>

## Android APP<br>
https://play.google.com/store/apps/details?id=info.autocosts

## Projects used

Stored in folder php/<br>
* <a href="https://github.com/matthiasmullie/minify">matthiasmullie/minify</a> to minify php generated code on client demand
* <a href="https://github.com/matthiasmullie/path-converter">matthiasmullie/path-converter</a>
* <a href="http://pdfmake.org/#/">pdfmake</a> to export the final report to a pdf file. See folder `src/js/pdf`

Other<br>
* <a href="http://www.chartjs.org/">chartjs.org</a> for the Android APP charts
* <a href="https://developer.uber.com/">UBER API</a> for transports costs comparisons

To be run from scripts stored in `scripts/` folder<br>
* <a href="https://www.imagemagick.org/script/index.php">ImageMagick</a> to compress images (see script `compressImages.sh`)
* <a href="http://jshint.com/install/">JShint</a> to detect if Javascript code has errors
* <a href="https://www.npmjs.com/package/minifyjs">minifyjs</a> to minify deployed Javascript code
* <a href="https://www.npmjs.com/package/html-minifier">html-minifier</a> to minify deployed static HTML
* <a href="http://phantomjs.org/">phantomjs</a> to rasterize HTML tables (costs tables) into JPG images, to be sharable with a link

APP<br>
* it uses <a href="https://cordova.apache.org/">Apache Cordova</a> to convert JavaScript built code into APP built files (for example APK files in Android)

## Contributions
* Use four spaces for indentations
* Always comment the code in English
* Respect the folders structure

## License<br>
GNU GPLv3<br>
http://www.gnu.org/licenses/gpl-3.0.en.html <br>
http://choosealicense.com/licenses/gpl-3.0/
