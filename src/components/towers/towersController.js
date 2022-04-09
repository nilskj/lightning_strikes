import { NUM_TOWERS, SCREEN_WIDTH } from "../../util/globals";

function calculateStrikeTargets(heights) {
  let max = heights[0];
  let targets = [];

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

export default function makeTowerController(towers) {
  const controller = new Thing();
  controller.listen("mousedown", (mouse_x) => {
    const w = SCREEN_WIDTH / NUM_TOWERS;
    const target = Math.floor(mouse_x / w);
    towers.raise(target);
  });
  return {
    ...controller,
    strike: () => {
      const { max, targets } = calculateStrikeTargets(towers.heights());
      const strikeTarget = targets[roll(targets.length)];
      if (max >= 4) {
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
