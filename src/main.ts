import game from "./game";
import { scaler } from "./util/scaler";
import { assetManager } from "./util/assetManager";
import { Assets } from "./types/types";

let load_progress = 0;
let assets: unknown = [];
let titleScreen = new window.Thing();
window.debug = false;

const BLOCK_SIZE = 128;
export let SCREEN_WIDTH = BLOCK_SIZE * 7;
export let SCREEN_HEIGHT = BLOCK_SIZE * 10;

scaler.scale_canvas({ x: SCREEN_WIDTH, y: SCREEN_HEIGHT });

assetManager({
  img_paths: [
    "./resources/box.svg",
    "./resources/BuildingBlock00.png",
    "./resources/BuildingBlock01.png",
    "./resources/BuildingBlock02.png",
  ],
  snd_paths: [
    "./resources/soundtrack.mp3",
    "./resources/jump.wav",
    "./resources/lightning_strike.wav",
  ],
  onProgress: (progress: number, file: string) => {
    console.info("Loaded: ", Math.round(progress * 100) + "%", file);
    load_progress = progress;
  },
})
  .load()
  .then((loadedAssets: Assets) => {
    assets = loadedAssets;
    titleScreen.listen("mousedown", () => {
      titleScreen.destroy();
      game(assets as Assets);
    });
  });

let roboto = window.load_font("Roboto Mono", 24, "#ededed");

titleScreen.listen("draw", () => {
  window.draw_text(
    "Lightning strikes",
    SCREEN_WIDTH * 0.5,
    SCREEN_HEIGHT * 0.2,
    roboto,
    "center",
    1
  );
  window.draw_text(
    "the highest buildings ⚡️",
    SCREEN_WIDTH * 0.5,
    SCREEN_HEIGHT * 0.3,
    roboto,
    "center",
    1
  );
});
window.tick(true);
