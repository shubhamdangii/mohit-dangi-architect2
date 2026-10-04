# Mohit Dangi Architect — Website v2

A clean, image-heavy, animated architect portfolio website for **Mohit Dangi Architect**, Bhilwara, Rajasthan.

Built with plain HTML + CSS + JavaScript. No framework. No build process.

---

## ✨ WHAT'S NEW IN v2

- ✅ **Real M·D·A logo** in header + footer (auto-inverted for dark footer)
- ✅ **Fixed mobile menu** — solid white background, full screen, smooth animation
- ✅ **Scroll-triggered fade-in animations** on every section, project, service, award
- ✅ **Ken-burns zoom** on hero images (slow elegant motion)
- ✅ **Number counter animations** on About page stats (0 → 6+, 0 → 200+, 0 → 8)
- ✅ **Pulsing WhatsApp + Call buttons** (subtle attention)
- ✅ **Awards page** with 4 entries (1 real + 3 placeholder until real ones added)
- ✅ **Better mobile typography** and bigger touch targets

---

## 🎯 KEY THING TO UNDERSTAND

The website is **fully data-driven**. To update anything, you only edit JSON files. Design, fonts, layout — everything is automatic.

**Three files control everything:**

| File | What it controls |
|---|---|
| `data/config.json` | Studio name, contact, phones, email, social media, SEO |
| `data/projects.json` | All projects |
| `data/services.json` | All 8 services |
| `data/awards.json` | All awards |

---

## 📁 Folder Structure

```
mohit-dangi-architect/
├── index.html              ← Home
├── about.html              ← About Mohit Dangi
├── architecture.html       ← Architecture projects
├── interior.html           ← Interior projects
├── landscaping.html        ← Landscape projects
├── master-planning.html    ← Master plans
├── services.html           ← All 8 services
├── awards.html             ← Awards
├── contact.html            ← Contact + inquiry form
├── project.html            ← Auto-generated detail page per project
│
├── css/style.css           ← Design system + animations
├── js/main.js              ← All logic
│
├── data/
│   ├── config.json         ← Studio info
│   ├── projects.json       ← Projects database
│   ├── services.json       ← Services
│   └── awards.json         ← Awards
│
└── images/
    ├── logo/
    │   ├── logo.svg        ← Your real M·D·A logo
    │   └── logo.png        ← PNG version
    └── projects/           ← Your project photos go here
```

---

## ➕ HOW TO ADD A NEW PROJECT (Fully Automatic)

You **never touch any HTML or CSS**. Just edit `data/projects.json`.

### Step 1: Open `data/projects.json`

Each project is one block. Copy any existing one and paste at the bottom:

```json
{
  "id": "your-project-name",
  "title": "Your Project Name",
  "category": "architecture",
  "categoryLabel": "Architecture",
  "secondaryCategories": ["interior"],
  "year": 2025,
  "location": "Bhilwara, Rajasthan",
  "type": "Private Residence",
  "area": "5,000 sq ft",
  "status": "Completed",
  "featured": false,
  "shortDescription": "One-line tagline.",
  "description": "Long description (3-4 sentences) shown on the project detail page.",
  "coverImage": "images/projects/your-project-name/cover.jpg",
  "images": [
    "images/projects/your-project-name/cover.jpg",
    "images/projects/your-project-name/1.jpg",
    "images/projects/your-project-name/2.jpg",
    "images/projects/your-project-name/3.jpg"
  ]
}
```

### What happens automatically:

✅ Added to the right category page (Architecture / Interior / Landscape / Master Planning)
✅ Gets its own project page at `project.html?id=your-name`
✅ Same fonts, colors, hover effects, animations apply automatically
✅ Auto-placed in asymmetric grid pattern (no manual layout needed)
✅ Shows on home page if `featured: true`
✅ Wired up for "Next Project" navigation
✅ Scroll fade-in animation applies automatically
✅ Fully responsive on mobile

**This works for 5 projects, 50, or 500. Same JSON, same automatic design.**

### Field Reference

| Field | What to fill |
|---|---|
| `id` | URL-safe name. lowercase, dashes only. e.g. `peace-home` |
| `title` | Display name. e.g. `Peace Home` |
| `category` | Must be one of: `architecture`, `interior`, `landscaping`, `master-planning` |
| `categoryLabel` | Pretty version: `Architecture`, `Master Planning` |
| `secondaryCategories` | Other categories where project should ALSO appear (optional) |
| `year` | Number, e.g. `2024` |
| `location` | e.g. `Bhilwara, Rajasthan` |
| `type` | e.g. `Private Residence`, `Office`, `Banquet Hall` |
| `area` | e.g. `5,000 sq ft`, `12 Acres` |
| `status` | e.g. `Completed`, `Under Construction` |
| `featured` | `true` = appears on home page |
| `shortDescription` | 1-line tagline |
| `description` | 3-5 sentence description for detail page |
| `coverImage` | Path to main image |
| `images` | Array — first is hero, rest go in gallery |

---

## 📸 ADDING REAL PROJECT PHOTOS

### Step-by-step:

1. Inside `images/projects/`, **create a folder** named after your project (e.g. `images/projects/peace-home/`)
2. Drop your photos in that folder:
   - `cover.jpg` (main hero image — at least 1600px wide)
   - `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg` (gallery images)
3. Compress photos at **[tinypng.com](https://tinypng.com)** (free) to keep file sizes ~300-500 KB each
4. In `projects.json`, change image paths to local files:

```json
"coverImage": "images/projects/peace-home/cover.jpg",
"images": [
  "images/projects/peace-home/cover.jpg",
  "images/projects/peace-home/1.jpg",
  "images/projects/peace-home/2.jpg",
  "images/projects/peace-home/3.jpg"
]
```

That's it. Save → refresh → done.

---

## ✏️ Editing Other Content

### Change phone / email / address
Edit `data/config.json`. All pages auto-update.

### Change studio name / tagline
Edit `data/config.json`. All pages auto-update.

### Change About page story
Edit `about.html` directly — text is right in there.

### Add a new service
Edit `data/services.json`. Services page auto-updates.

### Add an award
Edit `data/awards.json`. Awards page auto-updates.

### Add a social media link
Edit `data/config.json` → `social` section. Add URL. Footer + Contact page update automatically.

---

## 🚀 Deploy to Netlify (FREE — 5 minutes)

1. Go to **[netlify.com](https://netlify.com)** → sign up (use Google login)
2. Click **"Add new site"** → **"Deploy manually"**
3. **Drag-and-drop the entire `mohit-dangi-architect` folder** into the upload box
4. Done — your site is live at something like `mohitdangi-architect.netlify.app`

### To use your own domain (mohitdangiarchitect.com):

1. Buy domain from **[namecheap.com](https://namecheap.com)** (~₹1,000/year)
2. In Netlify → Site Settings → Domain Management → Add Custom Domain
3. Follow the 2-step DNS instructions Netlify shows you
4. Wait 5-30 minutes — live on your real domain with free HTTPS

---

## 📨 Real Email from Contact Form

The form currently just shows an alert. To actually receive emails:

1. Sign up free at **[formspree.io](https://formspree.io)**
2. They give you a URL like `https://formspree.io/f/yourcode`
3. Tell me this URL — I'll wire it up in 5 minutes
4. Form submissions then go to `mdarchitects.connect@gmail.com` automatically (50 emails/month free)

---

## 💰 Total Cost

| Item | Cost |
|---|---|
| Website code | Free (built for you) |
| Hosting (Netlify) | Free forever |
| WhatsApp + Call buttons | Free |
| Contact form (Formspree) | Free up to 50 submissions/month |
| Free HTTPS (Netlify auto) | Free |
| Domain | ~₹1,000/year |
| **Total** | **~₹1,000/year** |

---

## 🆘 Common Issues

**"New project isn't showing up"**
→ JSON syntax error. Paste your JSON at [jsonlint.com](https://jsonlint.com) to find error.

**"Photos aren't loading"**
→ Check file path. Use dashes (`peace-home` not `Peace Home`). Case-sensitive.

**"Site looks broken when I open index.html directly"**
→ Browsers block local fetch. Either deploy to Netlify (recommended), OR use VS Code Live Server extension locally.

**"How to feature project on home page?"**
→ Set `"featured": true` in that project's JSON entry.

**"Animations not working"**
→ They trigger on scroll. Scroll the page to see them activate.

---

## ✅ Pre-Launch Checklist

- [ ] Replace placeholder Unsplash photos with real Mohit Dangi project photos
- [ ] Confirm phone numbers + email in `data/config.json`
- [ ] Add founder photo for About page (currently shows "Founder photo coming soon")
- [ ] Set up Formspree for contact form
- [ ] Add more social media URLs to `config.json` if studio has them (Facebook, LinkedIn, etc.)
- [ ] Buy domain name
- [ ] Deploy on Netlify
- [ ] Connect custom domain
- [ ] Test WhatsApp button, Call button, all navigation, contact form
- [ ] Test on mobile phone — navigate every page

---

## 📱 Mobile Tested

The website is fully optimized for mobile:
- Solid full-screen mobile menu with smooth slide-in
- Bigger touch targets for buttons and links
- Properly sized text and spacing
- WhatsApp + Call floating buttons placed for easy thumb access
- Asymmetric grid switches to clean single-column on mobile
- Form fields properly sized for mobile keyboards

---

## 📞 Quick Help

When you want to make changes I should help with, just tell me:
1. What needs to change (e.g. "Add a new project called X")
2. The details (project info, photo path, etc.)
3. I'll send you the exact JSON to paste

Or, ask me to "Update the website with X change" and I'll send you the updated files.
