<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  // Where the unsubscribe API lives. Point at Agent Assist for now; swap to a public
  // worker route or thesquirrelmedia.com/api/unsubscribe when production wiring is in place.
  const API_BASE = 'https://agent-assist.imad-farhat-c3c.workers.dev';

  let email = $state('');
  let state = $state('idle'); // idle | submitting | done | error
  let errorMsg = $state('');
  let lang = $state('en');

  const T = {
    en: {
      title_done: "You're unsubscribed",
      done_body: "We've removed",
      done_body_2: "from our outreach list. You won't hear from us again.",
      done_small: 'If this was a mistake, just reply to any past email and we\'ll re-add you.',
      back: '← Back to thesquirrelmedia.com',
      title: 'Unsubscribe',
      sub: "Confirm the email below and we'll remove you from our outreach list immediately.",
      label: 'Your email',
      placeholder: 'you@example.com',
      btn: 'Unsubscribe me',
      btn_loading: 'Removing…',
      err_invalid: 'Please enter a valid email.',
      err_server: 'Could not process your request. Please email hello@thesquirrelmedia.com to be removed manually.',
      casl: 'Required by Canadian Anti-Spam Law (CASL).',
      sender: 'Sender:',
    },
    fr: {
      title_done: 'Vous êtes désinscrit',
      done_body: 'Nous avons retiré',
      done_body_2: 'de notre liste de prospection. Vous ne recevrez plus rien de nous.',
      done_small: 'Si c\'est une erreur, répondez simplement à n\'importe quel courriel précédent et on vous réinscrit.',
      back: '← Retour vers thesquirrelmedia.com',
      title: 'Désinscription',
      sub: 'Confirmez le courriel ci-dessous et nous vous retirons immédiatement de notre liste.',
      label: 'Votre courriel',
      placeholder: 'vous@exemple.com',
      btn: 'Me désinscrire',
      btn_loading: 'Suppression…',
      err_invalid: 'Veuillez entrer un courriel valide.',
      err_server: 'Impossible de traiter votre demande. Écrivez à hello@thesquirrelmedia.com pour être retiré manuellement.',
      casl: 'Requis par la Loi canadienne anti-pourriel (LCAP).',
      sender: 'Expéditeur :',
    },
  };
  let t = $derived(T[lang] || T.en);

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    email = params.get('e') || '';
    lang = params.get('lang') === 'fr' ? 'fr' : 'en';
  });

  async function submit() {
    if (!email || !email.includes('@')) {
      state = 'error';
      errorMsg = t.err_invalid;
      return;
    }
    state = 'submitting';
    errorMsg = '';
    try {
      const res = await fetch(`${API_BASE}/api/unsubscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(`server returned ${res.status}`);
      state = 'done';
    } catch (e) {
      state = 'error';
      errorMsg = t.err_server;
    }
  }
</script>

<svelte:head>
  <title>Unsubscribe · The Squirrel Media</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="unsub-page">
  <div class="card">
    {#if state === 'done'}
      <div class="icon-wrap ok">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </div>
      <h1>{t.title_done}</h1>
      <p>{t.done_body} <strong>{email}</strong> {t.done_body_2}</p>
      <p class="small">{t.done_small}</p>
      <a class="back" href="/">{t.back}</a>
    {:else}
      <div class="icon-wrap">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"/></svg>
      </div>
      <h1>{t.title}</h1>
      <p>{t.sub}</p>

      <label class="field">
        <span class="label">{t.label}</span>
        <input
          type="email"
          bind:value={email}
          placeholder={t.placeholder}
          disabled={state === 'submitting'}
        />
      </label>

      {#if state === 'error'}
        <p class="error">{errorMsg}</p>
      {/if}

      <button class="btn" onclick={submit} disabled={state === 'submitting' || !email}>
        {state === 'submitting' ? t.btn_loading : t.btn}
      </button>

      <p class="small">{t.casl}<br/>
      {t.sender} The Squirrel Media · 101-3940 St-Elzéar, Laval QC H7P 0N4</p>
    {/if}
  </div>
</div>

<style>
  .unsub-page {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    padding: 40px 24px;
    font-family: var(--font, sans-serif);
    color: var(--color-text, #f5f5f5);
  }
  .card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 18px;
    padding: 48px 36px;
    max-width: 440px; width: 100%;
    text-align: center;
  }
  .icon-wrap {
    width: 72px; height: 72px; border-radius: 18px;
    background: var(--color-accent-glow);
    color: var(--color-accent);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px;
    border: 1px solid rgba(168,85,247,0.25);
  }
  .icon-wrap.ok {
    background: rgba(34,197,94,0.12);
    color: #22c55e;
    border-color: rgba(34,197,94,0.3);
  }
  h1 { font-size: 1.5rem; font-weight: 800; letter-spacing: -.02em; margin-bottom: 10px; }
  p { color: var(--color-text-muted); font-size: 14px; line-height: 1.6; margin-bottom: 8px; }
  p.small { font-size: 12px; color: var(--color-text-dim); margin-top: 20px; }
  p.error { color: #ef4444; font-size: 13px; margin-top: 10px; }

  .field { display: block; text-align: left; margin: 24px 0 12px; }
  .label {
    display: block; font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .08em;
    color: var(--color-text-muted); margin-bottom: 6px;
  }
  input {
    width: 100%; padding: 12px 14px;
    background: var(--color-bg);
    border: 1.5px solid var(--color-border); border-radius: 10px;
    color: var(--color-text); font-family: inherit; font-size: 14px;
    outline: none; transition: border-color .15s;
  }
  input:focus { border-color: var(--color-accent); }
  input:disabled { opacity: .6; }

  .btn {
    width: 100%; padding: 13px 20px;
    background: var(--color-accent);
    color: #fff; font-weight: 700; font-size: 14px;
    border: none; border-radius: 10px;
    cursor: pointer; transition: all .15s;
    margin-top: 8px;
  }
  .btn:hover:not(:disabled) { background: var(--color-accent-hover); }
  .btn:disabled { opacity: .5; cursor: not-allowed; }

  .back {
    display: inline-block; margin-top: 20px;
    color: var(--color-text-muted); font-size: 13px; text-decoration: none;
  }
  .back:hover { color: var(--color-accent); }
</style>
