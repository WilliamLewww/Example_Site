var keyList = [];

function onKeyDown(key) {
  if (keyList.indexOf(key.keyCode) == -1) {
    keyList.push(key.keyCode);
  }

  //keyList.forEach(function (item, index, array) { console.log(item, index); });
}

function onKeyUp(key) {
  if (keyList.indexOf(key.keyCode) != -1) {
    keyList.splice(keyList.indexOf(key.keyCode), 1);
  }
}
