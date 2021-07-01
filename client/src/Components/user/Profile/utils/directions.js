/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
/* eslint-disable no-undef */
import axios from 'axios';

export function getStates() {
  const states = [];
  axios.get('https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=departamento',
    { data: { $limit: 5000, $$app_token: 'f44im5lls147xsi9og61tih5i' } })
    .then((res) => res.data.map((d) => (!states.includes(d.departamento) ? states.push(d.departamento) : null)));
  return states.sort();
}
