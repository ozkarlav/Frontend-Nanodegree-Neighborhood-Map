"Read me" - Udacity Neighborhood Map Project
--------

Do you live in North America and would like to find the latest Balg Eagles sightings near you?. This web app connects to the eBird.org online database, where researchers and amateur naturalists report bird sightings from around the world, and displays the Bald Eagle's sightings on a specific area.


Simply use the search field above the Google Map and indiate how many days you want go back, click search and if there are Bald Eagle sightings nearby you can even get directions to the spot.

***

Features
-------

* 5 of my own Bald Eagle reports are showed before any search is made.
* Location search.
* Your search will generate a maximum of 25 locations where Bald Eagles have been seen.
* Text input field that filters the list items to locations matching the markers on the map.
* Responsive web app, with hamburguer icon to hide/show the locations list.
* Find mote information about the Barld Eagle sighting like:

1. Observation Date
2. Location Name
3. Number of Eagles
4. Type of Property(Private or Public)
5. Directions.

***

Quick Guide
-------

* Open the index.html file inside the /src folder or the dist/ folder if you want to run it with optimized files after you have run Grunt.
* At first you will find my 5 most recent reports for London, Ontario, Canada.
* Search for any location: enter a city name or address, e.g. "Vancouver, BC" or "Washington DC", how many days you want go back and click on the Search button.
* This App will show you a maximum of 25 Bald Eagle sightings, being showed in the left list and their respective markers on the right.
* You can filter the list on the left by typing the location names on the list.
* When you hover over the list results, the correspondent marker will bounce and change colour.
* When you click on a Map marker an Info window will open with information about that specific sighting, you can even get directions to that place by clicking on the directions link on the window.
* [Try it now](http://oscarlab.ca/eaglelocator/).

***

Resources Used
--------

* StackOverflow
* Udacity
* Knockout JS Documentation & Tutorials
* Google Maps API Documentation
* eBird.org API Documentation
* Bootsnipp - [Simple Sidebar](http://bootsnipp.com/snippets/BDWlD)
* StackOverflow [Clear icon inside input text](http://stackoverflow.com/questions/6258521/clear-icon-inside-input-text)

***

Build Tools 
--------

* There are two directories in the repository: src/ for development purposes and dist/ for deployment on the web. src/ contains reader-friendly code, and  dist/ will contain the optimized versions of the src/ folder files.

* [Grunt](http://gruntjs.com/) is used to optimize this code, so you have to run Grunt to generate these files.

* You will need to install the following Grunt plug-ins to build the project:

1. grunt-contrib-cssmin
2. grunt-contrib-uglify
3. grunt-contrib-htmlmin
4. grunt-contrib-copy

* If you are only interested in generating the production code, simply run the command 'grunt' to run all optimizations in the Gruntfile. Production code will be saved in the dist/ directory.

* To view the pages from the production code, navigate to the dist directory and open index.html in your browser.