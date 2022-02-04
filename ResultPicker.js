// from https://github.com/RobinH-J/SearchingShortcuts

// selector to find all Google search results. Simplified Google html:
//   <div class="yuRUbf">
//     <a href="The real url is here">
//       <br>
//       <h3>The big text we see in Google Search results</h3>
//     </a>
//   </div>
// And sometimes we get pseudo-results (like Ads) that don't contain the h3: exclude them.
const querySelector = 'div.yuRUbf h3';
document.selectedResultId = 0;

function selectResult(newId) {
    let linkTextArray = getSearchResultsAsArray();
    if (newId < 0 || newId >= linkTextArray.length) {
        return  // future idea: modify for next/prev page
    }

    document.selectedResultId = newId;
    let linkText = linkTextArray[newId];
    let link = linkText.parentElement;
    link.focus();
}

function getSearchResultsAsArray() {
  return Array.from(document.querySelectorAll(querySelector)).filter(node =>
    // Filter out "People also ask" section.
    // Links in that section aren't initially shown, so skip them
    // Queries to test with:
    //   "who is the president" displays the 'People also ask' section
    //   "npm create package" displays a 'featured snippet' + link above the main results (we want that link to get selected)
    //   "what is an apple" displays a link, then the 'People also ask' section
    !node.closest('.Wt5Tfe')
  );
}

document.onkeydown = function(event) {
    // the up arrow key
    if (event.key === 'ArrowUp') {
        selectResult(document.selectedResultId - 1);
    }

    // the down arrow key
    if (event.key === 'ArrowDown') {
        selectResult(document.selectedResultId + 1);
    }
    // the enter key
    if (event.key === 'Enter') {
      let linkText = getSearchResultsAsArray()[document.selectedResultId];
      let link = linkText.parentElement;
      let url = link.href;
      if (event.metaKey) {
        window.open(url, '_blank');
      } else {
        document.location = url;
      }
    }
}

// when the plugin activates, select the first result
selectResult(0);
