/* BUILDWISE LERNBIBLIOTHEK
 * 1. Datenmodell (Praktikum 8): Instanzen, Date, Dauer in ms, Sortierung.
 * 2. DOM (Praktikum 9): statische Detailseiten ohne HTML-Strings aufbauen.
 * 3. Navigation: alle Ansichten liegen in derselben HTML-Datei (Hash-Adressen).
 * CSS steht ausschließlich in style.css; hier stehen Daten und Bedienung.
 */
(() => {
  'use strict';

  class EpisodeAudio {
    constructor(url, groesse, typ) {
      this.url = url;
      this.groesse = groesse; // Bytes
      this.typ = typ;
    }
  }

  class Episode {
    constructor(titel, beschreibung, datum, dauer, audio) {
      this.titel = titel;
      this.beschreibung = beschreibung;
      this.datum = new Date(datum);
      this.dauer = dauer; // Millisekunden, kein Minutenwert!
      this.audio = audio;
    }
    getDauerInStundenUndMinuten() {
      const minuten = Math.floor(this.dauer / 60000);
      return `${Math.floor(minuten / 60)}h ${minuten % 60}min`;
    }
  }

  class Podcast {
    constructor(titel, beschreibung, autor, besitzerName, besitzerEmail, kategorien, letztesUpdate, bildUrl, feedUrl) {
      this.titel = titel;
      this.beschreibung = beschreibung;
      this.autor = autor;
      this.besitzerName = besitzerName;
      this.besitzerEmail = besitzerEmail;
      this.kategorien = kategorien;
      this.letztesUpdate = new Date(letztesUpdate);
      this.bildUrl = bildUrl;
      this.feedUrl = feedUrl;
      this.episoden = [];
    }
    addEpisode(episode) {
      this.episoden.push(episode);
      this.episoden.sort((a, b) => b.datum - a.datum);
      if (episode.datum > this.letztesUpdate) this.letztesUpdate = new Date(episode.datum);
    }
  }

  // Ein einfacher lokaler Katalog: funktioniert auch nach Doppelklick ohne Server.
  const rawCatalog = [
  {
    "titel": "Gaming verstehen",
    "beschreibung": "Ausgewählte Originalfolgen zu Selbstbau und Grafikkarten. Die Modelle und Preise beziehen sich auf das jeweilige Veröffentlichungsdatum.",
    "autor": "Buildwise Redaktion (Beispieldaten)",
    "besitzerName": "Buildwise Lernprojekt",
    "besitzerEmail": "lernen@example.com",
    "bildUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20480%20480%22%3E%3Cdefs%3E%3CradialGradient%20id%3D%22g%22%3E%3Cstop%20stop-color%3D%22%23c7fa73%22%20stop-opacity%3D%22.24%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23101719%22%2F%3E%3C%2FradialGradient%3E%3Cpattern%20id%3D%22p%22%20width%3D%2228%22%20height%3D%2228%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%20fill%3D%22%23c7fa73%22%20opacity%3D%22.15%22%2F%3E%3C%2Fpattern%3E%3C%2Fdefs%3E%3Crect%20width%3D%22480%22%20height%3D%22480%22%20fill%3D%22%23101719%22%2F%3E%3Crect%20width%3D%22480%22%20height%3D%22480%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Crect%20width%3D%22480%22%20height%3D%22480%22%20fill%3D%22url%28%23p%29%22%2F%3E%3Cg%20transform%3D%22translate%28240%20205%29%20rotate%28-12%29%22%20stroke%3D%22%23c7fa73%22%20fill%3D%22none%22%20stroke-width%3D%222%22%3E%3Crect%20x%3D%22-75%22%20y%3D%22-75%22%20width%3D%22150%22%20height%3D%22150%22%20rx%3D%2220%22%2F%3E%3Crect%20x%3D%22-46%22%20y%3D%22-46%22%20width%3D%2292%22%20height%3D%2292%22%20rx%3D%229%22%2F%3E%3Cpath%20d%3D%22M-50%20-95v20M-50%2075v20M-95%20-50h20M75%20-50h20%22%2F%3E%3Cpath%20d%3D%22M-25%20-95v20M-25%2075v20M-95%20-25h20M75%20-25h20%22%2F%3E%3Cpath%20d%3D%22M0%20-95v20M0%2075v20M-95%200h20M75%200h20%22%2F%3E%3Cpath%20d%3D%22M25%20-95v20M25%2075v20M-95%2025h20M75%2025h20%22%2F%3E%3Cpath%20d%3D%22M50%20-95v20M50%2075v20M-95%2050h20M75%2050h20%22%2F%3E%3Cpath%20d%3D%22M-25%2010%200-23%2025%2010%200%2033Z%22%2F%3E%3C%2Fg%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20fill%3D%22%23c7fa73%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2213%22%20letter-spacing%3D%223%22%3EBUILDWISE%20%2F%20AUDIO%3C%2Ftext%3E%3Ctext%20x%3D%2232%22%20y%3D%22375%22%20fill%3D%22%23f2f4ee%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2249%22%20font-weight%3D%22700%22%3EGAMING%3C%2Ftext%3E%3Ctext%20x%3D%2234%22%20y%3D%22412%22%20fill%3D%22%23c7fa73%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2212%22%20letter-spacing%3D%222%22%3EDEIN%20N%C3%84CHSTES%20LEVEL%3C%2Ftext%3E%3Ctext%20x%3D%2234%22%20y%3D%22450%22%20fill%3D%22%23929f97%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2211%22%3EKOMPONENTEN%20VERSTEHEN.%20BEWUSST%20ENTSCHEIDEN.%3C%2Ftext%3E%3C%2Fsvg%3E",
    "feedUrl": "https://ct-uplink.podigee.io/feed/mp3",
    "kategorien": [
      "Gaming",
      "PC-Wissen"
    ],
    "letztesUpdate": "2025-12-13T05:30:00Z",
    "episoden": [
      {
        "titel": "Den optimalen PC 2026 selbst bauen | c’t uplink",
        "beschreibung": "Ein Gespräch über zwei Selbstbaukonzepte und die Auswahl von PC-Komponenten. Originalfolge von c’t uplink; Hardware und Preisangaben haben den Stand der Veröffentlichung.",
        "dauer": 2387000,
        "datum": "2025-12-13T05:30:00Z",
        "audio": {
          "url": "https://audio.podigee-cdn.net/2254918-m-a498a54c13f8ba3df80bc528dcde716b.mp3?source=feed",
          "groesse": 33653979,
          "typ": "audio/mpeg"
        },
        "quelle": "https://ct-uplink.podigee.io/629-den-optimalen-pc-2026-selbst-bauen-c-t-uplink",
        "video": {
          "id": "srI7mgzRK7c",
          "titel": "Den optimalen PC 2026 selbst bauen",
          "kanal": "c’t uplink"
        }
      },
      {
        "titel": "Grafikkarten: GeForce RTX 4070 Super & Radeon RX 7600 XT | c’t uplink",
        "beschreibung": "Eine ältere Originalfolge über konkrete GeForce- und Radeon-Grafikkarten. Sie ergänzt das Thema GPU; Modellpreise und Marktübersicht sind keine aktuellen Kaufempfehlungen.",
        "dauer": 1086000,
        "datum": "2024-02-24T05:30:00Z",
        "audio": {
          "url": "https://audio.podigee-cdn.net/1379656-m-422f9b741e837cb5d09b94e95862cb8b.mp3?source=feed",
          "groesse": 15516494,
          "typ": "audio/mpeg"
        },
        "quelle": "https://ct-uplink.podigee.io/534-grafikkarten-geforce-rtx-4070-super-radeon-rx-7600-xt-ct-uplink",
        "video": {
          "id": "AWAvqyzXvTI",
          "titel": "PC Zusammenbauen!! ANFÄNGER ANLEITUNG für AMD & Intel",
          "kanal": "HardwareDealz"
        }
      }
    ]
  },
  {
    "titel": "Coding ohne Wartezeit",
    "beschreibung": "Für deinen Arbeitsplatz: Komponenten bewusst auswählen und Speicher verstehen. Diese Hardwaregrundlagen helfen auch beim Planen eines Coding-PCs.",
    "autor": "Buildwise Redaktion (Beispieldaten)",
    "besitzerName": "Buildwise Lernprojekt",
    "besitzerEmail": "lernen@example.com",
    "bildUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20480%20480%22%3E%3Cdefs%3E%3CradialGradient%20id%3D%22g%22%3E%3Cstop%20stop-color%3D%22%23aaa4ff%22%20stop-opacity%3D%22.24%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23101719%22%2F%3E%3C%2FradialGradient%3E%3Cpattern%20id%3D%22p%22%20width%3D%2228%22%20height%3D%2228%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%20fill%3D%22%23aaa4ff%22%20opacity%3D%22.15%22%2F%3E%3C%2Fpattern%3E%3C%2Fdefs%3E%3Crect%20width%3D%22480%22%20height%3D%22480%22%20fill%3D%22%23101719%22%2F%3E%3Crect%20width%3D%22480%22%20height%3D%22480%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Crect%20width%3D%22480%22%20height%3D%22480%22%20fill%3D%22url%28%23p%29%22%2F%3E%3Cg%20transform%3D%22translate%28240%20205%29%20rotate%28-4%29%22%20stroke%3D%22%23aaa4ff%22%20fill%3D%22none%22%20stroke-width%3D%222%22%3E%3Crect%20x%3D%22-75%22%20y%3D%22-75%22%20width%3D%22150%22%20height%3D%22150%22%20rx%3D%2220%22%2F%3E%3Crect%20x%3D%22-46%22%20y%3D%22-46%22%20width%3D%2292%22%20height%3D%2292%22%20rx%3D%229%22%2F%3E%3Cpath%20d%3D%22M-50%20-95v20M-50%2075v20M-95%20-50h20M75%20-50h20%22%2F%3E%3Cpath%20d%3D%22M-25%20-95v20M-25%2075v20M-95%20-25h20M75%20-25h20%22%2F%3E%3Cpath%20d%3D%22M0%20-95v20M0%2075v20M-95%200h20M75%200h20%22%2F%3E%3Cpath%20d%3D%22M25%20-95v20M25%2075v20M-95%2025h20M75%2025h20%22%2F%3E%3Cpath%20d%3D%22M50%20-95v20M50%2075v20M-95%2050h20M75%2050h20%22%2F%3E%3Cpath%20d%3D%22M-25%2010%200-23%2025%2010%200%2033Z%22%2F%3E%3C%2Fg%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20fill%3D%22%23aaa4ff%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2213%22%20letter-spacing%3D%223%22%3EBUILDWISE%20%2F%20AUDIO%3C%2Ftext%3E%3Ctext%20x%3D%2232%22%20y%3D%22375%22%20fill%3D%22%23f2f4ee%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2249%22%20font-weight%3D%22700%22%3ECODING%3C%2Ftext%3E%3Ctext%20x%3D%2234%22%20y%3D%22412%22%20fill%3D%22%23aaa4ff%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2212%22%20letter-spacing%3D%222%22%3EIDEEN%20WERDEN%20CODE%3C%2Ftext%3E%3Ctext%20x%3D%2234%22%20y%3D%22450%22%20fill%3D%22%23929f97%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2211%22%3EKOMPONENTEN%20VERSTEHEN.%20BEWUSST%20ENTSCHEIDEN.%3C%2Ftext%3E%3C%2Fsvg%3E",
    "feedUrl": "https://ct-uplink.podigee.io/feed/mp3",
    "kategorien": [
      "Coding",
      "PC-Wissen"
    ],
    "letztesUpdate": "2025-12-13T05:30:00Z",
    "episoden": [
      {
        "titel": "Den optimalen PC 2026 selbst bauen | c’t uplink",
        "beschreibung": "Ein Gespräch über zwei Selbstbaukonzepte und die Auswahl von PC-Komponenten. Originalfolge von c’t uplink; Hardware und Preisangaben haben den Stand der Veröffentlichung.",
        "dauer": 2387000,
        "datum": "2025-12-13T05:30:00Z",
        "audio": {
          "url": "https://audio.podigee-cdn.net/2254918-m-a498a54c13f8ba3df80bc528dcde716b.mp3?source=feed",
          "groesse": 33653979,
          "typ": "audio/mpeg"
        },
        "quelle": "https://ct-uplink.podigee.io/629-den-optimalen-pc-2026-selbst-bauen-c-t-uplink",
        "video": {
          "id": "srI7mgzRK7c",
          "titel": "Den optimalen PC 2026 selbst bauen",
          "kanal": "c’t uplink"
        }
      },
      {
        "titel": "Externe SSDs und anderer Flash-Speicher | c’t uplink",
        "beschreibung": "Die Originalfolge behandelt externe SSDs und Flash-Speicher. Ein ergänzender Blick auf Speichergeräte für Projekte und Dateien.",
        "dauer": 2238000,
        "datum": "2025-07-19T04:30:00Z",
        "audio": {
          "url": "https://audio.podigee-cdn.net/2016915-m-a08c6f7cbc8bfedc4d92621b15de1c50.mp3?source=feed",
          "groesse": 31668288,
          "typ": "audio/mpeg"
        },
        "quelle": "https://ct-uplink.podigee.io/607-externe-ssds-und-anderer-flash-speicher-c-t-uplink",
        "video": {
          "id": "cW_bUQDqaoU",
          "titel": "Externe SSDs und anderer Flash-Speicher",
          "kanal": "c’t uplink"
        }
      }
    ]
  },
  {
    "titel": "Design mit System",
    "beschreibung": "Selbstbau und Speicher als Grundlage für kreative Arbeit. Prüfe zusätzlich die Anforderungen deiner Designprogramme.",
    "autor": "Buildwise Redaktion (Beispieldaten)",
    "besitzerName": "Buildwise Lernprojekt",
    "besitzerEmail": "lernen@example.com",
    "bildUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20480%20480%22%3E%3Cdefs%3E%3CradialGradient%20id%3D%22g%22%3E%3Cstop%20stop-color%3D%22%23efb0cc%22%20stop-opacity%3D%22.24%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23101719%22%2F%3E%3C%2FradialGradient%3E%3Cpattern%20id%3D%22p%22%20width%3D%2228%22%20height%3D%2228%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%20fill%3D%22%23efb0cc%22%20opacity%3D%22.15%22%2F%3E%3C%2Fpattern%3E%3C%2Fdefs%3E%3Crect%20width%3D%22480%22%20height%3D%22480%22%20fill%3D%22%23101719%22%2F%3E%3Crect%20width%3D%22480%22%20height%3D%22480%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Crect%20width%3D%22480%22%20height%3D%22480%22%20fill%3D%22url%28%23p%29%22%2F%3E%3Cg%20transform%3D%22translate%28240%20205%29%20rotate%284%29%22%20stroke%3D%22%23efb0cc%22%20fill%3D%22none%22%20stroke-width%3D%222%22%3E%3Crect%20x%3D%22-75%22%20y%3D%22-75%22%20width%3D%22150%22%20height%3D%22150%22%20rx%3D%2220%22%2F%3E%3Crect%20x%3D%22-46%22%20y%3D%22-46%22%20width%3D%2292%22%20height%3D%2292%22%20rx%3D%229%22%2F%3E%3Cpath%20d%3D%22M-50%20-95v20M-50%2075v20M-95%20-50h20M75%20-50h20%22%2F%3E%3Cpath%20d%3D%22M-25%20-95v20M-25%2075v20M-95%20-25h20M75%20-25h20%22%2F%3E%3Cpath%20d%3D%22M0%20-95v20M0%2075v20M-95%200h20M75%200h20%22%2F%3E%3Cpath%20d%3D%22M25%20-95v20M25%2075v20M-95%2025h20M75%2025h20%22%2F%3E%3Cpath%20d%3D%22M50%20-95v20M50%2075v20M-95%2050h20M75%2050h20%22%2F%3E%3Cpath%20d%3D%22M-25%2010%200-23%2025%2010%200%2033Z%22%2F%3E%3C%2Fg%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20fill%3D%22%23efb0cc%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2213%22%20letter-spacing%3D%223%22%3EBUILDWISE%20%2F%20AUDIO%3C%2Ftext%3E%3Ctext%20x%3D%2232%22%20y%3D%22375%22%20fill%3D%22%23f2f4ee%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2249%22%20font-weight%3D%22700%22%3EDESIGN%3C%2Ftext%3E%3Ctext%20x%3D%2234%22%20y%3D%22412%22%20fill%3D%22%23efb0cc%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2212%22%20letter-spacing%3D%222%22%3ERAUM%20F%C3%9CR%20KREATIVIT%C3%84T%3C%2Ftext%3E%3Ctext%20x%3D%2234%22%20y%3D%22450%22%20fill%3D%22%23929f97%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2211%22%3EKOMPONENTEN%20VERSTEHEN.%20BEWUSST%20ENTSCHEIDEN.%3C%2Ftext%3E%3C%2Fsvg%3E",
    "feedUrl": "https://ct-uplink.podigee.io/feed/mp3",
    "kategorien": [
      "Design",
      "PC-Wissen"
    ],
    "letztesUpdate": "2025-07-19T04:30:00Z",
    "episoden": [
      {
        "titel": "Externe SSDs und anderer Flash-Speicher | c’t uplink",
        "beschreibung": "Die Originalfolge behandelt externe SSDs und Flash-Speicher. Ein ergänzender Blick auf Speichergeräte für Projekte und Dateien.",
        "dauer": 2238000,
        "datum": "2025-07-19T04:30:00Z",
        "audio": {
          "url": "https://audio.podigee-cdn.net/2016915-m-a08c6f7cbc8bfedc4d92621b15de1c50.mp3?source=feed",
          "groesse": 31668288,
          "typ": "audio/mpeg"
        },
        "quelle": "https://ct-uplink.podigee.io/607-externe-ssds-und-anderer-flash-speicher-c-t-uplink",
        "video": {
          "id": "cW_bUQDqaoU",
          "titel": "Externe SSDs und anderer Flash-Speicher",
          "kanal": "c’t uplink"
        }
      },
      {
        "titel": "Der optimale Selbstbau-PC 2025: Günstiger Gamer und High-End-PC | c’t uplink",
        "beschreibung": "c’t uplink bespricht Selbstbauvorschläge für verschiedene Leistungsansprüche. Die Konfigurationen stammen aus der Veröffentlichung für 2025.",
        "dauer": 2854000,
        "datum": "2024-12-14T05:30:00Z",
        "audio": {
          "url": "https://audio.podigee-cdn.net/1709965-m-7f5a73f034b2d55ed08c396859b87e3e.mp3?source=feed",
          "groesse": 40194089,
          "typ": "audio/mpeg"
        },
        "quelle": "https://ct-uplink.podigee.io/576-der-optimale-selbstbau-pc-2025-gunstiger-gamer-und-high-end-pc-ct-uplink",
        "video": {
          "id": "AWAvqyzXvTI",
          "titel": "PC Zusammenbauen!! ANFÄNGER ANLEITUNG für AMD & Intel",
          "kanal": "HardwareDealz"
        }
      }
    ]
  },
  {
    "titel": "Alltag ganz einfach",
    "beschreibung": "Gebrauchte Rechner und Mini-PCs als Möglichkeiten für einen kompakten Alltagscomputer.",
    "autor": "Buildwise Redaktion (Beispieldaten)",
    "besitzerName": "Buildwise Lernprojekt",
    "besitzerEmail": "lernen@example.com",
    "bildUrl": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20480%20480%22%3E%3Cdefs%3E%3CradialGradient%20id%3D%22g%22%3E%3Cstop%20stop-color%3D%22%238edfd4%22%20stop-opacity%3D%22.24%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23101719%22%2F%3E%3C%2FradialGradient%3E%3Cpattern%20id%3D%22p%22%20width%3D%2228%22%20height%3D%2228%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%20fill%3D%22%238edfd4%22%20opacity%3D%22.15%22%2F%3E%3C%2Fpattern%3E%3C%2Fdefs%3E%3Crect%20width%3D%22480%22%20height%3D%22480%22%20fill%3D%22%23101719%22%2F%3E%3Crect%20width%3D%22480%22%20height%3D%22480%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Crect%20width%3D%22480%22%20height%3D%22480%22%20fill%3D%22url%28%23p%29%22%2F%3E%3Cg%20transform%3D%22translate%28240%20205%29%20rotate%2812%29%22%20stroke%3D%22%238edfd4%22%20fill%3D%22none%22%20stroke-width%3D%222%22%3E%3Crect%20x%3D%22-75%22%20y%3D%22-75%22%20width%3D%22150%22%20height%3D%22150%22%20rx%3D%2220%22%2F%3E%3Crect%20x%3D%22-46%22%20y%3D%22-46%22%20width%3D%2292%22%20height%3D%2292%22%20rx%3D%229%22%2F%3E%3Cpath%20d%3D%22M-50%20-95v20M-50%2075v20M-95%20-50h20M75%20-50h20%22%2F%3E%3Cpath%20d%3D%22M-25%20-95v20M-25%2075v20M-95%20-25h20M75%20-25h20%22%2F%3E%3Cpath%20d%3D%22M0%20-95v20M0%2075v20M-95%200h20M75%200h20%22%2F%3E%3Cpath%20d%3D%22M25%20-95v20M25%2075v20M-95%2025h20M75%2025h20%22%2F%3E%3Cpath%20d%3D%22M50%20-95v20M50%2075v20M-95%2050h20M75%2050h20%22%2F%3E%3Cpath%20d%3D%22M-25%2010%200-23%2025%2010%200%2033Z%22%2F%3E%3C%2Fg%3E%3Ctext%20x%3D%2232%22%20y%3D%2243%22%20fill%3D%22%238edfd4%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2213%22%20letter-spacing%3D%223%22%3EBUILDWISE%20%2F%20AUDIO%3C%2Ftext%3E%3Ctext%20x%3D%2232%22%20y%3D%22375%22%20fill%3D%22%23f2f4ee%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2249%22%20font-weight%3D%22700%22%3EALLTAG%3C%2Ftext%3E%3Ctext%20x%3D%2234%22%20y%3D%22412%22%20fill%3D%22%238edfd4%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2212%22%20letter-spacing%3D%222%22%3EEINFACH%20GUT%20ARBEITEN%3C%2Ftext%3E%3Ctext%20x%3D%2234%22%20y%3D%22450%22%20fill%3D%22%23929f97%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2211%22%3EKOMPONENTEN%20VERSTEHEN.%20BEWUSST%20ENTSCHEIDEN.%3C%2Ftext%3E%3C%2Fsvg%3E",
    "feedUrl": "https://ct-uplink.podigee.io/feed/mp3",
    "kategorien": [
      "Everyday",
      "PC-Wissen"
    ],
    "letztesUpdate": "2026-04-11T04:30:00Z",
    "episoden": [
      {
        "titel": "Die Vorzüge gebrauchter PCs | c’t uplink",
        "beschreibung": "c’t uplink spricht über gebrauchte PCs. Eine weitere Möglichkeit, den eigenen Bedarf mit einem verfügbaren Budget zu verbinden.",
        "dauer": 2711000,
        "datum": "2026-04-11T04:30:00Z",
        "audio": {
          "url": "https://audio.podigee-cdn.net/2416707-m-2d46a1bc355a7f8aa4a209856da2e694.mp3?source=feed",
          "groesse": 38278074,
          "typ": "audio/mpeg"
        },
        "quelle": "https://ct-uplink.podigee.io/647-die-vorzuge-gebrauchter-pcs-c-t-uplink",
        "video": {
          "id": "AWAvqyzXvTI",
          "titel": "PC Zusammenbauen!! ANFÄNGER ANLEITUNG für AMD & Intel",
          "kanal": "HardwareDealz"
        }
      },
      {
        "titel": "Kaufberatung zu Mini-PCs (2024) | c’t uplink",
        "beschreibung": "Eine Originalfolge zur Auswahl von Mini-PCs aus dem Jahr 2024. Sie ergänzt die Planung eines kompakten Arbeitsplatzes.",
        "dauer": 2950000,
        "datum": "2024-04-06T04:30:00Z",
        "audio": {
          "url": "https://audio.podigee-cdn.net/1426301-m-14771930857b2720ce75171a7536a33c.mp3?source=feed",
          "groesse": 41653243,
          "typ": "audio/mpeg"
        },
        "quelle": "https://ct-uplink.podigee.io/540-kaufberatung-zu-mini-pcs-2024-ct-uplink",
        "video": {
          "id": "AWAvqyzXvTI",
          "titel": "PC Zusammenbauen!! ANFÄNGER ANLEITUNG für AMD & Intel",
          "kanal": "HardwareDealz"
        }
      }
    ]
  }
];
  const LEARN_CATALOG=rawCatalog.map(raw=>{
    const podcast=new Podcast(raw.titel,raw.beschreibung,raw.autor,raw.besitzerName,raw.besitzerEmail,raw.kategorien,raw.letztesUpdate,raw.bildUrl,raw.feedUrl);
    [...raw.episoden].reverse().forEach(e=>{const episode=new Episode(e.titel,e.beschreibung,e.datum,e.dauer,new EpisodeAudio(e.audio.url,e.audio.groesse,e.audio.typ));episode.quelle=e.quelle;episode.video=e.video;podcast.addEpisode(episode);});
    return podcast;
  });
  window.BUILDWISE_LESSONS = { Podcast, Episode, EpisodeAudio, catalog: LEARN_CATALOG };

  // Die geforderte Kontrollausgabe zeigt gleichzeitig die sortierten Episoden.
  for (const podcast of LEARN_CATALOG) {
    console.log(`${podcast.titel}:`);
    for (const episode of podcast.episoden) console.log(`    ${episode.titel} (${episode.getDauerInStundenUndMinuten()})`);
  }
  const getViewportWidth = () => window.innerWidth || document.documentElement.clientWidth;
  console.log(`Die Viewport-Breite beträgt: ${getViewportWidth()} Pixel.`);
  if (getViewportWidth() < screen.width * 0.3) {
    console.warn('Das Browserfenster ist schmaler als 30 % deines Bildschirms.');
    // Praktikum 7 erlaubt, die störende Meldung später auszukommentieren:
    // alert('Vergrößere dein Browserfenster für mehr Platz.');
  }

  // Kleine DOM-Helfer halten die Darstellung lesbar. Nutzerdaten werden Textknoten.
  const node = (tag, className, text) => {
    const result = document.createElement(tag);
    if (className) result.className = className;
    if (text !== undefined) result.textContent = text;
    return result;
  };
  const link = (href, text, className) => {
    const result = node('a', className, text);
    result.href = routeURL(href);
    return result;
  };
  const dateLabel = value => new Date(value).toLocaleDateString('de-DE');
  const time = value => {
    const result = node('time', '', dateLabel(value));
    result.dateTime = new Date(value).toISOString();
    return result;
  };
  const title = (container, id, text, eyebrow) => {
    if (eyebrow) container.append(node('p', 'eyebrow', eyebrow));
    const heading = node('h2', '', text);
    heading.id = id;
    container.setAttribute('aria-labelledby', id);
    container.append(heading);
  };
  const fact = (list, label, value) => {
    const row = node('div');
    const detail = node('dd');
    detail.append(typeof value === 'string' ? document.createTextNode(value) : value);
    row.append(node('dt', '', label), detail);
    list.append(row);
  };
  const section = (className, id, heading, eyebrow) => {
    const result = node('section', `learning-card ${className}`);
    title(result, id, heading, eyebrow);
    return result;
  };

  function recent() {
    const aside = node('aside', 'learning-card learning-recent');
    title(aside, 'recent-title', 'Neueste Episoden', 'Auf dem Laufenden');
    const list = node('ul', 'recent-episodes');
    const latest = LEARN_CATALOG.flatMap((podcast, pc) => podcast.episoden.map((episode, ep) => ({podcast, pc, episode, ep}))).sort((a, b) => b.episode.datum - a.episode.datum).slice(0, 4);
    latest.forEach(({podcast, pc, episode, ep}) => {
      const item = node('li');
      item.append(time(episode.datum), node('span', '', podcast.titel), link(`episode.html?pc=${pc}&ep=${ep}`, `${episode.titel} ↗`));
      list.append(item);
    });
    const tip = node('div', 'learning-tip');
    const icon = node('span', '', '✳');
    icon.setAttribute('aria-hidden', 'true');
    tip.append(icon, node('p', '', 'Gut zu wissen: Plane erst deinen Einsatzzweck und danach die einzelnen Komponenten.'));
    aside.append(list, tip);
    return aside;
  }

  function heading(main, text, backHref, backLabel) {
    const block = node('div', 'learning-heading');
    const headline = node('h1', '', text);
    headline.append(node('span', 'brand-dot', '.'));
    block.append(link(backHref, `← ${backLabel}`, 'back-link'), node('p', 'eyebrow', 'Dein PC-Wissen. Zum Anhören.'), headline, node('p', '', 'Verstehe deine Hardware. Triff deine Entscheidung.'));
    main.append(block);
  }

  function renderPodcast(main, podcast, pc) {
    heading(main, podcast.titel, 'index.html#podcasts', 'Zu den Podcasts');
    const layout = node('div', 'podcast-layout');
    const info = section('podcast-info', 'podcast-info-title', 'Informationen zum Podcast', '01 / Der Podcast');
    info.append(node('p', 'learning-description', podcast.beschreibung));
    const facts = node('dl', 'learning-facts');
    fact(facts, 'Titel', podcast.titel);
    fact(facts, 'Autor*innen', podcast.autor);
    fact(facts, 'Besitzer*in', link(`mailto:${podcast.besitzerEmail}`, podcast.besitzerName, 'text-link'));
    fact(facts, 'Kategorien', podcast.kategorien.join(', '));
    fact(facts, 'Letztes Update', time(podcast.letztesUpdate));
    info.append(facts);
    const figure = node('figure', 'podcast-art learning-card');
    const image = node('img');
    image.src = podcast.bildUrl;
    image.alt = `Illustration für den Podcast ${podcast.titel}`;
    image.width = 480;
    image.height = 480;
    const caption = node('figcaption');
    caption.append(node('span', 'learning-badge', 'Buildwise Audio'), document.createTextNode(podcast.titel));
    figure.append(image, caption);
    const episodes = section('podcast-episodes', 'episodes-title', 'Episoden', '02 / Weiterlernen');
    const scroll = node('div', 'table-scroll');
    const table = node('table', 'episode-table');
    table.append(node('caption', '', `Alle Episoden von ${podcast.titel}, neueste zuerst`));
    const head = node('thead');
    const row = node('tr');
    ['Titel', 'Veröffentlicht', 'Dauer'].forEach(label => { const cell = node('th', '', label); cell.scope = 'col'; row.append(cell); });
    head.append(row);
    const body = node('tbody');
    podcast.episoden.forEach((episode, ep) => {
      const row = node('tr');
      const name = node('td');
      const date = node('td');
      const item = link(`episode.html?pc=${pc}&ep=${ep}`, `${episode.titel} ↗`);
      item.prepend(node('span', 'episode-number', String(ep + 1).padStart(2, '0')));
      name.append(item);
      date.append(time(episode.datum));
      row.append(name,date,node('td','',episode.dauer<60000 ? `${Math.round(episode.dauer/1000)} Sek.` : episode.getDauerInStundenUndMinuten()));
      body.append(row);
    });
    table.append(head, body);
    scroll.append(table);
    episodes.append(scroll);
    layout.append(info, figure, episodes, recent());
    main.append(layout);
  }

  function renderEpisode(main, podcast, pc, episode) {
    heading(main, episode.titel, `podcast.html?pc=${pc}`, podcast.titel);
    const layout = node('div', 'episode-layout');
    const content = node('div', 'episode-main');
    const info = section('', 'episode-info-title', 'Informationen zur Episode', '01 / Die Episode');
    info.append(node('p', 'learning-description', episode.beschreibung));
    const facts = node('dl', 'learning-facts episode-facts');
    fact(facts, 'Titel', episode.titel);
    fact(facts, 'Podcast', link(`podcast.html?pc=${pc}`, podcast.titel, 'text-link'));
    fact(facts, 'Veröffentlicht', time(episode.datum));
    fact(facts, 'Dauer', episode.dauer<60000 ? `${Math.round(episode.dauer/1000)} Sekunden` : episode.getDauerInStundenUndMinuten());
    info.append(facts);
    const player = section('audio-card', 'player-title', 'Abspielen', '02 / Audio');
    player.append(node('p', 'learning-description', episode.beschreibung));
    const audio = node('audio');
    audio.controls = true;
    audio.preload = 'none';
    audio.setAttribute('aria-label', `Episode abspielen: ${episode.titel}`);
    const source = node('source');
    source.src = episode.audio.url;
    source.type = episode.audio.typ;
    audio.append(source, document.createTextNode('Dein Browser kann den Audioplayer nicht anzeigen. '), link(episode.audio.url, 'Audiodatei öffnen'));
    const meta = node('div', 'audio-meta');
    meta.append(node('span', '', `${episode.audio.typ} · ${Math.round(episode.dauer / 1000)} Sekunden · ${(episode.audio.groesse / 1048576).toLocaleString('de-DE', {maximumFractionDigits:1})} MB`), link(episode.audio.url, 'Audiodatei öffnen ↗', 'text-link'));
    const status=node('p','audio-status','Der Stream konnte nicht geladen werden. Öffne die Originalquelle über den Link.');status.hidden=true;status.setAttribute('role','status');player.append(status);
    player.append(audio,meta,node('p','audio-note','Original-Podcaststream von c’t uplink. Audio und Video benötigen Internet. Die Rechte bleiben beim Anbieter.')); 
    content.append(info,player);
    if(episode.video)content.append(makeVideo(episode.video));
    if(episode.quelle){const original=link(episode.quelle,'Originalfolge und Shownotes beim Anbieter ↗','text-link');original.target='_blank';original.rel='noopener noreferrer';info.append(original);}
    layout.append(content, recent());
    main.append(layout);
  }

  // Einbettungen entstehen mit DOM-Methoden; keine HTML-Strings aus Feeds.
  function makeVideo(video){
    const card=section('video-card','video-title','Dein Video zum Thema','03 / Ergänzendes Video');
    card.append(node('p','learning-description',video.titel));
    const box=node('div','youtube-player');box.dataset.videoId=video.id;box.dataset.videoTitle=video.titel;
    const image=node('img');image.src=`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;image.alt=`Videovorschau: ${video.titel}`;image.width=480;image.height=360;image.loading='lazy';
    const button=node('button','youtube-load');button.type='button';const play=node('span','youtube-play','▶');play.setAttribute('aria-hidden','true');button.append(play,node('span','','YouTube-Video laden'));box.append(image,button);
    const meta=node('div','media-source');const original=link(`https://www.youtube.com/watch?v=${video.id}`,'Auf YouTube ansehen ↗','text-link');original.target='_blank';original.rel='noopener noreferrer';meta.append(node('span','',`Quelle: ${video.kanal} · YouTube`),original);
    card.append(box,meta,node('p','audio-note','Der Player wird beim Laden von YouTube eingebunden. Falls die Einbettung blockiert ist, öffne den direkten YouTube-Link. Ein ergänzendes Tutorial kann einen anderen Inhalt als die Audiofolge haben.'));return card;
  }

  // PC-FINDER: Empfehlungen je Nutzung, Schwerpunkt und Budget.
  // Gewichtung: 1 = unwichtig, 5 = entscheidend. Komponenten sind Beispiele (Stand 2026).
  const FINDER_BUDGETS = { einstieg: 'bis ca. 900 €', mittel: 'ca. 900–1.600 €', high: 'ab ca. 1.600 €' };
  const PC_FINDER = {
    gaming: {
      name: 'Gaming', podcast: 0,
      intro: 'Beim Gaming entscheidet vor allem die Grafikkarte über die Bildrate. Ein moderner Prozessor mit 6 bis 8 Kernen reicht für die meisten Spiele.',
      fokus: {
        fhd: ['Full HD (1080p), z. B. E-Sport', 'In Full HD reicht eine Mittelklasse-Grafikkarte. Ein Monitor mit 144 Hz oder mehr bringt hier oft mehr als eine teurere GPU.'],
        wqhd: ['WQHD (1440p), aktuelle AAA-Spiele', 'WQHD ist der Sweet Spot. Achte auf mindestens 12 GB, besser 16 GB Grafikspeicher.'],
        uhd: ['4K mit hohen Details', '4K braucht eine Oberklasse-Grafikkarte. Mit kleinerem Budget lieber WQHD und Upscaling (DLSS/FSR) nutzen.']
      },
      gewichtung: { Prozessor: 3, Grafikkarte: 5, Arbeitsspeicher: 3, SSD: 2 },
      builds: {
        einstieg: { Prozessor: 'AMD Ryzen 5 7500F / Intel Core i5-14400F', Grafikkarte: 'NVIDIA RTX 5060 / AMD RX 9060 XT', Arbeitsspeicher: '16–32 GB DDR5', SSD: '1 TB NVMe', Netzteil: '550 W, 80 PLUS Bronze' },
        mittel: { Prozessor: 'AMD Ryzen 7 7800X3D', Grafikkarte: 'NVIDIA RTX 5070 / AMD RX 9070 (12–16 GB)', Arbeitsspeicher: '32 GB DDR5-6000', SSD: '2 TB NVMe', Netzteil: '750 W, 80 PLUS Gold' },
        high: { Prozessor: 'AMD Ryzen 7 9800X3D', Grafikkarte: 'NVIDIA RTX 5070 Ti / RTX 5080 / AMD RX 9070 XT', Arbeitsspeicher: '32 GB DDR5-6000', SSD: '2–4 TB NVMe (PCIe 4.0 oder 5.0)', Netzteil: '850 W, 80 PLUS Gold' }
      },
      tipps: ['Prozessoren mit großem Cache (X3D) bringen in Spielen spürbar mehr Bilder pro Sekunde.', 'Plane beim Netzteil Reserve für eine spätere, stärkere Grafikkarte ein.']
    },
    coding: {
      name: 'Coding', podcast: 1,
      intro: 'Beim Programmieren zählen viele CPU-Kerne für kurze Build-Zeiten, viel Arbeitsspeicher für IDE, Browser und Container sowie eine schnelle SSD. Eine große Grafikkarte brauchst du meist nicht.',
      fokus: {
        web: ['Web- und App-Entwicklung', 'Für Web-Projekte reicht oft die integrierte Grafik. Investiere lieber in RAM und einen zweiten Monitor.'],
        container: ['Große Projekte, Docker & VMs', 'Container und virtuelle Maschinen brauchen RAM: Plane mindestens 32 GB ein, besser 64 GB.'],
        ki: ['Machine Learning / KI lokal', 'Für lokale KI-Modelle ist eine NVIDIA-Grafikkarte mit viel Grafikspeicher (16 GB oder mehr) wichtiger als der Prozessor.']
      },
      gewichtung: { Prozessor: 5, Grafikkarte: 1, Arbeitsspeicher: 5, SSD: 4 },
      builds: {
        einstieg: { Prozessor: 'AMD Ryzen 5 8600G / Intel Core i5-14500 (mit integrierter Grafik)', Grafikkarte: 'Integrierte Grafik reicht', Arbeitsspeicher: '32 GB DDR5', SSD: '1 TB NVMe', Netzteil: '450 W, 80 PLUS Bronze' },
        mittel: { Prozessor: 'AMD Ryzen 7 9700X / Intel Core Ultra 7 265K', Grafikkarte: 'Einfache Karte für mehrere Monitore (z. B. RTX 5050) oder integriert', Arbeitsspeicher: '64 GB DDR5', SSD: '2 TB NVMe', Netzteil: '550 W, 80 PLUS Gold' },
        high: { Prozessor: 'AMD Ryzen 9 9950X (16 Kerne)', Grafikkarte: 'NVIDIA RTX 5070 Ti / RTX 5080 (16 GB) für KI-Workloads', Arbeitsspeicher: '64–128 GB DDR5', SSD: '2 TB NVMe + 2 TB für Projekte', Netzteil: '850 W, 80 PLUS Gold' }
      },
      tipps: ['Linux, WSL und Docker profitieren stark von schnellen NVMe-SSDs.', 'Ein leiser CPU-Kühler und ein gut belüftetes Gehäuse machen lange Arbeitstage angenehmer.']
    },
    design: {
      name: 'Design', podcast: 2,
      intro: 'Kreative Programme brauchen eine ausgewogene Mischung: viele Kerne für Export und Rendering, viel RAM für große Dateien und eine Grafikkarte zur Beschleunigung in Premiere, DaVinci Resolve oder Blender.',
      fokus: {
        foto: ['Grafik & Fotobearbeitung', 'Für Photoshop und Lightroom sind schnelle Kerne, 32 GB RAM und ein farbtreuer Monitor wichtiger als eine Top-Grafikkarte.'],
        video: ['Videoschnitt', 'Für 4K-Schnitt lohnen sich 64 GB RAM, eine NVIDIA-Grafikkarte für Hardware-Beschleunigung und eine eigene SSD für Cache-Dateien.'],
        render: ['3D & Rendering', 'Blender und andere 3D-Programme rendern auf der Grafikkarte: Viel Grafikspeicher ist hier der wichtigste Faktor.']
      },
      gewichtung: { Prozessor: 4, Grafikkarte: 4, Arbeitsspeicher: 5, SSD: 4 },
      builds: {
        einstieg: { Prozessor: 'AMD Ryzen 5 9600X / Intel Core i5-14600K', Grafikkarte: 'NVIDIA RTX 5060 (8 GB)', Arbeitsspeicher: '32 GB DDR5', SSD: '1 TB NVMe + externe SSD für Archive', Netzteil: '650 W, 80 PLUS Bronze' },
        mittel: { Prozessor: 'AMD Ryzen 7 9700X / Intel Core Ultra 7 265K', Grafikkarte: 'NVIDIA RTX 5070 (12 GB)', Arbeitsspeicher: '64 GB DDR5', SSD: '2 TB NVMe + 1 TB Cache-SSD', Netzteil: '750 W, 80 PLUS Gold' },
        high: { Prozessor: 'AMD Ryzen 9 9950X / Intel Core Ultra 9 285K', Grafikkarte: 'NVIDIA RTX 5080 (16 GB) / RTX 5090 (32 GB)', Arbeitsspeicher: '64–128 GB DDR5', SSD: '4 TB NVMe, getrennt für System, Projekte und Cache', Netzteil: '1000 W, 80 PLUS Gold' }
      },
      tipps: ['Ein kalibrierter Monitor ist für Farbarbeit genauso wichtig wie der PC selbst.', 'Sichere deine Projekte regelmäßig auf einer externen SSD oder einem NAS.']
    },
    alltag: {
      name: 'Alltags', podcast: 3,
      intro: 'Für Office, Surfen, Streaming und Videocalls reicht ein sparsamer PC. Ein Mini-PC oder ein gebrauchter Business-Rechner ist oft die klügste Wahl.',
      fokus: {
        office: ['Office, Surfen & Streaming', 'Ein Mini-PC mit integrierter Grafik ist leise, sparsam und spart Platz auf dem Schreibtisch.'],
        familie: ['Familien-PC mit Fotos', 'Plane mehr Speicherplatz für Fotos und Videos ein und richte ein automatisches Backup ein.'],
        gebraucht: ['Möglichst günstig (gebraucht)', 'Gebrauchte Business-PCs (z. B. Lenovo ThinkCentre, Dell OptiPlex, HP EliteDesk) sind robust und günstig. Achte auf eine SSD statt einer Festplatte.']
      },
      gewichtung: { Prozessor: 2, Grafikkarte: 1, Arbeitsspeicher: 3, SSD: 3 },
      builds: {
        einstieg: { Prozessor: 'Mini-PC mit AMD Ryzen 5 / Intel Core i5 (Mobil-CPU)', Grafikkarte: 'Integrierte Grafik', Arbeitsspeicher: '16 GB', SSD: '512 GB NVMe', Netzteil: 'Externes Netzteil (Mini-PC)' },
        mittel: { Prozessor: 'AMD Ryzen 7 8700G / Mini-PC mit Ryzen 7', Grafikkarte: 'Integrierte Radeon-Grafik (reicht auch für einfache Spiele)', Arbeitsspeicher: '32 GB DDR5', SSD: '1 TB NVMe', Netzteil: 'Externes Netzteil oder 400 W, 80 PLUS Bronze' },
        high: { Prozessor: 'AMD Ryzen 7 8700G / Intel Core Ultra 7', Grafikkarte: 'Integrierte Grafik', Arbeitsspeicher: '32 GB DDR5', SSD: '2 TB NVMe', Netzteil: '450 W, 80 PLUS Gold (besonders leise)' }
      },
      budgetHinweis: { high: 'Für den Alltag brauchst du kein High-End-Budget. Investiere das Gesparte lieber in Monitor, Tastatur und Backup.' },
      tipps: ['Ein guter Monitor und eine bequeme Tastatur verbessern den Alltag mehr als ein schnellerer Prozessor.', 'Sparsame Hardware senkt die Stromkosten, wenn der PC viele Stunden am Tag läuft.']
    }
  };

  function finderResult(nutzung, schwerpunkt, budget) {
    const profile = PC_FINDER[nutzung];
    const card = section('finder-result', 'finder-result-title', `${profile.name}-PC · ${FINDER_BUDGETS[budget]}`, '02 / Deine Empfehlung');
    card.append(node('p', 'learning-description', profile.intro));
    const tip = node('div', 'learning-tip');
    const icon = node('span', '', '✳');
    icon.setAttribute('aria-hidden', 'true');
    tip.append(icon, node('p', '', profile.fokus[schwerpunkt][1]));
    card.append(tip);
    if (profile.budgetHinweis?.[budget]) card.append(node('p', 'finder-budget-note', profile.budgetHinweis[budget]));
    card.append(node('h3', '', 'Darauf kommt es an'));
    const weights = node('ul', 'finder-weights');
    Object.entries(profile.gewichtung).forEach(([part, value]) => {
      const item = node('li');
      const bar = node('span', `weight-bar weight-${value}`);
      bar.setAttribute('aria-hidden', 'true');
      bar.append(node('span'));
      item.append(node('span', '', part), bar, node('span', 'weight-value', `${value}/5`));
      weights.append(item);
    });
    card.append(weights, node('h3', '', 'Beispielkonfiguration'));
    const facts = node('dl', 'learning-facts');
    Object.entries(profile.builds[budget]).forEach(([part, value]) => fact(facts, part, value));
    card.append(facts, node('h3', '', 'Tipps'));
    const tips = node('ul', 'finder-tips');
    profile.tipps.forEach(text => tips.append(node('li', '', text)));
    card.append(tips);
    const actions = node('div', 'finder-actions');
    actions.append(link(`podcast.html?pc=${profile.podcast}`, `Podcast hören: ${LEARN_CATALOG[profile.podcast].titel}`, 'button'));
    card.append(actions, node('p', 'catalog-note', 'Beispielkomponenten mit Stand 2026. Preise und Verfügbarkeit ändern sich – vergleiche vor dem Kauf aktuelle Tests.'));
    return card;
  }

  function renderFinder(main) {
    main.append(finderTemplate.content.cloneNode(true));
    const form = main.querySelector('#pcFinderForm');
    const focus = form.elements.schwerpunkt;
    const slot = main.querySelector('#pcFinderResult');
    const fillFocus = () => {
      const fokus = PC_FINDER[form.elements.nutzung.value].fokus;
      focus.replaceChildren(...Object.entries(fokus).map(([value, [label]]) => {
        const option = node('option', '', label);
        option.value = value;
        return option;
      }));
    };
    const update = () => slot.replaceChildren(finderResult(form.elements.nutzung.value, focus.value, form.elements.budget.value));
    form.addEventListener('change', event => {
      if (event.target.name === 'nutzung') fillFocus();
      update();
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      update();
      const result = slot.querySelector('h2');
      result.tabIndex = -1;
      result.focus();
    });
    // Nach dem Zurücksetzen stehen die Standardwerte erst im nächsten Takt fest.
    form.addEventListener('reset', () => setTimeout(() => { fillFocus(); update(); }));
    fillFocus();
    update();
  }

  // 4. NAVIGATION: #/ ist die Übersicht; Details bekommen ihre Array-Indizes.
  function routeURL(href){
    const values=new URLSearchParams((href.split('?')[1]||'').split('#')[0]);
    if(href.startsWith('podcast.html'))return `#/podcast/${values.get('pc')||0}`;
    if(href.startsWith('episode.html'))return `#/episode/${values.get('pc')||0}/${values.get('ep')||0}`;
    if(href.startsWith('newPodcast.html'))return '#/neu';
    if(href.startsWith('index.html'))return '#/';
    return href;
  }

  // 5. BEDIENUNG: Diese Handler werden an die frisch angezeigte Übersicht gebunden.
  function bindHomeControls(){
    const collection=document.getElementById('podcastCollection');
    const toggle=document.getElementById('podcastViewToggle');
    const search=document.getElementById('podcastSearch');
    if(!collection||!toggle||!search)return;
    toggle.addEventListener('click',()=>{
      const list=collection.classList.toggle('podcast-list');
      toggle.textContent=list?'Kachelansicht':'Listenansicht';
      toggle.setAttribute('aria-pressed',String(list));
    });
    search.addEventListener('input',()=>{
      const query=search.value.trim().toLocaleLowerCase('de-DE');let count=0;
      collection.querySelectorAll('[data-podcast-title]').forEach(item=>{
        item.hidden=!item.dataset.podcastTitle.toLocaleLowerCase('de-DE').includes(query);
        if(!item.hidden)count++;
      });
      document.getElementById('podcastEmpty').hidden=count>0;
    });
    // Finden und das Neuanlageformular behalten ihre echten FH-Testaktionen.
  }

  const main=document.getElementById('main-content');
  document.querySelector('.skip-link').addEventListener('click',event=>{
    event.preventDefault();main.focus();main.scrollIntoView();
  });
  const homeView=main.cloneNode(true);
  const newTemplate=document.getElementById('new-podcast-template');
  const finderTemplate=document.getElementById('pc-finder-template');
  function renderApp(navigation=false){
    const route=location.hash||'#/';
    const podcastMatch=/^#\/podcast\/(0|[1-9]\d*)$/.exec(route);
    const episodeMatch=/^#\/episode\/(0|[1-9]\d*)\/(0|[1-9]\d*)$/.exec(route);
    main.replaceChildren();main.classList.toggle('podcast-overview',route==='#/'||route==='#');
    if(route==='#/'||route==='#'){
      main.append(...[...homeView.childNodes].map(child=>child.cloneNode(true)));
      document.title='Buildwise Audio · Abonnierte Podcasts';bindHomeControls();
    }else if(route==='#/neu'){
      main.append(newTemplate.content.cloneNode(true));
      main.querySelector('.new-podcast-layout').append(recent());
      document.title='Podcast anlegen · Buildwise';
    }else if(route==='#/pc-finder'){
      renderFinder(main);
      document.title='PC-Finder · Buildwise';
    }else if(podcastMatch&&LEARN_CATALOG[Number(podcastMatch[1])]){
      const index=Number(podcastMatch[1]);renderPodcast(main,LEARN_CATALOG[index],index);
      document.title=`${LEARN_CATALOG[index].titel} · Buildwise`;
    }else if(episodeMatch&&LEARN_CATALOG[Number(episodeMatch[1])]?.episoden[Number(episodeMatch[2])]){
      const pc=Number(episodeMatch[1]),ep=Number(episodeMatch[2]);
      const podcast=LEARN_CATALOG[pc];renderEpisode(main,podcast,pc,podcast.episoden[ep]);
      document.title=`${podcast.episoden[ep].titel} · Buildwise`;
    }else{
      const error=section('','not-found-title','Diese Ansicht gibt es nicht','Kurz verlaufen');
      error.append(node('p','learning-description','Dieser Podcast oder diese Episode ist nicht vorhanden.'),link('#/','Zur Übersicht','button'));main.append(error);
      document.title='Ansicht nicht gefunden · Buildwise';
    }
    document.querySelectorAll('.page-nav a').forEach(item=>{
      const href=item.getAttribute('href');
      const active=href==='#/'?(route==='#/'||route==='#'):route.startsWith(href.replace(/\/0(?:\/0)?$/,''));
      if(active)item.setAttribute('aria-current','page');else item.removeAttribute('aria-current');
    });
    if(navigation){window.scrollTo(0,0);main.focus({preventScroll:true});}
  }
  window.addEventListener('hashchange',()=>renderApp(true));
  renderApp();

})();

/* INTERNETMEDIEN: Player erst nach einer bewussten Aktion einbetten. */
document.addEventListener('click', event => {
  const button=event.target.closest('.youtube-load');if(!button)return;
  const box=button.closest('.youtube-player');const id=box.dataset.videoId;
  if(!/^[A-Za-z0-9_-]{11}$/.test(id))return;
  const frame=document.createElement('iframe');
  frame.src=`https://www.youtube-nocookie.com/embed/${id}?rel=0`;
  frame.title=box.dataset.videoTitle || 'YouTube-Video';
  frame.allow='accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share';
  frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';
  box.replaceChildren(frame);frame.focus();
});
document.addEventListener('error',event=>{
  if(event.target.tagName!=='AUDIO')return;
  const message=event.target.parentElement.querySelector('.audio-status');if(message)message.hidden=false;
},true);
