// Page settings
// These values are passed to the layout to control what appears on the page.
import markets from '$lib/data/markets.json';

export function load() {
  return {
    showHeader: true,
    showFooter: true,
    markets,
  };
}
