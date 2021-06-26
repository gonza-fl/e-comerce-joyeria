/* eslint-disable import/prefer-default-export */
/* eslint-disable nonblock-statement-body-position */
export const cataloguePag = (catalogue, pag) => {
  if (catalogue.length < 7) { return catalogue; }

  return catalogue.slice((pag * 6) - 6, pag * 6);
};

export const getPageFromURL = () => {
  const query = window.location.search;

  if (!query.includes('pag')) return '1';

  if (query.includes('search')) { return query.split('=')[2]; }

  return query.split('=')[1];
};
