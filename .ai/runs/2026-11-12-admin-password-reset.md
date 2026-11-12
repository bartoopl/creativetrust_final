# Odzyskanie dostępu do /admin

Gałąź: `feat/admin-password-reset`

## Cel

Właściciel nie ma hasła do panelu Payload. Dajemy dwa udokumentowane sposoby: „zapomniałem hasła” z linkiem z logów (Payload bez adaptera maili zapisuje maile do konsoli) i skrypt ustawiający hasło przez Local API.

## Non-goals

- Bez konfiguracji wysyłki maili z Payload i bez zmian w kolekcji `users`.

## Progress

PR: #30

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Skrypt i instrukcja

- [x] 1.1 Skrypt set-admin-password z testami
- [x] 1.2 Instrukcja w DEPLOY.md
