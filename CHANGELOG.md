###CHANGELOG

####Version 1.4 Released (December 30, 2015)

 - Implement draggable marker so that the latitude and longitude of a  place could be
   more precise and refined, especially when the Google's predicted location is not in
   has saved the page or when the user opens the widget's dialog options and then
   clicked the OK button (w/ or w/out changing any of the dialog options).

 - Recenter the map (and with panning animation) for better UX
   if the user drags the marker to a new position

 - Update Leaflet's JS/CSS files to the latest stable build, version [0.7.7](http://leafletjs.com/download.html),
 which was released on October 26, 2015.

 - Remove the unnecessary files (especially the files/assets in the **leaflet/scripts** folder)
    so that the plugin's folder is as lean as possible.

####Version 1.3.3 Released (December 25, 2015)
Same as Version 1.3.2, but re-uploaded in CKEditor.com just to indicate compatibility with CKEditor 4.5.x on its plugin page. Not a significant release actually.

####Version 1.3.2 Released (December 13, 2015)
Update the Leaflet Maps installation documentation with respect to version 7.x-1.16 of Drupal's CKEditor module. Adjust the plugin's license for compatibility with GPLv2+ open-source projects.

####Version 1.3.1 Released (December 27, 2014)
Add a conditional check to load only the jQuery library if it's not already loaded to boost performance and avoid overriding jQuery bindings with other 3rd-party plugins.

####Version 1.3 Released (December 27, 2014)
The user could now specify if the map should be responsive. The widget should now work also for both http and https protocols. Installation guide now includes some notes regarding markup filtering.
> In the Options tab of the Dialog window, there's now a 'Responsive Map' checkbox option.

> - Assuming you have a responsive site theme or page styling, this will make the map to have 100% width with the typical 16:9 aspect ratio.
> - Responsive behavior will override the widget alignment settings since it will always be centered.
> - The width and height will also be auto-computed depending on the dimensions of the device's screen.
> - The map's responsive behavior will not have effect if you have don't have a responsive site theme or page styling.

> Handle HTTPS/Secured Protocol

> - The widget should now work for both http or https protocols.

> Add notes in **Installation Guide** about possible issues in markup filtering.

> - Some systems like Drupal blocks IFRAME tag by default and discard any inline styling. See the workarounds in [IV. CAVEATS AND SURPRISES](https://github.com/ranelpadon/ckeditor-leaflet/blob/master/Installation%20Guide.txt/)

####Version 1.2 Released (August 9, 2014):

The user could now specify the marker's popup text.
