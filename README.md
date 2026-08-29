# Umziotic Brand Build

Umziotic — Final Lovable Build Prompt (Exact Design Match)

Copy-paste this entire prompt into Lovable to generate the full website exactly matching the approved mockup.

Project Overview

Build a full e-commerce website for Umziotic, a premium herbal supplement brand with the tagline "Transform Yourself Naturally." Use React + Tailwind CSS + React Router. Build all pages below with a shared navbar/footer and a fully consistent design system. Use realistic placeholder product data (at least 10 herbal supplement products) in a local data file so the site is fully browsable.

Design System

Logo: A leaf-mark icon (gold leaf wrapped in a thin circular/organic outline) next to the wordmark "UMZIOTIC" in Fraunces, with the tagline "Transform Yourself Naturally." in small Poppins text underneath, in deep green.

Colors (Tailwind custom theme):

base: #FAF6EF — main page background

base-alt: #F6EFE2 — alternating/secondary section background

base-tint: #E8DFC6 — subtle tint for dividers, input backgrounds, muted badge fills

primary (Deep Green): #1F3D2B — headings, primary buttons, footer background, nav active states

gold (Amber): #C9A227 — secondary buttons, badges, star ratings, icon accents, price highlights

White (#FFFFFF) used for cards sitting on top of the base background

Typography:

Headings: Fraunces — used for all H1/H2/H3 and product names

Body/UI: Poppins (16px base) — used for paragraphs, labels, nav, buttons

Load both via Google Fonts

Buttons (three variants used throughout):

Primary: solid deep green background, white text, rounded-full, e.g. "Shop Now →" (include arrow icon on primary CTAs where shown)

Secondary: solid gold background, deep green or white text, rounded-full, e.g. "Learn More"

Outline: white/transparent background, thin deep-green border, deep-green text, rounded-full, e.g. "View Details"

All buttons: subtle hover scale + shadow

Badges (pill-shaped, small):

Bestseller — gold fill, white text

New — deep green fill, white text

-20% (discount) — light mint/tint fill, deep green text

In Stock — outline style, mint tint fill, deep green text

Order status badges (My Orders): Delivered = green, Shipped = blue/teal, Processing = gold/amber, Cancelled = muted red — all pill-shaped

Icon style: Thin line/outline icons throughout (leaf, flask/lab, shield, heart, truck, box) — use lucide-react. Never use filled/solid icon style.

Core components to build once, reuse everywhere:

Product Card: white rounded-2xl card, soft shadow, product image, wishlist heart icon (top-right corner, outline style, fills gold/red on click), product name (Fraunces), gold star rating + review count, price (strike-through original price + sale price + -20% badge when discounted), "Add to Cart" button

Quantity Selector: rounded pill with - / number / +

Input Field: rounded-lg, thin border, subtle focus ring in deep green, tinted background (#F6EFE2) or white

Dropdown: rounded-lg select style matching input fields, chevron icon

Shared Navbar (sticky top, off-white background, thin bottom border):

Left: logo + tagline (as described above)

Center: nav links — Home, Shop, About, Blog, Contact

Right: search icon, wishlist/heart icon, account icon, cart icon with small gold item-count badge

Mobile: hamburger menu

Shared Footer (deep green #1F3D2B background, off-white/gold text):

4 columns: Shop (All Products, Bestsellers, New Arrivals, Categories), Company (About Us, Our Ingredients, Blog, Contact Us), Customer Care (FAQs, Shipping & Returns, Privacy Policy, Terms & Conditions), Contact (phone, email, address)

Social icons row (Instagram, Facebook, etc.)

Bottom bar: "© 2024 Umziotic. All Rights Reserved."

Note: the mockup includes a "Blog" nav link and footer entry that wasn't in the original page list — since it's part of the approved design, add a simple placeholder Blog listing page (/blog) with 3-4 dummy article cards, using the same design system, so the nav link isn't broken.

Pages — Detailed Specs

1. Home (/)

Hero: two-column — left: headline "Transform Yourself Naturally" (Fraunces, large), subtext about premium herbal supplements, Primary button "Shop Now →" + Outline button "Explore Our Story"; right: hero product photo with soft shadow and botanical accents

Trust badges row (5 items, thin-line icons): 100% Natural Ingredients, Lab Tested For Purity, Clinically Researched, No Artificial Additives, Made with Care

Bestsellers: section header + "View All" link, horizontal row of 4 product cards using the shared Product Card component

Brand story: two-column — headline "Rooted in Nature, Backed by Science", short paragraph, Outline button "Discover Our Story"; image of herbs/mortar-and-pestle on the other side

Testimonials carousel: "What Our Customers Say" header, single testimonial card with quote, avatar, name, location, star rating, and left/right arrow navigation controls

Newsletter: full-width deep green banner, "Stay in the Loop" headline, subtext, email input + gold "Subscribe" button

Footer

2. Shop (/shop)

Breadcrumb: Home / Shop, page title "Shop"

Filters sidebar: Category checkboxes with counts (Hair Care, Immunity, Skin Care, Detox, Weight Management), Price range slider with min/max labels + gold "Apply" button, Concern checkboxes (Hair Fall, Acne, Dull Skin, Low Energy, Digestion)

Top bar: search input, "Sort by: Featured" dropdown

Product grid: 3 columns desktop (responsive to 2/1 on smaller screens) using the shared Product Card component, showing badges like Bestseller where relevant

Pagination: numbered page controls (1, 2, 3, ... 6) with next arrow

3. Product Details (/product/:id)

Breadcrumb: Home / Shop / Product Name

Two-column layout: Left — main image with thumbnail gallery stacked vertically alongside it; Right — product name (Fraunces, large), star rating + review count, price row (strikethrough original price + sale price + -20% badge), short description, trust icon row (100% Natural, Lab Tested, No Side Effects), quantity selector, Primary "Add to Cart" button + Secondary gold "Buy Now" button side by side, "Add to Wishlist" text link with heart icon below

Tabs: Overview | Ingredients | Benefits | How to Use | Reviews (with count) — underline active-tab style

Trust/shipping icon row below tabs: Free Shipping (orders above threshold), 7 Days Returns, Secure Payment — each with icon + short label

Related Products: horizontal row of 4 product cards

Footer

4. Cart (/cart)

Page title "Your Cart"

Table-style item list with column headers (Product, Price, Quantity, Subtotal): each row has product thumbnail + name, unit price, quantity stepper, line subtotal, remove icon

Free shipping progress bar: "You're PKR X,XXX away from free shipping" with a progress bar visual

"Continue Shopping" text link (left) and Primary "Proceed to Checkout" button (right, near order total area)

Empty state: illustration + "Your cart is empty" + Primary "Shop Now" button

5. Checkout (/checkout)

Numbered step progress bar at top: 3 circular steps — Shipping → Payment → Confirmation (current step filled deep green, completed steps checked, future steps outline)

Left column — Shipping Information form: Full Name, Phone Number, Email Address, Address, City, State/Province, Postal Code, "Save this address" checkbox

Payment Method section (radio card options): Cash on Delivery, JazzCash, Easypaisa, Credit/Debit Card (show small card network icons — Visa, Mastercard — next to the card option)

Right sidebar — Order Summary: item list (condensed), Subtotal, Shipping, Discount, Total (bold), Primary "Continue to Payment" / "Place Order" button

Success state after placing order: confirmation screen with order number, checkmark icon, "View My Orders" button

6. Login/Register (/login)

Split-screen card: Left — form panel with tab toggle "Login | Register"

Login: Email Address, Password fields, "Forgot Password?" link (top-right of password field), Primary "Login" button, "or continue with" divider, Google + Facebook outline social buttons side by side, "Don't have an account? Register" link

Register: Name, Email, Password, Confirm Password fields, Primary "Create Account" button

Right — deep green panel with botanical imagery/product photo, "Welcome to Umziotic" (Fraunces, white/gold), "Your wellness journey starts here." subtext

7. My Orders (/orders)

Page title "My Orders"

Table layout with columns: Order #, Date, Status (colored pill: Delivered/Shipped/Processing/Cancelled), Total, Action ("View Details" link)

Order detail view (on click): itemized product list, shipping address, status timeline

Empty state: "No orders yet" + "Start Shopping" button

8. About (/about)

"Our Story" section: headline, 2-3 paragraphs about the brand's founding and philosophy, Secondary "Learn More" button, image on the right

Image gallery row: 3 photos showcasing ingredients/process

Our Mission / Our Values / Our Promise: 3-column icon cards, each with a thin-line icon, short title, and one-line description

Footer

9. Contact (/contact)

Page title "Get in Touch"

Two-column layout: Left — "Send Us a Message" form (Name, Email, Subject, Message, Primary "Send Message" button); Right — contact info block (address, phone, email, business hours) + map placeholder (styled rounded div with a pin icon, no real map integration needed)

FAQ accordion below: 4-5 questions with expand/collapse +/- icons, thin divider lines between items

Footer

Functional Requirements

Global cart state (React Context) — persists across pages during session, reflected live in navbar badge

Wishlist state (React Context) — heart icons toggle filled/outline and persist across product cards and detail pages

"Add to Cart" triggers a brief toast/confirmation styled in deep green

Login/Register and Checkout forms are UI-only (no real backend/payment processing) — handle form state + basic validation only

All pages fully responsive (mobile/tablet/desktop) and reachable via navbar/footer links

Realistic placeholder product data: names like "Herbal Hair Growth Support Formula", "Immunity Boost Herbal Blend", "Detox & Cleanse Herbal Support", "Skin Radiance Herbal Formula", "Sleep Support Herbal Blend", with prices in PKR, descriptions, ingredients, and benefits

Final Notes

Match the mockup exactly: warm off-white base, deep green + gold accents, Fraunces/Poppins pairing, pill-shaped buttons and badges, thin-line icon style throughout

Keep spacing generous and airy — this is a premium, editorial-feeling brand, not a busy discount store

Prices throughout should use PKR currency formatting

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4a2364b5-771a-4a5f-bb1b-4e5f1ee74133).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
