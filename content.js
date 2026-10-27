(function () {
  'use strict';

  // Réglages
  const PAUSE_MIN_S = 8;      // pause minimale entre deux comptes (secondes)
  const PAUSE_MAX_S = 20;     // pause maximale
  const MAX_PAR_SESSION = 25; // le script se met en pause après ce nombre de comptes traités
  const ATTENTE_MAX_MS = 20000;

  // Liste vérifiée de https://blockfacho.readymoss8.chatgpt.site (accounts.js, 27/10/2026).
  // Supprimez les lignes des comptes que vous ne voulez pas bloquer.
  const LISTE = [
    ['MLP_officiel', "Marine Le Pen — RN"],
    ['J_Bardella', "Jordan Bardella — RN"],
    ['RNational_off', "Rassemblement National — RN"],
    ['ZemmourEric', "Éric Zemmour — Reconquête"],
    ['Coll_Nemesis', "Collectif Némésis — Groupes"],
    ['alexandreloubet', "Alexandre Loubet — RN"],
    ['ASabatou', "Alexandre Sabatou — RN"],
    ['alexisjollyrn', "Alexis Jolly — RN"],
    ['CordierAlice2', "Alice Cordier — Groupes"],
    ['angelique_ranc', "Angélique Ranc — RN"],
    ['annesicard1', "Anne Sicard — RN"],
    ['AntBoulogne54', "Anthony Boulogne — RN"],
    ['villedieu_a', "Antoine Villedieu — RN"],
    ['Au_Evrard', "Auguste Evrard — RN"],
    ['A_Dutremble', "Aurélien Dutremble — RN"],
    ['BChaumeil_RN', "Bernard Chaumeil — RN"],
    ['BrunoBilde', "Bruno Bilde — RN"],
    ['BrunoClavet', "Bruno Clavet — RN"],
    ['ROULLAUDBEATRIC', "Béatrice Roullaud — RN"],
    ['CColombier_RN', "Caroline Colombier — RN"],
    ['Parmentier_RN', "Caroline Parmentier — RN"],
    ['cathRimbert84', "Catherine Rimbert — RN"],
    ['BentzChristophe', "Christophe Bentz — RN"],
    ['TribuianiCyril', "Cyril Tribuiani — RN"],
    ['DamienRieu', "Damien Rieu — Autres"],
    ['EddyCasterman', "Eddy Casterman — RN"],
    ['EmericSalmon', "Emeric Salmon — RN"],
    ['BlairyEmmanuel', "Emmanuel Blairy — RN"],
    ['e_Fouquart', "Emmanuel Fouquart — RN"],
    ['F_Desouche', "Fdesouche — Groupes"],
    ['Flo_Joubert', "Florence Joubert — RN"],
    ['franckallisio', "Franck Allisio — RN"],
    ['Boccaletti83', "Frédéric Boccaletti — RN"],
    ['Fredericvo79738', "Frédéric-Pierre Vos — RN"],
    ['G_Dussausaye', "Gaëtan Dussausaye — RN"],
    ['gisele_lelouis', "Gisèle Lelouis — RN"],
    ['Guillaume_Bigot', "Guillaume Bigot — RN"],
    ['GrangierGe', "Géraldine Grangier — RN"],
    ['H2Lepinau', "Hervé de Lépinau — RN"],
    ['HeleneLaporteRN', "Hélène Laporte — RN"],
    ['Jphtanguy', "Jean-Philippe Tanguy — RN"],
    ['JocelynDessigny', "Jocelyn Dessigny — RN"],
    ['JonathanGery_AN', "Jonathan Gery — RN"],
    ['jordan_guitton', "Jordan Guitton — RN"],
    ['JorysB3', "Jorys Bovet — RN"],
    ['beaurainjose', "José Beaurain — RN"],
    ['JoelleMelinRN', "Joëlle Mélin — RN"],
    ['JLechanteux', "Julie Lechanteux — RN"],
    ['JulienGabarron', "Julien Gabarron — RN"],
    ['julien_limongi', "Julien Limongi — RN"],
    ['JulienOdoul', "Julien Odoul — RN"],
    ['J_Rancoule', "Julien Rancoule — RN"],
    ['JRochedy', "Julien Rochedy — Autres"],
    ['jerome_buisson', "Jérôme Buisson — RN"],
    ['MauvieuxKevin', "Kévin Mauvieux — RN"],
    ['k_pfeffer', "Kévin Pfeffer — RN"],
    ['ljacobelli', "Laurent Jacobelli — RN"],
    ['Lionel_Tivoli', "Lionel Tivoli — RN"],
    ['MarcDeFleurian', "Marc de Fleurian — RN"],
    ['FranceLorho', "Marie-France Lorho — RN"],
    ['marine_hamelet', "Marine Hamelet — RN"],
    ['MarionMarechal', "Marion Maréchal — Autres"],
    ['MatthiasRN', "Matthias Renault — RN"],
    ['MarchioMatthieu', "Matthieu Marchio — RN"],
    ['MaximeAmblard5', "Maxime Amblard — RN"],
    ['TaverneMichael', "Michaël Taverne — RN"],
    ['MichelGuiniot', "Michel Guiniot — RN"],
    ['MichleMartinez3', "Michèle Martinez — RN"],
    ['nadinelechon', "Nadine Lechon — RN"],
    ['NathCarvalho91', "Nathalie Da Conceicao Carvalho — RN"],
    ['NMeizonnet', "Nicolas Meizonnet — RN"],
    ['ObjectifRemi', "Objectif Remigration — Groupes"],
    ['BallardPhilippe', "Philippe Ballard — RN"],
    ['phlottiaux', "Philippe Lottiaux — RN"],
    ['Ph_Schreck', "Philippe Schreck — RN"],
    ['Meurin_P', "Pierre Meurin — RN"],
    ['FrDesouche', "Pierre Sautarel — Autres"],
    ['Reconquete_off', "Reconquête — Reconquête"],
    ['RenaudCamus', "Renaud Camus — Autres"],
    ['RNGrandEst', "RN Grand Est — RN"],
    ['rn_paca', "RN Provence-Alpes-Côte d’Azur — RN"],
    ['RNational_IDF', "RN Île-de-France — RN"],
    ['LeBourgeois7610', "Robert Le Bourgeois — RN"],
    ['ChudeauR', "Roger Chudeau — RN"],
    ['knafo_sarah', "Sarah Knafo — Reconquête"],
    ['Serge_Muller24', "Serge Muller — RN"],
    ['sblanc66000', "Sophie Blanc — RN"],
    ['stephan1Rambaud', "Stéphane Rambaud — RN"],
    ['sebchenu', "Sébastien Chenu — RN"],
    ['Seb_Humbert', "Sébastien Humbert — RN"],
    ['ThaisEscufon', "Thaïs d’Escufon — Autres"],
    ['MonnierThibaut', "Thibaut Monnier — RN"],
    ['thierry_frappe', "Thierry Frappé — RN"],
    ['thierryperez43', "Thierry Perez — RN"],
    ['Thomas_Mng', "Thomas Ménagé — RN"],
    ['Th_Bnrdt', "Théo Bernhardt — RN"],
    ['Tiffany_Joncour', "Tiffany Joncour — RN"],
    ['T_Houssin', "Timothée Houssin — RN"],
    ['YaelMenache', "Yaël Ménaché — RN"],
    ['YoannGillet30', "Yoann Gillet — RN"],
    ['CNEWS', "CNEWS — Autres"],
    ['CNEWSLesOFF', "CNEWS Les OFF — Autres"],
    ['Frontieresmedia', "Frontières — Autres"],
    ['linfiltremedia', "L’Infiltré — Autres"],
    ['Valeurs', "Valeurs actuelles — Autres"],
    ['BVoltaire', "Boulevard Voltaire — Autres"],
    ['tegnererik', "Erik Tegnér — Autres"],
    ['PascalPraud', "Pascal Praud — Autres"],
    ['christine_kelly', "Christine Kelly — Autres"],
    ['LaurenceFerrari', "Laurence Ferrari — Autres"],
    ['GauthierBret', "Gauthier Le Bret — Autres"],
    ['deval_eliot', "Eliot Deval — Autres"],
    ['gabriellecluzel', "Gabrielle Cluzel — Autres"],
    ['mbockcote', "Mathieu Bock-Côté — Autres"],
    ['ivanrioufol', "Ivan Rioufol — Autres"],
    ['Vero_Jacquier', "Véronique Jacquier — Autres"],
    ['anthonyfavalli', "Anthony Favalli — Autres"],
    ['YOANNUSAI', "Yoann Usai — Autres"],
    ['ElodieHuchard', "Élodie Huchard — Autres"],
    ['ThomasBonnet', "Thomas Bonnet — Autres"],
    ['quentingerard_', "Quentin Gérard — Autres"],
    ['rstainville', "Raphaël Stainville — Autres"],
    ['S_Lignier', "Sébastien Lignier — Autres"],
    ['JulesTorres17', "Jules Torres — Autres"],
    ['Jules_Laurans', "Jules Laurans — Autres"],
    ['DavidAlaime', "David Alaime — Autres"],
    ['JordanFlrtn', "Jordan Florentin — Autres"],
    ['Lauriane_Bd', "Lauriane Bernard — Autres"],
    ['Guillaume_fcqt', "Guillaume Foucqueteau — Autres"],
    ['anais_marechal_', "Anaïs Maréchal — Autres"],
    ['evaduparc', "Eva Duparc — Autres"],
    ['rigault_charles', "Charles Rigault — Autres"],
    ['GarenShn', "Garen Shnorhokian — Autres"],
    ['YannMontero', "Yann Montero — Autres"],
    ['SevilliaYves', "Yves-Marie Sévillia — Autres"],
    ['alienordep', "Aliénor de Pompignan — Autres"],
    ['wdeguerpel', "Wandrille de Guerpel — Autres"],
    ['Eynaud_Marc', "Marc Eynaud — Autres"],
    ['radouan_kourak', "Radouan Kourak — Autres"],
    ['jean_bexon', "Jean Bexon — Autres"],
    ['tvlofficiel', "TV Libertés — Autres"],
    ['BildMartial', "Martial Bild — Autres"],
    ['jylgallou', "Jean-Yves Le Gallou — Autres"],
    ['JulietteBriens', "Juliette Briens — Autres"],
    ['MagLincorrect', "L’Incorrect — Autres"],
    ['Incorrectibles', "Les Incorrectibles — Autres"],
    ['csapin', "Charles Sapin — Autres"],
    ['p_condomines', "Pauline Condomines — Autres"],
    ['mathildeklotgen', "Mathilde Klötgen — Autres"],
    ['IrisBridier', "Iris Bridier — Autres"],
    ['coupeau_maxime', "Maxime Coupeau — Autres"],
    ['NicolasBoutin11', "Nicolas Boutin — Autres"],
    ['VltnGR', "Valentin Gaure — Autres"],
    ['LegayMaxime1', "Maxime Legay — Autres"],
    ['VictorLefebvre', "Victor Lefebvre — Autres"],
    ['morandiniblog', "Jean-Marc Morandini — Autres"],
    ['Pierre_GTIL', "Pierre Gentillet — Autres"],
    ['jean_de_lacoste', "Jean de Lacoste Lareymondie — Autres"],
    ['GrisetCatherine', "Catherine Griset — RN"],
    ['jsanchez_rn', "Julien Sanchez — RN"],
    ['thierrymariani', "Thierry Mariani — RN"],
    ['v_joron', "Virginie Joron — RN"],
    ['AndreRougeOff', "André Rougé — RN"],
    ['mandrouet', "Mathilde Androuët — RN"],
    ['pr_thionnet', "Pierre-Romain Thionnet — RN"],
    ['jrechagneux', "Julie Rechagneux — RN"],
    ['fabriceleggeri', "Fabrice Leggeri — RN"],
    ['asfrigout', "Anne-Sophie Frigout — RN"],
    ['ValerieDeloge', "Valérie Deloge — RN"],
    ['jleonardelli_', "Julien Leonardelli — RN"],
    ['groupeRN_off', "Groupe Rassemblement National à l’Assemblée — Groupes"],
    ['jllacapelle', "Jean-Lin Lacapelle — RN"],
    ['louis_aliot', "Louis Aliot — RN"],
    ['CocardeEtud', "La Cocarde étudiante — Groupes"],
    ['InstitutILIADE', "Institut Iliade — Groupes"],
    ['LNatifs', "Les Natifs — Groupes"],
    ['actionfrancaise', "Action française — Groupes"],
  ];

  // État conservé entre les changements de page
  const K = 'blockfacho_state';
  const charger = () => {
    try { return JSON.parse(localStorage.getItem(K)) || {}; } catch { return {}; }
  };
  const etat = Object.assign({ idx: 0, actif: false, session: 0, ok: 0, deja: 0, echec: 0, journal: [] }, charger());
  const sauver = () => { try { localStorage.setItem(K, JSON.stringify(etat)); } catch {} };

  const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
  const attendre = async (sel, max = ATTENTE_MAX_MS) => {
    const fin = Date.now() + max;
    while (Date.now() < fin) {
      const el = document.querySelector(sel);
      if (el) return el;
      await dormir(300);
    }
    return null;
  };
  const noter = (msg) => {
    etat.journal.unshift(new Date().toLocaleTimeString() + ' ' + msg);
    etat.journal = etat.journal.slice(0, 8);
    sauver();
    afficher();
  };

  // Panneau de contrôle
  const panneau = document.createElement('div');
  panneau.style.cssText = 'position:fixed;bottom:16px;left:16px;z-index:99999;background:#111;color:#eee;font:12px/1.4 system-ui,sans-serif;padding:10px 12px;border-radius:10px;width:270px;box-shadow:0 4px 16px rgba(0,0,0,.4)';
  document.body.appendChild(panneau);

  function afficher() {
    const total = LISTE.length;
    // Construit en textContent : l'état vient du localStorage de x.com, on ne l'interprète jamais comme du HTML
    const n = (v) => (Number.isInteger(v) ? v : 0);
    const ligne = (txt) => { const d = document.createElement('div'); d.textContent = txt; return d; };
    const bouton = (txt, a) => { const b = document.createElement('button'); b.textContent = txt; b.dataset.a = a; return b; };
    const titre = ligne(`OnBloque — ${Math.min(n(etat.idx), total)} / ${total}`);
    titre.style.fontWeight = 'bold';
    const boutons = document.createElement('div');
    boutons.style.cssText = 'margin:6px 0;display:flex;gap:6px';
    boutons.append(bouton(etat.actif ? 'Pause' : 'Démarrer', 'go'), bouton('Recommencer', 'raz'));
    const journal = document.createElement('div');
    journal.style.cssText = 'opacity:.75;max-height:110px;overflow:auto';
    (Array.isArray(etat.journal) ? etat.journal : []).forEach((l) => journal.append(ligne(String(l).slice(0, 200))));
    panneau.replaceChildren(
      titre,
      ligne(`Bloqués : ${n(etat.ok)} · Déjà : ${n(etat.deja)} · Échecs : ${n(etat.echec)}`),
      ligne(`Session : ${n(etat.session)} / ${MAX_PAR_SESSION} · ${etat.actif ? '▶ en cours' : '⏸ en pause'}`),
      boutons,
      journal
    );
    panneau.querySelector('[data-a="go"]').onclick = () => {
      etat.actif = !etat.actif;
      if (etat.actif) etat.session = 0;
      sauver(); afficher();
      if (etat.actif) boucle();
    };
    panneau.querySelector('[data-a="raz"]').onclick = () => {
      if (!confirm('Repartir du début de la liste ?')) return;
      Object.assign(etat, { idx: 0, actif: false, session: 0, ok: 0, deja: 0, echec: 0, journal: [] });
      sauver(); afficher();
    };
  }

  function suivant(statut, pseudo) {
    etat[statut]++;
    etat.idx++;
    etat.session++;
    noter(({ ok: '✓ bloqué', deja: '• déjà bloqué', echec: '✗ échec' })[statut] + ' @' + pseudo);
  }

  async function bloquerProfilCourant(pseudo) {
    // Attend que le profil soit chargé : bouton "…", bouton "Débloquer" ou page vide (compte inexistant/suspendu)
    const pret = await attendre('[data-testid="userActions"], [data-testid$="-unblock"], [data-testid="emptyState"], [data-testid="error-detail"]');
    if (!pret) return 'echec';
    if (document.querySelector('[data-testid$="-unblock"]')) return 'deja';

    const menu = document.querySelector('[data-testid="userActions"]');
    if (!menu) return 'echec';
    menu.click();

    const itemBloquer = await attendre('[role="menuitem"][data-testid="block"]', 5000);
    if (!itemBloquer) { document.body.click(); return 'echec'; }
    itemBloquer.click();

    const confirmer = await attendre('[data-testid="confirmationSheetConfirm"]', 5000);
    if (!confirmer) return 'echec';
    confirmer.click();

    // Vérifie que le bouton "Débloquer" est apparu
    return (await attendre('[data-testid$="-unblock"]', 8000)) ? 'ok' : 'echec';
  }

  async function boucle() {
    if (!etat.actif) return;
    if (etat.idx >= LISTE.length) { etat.actif = false; noter('Liste terminée.'); return; }
    if (etat.session >= MAX_PAR_SESSION) { etat.actif = false; noter('Plafond de session atteint, reprenez plus tard.'); return; }

    const pseudo = LISTE[etat.idx][0];
    const chemin = location.pathname.split('/')[1] || '';
    if (chemin.toLowerCase() !== pseudo.toLowerCase()) {
      location.href = 'https://x.com/' + pseudo;
      return; // le script reprend au chargement de la page
    }

    const statut = await bloquerProfilCourant(pseudo);
    suivant(statut, pseudo);

    // Trois échecs d'affilée : probablement une limite de X ou un changement de l'interface
    const echecsRecents = etat.journal.slice(0, 3).filter((l) => l.includes('✗')).length;
    if (echecsRecents === 3) { etat.actif = false; noter('3 échecs d’affilée, arrêt par précaution.'); return; }

    await dormir((PAUSE_MIN_S + Math.random() * (PAUSE_MAX_S - PAUSE_MIN_S)) * 1000);
    boucle();
  }

  // Démarrage depuis l'icône de l'extension
  function demarrer() {
    if (etat.actif) return;
    etat.actif = true;
    etat.session = 0;
    sauver(); afficher();
    boucle();
  }
  chrome.runtime.onMessage.addListener((msg) => { if (msg && msg.a === "start") demarrer(); });
  chrome.storage.local.get("go", (r) => {
    if (r && r.go) { chrome.storage.local.remove("go"); demarrer(); }
  });

  afficher();
  if (etat.actif) boucle();
})();
