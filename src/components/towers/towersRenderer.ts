import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../main";
import { NUM_TOWERS } from "../../util/globals";
import { TowerBuilder } from "./makeTowers";

export function renderTowers(
  towers: TowerBuilder,
  towerSprites: string[],
  ground: any
) {
  const xx = towers.heights().length;
  const yy = 10;
  let towerMap = Array(xx)
    .fill(0)
    .map(() => Array(yy).fill(0));
  for (let i = 0; i < xx; i++) {
    for (let ii = 0; ii < yy; ii++) {
      towerMap[i][ii] =
        ii === 0 ? ground : towerSprites[window.roll(towerSprites.length)];
    }
  }

  towers.listen("draw", () => {
    const w = SCREEN_WIDTH / NUM_TOWERS;
    const towerHeights = towers.heights();
    for (let x = 0; x < towerHeights.length; x++) {
      for (let y = 0; y < towerHeights[x]; y++) {
        if (towerMap[x][y]) {
          const h = towerMap[x][y].h;
          const scx = w / towerMap[x][y].w;
          const scy = h / towerMap[x][y].h;
          window.draw_image(
            towerMap[x][y],
            x * w,
            SCREEN_HEIGHT - h * (y + 1),
            1,
            0,
            0,
            0,
            scx,
            scy,
            0,
            0,
            w,
            h
          );
        } else {
          const h = (towerHeights[x] * SCREEN_HEIGHT) / 10;
          window.fill_rect(x * w, SCREEN_HEIGHT - h * (y + 1), w, h, "gray");
        }
      }
    }
  });
}
