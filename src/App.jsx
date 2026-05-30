import { useState, useEffect, useRef } from "react";

const C = {
  red: "#CC0000", bg: "#0F0F0F", surface: "#1A1A2E", card: "#16213E",
  text: "#F1F1F1", muted: "#AAAAAA", border: "#333355", tag: "#0F3460", tagText: "#A8D8EA",
  green: "#1DB954", yellow: "#FFD700",
};

const ALL_VIDEOS = [
  { id:1, title:"Data Structures & Algorithms — Full Course 2024", channel:"CS Academy", views:"2.4M", viewsNum:2400000, time:"3 days ago", duration:"4:32:10", durSec:16330, thumb:"https://picsum.photos/seed/ds1/320/180", avatar:"https://picsum.photos/seed/av1/40/40", tags:["DSA","Python"], likes:48000, subscribers:"890K", desc:"Complete guide to data structures and algorithms from scratch to advanced — arrays, linked lists, trees, graphs, DP. Perfect for placements and FAANG interviews.", rating:4.9, comments:[{id:1,user:"Rahul K",text:"Best DSA course ever! Got placed at Google 🎉",time:"2 days ago",likes:312},{id:2,user:"Priya S",text:"Chapter timestamps in description are super helpful",time:"1 day ago",likes:89},{id:3,user:"Arjun M",text:"Please make a system design series next!",time:"5 hours ago",likes:44}] },
  { id:2, title:"Python for Beginners — Zero to Hero Complete Bootcamp", channel:"CodeWithPython", views:"6.2M", viewsNum:6200000, time:"2 days ago", duration:"5:10:00", durSec:18600, thumb:"https://picsum.photos/seed/py2/320/180", avatar:"https://picsum.photos/seed/av2/40/40", tags:["Python","Beginner"], likes:180000, subscribers:"3.4M", desc:"Learn Python from scratch: variables, loops, functions, OOP, file handling, and projects. Build 10 real-world programs by the end.", rating:4.9, comments:[{id:1,user:"Sneha R",text:"I wrote my first Python script after this! 🐍",time:"1 day ago",likes:540},{id:2,user:"Vikram T",text:"OOP section at 3:20 is the best explanation I've found",time:"6 hours ago",likes:210}] },
  { id:3, title:"JavaScript & ES6+ Complete Course — DOM, APIs, Async", channel:"DevSpark", views:"4.1M", viewsNum:4100000, time:"5 days ago", duration:"6:45:00", durSec:24300, thumb:"https://picsum.photos/seed/js3/320/180", avatar:"https://picsum.photos/seed/av3/40/40", tags:["JavaScript","Web Dev"], likes:112000, subscribers:"3.2M", desc:"Master modern JavaScript: closures, promises, async/await, fetch API, DOM manipulation, and ES6+ features. Includes mini-projects.", rating:4.8, comments:[{id:1,user:"Ananya B",text:"Finally understand Promises! This was gold",time:"4 days ago",likes:430},{id:2,user:"Dev P",text:"The event loop explanation blew my mind",time:"2 days ago",likes:215}] },
  { id:4, title:"Machine Learning A–Z: Python, Sklearn & TensorFlow", channel:"AIVault", views:"3.9M", viewsNum:3900000, time:"1 week ago", duration:"8:45:00", durSec:31500, thumb:"https://picsum.photos/seed/ml4/320/180", avatar:"https://picsum.photos/seed/av4/40/40", tags:["AI/ML","Python"], likes:95000, subscribers:"1.8M", desc:"Learn ML from first principles: linear regression, classification, decision trees, neural networks, CNNs, and model deployment with Flask.", rating:4.7, comments:[{id:1,user:"Rohan V",text:"Built my first ML model after this. Thank you!",time:"4 days ago",likes:178},{id:2,user:"Tanya M",text:"CNN section at 6:30 is incredibly clear",time:"2 days ago",likes:92}] },
  { id:5, title:"React JS Full Course 2024 — Hooks, Redux, Next.js", channel:"DevSpark", views:"5.5M", viewsNum:5500000, time:"3 days ago", duration:"9:20:00", durSec:33600, thumb:"https://picsum.photos/seed/react5/320/180", avatar:"https://picsum.photos/seed/av3/40/40", tags:["React","Web Dev"], likes:160000, subscribers:"3.2M", desc:"Master React from the ground up: functional components, hooks (useState, useEffect, useContext), Redux Toolkit, and Next.js App Router.", rating:4.9, comments:[{id:1,user:"Ayush N",text:"Built a full e-commerce app after this!",time:"2 days ago",likes:743},{id:2,user:"Ishaan D",text:"Redux section is the clearest I've seen anywhere",time:"1 day ago",likes:312}] },
  { id:6, title:"System Design Interview — Complete Guide for SDE Roles", channel:"TechInterviewPro", views:"2.8M", viewsNum:2800000, time:"4 days ago", duration:"5:00:00", durSec:18000, thumb:"https://picsum.photos/seed/sd6/320/180", avatar:"https://picsum.photos/seed/av6/40/40", tags:["System Design","Interview"], likes:88000, subscribers:"1.1M", desc:"Learn to design scalable systems: URL shortener, Twitter feed, WhatsApp, Netflix CDN. Covers load balancing, caching, databases, microservices.", rating:4.8, comments:[{id:1,user:"Karan J",text:"Cracked my Flipkart interview after this!",time:"3 days ago",likes:890},{id:2,user:"Simran L",text:"The database sharding explanation is top notch",time:"1 day ago",likes:320}] },
  { id:7, title:"C++ STL — Vectors, Maps, Sets, Sorting & More", channel:"CppMaster", views:"1.8M", viewsNum:1800000, time:"6 days ago", duration:"3:15:00", durSec:11700, thumb:"https://picsum.photos/seed/cpp7/320/180", avatar:"https://picsum.photos/seed/av7/40/40", tags:["C++","DSA"], likes:62000, subscribers:"720K", desc:"Deep dive into the C++ Standard Template Library: all containers, iterators, algorithms, lambda functions, and competitive programming tricks.", rating:4.7, comments:[{id:1,user:"Pooja T",text:"Finally understand map vs unordered_map!",time:"5 days ago",likes:180},{id:2,user:"Neel S",text:"This made competitive coding so much easier",time:"3 days ago",likes:95}] },
  { id:8, title:"SQL & Databases Complete Course — MySQL, PostgreSQL", channel:"DBWizard", views:"2.2M", viewsNum:2200000, time:"1 week ago", duration:"5:30:00", durSec:19800, thumb:"https://picsum.photos/seed/sql8/320/180", avatar:"https://picsum.photos/seed/av8/40/40", tags:["SQL","Backend"], likes:74000, subscribers:"950K", desc:"Master SQL from basics to advanced: JOINs, subqueries, stored procedures, triggers, indexing, and performance optimization. Real project included.", rating:4.8, comments:[{id:1,user:"Harsh P",text:"SQL joins finally clicked after watching this twice",time:"6 days ago",likes:340},{id:2,user:"Riya K",text:"Used this to pass my college DBMS viva!",time:"2 days ago",likes:128}] },
  { id:9, title:"Git & GitHub for Developers — Branches, PRs, CI/CD", channel:"DevOpsHub", views:"1.4M", viewsNum:1400000, time:"2 days ago", duration:"2:40:00", durSec:9600, thumb:"https://picsum.photos/seed/git9/320/180", avatar:"https://picsum.photos/seed/av9/40/40", tags:["Git","DevOps"], likes:51000, subscribers:"680K", desc:"Everything about Git you actually need: branching strategies, rebasing, merge conflicts, pull requests, GitHub Actions, and deploying with CI/CD.", rating:4.6, comments:[{id:1,user:"Neha G",text:"No more 'git push -f' disasters 😂",time:"1 day ago",likes:410},{id:2,user:"Sam D",text:"GitHub Actions section saved my internship project",time:"12 hours ago",likes:88}] },
  { id:10, title:"Operating Systems — Processes, Threads, Memory & Scheduling", channel:"CS Academy", views:"1.1M", viewsNum:1100000, time:"10 days ago", duration:"4:10:00", durSec:15000, thumb:"https://picsum.photos/seed/os10/320/180", avatar:"https://picsum.photos/seed/av1/40/40", tags:["CS Fundamentals","Interview"], likes:39000, subscribers:"890K", desc:"OS concepts for placements: process scheduling, deadlocks, virtual memory, paging, segmentation, and file systems. Essential for GATE and SDE interviews.", rating:4.7, comments:[{id:1,user:"Tanmay R",text:"Best OS lecture for GATE & placements both!",time:"8 days ago",likes:220},{id:2,user:"Preet S",text:"Deadlock examples are really intuitive here",time:"5 days ago",likes:77}] },
  { id:11, title:"Node.js & Express.js — Build REST APIs from Scratch", channel:"BackendBros", views:"2.6M", viewsNum:2600000, time:"4 days ago", duration:"4:50:00", durSec:17400, thumb:"https://picsum.photos/seed/node11/320/180", avatar:"https://picsum.photos/seed/av11/40/40", tags:["Node.js","Backend"], likes:82000, subscribers:"1.2M", desc:"Full backend with Node.js: event loop, Express routing, middleware, JWT auth, MongoDB integration, and deploying your REST API to Railway.", rating:4.8, comments:[{id:1,user:"Ritika B",text:"Built my first backend API and deployed it!",time:"3 days ago",likes:295},{id:2,user:"Luv M",text:"JWT auth explanation at 3:10 is perfect",time:"1 day ago",likes:143}] },
  { id:12, title:"Competitive Programming — Codeforces & LeetCode Patterns", channel:"AlgoArena", views:"1.5M", viewsNum:1500000, time:"2 weeks ago", duration:"6:00:00", durSec:21600, thumb:"https://picsum.photos/seed/cp12/320/180", avatar:"https://picsum.photos/seed/av12/40/40", tags:["DSA","Competitive"], likes:67000, subscribers:"830K", desc:"Crack competitive programming: two pointers, sliding window, binary search, segment trees, graph algorithms (BFS/DFS/Dijkstra), and DP patterns.", rating:4.9, comments:[{id:1,user:"Harsh P",text:"Went from 3 star to 5 star on CodeChef after this!",time:"1 week ago",likes:560},{id:2,user:"Anika R",text:"DP patterns section is worth 10 books",time:"5 days ago",likes:280}] },
  { id:13, title:"Docker & Kubernetes — Containers for College Students", channel:"DevOpsHub", views:"980K", viewsNum:980000, time:"5 days ago", duration:"3:30:00", durSec:12600, thumb:"https://picsum.photos/seed/docker13/320/180", avatar:"https://picsum.photos/seed/av9/40/40", tags:["DevOps","Backend"], likes:43000, subscribers:"680K", desc:"Learn Docker from zero: images, containers, volumes, networking. Then K8s: pods, deployments, services, and a real microservices deployment.", rating:4.6, comments:[{id:1,user:"Jay P",text:"Finally understand why everyone talks about Docker",time:"4 days ago",likes:190},{id:2,user:"Mira S",text:"K8s section is the most beginner-friendly I found",time:"2 days ago",likes:76}] },
  { id:14, title:"TypeScript Full Course — Types, Generics, Advanced Patterns", channel:"DevSpark", views:"1.3M", viewsNum:1300000, time:"1 week ago", duration:"4:00:00", durSec:14400, thumb:"https://picsum.photos/seed/ts14/320/180", avatar:"https://picsum.photos/seed/av3/40/40", tags:["TypeScript","Web Dev"], likes:55000, subscribers:"3.2M", desc:"Go from JavaScript to TypeScript: strict types, interfaces, generics, utility types, decorators, and integrating TS with React and Node.", rating:4.7, comments:[{id:1,user:"Dev P",text:"TypeScript finally makes sense to me!",time:"6 days ago",likes:220},{id:2,user:"Sana Q",text:"Generics section changed how I write code",time:"3 days ago",likes:110}] },
  { id:15, title:"Deep Learning — CNNs, RNNs, Transformers & LLMs", channel:"AIVault", views:"2.1M", viewsNum:2100000, time:"3 days ago", duration:"7:30:00", durSec:27000, thumb:"https://picsum.photos/seed/dl15/320/180", avatar:"https://picsum.photos/seed/av4/40/40", tags:["AI/ML","Deep Learning"], likes:79000, subscribers:"1.8M", desc:"Deep learning from scratch: backprop, CNNs for vision, RNNs/LSTMs for sequences, attention mechanism, transformers, and building your own mini-LLM.", rating:4.8, comments:[{id:1,user:"Arjun M",text:"Attention mechanism explanation is the best on YouTube",time:"2 days ago",likes:430},{id:2,user:"Tanya M",text:"Built a sentiment classifier after this!",time:"1 day ago",likes:185}] },
  { id:16, title:"Computer Networks — HTTP, TCP/IP, DNS, TLS Explained", channel:"CS Academy", views:"870K", viewsNum:870000, time:"8 days ago", duration:"3:45:00", durSec:13500, thumb:"https://picsum.photos/seed/cn16/320/180", avatar:"https://picsum.photos/seed/av1/40/40", tags:["CS Fundamentals","Interview"], likes:34000, subscribers:"890K", desc:"Networking for developers: OSI model, TCP/IP stack, DNS resolution, HTTP/HTTPS, TLS handshake, WebSockets, and REST vs GraphQL.", rating:4.6, comments:[{id:1,user:"Priya S",text:"Now I actually understand what happens when I type a URL!",time:"7 days ago",likes:320},{id:2,user:"Kiran B",text:"TLS handshake diagram at 2:40 is so clear",time:"4 days ago",likes:90}] },
];

const CATEGORIES = ["All","DSA","Python","JavaScript","React","Web Dev","Node.js","Backend","AI/ML","Deep Learning","System Design","SQL","C++","DevOps","Git","TypeScript","CS Fundamentals","Interview","Competitive"];
const SORT_OPTIONS = ["Most Viewed","Most Liked","Newest","Longest","Shortest"];

function fmtNum(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1)+"M";
  if (n >= 1000) return (n/1000).toFixed(0)+"K";
  return n;
}
function stars(r) {
  return "★".repeat(Math.floor(r)) + (r%1>=0.5?"½":"") + "☆".repeat(5-Math.ceil(r));
}

// ---- Sidebar nav items ----
const NAV = [
  {icon:"🏠", label:"Home"},
  {icon:"🔥", label:"Trending"},
  {icon:"📖", label:"My Library"},
  {icon:"⏰", label:"Watch Later"},
  {icon:"❤️", label:"Liked Videos"},
  {icon:"📋", label:"Playlists"},
  {icon:"⚙️", label:"Settings"},
];

export default function App() {
  const [page, setPage] = useState("home"); // home | video | library | liked | watchlater | trending
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Most Viewed");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [watchLater, setWatchLater] = useState(new Set());
  const [watchHistory, setWatchHistory] = useState([]);
  const [subscribedChannels, setSubscribedChannels] = useState(new Set());
  const [playlists, setPlaylists] = useState([{id:1, name:"Placement Prep", videoIds:[1,6,10,16,12]},{id:2, name:"Full Stack Dev", videoIds:[3,5,8,11,14]},{id:3, name:"AI & ML Track", videoIds:[4,15]}]);
  const [comments, setComments] = useState(() => Object.fromEntries(ALL_VIDEOS.map(v=>[v.id,[...v.comments]])));
  const [newComment, setNewComment] = useState("");
  const [progress, setProgress] = useState({}); // videoId -> seconds watched
  const [playingId, setPlayingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(null); // videoId
  const [searchFocused, setSearchFocused] = useState(false);
  const [notification, setNotification] = useState(null);
  const [videoProgress, setVideoProgress] = useState(0); // 0-100 for fake player
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [showShareModal, setShowShareModal] = useState(false);
  const [darkMode] = useState(true);
  const intervalRef = useRef(null);

  const notify = (msg) => { setNotification(msg); setTimeout(()=>setNotification(null), 2500); };

  // Fake video progress ticker
  useEffect(()=>{
    if(isPlaying && selectedVideo){
      intervalRef.current = setInterval(()=>{
        setVideoProgress(p=>{
          const next = Math.min(p + 100/selectedVideo.durSec, 100);
          setProgress(prev=>({...prev,[selectedVideo.id]: Math.floor((next/100)*selectedVideo.durSec)}));
          if(next>=100){ setIsPlaying(false); return 100; }
          return next;
        });
      }, 1000);
    } else clearInterval(intervalRef.current);
    return ()=>clearInterval(intervalRef.current);
  },[isPlaying, selectedVideo]);

  const openVideo = (v) => {
    setSelectedVideo(v);
    setPage("video");
    setVideoProgress((progress[v.id]||0)/v.durSec*100);
    setIsPlaying(false);
    setWatchHistory(prev=>{
      const filtered = prev.filter(x=>x.id!==v.id);
      return [v,...filtered].slice(0,20);
    });
  };

  const toggleLike = (vid) => {
    setLikedVideos(prev=>{
      const s=new Set(prev);
      if(s.has(vid)){ s.delete(vid); notify("Removed from liked videos"); }
      else { s.add(vid); notify("❤️ Added to liked videos"); }
      return s;
    });
  };
  const toggleWatchLater = (vid) => {
    setWatchLater(prev=>{
      const s=new Set(prev);
      if(s.has(vid)){ s.delete(vid); notify("Removed from Watch Later"); }
      else { s.add(vid); notify("⏰ Saved to Watch Later"); }
      return s;
    });
  };
  const toggleSubscribe = (channel) => {
    setSubscribedChannels(prev=>{
      const s=new Set(prev);
      if(s.has(channel)){ s.delete(channel); notify(`Unsubscribed from ${channel}`); }
      else { s.add(channel); notify(`🔔 Subscribed to ${channel}`); }
      return s;
    });
  };
  const addComment = () => {
    if(!newComment.trim()) return;
    const c={id:Date.now(),user:"You",text:newComment.trim(),time:"Just now",likes:0};
    setComments(prev=>({...prev,[selectedVideo.id]:[c,...prev[selectedVideo.id]]}));
    setNewComment("");
    notify("💬 Comment posted!");
  };
  const addToPlaylist = (playlistId, videoId) => {
    setPlaylists(prev=>prev.map(p=>p.id===playlistId?{...p,videoIds:p.videoIds.includes(videoId)?p.videoIds:[...p.videoIds,videoId]}:p));
    setShowAddToPlaylist(null);
    notify("✅ Added to playlist!");
  };
  const createPlaylist = () => {
    if(!newPlaylistName.trim()) return;
    setPlaylists(prev=>[...prev,{id:Date.now(),name:newPlaylistName.trim(),videoIds:[]}]);
    setNewPlaylistName("");
    setShowPlaylistModal(false);
    notify("📋 Playlist created!");
  };

  const getSortedFiltered = (vids) => {
    let res = vids.filter(v=>{
      const mc = activeCategory==="All" || v.tags.includes(activeCategory);
      const ms = !search || v.title.toLowerCase().includes(search.toLowerCase()) || v.channel.toLowerCase().includes(search.toLowerCase()) || v.tags.some(t=>t.toLowerCase().includes(search.toLowerCase()));
      return mc && ms;
    });
    if(sortBy==="Most Viewed") res.sort((a,b)=>b.viewsNum-a.viewsNum);
    else if(sortBy==="Most Liked") res.sort((a,b)=>b.likes-a.likes);
    else if(sortBy==="Newest") res.sort((a,b)=>a.id-b.id);
    else if(sortBy==="Longest") res.sort((a,b)=>b.durSec-a.durSec);
    else if(sortBy==="Shortest") res.sort((a,b)=>a.durSec-b.durSec);
    return res;
  };

  const getPageVideos = () => {
    if(page==="liked") return ALL_VIDEOS.filter(v=>likedVideos.has(v.id));
    if(page==="watchlater") return ALL_VIDEOS.filter(v=>watchLater.has(v.id));
    if(page==="trending") return [...ALL_VIDEOS].sort((a,b)=>b.viewsNum-a.viewsNum);
    return getSortedFiltered(ALL_VIDEOS);
  };

  const s=(obj)=>obj; // passthrough for style objects
  const nav=(p)=>{ setPage(p); setSelectedVideo(null); };

  // ---- COMPONENTS ----
  const Navbar = ()=>(
    <div style={{background:"#0D0D1A",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:12,padding:"10px 16px",position:"sticky",top:0,zIndex:200}}>
      <button onClick={()=>setSidebarOpen(o=>!o)} style={{background:"none",border:"none",color:C.text,fontSize:20,cursor:"pointer",padding:"4px 6px"}}>☰</button>
      <div onClick={()=>nav("home")} style={{fontWeight:800,fontSize:20,color:C.red,letterSpacing:1,whiteSpace:"nowrap",cursor:"pointer"}}>
        📚 <span style={{color:C.text}}>Campus</span><span style={{color:C.red}}>Play</span>
      </div>
      <div style={{flex:1,maxWidth:500,display:"flex",margin:"0 auto"}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} onFocus={()=>setSearchFocused(true)} onBlur={()=>setTimeout(()=>setSearchFocused(false),200)}
          placeholder="Search lectures, subjects, channels..."
          style={{flex:1,background:C.surface,border:`1px solid ${searchFocused?C.red:C.border}`,color:C.text,borderRadius:"24px 0 0 24px",padding:"9px 18px",fontSize:14,outline:"none",transition:"border-color 0.2s"}}
          onKeyDown={e=>{if(e.key==="Enter"&&search.trim()){nav("home");}}}
        />
        <button onClick={()=>nav("home")} style={{background:C.surface,border:`1px solid ${C.border}`,borderLeft:"none",color:C.muted,borderRadius:"0 24px 24px 0",padding:"9px 16px",cursor:"pointer",fontSize:15}}>🔍</button>
      </div>
      <div style={{display:"flex",gap:10,marginLeft:"auto",alignItems:"center"}}>
        <button onClick={()=>nav("watchlater")} title="Watch Later" style={{background:"none",border:"none",color:watchLater.size>0?C.yellow:C.muted,fontSize:20,cursor:"pointer"}}>⏰</button>
        <button onClick={()=>nav("liked")} title="Liked Videos" style={{background:"none",border:"none",color:likedVideos.size>0?"#ff6b6b":C.muted,fontSize:20,cursor:"pointer"}}>❤️</button>
        <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#CC0000,#7C2AE8)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,cursor:"pointer",color:"#fff"}}>S</div>
      </div>
    </div>
  );

  const Sidebar = ()=>(
    <div style={{width:sidebarOpen?200:0,minWidth:sidebarOpen?200:0,overflow:"hidden",transition:"all 0.2s",background:"#0D0D1A",borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",paddingTop:8}}>
      {NAV.map(({icon,label})=>{
        const p = label==="Home"?"home":label==="Trending"?"trending":label==="My Library"?"library":label==="Watch Later"?"watchlater":label==="Liked Videos"?"liked":label==="Playlists"?"playlists":"home";
        const active = page===p;
        return (
          <button key={label} onClick={()=>nav(p)} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",background:active?C.surface:"none",border:"none",color:active?C.text:C.muted,cursor:"pointer",fontSize:14,borderLeft:active?`3px solid ${C.red}`:"3px solid transparent",transition:"all 0.15s",textAlign:"left",width:"100%"}}>
            <span style={{fontSize:18}}>{icon}</span><span style={{whiteSpace:"nowrap"}}>{label}</span>
          </button>
        );
      })}
      <div style={{padding:"12px 16px 4px",fontSize:11,color:C.muted,textTransform:"uppercase",letterSpacing:1,marginTop:8}}>Playlists</div>
      {playlists.map(pl=>(
        <button key={pl.id} onClick={()=>nav("playlists")} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 16px",background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13,textAlign:"left",width:"100%"}}>
          <span>📋</span><span style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{pl.name}</span>
          <span style={{marginLeft:"auto",background:C.tag,color:C.tagText,fontSize:10,borderRadius:4,padding:"1px 5px"}}>{pl.videoIds.length}</span>
        </button>
      ))}
    </div>
  );

  const VideoCard = ({v, compact=false})=>{
    const prog = progress[v.id];
    const progPct = prog ? (prog/v.durSec*100) : 0;
    return (
      <div style={{background:C.card,borderRadius:12,overflow:"hidden",cursor:"pointer",border:`1px solid ${C.border}`,transition:"transform 0.18s,border-color 0.18s",position:"relative"}}
        onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.borderColor=C.red;}}
        onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.borderColor=C.border;}}
      >
        <div style={{position:"relative"}} onClick={()=>openVideo(v)}>
          <img src={v.thumb} alt={v.title} style={{width:"100%",aspectRatio:"16/9",objectFit:"cover",display:"block"}} />
          <span style={{position:"absolute",bottom:8,right:8,background:"rgba(0,0,0,0.85)",color:"#fff",fontSize:11,padding:"2px 6px",borderRadius:4,fontWeight:700}}>{v.duration}</span>
          {progPct>0&&progPct<100&&<div style={{position:"absolute",bottom:0,left:0,right:0,height:3,background:"rgba(255,255,255,0.2)"}}><div style={{width:progPct+"%",height:"100%",background:C.red}}/></div>}
          {progPct>=100&&<div style={{position:"absolute",top:6,left:6,background:C.green,color:"#000",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:4}}>✓ WATCHED</div>}
        </div>
        <div style={{padding:"10px 12px 12px"}}>
          <div style={{display:"flex",gap:8,marginBottom:6}}>
            <img src={v.avatar} style={{width:32,height:32,borderRadius:"50%",objectFit:"cover",flexShrink:0,cursor:"pointer"}} alt="" onClick={()=>openVideo(v)} />
            <div style={{minWidth:0,flex:1}} onClick={()=>openVideo(v)}>
              <div style={{fontWeight:700,fontSize:13,color:C.text,lineHeight:1.3,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{v.title}</div>
              <div style={{fontSize:12,color:C.muted,marginTop:2}}>{v.channel}</div>
              <div style={{fontSize:11,color:C.muted}}>{v.views}M views · {v.time}</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
            {v.tags.slice(0,2).map(t=><span key={t} style={{background:C.tag,color:C.tagText,fontSize:10,borderRadius:4,padding:"2px 7px",fontWeight:600}}>{t}</span>)}
            <div style={{marginLeft:"auto",display:"flex",gap:4}}>
              <button onClick={e=>{e.stopPropagation();toggleLike(v.id);}} title="Like" style={{background:"none",border:"none",color:likedVideos.has(v.id)?"#ff6b6b":C.muted,cursor:"pointer",fontSize:15,padding:"2px 4px"}}>❤️</button>
              <button onClick={e=>{e.stopPropagation();toggleWatchLater(v.id);}} title="Watch Later" style={{background:"none",border:"none",color:watchLater.has(v.id)?C.yellow:C.muted,cursor:"pointer",fontSize:15,padding:"2px 4px"}}>⏰</button>
              <button onClick={e=>{e.stopPropagation();setShowAddToPlaylist(v.id);}} title="Add to Playlist" style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:15,padding:"2px 4px"}}>📋</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const VideoGrid = ({videos, emptyMsg="No videos found"})=>(
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:18}}>
      {videos.length===0?<div style={{gridColumn:"1/-1",textAlign:"center",color:C.muted,padding:60,fontSize:16}}>{emptyMsg}</div>:videos.map(v=><VideoCard key={v.id} v={v}/>)}
    </div>
  );

  const CategoryBar = ()=>(
    <div style={{background:"#0D0D1A",padding:"8px 16px",borderBottom:`1px solid ${C.border}`,overflowX:"auto",whiteSpace:"nowrap",display:"flex",gap:8,alignItems:"center"}}>
      {CATEGORIES.map(cat=>(
        <button key={cat} onClick={()=>{setActiveCategory(cat);nav("home");}} style={{padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:600,cursor:"pointer",transition:"all 0.15s",flexShrink:0,background:activeCategory===cat?C.text:C.surface,color:activeCategory===cat?C.bg:C.text,border:`1px solid ${activeCategory===cat?C.text:C.border}`}}>{cat}</button>
      ))}
      <div style={{marginLeft:"auto",flexShrink:0}}>
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{background:C.surface,color:C.text,border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 10px",fontSize:12,cursor:"pointer",outline:"none"}}>
          {SORT_OPTIONS.map(o=><option key={o}>{o}</option>)}
        </select>
      </div>
    </div>
  );

  // ---- VIDEO PLAYER PAGE ----
  const VideoPage = ()=>{
    const v = selectedVideo;
    const isLiked = likedVideos.has(v.id);
    const isWL = watchLater.has(v.id);
    const isSub = subscribedChannels.has(v.channel);
    const prog = progress[v.id]||0;
    const fmt = (s)=>`${Math.floor(s/3600).toString().padStart(2,"0")}:${Math.floor((s%3600)/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;

    return (
      <div style={{display:"flex",gap:0,maxWidth:1280,margin:"0 auto",padding:"20px 16px",flexWrap:"wrap",alignItems:"flex-start"}}>
        <div style={{flex:"1 1 620px",minWidth:280,marginRight:24}}>
          {/* Player */}
          <div style={{background:"#000",borderRadius:12,overflow:"hidden",aspectRatio:"16/9",position:"relative",marginBottom:12}}>
            <img src={v.thumb} alt="" style={{width:"100%",height:"100%",objectFit:"cover",opacity:isPlaying?0.5:0.8}} />
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setIsPlaying(p=>!p)}>
              {!isPlaying&&<div style={{width:68,height:68,borderRadius:"50%",background:"rgba(204,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,cursor:"pointer",boxShadow:"0 0 0 8px rgba(204,0,0,0.2)"}}>▶</div>}
              {isPlaying&&<div style={{display:"flex",gap:6,cursor:"pointer"}}><div style={{width:10,height:40,background:"rgba(255,255,255,0.9)",borderRadius:2}}/><div style={{width:10,height:40,background:"rgba(255,255,255,0.9)",borderRadius:2}}/></div>}
            </div>
            {isPlaying&&<div style={{position:"absolute",top:12,right:12,background:"rgba(204,0,0,0.9)",color:"#fff",fontSize:11,padding:"3px 9px",borderRadius:4,fontWeight:700}}>● LIVE</div>}
            {/* Progress bar */}
            <div style={{position:"absolute",bottom:0,left:0,right:0}}>
              <div style={{height:4,background:"rgba(255,255,255,0.2)",cursor:"pointer"}} onClick={e=>{const r=e.currentTarget.getBoundingClientRect();const pct=(e.clientX-r.left)/r.width;setVideoProgress(pct*100);setProgress(prev=>({...prev,[v.id]:Math.floor(pct*v.durSec)}));}}>
                <div style={{width:videoProgress+"%",height:"100%",background:C.red,transition:"width 0.5s linear"}}/>
              </div>
              {/* Controls */}
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"6px 12px",background:"rgba(0,0,0,0.7)"}}>
                <button onClick={()=>setIsPlaying(p=>!p)} style={{background:"none",border:"none",color:"#fff",cursor:"pointer",fontSize:16}}>{isPlaying?"⏸":"▶"}</button>
                <span style={{fontSize:11,color:"#ccc"}}>{fmt(prog)} / {v.duration}</span>
                <div style={{flex:1}}/>
                <span style={{fontSize:11,color:"#ccc"}}>🔊</span>
                <input type="range" min={0} max={100} value={volume} onChange={e=>setVolume(+e.target.value)} style={{width:70,accentColor:C.red}}/>
                <span style={{fontSize:11,color:"#ccc"}}>{volume}%</span>
                <button style={{background:"none",border:"none",color:"#ccc",cursor:"pointer",fontSize:13}}>⛶</button>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div style={{marginBottom:8,display:"flex",gap:6,flexWrap:"wrap"}}>
            {v.tags.map(t=><span key={t} style={{background:C.tag,color:C.tagText,fontSize:11,borderRadius:4,padding:"3px 10px",fontWeight:600}}>{t}</span>)}
            <span style={{color:C.yellow,fontSize:13,marginLeft:4}}>{stars(v.rating)} {v.rating}</span>
          </div>

          <h1 style={{fontSize:19,fontWeight:800,color:C.text,margin:"6px 0 12px",lineHeight:1.3}}>{v.title}</h1>

          {/* Channel + actions */}
          <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",marginBottom:14,padding:"10px 0",borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
            <img src={v.avatar} style={{width:40,height:40,borderRadius:"50%",objectFit:"cover"}} alt=""/>
            <div>
              <div style={{fontWeight:700,fontSize:14}}>{v.channel}</div>
              <div style={{fontSize:12,color:C.muted}}>{v.subscribers} subscribers</div>
            </div>
            <button onClick={()=>toggleSubscribe(v.channel)} style={{background:isSub?"#333":C.red,color:"#fff",border:"none",borderRadius:20,padding:"8px 18px",fontWeight:700,cursor:"pointer",fontSize:13,transition:"background 0.2s"}}>
              {isSub?"✓ Subscribed":"Subscribe"}
            </button>
            <div style={{marginLeft:"auto",display:"flex",gap:8,flexWrap:"wrap"}}>
              <button onClick={()=>toggleLike(v.id)} style={{background:isLiked?C.red:C.surface,color:isLiked?"#fff":C.muted,border:`1px solid ${C.border}`,borderRadius:20,padding:"7px 14px",cursor:"pointer",fontSize:13,fontWeight:600}}>
                ❤️ {isLiked?fmtNum(v.likes+1):fmtNum(v.likes)}
              </button>
              <button onClick={()=>toggleWatchLater(v.id)} style={{background:isWL?"#2a2500":C.surface,color:isWL?C.yellow:C.muted,border:`1px solid ${C.border}`,borderRadius:20,padding:"7px 14px",cursor:"pointer",fontSize:13}}>
                {isWL?"✓ Saved":"⏰ Save"}
              </button>
              <button onClick={()=>setShowAddToPlaylist(v.id)} style={{background:C.surface,color:C.muted,border:`1px solid ${C.border}`,borderRadius:20,padding:"7px 14px",cursor:"pointer",fontSize:13}}>📋 Playlist</button>
              <button onClick={()=>setShowShareModal(true)} style={{background:C.surface,color:C.muted,border:`1px solid ${C.border}`,borderRadius:20,padding:"7px 14px",cursor:"pointer",fontSize:13}}>📤 Share</button>
            </div>
          </div>

          {/* Description */}
          <div style={{background:C.surface,borderRadius:10,padding:"12px 14px",fontSize:13,color:C.muted,border:`1px solid ${C.border}`,lineHeight:1.75,marginBottom:16}}>
            <div style={{color:C.text,fontWeight:600,marginBottom:4}}>{v.views}M views · {v.time}</div>
            {v.desc}
          </div>

          {/* Comments */}
          <div>
            <div style={{fontWeight:700,fontSize:16,marginBottom:12,color:C.text}}>{comments[v.id].length} Comments</div>
            <div style={{display:"flex",gap:10,marginBottom:16}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#CC0000,#7C2AE8)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:12,flexShrink:0,color:"#fff"}}>S</div>
              <div style={{flex:1}}>
                <input value={newComment} onChange={e=>setNewComment(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addComment()} placeholder="Add a comment... (press Enter or click Post)"
                  style={{width:"100%",background:C.surface,border:`1px solid ${C.border}`,color:C.text,borderRadius:8,padding:"9px 14px",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
                {newComment&&<div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:6}}>
                  <button onClick={()=>setNewComment("")} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13}}>Cancel</button>
                  <button onClick={addComment} style={{background:C.red,color:"#fff",border:"none",borderRadius:6,padding:"6px 14px",cursor:"pointer",fontSize:13,fontWeight:700}}>Post</button>
                </div>}
              </div>
            </div>
            {comments[v.id].map(c=>(
              <div key={c.id} style={{display:"flex",gap:10,marginBottom:14}}>
                <div style={{width:32,height:32,borderRadius:"50%",background:c.user==="You"?"linear-gradient(135deg,#CC0000,#7C2AE8)":C.surface,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0,color:"#fff",border:`1px solid ${C.border}`}}>{c.user[0]}</div>
                <div>
                  <div style={{display:"flex",gap:8,alignItems:"baseline",marginBottom:2}}>
                    <span style={{fontWeight:700,fontSize:13,color:c.user==="You"?C.red:C.text}}>{c.user}</span>
                    <span style={{fontSize:11,color:C.muted}}>{c.time}</span>
                  </div>
                  <div style={{fontSize:13,color:C.muted,lineHeight:1.5}}>{c.text}</div>
                  <button style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:12,marginTop:4}}>👍 {c.likes}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Up Next Sidebar */}
        <div style={{width:340,minWidth:240,flex:"0 0 340px"}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:10,color:C.muted}}>Up Next</div>
          {ALL_VIDEOS.filter(x=>x.id!==v.id).slice(0,8).map(x=>(
            <div key={x.id} onClick={()=>{setSelectedVideo(x);setVideoProgress(0);setIsPlaying(false);}} style={{display:"flex",gap:8,marginBottom:10,cursor:"pointer",borderRadius:8,padding:6,transition:"background 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.background=C.surface} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{position:"relative",flexShrink:0}}>
                <img src={x.thumb} style={{width:116,height:66,borderRadius:6,objectFit:"cover"}} alt=""/>
                <span style={{position:"absolute",bottom:3,right:3,background:"rgba(0,0,0,0.8)",fontSize:10,padding:"1px 5px",borderRadius:3}}>{x.duration}</span>
                {(progress[x.id]||0)>0&&<div style={{position:"absolute",bottom:0,left:0,right:0,height:3}}><div style={{width:(progress[x.id]/x.durSec*100)+"%",height:"100%",background:C.red}}/></div>}
              </div>
              <div>
                <div style={{fontSize:12,fontWeight:600,color:C.text,marginBottom:2,lineHeight:1.3}}>{x.title.slice(0,55)}{x.title.length>55?"…":""}</div>
                <div style={{fontSize:11,color:C.muted}}>{x.channel}</div>
                <div style={{fontSize:11,color:C.muted}}>{x.views}M · {x.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const PlaylistsPage = ()=>(
    <div style={{maxWidth:900,margin:"0 auto",padding:24}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <h2 style={{margin:0,fontSize:22,color:C.text}}>📋 My Playlists</h2>
        <button onClick={()=>setShowPlaylistModal(true)} style={{background:C.red,color:"#fff",border:"none",borderRadius:8,padding:"8px 16px",fontWeight:700,cursor:"pointer",fontSize:14}}>+ New Playlist</button>
      </div>
      {playlists.length===0&&<div style={{color:C.muted,textAlign:"center",padding:60}}>No playlists yet. Create one!</div>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:16}}>
        {playlists.map(pl=>{
          const plVids = ALL_VIDEOS.filter(v=>pl.videoIds.includes(v.id));
          return (
            <div key={pl.id} style={{background:C.card,borderRadius:12,overflow:"hidden",border:`1px solid ${C.border}`}}>
              <div style={{position:"relative",aspectRatio:"16/9",background:C.surface,overflow:"hidden"}}>
                {plVids[0]?<img src={plVids[0].thumb} style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.7}} alt=""/>:<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",fontSize:40}}>📋</div>}
                <div style={{position:"absolute",bottom:8,right:8,background:"rgba(0,0,0,0.85)",color:"#fff",fontSize:12,padding:"2px 8px",borderRadius:4}}>{pl.videoIds.length} videos</div>
              </div>
              <div style={{padding:"10px 12px"}}>
                <div style={{fontWeight:700,fontSize:15,color:C.text,marginBottom:4}}>{pl.name}</div>
                <div style={{fontSize:12,color:C.muted}}>{plVids.map(v=>v.channel).filter((c,i,a)=>a.indexOf(c)===i).slice(0,3).join(", ") || "Empty playlist"}</div>
                <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
                  {plVids.slice(0,3).map(v=>(
                    <button key={v.id} onClick={()=>openVideo(v)} style={{background:C.surface,border:`1px solid ${C.border}`,color:C.tagText,fontSize:11,borderRadius:4,padding:"3px 8px",cursor:"pointer"}}>{v.title.slice(0,20)}…</button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const LibraryPage = ()=>(
    <div style={{maxWidth:1200,margin:"0 auto",padding:24}}>
      <h2 style={{margin:"0 0 16px",fontSize:22,color:C.text}}>📖 Watch History</h2>
      {watchHistory.length===0?<div style={{color:C.muted,textAlign:"center",padding:60}}>No watch history yet. Start watching!</div>:<VideoGrid videos={watchHistory}/>}
    </div>
  );

  const EmptyPage = (title,msg,emoji="🎬")=>(
    <div style={{maxWidth:1200,margin:"0 auto",padding:24}}>
      <h2 style={{margin:"0 0 16px",fontSize:22,color:C.text}}>{title}</h2>
      {getPageVideos().length===0?<div style={{color:C.muted,textAlign:"center",padding:60,fontSize:16}}>{emoji} {msg}</div>:<VideoGrid videos={getPageVideos()}/>}
    </div>
  );

  // ---- MODALS ----
  const AddToPlaylistModal = ()=>{
    const vid = showAddToPlaylist;
    if(!vid) return null;
    return (
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500}} onClick={()=>setShowAddToPlaylist(null)}>
        <div style={{background:C.surface,borderRadius:12,padding:24,minWidth:300,border:`1px solid ${C.border}`}} onClick={e=>e.stopPropagation()}>
          <div style={{fontWeight:700,fontSize:16,marginBottom:14,color:C.text}}>Add to Playlist</div>
          {playlists.map(pl=>(
            <button key={pl.id} onClick={()=>addToPlaylist(pl.id,vid)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"9px 12px",background:pl.videoIds.includes(vid)?"rgba(204,0,0,0.1)":"none",border:`1px solid ${pl.videoIds.includes(vid)?C.red:C.border}`,borderRadius:8,color:C.text,cursor:"pointer",fontSize:14,marginBottom:8}}>
              <span>📋</span><span>{pl.name}</span><span style={{marginLeft:"auto",fontSize:12,color:C.muted}}>{pl.videoIds.length} videos</span>
              {pl.videoIds.includes(vid)&&<span style={{color:C.green,fontSize:12}}>✓</span>}
            </button>
          ))}
          <button onClick={()=>setShowPlaylistModal(true)} style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"9px 12px",background:"none",border:`1px solid ${C.border}`,borderRadius:8,color:C.red,cursor:"pointer",fontSize:14,marginTop:4}}>
            <span>＋</span> Create new playlist
          </button>
        </div>
      </div>
    );
  };

  const ShareModal = ()=>!showShareModal?null:(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500}} onClick={()=>setShowShareModal(false)}>
      <div style={{background:C.surface,borderRadius:12,padding:24,minWidth:320,border:`1px solid ${C.border}`}} onClick={e=>e.stopPropagation()}>
        <div style={{fontWeight:700,fontSize:16,marginBottom:14,color:C.text}}>📤 Share Video</div>
        <div style={{background:C.card,borderRadius:8,padding:"10px 14px",fontSize:13,color:C.muted,marginBottom:14,border:`1px solid ${C.border}`,wordBreak:"break-all"}}>
          https://campusplay.edu/watch?v={selectedVideo?.id}
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {["📱 WhatsApp","✉️ Email","📘 Facebook","🐦 Twitter","🔗 Copy Link"].map(s=>(
            <button key={s} onClick={()=>{notify("🔗 Link copied!"); setShowShareModal(false);}} style={{background:C.card,border:`1px solid ${C.border}`,color:C.text,borderRadius:8,padding:"8px 12px",cursor:"pointer",fontSize:12,fontWeight:600}}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  );

  const NewPlaylistModal = ()=>!showPlaylistModal?null:(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:600}} onClick={()=>setShowPlaylistModal(false)}>
      <div style={{background:C.surface,borderRadius:12,padding:24,minWidth:300,border:`1px solid ${C.border}`}} onClick={e=>e.stopPropagation()}>
        <div style={{fontWeight:700,fontSize:16,marginBottom:14,color:C.text}}>📋 New Playlist</div>
        <input value={newPlaylistName} onChange={e=>setNewPlaylistName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&createPlaylist()} placeholder="Playlist name..."
          style={{width:"100%",background:C.card,border:`1px solid ${C.border}`,color:C.text,borderRadius:8,padding:"9px 14px",fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:12}}/>
        <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
          <button onClick={()=>setShowPlaylistModal(false)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,borderRadius:8,padding:"8px 16px",cursor:"pointer",fontSize:13}}>Cancel</button>
          <button onClick={createPlaylist} style={{background:C.red,color:"#fff",border:"none",borderRadius:8,padding:"8px 16px",fontWeight:700,cursor:"pointer",fontSize:13}}>Create</button>
        </div>
      </div>
    </div>
  );

  // ---- MAIN RENDER ----
  return (
    <div style={{background:C.bg,minHeight:"100vh",color:C.text,fontFamily:"'Segoe UI',sans-serif",display:"flex",flexDirection:"column"}}>
      <Navbar/>
      {(page!=="video")&&<CategoryBar/>}
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        <Sidebar/>
        <div style={{flex:1,overflowY:"auto",overflowX:"hidden"}}>
          {/* Notification toast */}
          {notification&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"#222",color:"#fff",padding:"10px 22px",borderRadius:24,fontSize:14,fontWeight:600,zIndex:999,boxShadow:"0 4px 20px rgba(0,0,0,0.5)",border:`1px solid ${C.border}`}}>{notification}</div>}
          <AddToPlaylistModal/>
          <ShareModal/>
          <NewPlaylistModal/>

          {page==="video"&&selectedVideo&&<VideoPage/>}
          {page==="home"&&(
            <div style={{maxWidth:1280,margin:"0 auto",padding:20}}>
              {!search&&activeCategory==="All"&&(
                <div style={{background:"linear-gradient(120deg,#1A0A2E 0%,#0F0F0F 60%,#1A0808 100%)",padding:"24px 20px 18px",marginBottom:20,borderRadius:12,border:`1px solid ${C.border}`}}>
                  <div style={{fontSize:11,color:C.red,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>💻 For CS & Coding Students</div>
                  <h2 style={{fontSize:26,fontWeight:800,color:C.text,margin:"0 0 8px",lineHeight:1.2}}>Code better. Ship faster.<br/><span style={{color:C.red}}>DSA · Web Dev · AI/ML · DevOps.</span></h2>
                  <p style={{color:C.muted,fontSize:14,margin:"0 0 14px"}}>Curated coding lectures for placements, internships, and real-world skills — free forever.</p>
                  <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                    <button onClick={()=>setActiveCategory("DSA")} style={{background:C.red,color:"#fff",border:"none",borderRadius:6,padding:"9px 20px",fontWeight:700,fontSize:14,cursor:"pointer"}}>DSA & Algo</button>
                    <button onClick={()=>setActiveCategory("Web Dev")} style={{background:C.surface,color:C.text,border:`1px solid ${C.border}`,borderRadius:6,padding:"9px 20px",fontWeight:600,fontSize:14,cursor:"pointer"}}>Web Dev</button>
                    <button onClick={()=>setActiveCategory("AI/ML")} style={{background:C.surface,color:C.text,border:`1px solid ${C.border}`,borderRadius:6,padding:"9px 20px",fontWeight:600,fontSize:14,cursor:"pointer"}}>AI / ML</button>
                    <button onClick={()=>setActiveCategory("Interview")} style={{background:C.surface,color:C.text,border:`1px solid ${C.border}`,borderRadius:6,padding:"9px 20px",fontWeight:600,fontSize:14,cursor:"pointer"}}>Interview Prep</button>
                  </div>
                </div>
              )}
              {search&&<div style={{marginBottom:12,fontSize:14,color:C.muted}}>Results for <strong style={{color:C.text}}>"{search}"</strong> — {getSortedFiltered(ALL_VIDEOS).length} videos</div>}
              <VideoGrid videos={getSortedFiltered(ALL_VIDEOS)} emptyMsg={`No videos found${search?` for "${search}"`:""}. Try a different search.`}/>
            </div>
          )}
          {page==="trending"&&<div style={{maxWidth:1280,margin:"0 auto",padding:20}}><h2 style={{margin:"0 0 16px",fontSize:22}}>🔥 Trending</h2><VideoGrid videos={[...ALL_VIDEOS].sort((a,b)=>b.viewsNum-a.viewsNum)}/></div>}
          {page==="liked"&&<div style={{maxWidth:1280,margin:"0 auto",padding:20}}><h2 style={{margin:"0 0 16px",fontSize:22}}>❤️ Liked Videos <span style={{fontSize:15,color:C.muted}}>({likedVideos.size})</span></h2><VideoGrid videos={ALL_VIDEOS.filter(v=>likedVideos.has(v.id))} emptyMsg="❤️ No liked videos yet. Like videos to save them here!"/></div>}
          {page==="watchlater"&&<div style={{maxWidth:1280,margin:"0 auto",padding:20}}><h2 style={{margin:"0 0 16px",fontSize:22}}>⏰ Watch Later <span style={{fontSize:15,color:C.muted}}>({watchLater.size})</span></h2><VideoGrid videos={ALL_VIDEOS.filter(v=>watchLater.has(v.id))} emptyMsg="⏰ No saved videos. Click the clock icon on any video!"/></div>}
          {page==="library"&&<LibraryPage/>}
          {page==="playlists"&&<PlaylistsPage/>}
        </div>
      </div>
    </div>
  );
}