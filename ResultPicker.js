document.selectedResultId=0

function selectResult(newId){
    els = document.querySelectorAll("div.r h3")
    if(newId < 0 || newId >= els.length)
        return  //Could modify for page nav...?
    rp = document.getElementById("result-pointer")
    if(rp != null){
        rp.remove()
    }
    document.selectedResultId=newId
    el = els[newId]
    lnk = el.parentElement
    el.innerHTML = "<div id=\"result-pointer\" style=\"position:absolute;left:-15px;\">&gt;</div>" + el.innerHTML
    lnk.focus()
}
document.onkeyup=function(event){
    if(event.keyCode==38)
        selectResult(document.selectedResultId-1)
    if(event.keyCode==40)
        selectResult(document.selectedResultId+1)
    if(event.keyCode==13){
      var el = document.querySelectorAll("div.r h3")[document.selectedResultId]
      var lnk = el.parentElement
      var url = lnk.href
      if(event.ctrlKey){
        var win = window.open(url,"_blank")
        win.blur()
        window.open().close()
      }
      else{
        document.location = url
      }
    }
}
selectResult(0)
