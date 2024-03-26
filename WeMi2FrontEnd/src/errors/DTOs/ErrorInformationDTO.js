
export class ErrorInformationDTO {
  /**
   * The identifier of the error.
   */
  identifier;

  /**
   * The message to be presented to the user.
   */
  message = '';

  /**
   * The title of the message. It must be considered a
   * brief description of the error.
   */
  title = '';

  /**
   * A more detailed messaged used for debugging.
   */
  debugMessage = '';

  /**
   * The stacktrace of the error.
   */
  stacktrace = 'No stack trace available.';

  /**
   * Parameters of the error message or title.
   */
  interpolations = { };

  /**
   * Indicates that an error is blocking.
   */
  fatal = false;

  /**
   * Indicates that an error has to be thrown to the ui
   */
  preventDefaultManagement = false;

  /**
   * the button text
   */
  buttonText = '';

  /**
   * Indicates the visibility of send report link
   */
  showSendReport = true;
}
