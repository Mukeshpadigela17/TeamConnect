import React, { useMemo, useState } from 'react';
import { Hash, MessageCircle, Users, Clock3, Search, Plus, Send, Paperclip, MoreHorizontal, Bell, Settings, ChevronDown, CheckCheck, Menu, X, BriefcaseBusiness } from 'lucide-react';

const people = [
  {id:'sarah',name:'Sarah Chen',role:'Product Designer',initials:'SC',color:'#e8b4a2',online:true},
  {id:'alex',name:'Alex Morgan',role:'Engineering Lead',initials:'AM',color:'#a9b9e8',online:true},
  {id:'priya',name:'Priya Sharma',role:'Frontend Developer',initials:'PS',color:'#c8b2e8',online:false},
  {id:'james',name:'James Wilson',role:'Project Manager',initials:'JW',color:'#a8d3c2',online:true},
  {id:'maria',name:'Maria Garcia',role:'QA Engineer',initials:'MG',color:'#e6ce9b',online:false},
];
const initialChannels = [
  {id:'general',name:'general',kind:'project',desc:'Company-wide updates'},
  {id:'website-redesign',name:'website-redesign',kind:'project',desc:'Website redesign project'},
  {id:'mobile-app',name:'mobile-app',kind:'project',desc:'Mobile application team'},
  {id:'handover',name:'shift-handover',kind:'handover',desc:'Shift updates and pending tasks'},
];
const seed = {
 general:[{id:1,from:'James Wilson',initials:'JW',time:'09:12',text:'Good morning, team! Please share your priorities for today.',mine:false},{id:2,from:'You',initials:'YO',time:'09:18',text:'I’m working on the TeamConnect collaboration dashboard.',mine:true}],
 'website-redesign':[{id:3,from:'Sarah Chen',initials:'SC',time:'10:05',text:'I uploaded the updated homepage designs. Please review the navigation and responsive states.',mine:false},{id:4,from:'Alex Morgan',initials:'AM',time:'10:22',text:'Looks good. I’ll check the component implementation this afternoon.',mine:false}],
 'mobile-app':[{id:5,from:'Priya Sharma',initials:'PS',time:'11:02',text:'API integration is ready for QA. Please test the sign-in flow.',mine:false}],
 handover:[{id:6,from:'James Wilson',initials:'JW',time:'08:55',text:'Morning handover: deployment completed. Pending: verify production logs and close ticket TC-204.',mine:false}],
 sarah:[{id:7,from:'Sarah Chen',initials:'SC',time:'Yesterday',text:'Can you share the latest dashboard screenshot when ready?',mine:false}],
 alex:[],priya:[],james:[],maria:[]
};
function Avatar({initials,color,online,size='md'}){return <span className={`avatar ${size}`} style={{background:color}}>{initials}{online&&<i/>}</span>}
export default function App(){
 const [active,setActive]=useState('general'); const [messages,setMessages]=useState(seed); const [draft,setDraft]=useState(''); const [query,setQuery]=useState(''); const [mobile,setMobile]=useState(false);
 const [channelList,setChannelList]=useState(initialChannels); const [notice,setNotice]=useState('Demo mode: connect Nexconn credentials to enable live messaging.');
 const activePerson=people.find(p=>p.id===active); const channel=channelList.find(c=>c.id===active);
 const title=channel?`# ${channel.name}`:activePerson?.name||'general';
 const current=messages[active]||[];
 const filteredPeople=useMemo(()=>people.filter(p=>p.name.toLowerCase().includes(query.toLowerCase())),[query]);
 function send(){if(!draft.trim())return;const now=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});setMessages(m=>({...m,[active]:[...(m[active]||[]),{id:Date.now(),from:'You',initials:'YO',time:now,text:draft.trim(),mine:true}]}));setDraft('');}
 function select(id){setActive(id);setMobile(false);}
 return <div className="app-shell">
  <aside className={`sidebar ${mobile?'open':''}`}>
   <div className="brand"><div className="brand-mark"><BriefcaseBusiness size={19}/></div><div><b>TeamConnect</b><small>WORKSPACE</small></div><button className="icon-btn close-mobile" onClick={()=>setMobile(false)}><X/></button></div>
   <div className="workspace"><div className="workspace-logo">AC</div><div><b>Acme Corporation</b><small>Free workspace</small></div><ChevronDown size={16}/></div>
   <div className="nav-label">WORKSPACE</div>
   <button className="nav-item active"><MessageCircle size={17}/> Messages</button>
   <button className="nav-item"><Users size={17}/> Team directory</button>
   <div className="section-head"><span>PROJECT CHANNELS</span><button className="tiny-btn" title="Add channel" onClick={()=>{const n=prompt('New channel name');if(n){const id=n.toLowerCase().replace(/[^a-z0-9]+/g,'-');setChannelList(v=>[...v,{id,name:id,kind:'project',desc:'New project channel'}]);setActive(id)}}}><Plus size={15}/></button></div>
   {channelList.filter(c=>c.kind==='project').map(c=><button key={c.id} className={`channel ${active===c.id?'selected':''}`} onClick={()=>select(c.id)}><Hash size={16}/>{c.name}</button>)}
   <div className="section-head handover-head"><span>OPERATIONS</span></div>
   {channelList.filter(c=>c.kind==='handover').map(c=><button key={c.id} className={`channel ${active===c.id?'selected':''}`} onClick={()=>select(c.id)}><Clock3 size={16}/>{c.name}</button>)}
   <div className="section-head people-head"><span>DIRECT MESSAGES</span><button className="tiny-btn"><Plus size={15}/></button></div>
   {filteredPeople.map(p=><button key={p.id} className={`person-link ${active===p.id?'selected':''}`} onClick={()=>select(p.id)}><Avatar {...p} size="sm"/><span>{p.name}</span><i className={p.online?'online-dot':'offline-dot'}/></button>)}
   <div className="profile"><Avatar initials="YO" color="#7c8fe8"/><div><b>Your Account</b><small>Team member</small></div><MoreHorizontal size={18}/></div>
  </aside>
  <main className="main">
   <header className="topbar"><button className="icon-btn mobile-menu" onClick={()=>setMobile(true)}><Menu/></button><div className="breadcrumb">Workspace <span>/</span> <b>{title}</b></div><div className="top-actions"><div className="search"><Search size={16}/><input placeholder="Search messages" value={query} onChange={e=>setQuery(e.target.value)}/><kbd>⌘ K</kbd></div><button className="icon-btn"><Bell size={18}/></button><button className="icon-btn"><Settings size={18}/></button></div></header>
   <div className="channel-heading"><div><h1>{title}</h1><p>{channel?.desc||activePerson?.role||'Private conversation'}</p></div><div className="heading-actions"><span className="member-count"><Users size={16}/> {channel?'12':'2'}</span><button className="outline-btn"><MoreHorizontal size={17}/> Details</button></div></div>
   <div className="notice"><span className="notice-dot"/> {notice}</div>
   <section className="messages">
    {current.map(m=><article className={`message ${m.mine?'mine':''}`} key={m.id}><Avatar initials={m.initials} color={m.mine?'#8c9bed':(people.find(p=>p.name===m.from)?.color||'#b6c6d8')}/><div className="message-body"><div className="message-meta"><b>{m.from}</b><time>{m.time}</time>{m.mine&&<CheckCheck size={14} className="read-icon"/>}</div><p>{m.text}</p></div></article>)}
    {current.length===0&&<div className="empty"><div className="empty-icon"><MessageCircle size={24}/></div><h3>Start the conversation</h3><p>Send the first message to {activePerson?.name||`#${channel?.name||active}`}.</p></div>}
   </section>
   <div className="composer-wrap"><div className="composer"><button className="icon-btn attach"><Paperclip size={18}/></button><textarea rows="1" placeholder={`Message ${channel?'#'+channel.name:activePerson?.name||'team'}…`} value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}}/><button className="send-btn" onClick={send} disabled={!draft.trim()}><Send size={17}/></button></div><div className="composer-hint">Enter to send · Shift + Enter for a new line</div></div>
  </main>
 </div>
}
