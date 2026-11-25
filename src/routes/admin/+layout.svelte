<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { collection, onSnapshot, query, where } from 'firebase/firestore';
  import { db } from '#lib/firebase.ts';
  import { DB_PATHS } from '#lib/db-paths.ts';
  import { authStore } from '#lib/stores/auth.svelte.ts';
  import { Button } from '#lib/components/ui/button/index.ts';
  import { Badge } from '#lib/components/ui/badge/index.ts';
  import * as Sheet from '#lib/components/ui/sheet/index.ts';
  import * as Card from '#lib/components/ui/card/index.ts';
  import LayoutDashboardIcon from '@lucide/svelte/icons/layout-dashboard';
  import ShoppingBagIcon from '@lucide/svelte/icons/shopping-bag';
  import LayersIcon from '@lucide/svelte/icons/layers';
  import SettingsIcon from '@lucide/svelte/icons/settings';
  import MenuIcon from '@lucide/svelte/icons/menu';
  import LogOutIcon from '@lucide/svelte/icons/log-out';
  import LoaderCircleIcon from '@lucide/svelte/icons/loader-circle';

  let { children } = $props();

  let mobileNavOpen = $state(false);
  let pendingCount = $state(0);

  const navItems = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboardIcon },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingBagIcon, badge: true },
    { href: '/admin/catalog', label: 'Catalog CMS', icon: LayersIcon },
    { href: '/admin/settings', label: 'Settings', icon: SettingsIcon },
  ];

  $effect(() => {
    if (!authStore.loading && (!authStore.isAuthenticated || authStore.isAnonymous)) {
      goto(`/auth?redirect=${encodeURIComponent(page.url.pathname)}`, { replace: true });
    }
  });

  // Live pending order counter badge for admins
  $effect(() => {
    if (!authStore.isAdmin) return;
    const q = query(
      collection(db, DB_PATHS.orders),
      where('status', '==', 'pending_verification')
    );
    const unsub = onSnapshot(q, (snap) => {
      pendingCount = snap.size;
    });
    return () => unsub();
  });

  function isActive(href: string) {
    return href === '/admin'
      ? page.url.pathname === '/admin'
      : page.url.pathname.startsWith(href);
  }
</script>

<svelte:head>
  <title>Admin CMS</title>
</svelte:head>

{#if authStore.loading}
  <div class="flex h-screen items-center justify-center">
    <LoaderCircleIcon class="size-6 animate-spin text-muted-foreground" />
  </div>
{:else if !authStore.isAdmin}
  <div class="flex min-h-screen items-center justify-center p-4">
    <Card.Root class="w-full max-w-md">
      <Card.Header>
        <Card.Title>Admin Access Required</Card.Title>
        <Card.Description>
          Your account is not listed in the shop admins collection.
        </Card.Description>
      </Card.Header>
      <Card.Content class="flex flex-col gap-3">
        {#if authStore.user}
          <div class="rounded-md bg-muted p-3 font-mono text-xs break-all">
            UID: {authStore.user.uid}
          </div>
        {/if}
        <div class="flex gap-2">
          <Button variant="outline" onclick={() => goto('/')}>Back to Store</Button>
          <Button variant="destructive" onclick={() => authStore.logout()}>Sign Out</Button>
        </div>
      </Card.Content>
    </Card.Root>
  </div>
{:else}
  <div class="flex min-h-screen bg-muted/30">
    <!-- Desktop Sidebar -->
    <aside class="hidden w-60 shrink-0 flex-col border-r bg-background md:flex">
      <div class="flex h-14 items-center border-b px-4 font-semibold tracking-tight">
        Shop Admin
      </div>
      <nav class="flex flex-1 flex-col gap-1 p-3">
        {#each navItems as item (item.href)}
          {@const Icon = item.icon}
          <a
            href={item.href}
            class="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors {isActive(item.href)
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
          >
            <span class="flex items-center gap-2.5">
              <Icon class="size-4" />
              {item.label}
            </span>
            {#if item.badge && pendingCount > 0}
              <Badge variant="destructive" class="h-5 px-1.5 text-xs">
                {pendingCount}
              </Badge>
            {/if}
          </a>
        {/each}
      </nav>
      <div class="border-t p-3">
        <div class="mb-2 truncate px-2 text-xs text-muted-foreground">
          {authStore.user?.email}
        </div>
        <Button
          variant="ghost"
          size="sm"
          class="w-full justify-start gap-2 text-muted-foreground"
          onclick={() => authStore.logout()}
        >
          <LogOutIcon class="size-4" />
          Sign Out
        </Button>
      </div>
    </aside>

    <!-- Main Area -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <header class="flex h-14 items-center justify-between border-b bg-background px-4 md:px-6">
        <div class="flex items-center gap-2">
          <Sheet.Root bind:open={mobileNavOpen}>
            <Sheet.Trigger>
              {#snippet child({ props })}
                <Button {...props} variant="outline" size="icon" class="md:hidden">
                  <MenuIcon class="size-4" />
                </Button>
              {/snippet}
            </Sheet.Trigger>
            <Sheet.Content side="left" class="w-64 p-0">
              <Sheet.Header class="border-b p-4 text-left">
                <Sheet.Title>Shop Admin</Sheet.Title>
              </Sheet.Header>
              <nav class="flex flex-col gap-1 p-3">
                {#each navItems as item (item.href)}
                  {@const Icon = item.icon}
                  <a
                    href={item.href}
                    onclick={() => (mobileNavOpen = false)}
                    class="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium {isActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted'}"
                  >
                    <span class="flex items-center gap-2.5">
                      <Icon class="size-4" />
                      {item.label}
                    </span>
                    {#if item.badge && pendingCount > 0}
                      <Badge variant="destructive">{pendingCount}</Badge>
                    {/if}
                  </a>
                {/each}
              </nav>
            </Sheet.Content>
          </Sheet.Root>
          <span class="text-sm font-medium text-muted-foreground">
            {page.url.pathname}
          </span>
        </div>

        <Button variant="outline" size="sm" href="/" target="_blank">
          View Storefront
        </Button>
      </header>

      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        {@render children()}
      </main>
    </div>
  </div>
{/if}
