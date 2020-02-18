The standard fonts virtual file is `vfs_fonts.js`. Though, languages and alphabets that need special fonts, such as CN, JP or IN 
they load such fonts from different virtual files stored in `XX/vfs_fonts.js`.

The font ttf files are virtually created into that file `vfs_fonts.js` using the correspondent `*.ttf` files stored in each folder
and using the instructions [here](https://pdfmake.github.io/docs/fonts/custom-fonts-client-side/). 

In short, according to the instructions, and for the `autocosts` project the fonts shall be stored alone in the folder `example/fonts` of the pdfmake project and from the root folder of the pdfmake project one shall in unix run `gulp buildFonts` the result file is stored in `build/vfs_fonts.js` of the `pdfmake` project
