const toggle=document.querySelector('.menu-toggle');
const links=document.querySelector('.nav-links');
if(toggle&&links){toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}
const current=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.nav-links a').forEach(a=>{if(a.getAttribute('href')===current)a.classList.add('active');});
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
document.querySelectorAll('form[data-mailto]').forEach(form=>{
 form.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(form);
  const subject=encodeURIComponent(form.dataset.subject||'GLOBAL FUSION enquiry');
  const body=encodeURIComponent([...data.entries()].map(([k,v])=>`${k}: ${v}`).join('\n'));
  const email=form.dataset.email;
  if(!email||email.includes('YOUR_')){alert('Please configure the business email in this form before using it.');return;}
  window.location.href=`mailto:${email}?subject=${subject}&body=${body}`;
 });
});
