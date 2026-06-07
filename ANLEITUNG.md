# So bringst du die Seite online (ohne Technik-Stress)

Plan: Ordner zu **GitHub** hochladen → mit **Netlify** veröffentlichen → Bilder
nachträglich einfach reinziehen. Dauert beim ersten Mal ~15 Minuten.

---

## 1) Ordner zu GitHub hochladen (ohne Git, nur im Browser)

1. Auf [github.com](https://github.com) einloggen (oder kostenlos registrieren).
2. Oben rechts **+ → New repository**. Name z. B. `emrich-website`,
   auf **Public** lassen, **Create repository**.
3. Auf der nächsten Seite: **„uploading an existing file"** anklicken.
4. Den **kompletten Inhalt** des Ordners `emrich-website` ins Browserfenster
   ziehen — also `index.html`, `anfrage.html`, `danke.html`, `impressum.html`,
   `datenschutz.html`, die Ordner `css`, `js`, `images` sowie `netlify.toml`.
   > Wichtig: den **Inhalt** des Ordners hochladen, nicht den Ordner selbst –
   > `index.html` muss ganz oben im Repository liegen.
5. Unten **Commit changes** klicken. Fertig – dein Code ist auf GitHub.

---

## 2) Mit Netlify veröffentlichen (kostenlos)

1. Auf [netlify.com](https://www.netlify.com) mit dem GitHub-Konto anmelden.
2. **Add new site → Import an existing project → GitHub** → dein Repo
   `emrich-website` auswählen.
3. Einstellungen so lassen (Build command **leer**, Publish directory **`.`**)
   → **Deploy site**.
4. Nach ~30 Sekunden ist die Seite unter einer `…netlify.app`-Adresse live.
5. Eigene Domain: **Domain settings → Add a domain** und der Anleitung folgen.

Jede spätere Änderung auf GitHub veröffentlicht Netlify automatisch neu.

---

## 3) Bilder einsetzen (ganz einfach)

Die Seite zeigt überall beschriftete Platzhalter mit dem **gewünschten
Dateinamen**. Du musst die Bilder nur passend benennen und in den Ordner
`images/` legen – dann erscheinen sie automatisch, **ohne Code zu ändern**.

So geht's: Auf GitHub in den Ordner `images/` gehen → **Add file → Upload
files** → deine Fotos mit exakt diesen Namen hochladen → **Commit**.

| Dateiname | Was rein soll | Format |
|-----------|---------------|--------|
| `logo.png` | EMRICH-Logo (transparent) | PNG |
| `hero-team.jpg` | Hero oben: Team / Praxis | 1280×720 · 16:9 |
| `tobias-portrait.jpg` | Porträt Tobias (Expertise) | 1000×1250 · 4:5 |
| `tobias-praxis.jpg` | Tobias in der Praxis | 1000×1250 · 4:5 |
| `tobias-ueber.jpg` | Porträt „Über Tobias" | 750×1000 · 3:4 |
| `behandlung-1…4.jpg` | „Dein Weg" (4 Bilder) | 600×800 · 3:4 |
| `schritt-1…4.jpg` | Timeline-Schritte | 1200×825 · 16:11 |
| `galerie-1…6.jpg` | Galerie unter der Karte | 800×600 · 4:3 |

> Hinweis: Die 3 KI-Bilder (CTA-Hintergründe, Symbolbild Erschöpfung) sind schon
> eingebunden und funktionieren sofort. Persönliche/Praxis-Fotos bitte durch
> **echte Aufnahmen** ersetzen.

---

## 4) Das Anfrage-Formular

- Der Button **„Informationsgespräch vereinbaren"** öffnet überall die eigene
  Seite `anfrage.html` (mehrstufiges Formular mit Fortschrittsbalken).
- Der Versand läuft über **Netlify Forms** – das ist **ohne Zusatzkonto** aktiv,
  sobald die Seite auf Netlify liegt. Nach dem Absenden landet der Nutzer auf
  `danke.html`.
- Eingegangene Anfragen siehst du im Netlify-Dashboard unter **Forms → „anfrage"**.
- E-Mail-Benachrichtigung einrichten: **Site settings → Forms → Form
  notifications → Add notification → Email notification** (deine E-Mail eintragen).

> Nur auf reinem GitHub Pages (ohne Netlify) kann das Formular keine Daten
> empfangen – mit Netlify funktioniert es automatisch.

---

## Kurz-Checkliste

- [ ] Ordnerinhalt zu GitHub hochgeladen (`index.html` liegt oben)
- [ ] Netlify-Site verbunden und deployed
- [ ] `logo.png` + echte Fotos in `images/` hochgeladen
- [ ] Testanfrage übers Formular geschickt und in Netlify → Forms geprüft
- [ ] E-Mail-Benachrichtigung für neue Anfragen aktiviert
- [ ] (optional) eigene Domain verbunden
