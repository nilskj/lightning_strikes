import { NUM_TOWERS } from "../../util/globals";
import { SCREEN_WIDTH } from "../../main";
import { scaler } from "../../util/scaler";
import { TowerBuilder } from "./makeTowers";

function calculateStrikeTargets(heights: number[]) {
  let max = heights[0];
  let targets: number[] = [];

  for (let i = 0; i < heights.length; i++) {
    if (heights[i] > max) {
      max = heights[i];
      targets = [i];
    } else if (heights[i] === max) {
      targets.push(i);
    }
  }

  return {
    max,
    targets,
  };
}

export function makeTowerController(towers: TowerBuilder) {
  const controller = new window.Thing();
  controller.listen("mousedown", (mouse_x: number, mouse_y: number) => {
    const x = mouse_x * scaler.scaleFactor();
    const w = SCREEN_WIDTH / NUM_TOWERS;
    const target = Math.floor(x / w);
    towers.raise(target);
  });

  return {
    ...controller,
    strike: () => {
      const { max, targets } = calculateStrikeTargets(towers.heights());
      const strikeTarget = targets[window.roll(targets.length)];
      if (max > 5) {
        towers.strike(strikeTarget);
      } else {
        towers.lower(strikeTarget);
      }
      return {
        strikeTarget,
        max,
      };
    },
  };
}

export type TowersController = ReturnType<typeof makeTowerController>;
