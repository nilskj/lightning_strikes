import { NUM_TOWERS, TOWER_GROUND_LEVEL } from "../../util/globals";

function builder() {
  let builder = new window.Thing();
  let towerHeights = new Array(NUM_TOWERS).fill(TOWER_GROUND_LEVEL);

  return Object.freeze({
    ...builder,
    thing: () => builder,
    heights: () => towerHeights,
    raise: function (index: number) {
      towerHeights[index]++;
      return this;
    },
    lower: function (index: number) {
      if (towerHeights[index] > 1) towerHeights[index]--;
      return this;
    },
    strike: function (index: number) {
      towerHeights[index] = TOWER_GROUND_LEVEL;
      return this;
    },
  });
}
export type TowerBuilder = ReturnType<typeof builder>;
export { builder as makeTowers };
