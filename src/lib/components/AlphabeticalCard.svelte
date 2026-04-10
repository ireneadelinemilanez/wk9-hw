<!--
@component
AlphabeticalCard.svelte — A horizontal card showing optional image, title, and description (no ranking number).
-->
<script>
  import { asset } from '$app/paths';

  let {
    href = '',
    image = '',
    imageAlt = '',
    title = '',
    description = '',
    value = '',
    valueLabel = '',
  } = $props();

  // Resolve local images (those starting with /) using asset()
  // but not external URLs (http://, https://, //, data:)
  const resolvedImage = $derived(
    image && image.startsWith('/') && !image.startsWith('//')
      ? asset(image)
      : image
  );
</script>

{#snippet cardContent()}
  {#if image}
    <div class="thumbnail">
      <img src={resolvedImage} alt={imageAlt} />
    </div>
  {/if}
  <div class="content">
    <h3 class="title">{title}</h3>
    {#if description}
      <p class="description">{description}</p>
    {/if}
  </div>
  {#if value}
    <div class="value">
      <span class="value-number">{value}</span>
      {#if valueLabel}
        <span class="value-label">{valueLabel}</span>
      {/if}
    </div>
  {/if}
{/snippet}

{#if href}
  <a {href} class="alphabetical-card alphabetical-card-link">
    {@render cardContent()}
  </a>
{:else}
  <div class="alphabetical-card">
    {@render cardContent()}
  </div>
{/if}

<style lang="scss">
  .alphabetical-card {
    display: flex;
    align-items: center;
    gap: var(--spacing-md, 1rem);
    padding: var(--spacing-sm, 0.75rem) var(--spacing-md, 1rem);
    border-bottom: 1px solid var(--color-border, #ddd);
  }

  .alphabetical-card-link {
    color: inherit;
    text-decoration: none;
    transition: background-color 0.15s ease;

    &:hover {
      background-color: var(--color-light-gray, #f5f5f5);
    }
  }

  .thumbnail {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 4px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .content {
    flex: 1;
    min-width: 0;
  }

  .title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.3;
  }

  .description {
    margin: 0.25rem 0 0;
    font-size: 0.875rem;
    color: var(--color-text-secondary, #555);
    line-height: 1.4;
  }

  .value {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
  }

  .value-number {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text, #333);
  }

  .value-label {
    font-size: 0.75rem;
    color: var(--color-text-secondary, #555);
  }
</style>
