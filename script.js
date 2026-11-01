(function(){
  /* ---------- helpers ---------- */
  const $=(s,r=document)=>r.querySelector(s);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money=n=>'₹'+Number(n).toLocaleString('en-IN');
  const fmt=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');

  const I={
    home:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    map:'<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
    star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    bell:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    camera:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    msg:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    chev:'<polyline points="9 18 15 12 9 6"/>',
    clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    pin:'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    card:'<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
    help:'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    out:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    minus:'<line x1="5" y1="12" x2="19" y2="12"/>',
    check:'<polyline points="20 6 9 17 4 12"/>',
    x:'<path d="M18 6L6 18M6 6l12 12"/>',
    send:'<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    wave:'<path d="M4 10v4M8 6v12M12 3v18M16 7v10M20 10v4"/>'
  };
  const ic=(n,s=20,w=1.8)=>`<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

  const ART={
    milk:'<rect x="14" y="14" width="20" height="28" rx="2" fill="#fff" stroke="#5b7fa6" stroke-width="2"/><path d="M14 14l5-7h10l5 7z" fill="#cfe0f2" stroke="#5b7fa6" stroke-width="2" stroke-linejoin="round"/><rect x="18" y="24" width="12" height="9" rx="2" fill="#7ea6d3"/>',
    onion:'<path d="M24 7c1 4 1 6 0 9" stroke="#7a9a4a" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M24 14c10 4 15 12 12 20-2 5-8 7-12 7s-10-2-12-7c-3-8 2-16 12-20z" fill="#d9a0b8" stroke="#a8607f" stroke-width="2"/><path d="M24 16c-4 7-4 17 0 24M24 16c4 7 4 17 0 24" stroke="#a8607f" stroke-width="1.5" fill="none"/>',
    egg:'<ellipse cx="17" cy="29" rx="9" ry="11" fill="#f3e3c8" stroke="#b9996a" stroke-width="2"/><ellipse cx="32" cy="27" rx="9" ry="11" fill="#f9efdc" stroke="#b9996a" stroke-width="2"/>',
    bread:'<path d="M10 22c-2-8 6-12 14-12s16 4 14 12c-1 2-2 2-2 4v12c0 2-2 4-4 4H16c-2 0-4-2-4-4V26c0-2-1-2-2-4z" fill="#e0a85c" stroke="#a9722a" stroke-width="2" stroke-linejoin="round"/><path d="M18 20v6M24 18v8M30 20v6" stroke="#a9722a" stroke-width="2" stroke-linecap="round"/>',
    mango:'<path d="M30 10c6 2 10 10 8 18-2 8-10 14-18 12-8-2-10-10-6-18 3-6 10-14 16-12z" fill="#f5b53a" stroke="#c9801c" stroke-width="2"/><path d="M30 10c2-3 6-4 8-3-1 3-4 5-8 3z" fill="#6f9b3f"/>',
    tomato:'<circle cx="24" cy="27" r="14" fill="#e5533d" stroke="#a82f1e" stroke-width="2"/><path d="M16 17c4 1 6 0 8-3 2 3 4 4 8 3-3 3-5 3-8 5-3-2-5-2-8-5z" fill="#6f9b3f"/>',
    potato:'<path d="M10 28c-1-9 8-15 17-14 9 1 13 8 11 16-2 7-10 10-18 8-6-2-9-5-10-10z" fill="#c9a06b" stroke="#8d6a3a" stroke-width="2"/><circle cx="20" cy="26" r="1.5" fill="#8d6a3a"/><circle cx="29" cy="31" r="1.5" fill="#8d6a3a"/><circle cx="30" cy="22" r="1.5" fill="#8d6a3a"/>',
    spinach:'<path d="M24 40C10 36 8 20 16 10c4 6 10 10 8 30z" fill="#4f9a4a" stroke="#2f6b2c" stroke-width="2" stroke-linejoin="round"/><path d="M24 40c14-4 16-20 8-30-4 6-10 10-8 30z" fill="#69b25f" stroke="#2f6b2c" stroke-width="2" stroke-linejoin="round"/>',
    coriander:'<path d="M24 42V22M24 28c-6-2-9-6-9-11 5 0 9 3 9 11zM24 26c6-2 9-6 9-11-5 0-9 3-9 11z" stroke="#3f7d3a" stroke-width="2.5" fill="#7bc26f" stroke-linecap="round" stroke-linejoin="round"/>',
    banana:'<path d="M10 14c2 14 12 24 28 22 2 0 2-3 0-3C26 31 18 24 17 12c0-2-7-2-7 2z" fill="#f4d03f" stroke="#b8941a" stroke-width="2" stroke-linejoin="round"/>',
    curd:'<path d="M12 18h24l-3 22H15z" fill="#fff" stroke="#6d86a1" stroke-width="2" stroke-linejoin="round"/><rect x="10" y="12" width="28" height="7" rx="2" fill="#cfe0f2" stroke="#6d86a1" stroke-width="2"/><rect x="17" y="26" width="14" height="7" rx="2" fill="#7ea6d3"/>',
    chips:'<path d="M12 10h24l-2 30H14z" fill="#f2b632" stroke="#b07d0e" stroke-width="2" stroke-linejoin="round"/><circle cx="24" cy="25" r="6" fill="#e5533d"/>',
    bottle:'<rect x="19" y="6" width="10" height="6" rx="1.5" fill="#6f9b3f"/><path d="M19 12h10l4 8v18c0 2-2 4-4 4H19c-2 0-4-2-4-4V20z" fill="#f59a2b" stroke="#b8650f" stroke-width="2" stroke-linejoin="round"/>',
    carrot:'<path d="M14 40l6-22c3-4 8-4 11-1s2 8-1 11z" fill="#f08a2c" stroke="#b5560f" stroke-width="2" stroke-linejoin="round"/><path d="M30 17c2-6 6-9 11-9-1 5-4 9-11 9z" fill="#6f9b3f"/>',
    fries:'<path d="M12 22l3 18h18l3-18z" fill="#e5533d" stroke="#a82f1e" stroke-width="2" stroke-linejoin="round"/><path d="M16 22l-1-12M22 22l-1-14M28 22l1-14M34 22l2-12" stroke="#f2b632" stroke-width="4" stroke-linecap="round"/>'
  };
  const art=(k,s=44)=>`<svg viewBox="0 0 48 48" width="${s}" height="${s}" aria-hidden="true">${ART[k]}</svg>`;

  /* ---------- data ---------- */
  const CATS=[
    {id:'fv',name:'Fruits & Vegetables',art:'carrot',tile:'--t-green'},
    {id:'dairy',name:'Dairy & Breakfast',art:'milk',tile:'--t-blue'},
    {id:'snacks',name:'Snacks & Munchies',art:'fries',tile:'--t-red'},
    {id:'bev',name:'Beverages',art:'bottle',tile:'--t-yellow'}
  ];
  const P=(id,name,qty,price,cat,a)=>({id,name,qty,price,cat,art:a||id});
  const PRODUCTS=[
    P('onion','Onion','1 kg',35,'fv'),P('mango','Mango','1 kg',189,'fv'),P('tomato','Tomato','500 g',28,'fv'),
    P('potato','Potato','1 kg',25,'fv'),P('spinach','Spinach','250 g',22,'fv'),P('banana','Banana','6 pc',42,'fv'),
    P('coriander','Coriander','100 g',15,'fv'),
    P('milk','Milk','1 L',68,'dairy'),P('eggs','Eggs','6 pc',66,'dairy','egg'),P('bread','Bread','400 g',45,'dairy'),
    P('curd','Curd','400 g',40,'dairy'),
    P('chips','Potato chips','90 g',30,'snacks'),
    P('juice','Orange juice','1 L',110,'bev','bottle'),P('coconut','Coconut water','200 ml',45,'bev','bottle')
  ];
  const byId=Object.fromEntries(PRODUCTS.map(p=>[p.id,p]));
  const catOf=id=>CATS.find(c=>c.id===id);
  const BUY_AGAIN=['milk','onion','eggs','bread'];
  const FRESH=['mango','tomato','potato','spinach','banana','coriander'];
  const ADDR=[
    {label:'Home',line:'12th Main, Anna Nagar'},
    {label:'Work',line:'Olympia Tech Park, Guindy'},
    {label:'Other',line:'4th Avenue, Besant Nagar'}
  ];
  const PLANS=[
    {id:'basic',name:'Basic',m:0,y:0,feats:['15-minute delivery','₹25 delivery fee under ₹199']},
    {id:'premium',name:'Premium',m:99,y:950,tag:'Most loved',feats:['Zero delivery fee, every order','Priority riders at peak hours','Member-only Sunday deals']},
    {id:'plus',name:'Premium+',m:179,y:1718,feats:['Everything in Premium','Shared across 4 addresses','Early access to festive deals']}
  ];
  const planOf=id=>PLANS.find(p=>p.id===id);

  const S={
    tab:'home',name:'Salim M',phone:'+91 98765 43210',addr:0,
    cart:{},cat:null,q:'',
    plan:'basic',cycle:'monthly',renews:null,
    sheet:null,
    notif:{orders:true,offers:false},
    lastId:4821,
    order:{id:4821,items:[{id:'mango',q:1},{id:'onion',q:1},{id:'potato',q:1}],fee:0,total:360,elapsed:68},
    past:[
      {id:4790,date:'28 Oct',amt:412,note:'Milk, Eggs, Bread and 4 more'},
      {id:4755,date:'22 Oct',amt:186,note:'Tomato, Spinach, Curd'}
    ]
  };

  const cartCount=()=>Object.values(S.cart).reduce((a,b)=>a+b,0);
  const cartSub=()=>Object.entries(S.cart).reduce((a,[id,q])=>a+byId[id].price*q,0);
  const feeFor=sub=>S.plan!=='basic'?0:(sub>=199?0:25);
  const initials=()=>S.name.trim().split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase()||'?';
  const orderSub=o=>o.items.reduce((a,i)=>a+byId[i.id].price*i.q,0);
  const orderCount=o=>o.items.reduce((a,i)=>a+i.q,0);

  /* ---------- controls ---------- */
  function ctl(id,label){
    const q=S.cart[id],n=esc(byId[id].name);
    if(!q) return `<button class="addbtn" data-act="add" data-id="${id}" aria-label="Add ${n}">${label}</button>`;
    return `<span class="stepper"><button data-act="dec" data-id="${id}" aria-label="Remove one ${n}">${ic('minus',14,2.4)}</button><span aria-label="${q} in cart">${q}</span><button data-act="inc" data-id="${id}" aria-label="Add one ${n}">${ic('plus',14,2.4)}</button></span>`;
  }
  function pcard(id,label,small){
    const p=byId[id],c=catOf(p.cat);
    const tile=`style="--tile:var(${c.tile})"`;
    if(small) return `<div class="pcard"><div class="ptile" ${tile}>${art(p.art,42)}</div><div><b>${p.name}</b><div class="qty">${p.qty}</div></div><span class="ctl" data-ctl="${id}" data-label="${label}">${ctl(id,label)}</span></div>`;
    return `<div class="pcard"><div class="ptile" ${tile}>${art(p.art,48)}</div><div><b>${p.name}</b><div class="qty">${p.qty}</div></div><div class="prow"><span class="price">${money(p.price)}</span><span class="ctl" data-ctl="${id}" data-label="${label}">${ctl(id,label)}</span></div></div>`;
  }

  /* ---------- screens ---------- */
  function Cats(){
    return CATS.map(c=>`<button class="cat" data-act="cat" data-cat="${c.id}" aria-pressed="${S.cat===c.id}"><span class="tile" style="--tile:var(${c.tile})">${art(c.art,40)}</span>${c.name}</button>`).join('');
  }
  function Catalog(){
    if(S.q||S.cat){
      const q=S.q.trim().toLowerCase();
      const list=PRODUCTS.filter(p=>(!S.cat||p.cat===S.cat)&&(!q||p.name.toLowerCase().includes(q)));
      const title=q?`Results for “${esc(S.q.trim())}”`:catOf(S.cat).name;
      return `<div class="sechead"><h2>${title}</h2>${S.cat?'<button class="link" data-act="clear-cat">Show all</button>':''}</div>`+
        (list.length?`<div class="grid2">${list.map(p=>pcard(p.id,'Add')).join('')}</div>`:`<div class="empty">Nothing matches that. Try onion, milk or mango.</div>`);
    }
    return `<div class="sechead"><h2>Buy again</h2></div><div class="hscroll">${BUY_AGAIN.map(id=>pcard(id,'Re-add',true)).join('')}</div>
      <div class="sechead"><h2>Picked fresh today</h2></div><div class="grid2">${FRESH.map(id=>pcard(id,'Add')).join('')}</div>`;
  }
  function Home(){
    const a=ADDR[S.addr];
    return `<header class="top">
      <button class="locpill" data-act="sheet" data-sheet="addresses" aria-label="Change delivery address"><span class="dot"></span><span class="lt"><small>Delivering in 8 min</small><b>${a.label} · ${a.line}</b></span></button>
      <button class="iconbtn" data-act="sheet" data-sheet="notifs" aria-label="Notifications">${ic('bell',18)}<i class="badge"></i></button>
    </header>
    <label class="search">${ic('search',16)}<input id="q" type="search" placeholder="Search groceries..." value="${esc(S.q)}" autocomplete="off" aria-label="Search groceries"><button type="button" class="cam" data-act="toast" data-msg="Photo search is coming soon." aria-label="Search by photo">${ic('camera',16)}</button></label>
    <section class="banner"><small>SUNDAY SPECIAL</small><h2>Groceries at sprint speed.</h2><p>Order before 3 pm and dinner shows up before 4.</p></section>
    <div class="sechead"><h2>Shop by category</h2></div>
    <div class="cats" id="cats">${Cats()}</div>
    <div id="catalog">${Catalog()}</div>`;
  }

  const route='M60 150V100H200V40H300V66';
  function MapSVG(){
    return `<svg viewBox="0 0 340 210" role="img" aria-label="Map showing the rider's route from the store to your home">
      <rect class="m-land" width="340" height="210"/>
      <g class="m-block"><rect x="8" y="8" width="44" height="26" rx="5"/><rect x="70" y="8" width="118" height="22" rx="5"/><rect x="214" y="8" width="72" height="22" rx="5"/><rect x="214" y="52" width="72" height="38" rx="5"/><rect x="70" y="48" width="118" height="40" rx="5"/><rect x="8" y="112" width="44" height="58" rx="5"/><rect x="214" y="112" width="72" height="34" rx="5"/><rect x="70" y="112" width="118" height="30" rx="5"/><rect x="312" y="8" width="22" height="190" rx="5"/></g>
      <path class="m-water" d="M-10 150 C 40 175, 90 170, 130 150 S 230 140, 350 185" fill="none" stroke-width="26" stroke-linecap="round"/>
      <g class="m-road" fill="none" stroke-linecap="round"><path d="M0 100H340"/><path d="M0 40H340"/><path d="M60 0V210"/><path d="M200 0V210"/><path d="M300 0V210"/></g>
      <path id="route" class="r-base" d="${route}" fill="none" stroke-width="3" stroke-dasharray="2 6" stroke-linecap="round" stroke-linejoin="round"/>
      <path id="routeDone" class="r-done" d="${route}" pathLength="100" fill="none" stroke-width="4" stroke-dasharray="0 100" stroke-linejoin="round"/>
      <g transform="translate(60,150)"><circle r="12" class="pin-store"/><path class="pin-glyph" d="M-4.5 -3h9l-1 8h-7z"/></g>
      <text x="76" y="154" class="m-label">Store</text>
      <g transform="translate(300,66)"><circle r="17" class="pin-ring"/><circle r="10" class="pin-home"/><path d="M-4 1l4-4 4 4v4h-8z" fill="#1d1a17"/></g>
      <text x="280" y="70" text-anchor="end" class="m-label">Home</text>
      <g id="rider" transform="translate(60,150)"><circle r="14" class="rider-ring"/><circle r="9" class="rider-dot"/><circle r="3" class="rider-core"/></g>
    </svg>`;
  }
  const RIDER_FACE=`<svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true"><circle cx="20" cy="20" r="20" fill="#ff7a00"/><circle cx="20" cy="19" r="9" fill="#ffd9b0"/><path d="M11 17c0-6 4-9 9-9s9 3 9 9c-3-3-6-4-9-4s-6 1-9 4z" fill="#1d1a17"/><circle cx="16.5" cy="20" r="1.2" fill="#1d1a17"/><circle cx="23.5" cy="20" r="1.2" fill="#1d1a17"/><path d="M17 24c2 1.6 4 1.6 6 0" stroke="#1d1a17" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>`;

  function trackState(){
    const o=S.order,rem=Math.max(0,o.total-o.elapsed);
    const stage=rem===0?2:(o.elapsed<30?0:1);
    const p=stage===0?0:stage===2?1:Math.min(1,(o.elapsed-30)/(o.total-30));
    const head=stage===0?"We're packing your order.":stage===2?'Your order has arrived.':p<.25?'Your rider just left the store.':p<.8?'Your rider is on the way.':'Your rider is almost there.';
    const kick=`ORDER #${o.id} · ${stage===0?'PACKING':stage===2?'DELIVERED':'ON ITS WAY'}`;
    return {rem,stage,p,head,kick};
  }
  function MapScreen(){
    const o=S.order,t=trackState(),n=orderCount(o);
    const lines=o.items.map(i=>{const p=byId[i.id];return `<div class="il"><span>${p.name}, ${p.qty}${i.q>1?' × '+i.q:''}</span><span>${money(p.price*i.q)}</span></div>`}).join('')+
      (o.fee?`<div class="il"><span>Delivery fee</span><span>${money(o.fee)}</span></div>`:'');
    return `<div class="kicker" id="kicker">${t.kick}</div>
    <h1 class="headline" id="headline">${t.head}</h1>
    <div class="mapcard">${MapSVG()}</div>
    <div class="eta"><small id="etalabel">${t.stage===2?'ARRIVED':'ARRIVING IN'}</small><div class="time" id="eta">${fmt(t.rem)}</div><span class="pulse"></span></div>
    <div class="segs"><span class="seg" id="seg0"></span><span class="seg" id="seg1"></span><span class="seg" id="seg2"></span></div>
    <div class="seglabels"><span id="lab0">Packed</span><span id="lab1">On the road</span><span id="lab2">At your door</span></div>
    <div class="rider">${RIDER_FACE}<div class="who"><b>Arun · Rider</b><small>Yamaha RX · TN 22 AA XXXX</small></div>
      <button class="roundbtn" data-act="toast" data-msg="Calling the rider works in the phone app." aria-label="Call rider">${ic('phone',16)}</button>
      <button class="roundbtn" data-act="toast" data-msg="Messaging the rider works in the phone app." aria-label="Message rider">${ic('msg',16)}</button></div>
    <div class="items"><div class="ih"><span>${n} item${n>1?'s':''}</span><span>${money(orderSub(o)+o.fee)}</span></div>${lines}</div>`;
  }
  function updateTrack(){
    if(S.tab!=='map'||!$('#eta')) return;
    const t=trackState();
    $('#eta').textContent=fmt(t.rem);
    $('#etalabel').textContent=t.stage===2?'ARRIVED':'ARRIVING IN';
    $('#kicker').textContent=t.kick;
    $('#headline').textContent=t.head;
    [0,1,2].forEach(i=>{
      $('#seg'+i).classList.toggle('on',i===0||t.stage>=i);
      $('#lab'+i).classList.toggle('cur',t.stage===i);
    });
    const r=$('#route');
    if(r){
      const pt=r.getPointAtLength(r.getTotalLength()*t.p);
      $('#rider').setAttribute('transform',`translate(${pt.x},${pt.y})`);
      $('#routeDone').setAttribute('stroke-dasharray',`${(t.p*100).toFixed(2)} 100`);
    }
  }

  function renewText(){
    const d=new Date();
    if(S.cycle==='yearly') d.setFullYear(d.getFullYear()+1); else d.setMonth(d.getMonth()+1);
    return d.toLocaleDateString('en-IN',S.cycle==='yearly'?{day:'numeric',month:'short',year:'numeric'}:{day:'numeric',month:'short'});
  }
  function Subscribe(){
    const y=S.cycle==='yearly';
    const cards=PLANS.map(p=>{
      const cur=S.plan===p.id,feat=p.id==='premium';
      const price=p.m===0?`<b>₹0</b> <span>/forever</span>`:`<b>${money(y?p.y:p.m)}</b> <span>/${y?'year':'month'}</span>`;
      const sub=y&&p.m?`<div class="pm">About ${money(Math.round(p.y/12))} a month, billed yearly</div>`:'';
      const label=cur?'Your plan':p.id==='basic'?'Switch to Basic':'Get '+p.name;
      const cls=feat?'btn orange':'btn';
      return `<article class="plan${feat?' feat':''}"><div class="ph"><h3>${p.name}</h3>${p.tag?`<span class="tag">${p.tag.toUpperCase()}</span>`:''}</div>
        <div class="pr">${price}</div>${sub}
        <ul>${p.feats.map(f=>`<li>${ic('check',14,2.4)}<span>${f}</span></li>`).join('')}</ul>
        <button class="${cls}" data-act="plan" data-plan="${p.id}" ${cur?'disabled':''}>${label}</button></article>`;
    }).join('');
    return `<div class="shead"><small>Special offer</small><h1>Go Unlimited</h1><p>Skip the delivery fee. Every order, on us.</p></div>
      <div class="toggle"><div role="group" aria-label="Billing period"><button data-act="cycle" data-cycle="monthly" aria-pressed="${!y}">Monthly</button><button data-act="cycle" data-cycle="yearly" aria-pressed="${y}">Yearly · Save 20%</button></div></div>${cards}`;
  }

  function row(sheet,icon,tile,title,sub,act){
    return `<button class="row" data-act="${act||'sheet'}" ${act?'':`data-sheet="${sheet}"`}><span class="ricon" style="--tile:var(${tile})">${ic(icon,16)}</span><span class="rtext"><b>${title}</b><small>${sub}</small></span>${ic('chev',16)}</button>`;
  }
  function Profile(){
    const pl=planOf(S.plan);
    const memSub=S.plan==='basic'?'Basic plan · tap to upgrade':`Active · renews ${S.renews}`;
    return `<div class="phead"><span class="avatar" aria-hidden="true">${esc(initials())}</span><div class="pn"><b>${esc(S.name)}</b><small>${esc(S.phone)}</small></div><button class="pill" data-act="sheet" data-sheet="edit">Edit</button></div>
    <div class="slabel">Account</div>
    <div class="rows">
      ${row('orders','clock','--t-yellow','Order history',"See everything you've ordered")}
      ${row('addresses','pin','--t-red','Saved addresses','Home, work and 1 more')}
      ${row('payments','card','--t-blue','Payment methods','2 cards, 1 UPI ID')}
      ${row('','star','--t-green',`${pl.name} membership`,memSub,'go-subscribe')}
    </div>
    <div class="slabel">Support</div>
    <div class="rows">
      ${row('','help','--t-blue','Help centre','Chat with support or Sprig AI','ai-open')}
      ${row('notifs','bell','--t-yellow','Notifications','Manage order and offer alerts')}
      ${row('logout','out','--t-red','Log out','See you again soon')}
    </div>`;
  }

  /* ---------- sheets ---------- */
  const frame=(title,body)=>`<div class="grab"></div><div class="sh"><h3>${title}</h3><button class="xbtn" data-act="close-sheet" aria-label="Close">${ic('x',16,2)}</button></div>${body}`;
  function sheetHTML(){
    const t=S.sheet;
    if(t==='cart'){
      const sub=cartSub(),fee=feeFor(sub),n=cartCount();
      const lines=Object.entries(S.cart).map(([id,q])=>{const p=byId[id];return `<div class="li"><span class="ptile" style="--tile:var(${catOf(p.cat).tile});width:44px;aspect-ratio:1;border-radius:10px">${art(p.art,30)}</span><span class="lt"><b>${p.name}</b><small>${p.qty} · ${money(p.price)}</small></span>${ctl(id,'Add')}<span class="amt">${money(p.price*q)}</span></div>`}).join('');
      const nudge=S.plan==='basic'&&sub<199?`<p class="note">Add ${money(199-sub)} more for free delivery, or get Premium for zero fees on every order.</p>`:'';
      return frame('Your cart',`<div class="list">${lines}</div>${nudge}
        <div class="bill"><div><span>Item total (${n})</span><span>${money(sub)}</span></div><div><span>Delivery fee</span><span>${fee?money(fee):'Free'}</span></div><div class="tot"><span>Total</span><span>${money(sub+fee)}</span></div></div>
        <p class="note">Arrives in about 8 minutes at ${ADDR[S.addr].label}. Pays with Visa ending 4412.</p>
        <button class="btn orange" data-act="place">Place order · ${money(sub+fee)}</button>`);
    }
    if(t==='orders'){
      const o=S.order,tr=trackState();
      const cur=`<div class="li"><span class="lt"><b>#${o.id} · ${tr.stage===2?'Delivered':'On its way'}</b><small>Today · ${o.items.map(i=>byId[i.id].name).join(', ')}</small></span><span class="amt">${money(orderSub(o)+o.fee)}</span></div>`;
      const past=S.past.map(p=>`<div class="li"><span class="lt"><b>#${p.id} · Delivered</b><small>${p.date} · ${esc(p.note)}</small></span><span class="amt">${money(p.amt)}</span></div>`).join('');
      return frame('Order history',`<div class="list">${cur}${past}</div>`);
    }
    if(t==='addresses'){
      return frame('Delivery address',`<div class="list" role="radiogroup">${ADDR.map((a,i)=>`<button class="li" role="radio" aria-checked="${S.addr===i}" data-act="addr" data-i="${i}"><span class="radio"></span><span class="lt"><b>${a.label}</b><small>${a.line}</small></span></button>`).join('')}</div>`);
    }
    if(t==='payments'){
      return frame('Payment methods',`<div class="list">
        <div class="li">${ic('card',18)}<span class="lt"><b>Visa ending 4412</b><small>Default</small></span></div>
        <div class="li">${ic('card',18)}<span class="lt"><b>HDFC Bank ending 0921</b><small>Expires 08/28</small></span></div>
        <div class="li">${ic('phone',18)}<span class="lt"><b>UPI</b><small>salim@upi</small></span></div></div>`);
    }
    if(t==='notifs'){
      const sw=(k,title,sub)=>`<div class="li"><span class="lt"><b>${title}</b><small>${sub}</small></span><button class="switch" role="switch" aria-checked="${S.notif[k]}" aria-label="${title}" data-act="toggle" data-k="${k}"></button></div>`;
      return frame('Notifications',`<div class="list">
        <div class="li"><span class="lt"><b>Arun picked up your order</b><small>Order #${S.order.id} · just now</small></span></div>
        <div class="li"><span class="lt"><b>Sunday special is live</b><small>Dinner before 4 if you order by 3 pm</small></span></div></div>
        <div class="slabel">Alerts</div><div class="list">${sw('orders','Order updates','Packing, rider and arrival')}${sw('offers','Offers','Weekend deals and member perks')}</div>`);
    }
    if(t==='edit'){
      return frame('Edit profile',`<form id="editform"><div class="field"><label for="ename">Name</label><input id="ename" value="${esc(S.name)}" maxlength="40" autocomplete="off"></div><div class="field"><label for="ephone">Phone</label><input id="ephone" value="${esc(S.phone)}" maxlength="20" inputmode="tel" autocomplete="off"></div><button class="btn orange" type="submit">Save</button></form>`);
    }
    if(t==='logout'){
      return frame('Log out of Sprig?',`<p class="note">You can sign back in with your phone number.</p><div class="btnrow"><button class="btn" data-act="close-sheet">Cancel</button><button class="btn dark" data-act="do-logout">Log out</button></div>`);
    }
    return '';
  }
  function renderSheet(){
    const sh=$('#sheet');
    if(!S.sheet){sh.hidden=true;$('#scrim').hidden=true;return}
    const keep=sh.scrollTop;
    sh.innerHTML=sheetHTML();sh.hidden=false;$('#scrim').hidden=false;sh.scrollTop=keep;
  }
  function openSheet(t){S.sheet=t;renderSheet();const f=$('#sheet .xbtn');if(f)f.focus()}
  function closeSheet(){S.sheet=null;renderSheet()}

  /* ---------- cart ---------- */
  function refreshCartUI(){
    document.querySelectorAll('#scroll [data-ctl]').forEach(el=>{el.innerHTML=ctl(el.dataset.ctl,el.dataset.label)});
    const n=cartCount(),bar=$('#cartbar');
    bar.hidden=n===0;
    bar.innerHTML=`<span><b>${n} item${n===1?'':'s'}</b> · ${money(cartSub())}</span><span class="vc">View cart ${ic('chev',14,2.2)}</span>`;
    if(S.sheet==='cart'){ if(n===0) closeSheet(); else renderSheet(); }
  }
  function placeOrder(){
    const items=Object.entries(S.cart).map(([id,q])=>({id,q}));
    if(!items.length) return;
    const sub=cartSub(),fee=feeFor(sub);
    const prev=S.order;
    S.past.unshift({id:prev.id,date:'Today',amt:orderSub(prev)+prev.fee,note:prev.items.map(i=>byId[i.id].name).join(', ')});
    S.order={id:++S.lastId,items,fee,total:480,elapsed:0};
    S.cart={};
    closeSheet();refreshCartUI();
    location.hash='map';
    if(S.tab==='map') render();
    toast('Order placed. Arriving in about 8 minutes.');
  }

  /* ---------- assistant ---------- */
  function aiOpen(){ $('#aiName').textContent=S.name; $('#ai').hidden=false; setAiIcon(); }
  function aiClose(){ $('#ai').hidden=true; }
  function setAiIcon(){
    const has=$('#aiq').value.trim().length>0,b=$('#aisend');
    b.className=has?'send':'';
    b.setAttribute('aria-label',has?'Send':'Voice input is not available yet');
    b.innerHTML=ic(has?'send':'wave',has?16:20,2);
  }
  function addMsg(text,who){
    const d=document.createElement('div');d.className='msg '+who;d.textContent=text;
    $('#msgs').appendChild(d);$('#aibody').classList.add('chat');
    const b=$('#aibody');b.scrollTop=b.scrollHeight;return d;
  }
  function reply(raw){
    const t=raw.toLowerCase(),o=S.order,tr=trackState();
    if(/\badd\b|\bbuy\b/.test(t)){
      const p=PRODUCTS.find(p=>t.includes(p.name.toLowerCase())||t.includes(p.id));
      if(p){S.cart[p.id]=(S.cart[p.id]||0)+1;refreshCartUI();return `Added ${p.name} (${p.qty}) to your cart. Your cart is ${money(cartSub())} now.`}
      return 'Which item should I add? Try “add milk” or “add tomato”.';
    }
    if(/rider|where|eta|arriv|how long|late|track|when/.test(t)){
      if(tr.stage===0) return `We're still packing order #${o.id}. Arun picks it up in about ${Math.max(1,30-o.elapsed)} seconds.`;
      if(tr.stage===2) return 'Your order has arrived. Arun should be at your door.';
      return `Arun is on a Yamaha RX and about ${Math.floor(tr.rem/60)} min ${tr.rem%60} sec away. ${tr.p>.8?'He is almost there.':'He left the store a little while ago.'}`;
    }
    if(/fee|charge|free delivery/.test(t)){
      return S.plan==='basic'?'On Basic, delivery is ₹25 on orders under ₹199 and free above that. Premium removes the fee on every order.':`You're on ${planOf(S.plan).name}, so delivery is free on every order.`;
    }
    if(/order|item|bill|total|ordered|cart/.test(t)){
      const lines=o.items.map(i=>`${byId[i.id].name}, ${byId[i.id].qty}${i.q>1?' × '+i.q:''}  ${money(byId[i.id].price*i.q)}`).join('\n');
      const c=cartCount();
      return `Order #${o.id}:\n${lines}\nTotal ${money(orderSub(o)+o.fee)}`+(c?`\n\nYou also have ${c} item${c>1?'s':''} in your cart.`:'');
    }
    if(/premium|plan|member|subscri|unlimited/.test(t)){
      return S.plan==='basic'?'You are on Basic. Premium is ₹99 a month and removes the delivery fee. Open the Subscribe tab to compare plans.':`You are on ${planOf(S.plan).name}, renewing ${S.renews}.`;
    }
    if(/address|deliver(ing)? to/.test(t)){const a=ADDR[S.addr];return `Delivering to ${a.label}: ${a.line}. You can change it from the pin at the top of Home.`}
    if(/refund|wrong|missing|damag|complain|support|problem/.test(t)) return 'That sounds frustrating. Tell me which item was affected and I will flag it for the support team.';
    if(/^(hi|hello|hey)\b/.test(t)) return `Hi ${S.name.split(' ')[0]}! Ask me about your rider, your order, delivery fees or your plan.`;
    if(/thank/.test(t)) return 'Anytime.';
    return 'I can help with your rider, your order, your cart, delivery fees and plans. Try “Where is my rider?”';
  }
  function send(text){
    text=text.trim();if(!text) return;
    addMsg(text,'me');
    $('#aiq').value='';setAiIcon();
    const d=addMsg('','bot');d.innerHTML='<span class="typing"><i></i><i></i><i></i></span>';
    setTimeout(()=>{d.textContent=reply(text);const b=$('#aibody');b.scrollTop=b.scrollHeight},600);
  }

  /* ---------- toast ---------- */
  let tt;
  function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>el.classList.remove('show'),2600)}

  /* ---------- shell ---------- */
  const TABS=[['home','Home','home'],['map','Map','map'],['subscribe','Subscribe','star'],['profile','Profile','user']];
  function renderTabs(){
    $('#tabbar').innerHTML=TABS.map(([id,l,i])=>`<button class="tab" data-act="tab" data-tab="${id}" ${S.tab===id?'aria-current="page"':''}>${ic(i,22,S.tab===id?2.2:1.8)}${l}</button>`).join('');
  }
  function render(){
    const sc=$('#scroll');
    sc.innerHTML=({home:Home,map:MapScreen,subscribe:Subscribe,profile:Profile})[S.tab]();
    renderTabs();updateTrack();
  }
  function tabFromHash(){const h=location.hash.slice(1);return TABS.some(t=>t[0]===h)?h:'home'}

  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-act]');if(!b) return;
    const d=b.dataset;
    switch(d.act){
      case 'tab': location.hash=d.tab; break;
      case 'go-subscribe': location.hash='subscribe'; break;
      case 'sheet': openSheet(d.sheet); break;
      case 'close-sheet': closeSheet(); break;
      case 'add': S.cart[d.id]=1; refreshCartUI(); break;
      case 'inc': S.cart[d.id]=(S.cart[d.id]||0)+1; refreshCartUI(); break;
      case 'dec': if(--S.cart[d.id]<=0) delete S.cart[d.id]; refreshCartUI(); break;
      case 'cat': S.cat=S.cat===d.cat?null:d.cat; S.q=''; {const q=$('#q');if(q)q.value=''} $('#cats').innerHTML=Cats(); $('#catalog').innerHTML=Catalog(); break;
      case 'clear-cat': S.cat=null; $('#cats').innerHTML=Cats(); $('#catalog').innerHTML=Catalog(); break;
      case 'ai-open': aiOpen(); break;
      case 'ai-close': aiClose(); break;
      case 'chip': send(d.text); break;
      case 'cycle': S.cycle=d.cycle; render(); break;
      case 'plan': {
        S.plan=d.plan; S.renews=d.plan==='basic'?null:renewText();
        render(); refreshCartUI();
        toast(d.plan==='basic'?"You're back on Basic.":`You're on ${planOf(d.plan).name}. Renews ${S.renews}.`);
        break;
      }
      case 'addr': S.addr=+d.i; closeSheet(); if(S.tab==='home') render(); toast(`Delivering to ${ADDR[S.addr].label}.`); break;
      case 'toggle': S.notif[d.k]=!S.notif[d.k]; renderSheet(); break;
      case 'place': placeOrder(); break;
      case 'do-logout': closeSheet(); toast('This is a preview, so you stay signed in.'); break;
      case 'toast': toast(d.msg); break;
    }
  });
  document.addEventListener('input',e=>{
    if(e.target.id==='q'){
      S.q=e.target.value;S.cat=null;
      $('#cats').innerHTML=Cats();$('#catalog').innerHTML=Catalog();
    }
    if(e.target.id==='aiq') setAiIcon();
  });
  document.addEventListener('submit',e=>{
    e.preventDefault();
    if(e.target.id==='aiform') send($('#aiq').value);
    if(e.target.id==='editform'){
      const n=$('#ename').value.trim(),p=$('#ephone').value.trim();
      if(!n){toast('Enter a name to save.');return}
      S.name=n;if(p)S.phone=p;closeSheet();render();toast('Profile saved.');
    }
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){ if(S.sheet) closeSheet(); else if(!$('#ai').hidden) aiClose(); }
  });
  window.addEventListener('hashchange',()=>{
    S.tab=tabFromHash();aiClose();if(S.sheet)closeSheet();
    render();$('#scroll').scrollTop=0;
  });

  setInterval(()=>{
    const o=S.order;
    if(o.elapsed<o.total){o.elapsed++;updateTrack()}
  },1000);

  S.tab=tabFromHash();
  render();refreshCartUI();setAiIcon();
})();
