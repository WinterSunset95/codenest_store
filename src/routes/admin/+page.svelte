<script lang="ts">
  import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
  import { db } from '#lib/firebase.ts';
  import { DB_PATHS } from '#lib/db-paths.ts';
  import type { Order } from '#lib/types/index.ts';
  import * as Card from '#lib/components/ui/card/index.ts';
  import { Badge } from '#lib/components/ui/badge/index.ts';
  import { Button } from '#lib/components/ui/button/index.ts';

  let recentOrders = $state<Order[]>([]);

  $effect(() => {
    const q = query(
      collection(db, DB_PATHS.orders),
      orderBy('createdAt', 'desc'),
      limit(100)
    );
    const unsub = onSnapshot(q, (snap) => {
      recentOrders = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Order);
    });
    return () => unsub();
  });

  const pendingCount = $derived(
    recentOrders.filter((o) => o.status === 'pending_verification').length
  );
  const queuedCount = $derived(
    recentOrders.filter(
      (o) => o.status === 'queued_for_fulfillment' || o.status === 'processing_fulfillment'
    ).length
  );
  const completedOrders = $derived(
    recentOrders.filter((o) => o.status === 'completed')
  );
  const totalRevenue = $derived(
    completedOrders.reduce((acc, o) => acc + o.item.totalAmountInr, 0)
  );
  const totalNetProfit = $derived(
    completedOrders.reduce((acc, o) => acc + (o.fulfillment.netProfitInr ?? 0), 0)
  );
</script>

<div class="flex flex-col gap-6">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-bold tracking-tight">Overview</h1>
    <div class="flex gap-2">
      <Button variant="outline" href="/admin/catalog">Manage Catalog</Button>
      <Button href="/admin/orders">Open Order Queue</Button>
    </div>
  </div>

  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <Card.Root>
      <Card.Header class="pb-2">
        <Card.Description>Pending Payment Check</Card.Description>
        <Card.Title class="text-3xl">{pendingCount}</Card.Title>
      </Card.Header>
    </Card.Root>

    <Card.Root>
      <Card.Header class="pb-2">
        <Card.Description>Queued / Processing</Card.Description>
        <Card.Title class="text-3xl">{queuedCount}</Card.Title>
      </Card.Header>
    </Card.Root>

    <Card.Root>
      <Card.Header class="pb-2">
        <Card.Description>Revenue (Last 100)</Card.Description>
        <Card.Title class="text-3xl">₹{totalRevenue.toLocaleString('en-IN')}</Card.Title>
      </Card.Header>
    </Card.Root>

    <Card.Root>
      <Card.Header class="pb-2">
        <Card.Description>Net Profit (Last 100)</Card.Description>
        <Card.Title class="text-3xl text-emerald-600">
          ₹{totalNetProfit.toLocaleString('en-IN')}
        </Card.Title>
      </Card.Header>
    </Card.Root>
  </div>

  <Card.Root>
    <Card.Header>
      <Card.Title>Latest Incoming Orders</Card.Title>
    </Card.Header>
    <Card.Content class="flex flex-col gap-2">
      {#each recentOrders.slice(0, 6) as order (order.id)}
        <div class="flex items-center justify-between rounded-md border p-3 text-sm">
          <div class="flex flex-col">
            <span class="font-medium">{order.orderNumber} — {order.item.title}</span>
            <span class="text-xs text-muted-foreground">
              {order.gameSlug.toUpperCase()} • UTR: {order.payment.utrNumber}
            </span>
          </div>
          <div class="flex items-center gap-3">
            <span class="font-semibold">₹{order.item.totalAmountInr}</span>
            <Badge variant={order.status === 'pending_verification' ? 'destructive' : 'secondary'}>
              {order.status.replaceAll('_', ' ')}
            </Badge>
          </div>
        </div>
      {:else}
        <p class="py-6 text-center text-sm text-muted-foreground">No orders yet.</p>
      {/each}
    </Card.Content>
  </Card.Root>
</div>
