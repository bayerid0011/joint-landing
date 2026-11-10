const form=document.getElementById('orderForm');
form.addEventListener('submit',e=>{e.preventDefault();const s=document.getElementById('formStatus');if(form.reportValidity()){s.textContent='Formulario de demostración: todavía no se envían pedidos. Se requiere conectar el servicio de recepción de pedidos.';s.scrollIntoView({block:'nearest'});}});
document.getElementById('year').textContent=new Date().getFullYear();
const sticky=document.getElementById('stickyOrder');const observer=new IntersectionObserver(es=>{sticky.style.visibility=es[0].isIntersecting?'hidden':'visible'},{threshold:.15});observer.observe(document.getElementById('pedido'));
