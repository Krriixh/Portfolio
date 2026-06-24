import{ad as S,a5 as R,bc as Q,g as Y,s as tt,a as et,b as at,v as rt,t as nt,_ as p,l as W,c as it,H as st,L as lt,P as ot,e as ct,B as ut,I as pt}from"./index-DDFnfEyN.js";import{p as dt}from"./chunk-4BX2VUAB-CM_OlVWU.js";import{p as gt}from"./wardley-L42UT6IY-CJM9ib45.js";import{d as _}from"./arc-Pa8IOinD.js";import{o as ft}from"./ordinal-Cboi1Yqb.js";import"./init-Gi6I4Gst.js";function ht(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function mt(t){return t}function vt(){var t=mt,a=ht,f=null,y=S(0),s=S(R),d=S(0);function l(e){var n,o=(e=Q(e)).length,g,h,v=0,c=new Array(o),i=new Array(o),x=+y.apply(this,arguments),w=Math.min(R,Math.max(-R,s.apply(this,arguments)-x)),m,D=Math.min(Math.abs(w)/o,d.apply(this,arguments)),$=D*(w<0?-1:1),u;for(n=0;n<o;++n)(u=i[c[n]=n]=+t(e[n],n,e))>0&&(v+=u);for(a!=null?c.sort(function(A,C){return a(i[A],i[C])}):f!=null&&c.sort(function(A,C){return f(e[A],e[C])}),n=0,h=v?(w-o*$)/v:0;n<o;++n,x=m)g=c[n],u=i[g],m=x+(u>0?u*h:0)+$,i[g]={data:e[g],index:n,value:u,startAngle:x,endAngle:m,padAngle:D};return i}return l.value=function(e){return arguments.length?(t=typeof e=="function"?e:S(+e),l):t},l.sortValues=function(e){return arguments.length?(a=e,f=null,l):a},l.sort=function(e){return arguments.length?(f=e,a=null,l):f},l.startAngle=function(e){return arguments.length?(y=typeof e=="function"?e:S(+e),l):y},l.endAngle=function(e){return arguments.length?(s=typeof e=="function"?e:S(+e),l):s},l.padAngle=function(e){return arguments.length?(d=typeof e=="function"?e:S(+e),l):d},l}var xt=pt.pie,z={sections:new Map,showData:!1},T=z.sections,F=z.showData,St=structuredClone(xt),yt=p(()=>structuredClone(St),"getConfig"),wt=p(()=>{T=new Map,F=z.showData,ut()},"clear"),At=p(({label:t,value:a})=>{if(a<0)throw new Error(`"${t}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);T.has(t)||(T.set(t,a),W.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),Ct=p(()=>T,"getSections"),Dt=p(t=>{F=t},"setShowData"),$t=p(()=>F,"getShowData"),V={getConfig:yt,clear:wt,setDiagramTitle:nt,getDiagramTitle:rt,setAccTitle:at,getAccTitle:et,setAccDescription:tt,getAccDescription:Y,addSection:At,getSections:Ct,setShowData:Dt,getShowData:$t},Tt=p((t,a)=>{dt(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),bt={parse:p(async t=>{const a=await gt("pie",t);W.debug(a),Tt(a,V)},"parse")},kt=p(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),Et=kt,Mt=p(t=>{const a=[...t.values()].reduce((s,d)=>s+d,0),f=[...t.entries()].map(([s,d])=>({label:s,value:d})).filter(s=>s.value/a*100>=1);return vt().value(s=>s.value).sort(null)(f)},"createPieArcs"),Rt=p((t,a,f,y)=>{var I;W.debug(`rendering pie chart
`+t);const s=y.db,d=it(),l=st(s.getConfig(),d.pie),e=40,n=18,o=4,g=450,h=g,v=lt(a),c=v.append("g");c.attr("transform","translate("+h/2+","+g/2+")");const{themeVariables:i}=d;let[x]=ot(i.pieOuterStrokeWidth);x??(x=2);const w=l.textPosition,m=Math.min(h,g)/2-e,D=_().innerRadius(0).outerRadius(m),$=_().innerRadius(m*w).outerRadius(m*w);c.append("circle").attr("cx",0).attr("cy",0).attr("r",m+x/2).attr("class","pieOuterCircle");const u=s.getSections(),A=Mt(u),C=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let b=0;u.forEach(r=>{b+=r});const L=A.filter(r=>(r.data.value/b*100).toFixed(0)!=="0"),k=ft(C).domain([...u.keys()]);c.selectAll("mySlices").data(L).enter().append("path").attr("d",D).attr("fill",r=>k(r.data.label)).attr("class","pieCircle"),c.selectAll("mySlices").data(L).enter().append("text").text(r=>(r.data.value/b*100).toFixed(0)+"%").attr("transform",r=>"translate("+$.centroid(r)+")").style("text-anchor","middle").attr("class","slice");const U=c.append("text").text(s.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText"),B=[...u.entries()].map(([r,M])=>({label:r,value:M})),E=c.selectAll(".legend").data(B).enter().append("g").attr("class","legend").attr("transform",(r,M)=>{const O=n+o,q=O*B.length/2,J=12*n,K=M*O-q;return"translate("+J+","+K+")"});E.append("rect").attr("width",n).attr("height",n).style("fill",r=>k(r.label)).style("stroke",r=>k(r.label)),E.append("text").attr("x",n+o).attr("y",n-o).text(r=>s.getShowData()?`${r.label} [${r.value}]`:r.label);const j=Math.max(...E.selectAll("text").nodes().map(r=>(r==null?void 0:r.getBoundingClientRect().width)??0)),H=h+e+n+o+j,G=((I=U.node())==null?void 0:I.getBoundingClientRect().width)??0,X=h/2-G/2,Z=h/2+G/2,N=Math.min(0,X),P=Math.max(H,Z)-N;v.attr("viewBox",`${N} 0 ${P} ${g}`),ct(v,g,P,l.useMaxWidth)},"draw"),Wt={draw:Rt},It={parser:bt,db:V,renderer:Wt,styles:Et};export{It as diagram};
