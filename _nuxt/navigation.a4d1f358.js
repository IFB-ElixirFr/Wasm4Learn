import{y as m,H as p}from"./entry.3ee242ce.js";import{h as o,u as f}from"./preview.e9fe5236.js";import{q as g,e as c,j as h}from"./query.da1d0c26.js";import{w as s,s as v}from"./utils.3c7c1cff.js";const T=async t=>{const{content:n}=m().public;typeof(t==null?void 0:t.params)!="function"&&(t=g(t));const a=t.params(),i=n.experimental.stripQueryParameters?s(`/navigation/${`${o(a)}.${n.integrity}`}/${c(a)}.json`):s(`/navigation/${o(a)}.${n.integrity}.json`);if(v())return(await p(()=>import("./client-db.b83c1611.js"),["./client-db.b83c1611.js","./entry.3ee242ce.js","./entry.6890bb10.css","./query.da1d0c26.js","./preview.e9fe5236.js","./utils.3c7c1cff.js","./index.a6ef77ff.js"],import.meta.url).then(r=>r.generateNavigation))(a);const e=await $fetch(i,{method:"GET",responseType:"json",params:n.experimental.stripQueryParameters?void 0:{_params:h(a),previewToken:f().getPreviewToken()}});if(typeof e=="string"&&e.startsWith("<!DOCTYPE html>"))throw new Error("Not found");return e};export{T as f};