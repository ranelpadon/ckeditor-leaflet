ckeditor-leaflet
================
Demo page could be found here: http://ranelpadon.github.io/ckeditor-leaflet/index.html

INSTALLATION:<br>
1) Unzip the folder and rename it to 'leaflet', then paste the renamed folder to 'ckeditor/plugins' folder; after that, you should now have a 'ckeditor/plugins/leaflet/plugin.js' folder structure<br>
2) Edit the 'ckeditor/config.js' file, and add the following:<br>
    if no existing line yet:<br>
      <code>config.extraPlugins = 'leaflet';</code><br>
    otherwise, append it to the existing list, no extra spaces are allowed:<br>
      <code>config.extraPlugins = 'existingPlugin,leaflet';</code><br>

This Leaflet Map plugin leverages the power of Widget API. Hence, the 'widget' plugin is also a hard dependency. Download the Widget plugin here: http://ckeditor.com/addon/widget, then follow again the installation procedure above.<br>

This plugin utilizes the following technologies/libraries: <br><ul>
<li><a href="http://docs.ckeditor.com/#!/api/CKEDITOR.plugins.widget">Widget API</a></li>
<li><a href="https://developers.google.com/maps/documentation/javascript/places-autocomplete">Google's Places Library/Type-Ahead Search</a></li>
<li><a href="https://developers.google.com/maps/documentation/geocoding/">Google's Geocoding API</a></li>
<li><a href="http://leafletjs.com/">Leaflet JS</a></li>
<li><a href="https://github.com/leaflet-extras/leaflet-providers">Leaflet - Tile Providers</a></li>
<li><a href="https://github.com/Norkart/Leaflet-MiniMap">Leaflet - MiniMap</a></li>
</ul>

ROAD MAP (Planned stuff to do):<br><ul>
<li>Option to show the cursor's map coordinates and scale bar.</li>
<li>Marker could be dragged and its dragged position must be saved.</li>
<li>State of the panned map's view must be saved.</li>
<li>Options to specify map width and height.
<li>Responsive behavior (for mobile pages).
<li>Ability to Add Map Caption/Annotation
<li>Display the map preview in the Dialog window.</li>
<li>Handle multiple markers.</li>
<li>Add and delete markers.</li>
<li>Has option to add Panoromio (panoramio.com) layer.</li>
<li>Add other tile providers.</li>
<li>R&D other Leaflet plugins that might be useful.</li>
</ul>

LICENSE and CREDITS:<br>

License: <a href="https://www.gnu.org/licenses/lgpl.html">LGPL v3</a> applies.<br>
Copyright 2014 by Engr. Ranel O. Padon<br>
ranel.padon@gmail.com<br>

Plugin's icon is a property of <a href="http://simpleicon.com/">simpleicon</a>.
As indicated in their website, use of their icon is allowed as long as it includes proper credit and backlink.

Thanks to CKEditor, Leaflet, and other great open-source softwares and their unsung developers.<br>

Special thanks also to the insights, guidance, and collaborative support of our <a href="http://travel.cnn.com">CNN Travel</a> team:<br>
Senior Web Development Manager:<br>
Brent A. Deverman<br>

Senior Software Engineer:<br>
Adrian Christopher B. Cruz<br>

Senior QA Analyst:<br>
Jonathan A. Jacinto<br>

=======================================================







