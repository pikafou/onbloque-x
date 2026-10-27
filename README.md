# OnBloque X

Extension Chrome/Edge qui bloque un par un, sur X, les comptes de la liste vérifiée de blockfacho (177 comptes, liste du 27/10/2026).

## Installation

1. Ouvrir `chrome://extensions` (ou `edge://extensions`).
2. Activer le **Mode développeur**.
3. **Charger l'extension non empaquetée** → choisir ce dossier.

## Utilisation

Cliquer sur l'icône OnBloque. L'extension ouvre x.com si besoin et bloque les comptes un par un, avec une pause de 8 à 20 s, puis s'arrête après 25. Recliquer pour continuer.

Réglages en haut de `content.js` : `PAUSE_MIN_S`, `PAUSE_MAX_S`, `MAX_PAR_SESSION`.

X interdit l'automatisation : un usage trop rapide peut faire limiter le compte.
