import { IError, IProduct } from '../interfaces';

/**
 * Validates a product object for required fields and constraints.
 *
 * @param {Object} formInput - The formInput to be validated.
 * @param {string} title - The title of the formInput.
 * @param {string} description - The description of the formInput.
 * @param {string} imageURL - The URL of the formInput's image.
 * @param {string} price - The price of the formInput.
 *
 * @returns {Object} - An object containing error messages for invalid fields.
 * @property {string} title - Error message for the title field.
 * @property {string} description - Error message for the description field.
 * @property {string} imageURL - Error message for the imageURL field.
 * @property {string} price - Error message for the price field.
 */

export const errorValidation = (formInput: IProduct) => {
  const { title, description, imageURL, price, colors } = formInput;

  const error: IError = {
    title: '',
    description: '',
    imageURL: '',
    price: '',
    color: '',
  };

  const isImageURL = /^(ftp|http|https):\/\/[^ "]+$/.test(imageURL);
  if (!title.trim() || title.length < 10 || title.length > 80) {
    error.title = 'Product title must be between 10 and 80 characters!';
  }
  if (!description.trim() || description.length < 10 || description.length > 900) error.description = 'Product description must be between 10 and 900 characters!';
  if (!isImageURL) error.imageURL = 'Valid image URL is required';
  if (!price.trim() || isNaN(Number(price))) error.price = 'Valid price is required!';

  if (!colors.length) {
    error.color = 'color is required!';
  }

  return error;
};
