# star-war-app
 A responsive React app to explore Star Wars characters using SWAPI. Features include character listing with pagination, search, and filters (homeworld, films, species). Cards have species-based colors, animations, and detailed modals. Fully responsive with smooth transitions, error handling, and loading states for a seamless experience. 🌌

## Features  

### 1. **Character List with Pagination**  
- Fetches and displays a list of Star Wars characters using the SWAPI `/people` endpoint.  
- Implements pagination to navigate through all the available characters.  
- Includes a simple loader while fetching or refetching data.  
- Handles error states, such as API server downtime.  

### 2. **Search and Filter**  
- **Search**: Users can enter partial or full character names to find matching results.  
- **Filter**: Allows users to filter characters based on their:  
  - **Homeworld**  
  - **Films**  
  - **Species**  
- Supports combined searching and filtering for refined results.  

### 3. **Character Cards with Animations**  
- Displays each character in a stylish card format.  
- Each card includes:  
  - Character Name  
  - A randomly assigned image  
  - Background color based on the character's species  
- Cards feature hover animations for interactivity.  
- Clicking on a card opens a modal with detailed information about the character.  

### 4. **Responsiveness**  
- Fully responsive design optimized for Mobile, Tablet, and Desktop views.  

### 5. **CSS Transitions and Animations**  
- Smooth transitions and animations enhance the user experience, making the interface more engaging.

---

## Tech Stack  

- **Frontend**: React.js  
- **API**: [SWAPI](https://swapi.dev/)  
- **Styling**: CSS (with transitions and animations)  
- **Responsive Design**: Flexbox, Grid, and Media Queries  

---

## Installation  

Follow these steps to run the project locally:  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/aniketbgadhave/star-war-app.git
   ```  

2. Navigate to the project directory:  
   ```bash  
   cd star-wars-app
   ```  

3. Install dependencies:  
   ```bash  
   npm install  
   ```  

4. Start the development server:  
   ```bash  
   npm start  
   ```  

5. Open the application in your browser:  
   ```
   http://localhost:3000  
   ```

---

## Usage  

1. Browse through the list of Star Wars characters with pagination.  
2. Search for characters by name or use filters to refine the list.  
3. Click on any character card to view detailed information in a modal.  
4. Enjoy a smooth and responsive user experience across devices.  

---

## Screenshots  

### 1. **Character List**  
_Showcase the main character list with pagination._  

### 2. **Search and Filter**  
_Show examples of searching and filtering._  

### 3. **Responsive Design**  
_Show layouts for mobile, tablet, and desktop._  

---

## Future Enhancements  

- Dark mode support.  
- Improved filtering options (e.g., multiple filters at once).  
- Favorite/Bookmark feature for characters.  

---
