ckeditor-leaflet
================
License: <a href="https://www.gnu.org/licenses/lgpl.html">LGPL v3</a> applies.

Installation <br>
1) Unzip the folder and rename it to 'inline_map', and paste the renamed folder to 'ckeditor/plugins' folder.<br>
2) Edit the 'ckeditor/config.js' file, and add the following:<br>
    if no existing line yet:<br>
      <code>config.extraPlugins = 'inline_map';</code><br>
    otherwise, append it to the existing list, no extra spaces are allowed:<br>
      <code>config.extraPlugins = 'existingPlugin,inline_map';</code><br>

This Leaflet Map plugin leverages the power of Widget API. Hence, the 'widget' plugin is also a hard dependency. Download the Widget plugin here: http://ckeditor.com/addon/widget, then follow again the installation procedure above.<br>

This plugin utilizes the following technologies/libraries: <br>
1.) <a href="http://docs.ckeditor.com/#!/api/CKEDITOR.plugins.widget">Widget API</a><br>
2.) <a href="https://developers.google.com/maps/documentation/javascript/places-autocomplete">Google's Places Library/Type-Ahead Search</a><br>
3.) <a href="https://developers.google.com/maps/documentation/geocoding/">Google's Geocoding API</a><br>
4.) <a href="http://leafletjs.com/">Leaflet JS</a><br>
5.) <a href="https://github.com/leaflet-extras/leaflet-providers">Leaflet - Tile Providers</a><br>
6.) <a href="https://github.com/Norkart/Leaflet-MiniMap">Leaflet - MiniMap</a><br>


Road Map (Planned stuff to do): <br>
Option to show the cursor's map coordinates and scale bar.<br>
Marker could be dragged and its dragged position must be saved.<br>
State of the panned map's view must be saved.<br>
Display the map preview in the Dialog window.<br>
Handle multiple markers.<br>
Add and delete markers.<br>
Has option to add Panoromio (panoramio.com) layer.<br>
Add other tile providers.<br>
R&D other Leaflet plugins that might be useful.<br>
...





