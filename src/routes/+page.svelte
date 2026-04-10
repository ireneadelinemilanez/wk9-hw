<script>
  import { base } from '$app/paths';
  let { data } = $props();

  console.log(`Loaded ${data.markets.length} markets`);
  console.log("First record:", data.markets[0]);

  import DatabaseHeader from '$lib/components/DatabaseHeader.svelte';
  import AlphabeticalList from '$lib/components/AlphabeticalList.svelte';
  import AlphabeticalCard from '$lib/components/AlphabeticalCard.svelte';
  import SearchInput from '$lib/components/SearchInput.svelte';
  import MethodologyBox from '$lib/components/MethodologyBox.svelte';


  let searchQuery = $state('');

  let top20 = data.markets
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 20);

  let alphabeticalMarkets = $derived(
    data.markets
      .map((market, index) => ({ market, index }))
      .filter(({ market }) =>
        searchQuery === '' ||
        market.daysOfOperation
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => a.market.marketName.localeCompare(b.market.marketName))
  );
</script>

<DatabaseHeader
  kicker="Data Explorer"
  headline="Find a Farmer's Market"
  description="Look for an open farmer's market in Brooklyn"
  byline="By Irene Adeline Milanez"
  date="April 10, 2026"
  >

   <SearchInput
    bind:value={searchQuery}
    placeholder="What day is it today? (e.g., Saturday, Sunday, Wednesday)..."
  />
</DatabaseHeader>

<div class="container">


  <AlphabeticalList title="Farmer's Markets">
  {#each alphabeticalMarkets as { market, index } (market.marketName)}
    <AlphabeticalCard
      title={market.marketName}
      description={`${market.daysOfOperation}`}
      href="{base}/markets/{encodeURIComponent(market.marketName)}"
    />
  {/each}
</AlphabeticalList>

<MethodologyBox>
    <p>
      The data on this page comes from the Department of Health and Mental Hygiene
      <a href="https://data.cityofnewyork.us/Health/NYC-Farmers-Markets/8vwk-6iz2/about_data" target="_blank">via New York City's open data portal</a>.
    </p>
    <p>
      The farmer's markets listed by the city were filtered to include only Brooklyn markets updated in 2025. The data is current as of February 2026.
    </p>
    <p>The code that executed the analysis is available as open source on GitHub <a href="https://github.com/ireneadelinemilanez/wk9-hw">here</a>.</p>
  </MethodologyBox>

</div>

<style>
  .container {
    max-width: var(--max-width-wide);
    margin: 0 auto;
  }
</style>