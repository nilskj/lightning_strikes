import { START_TIMER } from "./util/globals";
import {
  makeTowerController,
  makeTowers,
  renderTowers,
} from "./components/towers";

export default function game(assets) {
  let root = new Thing();

  let towers = makeTowers();
  const towerController = makeTowerController(towers);
  renderTowers(towers, assets["./resources/BuildingBlock.svg"]);

  let timer = START_TIMER;
  root.listen("tick", (d) => {
    timer -= d;
    if (timer <= 0) {
      timer = START_TIMER;
      towerController.strike();
    }
  });
}
