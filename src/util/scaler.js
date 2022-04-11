function makeScaler() {
  function scale_canvas(screen) {
    canvas.style.width = "unset";
    canvas.style.height = "unset";
    canvas.style.top = "unset";
    canvas.style.left = "unset";

    canvas_size.width = screen.x;
    canvas_size.height = screen.y;

    canvas.width = screen.x;
    canvas.height = screen.y;

    let squids_scaler = new Thing();
    squids_scaler.listen("tick", function () {
      let originalWidth = canvas_size.width;
      let originalHeight = canvas_size.height;

      let options = {
        container: new AS.Size(window.innerWidth, window.innerHeight),
        target: new AS.Size(originalWidth, originalHeight),
        policy: AS.POLICY.ShowAll,
      };

      let rect = AS.getScaledRect(options);

      canvas_size.x = rect.x;
      canvas_size.y = rect.y;
      canvas_size.width = rect.width;
      canvas_size.height = rect.height;

      canvas_size.scale = screen.x / rect.width;

      canvas.style.width = canvas_size.width + "px";
      canvas.style.height = canvas_size.height + "px";

      canvas.style.top = canvas_size.y + "px";
      canvas.style.left = canvas_size.x + "px";
    });

    squids_scaler.listen("mousemove", function (mx, my, event) {
      mouse = local_mouse(event.clientX, event.clientY);
    });
  }

  function local_mouse(mx, my) {
    let px = (mx - canvas_size.x) * canvas_size.scale;
    let py = (my - canvas_size.y) * canvas_size.scale;

    return vec(px, py);
  }

  function getCanvasSize() {
    return canvas_size;
  }

  return {
    scale_canvas,
    local_mouse,
    getCanvasSize,
  };
}
export const scaler = makeScaler();
