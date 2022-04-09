/**
 * normalize a vector
 * @param v
 * @returns {{x: number, y: number, z: number}}
 */
export function n(v = vec(0, 0)) {
  const length = v.length();
  if (length <= 0) return vec();
  return vec(v.x / length, v.y / length);
}
