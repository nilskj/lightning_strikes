import game from "./game";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./util/globals";

let load_progress = 0;
let load_file = "";
let assets = [];
let titleScreen = new Thing();

load_assets(
  ["./resources/box.svg"],
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

let roboto = load_font("Roboto Mono", 30, "#ededed");
titleScreen.listen("draw", () => {
  draw_text(
    "Lightning strikes the highest building ⚡️",
    SCREEN_WIDTH * 0.5,
    SCREEN_HEIGHT * 0.2,
    roboto,
    "center",
    1
  );
});
