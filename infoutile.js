useEffect(() => {
    const newchange = [
      [row, row - 1, row, row, row + 1],
      [col, col, col - 1, col + 1, col],
    ];
    updateGame(dataFilter(newchange));
  }, [update]);

  const getGameData = () => {
    return gamedata.current;
  };

  const dataFromRow = (cell_data) => {
    setRow(cell_data.row);
    setCol(cell_data.col);
    forceUpdate();
  };

  const notBetween1And5 = (item1, item2) => {
    return item1 < 1 || item1 > 5 || item2 < 1 || item2 > 5;
  };

  const removeElements = (data, keys) => {
    keys.reverse().forEach((i) => {
      data[0].splice(i, 1);
      data[1].splice(i, 1);
    });
    return data;
  };

  const dataFilter = (data) => {
    const keys = [];

    data[0].forEach((item, key) => {
      if (notBetween1And5(item, data[1][key])) {
        keys.push(key);
      }
    });

    return removeElements(data, keys);
  };