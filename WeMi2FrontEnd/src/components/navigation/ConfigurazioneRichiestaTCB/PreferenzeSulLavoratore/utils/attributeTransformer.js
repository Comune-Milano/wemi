
/**
 * Maps a boolean attribute (coming from the backend) to a local value.
 * @param {*} attribute
 */
export const booleanAttributeTransformer = attribute => !!attribute && attribute.fg_val === '1';

/**
 * Maps a text attribute (coming from the backend) to a local value.
 * @param {*} attribute
 */
export const textAttributeTransformer = attribute => attribute ? attribute.tx_val : '';

/**
 * Maps a numeric attribute (coming from the backend) to a local value.
 * @param {*} attribute
 */
export const numericAttributeTransformer = attribute => attribute ? attribute.nr_val : 0;

/**
 * Maps a numeric attribute (coming from the backend) to a local value.
 * @param {*} attribute
 */
export const noteAttributeTransformer = attribute => attribute ? attribute.tx_nota : '';

/**
 * Maps a multi-select attribute (coming from the backend) to a local interface.
 * @param {*} attribute
 * @param {*} primitiveTransformer
 */
export const multiSelectAttributeTransfomer = (attribute, primitiveTransformer = textAttributeTransformer) =>
  Array.isArray(attribute) ?
    attribute.map(element => ({
      id: element.cd_val_attributo,
      value: primitiveTransformer(element),
    })) :
    [];

/**
 * Maps a select attribute (coming from the backend) to a local interface.
 * @param {*} attribute
 * @param {*} primitiveTransformer
 */
export const selectAttributeTransformer = (attribute, primitiveTransformer = textAttributeTransformer) =>
  attribute && {
    id: attribute.cd_val_attributo,
    value: primitiveTransformer(attribute),
  };
