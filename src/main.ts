import Map from "@arcgis/core/Map";
import "@arcgis/core/assets/esri/themes/light/main.css";
import Extent from "@arcgis/core/geometry/Extent";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MediaLayer from "@arcgis/core/layers/MediaLayer";
import ExtentAndRotationGeoreference from "@arcgis/core/layers/support/ExtentAndRotationGeoreference";
import ImageElement from "@arcgis/core/layers/support/ImageElement";
import MapView from "@arcgis/core/views/MapView";
import "@esri/calcite-components/dist/calcite/calcite.css";
import { setAssetPath } from "@esri/calcite-components/dist/components";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-slider";
import "@esri/calcite-components/dist/components/calcite-switch";
import "./style.css";

setAssetPath("https://js.arcgis.com/calcite-components/1.9.1/assets");

// a url to an animated gif from the GOES satellite available from NOAA
const imageUrl =
  "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/CONUS/GEOCOLOR/GOES16-CONUS-GEOCOLOR-625x375.gif";

// create an image element with a georeference
const imageElement = new ImageElement({
  image: imageUrl,
  georeference: new ExtentAndRotationGeoreference({
    extent: new Extent({
      spatialReference: {
        wkid: 102498,
      },
      xmin: -3640000,
      ymin: 1590000,
      xmax: 1400000,
      ymax: 4600000,
    }),
  }),
});

// set the animation options
imageElement.animationOptions = {
  playAnimation: true,
  duration: 4,
  repeatType: "oscillate",
  repeatDelay: 0,
};

// create a media layer with the image element as the source
const mediaLayer = new MediaLayer({
  source: [imageElement],
});

// create a feature layer to show state boundaries
const statesFeatureLayer = new FeatureLayer({
  portalItem: {
    id: "56633b40c1744109a265af1dba673535",
  },
  minScale: 0,
  popupEnabled: false,
});

// create a map with the media layer and the states layer
const map = new Map({
  basemap: "topo-vector",
  layers: [statesFeatureLayer, mediaLayer],
});

// create a map view
new MapView({
  background: {
    color: "gray",
  },
  center: [-90, 30],
  map,
  container: "viewDiv",
  scale: 25000000,
  spatialReference: {
    wkid: 102498,
  },
});

// get a reference to the duration input
const durationInput = document.getElementById(
  "durationInput"
) as HTMLCalciteInputNumberElement;

// get a reference to the play animation switch
const playAnimationSwitch = document.getElementById(
  "playAnimationSwitch"
) as HTMLCalciteSwitchElement;

// get a reference to the repeat delay input
const repeatDelayInput = document.getElementById(
  "repeatDelayInput"
) as HTMLCalciteInputNumberElement;

// get a reference to the repeat type select
const repeatTypeSelect = document.getElementById(
  "repeatTypeSelect"
) as HTMLCalciteSelectElement;

// update the image element animation options when the play animation switch is toggled
playAnimationSwitch.addEventListener("calciteSwitchChange", () => {
  imageElement.animationOptions = {
    ...imageElement.animationOptions,
    playAnimation: !imageElement.animationOptions.playAnimation,
  };
});

// update the image element animation options when the duration input changes
durationInput.addEventListener("calciteInputNumberChange", (event) => {
  const target = event.target as HTMLCalciteInputNumberElement;
  imageElement.animationOptions = {
    ...imageElement.animationOptions,
    duration: Number(target.value),
  };
});

// update the image element animation options when the repeat type select changes
repeatTypeSelect.addEventListener("calciteSelectChange", (event) => {
  const target = event.target as HTMLCalciteSelectElement;
  imageElement.animationOptions = {
    ...imageElement.animationOptions,
    repeatType: target.value as "loop" | "none" | "oscillate" | undefined,
  };
});

// update the image element animation options when the repeat delay input changes
repeatDelayInput.addEventListener("calciteInputNumberChange", (event) => {
  const target = event.target as HTMLCalciteInputNumberElement;
  imageElement.animationOptions = {
    ...imageElement.animationOptions,
    repeatDelay: Number(target.value),
  };
});
