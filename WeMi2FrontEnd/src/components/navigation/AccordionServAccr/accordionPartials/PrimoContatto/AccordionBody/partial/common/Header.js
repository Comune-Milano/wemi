import React from 'react'

import SubTitle from 'components/ui/SubTitle'
import Tooltip from "components/ui/Tooltip";
import FaIcon from 'components/ui/FaIcon'

const Header = ({sottotitolo, tooltip}) =>{
    return(
        <>
            {
                sottotitolo?<SubTitle   
                    title={sottotitolo}
                ></SubTitle>:null
            }
            {
                tooltip?
                <Tooltip
                  textTT={tooltip}
                  right
                  noShadow
                  color="white"
                  width="12em"
                  padding="1em 0"
                  fontSize="f8"
                  alignitems="center"
                  bgcolor="blue">
                  <FaIcon
                    radius="50%"
                    icon="\f128"
                    bgcolor="blue"
                    color="white"
                    fontSize="f9"
                    height="2em"
                    width="2em"
                  />
                </Tooltip>
                :null
            }
        </>
    )
}

export default Header