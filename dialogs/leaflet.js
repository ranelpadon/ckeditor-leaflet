CKEDITOR.dialog.add('leaflet', function(editor) {


  // Dialog's function callback for the Leaflet Widget.
  return {
    title: 'Create/Edit Leaflet Map',
    minWidth: 150,
    minHeight: 120,

    contents: [{
      // Create a 'map_dialog' tab.
      id: 'map_dialog',
      elements: [
        {
          id: 'map_geocode',
          className: 'geocode',
          type: 'text',
          label: 'Search the Place name.',
          width: '350px',
          setup: function(widget) {
            this.setValue("");
          },

          onShow: function (widget) {
            // Get the DOM reference for the Search field.
            var input = jQuery(".geocode input")[0];

            // Bind the Search field to the Autocomplete widget.
            var autocomplete = new google.maps.places.Autocomplete(input);

            // Fix for the Google's type-ahead search displaying behind
            // the widgets dialog window.
            // Basically, we want to override the z-index of the
            // Seach Autocomplete list, in which the styling is being set
            // in real-time by Google's.
            // Make a new DOM element.
            var stylesheet = jQuery('<style type="text/css" />');

            // Set the inner HTML. Include also the vertical alignment
            // adjustment for the MiniMap checkbox.
            stylesheet.html('.pac-container { z-index: 100000 !important;} input.minimap { margin-top: 18px !important; }');

            // Append to the main document's Head section.
            jQuery('head').append(stylesheet);
          },
        },

        {
          type: 'button',
          id: 'map_search',
          className: 'search',
          label: 'Retrieve the Place\'s coordinates.',
          onClick: function() {
            // Retrieve the value in the Search field.
            var geocode = jQuery('.geocode input').val();

            // No need to call the encodeURI().
            geocodingRequest = "https://maps.googleapis.com/maps/api/geocode/json?address=" + geocode + "&sensor=false";

            // Geocode the retrieved place name.
            jQuery.getJSON(geocodingRequest, function(data) {
              if (data["status"] != "ZERO_RESULTS") {
                // Get the Latitude and Longitude object in the
                // returned JSON object.
                latitude = data.results[0].geometry.location.lat;
                longitude = data.results[0].geometry.location.lng;

                // Update the corresponding Lat/Lon text fields.
                jQuery('.latitude input').val(latitude);
                jQuery('.longitude input').val(longitude);
              }

              // Handle queries with no results or have some
              // malformed parameters.
              else {
                alert("The Place could not be Geocoded properly. Kindly choose another one.")
              }
            });
          }
        },

        {
          // Create a new horizontal group.
          type: 'hbox',
          // Set the relative widths of Latitude, Longitude and Zoom fields.
          widths: [ '38%', '38%', '24%' ],
          children: [
            {
              id: 'map_latitude',
              className: 'latitude',
              type: 'text',
              label: 'Latitude',
              setup: function(widget) {
                // Set the Lat values if widget has previous value.
                if (widget.element.data('lat') != "") {
                  this.setValue(widget.element.data('lat'));
                }
              },
            },

            {
              id: 'map_longitude',
              className: 'longitude',
              type: 'text',
              label: 'Longitude',
              setup: function(widget) {
                // Set the Lat values if widget has previous value.
                if (widget.element.data('lon') != "") {
                  this.setValue(widget.element.data('lon'));
                }
              },
            },

            {
              // Create a select list for Zoom Levels.
              // 'className' attribute is used for targeting this element in jQuery.
              id: 'map_zoom',
              className: 'zoom',
              type: 'select',
              label: 'Zoom Level',
              width: '70px',
              items: [['1'], ['2'], ['3'], ['4'],['5'], ['6'], ['7'], ['8'], ['9'], ['10'], ['11'], ['12'], ['13'], ['14'], ['15'], ['16'], ['17'], ['18'], ['19'], ['20']],

              // This will execute also every time you edit/double-click the widget.
              setup: function(widget) {
                // Set this Zoom Level's select list when
                // a City has been initialized and set previously.
                if (widget.element.data('zoom') != "") {
                  // Get the previously saved zoom value data attribute.
                  // It will be compared to the current value in the map view.
                  zoomSaved = widget.element.data('zoom');

                  // Get the zoom level's snapshot because the current user
                  // might have changed it via mouse events or via the zoom bar.
                  zoomIframe = editor.document.$.getElementById("widget_iframe_map").contentDocument.getElementById("map_container").getAttribute("data-zoom");

                  if (zoomIframe != zoomSaved) {
                    // Update the saved zoom value in data attribute.
                    zoomSaved = zoomIframe;
                  }

                  this.setValue(zoomSaved);
                }

                // Set the Default Zoom Level value.
                else {
                  this.setValue("8");
                }
              },
            }
          ]
        },

        {
          // Create a new horizontal group.
          type: 'hbox',
          // Set the relative widths of Latitude, Longitude and Zoom fields.
          widths: [ '50%', '50%' ],
          children: [
            {
              // Create a select list for City.
              // 'className' attribute is used for targeting this element in jQuery.
              type: 'select',
              id: 'map_tile',
              className: 'tile',
              label: 'Select Base Map Tile',
              items: [['MapQuestOpen.OSM'], ['MapQuestOpen.Aerial'], ['OpenStreetMap.Mapnik'], ['OpenStreetMap.DE'], ['OpenStreetMap.HOT'], ['Esri.WorldTopoMap'], ['Thunderforest.Landscape'], ['Stamen.Watercolor']],

              // This will execute also every time you edit/double-click the widget.
              setup: function(widget) {
                // Set the Tile data attribute.
                if (widget.element.data('tile') != "") {
                  this.setValue(widget.element.data('tile'));
                }

                else {
                  // Set the default value.
                  this.setValue('MapQuestOpen.OSM');
                }
              },

              // This will execute every time you click the Dialog's OK button.
              // It will inject a map iframe in the CKEditor page.
              commit: function(widget) {
                // Remove the iframe if it has one.
                widget.element.setHtml('');

                // Get the Lat/Lon values from the corresponding fields.
                latitude = jQuery('.latitude input').val();
                longitude = jQuery('.longitude input').val();

                if (latitude != "" && longitude != "") {
                    zoom = jQuery('select.zoom').val();
                    tile = jQuery('select.tile').val();
                    // Returns 'on' or 'undefined'.
                    minimap = jQuery('.minimap input:checked').val();

                    // Use 'off' if the MiniMap checkbox is unchecked.
                    if (minimap == undefined) {
                      minimap = 'off';
                    }

                    // Set/Update the widget's data attributes.
                    widget.element.data('lat', latitude);
                    widget.element.data('lon', longitude);
                    widget.element.data('zoom', zoom);
                    widget.element.data('tile', tile);
                    widget.element.data('minimap', minimap);

                    // Build the full path to the map renderer.
                    mapParserPathFull = mapParserPath + "?lat=" + latitude + "&lon=" + longitude + "&zoom=" + zoom + "&tile=" + tile + "&minimap=" + minimap;

                    // Create a new CKEditor DOM's iFrame.
                    iframe = new CKEDITOR.dom.element('iframe');

                    // Setup the iframe characteristics.
                    iframe.setAttributes({
                      scrolling: 'no',
                      // 'id' is very useful when accessing the zoom level
                      // snapshot of the map
                      id:"widget_iframe_map",
                      class: "widget_iframe",
                      width: "600px",
                      height: "600px",
                      frameborder: 0,
                      allowTransparency: true,
                      src: mapParserPathFull,
                      // Note that 'data-cke-saved-src' is a required attribute
                      // in CKEditor to bypass browsers' issues with 'src'.
                      "data-cke-saved-src": mapParserPathFull
                    });

                    // Insert the iframe to the widget's DIV element.
                    widget.element.append(iframe);
                }
              },
            },

            {
              type: 'checkbox',
              id: 'map_mini',
              className: 'minimap',
              label: 'Include MiniMap',

              // This will execute also every time you edit/double-click the widget.
              setup: function(widget) {
                // Set the MiniMap check button.
                if (widget.element.data('minimap') != "" && widget.element.data('minimap') != "on") {
                  this.setValue('');
                }

                else {
                  // Set the default value.
                  this.setValue('true');
                }
              },
            }
          ]
        },
      ]
    }]
  };
});
