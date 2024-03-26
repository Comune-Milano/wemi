import React from "react";
import { Row, Column } from "components/ui/Grid";
import Input from "components/ui2/Input";

const Inputs = ({ leggiTesto, parolaChiave }) => (
    <Row fluid>
        <Column xs="12" />
        <Column sm={12} xs={12}>
            <Input
                material
                inputValue={parolaChiave.username}
                label="Username"
                placeholder="Inserisci il tuo username"
                onChange={(value) => leggiTesto("username", value)}
                required
            />
        </Column>
        <Column sm={12} xs={12}>
            <Input
                type="Password"
                material
                label="Password"
                inputValue={parolaChiave.password}
                placeholder="Inserisci la tua password"
                onChange={(value) => leggiTesto("password", value)}
                required
            />
        </Column>

    </Row>
)
export default Inputs;