CKEDITOR.dialog.add('leaflet', function(editor) {
  // Dialog's function callback for the Leaflet Widget.
  return {
    title: 'Create/Edit Leaflet Map',
    minWidth: 320,
    minHeight: 125,

    contents: [{
      // Create a Location tab.
      id: 'location_tab',
      label: 'Location',
      elements: [
        {
          id: 'map_geocode',
          className: 'geocode',
          type: 'text',
          label: 'Auto-Search of Coordinates.',
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
            // in real-time by Google.
            // Make a new DOM element.
            var stylesheet = jQuery('<style type="text/css" />');

            // Set the inner HTML. Include also the vertical alignment
            // adjustment for the MiniMap checkbox.
            stylesheet.html('.pac-container { z-index: 100000 !important;} input.minimap { margin-top: 18px !important; }');

            // Append to the main document's Head section.
            jQuery('head').append(stylesheet);
          },
        },

        { // Dummy element serving as label/text container only.
          type: 'html',
          id: 'map_label',
          className: 'label',
          style: 'margin-bottom: -10px;',
          html: '<p>Manual Input of Coordinates:</p>'
        },

        {
          // Create a new horizontal group.
          type: 'hbox',
          // Set the relative widths of Latitude, Longitude and Zoom fields.
          widths: [ '50%', '50%' ],
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
          ]
        },
      ]
      },

      {
      // Create an Options tab.
      id: 'options_tab',
      label: 'Options',
      elements: [
        {
          // Create a new horizontal group.
          type: 'hbox',
          // Set the relative widths of Latitude, Longitude and Zoom fields.
          widths: [ '38%', '38%', '24%' ],
          children: [
            {
              id: 'width',
              className: 'map_width',
              type: 'text',
              label: 'Map Width',
              setup: function(widget) {
                // Set a diffused/default text for better user experience.
                jQuery(".map_width input").attr("placeholder", "400")

                // Set the map width value if widget has a previous value.
                if (widget.element.data('width') != "") {
                  this.setValue(widget.element.data('width'));
                }
              },
            },

            {
              id: 'height',
              className: 'map_height',
              type: 'text',
              label: 'Map Height',
              setup: function(widget) {
                // Set a diffused/default text for better user experience.
                jQuery(".map_height input").attr("placeholder", "400")

                // Set the map height value if widget has a previous value.
                if (widget.element.data('height') != "") {
                  this.setValue(widget.element.data('height'));
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
                // the current location has been initialized and set previously.
                if (widget.element.data('zoom') != "") {
                  // Get the previously saved zoom value data attribute.
                  // It will be compared to the current value in the map view.
                  var zoomSaved = widget.element.data('zoom');

                  // Get the zoom level's snapshot because the current user
                  // might have changed it via mouse events or via the zoom bar.
                  var zoomIframe = widget.element.getChild(0).$.contentDocument.getElementById("map_container").getAttribute("data-zoom");

                  if (zoomIframe != zoomSaved) {
                    // Update the saved zoom value in data attribute.
                    zoomSaved = zoomIframe;
                  }

                  this.setValue(zoomSaved);
                }

                // Set the Default Zoom Level value.
                else {
                  this.setValue("10");
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
              // Create a select list for map tiles.
              // 'className' attribute is used for targeting this element in jQuery.
              type: 'select',
              id: 'map_tile',
              className: 'tile',
              label: 'Base Map Tile',
              items: [['MapQuestOpen.OSM'], ['MapQuestOpen.Aerial'], ['OpenStreetMap.Mapnik'], ['OpenStreetMap.DE'], ['OpenStreetMap.HOT'], ['Esri.DeLorme'], ['Esri.NatGeoWorldMap'], ['Esri.WorldPhysical'], ['Esri.WorldTopoMap'], ['Thunderforest.OpenCycleMap'], ['Thunderforest.Landscape'], ['Stamen.Watercolor']],

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

                // Retrieve the value in the Search field.
                var geocode = jQuery('.geocode input').val();
                var latitude, longitude;

                if (geocode != "") {
                  // No need to call the encodeURIComponent().
                  var geocodingRequest = "https://maps.googleapis.com/maps/api/geocode/json?address=" + geocode + "&sensor=false";

                  // Disable the asynchoronous behavior temporarily so that
                  // waiting for results will happen before proceeding
                  // to the next statements.
                  jQuery.ajaxSetup({
                    async: false
                  });

                  // Geocode the retrieved place name.
                  jQuery.getJSON(geocodingRequest, function(data) {
                    if (data["status"] != "ZERO_RESULTS") {
                      // Get the Latitude and Longitude object in the
                      // returned JSON object.
                      latitude = data.results[0].geometry.location.lat;
                      longitude = data.results[0].geometry.location.lng;
                    }

                    // Handle queries with no results or have some
                    // malformed parameters.
                    else {
                      alert("The Place could not be Geocoded properly. Kindly choose another one.")
                    }
                  });
                }

                // Get the Lat/Lon values from the corresponding fields.
                var latitude_input = jQuery('.latitude input').val();
                var longitude_input = jQuery('.longitude input').val();

                if (latitude_input != "" && longitude_input != "") {
                  latitude = latitude_input;
                  longitude = longitude_input;
                }

                var width = jQuery(".map_width input").val() || "400";
                var height = jQuery(".map_height input").val() || "400";
                var zoom = jQuery('select.zoom').val();
                var tile = jQuery('select.tile').val();

                // Returns 'on' or 'undefined'.
                var minimap = jQuery('.minimap input:checked').val();

                // Use 'off' if the MiniMap checkbox is unchecked.
                if (minimap == undefined) {
                  minimap = 'off';
                }

                // Get a unique timestamp:
                var milliseconds = new Date().getTime();

                // Set/Update the widget's data attributes.
                widget.element.data('id', 'leaflet_div-' + milliseconds);
                widget.element.data('lat', latitude);
                widget.element.data('lon', longitude);
                widget.element.data('width', width);
                widget.element.data('height', height);
                widget.element.data('zoom', zoom);
                widget.element.data('tile', tile);
                widget.element.data('minimap', minimap);

                // Build the full path to the map renderer.
                mapParserPathFull = mapParserPath + "?lat=" + latitude + "&lon=" + longitude + "&width=" + width + "&height=" + height + "&zoom=" + zoom + "&tile=" + tile + "&minimap=" + minimap;

                // Create a new CKEditor DOM's iFrame.
                var iframe = new CKEDITOR.dom.element('iframe');

                // Setup the iframe characteristics.
                iframe.setAttributes({
                  'scrolling': 'no',
                  'id': 'leaflet_iframe-' + milliseconds,
                  'class': 'leaflet_iframe',
                  'width': width + 'px',
                  'height': height + 'px',
                  'frameborder': 0,
                  'allowTransparency': true,
                  'src': mapParserPathFull,
                  'data-cke-saved-src': mapParserPathFull
                });

                // Insert the iframe to the widget's DIV element.
                widget.element.append(iframe);
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
