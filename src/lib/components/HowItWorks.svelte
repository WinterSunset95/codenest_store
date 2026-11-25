<script lang="ts">
  import Gamepad2Icon from '@lucide/svelte/icons/gamepad-2';
  import QrCodeIcon from '@lucide/svelte/icons/qr-code';
  import ZapIcon from '@lucide/svelte/icons/zap';
  import { Button } from '#lib/components/ui/button/index.ts';
  import MessageCircleIcon from '@lucide/svelte/icons/message-circle';

  const steps = [
    {
      title: "Pick Pack & ID",
      description: "Select your game, enter your Player/Zone ID, and choose a recharge pack.",
      icon: Gamepad2Icon,
    },
    {
      title: "Pay & Upload UTR",
      description: "Pay securely via UPI. Upload the screenshot and enter the 12-digit UTR.",
      icon: QrCodeIcon,
    },
    {
      title: "Fast Delivery",
      description: "Our admins verify the payment instantly and deliver the recharge to your account.",
      icon: ZapIcon,
    }
  ];
</script>

<section class="flex flex-col gap-6 rounded-2xl bg-muted/40 px-4 py-8 sm:px-8 sm:py-12 my-8 border border-border">
  <div class="flex flex-col items-center text-center gap-2">
    <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">How CodeNest Works</h2>
    <p class="text-sm text-muted-foreground max-w-lg">
      We bypass the expensive official gateways to give you the lowest INR rates using manual UPI verification.
    </p>
  </div>

  <div class="grid gap-6 sm:grid-cols-3 sm:gap-8 mt-4">
    {#each steps as step, i}
      {@const Icon = step.icon}
      <div class="flex flex-col items-center text-center gap-3 relative">
        <!-- Connecting line for desktop -->
        {#if i !== 2}
          <div class="hidden sm:block absolute top-6 left-[60%] w-[80%] h-px bg-border z-0"></div>
        {/if}
        
        <div class="relative z-10 flex size-12 items-center justify-center rounded-full bg-background border shadow-sm text-primary">
          <Icon class="size-5" />
        </div>
        <h3 class="font-semibold text-foreground mt-2">{i + 1}. {step.title}</h3>
        <p class="text-sm text-muted-foreground text-balance">
          {step.description}
        </p>
      </div>
    {/each}
  </div>

  <div class="mt-4 flex justify-center">
    <Button 
      href="https://wa.me/916009341754" 
      target="_blank" 
      variant="outline" 
      class="gap-2 rounded-full border-emerald-500/20 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 hover:text-emerald-700"
    >
      <MessageCircleIcon class="size-4" />
      Need help? Ping us on WhatsApp
    </Button>
  </div>
</section>
