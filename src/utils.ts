
export const getQueryString = (url, field) => {
  let href = url ? url : window.location.href;
  let reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
  let s = reg.exec(href);
  return s ? s[1] : null;
};

const escapeChars = { lt: '<', gt: '>', quot: '"', apos: '\'', amp: '&' };
export const unescapeHTML = (str) => {
  return str.replace(/\&([^;]+);/g, (entity, entityCode) => {
    let match;

    if (entityCode in escapeChars) {
      return escapeChars[entityCode];
    // tslint:disable-next-line:no-conditional-assignment
    } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
      return String.fromCharCode(parseInt(match[1], 16));
    // tslint:disable-next-line:no-conditional-assignment
    } else if (match = entityCode.match(/^#(\d+)$/)) {
      return String.fromCharCode(~~match[1]);
    } else {
      return entity;
    }
  });
};

export const handleError = (msg: string) => {
  console.error(msg);
};
