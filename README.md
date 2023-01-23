## backend-photogallerie-seedscript

### Part 1

```js

Erstelle ein Seed-Skript für deine Galerie-App. Berücksichtige dabei folgende Bedingungen:
- Das Seed-Skript soll Fotos mit Daten aus dem Modul faker erzeugen
- Das Skript soll über "npm run seed" aufrufbar sein
- Standardmäßig sollen 20 Einträge erzeugt werden
- Über einen Parameter (process.argv) soll eine andere Anzahl erzeugt werden können
- Die Collection soll vor dem Befüllen geleert werden
- Über einen weiteren Parameter soll das Leeren verhindert werden können
```

### Part 2

```js
Erweitere dein Photo-Model um SubDocuments, in denen das eingesetzte Equipment und die Einstellungen gespeichert werden.
- Das Equipment soll ein Array sein.
- Jedes Teil soll eine Bezeichnung und optional einen Herstellernamen erhalten.
- Die Einstellungen sollen ein Objekt sein.
- Folgende Einstellungen sollen angegeben werden: Brennweite (focal length), Belichtungszeit (exposure), Blende (aperture), Empfindlichkeit (iso), Weißabgleich (white balance).
Versuche die Einstellungen so gut wie möglich zu validieren.
```

### Part 3

```js
Füge deiner Galerie-App ein Album-Model hinzu.
Richte eine Referenz zwischen Photo und Album ein. Überlege dir, wo du die Referenz speicherst.
Erweitere auch dein Seed-Script, damit du Alben automatisch generieren kannst.
```

### Part 4

```js
- Richte eine Validation Middleware für deine Endpoints in der Galerie-App ein.
- Kopiere zuerst unsere validate-Funktion oder schreibe sie selbst neu und kommentiere jede einzelne Zeile mit deinen eigenen Worten.
- Beschreibe möglichst genau, was dort getan wird. Wenn du in einem Job Interview gefragt wirst, was dieser Code macht, solltest du es gut beschreiben können.
Achte auf die Bedingungen in den Mongoose Schemas und versuche, diese für Ajv umzusetzen.
Wenn du dich schrittweise durcharbeiten möchtest, nimm die Property additionalProperties: false raus oder setze sie auf true. So kannst du eine Property nach der anderen validieren und testen und musst nicht alles auf einmal machen.
Bei den SubDocuments wird es etwas komplizierter. Wie kannst du auch hier sicherstellen, dass dort alles von Ajv überprüft wird?
```
