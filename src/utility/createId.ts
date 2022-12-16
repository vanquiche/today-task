export default function createId() {
  let id = "";
  // unicode char range
  const max = 122;
  const min = 97;
  for (let i = 0; i < 9; i++) {
    // if interation is even
    if (i % 2 === 0) {
      id += String.fromCharCode(Math.random() * (max - min) + min);
    } else {
      id += Math.floor(Math.random() * 10);
    }
  }
  return id;
}
