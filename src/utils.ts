
export const getQueryString = (url, field) => {
  var href = url ? url : window.location.href;
  var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
  var string = reg.exec(href);
  return string ? string[1] : null;
}

const escapeChars = { lt: '<', gt: '>', quot: '"', apos: "'", amp: '&' };
export const unescapeHTML = (str) => {
  return str.replace(/\&([^;]+);/g, (entity, entityCode) => {
    var match;
    
    if ( entityCode in escapeChars) {
      return escapeChars[entityCode];
    } else if ( match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
      return String.fromCharCode(parseInt(match[1], 16));
    } else if ( match = entityCode.match(/^#(\d+)$/)) {
      return String.fromCharCode(~~match[1]);
    } else {
      return entity;
    }
  });
}

export const handleError = (msg: string) => {
  console.error(msg);
}