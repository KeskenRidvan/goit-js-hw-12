# GOIT-JS-HW-12 🚀

## 📝 Project Setup

- Create a repository named `goit-js-hw-12`.
- Build your project using [Vite](https://vite.dev/). We have prepared and recommend using this [pre-configured template](https://github.com/goitacademy/vanilla-app-template) with all the necessary additional settings.
- Use the [axios](https://axios-http.com/) library for HTTP requests.
- Use `async/await` syntax.
- Read the task and complete it in your code editor.
- Ensure your code is formatted with `Prettier` and that there are no errors or warnings in the console when you open the live page.
- Submit your assignment for review.

**Submission Format:** The assignment should include two links: one to the source files and another to the live page on `GitHub Pages`.

#### :bangbang: Use this [Figma layout](https://www.figma.com/design/m8k9NQV7qZrtYDCvxfD68B/HW-JavaScript?node-id=3-1010) to style your task.

## 🎯 Goal — Image Search

Use the code from the previous module's assignment and add new functionality to the image search application.

### ♻️ Refactoring

Add the [Axios](https://axios-http.com/) library to your project for handling HTTP requests and refactor your code to replace the use of `fetch`.

Use the `async/await` syntax to work with asynchronous requests. Refactor your code accordingly.

### 📄 Pagination

The Pixabay API supports pagination and provides the `page` and `per_page` parameters. Ensure that **40** objects are returned in each image search response (the default is 20).

- The initial value for the `page` parameter should be `1`.
- With each subsequent request, this value should be incremented by `1`.
- When searching for a new keyword, the `page` value should be reset to its original value, as the new image collection will be paginated.

In the HTML document, after the gallery, add a button with the text `Load more`. When clicked, this button will request the next group of images and add the markup to the existing gallery items. To do this, you will need to save the user's input to a global variable when the form is submitted.

- The button should be hidden when there are no images in the gallery.
- After images appear in the gallery, the button should become visible in the UI below the gallery.
- When you resubmit the form, the button should first be hidden and then displayed again if necessary after receiving the query results.
- Move the loading indicator below the button to indicate that additional images are being loaded.

Watch the demo video of the application at this stage:

![Video of Pagination](./src/images/readmefiles/assignmet-video-1.gif)

### 🏁 End of the Collection

In the response, the backend returns the `totalHits` property — the total number of images that match the search criteria (for a free account). If the user reaches the end of the collection, hide the `Load more` button and display a message saying, `"We're sorry, but you've reached the end of search results."`

Watch the demo video of the application at this stage:

![Video of End of Collection](./src/images/readmefiles/assignmet-video-2.gif)

### 📜 Page Scrolling

After requesting and displaying each next group of images, ensure that the page scrolls smoothly. To do this, get the height of a gallery card in the code using the `getBoundingClientRect()` function. After that, use the `window.scrollBy()` method to scroll the page by the height of two gallery cards.

Watch the demo video of the application at this stage: [Video Link](https://www.youtube.com/watch?v=aEhYvL7wIV8)

### ✅ What the mentor will look for while checking:

- The submission includes two links: to the source files and to a live page on `GitHub Pages`.
- The project is built with [Vite](https://vite.dev/).
- The console in the developer tools is free of errors, warnings, and console logs.
- The elements on the page are styled according to the layout (or with custom styles).
- The project includes code from the previous assignment.
- All asynchronous requests are refactored and implemented using `async/await` syntax.
- 40 items are returned per request.
- New images are added to the DOM in a single operation.
- Below the gallery, the page includes a **Load more** button that, when clicked, sends a request for the next page.
- The `refresh()` method is called on the SimpleLightbox instance after new items are added to the image list.
- When the user receives the results for the maximum possible page for a given search term (i.e., there is nothing more to load), the **Load more** button disappears, and a corresponding message is displayed.
- With each new form submission, the page number is reset to the default of 1, and the results of previous requests disappear.
- When a small image in the gallery is clicked, its enlarged version opens in a modal window using the SimpleLightbox library.
