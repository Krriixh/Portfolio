import{au as i,ao as o,j as e,ap as a,m as n}from"./index-DDFnfEyN.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],l=i("ArrowUp",c);function p(){const[s,r]=o.useState(!1);return o.useEffect(()=>{const t=()=>r(window.scrollY>600);return window.addEventListener("scroll",t,{passive:!0}),()=>window.removeEventListener("scroll",t)},[]),e.jsx(a,{children:s&&e.jsx(n.button,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:"fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full glass-panel border border-white/10 flex items-center justify-center hover:border-white/25 transition-colors",children:e.jsx(l,{size:16,className:"text-white/50"})})})}export{p as default};
