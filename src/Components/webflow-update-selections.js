function updateAll() {
    s=document.getElementsByTagName('select');for(let i=0;i<s.length;i++){setTimeout(el=>{const e=document.createEvent('HTMLEvents');e.initEvent('change',false,true);el.dispatchEvent(e);},i*10,s[i])};
  }