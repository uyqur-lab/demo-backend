# Agent konteksti — demo-backend

Qatlam: **BE**. Faqat `[BE]` yorlig'idagi AC'lar ustida ishlaysiz.

## Majburiy o'qish

| Fayl | Qachon |
|---|---|
| `~/.uyqur/agent-standards/rules/dev-rules.md` | har ish boshida |
| `~/.uyqur/agent-standards/tasks/CU-<id>-*/` — **barcha** `.md` | task boshida |

Task hujjatlari bu repo'da emas, oyna klonda. `/task-start` ularni yangilaydi.

## Ish tartibi

1. `/task-start <CU-id>` — hujjatlar o'qiladi, brief beriladi, branch ochiladi
2. Kod va `<CU-id> AC-<n>:` bilan boshlanadigan testlar birga
3. `/task-check` → `GATE: OCHIQ` va `backend.md` yoziladi
4. `gh pr create`

## Kontrakt egasi sizmiz

`backend.md` — sizning asosiy yetkazmangiz. Uni FE va MB devlari ish
boshlashdan **oldin** o'qiydi. Unda "men nima qildim" emas, "sen nimaga
tayanasan" yoziladi: endpoint, so'rov/javob JSON, xato holatlari va status
kodlari, natijani qayerda ko'rsatish.

Merge tartibi shundan kelib chiqadi: avval siz, keyin klientlar.

## Taqiqlar

- Himoyalangan branch'larga to'g'ridan-to'g'ri yetkazish yo'q
- Lokal birlashtirish va PR'ni yopish — inson qarori
- ClickUp'ga yozish yo'q — dev faqat o'qiydi
- Boshqa qatlamning `<stack>.md` fayliga yozish yo'q — u faqat o'qish uchun
