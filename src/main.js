import game from "./game";
import { scaler } from "./util/scaler";

let load_progress = 0;
let load_file = "";
let assets = [];
let titleScreen = new Thing();
window.debug = false;

const BLOCK_SIZE = 128;
export let SCREEN_WIDTH = BLOCK_SIZE * 7;
export let SCREEN_HEIGHT = BLOCK_SIZE * 10;

scaler.scale_canvas({ x: SCREEN_WIDTH, y: SCREEN_HEIGHT });
console.log(scaler.getCanvasSize());

load_assets(
  ["./resources/box.svg", "./resources/BuildingBlock.svg"],
  [
    "./resources/soundtrack.mp3",
    "./resources/jump.wav",
    "./resources/lightning_strike.wav",
  ],
  (progress, file, asst, type) => {
    load_progress = progress;
    load_file = file;
    assets[file] = asst;

    log(load_progress + "% " + type + " " + file);
    if (load_progress >= 1.0) {
      titleScreen.listen("mousedown", () => {
        titleScreen.destroy();
        game(assets);
      });
    }
  },
  console.error
);

let roboto = load_font("Roboto Mono", 24, "#ededed");
titleScreen.listen("draw", () => {
  draw_text(
    "Lightning strikes",
    SCREEN_WIDTH * 0.5,
    SCREEN_HEIGHT * 0.2,
    roboto,
    "center",
    1
  );
  draw_text(
    "the highest buildings ⚡️",
    SCREEN_WIDTH * 0.5,
    SCREEN_HEIGHT * 0.3,
    roboto,
    "center",
    1
  );
});
tick(true);
