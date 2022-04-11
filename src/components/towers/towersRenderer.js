import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../main";
import { NUM_TOWERS } from "../../util/globals";

export function renderTowers(towers, towerSprite) {
  towerSprite.smoothing = false;

  towers.listen("draw", () => {
    const w = SCREEN_WIDTH / NUM_TOWERS;
    const towerHeights = towers.heights();
    for (let x = 0; x < towerHeights.length; x++) {
      if (towerSprite) {
        const h = towerSprite.h;
        const scx = w / towerSprite.w;
        const scy = h / towerSprite.h;
        for (let y = 0; y < towerHeights[x]; y++) {
          draw_image(
            towerSprite,
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
        }
      } else {
        const h = (towerHeights[x] * SCREEN_HEIGHT) / 10;
        fill_rect(i * w, SCREEN_HEIGHT - h, w, h, "gray");
      }
    }
  });
}
