import React from "react";
import { Redirect } from "react-router-dom";
import { PAGE_HOME_URL } from "types/url";

const RedirectAdmin = () => (
    <Redirect to={PAGE_HOME_URL}/>
);

export default RedirectAdmin;