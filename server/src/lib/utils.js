export default {

  // used to normalize port and cut out any errors from random types
  normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  },

  // remove duplicate strings from array  
  uniqFast(a) {
    let seen = {};
    let out = [];
    let len = a.length;
    let j = 0;
    for (let i = 0; i < len; i++) {
      let item = a[i];
      if(seen[item] !== 1) {
        seen[item] = 1;
        out[j++] = item;
      }
    }
    return out;
  },

  filterNestObject(item, keysToRemove) {
    if (Object(item) !== item)
      return item;
    else if (Array.isArray(item))
      return item.map(o => filterNestObject(o));

    return Object.keys(item)
      .filter(key => !keysToRemove.includes(key))
      .reduce((object, key) => {
        return {
          ...object,
          [key]: Object(item[key]) === item[key] ? filterNestObject(item[key]) : item[key]
        };
      }, {})
  }
}
