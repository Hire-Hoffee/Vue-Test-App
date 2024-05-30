## Application to test some frontend features

**1. Moveable div:**

- **Functionality:** The user can drag the div across the screen by holding down the left mouse button.
- **Technology:**
  - Vue 3 composition API: used to create reactive variables `isDragging` (tracks drag state) and `divLocation` (stores div coordinates).
  - CSS: styles the div and changes its appearance while dragging.
  - Mouse event handlers: `onMousedown`, `onMousemove`, `onMouseup`, `onMouseleave` are used to track user actions.

**2. Scrolling with fixed data size:**

- **Functionality:** The component displays a portion of a data array (emails). Scrolling with the mouse wheel causes the displayed portion of the data to update in fixed increments.
- **Technology:**
  - Vue 3 composition API: used to create reactive variables `scrollPosition` (keeps track of current position) and `displayedData` (stores the displayed data).
  - `slice` array method: used to extract a piece of data from the original array.
  - `onWheel` event handler: used to track scrolling by the mouse wheel.

**3. Word Highlighting:**

- **Functionality:** The component implements two variants of word selection in text:
  - Option 1: The user selects the text with the mouse and the selected words are written to a list.
  - Option 2: The user clicks on individual words, and the selected words are written to the list.
- **Technologies:**
  - Vue 3 composition API: used to create reactive variables `text`, `selectedWords` and `wordsCount`.
  - `split` string method: used to split text into words.
  - `onMouseup` (Option 1) and `onClick` (Option 2) event handler: used to track user actions.
  - `window.getSelection` API: used to get selected text in Option 1.
  - CSS: styles the highlighted words.

**4. Fancy animation:**

- **Functionality:** Component displays a div with an image. When you move the mouse cursor over the div, it rotates smoothly, creating a 3D effect.
- **Technology:**
  - Vue 3 composition API: used to create reactive variables that control the angle of rotation of the div along the X, Y and Z axes.
  - Mouse event handlers: `onMousemove` and `onMouseleave`.
  - CSS: styles the div, applies `transform: rotate3d`, `transition`, `box-shadow`, `filter: blur` to implement animations.
