<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { toast } from 'svelte-sonner';
  import { authStore } from '#lib/stores/auth.svelte.ts';
  import * as Card from '#lib/components/ui/card/index.ts';
  import * as Tabs from '#lib/components/ui/tabs/index.ts';
  import { Button } from '#lib/components/ui/button/index.ts';
  import { Input } from '#lib/components/ui/input/index.ts';
  import { Label } from '#lib/components/ui/label/index.ts';
  import { Separator } from '#lib/components/ui/separator/index.ts';
  import LoaderCircleIcon from '@lucide/svelte/icons/loader-circle';
  import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';

  let mode = $state<'login' | 'signup'>('login');
  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');
  let submitting = $state(false);

  const redirectTo = $derived(page.url.searchParams.get('redirect') || '/');

  // If already signed in with a non-anonymous account, bounce to destination
  $effect(() => {
    if (!authStore.loading && authStore.isAuthenticated && !authStore.isAnonymous) {
      goto(redirectTo, { replace: true });
    }
  });

  function formatAuthError(err: unknown): string {
    const code = (err as { code?: string })?.code ?? '';
    if (code === 'auth/invalid-credential') return 'Wrong email or password.';
    if (code === 'auth/email-already-in-use') return 'An account with this email already exists.';
    if (code === 'auth/weak-password') return 'Password must be at least 6 characters.';
    if (code === 'auth/popup-closed-by-user') return 'Google sign-in popup was closed.';
    return (err as Error)?.message || 'Authentication failed.';
  }

  async function handleEmailSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!email.trim() || !password) return;

    if (mode === 'signup' && password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    submitting = true;
    try {
      if (mode === 'login') {
        await authStore.loginWithEmail(email.trim(), password);
        toast.success('Signed in.');
      } else {
        await authStore.signupWithEmail(email.trim(), password);
        toast.success('Account created.');
      }
      await goto(redirectTo, { replaceState: true });
    } catch (err) {
      toast.error(formatAuthError(err));
    } finally {
      submitting = false;
    }
  }

  async function handleGoogle() {
    submitting = true;
    try {
      await authStore.loginWithGoogle();
      toast.success('Signed in with Google.');
      await goto(redirectTo, { replaceState: true });
    } catch (err) {
      toast.error(formatAuthError(err));
    } finally {
      submitting = false;
    }
  }

  async function handleGuest() {
    submitting = true;
    try {
      await authStore.continueAsGuest();
      toast.info('Continuing as guest.');
      await goto('/', { replaceState: true });
    } catch (err) {
      toast.error(formatAuthError(err));
    } finally {
      submitting = false;
    }
  }
</script>

<div class="flex min-h-screen items-center justify-center bg-muted/40 p-4">
  <Card.Root class="w-full max-w-md">
    <Card.Header class="flex flex-col gap-1 text-center">
      <div class="mx-auto mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <ShieldCheckIcon class="size-5" />
      </div>
      <Card.Title class="text-2xl">
        {mode === 'login' ? 'Welcome back' : 'Create an account'}
      </Card.Title>
      <Card.Description>
        {#if authStore.isAnonymous}
          Upgrade your guest session to keep your order history synced.
        {:else}
          Sign in to track your recharges or access the admin console.
        {/if}
      </Card.Description>
    </Card.Header>

    <Card.Content class="flex flex-col gap-4">
      <Button
        variant="outline"
        class="w-full"
        disabled={submitting}
        onclick={handleGoogle}
      >
        {#if submitting}
          <LoaderCircleIcon class="size-4 animate-spin" />
        {/if}
        Continue with Google
      </Button>

      <div class="relative flex items-center">
        <Separator class="flex-1" />
        <span class="px-3 text-xs uppercase text-muted-foreground">or with email</span>
        <Separator class="flex-1" />
      </div>

      <Tabs.Root bind:value={mode}>
        <Tabs.List class="grid w-full grid-cols-2">
          <Tabs.Trigger value="login">Log In</Tabs.Trigger>
          <Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
        </Tabs.List>

        <form class="mt-4 flex flex-col gap-3" onsubmit={handleEmailSubmit}>
          <div class="flex flex-col gap-1.5">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
              bind:value={email}
              required
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="password"
              autocomplete={mode === 'login' ? 'current-password' : 'new-password'}
              bind:value={password}
              required
            />
          </div>

          {#if mode === 'signup'}
            <div class="flex flex-col gap-1.5">
              <Label for="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                autocomplete="new-password"
                bind:value={confirmPassword}
                required
              />
            </div>
          {/if}

          <Button type="submit" class="mt-1 w-full" disabled={submitting}>
            {#if submitting}
              <LoaderCircleIcon class="size-4 animate-spin" />
            {/if}
            {mode === 'login' ? 'Log In' : 'Create Account'}
          </Button>
        </form>
      </Tabs.Root>

      {#if !redirectTo.startsWith('/admin')}
        <Button
          variant="ghost"
          size="sm"
          class="text-muted-foreground"
          disabled={submitting}
          onclick={handleGuest}
        >
          Continue as Guest
        </Button>
      {/if}
    </Card.Content>
  </Card.Root>
</div>
