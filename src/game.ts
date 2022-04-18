import { START_TIMER } from "./util/globals";
import {
  makeTowerController,
  makeTowers,
  renderTowers,
} from "./components/towers";
import { Assets } from "./types/types";

export default function game(assets: Assets) {
  let root = new window.Thing();

  let towers = makeTowers();
  const towerController = makeTowerController(towers);
  renderTowers(
    towers,
    [
      assets["./resources/BuildingBlock00.png"],
      assets["./resources/BuildingBlock01.png"],
      assets["./resources/BuildingBlock02.png"],
    ],
    undefined
  );

  let timer = START_TIMER;
  root.listen("tick", (d: number) => {
    timer -= d;
    if (timer <= 0) {
      timer = START_TIMER;
      towerController.strike();
    }
  });
}
