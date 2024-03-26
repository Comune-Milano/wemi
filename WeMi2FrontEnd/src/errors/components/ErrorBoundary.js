
import { NAV_HEIGHT_CHANGE_EV } from 'components/navigation/Navbar/constants';
import AnchorLink from 'components/ui/AnchorLink';
import Text from 'components/ui/Text';
import { withEventBus } from 'hoc/withEventBus';
import { withHttpClient } from 'hoc/withHttpClient';
import React from 'react';
import styled from 'styled-components';
import media from 'utils/media-queries';

const StyledErrorFallbackWrapper = styled.div`
  margin: auto;
  text-align: center;
  padding: 3em;

  ${media.xs`
    padding-top: ${({ navbarHeight }) => `${navbarHeight + 20}px` || 0};
  `}

  ${media.md`
    padding-top: ${({ navbarHeight }) => `${navbarHeight}px` || 0};
  `}

  h1 {
    margin-bottom: 0.8rem;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      navbarHeight: undefined,
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidMount() {
    const { eventBus } = this.props;
    this.navHeightChangeUnsubscribe = eventBus.subscribe(
      NAV_HEIGHT_CHANGE_EV,
      this.handleNavHeightChange.bind(this) 
    );
  }

  componentWillUnmount() {
    if (this.navHeightChangeUnsubscribe) {
      this.navHeightChangeUnsubscribe();
    }
  }

  componentDidCatch(error, errorInfo) {
    const { httpClient: { performHttpRequest } } = this.props;

    const {
      message = 'None',
      name = 'Untyped',
      stack = 'Not available',
    } = error;

    const stringifiedErrorInfo = JSON.stringify(errorInfo);

    const descriptionEntries = [
      `Error-Message: ${message}`,
      `Error-Name: ${name}`,
      `Error-Stack: ${stack}`,
      `Error-Info: ${stringifiedErrorInfo}`,
    ];

    performHttpRequest('errorlog', {
      body: JSON.stringify({
        description: descriptionEntries.join(' --- '),
      }),
    })
      .catch(error => console.log('A problem occurred while sending the error to the backend.', error));
  }

  handleNavHeightChange(height) {
    this.setState({ navbarHeight: height });
  }

  render() {
    const { navbarHeight, hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <StyledErrorFallbackWrapper navbarHeight={navbarHeight}>
          <h1>Qualcosa è andato storto :(</h1>
          <h4>Si è verificato un errore inatteso. Puoi segnalarci il problema inviando un email all'indirizzo di seguito. </h4>
          <AnchorLink
            to="mailto:"
            align="center"
          >
            <Text
              tag="p"
              size="f7"
              align="center"
              color="primary"
              weight="bold"
              decoration="underline"
              value=""
            />
          </AnchorLink>
        </StyledErrorFallbackWrapper>
      );
    }

    return children;
  }
}

ErrorBoundary.displayName = 'GlobalErrorBoundary';

export default withHttpClient(
  withEventBus(ErrorBoundary)
);
