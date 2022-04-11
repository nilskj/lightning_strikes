import { NUM_TOWERS, TOWER_GROUND_LEVEL } from "../../util/globals";

function builder() {
  let builder = new Thing();
  let towerHeights = new Array(NUM_TOWERS).fill(TOWER_GROUND_LEVEL);

  return Object.freeze({
    ...builder,
    thing: () => builder,
    heights: () => towerHeights,
    raise: function (index) {
      towerHeights[index]++;
      return this;
    },
    lower: function (index) {
      if (towerHeights[index] > 1) towerHeights[index]--;
      return this;
    },
    strike: function (index) {
      towerHeights[index] = TOWER_GROUND_LEVEL;
      return this;
    },
  });
}

export function makeTowers() {
  return builder();
}
