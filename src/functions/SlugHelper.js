var slugify = require("slugify");
const slug = text => {
  return slugify(text, {
    replacement: "-",
    remove: undefined,
    lower: true,
    strict: true
  });
};

const functions = {
  slug
};
module.exports = functions;
