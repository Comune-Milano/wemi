
/**
 * Extracts the global style from the provided source document.
 * It provides as output a document fragment embedding
 * the whole style.
 * Why a document fragment? Because it can be directly
 * appended to a html node.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment).
 * @param {*} sourceDocument
 */
export function getGlobalStyle(sourceDocument) {
  return Array.from(sourceDocument.styleSheets)
    .reduce(
      (docFragment, styleSheet) => {
        // For <style> elements
        if (styleSheet.href) {
          // for <link> elements loading CSS from a URL
          const newLinkEl = sourceDocument.createElement('link');

          newLinkEl.rel = 'stylesheet';
          newLinkEl.href = styleSheet.href;

          docFragment.appendChild(newLinkEl);
        } else if (styleSheet.cssRules) {
          const newStyleEl = sourceDocument.createElement('style');

          // Write the text of each rule into the body of the style element
          Array.from(styleSheet.cssRules).forEach(cssRule => {
            const { cssText, type } = cssRule;

            let returnText = cssText;
            // Check if the cssRule type is CSSImportRule (3) or CSSFontFaceRule (5)
            // to handle local imports on a about:blank page
            // ('/custom.css' turns to 'http://wemi.com/custom.css')
            if ([3, 5].includes(type)) {
              returnText = cssText
                .split('url(')
                .map(line => {
                  if (line[1] === '/') {
                    return `${line.slice(0, 1)}${
                      window.location.origin
                    }${line.slice(1)}`;
                  }
                  return line;
                })
                .join('url(');
            }
            newStyleEl.appendChild(sourceDocument.createTextNode(returnText));
          });

          docFragment.appendChild(newStyleEl);
        }

        return docFragment;
      },
      sourceDocument.createDocumentFragment()
    );
}
