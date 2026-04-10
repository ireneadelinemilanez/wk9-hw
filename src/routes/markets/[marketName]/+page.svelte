<script>
  import { base } from '$app/paths';
  import DatabaseHeader from '$lib/components/DatabaseHeader.svelte';
  import MethodologyBox from '$lib/components/MethodologyBox.svelte';
  import LocatorMap from '$lib/components/LocatorMap.svelte';
  import RelatedLinks from '$lib/components/RelatedLinks.svelte';


  let { data } = $props();
  let market = data.market;
</script>

{#if market}
  <DatabaseHeader
    kicker="Find an Open Farmer's Market"
    headline={market.marketName}
  >
    {#snippet graphic()}
      <LocatorMap
        longitude={market.Longitude}
        latitude={market.Latitude}
        zoom={13}
        dot={true}
        width={200}
        credit=" "
      />
    {/snippet}

    <a class="back" href="{base}/">
      ← Back to ranking
    </a>
  </DatabaseHeader>

  <div class="container">

    <div class="market-details">
      <div class="detail-section">
        <h2>Location</h2>
        <p class="detail-row">
          <span class="label">Address:</span>
          <span>{market.streetAddress}</span>
        </p>
      </div>

      <div class="detail-section">
        <h2>Hours & Operations</h2>
        <p class="detail-row">
          <span class="label">Days of Operation:</span>
          <span>{market.daysOfOperation}</span>
        </p>
        <p class="detail-row">
          <span class="label">Hours:</span>
          <span>{market.hoursOfOperations}</span>
        </p>
        <p class="detail-row">
          <span class="label">Open Year-Round:</span>
          <span>{market.openYearRound}</span>
        </p>
      </div>

      <div class="detail-section">
        <h2>Payments</h2>
        <p class="detail-row">
          <span class="label">Accepts EBT:</span>
          <span class="ebt-status" class:yes={market.acceptsEBT === 'Yes'}>
            {market.acceptsEBT}
          </span>
        </p>
      </div>
    </div>

    <RelatedLinks
  title="Additonal Resources"
  links={[
    { headline: 'NYC Foodbanks', href: 'https://www.nyc.gov/site/dycd/services/food_pantries.page' },
    { headline: 'Apply for SNAP', href: 'https://www.nyc.gov/site/hra/help/snap-benefits-food-program.page' }
  ]}
  />

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
{:else}
  <div class="container">
    <p>Market not found.</p>
  </div>
{/if}

<style lang="scss">
  .container {
    max-width: var(--max-width-wide);
    margin: 0 auto;
    padding: var(--spacing-lg, 2rem) var(--spacing-md, 1rem);
  }

  .market-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg, 2rem);
    margin-bottom: var(--spacing-xl, 3rem);
    background: var(--color-white, #fff);
    border: 1px solid var(--color-border, #ddd);
    border-radius: 4px;
    padding: var(--spacing-lg, 2rem);
  }

  .detail-section {
    h2 {
      margin: 0 0 var(--spacing-md, 1rem) 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-text, #333);
    }
  }

  .detail-row {
    margin: 0 0 var(--spacing-sm, 0.75rem) 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .label {
      font-weight: 600;
      color: var(--color-text-secondary, #555);
      font-size: 0.875rem;
    }

    span:not(.label) {
      color: var(--color-text, #333);
    }
  }

  .ebt-status {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 2px;
    background: var(--color-light-gray, #f5f5f5);
    font-weight: 600;

    &.yes {
      background: #e8f5e9;
    }
  }

  .back-link {
    margin-top: var(--spacing-lg, 2rem);
    text-align: left;

    a {
      color: var(--color-accent, #003da5);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>