// modified version of https://superuser.com/a/1235058/69589

// find all the search results
const querySelector = 'div.yuRUbf';

document.selectedResultId = 0;
function selectResult(newId) {
    els = document.querySelectorAll(querySelector)
    if (newId < 0 || newId >= els.length) {
        return  //Could modify for page nav...?
    }
    rp = document.getElementById("result-pointer");
    if (rp != null) {
        rp.remove();
    }
    document.selectedResultId = newId;
    el = els[newId];
    lnk = el.querySelector("a");
    lnk.focus();
    el.innerHTML = "<div id=\"result-pointer\" style=\"position:absolute;left:-15px;\">&gt;</div>" + el.innerHTML;
}
document.onkeydown = function(event) {
    // the '/' key
    if (event.keyCode == 191) {
        document.getElementsByName("q")[0].focus();
    }

    // the up arrow key
    if (event.keyCode == 38) {
        selectResult(document.selectedResultId-1);
    }

    // the down arrrow key
    if (event.keyCode == 40) {
        selectResult(document.selectedResultId+1);
    }
    // the enter key
    if (event.keyCode == 13) {
      var el = document.querySelectorAll(querySelector)[document.selectedResultId];
      var lnk = el.querySelector("a");
      var url = lnk.href;
      if (event.metaKey) {
        var win = window.open(url,"_blank");
      } else {
        document.location = url;
      }
    }
}
selectResult(0);
