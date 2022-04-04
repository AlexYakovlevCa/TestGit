function makeId(length = 6) {
    var txt = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
  }
  
  function convertTime(dateNow) {
    var today = dateNow;
    return `${today.getHours()} :${today.getMinutes()}:${today.getSeconds()}\n${today.getFullYear()} /${
      today.getMonth() + 1
    }/${today.getDate()}`;
  }