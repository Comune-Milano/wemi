import React from "react";
import LoginModalJson from "./LoginModalJson";
import { Row, Column } from "components/ui/Grid";
import Text from "components/ui/Text";

const Links = () => (
    <Row
        fluid
        justifycontent="center"
        alignContent="center"
        alignitems="center"
        display="flex"

    >
        <Column lg={12} md={12} padding="1em 0">
            <Text value={LoginModalJson.link} intlFormatter tag="p" align="center" />
            <Text value={LoginModalJson.link1} intlFormatter tag="p" align="center" />
        </Column>
    </Row>
)
export default Links;