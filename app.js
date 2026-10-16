const numberEl=document.querySelector("#number");
const streakEl=document.querySelector("#streak");
const bestEl=document.querySelector("#best");
const message=document.querySelector("#message");
const less=document.querySelector("#less");
const more=document.querySelector("#more");
const restart=document.querySelector("#restart");
const dialog=document.querySelector("#dialog");
let current=50,streak=0,ended=false,best=Number(localStorage.getItem("wita-more-less-best")||0);
bestEl.textContent=best;
function next(){let value;do value=Math.floor(Math.random()*99)+1;while(value===current);return value}
function guess(direction){if(ended)return;const value=next(),correct=direction==="more"?value>current:value<current;numberEl.textContent=value;if(correct){streak++;message.textContent=streak>2?`Ritmo quente! ${streak} acertos seguidos.`:"Acertou! Escolha novamente.";streakEl.textContent=streak;current=value;if(streak>best){best=streak;bestEl.textContent=best;localStorage.setItem("wita-more-less-best",best)}}else{ended=true;message.textContent=`Fim da rodada. Você fez ${streak} acertos.`;restart.hidden=false;less.disabled=true;more.disabled=true}if(numberEl.animate)numberEl.animate([{transform:"scale(1.12)"},{transform:"scale(1)"}],{duration:220})}
function reset(){current=50;streak=0;ended=false;numberEl.textContent=current;streakEl.textContent=0;message.textContent="Você começa. O próximo número será maior ou menor?";restart.hidden=true;less.disabled=false;more.disabled=false}
less.onclick=()=>guess("less");
more.onclick=()=>guess("more");
restart.onclick=reset;
document.querySelector("#help").onclick=()=>dialog.showModal();
document.querySelector("#close").onclick=()=>dialog.close();
document.querySelector("#start").onclick=()=>dialog.close();
document.addEventListener("keydown",e=>{if(e.key==="ArrowUp"||e.key==="ArrowDown")e.preventDefault();if(e.key==="ArrowUp")guess("more");if(e.key==="ArrowDown")guess("less")});
reset();
setTimeout(()=>dialog.showModal(),450);
