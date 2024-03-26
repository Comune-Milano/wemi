/** @format */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import printLogo1 from 'images2/print-logo/print-logo-1.png';
import printLogo2 from 'images2/print-logo/print-logo-2.png';
import printLogo3 from 'images2/print-logo/print-logo-3.png';
import printLogo4 from 'images2/print-logo/print-logo-4.png';
import printLogo5 from 'images2/print-logo/print-logo-5.png';
import printLogo6 from 'images2/print-logo/print-logo-6.png';
import printLogo7 from 'images2/print-logo/print-logo-7.png';
import printLogo8 from 'images2/print-logo/print-logo-8.png';
import moment from 'moment';
import { colors, fonts } from 'theme';

const logos = [
  printLogo1,
  printLogo2,
  printLogo3,
  printLogo4,
  printLogo5,
  printLogo6,
  printLogo7,
  printLogo8,
];

export function generateRandomLogoSrc() {
  const logoIndex = Math.round(Math.random() * (logos.length - 1));
  return logos[logoIndex];
}

const PrintWrapper = styled.div`
  .onlyPrint {
    display: none;
  }
  @media print {
    z-index: 9500;
    overflow: visible !important;
    display: block;
    box-sizing: border-box;
    height: auto;
    width: 100%;
    position: absolute !important;
    top: 0;
    left: 0;
    background-color: ${colors.white}

    padding: 0;

    visibility: visible !important;
    * {
      visibility: visible !important;
      position: unset;
      z-index: unset;
    }
    .noPrint {
      display: none;
    }
    .noPrintVisible {
      visibility: hidden !important;
    }
    .onlyPrint {
      display: block;
    }
  }
`;

const PrintIntro = styled.ul`
  display: none;
  box-sizing: border-box;
  margin-bottom: 2em;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;

  @media print {
    display: flex;
  }

  ul li {
    text-align: right;
  }
`;

const PrintLogo = styled.img`
  height: 7em;
  box-sizing: border-box;
`;

const PrintHeader = styled.h1`
  display: none;
  
  font-size: ${fonts.size.f5};
  color: ${colors.black};
  text-align: center;
  margin-bottom: 2em;
  width: 100%;
  line-height: 1.05;
  box-sizing: border-box;

  @media print {
    display: block;
  }
`;

const PrintArea = ({
  title,
  hideLogo,
  userProfile,
  logoSrc = logos[0],
  ...props
}) => {
  const { datiLogin } = userProfile || {};
  const nomeUtente = datiLogin?.Nome;

  const todayDate = moment().format('DD/MM/YYYY');

  useEffect(() => {
    document.body.className = `${document.body.className} toPrint`;

    return () => {
      document.body.className = document.body.className.replace(' toPrint', '');
    };
  }, []);

  return (
    <PrintWrapper>
      {!hideLogo &&
        (
          <PrintIntro>
            <PrintLogo alt="Logo WeMi" src={logoSrc} />
            <ul>
              <li>
                {todayDate}
                {' '}
                |
                {' '}
                {nomeUtente && (
                <span>
                  WeMi per
                  {nomeUtente}
                </span>
)}
              </li>
              <li>020202</li>
              <li></li>
            </ul>
          </PrintIntro>
        )
      }
      { title ?
          (
            <PrintHeader>
              {title}
            </PrintHeader>
          )
          : null
      }
      {props.children}
    </PrintWrapper>
  );
};

PrintArea.displayName = 'PrintArea';

export default PrintArea;
