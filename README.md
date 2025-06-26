## To run:

#### > locally at port 5173:
npm run dev


### Some notes and considerations:

1. Components are 98% AI generated and not at all efficient in terms of sheer number of files (made in batches).

2. General application logic doesn't make much sense at all.

3. Auto login and simple authentication exists, although basically invisible and instant. To test: change hardcoded password in `App.tsx` file.

### Structure:
```
/src/
├── assets/
├── api/
│   ├── Books.ts
│   └── Borrowings.ts
├── components/
│   ├── BookCard.tsx
│   ├── BookCard.css
│   ├── Navbar.tsx
│   └── Navbar.css
├── routes/
│   ├── Frontpage.tsx
│   └── Frontpage.css
├── App.tsx
├── globals.js
└── main.tsx
```

