# Game of Thrones characters app

This is a simple project that shows the characters of Game of Thrones in a table:
* With sorting -> click on the title from each column to view
* Filtering -> inputs on top of the columns
* Pagination -> below the table

The app caches the characters data, from each page, on every call for performance enhancement.

Tech:
* Used React Hooks with typescript
* Styled components for styling
* Store management is done by the react context API

Folder arquitecture:
* pages folder (server side and client side from Next.js) and index page where everything from the page is
* src folder with:
    * Components folder
    * Context folder for global state
    * Styles folder for the general css styles


## How to use it?


Install it and run:

```bash
yarn
yarn dev
```
