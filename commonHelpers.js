import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as y,i as m}from"./assets/vendor-77e16229.js";const i=document.querySelector("[data-start]");i.setAttribute("disabled",!0);const h=document.querySelector("#datetime-picker");let a,f;y(h,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){a=e[0],a<=new Date?(m.error({title:"Something went wrong!",message:"Please choose a date in the future",position:"topRight",progressBar:!1}),i.setAttribute("disabled",!0)):a>new Date&&i.removeAttribute("disabled")}});i.addEventListener("click",e=>{e.target.setAttribute("disabled",!0),h.setAttribute("disabled",!0);const r=document.querySelector("[data-days]"),n=document.querySelector("[data-hours]"),s=document.querySelector("[data-minutes]"),t=document.querySelector("[data-seconds]");f=setInterval(()=>b({daysMarkup:r,hoursMarkup:n,minutesMarkup:s,secondsMarkup:t,time:a-new Date}),1e3),m.success({title:"Done!",message:"Timer has been started"})});function b({daysMarkup:e,hoursMarkup:r,minutesMarkup:n,secondsMarkup:s,time:t}){if(t>=0){const{days:u,hours:d,minutes:c,seconds:l}=p(t);e.textContent=o(u),r.textContent=o(d),n.textContent=o(c),s.textContent=o(l)}else clearInterval(f),h.removeAttribute("disabled"),m.info({title:"That is all!",message:"Timer has been finished"})}function o(e){return e<10?`0${e}`:e}function p(e){const u=Math.floor(e/864e5),d=Math.floor(e%864e5/36e5),c=Math.floor(e%864e5%36e5/6e4),l=Math.floor(e%864e5%36e5%6e4/1e3);return{days:u,hours:d,minutes:c,seconds:l}}
//# sourceMappingURL=commonHelpers.js.map
