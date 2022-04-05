export function patternGenerator(size) {
  const pattern = {};
  const alreadyuse = [];
  const resolve = [];

  for (let i = 0; i < size * size; i++) {
    pattern[i] = true;
    alreadyuse.push(i);
  }

  const randomroll = getRandomIntInclusive(size, size * size);

  for (let j = 0; j < randomroll; j++) {
    const numbertochange = getRandomIntInclusive(0, alreadyuse.length - 1);

    resolve.push(alreadyuse[numbertochange]);

    const cells = cellAround(alreadyuse[numbertochange], size);
    alreadyuse.splice(numbertochange, 1);

    cells.forEach((cell) => {
      pattern[cell] = !pattern[cell];
    });
  }
  const subcolor = "hsl(" + Math.random() * 360 + ", 100%, 75%)";

  return [pattern, resolve, subcolor];
}

const cellAround = (cell, gamesize) => {
  const result = [cell];
  const row = getRow(cell, gamesize);
  if (cell - gamesize >= 0) {
    result.push(cell - gamesize);
  }
  if (cell + gamesize < gamesize * gamesize) {
    result.push(cell + gamesize);
  }
  if (cell - 1 >= row * gamesize) {
    result.push(cell - 1);
  }
  if (cell + 1 <= gamesize * (1 + row) - 1) {
    result.push(cell + 1);
  }
  return result;
};

const getRow = (cell, gamesize) => {
  return Math.floor(cell / gamesize);
};

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
