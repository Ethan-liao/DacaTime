import React from 'react';
import { stateList, countryList } from '../../util/placeLists';

// this is NOT state as in React state. It's a list of states
export const state = stateList.map((state, idx) =>
  <option key={idx}>
    {state}
  </option>,
);

export const country = countryList.map((country, idx) =>
  <option key={idx}>
    {country}
  </option>,
);
