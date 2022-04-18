function makeScaler() {
  function scale_canvas(screen: any) {
    window.canvas.style.width = "unset";
    window.canvas.style.height = "unset";
    window.canvas.style.top = "unset";
    window.canvas.style.left = "unset";

    window.canvas_size = {
      width : screen.x,
      height: screen.y,
    };

    window.canvas.width = screen.x;
    window.canvas.height = screen.y;

    let squids_scaler = new window.Thing();
    squids_scaler.listen("tick", function () {
      let originalWidth =  window.canvas_size.width;
      let originalHeight =  window.canvas_size.height;

      let options = {
        container: new window.AS.Size(window.innerWidth, window.innerHeight),
        target: new window.AS.Size(originalWidth, originalHeight),
        policy: window.AS.POLICY.ShowAll,
      };

      let rect = window.AS.getScaledRect(options);

      window.canvas_size.x = rect.x;
      window.canvas_size.y = rect.y;
      window.canvas_size.width = rect.width;
      window.canvas_size.height = rect.height;

      window.canvas_size.scale = screen.x / rect.width;

      window.canvas.style.width =  window.canvas_size.width + "px";
      window.canvas.style.height =  window.canvas_size.height + "px";

      window.canvas.style.top =  window.canvas_size.y + "px";
      window.canvas.style.left =  window.canvas_size.x + "px";
    });

    squids_scaler.listen("mousemove", function (mx: number, my: number, event: MouseEvent) {
      window.mouse = local_mouse(event.clientX, event.clientY);
    });
  }

  function local_mouse(mx: number, my: number) {
    let px = (mx -  window.canvas_size.x) *  window.canvas_size.scale;
    let py = (my -  window.canvas_size.y) *  window.canvas_size.scale;

    return  window.vec(px, py);
  }

  function getCanvasSize() {
    return  window.canvas_size;
  }

  return {
    scale_canvas,
    local_mouse,
    getCanvasSize,
    scaleFactor: () =>  window.canvas_size.scale,
  };
}
export const scaler = makeScaler();
