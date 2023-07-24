
# ORGNYSE - TEST PROJECT

This is a completed project for a Checkout Page with integrated Stripe payment gateway and a coupon feature. The project consists of two pages: the first page contains a form for user details, product selection with add and reduce buttons, and a product summary. Form validation is implemented to ensure accurate user information.

On the second page, users can apply a coupon to avail discounts before proceeding to payment. The Stripe integration allows secure payment processing for a seamless checkout experience.
## Features

- Form Validation: : Provide clear and informative validation messages to guide users in completing the form correctly.
- Coupon Feature: Allow customers to apply coupons during checkout to avail discounts on their purchases.
- Product Selection: Allow users to adjust quantities using add and reduce buttons. Quantity selection is restricted to a predefined maximum per-user limit.
- Stripe Payment Integration: Integrate Stripe's secure payment gateway to facilitate secure and hassle-free payment processing.


## Screenshots

![App Screenshot](https://imgtr.ee/images/2023/07/24/de2c29ca3c5f52ec36e625df212b33d7.png)


![App Screenshot](https://imgtr.ee/images/2023/07/24/601b79e5b794ed34ea6d25e79e28b302.png)








## Installation

    
Install  with npm
for frontend
```bash
  cd orgnyse-test-project
  npm install 
```
Install  with npm
for backend
```bash
  cd server
  npm install 
```

Enter you stripe public key in stripeContainer component
```bash
 const PUBLIC_KEY ='ENTER YOUR PUBLIC_KEY'
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`STRIPE_SECRET_KEY`

`PORT`


## Demo

https://drive.google.com/file/d/1orWd8TtDdEn2Bg__aU_tmkJIawrWuAWT/view?usp=sharing

## Tech Stack

**Client:** React, TailwindCSS

**Server:**  Express,Stripe


## Appendix

Valid coupons created in the server

Coupons:

WELCOME15

SUMMER20

WINTER10

HAPPY005

BONUS
## 🔗 Links


[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/akhil-s-poovathinkal-2a4a6922b/)


