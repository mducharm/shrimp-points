import React, { FC, useState } from "react";
import ExchangeRates from "../components/ExchangeRates";
import Main from "../layouts/Main";

const About: FC = () => (
  <Main>
    <p>About</p>
    <ExchangeRates></ExchangeRates>
  </Main>
);

export default About;
