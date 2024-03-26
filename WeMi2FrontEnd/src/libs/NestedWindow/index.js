
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { colors } from 'theme';
import { getGlobalStyle } from 'utils/functions/getGlobalStyle';
import { keyCodes } from 'components/ui2/utils/constants/keyCodes';

function getCenteredPosition(targetWidth, targetHeight) {
  const screenLeft = Number.isFinite(window.screenLeft) ?
    window.screenLeft :
    window.screen.left;
  const screenTop = Number.isFinite(window.screenTop) ?
    window.screenTop :
    window.screen.top;

  const { screen: {
    width: screenWidth,
    height: screenHeight,
  } } = window;

  const left = screenWidth / 2 - targetWidth / 2 + screenLeft;
  const top = screenHeight / 2 - targetHeight / 2 + screenTop;

  return { left, top };
}

/**
 * Opens a window nested in the client.
 */
class NewWindow extends React.PureComponent {
  /**
   * NewWindow default props.
   */
  static defaultProps = {
    addressBarColor: colors.heavyMetal,
    url: '',
    name: '',
    title: '',
    onUnload: undefined,
    onEscape: undefined,
    skipGlobalStyle: false,
  }

  /**
   * The NestedWindow function constructor.
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.container = document.createElement('div');
    this.container.style = 'height: 100%';

    this.window = null;
    this.released = false;
    this.globalStyle = undefined;
    this.state = {
      mounted: false,
    };
  }

  /**
   * Creates the window once the component is mounted.
   */
  componentDidMount() {
    this.createWindow();
    this.setState({ mounted: true });
  }

  /**
   * Close the opened window (if any) when the component
   * will unmount.
   */
  componentWillUnmount() {
    this.release();
  }

  /**
   * Handles the keydown event.
   * @param {*} event
   */
  onKeyDownHandler = event => {
    const { onEscape } = this.props;

    if (event.keyCode !== keyCodes.ESC || !onEscape) {
      return;
    }
    onEscape();
  };

  /**
   * Closes the window and releases its resources.
   */
  release = () => {
    if (!this.window) {
      return;
    }
    this.window.removeEventListener('keydown', this.onKeyDownHandler);
    this.window.close();
  }

  /**
   * Creates the new window.
   */
  createWindow() {
    const {
      url,
      title,
      name,
      width,
      height,
      onUnload,
      addressBarColor,
    } = this.props;

    const centeredPosition = getCenteredPosition(width, height);
    const options = [
      `width=${width}`,
      `height=${height}`,
      `top=${centeredPosition.top}`,
      `left=${centeredPosition.left}`,
      'menubar=no',
      'toolbar=no',
      'location=no',
    ];

    // Open a new window.
    this.window = window.open(url, name, options.join(','));

    // Check if the new window was succesfully opened.
    if (!this.window) {
      return;
    }

    // Appends to the body the container of the newly created window
    // and sets its title.
    this.window.document.title = title;
    this.window.document.body.appendChild(this.container);

    // Changes address bar color (for mobile).
    const themeColorMeta = document.createElement('meta');
    themeColorMeta.name = 'theme-color';
    themeColorMeta.content = addressBarColor;
    this.window.document.head.appendChild(themeColorMeta);

    // Changes address bar color (for mobile).
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1';
    this.window.document.head.appendChild(viewportMeta);

    // Registers an handler for the keydown event.
    this.window.addEventListener('keydown', this.onKeyDownHandler);
    // Release the nested window when before the main one is unmounted.
    window.addEventListener('beforeunload', this.release);

    // Registers unload callback, if any.
    if (onUnload) {
      this.window.addEventListener('beforeunload', onUnload);
    }
  }

  /**
   * Render the NewWindow component.
   */
  render() {
    const { mounted } = this.state;
    if (!mounted) {
      return null;
    }

    const { children, skipGlobalStyle } = this.props;

    // FIXME: This is actually an hack. Whenever the global
    // style changes we need to update the global style of
    // the nested window too.
    // In other words we need to listen to style dom changes
    // and update the style of nested window accordingly :)
    if (!skipGlobalStyle) {
      setTimeout(
        () => {
          const nestedGlobalStyleSheets = Array.from(this.window.document.styleSheets);
          const parentGlobalStyle = getGlobalStyle(document);
          // First the new global style is appended.
          this.window.document.head.appendChild(parentGlobalStyle);
          // Then a clean up work is performed removing the
          // previous styling.
          nestedGlobalStyleSheets.forEach(styleSheet => styleSheet.ownerNode.remove());
        },
        0
      );
    }

    return ReactDOM.createPortal(children, this.container);
  }
}

// Display name.
NewWindow.displayName = 'NewWindow';

// PropTypes.
NewWindow.propTypes = {
  addressBarColor: PropTypes.string,
  children: PropTypes.node,
  name: PropTypes.string,
  onEscape: PropTypes.func,
  onUnload: PropTypes.func,
  skipGlobalStyle: PropTypes.bool,
  title: PropTypes.string,
  url: PropTypes.string,
};

export default NewWindow;