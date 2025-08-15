# Parade of Elements 

## Interactive periodic table for the group marching each year in the Dragon Con parade.

### Phase 1 Display PT that allows the user to see available elements and select an element to represent.

Step 1: Make a styled PT grid where each cell can be turned into a clickable element. ✅

<img width="1130" height="763" alt="image" src="https://github.com/user-attachments/assets/7082d8e3-2d15-4311-8940-049b04566a5d" />

Step 2: Manage state of elements ✅

Set up a Firestore db with element 'status' of available/unavailable that FE uses to display element dynamically - and fast! (still manually updating status in db) Also got rid of 'pending' for now. In the KISS phase for now.

<img width="1782" height="743" alt="image" src="https://github.com/user-attachments/assets/afc01fee-28b4-477c-8cff-fd9f0789fe81" />



Step 3: Make elements selectable => updates state

### Phase 2 Automate emails to parade admin and user to verify element selection and share basic parade group instructions
### Phase 3 Get it hosted (free on Firebase and can use our current domain)
### Phase 4 Store all user/element info in a database for subsequent years
### Phase 5+ Create an admin dashboard that controls all this, add features for historical info, assign/reassign ability, automate communication for each year's process

