/**
 * Truncates a given text if its length exceeds a specified maximum length,
 * appending ellipsis ("...") to indicate truncation.
 *
 * @param {string} txt - The input text to be processed.
 * @param {number} [max=50] - The maximum length allowed for the output text.
 *                            If not provided, it defaults to 50.
 * @returns {string} The processed text:
 *                   - If the length of the input text is greater than the specified maximum,
 *                     a truncated version with ellipsis is returned.
 *                   - If the length is within the limit, the original text is returned unmodified.
 *
 * @example
 * const originalText = "This is a sample text for demonstration purposes.";
 * const truncatedText = txtSlicer(originalText, 20);
 * console.log(truncatedText);
 * // Output: "This is a sample te..."
 *
 * const shortText = txtSlicer("Short text");
 * console.log(shortText);
 * // Output: "Short text"
 */
export function txtSlicer(txt: string, max: number = 50) {
  if (txt.length > max) {
    return `${txt.slice(0, max)} ...`;
  } else {
    return txt;
  }
}
