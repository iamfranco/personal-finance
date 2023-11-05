# Personal Finance App

This is a Progressive Web App (PWA) to calculate compound interests. 

App Link: https://francochan.co/personal-finance

### Why am I making this project?

The other day I was using the compound interest calculator from [investo.gov](https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator) like a regular person, but for some reason it was slow to compute, so I inspected source and realised it was doing **server side calculations** 🤔 

I just want a compound interest calculator that's fast and reliable, literally just numbers in numbers out. And I also want to dabble in Progressive Web App. 

So I make my own compound interest calculator with the following criterias:
- **client side calculations**, so numbers would auto-recalculate while the user was typing
- works offline (PWA)

## Instructions

**Prerequisite**: Have a machine with node and npm installed.

Clone the repo, `cd` into the folder, then install the npm project dependencies:
```
npm install
```

To run the app locally:
```
npm run start
```

To deploy the app to GitHub Pages:
```
npm run deploy
```