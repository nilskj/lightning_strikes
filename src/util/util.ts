/**
 * normalize a vector
 * @param v
 * @returns {{x: number, y: number, z: number}}
 */
export function normalizeVec(v = window.vec(0, 0)) {
  const length = v.length();
  if (length <= 0) return window.vec();
  return window.vec(v.x / length, v.y / length);
}
