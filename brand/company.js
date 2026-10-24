/* Small additions around the retained Framer components. No animation engine replacement. */
(() => {
  const sources = [
    ['美时达 MEISDA','https://ztu3600-hub.github.io/meisda-showcase/','meisda'],
    ['全泽广告','https://ztu3600-hub.github.io/quanze-showcase/','quanze'],
    ['三秦传媒','https://ztu3600-hub.github.io/sanqin-showcase/','sanqin'],
    ['Secrets 电商','https://ztu3600-hub.github.io/secrets-showcase/','secrets']
  ];
  let galleryCase='meisda';
  document.addEventListener('click',event=>{
    const card=event.target.closest('[data-framer-name="Work Item Frame"]');
    if(!card)return;
    const index=[...document.querySelectorAll('[data-framer-name="Work Item Frame"]')].indexOf(card);
    galleryCase=['meisda','quanze','sanqin','secrets','secrets'][index]||galleryCase;
  },true);
  const projectBase=[
    '美时达 MEISDA · 产品展示网站','美时达 MEISDA','产品展示 / 品牌适配','组织产品信息与浏览路径','品牌适配 · 响应式 · 静态部署',
    '围绕商用冷柜产品展示场景，组织品牌介绍、产品分类与详情信息，便于采购客户浏览产品并了解定制能力。',
    '基于既有模板完成品牌内容适配、产品列表与详情页实施、响应式页面整合及静态部署。',
    '沿用模板的留白、网格和动效节奏，以产品图和分类导航建立浏览层级，保持多页面视觉一致。',
    '围绕企业的业务内容与品牌表达组织页面，梳理分类、产品列表与详情之间的访问路径。',
    '以产品图与分类导航组织内容，实施多页面结构和响应式适配，保留模板的视觉与交互节奏。',
    '首页、产品列表、代表产品详情及在线演示站；可浏览页面与本地截图素材已交付。',
    '交付记录：2025.02.21。此项目为已完成的品牌适配展示版，项目已完成交付。'
  ];
  const projects={meisda:projectBase,
    quanze:['全泽广告 · 营销服务网站','全泽广告','整合营销 / 广告服务','组织服务介绍与案例浏览','品牌适配 · 案例页面 · 部署',
    '面向营销服务的展示场景，以服务介绍和案例浏览呈现业务内容，建立从品牌认知到项目详情的阅读路径。',
    '模板内容替换、公开品牌素材整合、案例列表与内页组织、动效保留、跨尺寸适配及部署。',
    '保留原模板的图文比例与交互结构，以案例大图和分层文字承载服务信息，保持导航及返回路径连贯。',
    '根据服务介绍与案例展示的信息关系组织页面，从品牌认知衔接到项目详情。',
    '保留模板图文比例和交互结构，实施跨尺寸适配与多页面导航。',
    '品牌首页、案例列表与代表案例内页，以及可访问的 GitHub Pages 演示站。',
    '交付记录：2025.07.18。模板复刻与全泽公开品牌内容适配展示，项目已完成交付。'],
    sanqin:['三秦传媒 · 品牌影像网站','三秦传媒','影视制作 / 品牌传播','组织影像作品与案例信息','品牌适配 · 项目详情 · 视频整合',
    '围绕影像公司的作品展示场景，以动态视觉与项目页组织服务及案例信息。',
    '品牌内容适配、项目列表及案例页实施、视频素材整合、响应式适配和部署。',
    '保留模板大图、滚动节奏与动态交互，以统一的项目结构承载不同案例。',
    '按服务与项目内容梳理结构，保持作品浏览与案例阅读之间的访问路径。',
    '整合品牌、影像与项目内容，实施响应式页面与动态交互。',
    '首页、项目列表、代表案例页及在线展示站；已提供桌面页面截图。',
    '交付记录：2026.03.26。公开素材与既有模板适配展示，项目已完成交付。'],
    secrets:['Secrets · 草本电商与技术 SEO','Secrets','草本补充剂 / 跨境电商','商品展示与检索内容组织','电商前端 · 搜索 · 技术 SEO',
    '草本电商前端展示与技术 SEO 案例，覆盖分类、商品和检索场景；网站前端与技术 SEO 已交付。',
    '公开前端复刻、商品详情、搜索及本地购物车演示、响应式适配与部署；不含真实支付及后台。',
    '保留原页面标题、描述与语义标签，适配移动端布局与公开页面路径。',
    '产品词承接商品介绍，植物对比与海藻主题词承接知识内容；按产品与信息检索意图组织页面。',
    '梳理站点地图、索引提交及 canonical 策略，实施原创关键词布局与内容优化。',
    '网站前端展示版、商品详情、搜索与本地购物车演示，以及原资料中的历史关键词记录。',
    '交付记录：2026.10.20。原资料记载 pine pollen tincture、lambs ear vs mullein、mullein vs lambs ear、kelp and seaweed 曾位于美国 Google 第1名；属于历史记录，网站前端与技术 SEO 已交付，不构成当前排名承诺。']
  };
  const patchProject=()=>{
    if((location.pathname.replace(/\/$/,'')||'/')!=='/project')return;
    const key=new URLSearchParams(location.search).get('case')||'meisda';const data=projects[key]||projectBase;
    const all=Object.values(projects);const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())){
      if(node.parentElement.closest('script,style,.sp-project-links'))continue;
      const txt=node.nodeValue.trim();const index=all.map(v=>v.indexOf(txt)).find(i=>i>=0);
      if(index!==undefined&&txt!==data[index])node.nodeValue=node.nodeValue.replace(txt,data[index]);
    }
    const sizes=[['',[540,443,658,1125,538,538,1125,658]],['-tablet',[876,811,876,1345,1345,1345,1345,876]],['-mobile',[1550,823,1550,1371,1371,1371,1371,1550]]];
    for(const [i,image] of [...document.querySelectorAll('img:not(.sp-contact img):not(.sp-seo-results img):not(#sp-wechat-dialog img)')].entries()){
      const match=image.getAttribute('src')?.match(/\/(?:real|art)\/\w+-(\d)(?:-tablet|-mobile|-wide|-square)?\.webp/);
      const avatar=image.closest('[data-framer-name="Avatar"]');
      const slot=Number(match?.[1]??image.dataset.spSlot??i);if(!avatar)image.dataset.spSlot=slot;
      const ratio=image.clientWidth/Math.max(1,image.clientHeight);
      const variant=sizes.reduce((best,v)=>Math.abs(Math.log((1600/v[1][slot])/ratio))<Math.abs(Math.log((1600/best[1][slot])/ratio))?v:best,sizes[0])[0];
      const art=[0,2,3,5,7].includes(slot);
      const sceneVariant=slot===3?'square':ratio<1.8?'mobile':'wide';
      const logos={meisda:'meisda-logo.png',quanze:'quanze-logo.svg',sanqin:'sanqin-logo.webp',secrets:'secrets-logo.png'};
      const target=avatar?'/brand/updates/company-logo-transparent.png':slot===1?'/brand/updates/'+logos[key]:art?`/brand/art/${key}-${slot}-${sceneVariant}.webp`:`/brand/real/${key}-${slot}${variant}.webp`;
      image.classList.toggle('sp-project-logo',slot===1&&!avatar);
      if(image.getAttribute('src')!==target)image.src=target;
      image.removeAttribute('srcset');image.alt=avatar?'尚品优品公司标志':slot===1?data[1]+' 品牌标志':data[0]+(art?'，基于真实页面制作的项目展示场景':'，已交付项目的真实页面截图');
    }
    const title=data[0]+'｜尚品优品科技有限公司';if(document.title!==title)document.title=title;
  };
  const contacts = () => {
    const title = [...document.querySelectorAll('h1,h2,h3')].find(e => e.textContent.trim() === '联系尚品优品');
    if (title && !document.querySelector('.sp-contact')) {
      const el=document.createElement('div');el.className='sp-contact';
      el.innerHTML='<img src="/brand/wechat.jpg" alt="微信联系二维码"><div>商务联系 · 朱先生<br><a href="tel:16602031088">16602031088</a><br><a href="mailto:Shijizhu@qq.com">Shijizhu@qq.com</a></div>';
      title.parentElement.append(el);
    }
    const heading=[...document.querySelectorAll('h1,h2,h3,p')].find(e=>e.textContent.trim()==='作品说明');
    if(heading&&!document.querySelector('.sp-project-links')){
      const el=document.createElement('nav');el.className='sp-project-links';el.setAttribute('aria-label','原资料中的案例展示站');
      el.innerHTML=sources.map(([title,url,key])=>`<a href="/project?case=${key}">${title}</a>`).join('');
      const key=new URLSearchParams(location.search).get('case')||'meisda';const demo=sources.find(s=>s[2]===key)||sources[0];
      el.innerHTML+=`<a href="${demo[1]}" target="_blank" rel="noopener">访问此案例演示站 ↗</a><a href="/#work-browser">返回作品列表</a>`;
      (heading.closest('[data-framer-name="Heading"]')||heading.parentElement).append(el);
    }
    // A real company did not supply social profiles. Replace template placeholders with useful contact paths.
    for(const a of document.querySelectorAll('a')){
      const href=a.getAttribute('href')||'';
      if(/framerverse|calendly|buy\/5e135|twitter\.com|linkedin\.com|instagram\.com|facebook\.com|www\.x\.com/.test(href)){
        a.setAttribute('href','mailto:Shijizhu@qq.com');a.removeAttribute('target');
        a.setAttribute('aria-label','邮件联系尚品优品');
      }
      const label=a.textContent.trim();if(label==='隐私说明'&&href!=='/privacy-policy')a.setAttribute('href','/privacy-policy');
      if(label==='Cookie 说明'&&href!=='/cookie-policy')a.setAttribute('href','/cookie-policy');
      const caseCard=a.closest('[data-framer-name="Case Item Frame"]')?.parentElement;
      const cardTitle=caseCard?.querySelector('h3')?.textContent.trim();
      const caseKey=sources.find(([title])=>title===cardTitle)?.[2];
      if(caseKey||label==='查看案例'){
        const target='/project?case='+(caseKey||galleryCase);
        if(a.getAttribute('href')!==target)a.setAttribute('href',target);
        if(!a.dataset.spCase){a.dataset.spCase='true';a.addEventListener('click',e=>{if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();e.stopImmediatePropagation();location.assign(a.href);},true);}
      }
    }
    for(const meta of document.querySelectorAll('[data-framer-name="Meta"]')){
      if(/企业客户直签|营销公司合作|实施范围/.test(meta.textContent)){
        const last=meta.lastElementChild;if(last&&/美时达 MEISDA|全泽广告|三秦传媒|技术 SEO/.test(last.textContent)&&last.textContent!=='尚品优品 · 服务说明')(last.querySelector('p')||last).textContent='尚品优品 · 服务说明';
      }
    }
    const walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
    while((n=walk.nextNode())){
      if(n.parentElement.closest('script,style'))continue;
      if(n.nodeValue.includes('Copyright ©2021 INKD'))n.nodeValue=n.nodeValue.replace('Copyright ©2021 INKD','© 2026 尚品优品科技有限公司');
      if(n.nodeValue==='Get started…')n.nodeValue='聊聊你的项目';
      if(n.nodeValue==='全部指南'&&document.querySelector('input')===null&&(location.pathname.replace(/\/$/,'')||'/')==='/')n.nodeValue='重新填写';
    }
    patchProject();
    window.spEnhance?.();
  };
  let queued=false;
  const schedule=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;contacts();});};
  new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true});
  window.addEventListener('resize',schedule);
  document.addEventListener('load',schedule,true);
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',schedule):schedule();
})();
