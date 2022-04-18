interface Squids {
  debug: boolean;
  vec: any;
  Thing: any;
  Squid: any;
  AS: any;
  canvas: any;
  canvas_size: any;
  mouse: any;
  roll: (diceSides: number) => number;
  tick: (setTick: boolean) => void;
  draw_text: (...args: any) => void;
  draw_image: (...args: any) => void;
  fill_rect: (...args: any) => void;
  draw_rect: (...args: any) => void;
  load_font: (...args: any) => any;
  load_assets: (...args: any) => any;
}

interface Window extends Squids {}
