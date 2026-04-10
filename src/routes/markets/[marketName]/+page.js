import markets from '$lib/data/markets.json';

export function load({ params }) {
  const market = markets.find(m => m.marketName === params.marketName);
  return { market };
}

export function entries() {
  return markets.map(m => ({ marketName: m.marketName }));
}