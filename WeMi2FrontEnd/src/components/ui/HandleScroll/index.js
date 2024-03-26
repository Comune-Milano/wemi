/** @format */

import {useState, useEffect} from 'react';

export const HandleScrollDown = () => {
    let bodyOffset = document.body.getBoundingClientRect();
    let scrollY = bodyOffset.top;
    const [scrollDown, setScrollDown] = useState(0);

    const handleScroll = () => {
        bodyOffset = document.body.getBoundingClientRect();
        let prevScrollY = scrollY;
        scrollY = -bodyOffset.top
        //Scrolling bottom
        if(scrollY - prevScrollY > 0) {
          setScrollDown(2);
          prevScrollY = scrollY 
        }
        //Scrolling top
        if(scrollY - prevScrollY < 0) {
          setScrollDown(1);
          prevScrollY = scrollY
        }
           //Almost bottom
        // let diff = parseInt(document.body.offsetHeight) - parseInt(window.outerHeight) - parseInt(scrollY)
        // if(diff < 50) {
        //   setScrollDown(0);
        //   prevScrollY = scrollY
        // }
        //At Top
        if(scrollY === 0) {
          setScrollDown(0);
          prevScrollY = scrollY
        }
    
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {window.removeEventListener('scroll', handleScroll)}
      }, []);

    return scrollDown
  };



export const ScrollToBottom = ({node}) => {

  let bodyOffset = node.getBoundingClientRect();
  node.scrollTo(0, bodyOffset.height)
}