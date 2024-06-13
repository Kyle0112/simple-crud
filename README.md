# Menu Manager App
The Menu Manager App is a web application built with React.js and Firebase Realtime Database that allows users to manage a menu by adding, editing, and deleting items. It provides functionalities for sorting items by price, cost, and stock, as well as searching items by name.

## Features
- Add new menu items with category, name, options, price, cost, and stock details.
- Edit existing menu items.
- Delete menu items.
- Sort menu items by price, cost, or stock in ascending or descending order.
- Search for menu items by name.
## Technologies Used
- React.js
- Firebase Realtime Database
- React Bootstrap for UI components
- CSS for custom styling

## Installation
1. Clone the repository
- Copy code
```
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

3. Install dependencies
- Copy code
```
npm install
```

4. Set up Firebase
- Create a Firebase project at Firebase Console.
- Obtain your Firebase config object and replace it in firebaseConfig.js.

4. Run the application
- Copy code
```
npm start
```
- Open http://localhost:3000 to view it in the browser.

## Usage
- Adding a new item: Click on the "Add Item" button, fill in the form fields, and click "Save".
- Editing an item: Click on the "Edit" button next to an item, modify the fields in the modal, and click "Save".
- Deleting an item: Click on the "Delete" button next to an item to remove it from the menu.
- Sorting items: Click on the column headers (Price, Cost, Stock) to sort items in ascending or descending order.
- Searching items: Use the search input field to filter items by name.
