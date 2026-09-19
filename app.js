const phones = [
  {
    id:"15", name:"iPhone 15", year:2023, price:"$799", display:"6.1-inch OLED", chip:"A16 Bionic",
    camera:"48 MP Main + 12 MP Ultra Wide", battery:"Up to 20 hours video playback",
    port:"USB-C (USB 2)", refresh:"60 Hz", biometrics:"Face ID",
    ai:"Apple Intelligence: No", material:"Aluminum + color-infused glass",
    explanations:{
      "Refresh rate":"How many times the display can update each second. A higher number can make scrolling and motion look smoother.",
      "USB 2":"A USB data-transfer standard. USB 2 has a much lower maximum data rate than USB 3 or USB 4.",
      "OLED":"A display technology where individual pixels produce their own light, allowing very deep blacks."
    }
  },
  {
    id:"15pro", name:"iPhone 15 Pro", year:2023, price:"$999", display:"6.1-inch OLED", chip:"A17 Pro",
    camera:"48 MP Main + 12 MP Ultra Wide + 12 MP 3× Telephoto", battery:"Up to 23 hours video playback",
    port:"USB-C (USB 3 up to 10 Gb/s)", refresh:"1–120 Hz ProMotion", biometrics:"Face ID",
    ai:"Apple Intelligence: Yes", material:"Titanium + textured matte glass",
    explanations:{
      "Refresh rate":"How many times the display can update each second. ProMotion can vary the refresh rate to balance smoothness and power use.",
      "USB 3":"A faster USB data standard than USB 2. It can make wired transfers of large files much quicker.",
      "OLED":"A display technology where individual pixels produce their own light, allowing very deep blacks."
    }
  },
  {
    id:"16", name:"iPhone 16", year:2024, price:"$799", display:"6.1-inch OLED", chip:"A18",
    camera:"48 MP Main + 12 MP Ultra Wide", battery:"Up to 22 hours video playback",
    port:"USB-C (USB 2)", refresh:"60 Hz", biometrics:"Face ID",
    ai:"Apple Intelligence: Yes", material:"Aluminum + color-infused glass",
    explanations:{
      "Refresh rate":"How many times the display can update each second.",
      "USB 2":"A USB data-transfer standard with a lower maximum data rate than USB 3.",
      "OLED":"A display technology where individual pixels produce their own light, allowing very deep blacks."
    }
  },
  {
    id:"16pro", name:"iPhone 16 Pro", year:2024, price:"$999", display:"6.3-inch OLED", chip:"A18 Pro",
    camera:"48 MP Main + 48 MP Ultra Wide + 12 MP 5× Telephoto", battery:"Up to 27 hours video playback",
    port:"USB-C (USB 3 up to 10 Gb/s)", refresh:"1–120 Hz ProMotion", biometrics:"Face ID",
    ai:"Apple Intelligence: Yes", material:"Titanium + textured matte glass",
    explanations:{
      "Refresh rate":"How many times the display can update each second. ProMotion can vary it from very low rates up to 120 Hz.",
      "USB 3":"A faster USB data standard useful for moving large files quickly.",
      "OLED":"A display technology where individual pixels produce their own light, allowing very deep blacks."
    }
  }
];

const categories = [
  ["Core","Release year","year"],["Core","Starting price","price"],["Display","Display","display"],
  ["Display","Refresh rate","refresh"],["Performance","Chip","chip"],["Cameras","Camera system","camera"],
  ["Battery","Battery","battery"],["Connectivity","Port","port"],["Security","Biometrics","biometrics"],
  ["Software","Apple Intelligence","ai"],["Design","Materials","material"]
];

const a=document.querySelector("#phoneA"), b=document.querySelector("#phoneB");
phones.forEach((p,i)=>{const o1=new Option(p.name,p.id),o2=new Option(p.name,p.id);a.add(o1);b.add(o2);});
a.value="15"; b.value="16pro";

function get(id){return phones.find(p=>p.id===id)}
function render(){
  const x=get(a.value), y=get(b.value);
  document.querySelector("#results").classList.remove("hidden");
  document.querySelector("#titleA").textContent=x.name;
  document.querySelector("#titleB").textContent=y.name;
  document.querySelector("#summary").innerHTML=`<div class="summary"><h2>At a glance</h2><p>${x.name} uses ${x.chip}; ${y.name} uses ${y.chip}. ${x.name} has a ${x.display}, while ${y.name} has a ${y.display}. Tap ⓘ beside a term for an explanation.</p></div>`;
  let html="", current="";
  categories.forEach(([cat,label,key])=>{
    if(cat!==current){if(current) html+="</div>"; current=cat; html+=`<div class="category"><h2>${cat}</h2>`}
    const same=String(x[key])===String(y[key]);
    html+=`<div class="row"><div class="term">${label} <button onclick="explain('${label.replaceAll("'","\\'")}')">ⓘ</button></div><div class="value">${x[key]}${same?'<span class="dim">Same on both</span>':''}</div><div class="value right">${y[key]}</div></div>`;
  });
  html+="</div>";
  document.querySelector("#specs").innerHTML=html;
}
window.explain=(label)=>{
  const x=get(a.value), y=get(b.value);
  const text=x.explanations?.[label] || y.explanations?.[label] || "This specification describes a hardware or software characteristic of the iPhone. The detailed technical meaning will be added to the terminology database as the project grows.";
  document.querySelector("#dialogContent").innerHTML=`<h2>${label}</h2><p class="explain">${text}</p><p class="tech">Technical detail: ${label} is shown using the verified specification stored for each selected model.</p>`;
  document.querySelector("#infoDialog").showModal();
};
document.querySelector("#compareBtn").onclick=render;
document.querySelector("#closeDialog").onclick=()=>document.querySelector("#infoDialog").close();
document.querySelector("#themeBtn").onclick=()=>{document.body.classList.toggle("dark");localStorage.setItem("dark",document.body.classList.contains("dark"));};
if(localStorage.getItem("dark")==="true")document.body.classList.add("dark");
render();
