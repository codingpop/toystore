/**
 * Excludes specified properties from an object
 *
 * @param {Object} object - Object with properties to be removed
 * @param {array} properties - Array of properties to be removed
 *
 * @returns {Object} tempObj
 */
export default (object, properties) => {
  const tempObj = { ...object };

  properties.forEach((property) => {
    delete tempObj[property];
  });

  return tempObj;
};
