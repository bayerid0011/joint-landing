(()=>{'use strict';
const o=window.OFFER;if(!o){document.body.textContent='Configuración no encontrada';return;}
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const t=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value??''};
const price=new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',maximumFractionDigits:0}).format(o.price);
document.title=`${o.product} | ${price} | México`;
$$('[data-product]').forEach(el=>el.textContent=o.product);$$('[data-price]').forEach(el=>el.textContent=price);
t('eyebrow',o.eyebrow);t('hero-title',o.headline);t('hero-desc',o.description);t('product-format',o.format);t('art-tag',o.artTag);t('product-identity',o.product);t('product-label',o.product);t('product-subheading',o.productSubheading);t('product-description',o.productDescription);t('specific-warning',o.warning);t('use-title',o.useTitle);t('use-description',o.useDescription);t('faq-product',o.product);t('form-description',o.formDescription);
const productImg=$('#product-img'),stageImg=$('#stage-img');for(const img of [productImg,stageImg]){img.src=o.image;img.alt=`Ilustración de ${o.product}, sustituir por foto verificada antes de publicar anuncios`;}
const list=(id,items,build)=>{let el=document.getElementById(id);if(el)el.innerHTML=items.map(build).join('')};
list('hero-bullets',o.bullets,x=>`<span class="pill">${esc(x)}</span>`);
list('product-checks',o.features,x=>`<li>${esc(x)}</li>`);
list('ingredients',o.ingredients.map((v,i)=>({...v,i})),x=>`<article class="ingredient"><span class="ingredient-num">COMPONENTE ${String(x.i+1).padStart(2,'0')}</span><h3>${esc(x.name)}</h3><p>${esc(x.detail)}</p></article>`);
list('steps',o.steps.map((v,i)=>({...v,i})),x=>`<article class="step"><span class="ingredient-num">PASO ${String(x.i+1).padStart(2,'0')}</span><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`);
list('faqs',o.faqs,x=>`<details><summary>${esc(x.q)}</summary><p>${esc(x.a)}</p></details>`);
const u=new URLSearchParams(location.search),keys=['subid','sub_id','sub1','fbclid','utm_source','utm_medium','utm_campaign','utm_content','utm_term','campaign_id','adset_id','ad_id'];const attrs={offer_key:o.key,skylead_offer_id:o.skyleadOfferId,product:o.product,price_mxn:o.price};keys.forEach(k=>{if(u.has(k))attrs[k]=u.get(k)});
window.dataLayer=window.dataLayer||[];
function event(name,meta={}){window.dataLayer.push({event:name,offer_key:o.key,offer_group:o.group,...meta});document.dispatchEvent(new CustomEvent('nutra:'+name,{detail:{...attrs,...meta}}));}
event('landing_view');
let hasOrderView=false;const form=$('#lead-form');if('IntersectionObserver'in window){const ob=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)&&!hasOrderView){hasOrderView=true;event('order_form_view');ob.disconnect()}},{threshold:.35});ob.observe(form)};
const sub=$('#tracker-subid');sub.value=attrs.subid||attrs.sub_id||'';
if(window.KTracking&&typeof window.KTracking.ready==='function'){window.KTracking.ready(function(s){if(s){sub.value=s;attrs.subid=s}})}
for(const [k,v] of Object.entries(attrs)){if(k==='subid')continue;let fld=document.createElement('input');fld.type='hidden';fld.name=k;fld.value=String(v);form.appendChild(fld)}
form.addEventListener('submit',async e=>{e.preventDefault();const status=$('#status');status.textContent='';if(!form.reportValidity())return;const data=Object.fromEntries(new FormData(form).entries());if(!/^\d{10}$/.test(String(data.phone).replace(/\D/g,''))){status.textContent='Ingresa un número mexicano de 10 dígitos.';return;}
const btn=$('#send');if(o.orderEndpoint){btn.disabled=true;status.textContent='Enviando solicitud…';try{const r=await fetch(o.orderEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});if(!r.ok)throw Error('HTTP '+r.status);status.textContent='Solicitud recibida. Te contactaremos para confirmar los detalles.';event('lead_form_success',{offer_key:o.key});form.reset()}catch(err){status.textContent='No se pudo enviar. Por favor, intenta de nuevo.';event('lead_form_error') }finally{btn.disabled=false}}
else{status.textContent='MODO DEMO: formulario validado; no se envió ninguna solicitud.';event('lead_form_demo',{offer_key:o.key});}
});
$$('[data-order-click]').forEach(a=>a.addEventListener('click',()=>event('order_cta_click')));
})();
