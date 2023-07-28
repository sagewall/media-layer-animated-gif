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

setAssetPath("https://js.arcgis.com/calcite-components/1.4.3/assets");

const imageUrl =
  "https://sagewall.github.io/test-images/G16_conus_GEOCOLOR_60fr_20230727-1035.gif";

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

imageElement.animationOptions = {
  playAnimation: true,
  reverseAnimation: false,
  randomizeStartTime: false,
  randomizeStartSeed: 1,
  startTimeOffset: 0,
  duration: 4,
  repeatType: "Oscillate",
  repeatDelay: 0,
};

const mediaLayer = new MediaLayer({
  source: [imageElement],
});

const statesFeatureLayer = new FeatureLayer({
  portalItem: {
    id: "56633b40c1744109a265af1dba673535",
  },
  minScale: 0,
  popupEnabled: false,
});

const map = new Map({
  basemap: "topo-vector",
  layers: [statesFeatureLayer, mediaLayer],
});

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

const durationInput = document.getElementById(
  "durationInput"
) as HTMLCalciteInputNumberElement;
const playAnimationSwitch = document.getElementById(
  "playAnimationSwitch"
) as HTMLCalciteSwitchElement;
const randomizeStartSeedInput = document.getElementById(
  "randomizeStartSeedInput"
) as HTMLCalciteSwitchElement;
const randomizeStartTimeSwitch = document.getElementById(
  "randomizeStartTimeSwitch"
) as HTMLCalciteSwitchElement;
const repeatDelayInput = document.getElementById(
  "repeatDelayInput"
) as HTMLCalciteInputNumberElement;
const repeatTypeSelect = document.getElementById(
  "repeatTypeSelect"
) as HTMLCalciteSelectElement;
const reverseAnimationSwitch = document.getElementById(
  "reverseAnimationSwitch"
) as HTMLCalciteSwitchElement;
const startTimeOffsetInput = document.getElementById(
  "startTimeOffsetInput"
) as HTMLCalciteSliderElement;

playAnimationSwitch?.addEventListener("calciteSwitchChange", () => {
  imageElement.animationOptions = {
    ...imageElement.animationOptions,
    playAnimation: !imageElement.animationOptions.playAnimation,
  };
});

reverseAnimationSwitch?.addEventListener("calciteSwitchChange", () => {
  imageElement.animationOptions = {
    ...imageElement.animationOptions,
    reverseAnimation: !imageElement.animationOptions.reverseAnimation,
  };
});

randomizeStartTimeSwitch?.addEventListener("calciteSwitchChange", () => {
  imageElement.animationOptions = {
    ...imageElement.animationOptions,
    randomizeStartTime: !imageElement.animationOptions.randomizeStartTime,
  };
  imageElement.animationOptions.randomizeStartTime
    ? (imageElement.animationOptions.startTimeOffset = undefined)
    : (imageElement.animationOptions.startTimeOffset = <number>(
        startTimeOffsetInput.value
      ));
  randomizeStartSeedInput.disabled =
    !imageElement.animationOptions.randomizeStartTime;
  startTimeOffsetInput.disabled = <boolean>(
    imageElement.animationOptions.randomizeStartTime
  );
});

randomizeStartSeedInput.addEventListener(
  "calciteInputNumberChange",
  (event) => {
    const target = event.target as HTMLCalciteInputNumberElement;
    imageElement.animationOptions = {
      ...imageElement.animationOptions,
      randomizeStartSeed: Number(target.value),
    };
  }
);

startTimeOffsetInput.addEventListener("calciteSliderInput", (event) => {
  const target = event.target as HTMLCalciteSliderElement;
  imageElement.animationOptions = {
    ...imageElement.animationOptions,
    startTimeOffset: Number(target.value),
  };
});

durationInput.addEventListener("calciteInputNumberChange", (event) => {
  const target = event.target as HTMLCalciteInputNumberElement;
  imageElement.animationOptions = {
    ...imageElement.animationOptions,
    duration: Number(target.value),
  };
  startTimeOffsetInput.max = Number(target.value);
});

repeatTypeSelect.addEventListener("calciteSelectChange", (event) => {
  const target = event.target as HTMLCalciteSelectElement;
  imageElement.animationOptions = {
    ...imageElement.animationOptions,
    repeatType: target.value as "Loop" | "None" | "Oscillate" | undefined,
  };
});

repeatDelayInput.addEventListener("calciteInputNumberChange", (event) => {
  const target = event.target as HTMLCalciteInputNumberElement;
  imageElement.animationOptions = {
    ...imageElement.animationOptions,
    repeatDelay: Number(target.value),
  };
});
