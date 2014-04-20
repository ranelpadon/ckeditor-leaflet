ckeditor-leaflet
License: LGPL v3 should be applied (https://www.gnu.org/licenses/lgpl.html)
================

Installation
1) Unzip the folder and rename it to 'inline_map', and paste the renamed folder to 'ckeditor/plugins' folder.
2) Edit the 'ckeditor/config.js' file, and add the following:
    if no existing line yet:
      config.extraPlugins = 'inline_map';
    otherwise, append it to the list, no extra spaces are allowed:
      config.extraPlugins = 'previousPlugin,inline_map';
   
This Leaflet Map plugin leverages the power of Widget API. Hence, the 'widget' plugin is also a hard dependency.
Download the Widget plugin here: http://ckeditor.com/addon/widget, then follow again the installation procedure above.

This plugin utilizes the following technologies/libraries:
1.) Widget API (http://docs.ckeditor.com/#!/api/CKEDITOR.plugins.widget)
2.) Google's Places Library/Type-Ahead Search (https://developers.google.com/maps/documentation/javascript/places-autocomplete) 
3.) Google's Geocoding API (https://developers.google.com/maps/documentation/geocoding/)
4.) Leaflet JS (http://leafletjs.com/)
5.) Leaflet - Tile Providers (https://github.com/leaflet-extras/leaflet-providers)
6.) Leaflet - MiniMap (https://github.com/Norkart/Leaflet-MiniMap)


Road Map (Planned stuff to do):
Option to show the cursor's map coordinates and scale bar.
Marker could be dragged and its dragged position must be saved.
State of the panned map's view must be saved.
Display the map preview in the Dialog window.
Handle multiple markers.
Add and delete markers.
Has option to add Panoromio (panoramio.com) layer.
Add other tile providers.
R&D other Leaflet plugins that might be useful.
...





