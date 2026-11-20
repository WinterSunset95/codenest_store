<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { toast } from 'svelte-sonner';
  import { updateProfile } from 'firebase/auth';
  import { authStore } from '#lib/stores/auth.svelte.ts';

  import * as Card from '#lib/components/ui/card/index.ts';
  import * as Tabs from '#lib/components/ui/tabs/index.ts';
  import { Button } from '#lib/components/ui/button/index.ts';
  import { Input } from '#lib/components/ui/input/index.ts';
  import { Label } from '#lib/components/ui/label/index.ts';
  
  // Lucide icons replacing the Google Material Symbols font
  import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
  import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
  import CodeIcon from '@lucide/svelte/icons/code';
  import MailIcon from '@lucide/svelte/icons/mail';
  import LockIcon from '@lucide/svelte/icons/lock';
  import EyeIcon from '@lucide/svelte/icons/eye';
  import EyeOffIcon from '@lucide/svelte/icons/eye-off';
  import UserIcon from '@lucide/svelte/icons/user';
  import LoaderCircleIcon from '@lucide/svelte/icons/loader-circle';

  let mode = $state<'login' | 'signup'>('login');
  let gamerName = $state('');
  let email = $state('');
  let password = $state('');
  let showPassword = $state(false);
  let submitting = $state(false);

  const redirectTo = $derived(page.url.searchParams.get('redirect') || '/');

  // Bounce authenticated (non-anonymous) users to their destination
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

    submitting = true;
    try {
      if (mode === 'login') {
        await authStore.loginWithEmail(email.trim(), password);
        toast.success('Signed in successfully.');
      } else {
        const cred = await authStore.signupWithEmail(email.trim(), password);
        if (cred.user && gamerName.trim()) {
          // Save the Gamer Name to the Identity Platform profile
          await updateProfile(cred.user, { displayName: gamerName.trim() });
        }
        toast.success('Account created! Welcome to CodeNest.');
      }
      await goto(redirectTo, { replace: true });
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
      await goto(redirectTo, { replace: true });
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
      await goto('/', { replace: true });
    } catch (err) {
      toast.error(formatAuthError(err));
    } finally {
      submitting = false;
    }
  }
</script>

<div class="flex min-h-screen flex-col justify-between bg-background px-4 py-6 sm:px-6">
  <!-- Top Back Link -->
  <header class="mx-auto flex w-full max-w-md items-center justify-between">
    <a 
      href="/" 
      class="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeftIcon class="size-4" />
      Back to store
    </a>
    <span class="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-500">
      <ShieldCheckIcon class="size-4" />
      Razorpay Secured
    </span>
  </header>

  <!-- Centered Auth Card -->
  <main class="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 py-10">
    <div class="flex flex-col items-center gap-2 text-center">
      <div class="flex size-12 items-center justify-center rounded-xl border bg-muted/50 text-primary shadow-sm">
        <CodeIcon class="size-6" />
      </div>
      <h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">CodeNest Store</h1>
      <p class="text-sm text-muted-foreground">Track orders and save your game IDs.</p>
    </div>

    <Card.Root class="border-border bg-card/50 shadow-lg backdrop-blur-sm">
      <Card.Content class="flex flex-col gap-6 p-6">
        
        <Tabs.Root bind:value={mode} class="w-full">
          <Tabs.List class="grid w-full grid-cols-2">
            <Tabs.Trigger value="login">Log In</Tabs.Trigger>
            <Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
          </Tabs.List>

          <!-- Shared OAuth Button -->
          <div class="mt-6 flex flex-col gap-4">
            <Button 
              type="button" 
              variant="outline" 
              class="w-full gap-2 bg-background hover:bg-muted" 
              disabled={submitting}
              onclick={handleGoogle}
            >
              {#if submitting}
                <LoaderCircleIcon class="size-4 animate-spin" />
              {:else}
                <svg class="size-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.8-5.5 3.8-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.4 14.6 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12s4.3 9.5 9.5 9.5c5.5 0 9.1-3.8 9.1-9.2 0-.6-.1-1.1-.2-1.6H12z"/>
                </svg>
              {/if}
              Continue with Google
            </Button>

            <div class="flex items-center gap-3">
              <div class="h-px flex-1 bg-border"></div>
              <span class="text-xs text-muted-foreground">or with email</span>
              <div class="h-px flex-1 bg-border"></div>
            </div>
          </div>

          <form class="mt-4 flex flex-col gap-4" onsubmit={handleEmailSubmit}>
            
            <!-- Gamer Name (Only on Signup) -->
            {#if mode === 'signup'}
              <div class="flex flex-col gap-1.5">
                <Label for="gamerName">Gamer Name</Label>
                <div class="relative">
                  <UserIcon class="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input 
                    id="gamerName" 
                    type="text" 
                    placeholder="e.g. Kael_MLBB" 
                    autocomplete="name" 
                    bind:value={gamerName}
                    class="pl-9" 
                  />
                </div>
              </div>
            {/if}

            <!-- Email -->
            <div class="flex flex-col gap-1.5">
              <Label for="email">Email</Label>
              <div class="relative">
                <MailIcon class="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="player@gmail.com" 
                  autocomplete="email" 
                  required
                  bind:value={email}
                  class="pl-9" 
                />
              </div>
            </div>

            <!-- Password -->
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <Label for="password">Password</Label>
                {#if mode === 'login'}
                  <button type="button" class="text-xs font-medium text-primary hover:underline">
                    Forgot password?
                  </button>
                {/if}
              </div>
              <div class="relative">
                <LockIcon class="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder={mode === 'signup' ? 'Minimum 6 characters' : 'Enter your password'} 
                  autocomplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  required
                  bind:value={password}
                  class="px-9" 
                />
                <button 
                  type="button" 
                  class="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                  aria-label="Toggle password visibility"
                  onclick={() => (showPassword = !showPassword)}
                >
                  {#if showPassword}
                    <EyeOffIcon class="size-4" />
                  {:else}
                    <EyeIcon class="size-4" />
                  {/if}
                </button>
              </div>
            </div>

            <Button type="submit" class="mt-2 w-full font-semibold" disabled={submitting}>
              {#if submitting}
                <LoaderCircleIcon class="mr-2 size-4 animate-spin" />
              {/if}
              {mode === 'login' ? 'Log In to CodeNest' : 'Create Account'}
            </Button>
          </form>
        </Tabs.Root>
      </Card.Content>
    </Card.Root>
  </main>

  <!-- Guest Footer -->
  <footer class="mx-auto flex w-full max-w-md justify-center pb-4">
    {#if !redirectTo.startsWith('/admin')}
      <button 
        type="button"
        class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        disabled={submitting}
        onclick={handleGuest}
      >
        No account needed—continue as Guest
      </button>
    {/if}
  </footer>
</div>
