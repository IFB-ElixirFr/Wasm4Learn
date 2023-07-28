import Ee from"./ContentRendererMarkdown.5ec4fd30.js";import ke from"./ContentRenderer.4d8924a3.js";import{_ as Ae,f as Se,r as je,s as Te,g as T,h as It,w as E,o as Ut,b as k,a as K,t as ut,i as xe,d as ct,j as Ce}from"./entry.a1580441.js";import{u as Bt}from"./asyncData.e5ff27be.js";import{q as ht}from"./query.03a4e4bf.js";import{u as Oe}from"./useCommandStore.22b9ea3a.js";import"./index.a6ef77ff.js";import"./preview.0bc5834b.js";import"./utils.c5144b18.js";var $t=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+t+'" is not supported')}),xt=(t,e,r)=>{if(!e.has(t))throw TypeError("Cannot "+r)},a=(t,e,r)=>(xt(t,e,"read from private field"),r?r.call(t):e.get(t)),c=(t,e,r)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,r)},b=(t,e,r,n)=>(xt(t,e,"write to private field"),n?n.call(t,r):e.set(t,r),r),S=(t,e,r)=>(xt(t,e,"access private method"),r),A=typeof process<"u"&&process.release&&process.release.name==="node";if(!globalThis.document){if(!globalThis.importScripts){if(!A)throw new Error("Cannot determine runtime environment")}}function Ct(){let t={resolve:r=>{},reject:r=>{},promise:null},e=new Promise((r,n)=>{t.resolve=r,t.reject=n});return t.promise=e,t}function Ne(t){return new Promise(e=>setTimeout(e,t))}function O(t,e,r,...n){return t===null||typeof t!="object"?t:e(t)?r(t,...n):Array.isArray(t)||ArrayBuffer.isView(t)?t.map(s=>O(s,e,r,...n)):Object.fromEntries(Object.entries(t).map(([s,o],l)=>[s,O(o,e,r,...n)]))}function zt(t,e){let r=new XMLHttpRequest;r.open("get",t,!0),r.onload=()=>{let n=new Worker(URL.createObjectURL(new Blob([r.responseText])));e(n)},r.send()}function Ot(t){if(A)return!1;let e=new URL(location.href),r=new URL(t,location.origin);return!(e.host===r.host&&e.port===r.port&&e.protocol===r.protocol)}var We=new WeakMap;function Me(t,e){return We.set(t,e),t}var Le=63;function Xt(){let t=Array.from({length:4},Pe).join("-");if(t.length!==Le)throw new Error("comlink internal error: UUID has the wrong length");return t}function Pe(){let t=Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16),e=15-t.length;return e>0&&(t=Array.from({length:e},()=>0).join("")+t),t}function qe(t,e){return Yt({type:"request",data:{uuid:Xt(),msg:t}},e)}function Jt(t,e,r){return Yt({type:"response",data:{uuid:t,resp:e}},r)}function Yt(t,e){return e&&Me(t,e),t}var Ie=new TextEncoder;new TextDecoder("utf-8");function Ue(t){return Ie.encode(JSON.stringify(t))}var Be=new TextEncoder;async function Je(t,e,r){try{let{taskId:n,sizeBuffer:s,dataBuffer:o,signalBuffer:l}=e,u=Ue(r),y=u.length<=o.length;if(Atomics.store(s,0,u.length),Atomics.store(s,1,+y),!y){let[L,lt]=Ve(t);o.set(Be.encode(L)),await Vt(l,n),o=(await lt).dataBuffer}o.set(u),Atomics.store(s,1,1),await Vt(l,n)}catch(n){console.warn(n)}}function Ve(t){let e=Xt();return[e,new Promise(r=>{A?t.once("message",n=>{!n.id||n.id!==e||r(n)}):t.addEventListener("message",function n(s){!s.data||!s.data.id||s.data.id!==e||(t.removeEventListener("message",n),r(s.data))}),t.start&&t.start()})]}async function Vt(t,e){let r=(e>>1)%32,n=1;for(;Atomics.compareExchange(t,r+1,0,e)!==0;)await Ne(n),n<32&&(n*=2);Atomics.or(t,0,1<<r),Atomics.notify(t,0)}var x,C,X,dt,Dt=class{constructor(){c(this,X),c(this,x,void 0),c(this,C,void 0),b(this,C,[]),b(this,x,[])}put(t){a(this,C).length||S(this,X,dt).call(this),a(this,C).shift()(t)}async get(){return a(this,x).length||S(this,X,dt).call(this),a(this,x).shift()}isEmpty(){return!a(this,x).length}isBlocked(){return!!a(this,C).length}get length(){return a(this,x).length-a(this,C).length}};x=new WeakMap,C=new WeakMap,X=new WeakSet,dt=function(){a(this,x).push(new Promise(t=>{a(this,C).push(t)}))};function De(t){let e=new Error(t.obj.message);return e.name=t.obj.name,e.stack=t.obj.stack,e}function Fe(t){return t&&typeof t=="object"&&"payloadType"in t&&"obj"in t}function Zt(t){return Fe(t)&&t.payloadType==="ptr"}var V,te=class{constructor(){this.inputQueue=new Dt,this.outputQueue=new Dt,c(this,V,new Map)}async read(){return await this.outputQueue.get()}async flush(){let t=[];for(;!this.outputQueue.isEmpty();)t.push(await this.read());return t}write(t){this.inputQueue.put(t)}async request(t,e){let r=qe(t,e),{resolve:n,reject:s,promise:o}=Ct();return a(this,V).set(r.data.uuid,{resolve:n,reject:s}),this.write(r),o}resolveResponse(t){let e=t.data.uuid,r=a(this,V).get(e);if(r){let n=t.data.resp;a(this,V).delete(e),n.payloadType==="err"?r.reject(De(n)):r.resolve(n)}else console.warn("Can't find request.")}};V=new WeakMap;new TextDecoder("utf-8");var i={};function Ge(t){Object.keys(t).forEach(e=>i._free(t[e]))}A&&(globalThis.Worker=$t("worker_threads").Worker);var D,yt,ee,Y,Ft=class extends te{constructor(t){super(),c(this,yt),c(this,D,void 0),this.close=()=>{},c(this,Y,async(r,n)=>{if(!(!n||!n.type))switch(n.type){case"resolve":b(this,D,new Int32Array(n.data)),this.resolve();return;case"response":this.resolveResponse(n);return;default:this.outputQueue.put(n);return;case"sync-request":{let s=n,o=s.data.msg,l=s.data.reqData;switch(o.type){case"read":{let u=await this.inputQueue.get();await Je(r,l,u);break}default:throw new TypeError(`Unsupported request type '${o.type}'.`)}return}case"request":throw new TypeError("Can't send messages of type 'request' from a worker. Please Use 'sync-request' instead.")}});let e=r=>{S(this,yt,ee).call(this,r),this.close=()=>r.terminate();let n={type:"init",data:{config:t,channelType:q.SharedArrayBuffer}};r.postMessage(n)};if(Ot(t.baseUrl))zt(`${t.baseUrl}webr-worker.js`,r=>e(r));else{let r=new Worker(`${t.baseUrl}webr-worker.js`);e(r)}({resolve:this.resolve,promise:this.initialised}=Ct())}interrupt(){if(!a(this,D))throw new Error("Failed attempt to interrupt before initialising interruptBuffer");a(this,D)[0]=1}};D=new WeakMap,yt=new WeakSet,ee=function(t){A?t.on("message",e=>{a(this,Y).call(this,t,e)}):t.onmessage=e=>a(this,Y).call(this,t,e.data)},Y=new WeakMap;A&&(globalThis.Worker=$t("worker_threads").Worker);var G,P,H,wt,re,ft,Gt,mt,ne,Z,Ht=class extends te{constructor(t){super(),c(this,wt),c(this,ft),c(this,mt),this.close=()=>{},c(this,G,new Map),c(this,P,void 0),c(this,H,!1),c(this,Z,async(r,n)=>{if(!(!n||!n.type))switch(n.type){case"resolve":this.resolve();return;case"response":this.resolveResponse(n);return;default:this.outputQueue.put(n);return;case"sync-request":{let s=n.data;a(this,G).set(s.data.uuid,s.data.msg);return}case"request":throw new TypeError("Can't send messages of type 'request' from a worker.Use service worker fetch request instead.")}});let e=r=>{S(this,mt,ne).call(this,r),this.close=()=>r.terminate(),S(this,wt,re).call(this,`${t.serviceWorkerUrl}webr-serviceworker.js`).then(n=>{let s={type:"init",data:{config:t,channelType:q.ServiceWorker,clientId:n,location:window.location.href}};r.postMessage(s)})};if(Ot(t.serviceWorkerUrl))zt(`${t.serviceWorkerUrl}webr-worker.js`,r=>e(r));else{let r=new Worker(`${t.serviceWorkerUrl}webr-worker.js`);e(r)}({resolve:this.resolve,promise:this.initialised}=Ct())}activeRegistration(){var t;if(!((t=a(this,P))!=null&&t.active))throw new Error("Attempted to obtain a non-existent active registration.");return a(this,P).active}interrupt(){b(this,H,!0)}};G=new WeakMap,P=new WeakMap,H=new WeakMap,wt=new WeakSet,re=async function(t){b(this,P,await navigator.serviceWorker.register(t)),await navigator.serviceWorker.ready,window.addEventListener("beforeunload",()=>{var r;(r=a(this,P))==null||r.unregister()});let e=await new Promise(r=>{navigator.serviceWorker.addEventListener("message",function n(s){s.data.type==="registration-successful"&&(navigator.serviceWorker.removeEventListener("message",n),r(s.data.clientId))}),this.activeRegistration().postMessage({type:"register-client-main"})});return navigator.serviceWorker.addEventListener("message",r=>{S(this,ft,Gt).call(this,r)}),e},ft=new WeakSet,Gt=async function(t){if(t.data.type==="request"){let e=t.data.data,r=a(this,G).get(e);if(!r)throw new Error("Request not found during service worker XHR request");switch(a(this,G).delete(e),r.type){case"read":{let n=await this.inputQueue.get();this.activeRegistration().postMessage({type:"wasm-webr-fetch-response",uuid:e,response:Jt(e,n)});break}case"interrupt":{let n=a(this,H);this.activeRegistration().postMessage({type:"wasm-webr-fetch-response",uuid:e,response:Jt(e,n)}),b(this,H,!1);break}default:throw new TypeError(`Unsupported request type '${r.type}'.`)}return}},mt=new WeakSet,ne=function(t){A?t.on("message",e=>{a(this,Z).call(this,t,e)}):t.onmessage=e=>a(this,Z).call(this,t,e.data)},Z=new WeakMap;var q={Automatic:0,SharedArrayBuffer:1,ServiceWorker:2};function He(t){switch(t.channelType){case q.SharedArrayBuffer:return new Ft(t);case q.ServiceWorker:return new Ht(t);case q.Automatic:default:if(A||crossOriginIsolated)return new Ft(t);if("serviceWorker"in navigator&&!Ot(t.serviceWorkerUrl))return new Ht(t);throw new Error("Can't initialise main thread communication channel")}}var Ke=A?__dirname+"/":"https://webr.r-wasm.org/v0.1.1/",Qe="https://repo.r-wasm.org";function W(t){return t&&(typeof t=="object"||typeof t=="function")&&"payloadType"in t&&Zt(t._payload)}function $e(t){var e;return!!(W(t)&&((e=t._payload.obj.methods)!=null&&e.includes("exec")))}var p={null:0,symbol:1,pairlist:2,closure:3,environment:4,promise:5,call:6,special:7,builtin:8,string:9,logical:10,integer:13,double:14,complex:15,character:16,dots:17,any:18,list:19,expression:20,bytecode:21,pointer:22,weakref:23,raw:24,s4:25,new:30,free:31,function:99};function se(t){return t&&typeof t=="object"&&Object.keys(p).includes(t.type)}function ae(t){return t&&typeof t=="object"&&"re"in t&&"im"in t}function pt(t){return i._Rf_protect(j(t)),t}function v(t,e){return i._Rf_protect(j(t)),++e.n,t}function ze(t){let e=i._malloc(4);return i._R_ProtectWithIndex(j(t),e),{loc:i.getValue(e,"i32"),ptr:e}}function Xe(t){i._Rf_unprotect(1),i._free(t.ptr)}function Ye(t,e){return i._R_Reprotect(j(t),e.loc),t}function R(t){i._Rf_unprotect(t)}function Kt(t,e,r){i._Rf_defineVar(j(e),j(r),j(t))}function Ze(t,e){let r={},n={n:0};try{let s=new oe(e);v(s,n),r.code=i.allocateUTF8(t);let o=i._R_ParseEvalString(r.code,s.ptr);return h.wrap(o)}finally{Ge(r),R(n.n)}}function it(t,e){return i.LDSO.loadedLibsByName["/usr/lib/R/library/webr/libs/webr.so"].module.ffi_safe_eval(j(t),j(e))}function j(t){return nr(t)?t.ptr:t}function M(t,e){if(i._TYPEOF(t.ptr)!==p[e])throw new Error(`Unexpected object type "${t.type()}" when expecting type "${e}"`)}function tr(t){if(se(t))return new(fe(p[t.type]))(t);if(t&&typeof t=="object"&&"type"in t&&t.type==="null")return new ie;if(t===null)return new Q({type:"logical",names:null,values:[null]});if(typeof t=="boolean")return new Q(t);if(typeof t=="number")return new Mt(t);if(typeof t=="string")return new B(t);if(ae(t))return new Lt(t);if(Array.isArray(t))return er(t);throw new Error("Robj construction for this JS object is not yet supported")}function er(t){let e={n:0};try{let r=new ot([new U("c"),...t]);return v(r,e),r.eval()}finally{R(e.n)}}var m=class{constructor(t){this.ptr=t}type(){let t=i._TYPEOF(this.ptr);return Object.keys(p).find(e=>p[e]===t)}},F,tt,I=class extends m{constructor(t){if(!(t instanceof m))return tr(t);super(t.ptr),c(this,F)}static wrap(t){let e=i._TYPEOF(t);return new(fe(e))(new m(t))}get[Symbol.toStringTag](){return`RObject:${this.type()}`}static getPersistentObject(t){return g[t]}getPropertyValue(t){return this[t]}inspect(){Ze(".Internal(inspect(x))",{x:this})}isNull(){return i._TYPEOF(this.ptr)===p.null}isUnbound(){return this.ptr===g.unboundValue.ptr}attrs(){return Nt.wrap(i._ATTRIB(this.ptr))}setNames(t){let e;if(t===null)e=g.null;else if(Array.isArray(t)&&t.every(r=>typeof r=="string"||r===null))e=new B(t);else throw new Error("Argument to setNames must be null or an Array of strings or null");return i._Rf_setAttrib(this.ptr,g.namesSymbol.ptr,e.ptr),this}names(){let t=B.wrap(i._Rf_getAttrib(this.ptr,g.namesSymbol.ptr));return t.isNull()?null:t.toArray()}includes(t){let e=this.names();return e&&e.includes(t)}toJs(t={depth:0},e=1){throw new Error("This R object cannot be converted to JS")}subset(t){return S(this,F,tt).call(this,t,g.bracketSymbol.ptr)}get(t){return S(this,F,tt).call(this,t,g.bracket2Symbol.ptr)}getDollar(t){return S(this,F,tt).call(this,t,g.dollarSymbol.ptr)}pluck(...t){let e=ze(g.null);try{let r=(s,o)=>{let l=s.get(o);return Ye(l,e)},n=t.reduce(r,this);return n.isNull()?void 0:n}finally{Xe(e)}}set(t,e){let r={n:0};try{let n=new I(t);v(n,r);let s=new I(e);v(s,r);let o=new U("[[<-"),l=i._Rf_lang4(o.ptr,this.ptr,n.ptr,s.ptr);return v(l,r),I.wrap(it(l,g.baseEnv))}finally{R(r.n)}}static getMethods(t){let e=new Set,r=t;do Object.getOwnPropertyNames(r).map(n=>e.add(n));while(r=Object.getPrototypeOf(r));return[...e.keys()].filter(n=>typeof t[n]=="function")}},h=I;F=new WeakSet,tt=function(t,e){let r={n:0};try{let n=new I(t);v(n,r);let s=i._Rf_lang3(e,this.ptr,n.ptr);return v(s,r),I.wrap(it(s,g.baseEnv))}finally{R(r.n)}};var ie=class extends h{constructor(){return super(new m(i.getValue(i._R_NilValue,"*"))),this}toJs(){return{type:"null"}}},U=class extends h{constructor(t){if(t instanceof m){M(t,"symbol"),super(t);return}let e=i.allocateUTF8(t);try{super(new m(i._Rf_install(e)))}finally{i._free(e)}}toJs(){let t=this.toObject();return{type:"symbol",printname:t.printname,symvalue:t.symvalue,internal:t.internal}}toObject(){return{printname:this.printname().isUnbound()?null:this.printname().toString(),symvalue:this.symvalue().isUnbound()?null:this.symvalue().ptr,internal:this.internal().isNull()?null:this.internal().ptr}}toString(){return this.printname().toString()}printname(){return Wt.wrap(i._PRINTNAME(this.ptr))}symvalue(){return h.wrap(i._SYMVALUE(this.ptr))}internal(){return h.wrap(i._INTERNAL(this.ptr))}},Nt=class extends h{constructor(t){if(t instanceof m)return M(t,"pairlist"),super(t),this;let e={n:0};try{let{names:r,values:n}=$(t),s=Nt.wrap(i._Rf_allocList(n.length));v(s,e);for(let[o,l]=[0,s];!l.isNull();[o,l]=[o+1,l.cdr()])l.setcar(new h(n[o]));s.setNames(r),super(s)}finally{R(e.n)}}get length(){return this.toArray().length}toArray(t={depth:1}){return this.toJs(t).values}toObject({allowDuplicateKey:t=!0,allowEmptyKey:e=!1,depth:r=1}={}){let n=this.entries({depth:r}),s=n.map(([o,l])=>o);if(!t&&new Set(s).size!==s.length)throw new Error("Duplicate key when converting pairlist without allowDuplicateKey enabled");if(!e&&s.some(o=>!o))throw new Error("Empty or null key when converting pairlist without allowEmptyKey enabled");return Object.fromEntries(n.filter((o,l)=>n.findIndex(u=>u[0]===o[0])===l))}entries(t={depth:1}){let e=this.toJs(t);return e.values.map((r,n)=>[e.names?e.names[n]:null,r])}toJs(t={depth:0},e=1){let r=[],n=!1,s=[];for(let o=this;!o.isNull();o=o.cdr()){let l=o.tag();l.isNull()?r.push(""):(n=!0,r.push(l.toString())),t.depth&&e>=t.depth?s.push(o.car()):s.push(o.car().toJs(t,e+1))}return{type:"pairlist",names:n?r:null,values:s}}includes(t){return t in this.toObject()}setcar(t){i._SETCAR(this.ptr,t.ptr)}car(){return h.wrap(i._CAR(this.ptr))}cdr(){return h.wrap(i._CDR(this.ptr))}tag(){return h.wrap(i._TAG(this.ptr))}},ot=class extends h{constructor(t){if(t instanceof m)return M(t,"call"),super(t),this;let e={n:0};try{let{values:r}=$(t),n=r.map(o=>v(new h(o),e)),s=ot.wrap(i._Rf_allocVector(p.call,r.length));v(s,e);for(let[o,l]=[0,s];!l.isNull();[o,l]=[o+1,l.cdr()])l.setcar(n[o]);super(s)}finally{R(e.n)}}setcar(t){i._SETCAR(this.ptr,t.ptr)}car(){return h.wrap(i._CAR(this.ptr))}cdr(){return h.wrap(i._CDR(this.ptr))}eval(){return h.wrap(it(this.ptr,g.baseEnv))}},rr=class extends h{constructor(t){if(t instanceof m)return M(t,"list"),super(t),this;let e={n:0};try{let{names:r,values:n}=$(t),s=i._Rf_allocVector(p.list,n.length);v(s,e),n.forEach((o,l)=>{i._SET_VECTOR_ELT(s,l,new h(o).ptr)}),h.wrap(s).setNames(r),super(new m(s))}finally{R(e.n)}}get length(){return i._LENGTH(this.ptr)}toArray(t={depth:1}){return this.toJs(t).values}toObject({allowDuplicateKey:t=!0,allowEmptyKey:e=!1,depth:r=1}={}){let n=this.entries({depth:r}),s=n.map(([o,l])=>o);if(!t&&new Set(s).size!==s.length)throw new Error("Duplicate key when converting list without allowDuplicateKey enabled");if(!e&&s.some(o=>!o))throw new Error("Empty or null key when converting list without allowEmptyKey enabled");return Object.fromEntries(n.filter((o,l)=>n.findIndex(u=>u[0]===o[0])===l))}entries(t={depth:1}){let e=this.toJs(t);return e.values.map((r,n)=>[e.names?e.names[n]:null,r])}toJs(t={depth:0},e=1){return{type:"list",names:this.names(),values:[...Array(this.length).keys()].map(r=>t.depth&&e>=t.depth?this.get(r+1):this.get(r+1).toJs(t,e+1))}}},z=class extends h{exec(...t){let e={n:0};try{let r=new ot([this,...t]);return v(r,e),r.eval()}finally{R(e.n)}}},Wt=class extends h{constructor(t){if(t instanceof m){M(t,"string"),super(t);return}let e=i.allocateUTF8(t);try{super(new m(i._Rf_mkChar(e)))}finally{i._free(e)}}toString(){return i.UTF8ToString(i._R_CHAR(this.ptr))}toJs(){return{type:"string",value:this.toString()}}},oe=class extends h{constructor(t={}){if(t instanceof m)return M(t,"environment"),super(t),this;let e=0;try{let{names:r,values:n}=$(t),s=pt(i._R_NewEnv(g.globalEnv.ptr,0,0));++e,n.forEach((o,l)=>{let u=r?r[l]:null;if(!u)throw new Error("Can't create object in new environment with empty symbol name");let y=new U(u),L=pt(new h(o));try{Kt(s,y,L)}finally{R(1)}}),super(new m(s))}finally{R(e)}}ls(t=!1,e=!0){return B.wrap(i._R_lsInternal3(this.ptr,Number(t),Number(e))).toArray()}bind(t,e){let r=new U(t),n=pt(new h(e));try{Kt(this,r,n)}finally{R(1)}}names(){return this.ls(!0,!0)}frame(){return h.wrap(i._FRAME(this.ptr))}subset(t){if(typeof t=="number")throw new Error("Object of type environment is not subsettable");return this.getDollar(t)}toObject({depth:t=0}={}){let e=this.names();return Object.fromEntries([...Array(e.length).keys()].map(r=>[e[r],this.getDollar(e[r]).toJs({depth:t})]))}toJs(t={depth:0},e=1){let r=this.names(),n=[...Array(r.length).keys()].map(s=>t.depth&&e>=t.depth?this.getDollar(r[s]):this.getDollar(r[s]).toJs(t,e+1));return{type:"environment",names:r,values:n}}},J=class extends h{constructor(t,e,r){if(t instanceof m)return M(t,e),super(t),this;let n={n:0};try{let{names:s,values:o}=$(t),l=i._Rf_allocVector(p[e],o.length);v(l,n),o.forEach(r(l)),h.wrap(l).setNames(s),super(new m(l))}finally{R(n.n)}}get length(){return i._LENGTH(this.ptr)}get(t){return super.get(t)}subset(t){return super.subset(t)}getDollar(t){throw new Error("$ operator is invalid for atomic vectors")}detectMissing(){let t={n:0};try{let e=i._Rf_lang2(new U("is.na").ptr,this.ptr);v(e,t);let r=Q.wrap(it(e,g.baseEnv));v(r,t);let n=r.toTypedArray();return Array.from(n).map(s=>!!s)}finally{R(t.n)}}toArray(){let t=this.toTypedArray();return this.detectMissing().map((e,r)=>e?null:t[r])}toObject({allowDuplicateKey:t=!0,allowEmptyKey:e=!1}={}){let r=this.entries(),n=r.map(([s,o])=>s);if(!t&&new Set(n).size!==n.length)throw new Error("Duplicate key when converting atomic vector without allowDuplicateKey enabled");if(!e&&n.some(s=>!s))throw new Error("Empty or null key when converting atomic vector without allowEmptyKey enabled");return Object.fromEntries(r.filter((s,o)=>r.findIndex(l=>l[0]===s[0])===o))}entries(){let t=this.toArray(),e=this.names();return t.map((r,n)=>[e?e[n]:null,r])}toJs(){return{type:this.type(),names:this.names(),values:this.toArray()}}},gt,le=class extends J{constructor(t){super(t,"logical",a(le,gt))}getBoolean(t){return this.get(t).toArray()[0]}toBoolean(){if(this.length!==1)throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");let t=this.getBoolean(1);if(t===null)throw new Error("Can't convert missing value `NA` to a JS boolean");return t}toTypedArray(){return new Int32Array(i.HEAP32.subarray(i._LOGICAL(this.ptr)/4,i._LOGICAL(this.ptr)/4+this.length))}toArray(){let t=this.toTypedArray();return this.detectMissing().map((e,r)=>e?null:!!t[r])}},Q=le;gt=new WeakMap,c(Q,gt,t=>{let e=i._LOGICAL(t),r=i.getValue(i._R_NaInt,"i32");return(n,s)=>{i.setValue(e+4*s,n===null?r:!!n,"i32")}});var vt,ue=class extends J{constructor(t){super(t,"integer",a(ue,vt))}getNumber(t){return this.get(t).toArray()[0]}toNumber(){if(this.length!==1)throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");let t=this.getNumber(1);if(t===null)throw new Error("Can't convert missing value `NA` to a JS number");return t}toTypedArray(){return new Int32Array(i.HEAP32.subarray(i._INTEGER(this.ptr)/4,i._INTEGER(this.ptr)/4+this.length))}},ce=ue;vt=new WeakMap,c(ce,vt,t=>{let e=i._INTEGER(t),r=i.getValue(i._R_NaInt,"i32");return(n,s)=>{i.setValue(e+4*s,n===null?r:Math.round(Number(n)),"i32")}});var bt,he=class extends J{constructor(t){super(t,"double",a(he,bt))}getNumber(t){return this.get(t).toArray()[0]}toNumber(){if(this.length!==1)throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");let t=this.getNumber(1);if(t===null)throw new Error("Can't convert missing value `NA` to a JS number");return t}toTypedArray(){return new Float64Array(i.HEAPF64.subarray(i._REAL(this.ptr)/8,i._REAL(this.ptr)/8+this.length))}},Mt=he;bt=new WeakMap,c(Mt,bt,t=>{let e=i._REAL(t),r=i.getValue(i._R_NaReal,"double");return(n,s)=>{i.setValue(e+8*s,n===null?r:n,"double")}});var _t,pe=class extends J{constructor(t){super(t,"complex",a(pe,_t))}getComplex(t){return this.get(t).toArray()[0]}toComplex(){if(this.length!==1)throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");let t=this.getComplex(1);if(t===null)throw new Error("Can't convert missing value `NA` to a JS object");return t}toTypedArray(){return new Float64Array(i.HEAPF64.subarray(i._COMPLEX(this.ptr)/8,i._COMPLEX(this.ptr)/8+2*this.length))}toArray(){let t=this.toTypedArray();return this.detectMissing().map((e,r)=>e?null:{re:t[2*r],im:t[2*r+1]})}},Lt=pe;_t=new WeakMap,c(Lt,_t,t=>{let e=i._COMPLEX(t),r=i.getValue(i._R_NaReal,"double");return(n,s)=>{i.setValue(e+8*(2*s),n===null?r:n.re,"double"),i.setValue(e+8*(2*s+1),n===null?r:n.im,"double")}});var Rt,de=class extends J{constructor(t){super(t,"character",a(de,Rt))}getString(t){return this.get(t).toArray()[0]}toString(){if(this.length!==1)throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");let t=this.getString(1);if(t===null)throw new Error("Can't convert missing value `NA` to a JS string");return t}toTypedArray(){return new Uint32Array(i.HEAPU32.subarray(i._STRING_PTR(this.ptr)/4,i._STRING_PTR(this.ptr)/4+this.length))}toArray(){return this.detectMissing().map((t,e)=>t?null:i.UTF8ToString(i._R_CHAR(i._STRING_ELT(this.ptr,e))))}},B=de;Rt=new WeakMap,c(B,Rt,t=>(e,r)=>{e===null?i._SET_STRING_ELT(t,r,g.naString.ptr):i._SET_STRING_ELT(t,r,new Wt(e).ptr)});var Et,ye=class extends J{constructor(t){super(t,"raw",a(ye,Et))}getNumber(t){return this.get(t).toArray()[0]}toNumber(){if(this.length!==1)throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");let t=this.getNumber(1);if(t===null)throw new Error("Can't convert missing value `NA` to a JS number");return t}toTypedArray(){return new Uint8Array(i.HEAPU8.subarray(i._RAW(this.ptr),i._RAW(this.ptr)+this.length))}},we=ye;Et=new WeakMap,c(we,Et,t=>{let e=i._RAW(t);return(r,n)=>{i.setValue(e+n,Number(r),"i8")}});function $(t){return se(t)?t:Array.isArray(t)?{names:null,values:t}:t&&typeof t=="object"&&!ae(t)?{names:Object.keys(t),values:Object.values(t)}:{names:null,values:[t]}}function fe(t){let e={[p.null]:ie,[p.symbol]:U,[p.pairlist]:Nt,[p.closure]:z,[p.environment]:oe,[p.call]:ot,[p.special]:z,[p.builtin]:z,[p.string]:Wt,[p.logical]:Q,[p.integer]:ce,[p.double]:Mt,[p.complex]:Lt,[p.character]:B,[p.list]:rr,[p.raw]:we,[p.function]:z};return t in e?e[t]:h}function nr(t){return t instanceof h}var g;function sr(){}function ar(t,e){return async function*(){let r={type:"callRObjectMethod",data:{payload:e._payload,prop:"getPropertyValue",args:[{payloadType:"raw",obj:"length"}],shelter:void 0}},n=await t.request(r);if(typeof n.obj!="number")throw new Error("Cannot iterate over object, unexpected type for length property.");for(let s=1;s<=n.obj;s++)yield e.get(s)}}function me(t,e,r){return async(...n)=>{let s=n.map(u=>W(u)?u._payload:{obj:O(u,W,y=>y._payload),payloadType:"raw"}),o={type:"callRObjectMethod",data:{payload:r,prop:e,args:s}},l=await t.request(o);switch(l.payloadType){case"ptr":return N(t,l);case"raw":return O(l,Zt,(u,y)=>N(y,u),t).obj}}}async function ir(t,e,r,n){let s={type:"newRObject",data:{objType:e,obj:O(n,W,l=>l._payload),shelter:r}},o=await t.request(s);switch(o.payloadType){case"raw":throw new Error("Unexpected raw payload type returned from newRObject");case"ptr":return N(t,o)}}function N(t,e){var r;let n=new Proxy((r=e.obj.methods)!=null&&r.includes("exec")?Object.assign(sr,{...e}):e,{get:(s,o)=>{var l;if(o==="_payload")return e;if(o===Symbol.asyncIterator)return ar(t,n);if((l=e.obj.methods)!=null&&l.includes(o.toString()))return me(t,o.toString(),e)},apply:async(s,o,l)=>{let u=await N(t,e).exec(...l);return $e(u)?u:u.toJs()}});return n}function _(t,e,r){return new Proxy(h,{construct:(n,s)=>ir(t,r,e,...s),get:(n,s)=>me(t,s.toString())})}var rt,nt,st,at,kt,At,St,jt,Tt,ge,or=class{constructor(t={},e={REnv:{R_HOME:"/usr/lib/R",R_ENABLE_JIT:"0",R_DEFAULT_DEVICE:"canvas"}}){c(this,Tt),c(this,rt,void 0),c(this,nt,void 0),c(this,st,void 0),c(this,at,void 0),c(this,kt,r=>{console.log(r)}),c(this,At,r=>{console.error(r)}),c(this,St,r=>{let n=prompt(r);n&&this.stdin(`${n}
`)}),c(this,jt,r=>{if(A)throw new Error("Plotting with HTML canvas is not yet supported under Node");Function(`this.getContext('2d').${r}`).bind(this.canvas)()}),this.webR=new cr(e),A||(this.canvas=document.createElement("canvas"),this.canvas.setAttribute("width","1008"),this.canvas.setAttribute("height","1008")),b(this,rt,t.stdout||a(this,kt)),b(this,nt,t.stderr||a(this,At)),b(this,st,t.prompt||a(this,St)),b(this,at,t.canvasExec||a(this,jt))}stdin(t){this.webR.writeConsole(t)}interrupt(){this.webR.interrupt()}run(){S(this,Tt,ge).call(this)}};rt=new WeakMap,nt=new WeakMap,st=new WeakMap,at=new WeakMap,kt=new WeakMap,At=new WeakMap,St=new WeakMap,jt=new WeakMap,Tt=new WeakSet,ge=async function(){for(;;){let t=await this.webR.read();switch(t.type){case"stdout":a(this,rt).call(this,t.data);break;case"stderr":a(this,nt).call(this,t.data);break;case"prompt":a(this,st).call(this,t.data);break;case"canvasExec":a(this,at).call(this,t.data);break;default:console.warn(`Unhandled output type for webR Console: ${t.type}.`)}}};var lr={R_HOME:"/usr/lib/R",R_ENABLE_JIT:"0"},ur={RArgs:[],REnv:lr,baseUrl:Ke,serviceWorkerUrl:"",repoUrl:Qe,homedir:"/home/web_user",interactive:!0,channelType:q.Automatic},f,cr=class{constructor(t={}){c(this,f,void 0),this.FS={lookupPath:async r=>{let n={type:"lookupPath",data:{path:r}};return(await a(this,f).request(n)).obj},mkdir:async r=>{let n={type:"mkdir",data:{path:r}};return(await a(this,f).request(n)).obj},readFile:async(r,n)=>{let s={type:"readFile",data:{path:r,flags:n}};return(await a(this,f).request(s)).obj},rmdir:async r=>{let n={type:"rmdir",data:{path:r}};await a(this,f).request(n)},writeFile:async(r,n,s)=>{let o={type:"writeFile",data:{path:r,data:n,flags:s}};await a(this,f).request(o)},unlink:async r=>{let n={type:"unlink",data:{path:r}};await a(this,f).request(n)}};let e=Object.assign(ur,t);b(this,f,He(e)),this.objs={},this.Shelter=hr(a(this,f))}async init(){let t=await a(this,f).initialised;return this.globalShelter=await new this.Shelter,this.RObject=this.globalShelter.RObject,this.RLogical=this.globalShelter.RLogical,this.RInteger=this.globalShelter.RInteger,this.RDouble=this.globalShelter.RDouble,this.RComplex=this.globalShelter.RComplex,this.RCharacter=this.globalShelter.RCharacter,this.RRaw=this.globalShelter.RRaw,this.RList=this.globalShelter.RList,this.RPairlist=this.globalShelter.RPairlist,this.REnvironment=this.globalShelter.REnvironment,this.RSymbol=this.globalShelter.RSymbol,this.RString=this.globalShelter.RString,this.RCall=this.globalShelter.RCall,this.objs={baseEnv:await this.RObject.getPersistentObject("baseEnv"),globalEnv:await this.RObject.getPersistentObject("globalEnv"),null:await this.RObject.getPersistentObject("null"),true:await this.RObject.getPersistentObject("true"),false:await this.RObject.getPersistentObject("false"),na:await this.RObject.getPersistentObject("na")},t}close(){a(this,f).close()}async read(){return await a(this,f).read()}async flush(){return await a(this,f).flush()}write(t){a(this,f).write(t)}writeConsole(t){this.write({type:"stdin",data:t+`
`})}interrupt(){a(this,f).interrupt()}async installPackages(t){for(let e of t){let r={type:"installPackage",data:{name:e}};await a(this,f).request(r)}}async destroy(t){await this.globalShelter.destroy(t)}async evalR(t,e){return this.globalShelter.evalR(t,e)}async evalRVoid(t,e){return this.evalRRaw(t,"void",e)}async evalRBoolean(t,e){return this.evalRRaw(t,"boolean",e)}async evalRNumber(t,e){return this.evalRRaw(t,"number",e)}async evalRString(t,e){return this.evalRRaw(t,"string",e)}async evalRRaw(t,e,r={}){let n=O(r,W,l=>l._payload),s={type:"evalRRaw",data:{code:t,options:n,outputType:e}},o=await a(this,f).request(s);switch(o.payloadType){case"raw":return o.obj;case"ptr":throw new Error("Unexpected ptr payload type returned from evalRVoid")}}};f=new WeakMap;var w,d,et,Qt=class{constructor(t){c(this,w,""),c(this,d,void 0),c(this,et,!1),b(this,d,t)}async init(){if(a(this,et))return;let t={type:"newShelter"},e=await a(this,d).request(t);b(this,w,e.obj),this.RObject=_(a(this,d),a(this,w),"object"),this.RLogical=_(a(this,d),a(this,w),"logical"),this.RInteger=_(a(this,d),a(this,w),"integer"),this.RDouble=_(a(this,d),a(this,w),"double"),this.RComplex=_(a(this,d),a(this,w),"complex"),this.RCharacter=_(a(this,d),a(this,w),"character"),this.RRaw=_(a(this,d),a(this,w),"raw"),this.RList=_(a(this,d),a(this,w),"list"),this.RPairlist=_(a(this,d),a(this,w),"pairlist"),this.REnvironment=_(a(this,d),a(this,w),"environment"),this.RSymbol=_(a(this,d),a(this,w),"symbol"),this.RString=_(a(this,d),a(this,w),"string"),this.RCall=_(a(this,d),a(this,w),"call"),b(this,et,!0)}async purge(){let t={type:"shelterPurge",data:a(this,w)};await a(this,d).request(t)}async destroy(t){let e={type:"shelterDestroy",data:{id:a(this,w),obj:t._payload}};await a(this,d).request(e)}async size(){let t={type:"shelterSize",data:a(this,w)};return(await a(this,d).request(t)).obj}async evalR(t,e={}){let r=O(e,W,o=>o._payload),n={type:"evalR",data:{code:t,options:r,shelter:a(this,w)}},s=await a(this,d).request(n);switch(s.payloadType){case"raw":throw new Error("Unexpected payload type returned from evalR");default:return N(a(this,d),s)}}async captureR(t,e={}){let r=O(e,W,o=>o._payload),n={type:"captureR",data:{code:t,options:r,shelter:a(this,w)}},s=await a(this,d).request(n);switch(s.payloadType){case"ptr":throw new Error("Unexpected payload type returned from evalR");case"raw":{let o=s.obj,l=N(a(this,d),o.result),u=o.output;for(let y=0;y<u.length;++y)u[y].type!=="stdout"&&u[y].type!=="stderr"&&(u[y].data=N(a(this,d),u[y].data));return{result:l,output:u}}}}};w=new WeakMap,d=new WeakMap,et=new WeakMap;function hr(t){return new Proxy(Qt,{construct:async()=>{let e=new Qt(t);return await e.init(),e}})}const pr={data(){return{command:"",pos:0,data:""}},async setup(){const t=Se(),e=je(t.query.id?t.query.id:""),r=t.path+e.value,n=Oe(),{command:s}=Te(n),o=new or({stdout:y=>document.getElementById("out").append(y+`
`),stderr:y=>document.getElementById("out").append(y+`
`),prompt:y=>document.getElementById("out").append(y)}),l=await ht(r).find();for(var u=l.length-1;u>=0;u--)(l[u]._path==r+"_dir"||l[u]._path==r+"/_dir")&&l.splice(u,1);return{webRConsole:o,tutosList:l,store:n,command:s}},async mounted(){await this.webRConsole.run(),this.data=this.tutosList[this.pos]},methods:{async getOutput(){for(;;){const t=await this.webR.read();switch(t.type){case"stdout":this.stdout.push(t.data);break;case"stderr":this.stderr=this.srdout+t.data;break;default:console.warn(`Unhandled output type: ${t.type}.`)}}},async onEnter(){this.webRConsole.stdin(this.command),document.getElementById("out").append(this.command+`
`),this.command=""},async nextBtn(){if(this.pos<this.tutosList.length){this.pos=this.pos+1;const{data:t}=await Bt("page-data",()=>ht(this.tutosList[this.pos]._path).findOne());this.data=t}},async prevBtn(){if(this.pos>0){this.pos=this.pos-1;const{data:t}=await Bt("page-data",()=>ht(this.tutosList[this.pos]._path).findOne());this.data=t}}},watch:{command(t){if(this.store.changed){console.log(this.store.command);for(const e of this.store.command)this.webRConsole.stdin(e),document.getElementById("out").append(e+`
`);this.store.reset()}}}},dr={class:"prose",style:{}},yr=K("br",null,null,-1),wr=K("pre",null,[K("code",{id:"out"},"Loading webR, please wait...")],-1);function fr(t,e,r,n,s,o){const l=Ee,u=ke,y=T("v-card-text"),L=T("v-btn"),lt=T("v-chip"),ve=T("v-card-actions"),Pt=T("v-card"),qt=T("v-col"),be=T("v-text-field"),_e=T("v-row");return Ut(),It(_e,{class:"fill-height"},{default:E(()=>[k(qt,{class:"fill-height overflow-y-auto"},{default:E(()=>[k(Pt,{class:"fill-height"},{default:E(()=>[k(y,{class:"fill-height overflow-y-auto",style:{"max-height":"calc(100% - 50px)"}},{default:E(()=>[K("div",dr,[s.data?(Ut(),It(u,{key:0,value:s.data},{default:E(()=>[K("h1",null,ut(s.data.title),1),yr,k(l,{value:s.data},null,8,["value"])]),_:1},8,["value"])):xe("",!0)])]),_:1}),k(ve,{class:"d-flex justify-end",style:{"background-color":"lightsteelblue"}},{default:E(()=>[k(L,{disabled:s.pos==0,onClick:o.prevBtn},{default:E(()=>[ct("Prev")]),_:1},8,["disabled","onClick"]),k(L,{disabled:s.pos==n.tutosList.length-1,onClick:o.nextBtn,class:"me-2"},{default:E(()=>[ct("Next")]),_:1},8,["disabled","onClick"]),k(lt,null,{default:E(()=>[ct(ut(s.pos+1)+" / "+ut(n.tutosList.length),1)]),_:1})]),_:1})]),_:1})]),_:1}),k(qt,{class:"fill-height"},{default:E(()=>[k(Pt,{class:"fill-height"},{default:E(()=>[k(y,{class:"fill-height overflow-y-auto"},{default:E(()=>[wr,k(be,{onKeyup:Ce(o.onEnter,["enter"]),modelValue:n.command,"onUpdate:modelValue":e[0]||(e[0]=Re=>n.command=Re)},null,8,["onKeyup","modelValue"])]),_:1})]),_:1})]),_:1})]),_:1})}const Sr=Ae(pr,[["render",fr]]);export{Sr as default};
