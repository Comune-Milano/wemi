/** @format */

import React, {Component} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { colors } from 'theme';

class Scrollbar extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  scrollToBottom = () => {
    if(this.props.scrollBottom)
    this.myRef.current.scrollToBottom();
  }
  
  componentDidMount() {
    if(this.props.scrollBottom)
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    if(this.props.scrollBottom)
    this.scrollToBottom();
  }

render() {

  return (
  <Scrollbars
  ref={this.myRef}
  
    renderTrackVertical={({ style, ...props }) => (
      <div
        {...props}
        style={{
          ...style,
          backgroundColor: colors.grey,
          width: '5px',
          right: '2.5px',
          height: '100%',
          borderRadius: '15px',
        }}
      />
    )}
    renderTrackHorizontal={({ style, ...props }) => (
      <div {...props} style={{ ...style, display: 'none' }} />
    )}
    renderThumbVertical={({ style, ...props }) => (
      <div
        {...props}
        style={{ ...style, backgroundColor: this.props.e ? colors.blue : colors.primary, width: '5px', borderRadius: '15px' }}
      />
    )}
    renderView={({ style, props }) => (
      <div
        {...props}
        style={{ ...style, marginBottom: '-16px', paddingBottom: '16px', marginRight: '-21px', overflowX: 'hidden' }}
      />
    )}
    autoHideTimeout={250}
    {...this.props}
  />
  )
    }
  }
Scrollbar.displayName = 'Scrollbar';
export default Scrollbar;
