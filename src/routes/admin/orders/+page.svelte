<script lang="ts">
  import {
    collection,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where,
  } from 'firebase/firestore';
  import { toast } from 'svelte-sonner';
  import { db } from '#lib/firebase.ts';
  import { DB_PATHS } from '#lib/db-paths.ts';
  import { authStore } from '#lib/stores/auth.svelte.ts';
  import type { Order, OrderStatus, RejectionReasonCode, SkuSecret } from '#lib/types/index.ts';
  import * as Tabs from '#lib/components/ui/tabs/index.ts';
  import * as Table from '#lib/components/ui/table/index.ts';
  import * as Sheet from '#lib/components/ui/sheet/index.ts';
  import * as Dialog from '#lib/components/ui/dialog/index.ts';
  import * as Select from '#lib/components/ui/select/index.ts';
  import { Badge } from '#lib/components/ui/badge/index.ts';
  import { Button } from '#lib/components/ui/button/index.ts';
  import { Input } from '#lib/components/ui/input/index.ts';
  import { Label } from '#lib/components/ui/label/index.ts';
  import { Separator } from '#lib/components/ui/separator/index.ts';
  import CopyIcon from '@lucide/svelte/icons/copy';
  import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
  import ZoomInIcon from '@lucide/svelte/icons/zoom-in';

  let activeStatus = $state<OrderStatus>('pending_verification');
  let searchQuery = $state('');
  let orders = $state<Order[]>([]);

  let selectedOrder = $state<Order | null>(null);
  let drawerOpen = $state(false);
  let zoomOpen = $state(false);

  // Fulfillment form fields inside drawer
  let supplierOrderId = $state('');
  let supplierCostInr = $state<number>(0);
  let supplierPlatform = $state('');
  let rejectionCode = $state<RejectionReasonCode>('invalid_or_fake_utr');
  let rejectionNote = $state('');
  let saving = $state(false);

  const rejectionOptions: Array<{ value: RejectionReasonCode; label: string }> = [
    { value: 'invalid_or_fake_utr', label: 'Invalid / Fake UTR' },
    { value: 'duplicate_utr', label: 'Duplicate UTR' },
    { value: 'amount_mismatch', label: 'Amount Mismatch' },
    { value: 'invalid_player_id', label: 'Invalid Player ID / Server' },
    { value: 'unsupported_server_region', label: 'Unsupported Server Region' },
    { value: 'out_of_stock', label: 'Supplier Out of Stock' },
    { value: 'other', label: 'Other' },
  ];

  $effect(() => {
    const q = query(
      collection(db, DB_PATHS.orders),
      where('status', '==', activeStatus),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, (snap) => {
      orders = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Order);
    });
    return () => unsub();
  });

  const filteredOrders = $derived.by(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter((o) => {
      const targetId =
        o.gameSlug === 'mlbb'
          ? `${o.targetAccount.id} ${o.targetAccount.server} ${o.targetAccount.name}`
          : o.targetAccount.characterId;
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.payment.utrNumber.toLowerCase().includes(q) ||
        targetId.toLowerCase().includes(q)
      );
    });
  });

  async function openOrder(order: Order) {
    selectedOrder = order;
    supplierOrderId = order.fulfillment.supplierOrderId ?? '';
    supplierPlatform = order.fulfillment.supplierPlatform ?? '';
    supplierCostInr = order.fulfillment.supplierCostInr ?? 0;
    rejectionCode = order.fulfillment.rejectionCode ?? 'invalid_or_fake_utr';
    rejectionNote = order.fulfillment.rejectionNote ?? '';
    drawerOpen = true;

    // Auto-fill supplier buy cost from private sku_secrets if not recorded yet
    if (order.fulfillment.supplierCostInr == null) {
      const secretSnap = await getDoc(doc(db, DB_PATHS.skuSecrets, order.item.skuId));
      if (secretSnap.exists()) {
        const secret = secretSnap.data() as SkuSecret;
        supplierCostInr = secret.supplierCostInr * order.item.quantity;
        supplierPlatform = secret.supplierPlatform;
      }
    }
  }

  async function copyText(label: string, value: string | number) {
    await navigator.clipboard.writeText(String(value));
    toast.success(`Copied ${label}: ${value}`);
  }

  async function transitionOrder(nextStatus: OrderStatus) {
    if (!selectedOrder || !authStore.user) return;
    saving = true;
    try {
      const ref = doc(db, DB_PATHS.orders, selectedOrder.id);
      const baseUpdate: Record<string, unknown> = {
        status: nextStatus,
        updatedAt: serverTimestamp(),
      };

      if (nextStatus === 'queued_for_fulfillment' || nextStatus === 'processing_fulfillment') {
        baseUpdate['fulfillment.claimedBy'] = authStore.user.uid;
        baseUpdate['fulfillment.claimedAt'] = serverTimestamp();
      } else if (nextStatus === 'completed') {
        const cost = Number(supplierCostInr) || 0;
        baseUpdate['fulfillment.claimedBy'] =
          selectedOrder.fulfillment.claimedBy ?? authStore.user.uid;
        baseUpdate['fulfillment.supplierPlatform'] = supplierPlatform || null;
        baseUpdate['fulfillment.supplierOrderId'] = supplierOrderId.trim() || null;
        baseUpdate['fulfillment.supplierCostInr'] = cost;
        baseUpdate['fulfillment.netProfitInr'] = Number(
          (selectedOrder.item.totalAmountInr - cost).toFixed(2)
        );
        baseUpdate['fulfillment.completedAt'] = serverTimestamp();
      } else if (nextStatus === 'rejected') {
        baseUpdate['fulfillment.rejectionCode'] = rejectionCode;
        baseUpdate['fulfillment.rejectionNote'] = rejectionNote.trim() || null;
      }

      await updateDoc(ref, baseUpdate);
      toast.success(`Order ${selectedOrder.orderNumber} marked ${nextStatus.replaceAll('_', ' ')}.`);
      drawerOpen = false;
    } catch (err) {
      toast.error((err as Error).message || 'Failed to update order.');
    } finally {
      saving = false;
    }
  }
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <h1 class="text-2xl font-bold tracking-tight">Order Queue</h1>
    <Input
      placeholder="Search Order #, 12-digit UTR, or Player ID..."
      class="sm:w-80"
      bind:value={searchQuery}
    />
  </div>

  <Tabs.Root bind:value={activeStatus}>
    <Tabs.List class="flex h-auto flex-wrap justify-start gap-1">
      <Tabs.Trigger value="pending_verification">Pending Check</Tabs.Trigger>
      <Tabs.Trigger value="queued_for_fulfillment">Queued</Tabs.Trigger>
      <Tabs.Trigger value="processing_fulfillment">Processing</Tabs.Trigger>
      <Tabs.Trigger value="completed">Completed</Tabs.Trigger>
      <Tabs.Trigger value="rejected">Rejected</Tabs.Trigger>
    </Tabs.List>
  </Tabs.Root>

  <div class="rounded-md border bg-background">
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Order</Table.Head>
          <Table.Head>Game & Target</Table.Head>
          <Table.Head>Pack</Table.Head>
          <Table.Head>UTR</Table.Head>
          <Table.Head class="text-right">Amount</Table.Head>
          <Table.Head class="text-right">Action</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each filteredOrders as order (order.id)}
          <Table.Row class="cursor-pointer" onclick={() => openOrder(order)}>
            <Table.Cell class="font-mono text-xs font-medium">{order.orderNumber}</Table.Cell>
            <Table.Cell>
              <div class="flex items-center gap-2">
                <Badge variant="outline">{order.gameSlug.toUpperCase()}</Badge>
                {#if order.gameSlug === 'mlbb'}
                  <span class="font-mono text-xs">
                    {order.targetAccount.id} ({order.targetAccount.server})
                  </span>
                  {#if order.targetAccount.name}
                    <span class="text-xs text-muted-foreground">
                      {order.targetAccount.name}
                    </span>
                  {/if}
                {:else}
                  <span class="font-mono text-xs">{order.targetAccount.characterId}</span>
                {/if}
              </div>
            </Table.Cell>
            <Table.Cell class="text-sm">
              {order.item.title} × {order.item.quantity}
            </Table.Cell>
            <Table.Cell class="font-mono text-xs">{order.payment.utrNumber}</Table.Cell>
            <Table.Cell class="text-right font-semibold">₹{order.item.totalAmountInr}</Table.Cell>
            <Table.Cell class="text-right">
              <Button size="sm" variant="secondary">Inspect</Button>
            </Table.Cell>
          </Table.Row>
        {:else}
          <Table.Row>
            <Table.Cell colspan={6} class="h-24 text-center text-muted-foreground">
              No orders in this queue.
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
</div>

<!-- Verification & Fulfillment Slide-Over Sheet -->
<Sheet.Root bind:open={drawerOpen}>
  <Sheet.Content side="right" class="w-full overflow-y-auto sm:max-w-lg">
    {#if selectedOrder}
      <Sheet.Header>
        <Sheet.Title class="flex items-center justify-between pr-6">
          <span>{selectedOrder.orderNumber}</span>
          <Badge>{selectedOrder.status.replaceAll('_', ' ')}</Badge>
        </Sheet.Title>
        <Sheet.Description>
          {selectedOrder.item.title} × {selectedOrder.item.quantity} — ₹{selectedOrder.item.totalAmountInr}
        </Sheet.Description>
      </Sheet.Header>

      <div class="mt-4 flex flex-col gap-5 px-4 pb-6">
        <!-- 1-Click Copy Target Account Box -->
        <div class="flex flex-col gap-2 rounded-lg border bg-muted/40 p-3">
          <span class="text-xs font-semibold uppercase text-muted-foreground">
            Player Account ({selectedOrder.gameSlug.toUpperCase()})
          </span>
          {#if selectedOrder.gameSlug === 'mlbb'}
            <div class="flex items-center justify-between text-sm">
              <span>User ID: <strong class="font-mono">{selectedOrder.targetAccount.id}</strong></span>
              <Button size="sm" variant="ghost" onclick={() => copyText('UID', selectedOrder!.targetAccount.id)}>
                <CopyIcon class="size-3.5" />
              </Button>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span>Server: <strong class="font-mono">{selectedOrder.targetAccount.server}</strong></span>
              <Button size="sm" variant="ghost" onclick={() => copyText('Server', selectedOrder!.targetAccount.server)}>
                <CopyIcon class="size-3.5" />
              </Button>
            </div>
            {#if selectedOrder.targetAccount.name}
              <div class="text-xs text-muted-foreground">
                IGN: {selectedOrder.targetAccount.name}
                {#if selectedOrder.targetAccount.country}
                  ({selectedOrder.targetAccount.country})
                {/if}
              </div>
            {/if}
          {:else}
            <div class="flex items-center justify-between text-sm">
              <span>Character ID: <strong class="font-mono">{selectedOrder.targetAccount.characterId}</strong></span>
              <Button size="sm" variant="ghost" onclick={() => copyText('Character ID', selectedOrder!.targetAccount.characterId)}>
                <CopyIcon class="size-3.5" />
              </Button>
            </div>
          {/if}
        </div>

        <!-- UPI Proof & Zoomable Screenshot -->
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between text-sm">
            <span>UTR: <strong class="font-mono">{selectedOrder.payment.utrNumber}</strong></span>
            <Button
              size="sm"
              variant="ghost"
              onclick={() => copyText('UTR', selectedOrder!.payment.utrNumber)}
            >
              <CopyIcon class="size-3.5" />
            </Button>
          </div>
          <button
            type="button"
            class="group relative overflow-hidden rounded-lg border bg-muted"
            onclick={() => (zoomOpen = true)}
          >
            <img
              src={selectedOrder.payment.screenshotUrl}
              alt="UPI payment proof"
              class="max-h-64 w-full object-contain"
            />
            <span class="absolute right-2 bottom-2 flex items-center gap-1 rounded bg-background/80 px-2 py-1 text-xs">
              <ZoomInIcon class="size-3" /> Zoom
            </span>
          </button>

          {#if selectedOrder.userWhatsapp}
            <Button
              variant="outline"
              size="sm"
              href={`https://wa.me/${selectedOrder.userWhatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi, regarding your order ${selectedOrder.orderNumber}: `)}`}
              target="_blank"
            >
              <ExternalLinkIcon class="size-3.5" />
              Ping Customer on WhatsApp ({selectedOrder.userWhatsapp})
            </Button>
          {/if}
        </div>

        <Separator />

        <!-- Fulfillment & Profit Recording -->
        <div class="flex flex-col gap-3">
          <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col gap-1">
              <Label for="supplier-cost">Supplier Cost (₹)</Label>
              <Input id="supplier-cost" type="number" step="0.5" bind:value={supplierCostInr} />
            </div>
            <div class="flex flex-col gap-1">
              <Label for="supplier-order-id">Supplier Receipt ID</Label>
              <Input id="supplier-order-id" placeholder="Optional" bind:value={supplierOrderId} />
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            {#if selectedOrder.status === 'pending_verification'}
              <Button
                variant="secondary"
                disabled={saving}
                onclick={() => transitionOrder('queued_for_fulfillment')}
              >
                Approve Payment (Queue)
              </Button>
            {/if}
            {#if selectedOrder.status !== 'completed'}
              <Button disabled={saving} onclick={() => transitionOrder('completed')}>
                Mark Delivered (Profit: ₹{(selectedOrder.item.totalAmountInr - supplierCostInr).toFixed(2)})
              </Button>
            {/if}
          </div>
        </div>

        <Separator />

        <!-- Rejection Controls -->
        <div class="flex flex-col gap-2">
          <Label>Reject Order</Label>
          <Select.Root type="single" bind:value={rejectionCode}>
            <Select.Trigger class="w-full">
              {rejectionOptions.find((o) => o.value === rejectionCode)?.label ?? 'Select reason'}
            </Select.Trigger>
            <Select.Content>
              {#each rejectionOptions as opt (opt.value)}
                <Select.Item value={opt.value} label={opt.label}>{opt.label}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
          <Input placeholder="Optional note to customer..." bind:value={rejectionNote} />
          <Button
            variant="destructive"
            size="sm"
            disabled={saving}
            onclick={() => transitionOrder('rejected')}
          >
            Reject Order
          </Button>
        </div>
      </div>
    {/if}
  </Sheet.Content>
</Sheet.Root>

<!-- Full-Screen Screenshot Lightbox -->
<Dialog.Root bind:open={zoomOpen}>
  <Dialog.Content class="max-w-3xl">
    <Dialog.Header>
      <Dialog.Title>Payment Proof — {selectedOrder?.payment.utrNumber}</Dialog.Title>
    </Dialog.Header>
    {#if selectedOrder}
      <img
        src={selectedOrder.payment.screenshotUrl}
        alt="Zoomed UPI screenshot"
        class="max-h-[75vh] w-full rounded object-contain"
      />
    {/if}
  </Dialog.Content>
</Dialog.Root>
