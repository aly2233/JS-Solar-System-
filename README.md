Background:

Solar System will be a 3D representation of our current solar system containing many of the celestial objects floating around. The board as well as the objects within it should be somewhat interactive. When clicked on, the object will be zoomed in on and charts of data made with D3.js will be brought up. This will also create a little “travel” icon which will persist until the next object is zoomed in on. A distance will then be calculated to show how long it would take to travel from the first object to the second.

Functionality & MVPs:

In Solar System, users will be able to:

See many celestial bodies rendered in 3D and their relative distances from each other.
Click/Hover over these celestial bodies to gain information on them.
Pull up graphs containing information such as temperature/day & night cycles/distance/gravity/atmospheric pressure/atmospheric composition.
Ability to “travel” from each object that is pulled up. This will give a relative timespan based on how long it would take to travel with modern technology.

In addition, this project will include:

Instructions on how to use the model.
A production ReadMe describing the model and its uses.
Music and a mute button.

Wireframe

https://wireframe.cc/pro/pp/371ed5582522723

The top left corner will contain the zoom buttons, allowing users to get a closer view of whatever they’re looking at.
The bottom left corner will contain links to my LinkedIn, GitHub, and About pages.
The bottom right will contain a menu button that can bring up instructions as well as a toggle to mute/play music.
The center will contain the representation of celestial bodies as well as the title on the top.


Technologies, Libraries, and APIs

Webpack to transpile and bundle JavaScript code.
D3.js to interpret and create data representations from data sources.
Three.js to create a 3D animation representation of the solar system.


Implementation Timeline

Friday Afternoon & Weekend: Do research on D3.js and how to use it. Start to look at what datasets to use. Study three.js and how to implement a 3D model. Begin creating the model on Sunday.
Monday: Continue to fully render out the 3D model. This will probably take up most of the day. Iron out any bugs in the model and make it interactive. If time, start to create the charts that will be added using D3.js. 
Tuesday: Make sure buttons are fully operational. Begin to add charts/information to each celestial body when clicked on. Continue to iron out any kinks.
Wednesday: Spend the day styling the page into a more “futuristic” look. Make sure transitions are smooth and all bugs are out. 
Thursday Morning: After a final test, deploy to GitHub page. Transition proposal into a production ReadMe.