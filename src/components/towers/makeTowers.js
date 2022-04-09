import {
  NUM_TOWERS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  TOWER_GROUND_LEVEL,
} from "../../util/globals";

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

export default function makeTowers() {
  const towers = builder();

  towers.listen("draw", () => {
    const w = SCREEN_WIDTH / NUM_TOWERS;
    const towerHeights = towers.heights();
    for (let i = 0; i < towerHeights.length; i++) {
      const h = towerHeights[i] * w;
      fill_rect(i * w, SCREEN_HEIGHT - h, w, h, "gray");
    }
  });

  return towers;
}
