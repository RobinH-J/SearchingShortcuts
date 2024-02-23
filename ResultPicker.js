// from https://github.com/RobinH-J/SearchingShortcuts

// selector to find all Google search results. Simplified Google html:
//   <div class="yuRUbf">
//     <a href="The real url is here">
//       <br>
//       <h3>The big text we see in Google Search results</h3>
//     </a>
//   </div>
// And sometimes we get pseudo-results (like Ads) that don't contain the h3: exclude them.
//
// The comma is an OR statement. Sometimes the first result is to a page like npmjs.org, then there's 6 child page links under it, like "About npm" and "Sign In".
// Search for this to see what we mean: npm package
// Simplified Google html:
//   <div class="usJj9c">
//     <h3>
//       <a class="l" href="The real url is here">The big text we see in Google Search results</a>
//     </h3>
//    </div>
const querySelector = 'div.yuRUbf a h3, div.usJj9c h3 a';
const searchResultsArray = Array.from(document.querySelectorAll(querySelector)).filter(node =>
    // Filter out "People also ask" section.
    // Links in that section aren't initially shown, so skip them
    // Queries to test with:
    //   "who is the president" displays the 'People also ask' section
    //   "npm create package" displays a 'featured snippet' + link above the main results (we want that link to get selected)
    //   "what is an apple" displays a link, then the 'People also ask' section
    !node.closest('.Wt5Tfe')
);
document.selectedIndexInSearchResultsArray = 0;

function selectResult(newIndex) {
    document.selectedIndexInSearchResultsArray = newIndex;
    let link = findLinkByIndex(newIndex);
    link.focus();
}

function findLinkByIndex(newIndex) {
    if (newIndex < 0 || newIndex >= searchResultsArray.length) {
        return  // future idea: modify for next/prev page
    }

    let searchResult = searchResultsArray[newIndex];

    if (searchResult.parentNode.nodeName.toLowerCase() === 'a') {
        return searchResult.parentNode;
    } else if (searchResult.nodeName.toLowerCase() === 'a') {
        return searchResult;
    } else {
        throw 'Expected an <a> with an embedded <h3> or an <h3> with an embedded <a> but instead got ' + searchResult;
    }
}

document.onkeydown = function(event) {
    if (event.key === 'ArrowUp' || isVimUpKey(event.key)) {
        selectResult(document.selectedIndexInSearchResultsArray - 1);
    }

    if (event.key === 'ArrowDown' || isVimDownKey(event.key)) {
        selectResult(document.selectedIndexInSearchResultsArray + 1);
    }

    if (event.key === 'Enter') {
        let link = findLinkByIndex(document.selectedIndexInSearchResultsArray);
        let url = link.href;
        if (event.metaKey) {
            window.open(url, '_blank');
        } else {
            document.location = url;
        }
    }
}

function isVimDownKey(key) {
    let isDown = key === 'j' || key === 'J';
    return isDown && !inputTextBoxHasFocus();
}

function isVimUpKey(key) {
    let isUp = key === 'k' || key === 'K';
    return isUp && !inputTextBoxHasFocus();
}

// j and k should work normally if the user's typing in an input box
function inputTextBoxHasFocus() {
    return document.activeElement.type === 'text';
}

// when the plugin activates, select the first result
selectResult(0);
