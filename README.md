# EMRICH Gesundheitspraxis – Website (statischer Nachbau)

1:1-Nachbau der OnePage-Seite `emrich-gesundheitspraxis.de` als statische
HTML/CSS/JS-Website – bereit für GitHub + Netlify.

## Struktur

```
emrich-website/
├─ index.html         # Startseite
├─ anfrage.html       # Mehrstufiges Anfrage-/Kontaktformular (Funnel)
├─ impressum.html     # Impressum
├─ datenschutz.html   # Datenschutzerklärung
├─ css/style.css      # Gesamtes Styling (Farben, Layout, Responsive)
├─ js/main.js         # Mobile-Menü + Akkordeons
├─ images/            # (noch leer – siehe „Bilder" unten)
├─ netlify.toml       # Netlify-Konfiguration
└─ README.md
```

## Lokal ansehen

Einfach `index.html` im Browser öffnen – oder ein kleiner lokaler Server:

```bash
cd emrich-website
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

## Veröffentlichen über GitHub + Netlify

1. Neues GitHub-Repository anlegen und den Ordner `emrich-website` pushen.
2. Auf netlify.com „Add new site → Import an existing project" wählen, das Repo verbinden.
3. **Build command:** leer lassen. **Publish directory:** `.` (bzw. `emrich-website`).
4. Deploy starten – fertig. Eigene Domain unter „Domain settings" verbinden.

## ⚠️ Zuerst: Logo einfügen

Die Seite bindet das Logo als `images/logo.png` ein. **Bitte das gelieferte
EMRICH-Logo (PNG mit transparentem Hintergrund) in den Ordner `images/`
legen und exakt `logo.png` nennen.** Solange das fehlt, zeigt der Browser
oben links ein „kaputtes Bild"-Symbol mit dem Text „EMRICH Gesundheitspraxis".

Optional kann auch das Hero-Bild lokal abgelegt werden (`images/hero.jpg`) –
aktuell lädt es noch von der CDN.

## Cell-Reset-Grafik (animiert)

Der Abschnitt „Die Therapie – Cell Reset Methode" enthält jetzt eine selbst
gebaute, animierte SVG/CSS-Grafik im Marken-Look (Navy/Gold): rotierender Kern,
Orbit-Ring, fünf Phasen (Verstehen · Entlasten · Regenerieren · Stärken ·
Stabilisieren), die beim Scrollen gestaffelt erscheinen. Es wird **kein
Platzhalterbild** mehr benötigt.

## Unsere Methoden (animiert)

Auch der Block „Unsere Methoden" (Ernährung & Supplements · Bewegung & Atmung ·
Nerven & Muskeln · Infusionen · Bioenergetische Stimulation) ist jetzt
animiertes HTML statt Bild – farbige Karten mit schwebenden Icon-Badges, die
beim Scrollen gestaffelt erscheinen.

## Standort-Karte mit Radar

Die OpenStreetMap-Einbettung wurde durch eine animierte Baden-Württemberg-Karte
im CI-Look (Navy/Gold) ersetzt: ein Radar-Ping pulst aus Reutlingen heraus und
visualisiert die Reichweite (Deutschland, Österreich, Schweiz). Die Landes-Silhouette
ist eine stilisierte Nachbildung – wer die exakte offizielle SVG einsetzen möchte,
kann den `<path>` in `index.html` (Klasse `geo__shape`) durch das amtliche
Pfad-Datum ersetzen.

## Animationen

Die ganze Seite hat Scroll-Animationen (Einblenden/Hochgleiten, gestaffelte
Karten, Hero-Entrance, Header-Schatten beim Scrollen). Sie sind in `js/main.js`
gesteuert und greifen nur bei aktivem JavaScript – ohne JS bleibt alles sichtbar.
`prefers-reduced-motion` wird respektiert (Animationen aus).

## Video

Im Diagnose-Abschnitt ist das YouTube-Video (youtu.be/Unt1GJyryzc) als
datensparsame `youtube-nocookie`-Einbettung integriert.

## Bild-Platzhalter: Dateinamen & Formate

Jeder Bildplatz zeigt einen beschrifteten Platzhalter mit Format. Sobald du eine
Datei mit dem genannten Namen in `images/` legst, erscheint sie automatisch
(kein Code-Eingriff nötig). Empfohlene Dateien:

| Datei | Inhalt | Format |
|-------|--------|--------|
| `logo.png` | EMRICH-Logo (transparent) | PNG |
| `hero-team.jpg` | Hero: Team / Praxis | 1280×720 · 16:9 |
| `tobias-portrait.jpg` | Porträt Tobias Emrich (Expertise) | 1000×1250 · 4:5 |
| `tobias-praxis.jpg` | Tobias in der Praxis („Kennst du das") | 1000×1250 · 4:5 |
| `tobias-ueber.jpg` | Porträt „Über Tobias Emrich" | 750×1000 · 3:4 |
| `behandlung-1…4.jpg` | „Dein Weg" – 4 Behandlungsbilder | 600×800 · 3:4 |
| `schritt-1…4.jpg` | Timeline „So geht es weiter" | 1200×825 · 16:11 |
| `standort-1…3.jpg` | Standort-/Praxisfotos (links neben der Karte) | 800×600 · 4:3 |
| `testi-1…4.jpg` | Vorschaubilder der 4 Haupt-Patientenvideos | 1280×800 · 16:10 |
| `testi-5…7.jpg` | Vorschaubilder „Weitere Patientenstimmen" | 800×600 · 4:3 |

> Patientenvideos: Die Karten zeigen einen Play-Button. Für ein Vorschaubild eine
> Datei `testi-N.jpg` ablegen. Sobald du echte Video-Links hast, kann der
> Platzhalter durch eine YouTube-/Vimeo-Einbettung ersetzt werden.
| `erschoepfung.jpg` | Symbolbild Erschöpfung *(KI vorbefüllt)* | 1000×1250 · 4:5 |
| `cta-bg.jpg`, `cta-bg-2.jpg` | CTA-Hintergründe *(KI vorbefüllt)* | 1920×1080 · 16:9 |

Die drei mit *(KI vorbefüllt)* markierten Bilder wurden mit Higgsfield erzeugt
und sind bereits eingebunden (per Bild-URL). Für den Dauerbetrieb herunterladen,
unter dem genannten Namen in `images/` speichern und die URL im `index.html`
auf den lokalen Pfad ändern. Alle Personen-/Praxisbilder solltest du durch
**echte Fotos** der Praxis ersetzen.

## Bilder lokalisieren

Die Bilder werden aktuell noch von der OnePage-CDN (`onecdn.io`) geladen, damit
die Seite sofort 1:1 aussieht. **Sobald OnePage gekündigt wird, funktionieren
diese Links nicht mehr.** Vorher unbedingt:

1. Bilder herunterladen (Rechtsklick → Speichern, oder Original-Seite besuchen).
2. In den Ordner `images/` legen.
3. In den HTML-Dateien die `onecdn.io`-URLs durch `images/dateiname.jpg` ersetzen.

Die Patienten-Testimonial-Videos sind als Platzhalter (Play-Button) angelegt –
hier später die echten Video-Einbettungen (z. B. YouTube/Vimeo) eintragen.

## Anfrage-Formular anbinden

`anfrage.html` ist ein 5-stufiges Formular (Vorname, Nachname, Quelle,
Beschwerden, Kontakt). Da eine statische Seite kein Backend hat, muss der
Versand an einen Dienst angebunden werden. Vorbereitet ist **Formspree**:

1. Account auf formspree.io anlegen, ein Formular erstellen.
2. In `anfrage.html` im `<form …>` die `action`-URL ersetzen:
   `action="https://formspree.io/f/IHRE-FORM-ID"`.

Alternativ **Netlify Forms**: dem `<form>` `netlify` und `name="anfrage"`
hinzufügen – dann landen Einsendungen direkt im Netlify-Dashboard.

## Schriften

Original: Überschriften „SK Modernist", Fließtext „Roboto". Da SK Modernist
nicht frei lizenziert ist, wird als nahe Alternative **Montserrat** verwendet.
Wer die Originallizenz besitzt, bindet die Schrift per `@font-face` ein und
passt in `css/style.css` die Variable `--font-head` an.

## Farben (aus dem Original extrahiert)

| Zweck            | Hex       |
|------------------|-----------|
| Dunkelblau       | `#042d5f` |
| Gold/Akzent      | `#ae9b69` |
| Rot (Akzent)     | `#ff0400` |
| Heller Hintergrund | `#e8eef6` |
