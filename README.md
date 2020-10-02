# SearchingShortcuts
Google like a power user and navigate results with just your keyboard.

### Getting started
1. Install Chrome extension ShortKeys.
1. Click on the ShortKeys menu and select "Options" enter image description here
1. Click on "Add" and fill in the following fields:
    1. Keyboard Shortcut: tab
    1. Behavior: Run JavaScript
    1. Label: Result Picker
1. Paste the JavaScript code from ResultPicker.js (in this repo) into "Javascript[sic] code to run"
    1. Configure the `Settings`:
        1. Active while in form fields (Checked)
        1. Websites (Only specific sites)
            1. URLS (one per line): *www.google.*

This is what the Options page should look like

[[ShortKeys Options Page screenshot]]

Click Save and then close your browser.
Instructions:

- When you restart you should see a little blue (or black) ">" appear by search results when you hit tab.
- The up/down arrow keys make it cycle through the results.
- Hitting "Enter" will navigate to the highlighted result.
- Hitting "Ctrl+Enter" to open the result in a new tab.

Happy Searching!

