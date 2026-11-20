<script lang="ts">
  import {
    collection,
    doc,
    getDocs,
    increment,
    serverTimestamp,
    setDoc,
    updateDoc,
    writeBatch,
  } from 'firebase/firestore';
  import { toast } from 'svelte-sonner';
  import { db } from '#lib/firebase.ts';
  import { DB_PATHS } from '#lib/db-paths.ts';
  import { authStore } from '#lib/stores/auth.svelte.ts';
  import type { GameConfig, GameSlug, Sku, SkuSecret, StoreEvent } from '#lib/types/index.ts';
  import * as Tabs from '#lib/components/ui/tabs/index.ts';
  import * as Table from '#lib/components/ui/table/index.ts';
  import * as Dialog from '#lib/components/ui/dialog/index.ts';
  import { Button } from '#lib/components/ui/button/index.ts';
  import { Input } from '#lib/components/ui/input/index.ts';
  import { Label } from '#lib/components/ui/label/index.ts';
  import { Switch } from '#lib/components/ui/switch/index.ts';
  import { Badge } from '#lib/components/ui/badge/index.ts';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import RocketIcon from '@lucide/svelte/icons/rocket';

  let activeTab = $state<'events' | 'skus'>('events');
  let events = $state<StoreEvent[]>([]);
  let skus = $state<Sku[]>([]);
  let secretsMap = $state<Record<string, SkuSecret>>({});
  let publishing = $state(false);

  // Event Creator Modal State
  let eventModalOpen = $state(false);
  let evId = $state('');
  let evGame = $state<GameSlug>('mlbb');
  let evTitle = $state('');
  let evSubtitle = $state('');
  let evBannerDesktop = $state('');
  let evPriority = $state(1);

  async function loadCatalog() {
    const [evSnap, skuSnap, secSnap] = await Promise.all([
      getDocs(collection(db, DB_PATHS.events)),
      getDocs(collection(db, DB_PATHS.skus)),
      getDocs(collection(db, DB_PATHS.skuSecrets)),
    ]);

    events = evSnap.docs
      .map((d) => ({ id: d.id, ...d.data() }) as StoreEvent)
      .sort((a, b) => a.homepagePriority - b.homepagePriority);

    skus = skuSnap.docs
      .map((d) => ({ skuId: d.id, ...d.data() }) as Sku)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const map: Record<string, SkuSecret> = {};
    for (const d of secSnap.docs) map[d.id] = d.data() as SkuSecret;
    secretsMap = map;
  }

  $effect(() => {
    loadCatalog();
  });

  async function toggleEventHomepage(ev: StoreEvent, checked: boolean) {
    await updateDoc(doc(db, DB_PATHS.events, ev.id), {
      showOnHomepage: checked,
      updatedAt: serverTimestamp(),
    });
    ev.showOnHomepage = checked;
    toast.info('Updated event visibility. Click "Publish Storefront" when ready.');
  }

  async function toggleSkuStock(sku: Sku, checked: boolean) {
    await updateDoc(doc(db, DB_PATHS.skus, sku.skuId), {
      inStock: checked,
      updatedAt: serverTimestamp(),
    });
    sku.inStock = checked;
    toast.info(`${sku.title}: ${checked ? 'In Stock' : 'Out of Stock'}`);
  }

  async function createEvent(e: SubmitEvent) {
    e.preventDefault();
    const id = evId.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    if (!id || !evTitle.trim()) return;

    await setDoc(doc(db, DB_PATHS.events, id), {
      id,
      gameSlug: evGame,
      title: evTitle.trim(),
      subtitle: evSubtitle.trim(),
      bannerDesktopUrl: evBannerDesktop.trim(),
      bannerMobileUrl: evBannerDesktop.trim(),
      isEvent: true,
      showOnHomepage: true,
      homepagePriority: Number(evPriority) || 1,
      startsAt: null,
      endsAt: null,
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    toast.success(`Created event "${evTitle}".`);
    eventModalOpen = false;
    evId = '';
    evTitle = '';
    evSubtitle = '';
    evBannerDesktop = '';
    await loadCatalog();
  }

  /** Compiles active Games, Events, and SKUs into the 1-read public storefront manifest. */
  async function publishStorefrontManifest() {
    if (!authStore.user) return;
    publishing = true;
    try {
      const [gamesSnap, paymentSnap] = await Promise.all([
        getDocs(collection(db, DB_PATHS.games)),
        getDocs(collection(db, DB_PATHS.events)), // refresh latest events
      ]);

      const activeGames = gamesSnap.docs
        .map((d) => d.data() as GameConfig)
        .filter((g) => g.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder);

      const featuredEvents = paymentSnap.docs
        .map((d) => ({ id: d.id, ...d.data() }) as StoreEvent)
        .filter((e) => e.isActive && e.showOnHomepage)
        .sort((a, b) => a.homepagePriority - b.homepagePriority);

      const skusByEvent: Record<string, Sku[]> = {};
      for (const sku of skus.filter((s) => s.isActive)) {
        (skusByEvent[sku.eventId] ??= []).push(sku);
      }

      const batch = writeBatch(db);
      batch.set(
        doc(db, DB_PATHS.storefrontManifest),
        {
          version: increment(1),
          publishedAt: serverTimestamp(),
          publishedByUid: authStore.user.uid,
          isStoreOpen: true,
          games: activeGames,
          featuredEvents,
          skusByEvent,
        },
        { merge: true }
      );
      await batch.commit();
      toast.success('Storefront manifest published!');
    } catch (err) {
      toast.error((err as Error).message || 'Publish failed.');
    } finally {
      publishing = false;
    }
  }
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-wrap items-center justify-between gap-2">
    <h1 class="text-2xl font-bold tracking-tight">Catalog CMS</h1>
    <div class="flex gap-2">
      <Button variant="outline" onclick={() => (eventModalOpen = true)}>
        <PlusIcon class="size-4" />
        New Event
      </Button>
      <Button disabled={publishing} onclick={publishStorefrontManifest}>
        <RocketIcon class="size-4" />
        {publishing ? 'Publishing...' : 'Publish Storefront'}
      </Button>
    </div>
  </div>

  <Tabs.Root bind:value={activeTab}>
    <Tabs.List>
      <Tabs.Trigger value="events">Events & Banners ({events.length})</Tabs.Trigger>
      <Tabs.Trigger value="skus">SKUs & Margins ({skus.length})</Tabs.Trigger>
    </Tabs.List>

    <Tabs.Content value="events" class="mt-4 rounded-md border bg-background">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Priority</Table.Head>
            <Table.Head>Game</Table.Head>
            <Table.Head>Event Title</Table.Head>
            <Table.Head class="text-right">Show on Homepage</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each events as ev (ev.id)}
            <Table.Row>
              <Table.Cell class="font-mono text-xs">#{ev.homepagePriority}</Table.Cell>
              <Table.Cell><Badge variant="outline">{ev.gameSlug.toUpperCase()}</Badge></Table.Cell>
              <Table.Cell>
                <div class="font-medium">{ev.title}</div>
                <div class="text-xs text-muted-foreground">{ev.subtitle}</div>
              </Table.Cell>
              <Table.Cell class="text-right">
                <Switch
                  checked={ev.showOnHomepage}
                  onCheckedChange={(v) => toggleEventHomepage(ev, v)}
                />
              </Table.Cell>
            </Table.Row>
          {:else}
            <Table.Row>
              <Table.Cell colspan={4} class="h-24 text-center text-muted-foreground">
                No events yet. Click "New Event" to add your first MLBB or BGMI promo.
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </Tabs.Content>

    <Tabs.Content value="skus" class="mt-4 rounded-md border bg-background">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Pack</Table.Head>
            <Table.Head>Event ID</Table.Head>
            <Table.Head class="text-right">Sell (₹)</Table.Head>
            <Table.Head class="text-right">Cost (₹)</Table.Head>
            <Table.Head class="text-right">Margin</Table.Head>
            <Table.Head class="text-right">In Stock</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each skus as sku (sku.skuId)}
            {@const cost = secretsMap[sku.skuId]?.supplierCostInr ?? 0}
            {@const margin = sku.sellingPriceInr - cost}
            <Table.Row>
              <Table.Cell class="font-medium">{sku.title}</Table.Cell>
              <Table.Cell class="font-mono text-xs text-muted-foreground">{sku.eventId}</Table.Cell>
              <Table.Cell class="text-right">₹{sku.sellingPriceInr}</Table.Cell>
              <Table.Cell class="text-right text-muted-foreground">₹{cost}</Table.Cell>
              <Table.Cell class="text-right font-medium text-emerald-600">
                ₹{margin.toFixed(2)}
              </Table.Cell>
              <Table.Cell class="text-right">
                <Switch
                  checked={sku.inStock}
                  onCheckedChange={(v) => toggleSkuStock(sku, v)}
                />
              </Table.Cell>
            </Table.Row>
          {:else}
            <Table.Row>
              <Table.Cell colspan={6} class="h-24 text-center text-muted-foreground">
                No SKUs created yet.
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </Tabs.Content>
  </Tabs.Root>
</div>

<!-- Create Event Modal -->
<Dialog.Root bind:open={eventModalOpen}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>New Storefront Event</Dialog.Title>
      <Dialog.Description>
        Add an MLBB or BGMI event banner to feature on the homepage.
      </Dialog.Description>
    </Dialog.Header>
    <form class="flex flex-col gap-3" onsubmit={createEvent}>
      <div class="grid grid-cols-2 gap-3">
        <div class="flex flex-col gap-1">
          <Label for="ev-id">Event Slug / ID</Label>
          <Input id="ev-id" placeholder="mlbb-kof-2026" bind:value={evId} required />
        </div>
        <div class="flex flex-col gap-1">
          <Label for="ev-priority">Homepage Priority</Label>
          <Input id="ev-priority" type="number" min="1" bind:value={evPriority} />
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <Label for="ev-title">Title</Label>
        <Input id="ev-title" placeholder="MLBB KOF Recharge Phase 1" bind:value={evTitle} required />
      </div>
      <div class="flex flex-col gap-1">
        <Label for="ev-subtitle">Subtitle</Label>
        <Input id="ev-subtitle" placeholder="Best ₹ rates for 250 Diamond Task" bind:value={evSubtitle} />
      </div>
      <div class="flex flex-col gap-1">
        <Label for="ev-banner">Banner Image URL</Label>
        <Input id="ev-banner" placeholder="https://..." bind:value={evBannerDesktop} />
      </div>
      <Dialog.Footer class="mt-2">
        <Button type="button" variant="outline" onclick={() => (eventModalOpen = false)}>
          Cancel
        </Button>
        <Button type="submit">Save Event</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
