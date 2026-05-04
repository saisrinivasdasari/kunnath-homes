# Graph Report - c:/Users/saisr/Desktop/Kunnath  (2026-05-04)

## Corpus Check
- 79 files · ~77,174 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 192 nodes · 132 edges · 12 communities detected
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Admin Controller Logic|Admin Controller Logic]]
- [[_COMMUNITY_Stay Details & Calendar|Stay Details & Calendar]]
- [[_COMMUNITY_Contact Management|Contact Management]]
- [[_COMMUNITY_Authentication|Authentication]]
- [[_COMMUNITY_Stay Management Hooks|Stay Management Hooks]]
- [[_COMMUNITY_Booking UI & Logic|Booking UI & Logic]]
- [[_COMMUNITY_Admin Stays UI|Admin Stays UI]]
- [[_COMMUNITY_Core Infrastructure|Core Infrastructure]]
- [[_COMMUNITY_Gallery & Booking Integration|Gallery & Booking Integration]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]

## God Nodes (most connected - your core abstractions)
1. `isDateBooked()` - 3 edges
2. `handleSubmit()` - 3 edges
3. `StayModal()` - 3 edges
4. `handleDelete()` - 2 edges
5. `handleDelete()` - 2 edges
6. `handleSubmit()` - 2 edges
7. `handleSubmit()` - 2 edges
8. `localDateFromString()` - 2 edges
9. `formatLocalYMD()` - 2 edges
10. `calculateNightsLocal()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `handleDelete()` --calls--> `deleteContact()`  [INFERRED]
  client\app\admin\contact\page.tsx → server\controllers\contactController.js
- `handleDelete()` --calls--> `deleteStay()`  [INFERRED]
  client\app\admin\stays\page.tsx → server\controllers\adminController.js
- `handleSubmit()` --calls--> `login()`  [INFERRED]
  client\app\login\page.tsx → server\controllers\authController.js
- `handleSubmit()` --calls--> `signup()`  [INFERRED]
  client\app\signup\page.tsx → server\controllers\authController.js
- `handleSubmit()` --calls--> `updateSport()`  [INFERRED]
  client\Components\admin\SportModal.tsx → server\controllers\adminController.js

## Communities

### Community 0 - "Admin Controller Logic"
Cohesion: 0.1
Nodes (3): handleSubmit(), createSport(), updateSport()

### Community 1 - "Stay Details & Calendar"
Cohesion: 0.14
Nodes (7): calculateNightsLocal(), formatLocalYMD(), getMonthDays(), handleDateClick(), isBooked(), isDateBooked(), localDateFromString()

### Community 2 - "Contact Management"
Cohesion: 0.22
Nodes (2): handleDelete(), deleteContact()

### Community 3 - "Authentication"
Cohesion: 0.22
Nodes (4): login(), signup(), handleSubmit(), handleSubmit()

### Community 5 - "Stay Management Hooks"
Cohesion: 0.29
Nodes (3): StayModal(), useCreateStay(), useUpdateStay()

### Community 6 - "Booking UI & Logic"
Cohesion: 0.33
Nodes (2): createBooking(), handleBooking()

### Community 9 - "Admin Stays UI"
Cohesion: 0.4
Nodes (2): deleteStay(), handleDelete()

### Community 13 - "Core Infrastructure"
Cohesion: 0.5
Nodes (2): connectDB(), importData()

### Community 19 - "Gallery & Booking Integration"
Cohesion: 0.67
Nodes (3): Gallery API, Stay Booking Flow, Stay Details Page

### Community 64 - "Community 64"
Cohesion: 1.0
Nodes (1): Root Layout

### Community 65 - "Community 65"
Cohesion: 1.0
Nodes (1): Admin Layout

### Community 66 - "Community 66"
Cohesion: 1.0
Nodes (1): FarmStay Model

## Knowledge Gaps
- **5 isolated node(s):** `Root Layout`, `Admin Layout`, `Gallery API`, `FarmStay Model`, `Stay Booking Flow`
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Contact Management`** (9 nodes): `page.tsx`, `formatDate()`, `handleDelete()`, `deleteContact()`, `getAllContacts()`, `getUnreadCount()`, `markAllRead()`, `submitContactMessage()`, `contactController.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Booking UI & Logic`** (6 nodes): `BookingModal.tsx`, `createBooking()`, `getMyBookings()`, `bookingController.js`, `handleBooking()`, `isSlotDisabled()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Admin Stays UI`** (5 nodes): `page.tsx`, `deleteStay()`, `handleDelete()`, `openAddModal()`, `openEditModal()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Core Infrastructure`** (4 nodes): `connectDB()`, `db.js`, `importData()`, `seeder.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 64`** (1 nodes): `Root Layout`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 65`** (1 nodes): `Admin Layout`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 66`** (1 nodes): `FarmStay Model`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `deleteStay()` connect `Admin Stays UI` to `Admin Controller Logic`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `handleSubmit()` (e.g. with `updateSport()` and `createSport()`) actually correct?**
  _`handleSubmit()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `StayModal()` (e.g. with `useCreateStay()` and `useUpdateStay()`) actually correct?**
  _`StayModal()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Root Layout`, `Admin Layout`, `Gallery API` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Admin Controller Logic` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Stay Details & Calendar` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._