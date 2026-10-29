(() => {
  'use strict';
  const o = window.OFFER;
  if (!o) return;
  const $ = id => document.getElementById(id);
  const setText = (id, value) => { const el = $(id); if(el) el.textContent = value ?? ''; };
  const setImage = (id, src, alt) => { const el = $(id); if(el){el.src=src; el.alt=alt;} };
  const money = v => `${Number(v).toLocaleString('ru-RU')} ${o.currency}`;
  const price = o.price != null ? money(o.price) : 'Стоимость уточняется';
  const hasDiscount = o.price != null && o.oldPrice != null && o.oldPrice > o.price;
  const consentStorage = false; // no cookies / storage by default
  const getParams = () => Object.fromEntries(new URLSearchParams(location.search).entries());
  const track = (event, detail={}) => {
    const data = { event, offer_id:o.id, ...detail };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
    // Meta Pixel is optional. Tracking requires actual consent + separately configured Pixel.
    if (typeof window.fbq === 'function') {
      if(event === 'lead_submit_success') window.fbq('track','Lead',{content_name:o.shortName});
      else if(event === 'cta_click') window.fbq('trackCustom','OrderCtaClick',{content_name:o.shortName});
    }
  };
  // To enable Meta Pixel in production, configure metaPixelId and the consent system.
  // Pixel is intentionally not auto-loaded on this demo without a valid consent flow.
  setText('eyebrow',o.eyebrow); setText('headline',o.headline); setText('description',o.description);
  ['painTitle','painIntro','painFootnote','introTitle','introCopy','formIntro','decisionTitle','decisionIntro'].forEach(id=>setText(id,o[id]));
  setText('chip-units',o.units);setText('chip-servings',o.servings);
  setText('dailyUse',o.dailyUse);setText('servings',o.servings);
  setText('orderName',`${o.brand} ${o.shortName}`);setText('orderUnits',o.units);
  setText('orderPrice',hasDiscount ? `${price}  ·  было ${money(o.oldPrice)}` : price);
  setText('stickyPrice',o.price != null ? price : 'Уточнить стоимость');
  setText('otherIngredients',o.otherIngredients);setText('warning',o.warning);
  setText('manufacturer',o.manufacturer);setText('disclaimer',o.disclaimer);
  setText('deliveryText',o.delivery);setText('faqUnits',`${o.units} — ${o.servings}.`);
  setText('faqUse',`${o.dailyUse}. Придерживайтесь информации на этикетке.`);
  setText('faqDelivery',`${o.delivery} ${o.payment}`);setText('year',new Date().getFullYear());
  setImage('heroProduct',o.image,`${o.brand} ${o.shortName}`);
  setImage('formulaProduct',o.image,`${o.brand} ${o.shortName}`);
  setImage('orderProduct',o.image,`${o.brand} ${o.shortName}`);
  setImage('lifestyleImage',o.lifestyleImage,'Прогулка на природе');
  document.querySelectorAll('a[data-track]').forEach(el=>el.addEventListener('click',()=>track('cta_click',{placement:el.closest('.mobile-sticky')?'sticky':'hero'})));
  $('painGrid').replaceChildren(...(o.painPoints||[]).map(item=>{
    const card=document.createElement('article');card.className='pain-card';
    const icon=document.createElement('span');icon.className='pain-icon';icon.textContent=item.icon;
    const title=document.createElement('h3');title.textContent=item.title;
    const copy=document.createElement('p');copy.textContent=item.text;card.append(icon,title,copy);return card;
  }));
  $('highlights').replaceChildren(...o.highlights.map(item=>{
    const div=document.createElement('article');div.className='highlight';
    const ico=document.createElement('span');ico.className='symbol';ico.textContent=item.symbol;
    const h=document.createElement('h3');h.textContent=item.title;
    const p=document.createElement('p');p.textContent=item.text;div.append(ico,h,p);return div;
  }));
  $('decisionGrid').replaceChildren(...(o.decisionPoints||[]).map(item=>{
    const card=document.createElement('article');card.className='decision-card';
    const num=document.createElement('span');num.className='decision-number';num.textContent=item.number;
    const title=document.createElement('h3');title.textContent=item.title;
    const copy=document.createElement('p');copy.textContent=item.text;
    card.append(num,title,copy);return card;
  }));
  $('factStack').replaceChildren(...o.facts.map(item=>{
    const div=document.createElement('div');div.className='fact';const v=document.createElement('b');v.textContent=item.value;
    const w=document.createElement('div');const h=document.createElement('strong');h.textContent=item.name;
    const note=document.createElement('small');note.textContent=item.note;w.append(h,note);div.append(v,w);return div;
  }));
  const menu=document.querySelector('.mobile-menu');const nav=document.querySelector('nav');
  menu.addEventListener('click',()=>{const isOpen=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(isOpen));});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));
  const seller=(o.seller||o.sellerEmail)?[o.seller,o.sellerEmail].filter(Boolean).join(' · '):'Демо-страница: продавец и контакты ещё не указаны.';
  setText('sellerInfo',seller);
  const privacy=$('privacyLink'); if(o.privacyUrl) privacy.href=o.privacyUrl; else privacy.textContent='условиями обработки данных (демо)';
  const terms=$('termsLink');if(o.termsUrl){terms.href=o.termsUrl;terms.textContent='Условия продажи';}
  const form=$('leadForm'),status=$('formMessage');
  form.addEventListener('submit',async e=>{
    e.preventDefault();status.className='form-message';status.textContent='';
    if(!form.reportValidity()) { track('lead_validation_error');return; }
    if(!o.privacyUrl || !o.seller || !o.orderEndpoint){
      status.classList.add('error');status.textContent='Демо-режим: заявка не отправлена. Перед запуском необходимо настроить продавца, политику конфиденциальности и обработчик заявки.';
      track('demo_form_attempt');return;
    }
    const button=form.querySelector('button[type=submit]');button.disabled=true;
    try{
      const fd=new FormData(form);const query=getParams();
      const payload={offer_id:o.id,name:String(fd.get('name')).trim(),phone:String(fd.get('phone')).trim(),consent:true,utm:query};
      const res=await fetch(o.orderEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      if(!res.ok) throw new Error(`HTTP ${res.status}`);
      status.textContent='Заявка отправлена. Спасибо!';status.classList.add('ok');track('lead_submit_success');form.reset();
    }catch(err){status.textContent='Не удалось отправить заявку. Повторите попытку позже.';status.classList.add('error');track('lead_submit_error');}
    finally{button.disabled=false;}
  });
  track('landing_view',{utm_source:getParams().utm_source||''});
})();
