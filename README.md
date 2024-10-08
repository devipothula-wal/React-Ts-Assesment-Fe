# Personal Finance Tracker Application In React And Typescript

The Personal Finance Tracker is a user-friendly web application designed to help you manage and monitor your financial transactions. With this tool, you can easily add, edit, and delete your income and expense transactions to keep track of your financial activities.

The application also provides an intuitive pictorial representation of your financial data using charts. These charts help you visualize your income and expenses, making it easier to understand your spending habits and financial health at a glance.

## Key Features

1. **Registration And Login** : User can create an account and login to view their transactions using user name and password.
2. **Add,Delete,Edit Transactions**: User can add,edit,delete transactions in home page.
3. **Pictorial Representaion**:User can view their spendings in single glance in charts representing .
     * **Pai Chart**: Which represents the spendings of all categories like Rent,Shopping,Salry,Free Lanching,Food etc...
     * **Bar Graph**: Which represent Total Income And Expense.
     * **Line Chart**: Which represent the expenses,income in timeline.

## Technologies used

1. React Js
2. Typescript

## Installation

1. Clone the repositary

    git clone <repository-url>
    cd personal-finance-tracker

2. Install the required packages

    yarn install

3. Run the application

    npm start

4. Access Webapp on your browser 

    http://localhost:3000/

## Project Structure 
```
src/
|-- api     # api folder contains all the TypeScript files responsible for making API requests using Axios.
|-- components 
    |-- charts          #contains files related to charts representation
    |-- signin          #contains files related to login,register
    |-- transaction     #contains files related to displaying,add,delete,edit of transactions 
    |-- navbar.tsx      #navigation bar file
|-- types           #contains types of components
|-- utils           #util files
|-- App.tsx         #App file
|-- App.css         #App css file
|-- axiosConfig.ts  #axios config file
|-- index.tsx       #index file
|-- index.css
|-- package.json  #meta data related to project and package dependies list
|-- tsconfig.json #contains the typescript config details
```




   
