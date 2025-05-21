# Manual Test Cases for /setup Page and Dashboard

## Objective
To ensure the `/setup` page and dashboard functionality operate as expected.

## Prerequisites
- The application must be running (`node bot.js`).
- Access to a web browser.

## Test Cases

### 1. Verify `/setup` Page Loads Correctly
    - **Steps:**
        1. Navigate to `http://localhost:3000/setup` in your web browser.
    - **Expected Result:**
        - The page loads without errors.
        - The title "Bot Configuration" is visible.
        - The "Setup Channel" form with "URL" and "Song Name" input fields and a "Save Configuration" button is visible.
        - The "Dashboard" section is visible, displaying:
            - "Current Song: Example Song Title - Artist"
            - "Queue Length: 5"
            - "Bot Status: Online and Playing" (or the current sample data).
        - Basic styling is applied (page is not just plain HTML).

### 2. Verify Channel Configuration Form Submission
    - **Steps:**
        1. Navigate to `http://localhost:3000/setup`.
        2. Enter a test URL (e.g., `http://example.com/test`) into the "URL" field.
        3. Enter a test song name (e.g., `Test Song`) into the "Song Name" field.
        4. Click the "Save Configuration" button.
    - **Expected Result:**
        - The page redirects back to `http://localhost:3000/setup`.
        - Check the console output where `node bot.js` is running.
        - A log message similar to `[ SETUP ] Received URL: http://example.com/test, Song Name: Test Song` should be visible.

### 3. Verify Form Validation (Required Fields) - Conceptual
    - **Note:** Currently, the server sends a plain text error. A full implementation would show an error on the page.
    - **Steps:**
        1. Navigate to `http://localhost:3000/setup`.
        2. Leave the "URL" field empty.
        3. Enter a test song name into the "Song Name" field.
        4. Click the "Save Configuration" button.
    - **Expected Result (Current):**
        - The browser displays a message like "URL and Song Name are required." (This comes from `res.status(400).send(...)`).
    - **Expected Result (Ideal Future):**
        - The `/setup` page re-renders with an error message indicating that the URL is required.

    - **Steps (Song Name empty):**
        1. Navigate to `http://localhost:3000/setup`.
        2. Enter a test URL into the "URL" field.
        3. Leave the "Song Name" field empty.
        4. Click the "Save Configuration" button.
    - **Expected Result (Current):**
        - The browser displays a message like "URL and Song Name are required."
    - **Expected Result (Ideal Future):**
        - The `/setup` page re-renders with an error message indicating that the Song Name is required.

### 4. Verify Static Asset Loading (CSS)
    - **Steps:**
        1. Navigate to `http://localhost:3000/setup`.
        2. Open the browser's developer tools (usually F12) and go to the "Network" tab.
        3. Refresh the page.
    - **Expected Result:**
        - `style.css` should be listed as one of the loaded resources with a status code of 200.
        - The page should appear styled.
