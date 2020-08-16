const replaceSpecialChars = (str) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([^\w]+|\s+)/g, '-')
    .replace(/\-\-+/g, '-')
    .replace(/(^-+|-+$)/, '');

const hexToRgb = (hex) =>
  hex &&
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => '#' + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));

const getYear = (date) => date.replace(/[0-9]{2}\/[0-9]{2}\/([0-9]{4})/g, '$1');

export { replaceSpecialChars, hexToRgb, getYear };
