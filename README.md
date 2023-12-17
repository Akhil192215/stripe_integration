#  Checkout Page with Stripe Integration

![App Screenshot](<Add Your Screenshot URL Here>)

## Overview

A Checkout Page project featuring Stripe payment gateway integration and a coupon system. The application has two pages: the first collects user details, allows product selection, and displays a summary. The second allows coupon application before payment, ensuring a secure and smooth checkout.

## Key Features

- **Form Validation:** Informative validation messages guide users for accurate form completion.
- **Coupon Feature:** Apply discounts using valid coupons during checkout.
- **Product Selection:** Adjust quantities with add and reduce buttons, enforcing predefined limits.
- **Stripe Payment:** Secure payment processing through Stripe's gateway.

## Screenshots

![App Screenshot](<Add Your Screenshot URL Here>)

## Installation

### Frontend

```bash
cd orgnyse-test-project
npm install```
```
### Backend

```bash
cd server
npm install
Add your Stripe public key in stripeContainer component:
```
```bash
const PUBLIC_KEY = 'ENTER YOUR PUBLIC_KEY';
```
```bash
Environment Variables
Create a .env file and add:

STRIPE_SECRET_KEY
PORT
```

Tech Stack
Client: React, TailwindCSS
Server: Express, Stripe


