# Static Responses

##Guide

Es können neue JSON Dateien eingefügt werden.

Wenn ein json den key "origin" enthält wird dieser verwendet um als Abfrage zur Verfügung zu stehen.

Ist bei origin kein "get" oder "set" im Pfad wird automatisch "get" angenommen.

Beispiel für ein gültiges JSON:

```json
{
  "data": "GSD",
  "name": "wasSet",
  "origin": "/mmsp/communication/clientName/set"
} 
```
