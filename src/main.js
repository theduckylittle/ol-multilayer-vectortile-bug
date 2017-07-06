

import VectorTileSource from 'ol/source/vectortile';
import VectorTileLayer from 'ol/layer/vectortile';
import TileLayer from 'ol/layer/tile';
import OsmSource from 'ol/source/osm';

import TileGrid from 'ol/tilegrid';

import MVT from 'ol/format/mvt';

import Map from 'ol/map';

import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import Fill from 'ol/style/fill';

import View from 'ol/view';


import CONFIG from './config';


const mbx_src = new VectorTileSource({
    url: 'https://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/' +
          '{z}/{x}/{y}.vector.pbf?access_token=' + CONFIG.mbx_key,
    tileGrid: TileGrid.createXYZ({maxZoom: 22}),
    tilePixelRatio: 16,
    format: new MVT(),
});

const red_layer =  new VectorTileLayer({
  source: mbx_src,
  style: function(feature, rez) {
    if(feature.get('layer') == 'admin') {
      return new Style({
        stroke: new Stroke({
          color: 'red',
          width: 2
        })
      });
    }
    return null;
  }
});

const green_layer = new VectorTileLayer({
  source: mbx_src,
  style: function(feature, rez) {
    if(feature.get('layer') == 'admin') {
      return new Style({
        stroke: new Stroke({
          color: 'green',
          width: 6,
        })
      });
    }
    return null;
  }
});


const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OsmSource()
    }),
    red_layer,
    green_layer,
  ],
  view: new View({
    center: [0,0],
    zoom: 2
  })
});




