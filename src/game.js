import makeTowers from "./components/towers/makeTowers";
import makeTowerController from "./components/towers/towersController";
import { START_TIMER } from "./util/globals";

export default function game(assets) {
  let root = new Thing();

  let towers = makeTowers();
  const towerController = makeTowerController(towers);

  let timer = START_TIMER;
  root.listen("tick", (d) => {
    timer -= d;
    if (timer <= 0) {
      timer = START_TIMER;
      towerController.strike();
    }
  });

  tick(true);
}
