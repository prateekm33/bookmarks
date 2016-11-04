# bookmarks
This is a chrome extension that helps you interact with your bookmarks. 

Current functionality includes (1) Export selected bookmarks as JSON   (2) Import JSON file of bookmarks. 


Prior to loading as Chrome Extension, run a webpack build with `npm run build`. Then transfer files within `extReqs` folder to the newly created `build` folder. The `build` folder is now ready to be loaded as an unpacked extension. 