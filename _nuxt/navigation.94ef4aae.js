import{I as m,bN as p}from"./entry.3ab42fa5.js";import{h as o,u as f}from"./preview.8b88c1c1.js";import{q as g,e as c,j as h}from"./query.67db1086.js";import{w as s,s as v}from"./utils.f832939f.js";const N=async t=>{const{content:n}=m().public;typeof(t==null?void 0:t.params)!="function"&&(t=g(t));const a=t.params(),i=n.experimental.stripQueryParameters?s(`/navigation/${`${o(a)}.${n.integrity}`}/${c(a)}.json`):s(`/navigation/${o(a)}.${n.integrity}.json`);if(v())return(await p(()=>import("./client-db.f1117c3f.js"),["./client-db.f1117c3f.js","./entry.3ab42fa5.js","./entry.6890bb10.css","./query.67db1086.js","./preview.8b88c1c1.js","./utils.f832939f.js","./index.a6ef77ff.js"],import.meta.url).then(r=>r.generateNavigation))(a);const e=await $fetch(i,{method:"GET",responseType:"json",params:n.experimental.stripQueryParameters?void 0:{_params:h(a),previewToken:f().getPreviewToken()}});if(typeof e=="string"&&e.startsWith("<!DOCTYPE html>"))throw new Error("Not found");return e};export{N as f};
