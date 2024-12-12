export const points = {
  N: [80, 40],
  M: [132, 95],
  L: [154, 157],
  J: [107, 176],
  K: [135, 218],
  I: [95, 219],
  O: [299, 264],
  H: [86, 274],
  T: [296, 333],
  G: [94, 390],
  F: [143, 400],
  Q: [291, 426],
  V: [205, 434],
  R: [294, 472],
  Z: [111, 533],
  X: [293, 584],
  E: [92, 596],
  U: [142, 622],
  C: [109, 704],
  Y: [394, 713],
  B: [243, 758],
  A: [340, 750],
};

export const resizingX = (x) => {
  const data = Number(x);

  console.log(data * 2.3846 + 172);
  return data * 2.3846 + 172;
};

export const resizingY = (y) => {
  const data = Number(y);
  return data * -3.6385 + 583;
};

const angles = [90, 45, 0, 315, 270, 225, 180, 135];

export const resizingAngle = (angle) => {
  console.log(angles[Number(angle) - 1]);
  return angles[Number(angle) - 1];
};
