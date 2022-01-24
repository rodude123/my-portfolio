const scrollLimit=150;var dataText=["full stack developer","web designer","student","gamer","drummer"];function typeWriter(t,e,n){e<t.length?(document.querySelector("header div h1").innerHTML=t.substring(0,e+1)+'<span aria-hidden="true">_</span>',setTimeout((function(){typeWriter(t,e+1,n)}),100)):"function"==typeof n&&setTimeout(n,700)}function StartTextAnimation(t){void 0===dataText[t]?setTimeout((function(){StartTextAnimation(0)}),1500):t<dataText[t].length&&typeWriter(dataText[t],0,(function(){setTimeout(StartTextAnimation,1500,t+1)}))}function getTimelineData(){fetch("/api/timelineData/edu").then((t=>{t.json().then((e=>{t.ok&&e.forEach((t=>{let e=document.createElement("div");e.classList.add("timelineItem"),e.innerHTML=`\n\t\t\t\t\t<h3 class="timelineHeader">${t.startPeriod} - ${t.endPeriod}</h3>\n\t\t\t\t\t<span>Grade: ${t.grade}</span>\n\t\t\t\t\t<p class="timelineText">${t.course}</p>\n\t\t\t\t`,document.getElementById("edu").appendChild(e)}))}))})),fetch("/api/timelineData/work").then((t=>{t.json().then((e=>{t.ok&&e.forEach((t=>{let e=document.createElement("div");e.classList.add("timelineItem"),e.innerHTML=`\n\t\t\t\t\t<h3 class="timelineHeader">${t.startPeriod} - ${t.endPeriod}</h3>\n\t\t\t\t\t<span>${t.companyName} - ${t.area}</span>\n\t\t\t\t\t<p class="timelineText">${t.title}</p>\n\t\t\t\t`,document.getElementById("work").appendChild(e)}))}))}))}function getProjectData(){fetch("/api/projectData").then((t=>{t.json().then((e=>{t.ok&&e.forEach((t=>{if("1"===t.isMainProject)return document.getElementById("mainProj").innerHTML=`\n\t\t\t\t\t\t<h1>${t.title}</h1>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<img src="imgs/1000x800.jpg" alt="">\n\t\t\t\t\t\t\t<div class="flexRow">\n\t\t\t\t\t\t\t\t<p>${t.information}</p>\n\t\t\t\t\t\t\t\t<div class="flexCol">\n\t\t\t\t\t\t\t\t\t<a href="${"N/A"===t.projectLink?"#":t.projectLink}" class="btn btnPrimary boxShadowIn boxShadowOut" ${"N/A"===t.projectLink?'disabled="disabled"':""}>View Project</a>\n\t\t\t\t\t\t\t\t\t<a href="${"N/A"===t.githubLink?"#":t.gitubLink}" class="btn btnOutline boxShadowIn boxShadowOut" ${"N/A"===t.githubLink?'disabled="disabled"':""}>GitHub</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t`,null;document.querySelector("#otherProj div").innerHTML+=`\n                    <div class="oProjItem">\n                        <img src="imgs/500x400.jpg" alt="">\n                        <div class="flexCol">\n                            <div>\n                                <p>${t.information}</p>\n                            </div>\n                            <div>\n                                <a href="${"N/A"===t.projectLink?"#":t.projectLink}" class="btn btnPrimary boxShadowIn boxShadowOut"${"N/A"===t.projectLink?'disabled="disabled"':""}>View Project</a>\n                                <a href="${"N/A"===t.githubLink?"#":t.gitubLink}" class="btn btnOutline boxShadowIn boxShadowOut">${"N/A"===t.githubLink?'disabled="disabled"':""}Github</a>\n                            </div>\n                        </div>\n                    </div>\n                    `}))}))}))}window.onscroll=()=>{document.body.scrollTop>=150||document.documentElement.scrollTop>=150?document.querySelector("nav").classList.add("scrolled"):document.querySelector("nav").classList.remove("scrolled");let t="";document.querySelectorAll("section").forEach((e=>{const n=e.offsetTop;window.pageYOffset>=n-60&&(t=e.getAttribute("id"))})),document.querySelectorAll("nav ul li a").forEach((e=>{e.classList.remove("active"),e.href.includes(t)&&""!==t?e.classList.add("active"):""===t&&document.querySelector("nav ul li a").classList.add("active")}))},document.addEventListener("DOMContentLoaded",(()=>{StartTextAnimation(0),getTimelineData(),getProjectData()})),document.querySelector("#contactError .close").addEventListener("click",(()=>document.querySelector("#contactError").classList.toggle("hidden"))),document.querySelector("#goBackToTop").addEventListener("click",(()=>{window.scrollTo(0,0)})),document.querySelector("#contactForm").addEventListener("submit",(t=>{t.preventDefault();let e=new FormData;e.append("fName",document.querySelector("#fName").value),e.append("lName",document.querySelector("#lName").value),e.append("email",document.querySelector("#email").value),e.append("subject",document.querySelector("#subject").value),e.append("message",document.querySelector("#message").value);let n=!1;if(["#fName","#lName","#email","#subject","#message"].forEach((t=>{const e=document.querySelector(t);0===e.value.length?(e.classList.add("invalid"),n=!0):(e.classList.remove("invalid"),document.querySelector("#contactError").classList.remove("error"))})),n)return document.querySelector("#contactError").classList.add("error"),document.querySelector("#contactError").classList.remove("hidden"),void(document.querySelector("#contactError div").innerText="Please fill out all fields.");fetch("/api/contact",{method:"POST",body:e}).then((t=>{t.ok&&(document.querySelector("#contactError").classList.remove("hidden"),document.querySelector("#contactError div").innerText="Thanks for contacting me, I will get back to you as soon as possible.")}))}));