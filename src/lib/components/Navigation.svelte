<script lang="ts">
  import { page } from '$app/state';
  import { authStore } from '#lib/stores/auth.svelte.ts';
  
  import * as Sheet from '#lib/components/ui/sheet/index.ts';
  import * as DropdownMenu from '#lib/components/ui/dropdown-menu/index.ts';
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.ts';
  import { Badge } from '#lib/components/ui/badge/index.ts';
  import { Button } from '#lib/components/ui/button/index.ts';
  import { Separator } from '#lib/components/ui/separator/index.ts';
  
  import MenuIcon from '@lucide/svelte/icons/menu';
  import CodeIcon from '@lucide/svelte/icons/code';
  import CheckCircleIcon from '@lucide/svelte/icons/check-circle';
  import ReceiptTextIcon from '@lucide/svelte/icons/receipt-text';
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import LogOutIcon from '@lucide/svelte/icons/log-out';
  import SettingsIcon from '@lucide/svelte/icons/settings';
  import Gamepad2Icon from '@lucide/svelte/icons/gamepad-2';
  import BadgeCheckIcon from '@lucide/svelte/icons/badge-check';
  import MessageCircleIcon from '@lucide/svelte/icons/message-circle';
  import SwordsIcon from '@lucide/svelte/icons/swords';
  import SparklesIcon from '@lucide/svelte/icons/sparkles';
  import CrownIcon from '@lucide/svelte/icons/crown';
  import BookOpenIcon from '@lucide/svelte/icons/book-open';
  import InfoIcon from '@lucide/svelte/icons/info';

  let mobileNavOpen = $state(false);

  const userInitial = $derived(
    authStore.user?.displayName?.[0]?.toUpperCase() ?? 
    authStore.user?.email?.[0]?.toUpperCase() ?? 
    'U'
  );
</script>

<header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
    
    <!-- Left: Mobile Nav Drawer & Logo -->
    <div class="flex items-center gap-3">
      <!-- 1. Main Navigation Drawer (Mobile) -->
      <Sheet.Root bind:open={mobileNavOpen}>
        <Sheet.Trigger>
          {#snippet child({ props })}
            <Button {...props} variant="outline" size="icon" class="md:hidden rounded-full h-9 w-9 border-primary text-primary hover:text-primary">
              <MenuIcon class="size-5" />
              <span class="sr-only">Open main menu</span>
            </Button>
          {/snippet}
        </Sheet.Trigger>
        <Sheet.Content side="left" class="w-[300px] p-0 flex flex-col">
          <Sheet.Header class="border-b p-4 text-left flex flex-row items-center gap-2">
            <CodeIcon class="size-6 text-primary" />
            <Sheet.Title class="text-xl">CodeNest</Sheet.Title>
          </Sheet.Header>
          
          <nav class="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
            <!-- Game Top-Ups Section -->
            <div class="flex flex-col gap-2">
              <span class="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Game Top-Ups</span>
              <a href="/mlbb" onclick={() => mobileNavOpen = false} class="flex items-center justify-between rounded-lg bg-card border px-3 py-2.5 transition-colors hover:bg-muted">
                <div class="flex items-center gap-3">
                  <SwordsIcon class="size-5 text-primary" />
                  <span class="font-medium text-sm">MLBB 5v5</span>
                </div>
                <Badge variant="secondary" class="bg-amber-500/10 text-amber-500 hover:bg-amber-500/10">-18%</Badge>
              </a>
              <a href="/mlbb" onclick={() => mobileNavOpen = false} class="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-muted">
                <div class="flex items-center gap-3">
                  <CrownIcon class="size-5 text-primary" />
                  <span class="font-medium text-sm">Magic Chess Go Go</span>
                </div>
                <Badge variant="secondary" class="bg-amber-500/10 text-amber-500 hover:bg-amber-500/10">-14%</Badge>
              </a>
              <a href="/bgmi" onclick={() => mobileNavOpen = false} class="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-muted">
                <div class="flex items-center gap-3">
                  <Gamepad2Icon class="size-5 text-muted-foreground" />
                  <span class="font-medium text-sm">BGMI UC</span>
                </div>
              </a>
              <a href="#" onclick={() => mobileNavOpen = false} class="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-muted">
                <div class="flex items-center gap-3">
                  <SparklesIcon class="size-5 text-muted-foreground" />
                  <span class="font-medium text-sm">Genshin Impact</span>
                </div>
              </a>
            </div>

            <Separator />

            <!-- General Section -->
            <div class="flex flex-col gap-2">
              <span class="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">General</span>
              <a href="/blogs" onclick={() => mobileNavOpen = false} class="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted">
                <BookOpenIcon class="size-5 text-muted-foreground" />
                <span class="font-medium text-sm">Blogs</span>
              </a>
              <a href="/about" onclick={() => mobileNavOpen = false} class="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted">
                <InfoIcon class="size-5 text-muted-foreground" />
                <span class="font-medium text-sm">About Us</span>
              </a>
            </div>

            <Separator />

            <!-- Store & Help Section -->
            <div class="flex flex-col gap-2">
              <span class="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Store & Help</span>
              <a href="/orders" onclick={() => mobileNavOpen = false} class="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted">
                <ReceiptTextIcon class="size-5 text-muted-foreground" />
                <span class="font-medium text-sm">My Orders</span>
              </a>
              <a href="https://wa.me/yourwhatsapp" target="_blank" onclick={() => mobileNavOpen = false} class="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted">
                <MessageCircleIcon class="size-5 text-emerald-500" />
                <span class="font-medium text-sm">WhatsApp Support</span>
              </a>
            </div>
          </nav>
        </Sheet.Content>
      </Sheet.Root>

      <!-- Logo & Desktop Links -->
      <a href="/" class="flex items-center gap-2 transition-opacity hover:opacity-80">
        <CodeIcon class="size-6 text-primary" />
        <span class="font-bold text-lg tracking-tight">CodeNest</span>
      </a>

      <!-- Status Badge -->
      <Badge variant="outline" class="hidden sm:flex border-emerald-500/30 bg-emerald-500/10 text-emerald-500 gap-1 rounded-full px-2.5 py-0.5 ml-2">
        <CheckCircleIcon class="size-3.5" />
        <span class="text-xs font-medium">Open</span>
      </Badge>
    </div>

    <!-- Center: Desktop Main Navigation -->
    <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
      <a href="/" class="text-muted-foreground hover:text-foreground transition-colors {page.url.pathname === '/' ? 'text-foreground' : ''}">Home</a>
      <a href="/mlbb" class="text-muted-foreground hover:text-foreground transition-colors {page.url.pathname.startsWith('/mlbb') ? 'text-foreground' : ''}">MLBB</a>
      <a href="/bgmi" class="text-muted-foreground hover:text-foreground transition-colors {page.url.pathname.startsWith('/bgmi') ? 'text-foreground' : ''}">BGMI</a>
      <a href="/blogs" class="text-muted-foreground hover:text-foreground transition-colors {page.url.pathname.startsWith('/blogs') ? 'text-foreground' : ''}">Blogs</a>
      <a href="/about" class="text-muted-foreground hover:text-foreground transition-colors {page.url.pathname.startsWith('/about') ? 'text-foreground' : ''}">About Us</a>
    </nav>

    <!-- Right: Auth / User Menu -->
    <div class="flex items-center gap-2 sm:gap-4">
      {#if authStore.loading}
        <div class="size-9 rounded-full bg-muted animate-pulse"></div>
      {:else if !authStore.isAuthenticated || authStore.isAnonymous}
        <Button href="/auth" class="rounded px-5 text-sm font-semibold h-9 shadow-none">
          Login
        </Button>
      {:else}
        <Button href="/orders" variant="ghost" size="icon" class="hidden sm:flex rounded-full text-muted-foreground hover:text-foreground">
          <ReceiptTextIcon class="size-5" />
        </Button>

        <!-- 2. User Menu Dropdown -->
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {#snippet child({ props })}
              <button {...props} class="flex items-center gap-2 rounded-full border border-border bg-card hover:bg-muted transition-colors p-1 pr-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <Avatar class="size-7">
                  <AvatarImage src={authStore.user?.photoURL ?? undefined} alt="Profile" />
                  <AvatarFallback class="bg-primary text-primary-foreground text-xs font-bold">{userInitial}</AvatarFallback>
                </Avatar>
                <span class="text-sm font-medium hidden sm:inline-block max-w-[100px] truncate">
                  {authStore.user?.displayName ?? 'Player'}
                </span>
                <ChevronDownIcon class="size-4 text-primary" />
              </button>
            {/snippet}
          </DropdownMenu.Trigger>

          <DropdownMenu.Content align="end" class="w-64 p-2">
            <!-- User Info Header -->
            <div class="flex items-center gap-3 p-2 mb-1">
              <Avatar class="size-10">
                <AvatarImage src={authStore.user?.photoURL ?? undefined} />
                <AvatarFallback class="bg-primary text-primary-foreground font-bold">{userInitial}</AvatarFallback>
              </Avatar>
              <div class="flex flex-col overflow-hidden">
                <span class="text-sm font-semibold truncate">{authStore.user?.displayName ?? 'Player Account'}</span>
                <span class="text-xs text-muted-foreground truncate">{authStore.user?.email ?? 'No email linked'}</span>
              </div>
            </div>

            <DropdownMenu.Separator />
            
            <DropdownMenu.Group>
              <DropdownMenu.Item href="/orders" class="flex items-center justify-between cursor-pointer py-2">
                <div class="flex items-center gap-2">
                  <ReceiptTextIcon class="size-4 text-primary" />
                  <span>My Orders</span>
                </div>
                <!-- Dynamic badge for active orders could go here -->
              </DropdownMenu.Item>
              <DropdownMenu.Item href="/saved-ids" class="gap-2 cursor-pointer py-2">
                <BadgeCheckIcon class="size-4 text-muted-foreground" />
                <span>Saved Game IDs</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item href="/settings" class="gap-2 cursor-pointer py-2">
                <SettingsIcon class="size-4 text-muted-foreground" />
                <span>Account Settings</span>
              </DropdownMenu.Item>
              {#if authStore.isAdmin}
                <DropdownMenu.Item href="/admin" class="gap-2 cursor-pointer py-2">
                  <CodeIcon class="size-4 text-primary" />
                  <span class="font-semibold text-primary">Admin Console</span>
                </DropdownMenu.Item>
              {/if}
            </DropdownMenu.Group>

            <DropdownMenu.Separator />
            
            <DropdownMenu.Item class="gap-2 text-rose-500 focus:text-rose-500 focus:bg-rose-500/10 cursor-pointer py-2" onclick={() => authStore.logout()}>
              <LogOutIcon class="size-4" />
              <span>Sign Out</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      {/if}
    </div>

  </div>
</header>
