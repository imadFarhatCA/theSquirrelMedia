<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let lead = $state(null);
  let loading = $state(true);
  let notFound = $state(false);
  let lang = $state('en'); // 'en' | 'fr' — driven by ?lang= URL param

  // ── Bilingual strings ─────────────────────────────────────────────
  const T = {
    en: {
      eyebrow: 'Free website audit · The Squirrel Media',
      sub: 'Here is what we found on your current site — verifiable, no sales pitch.',
      gauge_severity: 'Audit severity score',
      gauge_severity_sub: 'Higher = more urgent issues',
      gauge_pagespeed: 'Google PageSpeed (mobile)',
      gauge_pagespeed_sub: 'Google considers below 50 poor',
      check_https: 'HTTPS / SSL', secure: 'Secure', notSecure: 'Not Secure',
      check_mobile: 'Mobile-ready', responsive: 'Responsive', broken: 'Broken on phones',
      check_reach: 'Reachable', online: 'Online', down: 'Down / unreachable',
      check_fresh: 'Site freshness', current: 'Current',
      preview_label: 'Current homepage',
      what_found: 'What we found',
      what_unlock: 'What rebuilding this would unlock',
      cta_title: 'Worth a quick call?',
      cta_sub: "I'll walk you through the findings live — no pitch, no obligation.",
      cta_call: 'Call (514) 248-1548',
      cta_reply: 'Reply by email →',
      foot_prep: 'Audit prepared by',
      foot_role: 'Digital consultant · The Squirrel Media',
      not_found_title: 'Audit not found',
      not_found_sub: 'This audit link is invalid or has expired.',
      loading: 'Loading audit…',
      tier_crit: 'Critical', tier_warn: 'Needs work', tier_ok: 'Healthy', tier_unknown: 'No data', tier_urgent: 'Urgent',
    },
    fr: {
      eyebrow: 'Audit gratuit · The Squirrel Media',
      sub: 'Voici ce que nous avons trouvé sur votre site — vérifiable, sans argumentaire de vente.',
      gauge_severity: 'Score de gravité',
      gauge_severity_sub: 'Plus élevé = plus urgent',
      gauge_pagespeed: 'Google PageSpeed (mobile)',
      gauge_pagespeed_sub: 'Google considère sous 50 comme faible',
      check_https: 'HTTPS / SSL', secure: 'Sécurisé', notSecure: 'Non sécurisé',
      check_mobile: 'Mobile', responsive: 'Adaptatif', broken: 'Brisé sur mobile',
      check_reach: 'Accessibilité', online: 'En ligne', down: 'Hors ligne / inaccessible',
      check_fresh: 'Fraîcheur du site', current: 'À jour',
      preview_label: 'Page d\'accueil actuelle',
      what_found: 'Ce que nous avons trouvé',
      what_unlock: 'Ce qu\'une refonte vous apporterait',
      cta_title: 'Un court appel ?',
      cta_sub: 'Je vous explique les résultats en direct — sans argumentaire, sans engagement.',
      cta_call: 'Appeler (514) 248-1548',
      cta_reply: 'Répondre par courriel →',
      foot_prep: 'Audit préparé par',
      foot_role: 'Consultant numérique · The Squirrel Media',
      not_found_title: 'Audit introuvable',
      not_found_sub: 'Ce lien est invalide ou a expiré.',
      loading: 'Chargement de l\'audit…',
      tier_crit: 'Critique', tier_warn: 'À améliorer', tier_ok: 'Bon', tier_unknown: 'Aucune donnée', tier_urgent: 'Urgent',
    },
  };
  let t = $derived(T[lang] || T.en);

  // ── Category-specific "what rebuilding unlocks" bullets ──────────
  const CATEGORY_WINS = {
    lawyers: {
      en: [
        'Trust signals above the fold — credentials, bar admission, areas of practice',
        'Secure HTTPS + privacy policy (Law 25 + lawyer-client confidentiality)',
        'Clear consultation CTA — phone + form on every page',
        'Loads in under 2s on mobile — clients searching during a stressful moment can\'t wait',
        'Mobile-first design — half your inquiries come from phones',
        'Bilingual EN/FR — required for Quebec legal practice',
      ],
      fr: [
        'Signaux de confiance en haut de page — diplômes, barreau, domaines de pratique',
        'HTTPS sécurisé + politique de confidentialité (Loi 25 + confidentialité avocat-client)',
        'Appel à l\'action clair — téléphone + formulaire sur chaque page',
        'Chargement en moins de 2s sur mobile — un client stressé n\'attendra pas',
        'Design mobile-first — la moitié des demandes viennent du téléphone',
        'Bilingue FR/EN — requis pour la pratique au Québec',
      ],
    },
    restaurants: {
      en: [
        'Mobile-first menu — opens instantly on any phone',
        'Reservation CTA + phone number on every page',
        'Photos of the dining room and signature dishes — drives walk-ins',
        'Hours, address, map embedded — answers the three questions every customer has',
        'Loads in under 2s — diners decide in seconds',
        'Open Graph cards so the site looks great when shared on Instagram/Facebook',
      ],
      fr: [
        'Menu mobile-first — s\'ouvre instantanément sur n\'importe quel téléphone',
        'Réservation + téléphone visibles sur chaque page',
        'Photos de la salle et plats signatures — augmente les visites',
        'Heures, adresse, carte intégrée — répond aux trois questions essentielles',
        'Chargement en moins de 2s — les clients décident en quelques secondes',
        'Aperçus Open Graph — le site est élégant quand partagé sur Instagram/Facebook',
      ],
    },
    clinics: {
      en: [
        'Secure HTTPS for patient privacy (Law 25 + RAMQ compliance)',
        'Online booking integration — patients book themselves, 24/7',
        'Mobile-first — most appointment searches happen on a phone',
        'Clear services + insurance accepted — answers the first questions every patient asks',
        'Loads in under 2s — patients searching in pain won\'t wait',
        'Accessibility (WCAG) — required for healthcare in Quebec',
      ],
      fr: [
        'HTTPS sécurisé pour la confidentialité des patients (Loi 25 + RAMQ)',
        'Réservation en ligne — les patients réservent eux-mêmes, 24h/24',
        'Mobile-first — la majorité des recherches se font au téléphone',
        'Services + assurances acceptées clairement listés',
        'Chargement en moins de 2s — un patient en douleur n\'attendra pas',
        'Accessibilité (WCAG) — exigée en santé au Québec',
      ],
    },
    contractors: {
      en: [
        'Portfolio gallery — before/after photos sell the work for you',
        'Instant quote form — homeowners book themselves',
        'Licence + insurance + RBQ number visible — kills price objections early',
        'Mobile-first — most quote searches happen on a phone job site',
        'Loads in under 2s — homeowners compare 3 contractors in minutes',
        'Service area map — qualifies leads to your zone',
      ],
      fr: [
        'Galerie de portfolio — photos avant/après qui vendent à votre place',
        'Formulaire de soumission instantané — les clients réservent seuls',
        'Licence + assurance + numéro RBQ visibles — élimine les objections de prix',
        'Mobile-first — la plupart des recherches se font au téléphone',
        'Chargement en moins de 2s — les clients comparent 3 entrepreneurs en quelques minutes',
        'Carte de zone de service — qualifie les prospects à votre région',
      ],
    },
    retail: {
      en: [
        'Product gallery — what you sell at a glance',
        'Hours, address, parking — answers the first three questions',
        'Mobile-first — most pre-visit checks happen on a phone',
        'Loads in under 2s — shoppers compare 3 stores in a minute',
        'Open Graph cards — site looks pro when shared on Facebook/Instagram',
        'SEO basics — show up when locals search your category + city',
      ],
      fr: [
        'Galerie de produits — ce que vous vendez en un coup d\'œil',
        'Heures, adresse, stationnement — répond aux premières questions',
        'Mobile-first — la plupart des vérifications avant visite se font au téléphone',
        'Chargement en moins de 2s — les clients comparent 3 boutiques en une minute',
        'Aperçus Open Graph — site élégant quand partagé sur Facebook/Instagram',
      ],
    },
  };
  const DEFAULT_WINS = {
    en: [
      'Secure HTTPS — no more "Not Secure" warning',
      'Loads in under 2s on mobile',
      'Mobile-first design — works on every phone',
      'Quebec Law 25 compliant (privacy + cookies)',
      'SEO basics fixed (meta, Open Graph, structured data)',
      'Clear CTA — phone + form above the fold',
    ],
    fr: [
      'HTTPS sécurisé — fini l\'avertissement « Non sécurisé »',
      'Chargement en moins de 2s sur mobile',
      'Design mobile-first — fonctionne sur tous les téléphones',
      'Conforme à la Loi 25 du Québec (vie privée + témoins)',
      'Bases SEO corrigées (méta, Open Graph, données structurées)',
      'Appel à l\'action clair — téléphone + formulaire en haut de page',
    ],
  };
  function categoryKey(cat) {
    const k = String(cat || '').toLowerCase();
    if (/lawyer|avocat|legal/.test(k))                return 'lawyers';
    if (/restaurant|bistro|cafe|food|resto/.test(k))   return 'restaurants';
    if (/clinic|doctor|medical|dental|chiro|physio/.test(k)) return 'clinics';
    if (/contractor|construct|plumb|electric|roof/.test(k))   return 'contractors';
    if (/shop|store|retail|boutique/.test(k))          return 'retail';
    return null;
  }
  let wins = $derived(
    (CATEGORY_WINS[categoryKey(lead?.category)]?.[lang]) || DEFAULT_WINS[lang]
  );

  function slugify(input) {
    return String(input || '')
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/.*$/, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60);
  }

  // Agent Assist worker — where visit hits get logged. Swap to prod URL on deploy.
  const AGENT_API = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
    ? 'http://localhost:8788'
    : 'https://agent-assist.imad-farhat-c3c.workers.dev';

  onMount(async () => {
    const slug = $page.params.slug;
    const params = new URLSearchParams(window.location.search);
    lang = params.get('lang') === 'fr' ? 'fr' : 'en';
    try {
      const res = await fetch('/leads.json');
      const all = await res.json();
      lead = all.find(l => slugify(l.website) === slug) || all.find(l => slugify(l.name) === slug) || null;
      if (!lead) notFound = true;
    } catch {
      notFound = true;
    }
    loading = false;

    // Fire-and-forget visit ping (no await — page renders immediately)
    if (lead) {
      fetch(`${AGENT_API}/api/audit-visit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      }).catch(() => {});
    }
  });

  function copyrightYear(issues) {
    const m = (issues || []).find(i => i.startsWith('old_copyright_'));
    return m ? m.split('_')[2] : null;
  }

  function gaugeColor(score) {
    if (score == null) return '#666';
    if (score >= 80) return '#22c55e';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  }

  // Severity tier — drives the corner badge on each gauge
  function gaugeTier(score) {
    if (score == null) return { tier: 'unknown', label: t.tier_unknown, icon: 'help' };
    if (score >= 80)   return { tier: 'ok',      label: t.tier_ok,      icon: 'check' };
    if (score >= 50)   return { tier: 'warn',    label: t.tier_warn,    icon: 'warn' };
    return                       { tier: 'crit',    label: t.tier_crit,    icon: 'alert' };
  }
  // For the severity card, "high" lead_score is BAD — invert the tier mapping
  function severityTier(score) {
    if (score == null) return { tier: 'unknown', label: t.tier_unknown, icon: 'help' };
    if (score >= 60)   return { tier: 'crit',    label: t.tier_urgent,  icon: 'alert' };
    if (score >= 35)   return { tier: 'warn',    label: t.tier_warn,    icon: 'warn' };
    return                       { tier: 'ok',      label: t.tier_ok,      icon: 'check' };
  }
  function severityColor(score) {
    if (score == null) return '#666';
    if (score >= 60)   return '#ef4444';
    if (score >= 35)   return '#f59e0b';
    return '#22c55e';
  }

  let mobileScore = $derived(lead?.mobile_score ?? null);
  let hasHttps    = $derived(!(lead?.issues || []).includes('no_https'));
  let hasViewport = $derived(!(lead?.issues || []).includes('no_viewport'));
  let isReachable = $derived(!(lead?.issues || []).includes('unreachable'));
  let oldYear     = $derived(copyrightYear(lead?.issues));
  let cleanDomain = $derived(
    (lead?.website || '').replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
  );
  let sevTier = $derived(severityTier(lead?.lead_score));
  let mTier   = $derived(gaugeTier(mobileScore));

  const ISSUE_EXPLAIN = {
    no_https: {
      en: { title: 'Not Secure (No HTTPS)',     impact: 'Chrome shows a "Not Secure" warning to every visitor before they see your homepage. Google de-ranks non-HTTPS sites since 2018.', severity: 'high' },
      fr: { title: 'Non sécurisé (sans HTTPS)', impact: 'Chrome affiche un avertissement « Non sécurisé » à chaque visiteur avant même qu\'il voie votre site. Google déclasse les sites sans HTTPS depuis 2018.', severity: 'high' },
    },
    no_viewport: {
      en: { title: 'No Mobile Viewport',     impact: '63% of web traffic is mobile (Statista 2024). Without a mobile viewport, the layout breaks on phones — visitors bounce.', severity: 'high' },
      fr: { title: 'Aucun viewport mobile',  impact: '63 % du trafic web est mobile (Statista 2024). Sans viewport mobile, la mise en page se brise sur téléphone — les visiteurs partent.', severity: 'high' },
    },
    low_mobile_score: {
      en: { title: 'Slow on Mobile',         impact: '53% of mobile users abandon a site that takes more than 3s to load (Google). Slow sites cost you ~40% of mobile visitors.', severity: 'high' },
      fr: { title: 'Lent sur mobile',        impact: '53 % des utilisateurs mobiles abandonnent un site qui prend plus de 3 secondes à charger (Google). Vous perdez ~40 % des visiteurs mobiles.', severity: 'high' },
    },
    unreachable: {
      en: { title: 'Site Currently Down',    impact: 'Your domain does not respond. Every potential customer searching for you sees nothing — or worse, a competitor.', severity: 'critical' },
      fr: { title: 'Site hors ligne',         impact: 'Votre domaine ne répond pas. Chaque client potentiel qui vous cherche ne voit rien — ou pire, un concurrent.', severity: 'critical' },
    },
    no_website: {
      en: { title: 'No Website Detected',    impact: 'Without a site, you are invisible to ~80% of customers who research online before choosing a local business.', severity: 'critical' },
      fr: { title: 'Aucun site détecté',     impact: 'Sans site, vous êtes invisible pour ~80 % des clients qui font une recherche en ligne avant de choisir un commerce local.', severity: 'critical' },
    },
  };
  const SEVERITY_LABEL = {
    en: { high: 'high', critical: 'critical', medium: 'medium' },
    fr: { high: 'élevé', critical: 'critique', medium: 'moyen' },
  };

  function describeIssue(slug) {
    if (slug.startsWith('old_copyright_')) {
      const y = slug.split('_')[2];
      const age = new Date().getFullYear() - parseInt(y);
      return lang === 'fr'
        ? { title: `Droit d\'auteur © ${y}`, impact: `Un pied de page de ${age} ans signale « inactif » ou « fermé » aux visiteurs. 75 % des utilisateurs jugent la crédibilité d\'après le design (Stanford).`, severity: 'medium' }
        : { title: `Copyright © ${y}`,        impact: `A ${age}-year-old footer signals "inactive" or "closed" to visitors. 75% of users judge credibility by design alone (Stanford).`,                          severity: 'medium' };
    }
    return ISSUE_EXPLAIN[slug]?.[lang]
      || ISSUE_EXPLAIN[slug]?.en
      || { title: slug.replace(/_/g, ' '), impact: '', severity: 'medium' };
  }
</script>

<svelte:head>
  <title>{lead?.name ? `${lead.name} — Website Audit` : 'Website Audit'} · The Squirrel Media</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="audit-page">
  {#if loading}
    <div class="state">{t.loading}</div>
  {:else if notFound}
    <div class="state">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>
      <h1>{t.not_found_title}</h1>
      <p>{t.not_found_sub}</p>
    </div>
  {:else}
    <!-- Hero -->
    <header class="hero">
      <div class="hero-eyebrow">{t.eyebrow}</div>
      <h1 class="hero-title">{lead.name}</h1>
      {#if cleanDomain}
        <a href={lead.website} target="_blank" rel="noopener" class="hero-domain">
          {cleanDomain}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>
        </a>
      {/if}
      <p class="hero-sub">{t.sub}</p>
    </header>

    <!-- Score row -->
    <section class="gauges">
      <div class="gauge-card tier-{sevTier.tier}">
        <span class="tier-badge tier-{sevTier.tier}">
          {#if sevTier.icon === 'alert'}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>
          {:else if sevTier.icon === 'warn'}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>
          {:else if sevTier.icon === 'check'}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          {:else}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/></svg>
          {/if}
          {sevTier.label}
        </span>
        <div class="gauge {sevTier.tier === 'crit' ? 'pulse' : ''}">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#3a3a3f" stroke-width="10" />
            <circle cx="60" cy="60" r="50" fill="none"
              stroke={severityColor(lead.lead_score)}
              stroke-width="10"
              stroke-dasharray="{(lead.lead_score / 100) * 314} 314"
              stroke-linecap="round"
              transform="rotate(-90 60 60)" />
          </svg>
          <div class="gauge-num" style="color:{severityColor(lead.lead_score)}">{lead.lead_score}</div>
        </div>
        <div class="gauge-label">{t.gauge_severity}</div>
        <div class="gauge-sub">{t.gauge_severity_sub}</div>
      </div>

      <div class="gauge-card tier-{mTier.tier}">
        <span class="tier-badge tier-{mTier.tier}">
          {#if mTier.icon === 'alert'}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>
          {:else if mTier.icon === 'warn'}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>
          {:else if mTier.icon === 'check'}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          {:else}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/></svg>
          {/if}
          {mTier.label}
        </span>
        <div class="gauge {mTier.tier === 'crit' ? 'pulse' : ''}">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#3a3a3f" stroke-width="10" />
            <circle cx="60" cy="60" r="50" fill="none"
              stroke={gaugeColor(mobileScore)}
              stroke-width="10"
              stroke-dasharray="{((mobileScore ?? 0) / 100) * 314} 314"
              stroke-linecap="round"
              transform="rotate(-90 60 60)" />
          </svg>
          <div class="gauge-num" style="color:{gaugeColor(mobileScore)}">{mobileScore ?? '—'}</div>
        </div>
        <div class="gauge-label">{t.gauge_pagespeed}</div>
        <div class="gauge-sub">{t.gauge_pagespeed_sub}</div>
      </div>
    </section>

    <!-- Status row -->
    <section class="checks">
      <div class="check {hasHttps ? 'ok' : 'bad'}">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          {#if hasHttps}
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/>
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
          {/if}
        </svg>
        <div>
          <div class="check-title">{t.check_https}</div>
          <div class="check-val">{hasHttps ? t.secure : t.notSecure}</div>
        </div>
      </div>
      <div class="check {hasViewport ? 'ok' : 'bad'}">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/></svg>
        <div>
          <div class="check-title">{t.check_mobile}</div>
          <div class="check-val">{hasViewport ? t.responsive : t.broken}</div>
        </div>
      </div>
      <div class="check {isReachable ? 'ok' : 'bad'}">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <div>
          <div class="check-title">{t.check_reach}</div>
          <div class="check-val">{isReachable ? t.online : t.down}</div>
        </div>
      </div>
      <div class="check {oldYear ? 'bad' : 'ok'}">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>
        <div>
          <div class="check-title">{t.check_fresh}</div>
          <div class="check-val">{oldYear ? `© ${oldYear}` : t.current}</div>
        </div>
      </div>
    </section>

    <!-- Site preview -->
    {#if lead.website && isReachable}
      <section class="preview">
        <div class="preview-label">{t.preview_label}</div>
        <img
          class="preview-shot"
          src="https://image.thum.io/get/width/900/{lead.website}"
          alt="Screenshot of {cleanDomain}"
          loading="lazy"
        />
      </section>
    {/if}

    <!-- Issues -->
    {#if lead.issues?.length}
      <section class="issues">
        <h2 class="section-title">{t.what_found} ({lead.issues.length})</h2>
        <div class="issues-list">
          {#each lead.issues as slug}
            {@const x = describeIssue(slug)}
            <article class="issue-card sev-{x.severity}">
              <div class="issue-head">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>
                <span class="issue-name">{x.title}</span>
                <span class="issue-sev">{SEVERITY_LABEL[lang]?.[x.severity] || x.severity}</span>
              </div>
              {#if x.impact}<p class="issue-impact">{x.impact}</p>{/if}
            </article>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Wins (category-aware) -->
    <section class="wins">
      <h2 class="section-title">{t.what_unlock}</h2>
      <div class="wins-grid">
        {#each wins as bullet}
          <div class="win"><span class="win-dot"></span> {bullet}</div>
        {/each}
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <h2>{t.cta_title}</h2>
      <p>{t.cta_sub}</p>
      <div class="cta-row">
        <a class="cta-btn primary" href="tel:+15142481548">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
          {t.cta_call}
        </a>
        <a class="cta-btn ghost" href="mailto:hello@thesquirrelmedia.com?subject=Re%3A%20{encodeURIComponent(lead.name)}%20audit">
          {t.cta_reply}
        </a>
      </div>
    </section>

    <footer class="foot">
      <div>{t.foot_prep} <strong>Imad Farhat</strong> — {t.foot_role}</div>
      <div class="foot-meta">101-3940 St-Elzéar, Laval QC H7P 0N4 · <a href="tel:+15142481548">(514) 248-1548</a> · <a href="mailto:hello@thesquirrelmedia.com">hello@thesquirrelmedia.com</a></div>
    </footer>
  {/if}
</div>

<style>
  /* Audit-only palette — lighter than the rest of the site so the data feels
     premium and readable, but still Squirrel Media (dark + purple accent). */
  :global(body):has(.audit-page) {
    background: #1a1a1d;
  }
  .audit-page {
    max-width: 880px; margin: 0 auto;
    padding: 60px 24px 80px;
    color: #f5f5f5;
    font-family: var(--font, sans-serif);
    /* Subtle vertical gradient for depth */
    background:
      radial-gradient(circle at 50% -10%, rgba(168,85,247,0.08) 0%, transparent 50%),
      linear-gradient(180deg, #232327 0%, #1a1a1d 60%);
    background-attachment: fixed;
    min-height: 100vh;
  }
  .state {
    text-align: center; padding: 120px 24px; color: var(--color-text-muted);
    display: flex; flex-direction: column; align-items: center; gap: 12px;
  }
  .state :global(svg) { color: var(--color-accent); }

  /* Hero */
  .hero { text-align: center; margin-bottom: 48px; }
  .hero-eyebrow {
    display: inline-block; font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .12em;
    color: var(--color-accent); background: var(--color-accent-glow);
    padding: 6px 14px; border-radius: 99px; margin-bottom: 20px;
    border: 1px solid rgba(168,85,247,0.25);
  }
  .hero-title {
    font-size: clamp(2rem, 5vw, 3rem); font-weight: 800;
    letter-spacing: -.03em; line-height: 1.05;
  }
  .hero-domain {
    display: inline-flex; align-items: center; gap: 6px;
    color: var(--color-accent); font-size: 14px; font-weight: 600;
    margin-top: 10px; text-decoration: none;
  }
  .hero-domain:hover { color: var(--color-accent-hover); }
  .hero-sub { color: var(--color-text-muted); font-size: 15px; margin-top: 16px; line-height: 1.6; }

  /* Gauges */
  .gauges { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px; }
  .gauge-card {
    position: relative;
    background: #26262a; border: 1px solid #34343a;
    border-radius: 16px; padding: 28px 24px 24px; text-align: center;
    overflow: hidden;
  }
  .gauge-card.tier-crit { border-color: rgba(239,68,68,0.35); }
  .gauge-card.tier-warn { border-color: rgba(245,158,11,0.35); }
  .gauge-card.tier-ok   { border-color: rgba(34,197,94,0.30); }
  /* Glowing top edge */
  .gauge-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: var(--tier-glow, transparent);
    opacity: 0; transition: opacity .3s;
  }
  .gauge-card.tier-crit { --tier-glow: linear-gradient(90deg, transparent, #ef4444, transparent); }
  .gauge-card.tier-warn { --tier-glow: linear-gradient(90deg, transparent, #f59e0b, transparent); }
  .gauge-card.tier-ok   { --tier-glow: linear-gradient(90deg, transparent, #22c55e, transparent); }
  .gauge-card.tier-crit::before,
  .gauge-card.tier-warn::before,
  .gauge-card.tier-ok::before { opacity: 1; }

  /* Severity badge in top-right corner */
  .tier-badge {
    position: absolute; top: 12px; right: 12px;
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em;
    padding: 5px 10px; border-radius: 99px;
    border: 1px solid transparent;
  }
  .tier-badge.tier-crit {
    background: rgba(239,68,68,0.12); color: #ef4444; border-color: rgba(239,68,68,0.3);
    animation: badge-pulse 1.6s ease-in-out infinite;
  }
  .tier-badge.tier-warn { background: rgba(245,158,11,0.12); color: #f59e0b; border-color: rgba(245,158,11,0.3); }
  .tier-badge.tier-ok   { background: rgba(34,197,94,0.12);  color: #22c55e; border-color: rgba(34,197,94,0.3); }
  .tier-badge.tier-unknown { background: rgba(255,255,255,0.05); color: var(--color-text-muted); border-color: var(--color-border); }

  @keyframes badge-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.5); }
    50%      { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
  }

  .gauge { position: relative; width: 120px; height: 120px; margin: 0 auto 14px; }
  .gauge.pulse { animation: gauge-pulse 2s ease-in-out infinite; }
  @keyframes gauge-pulse {
    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(239,68,68,0)); }
    50%      { transform: scale(1.04); filter: drop-shadow(0 0 16px rgba(239,68,68,0.5)); }
  }
  .gauge svg { width: 100%; height: 100%; }
  .gauge-num {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 30px; font-weight: 800; letter-spacing: -.03em;
  }
  .gauge-label { font-size: 20px; font-weight: 800; color: var(--color-text); letter-spacing: -.02em; line-height: 1.2; }
  .gauge-sub { font-size: 14px; color: var(--color-text-muted); margin-top: 8px; }

  /* Checks */
  .checks { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 32px; }
  .check {
    display: flex; align-items: center; gap: 14px;
    background: #26262a; border: 1px solid #34343a;
    border-radius: 12px; padding: 16px;
  }
  .check.ok { border-color: rgba(34,197,94,0.25); }
  .check.ok :global(svg) { color: #22c55e; }
  .check.bad {
    border-color: rgba(239,68,68,0.6);
    background: rgba(239,68,68,0.12);
    box-shadow: 0 0 0 1px rgba(239,68,68,0.25), 0 4px 16px rgba(239,68,68,0.15);
  }
  .check.bad :global(svg) { color: #ff5757; filter: drop-shadow(0 0 6px rgba(239,68,68,0.6)); }
  .check.bad .check-val { color: #ff5757; }
  .check-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--color-text-muted); }
  .check-val { font-size: 14px; font-weight: 700; color: var(--color-text); margin-top: 2px; }

  /* Preview */
  .preview { margin-bottom: 32px; }
  .preview-label {
    font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em;
    color: var(--color-text-muted); margin-bottom: 10px;
  }
  .preview-shot {
    width: 100%; border: 1px solid #34343a; border-radius: 14px;
    box-shadow: 0 8px 32px rgba(0,0,0,.5);
  }

  /* Issues */
  .section-title { font-size: 1.25rem; font-weight: 800; margin-bottom: 16px; letter-spacing: -.02em; }
  .issues { margin-bottom: 32px; }
  .issues-list { display: flex; flex-direction: column; gap: 10px; }
  .issue-card {
    background: #26262a; border: 1px solid #34343a;
    border-left: 4px solid #f59e0b;
    border-radius: 12px; padding: 16px;
  }
  .issue-card.sev-high { border-left-color: #ef4444; }
  .issue-card.sev-critical { border-left-color: #dc2626; background: rgba(239,68,68,0.04); }
  .issue-head { display: flex; align-items: center; gap: 10px; }
  .issue-head :global(svg) { color: #ef4444; }
  .issue-name { font-weight: 700; font-size: 14px; flex: 1; color: var(--color-text); }
  .issue-sev {
    font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em;
    padding: 3px 9px; border-radius: 99px;
    background: rgba(239,68,68,0.15); color: #ef4444;
  }
  .issue-impact { font-size: 13px; color: var(--color-text-muted); line-height: 1.6; margin-top: 8px; }

  /* Wins */
  .wins { margin-bottom: 40px; }
  .wins-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .win {
    display: flex; align-items: center; gap: 10px;
    font-size: 13px; color: var(--color-text);
    background: var(--color-accent-glow); border: 1px solid rgba(168,85,247,0.25);
    padding: 12px 14px; border-radius: 10px;
  }
  .win-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--color-accent); flex-shrink: 0;
    box-shadow: 0 0 8px var(--color-accent);
  }

  /* CTA */
  .cta {
    background: linear-gradient(135deg, var(--color-accent) 0%, #7c3aed 100%);
    color: #fff; border-radius: 20px; padding: 40px 32px;
    text-align: center; margin-bottom: 28px;
    box-shadow: 0 20px 60px rgba(168,85,247,0.25);
  }
  .cta h2 { font-size: 1.75rem; font-weight: 800; margin-bottom: 10px; letter-spacing: -.02em; }
  .cta p { color: rgba(255,255,255,.9); font-size: 15px; margin-bottom: 24px; line-height: 1.6; }
  .cta-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .cta-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 24px; border-radius: 99px;
    font-size: 14px; font-weight: 700; text-decoration: none;
    transition: all .2s;
  }
  .cta-btn.primary { background: #fff; color: #7c3aed; }
  .cta-btn.primary:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,.25); }
  .cta-btn.ghost { background: rgba(255,255,255,.12); color: #fff; border: 1.5px solid rgba(255,255,255,.3); }
  .cta-btn.ghost:hover { background: rgba(255,255,255,.2); }

  .foot {
    text-align: center; font-size: 12px; color: var(--color-text-dim);
    padding-top: 20px; border-top: 1px solid var(--color-border);
    line-height: 1.7;
  }
  .foot-meta { margin-top: 6px; font-size: 11px; }
  .foot-meta a { color: var(--color-text-muted); }
  .foot-meta a:hover { color: var(--color-accent); }

  @media (max-width: 600px) {
    .gauges, .checks, .wins-grid { grid-template-columns: 1fr; }
  }
</style>
