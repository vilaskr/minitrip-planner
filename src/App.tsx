/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  MapPin, 
  ClipboardCheck, 
  StickyNote, 
  Navigation, 
  Users, 
  Plus, 
  Trash2, 
  ExternalLink,
  Settings,
  Calendar,
  CloudRain,
  Map as MapIcon,
  Check,
  X,
  Zap,
  Github,
  Monitor
} from 'lucide-react';
import { Trip, Member, Expense, ItineraryItem, ChecklistItem, Note, MapLink } from './types';

// Mock initial data
const INITIAL_TRIP: Trip = {
  name: "GOKARNA BEACH HOPPING",
  destination: "Gokarna, Karnataka",
  startDate: "2026-06-15",
  endDate: "2026-06-20",
  budget: 15000,
};

const INITIAL_MEMBERS: Member[] = [
  { id: '1', name: 'Vilas K R', avatar: 'VK', role: 'OWNER', badge: 'CHAOS CONTROL' },
  { id: '2', name: 'Aarav', avatar: 'AA', role: 'MEMBER', badge: 'FOOD LEADER' },
  { id: '3', name: 'Sanya', avatar: 'SY', role: 'MEMBER', badge: 'CAMERA GAL' },
  { id: '4', name: 'Ishaan', avatar: 'IS', role: 'MEMBER', badge: 'DRIVER' },
];

export default function App() {
  const [trip, setTrip] = useState<Trip>(INITIAL_TRIP);
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([
    { id: '1', time: '09:00', activity: 'Breakfast at Namaste Cafe', location: 'Om Beach', notes: 'Try the pancakes!' },
    { id: '2', time: '11:00', activity: 'Beach Trek', location: 'Half Moon Beach', notes: 'Carry water' },
  ]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: '1', text: 'Powerbank', completed: false, category: 'Electronics' },
    { id: '2', text: 'Sunscreen', completed: true, category: 'Essentials' },
  ]);
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', content: 'Hostel booking reference: #TRP992', color: 'bg-yellow-200', createdAt: new Date().toISOString() }
  ]);
  const [mapLinks, setMapLinks] = useState<MapLink[]>([
    { id: '1', name: 'Zostel Gokarna', url: 'https://maps.google.com' }
  ]);

  const [activeSection, setActiveSection] = useState<string>('overview');
  const [mood, setMood] = useState<number>(80);

  const quote = useMemo(() => {
    const quotes = [
      "Travel is the only thing you buy that makes you richer.",
      "A journey of a thousand miles begins with a single beach trek.",
      "Chaotic trips make the best stories.",
      "If you think adventure is dangerous, try routine; it is lethal.",
      "Don't listen to what they say. Go see."
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, []);

  const daysLeft = useMemo(() => {
    const start = new Date(trip.startDate);
    const today = new Date();
    const diff = start.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [trip.startDate]);

  // Calculations for Expense Splitter
  const balances = useMemo(() => {
    const bal: Record<string, number> = {};
    members.forEach(m => (bal[m.id] = 0));

    expenses.forEach(exp => {
      const payerId = exp.paidBy;
      const share = exp.amount / exp.splitWith.length;
      
      bal[payerId] += exp.amount;
      exp.splitWith.forEach(id => {
        bal[id] -= share;
      });
    });
    return bal;
  }, [expenses, members]);

  return (
    <div className="min-h-screen pb-20 selection:bg-retro-red selection:text-white">
      <div className="pixel-bg fixed inset-0 opacity-10 pointer-events-none" />
      <div className="crt-overlay fixed inset-0 z-50 opacity-10 pointer-events-none" />
      
      {/* Hero Header */}
      <header className="pt-12 pb-8 px-4 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-retro-black text-white text-xs font-bold rounded-full mb-4 animate-pulse">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            V1.0.4 - ONLINE
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-2 drop-shadow-[4px_4px_0_#111]">
            MINI<span className="text-retro-red">TRIP</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold uppercase tracking-tight text-gray-700">
            PLAN TRIPS. NOT CHAOS.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Badge text="GROUP READY" color="bg-blue-400" />
            <Badge text="NO EXCEL SHEETS" color="bg-green-400" />
            <Badge text="CHAOS CONTROLLED" color="bg-retro-red" textColor="text-white" />
          </div>
          
          <div className="hidden lg:block">
            <motion.div 
               animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-20 left-10 p-2 bg-yellow-300 border-2 border-retro-black -rotate-12 font-black text-[10px] uppercase shadow-retro-small"
            >
               Sticker: 100% Fun
            </motion.div>
            <motion.div 
               animate={{ y: [0, 10, 0], rotate: [5, -5, 5] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-10 right-10 p-2 bg-pink-300 border-2 border-retro-black rotate-6 font-black text-[10px] uppercase shadow-retro-small"
            >
               Certified Chaos
            </motion.div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 space-y-12">
        
        {/* Navigation / Toolbar */}
        <nav className="sticky top-4 z-40 bg-white border-4 border-retro-black shadow-retro rounded-2xl p-2 flex items-center justify-between overflow-x-auto no-scrollbar mx-auto w-full md:w-max md:px-6">
          <div className="flex gap-1 md:gap-4">
            <NavBtn icon={<Monitor size={20} />} label="OVERVIEW" active={activeSection === 'overview'} onClick={() => setActiveSection('overview')} />
            <NavBtn icon={<CreditCard size={20} />} label="SPENDING" active={activeSection === 'spending'} onClick={() => setActiveSection('spending')} />
            <NavBtn icon={<Calendar size={20} />} label="ITINERARY" active={activeSection === 'itinerary'} onClick={() => setActiveSection('itinerary')} />
            <NavBtn icon={<ClipboardCheck size={20} />} label="CHECKLIST" active={activeSection === 'checklist'} onClick={() => setActiveSection('checklist')} />
            <NavBtn icon={<StickyNote size={20} />} label="NOTES" active={activeSection === 'notes'} onClick={() => setActiveSection('notes')} />
            <NavBtn icon={<MapPin size={20} />} label="LOCATIONS" active={activeSection === 'locations'} onClick={() => setActiveSection('locations')} />
          </div>
        </nav>

        {/* Content Sections */}
        <div className="space-y-12">
          
          {/* Section: Overview */}
          <Section visible={activeSection === 'overview'}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="retro-card p-8 bg-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-retro-yellow/50 -mr-16 -mt-16 rounded-full blur-2xl" />
                  <div className="relative">
                    <div className="flex items-center gap-2 text-retro-red font-black uppercase tracking-widest text-sm mb-2">
                       <Zap size={16} /> CURRENT MISSION
                    </div>
                    <input 
                      type="text" 
                      value={trip.name} 
                      onChange={(e) => setTrip({...trip, name: e.target.value.toUpperCase()})}
                      className="text-4xl md:text-5xl font-black w-full bg-transparent focus:outline-none border-b-4 border-transparent focus:border-retro-black mb-4"
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div>
                        <label className="retro-label">Destination</label>
                        <input 
                          type="text" 
                          value={trip.destination} 
                          onChange={(e) => setTrip({...trip, destination: e.target.value})}
                          className="retro-input w-full"
                        />
                      </div>
                      <div>
                        <label className="retro-label">Dates</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input type="date" value={trip.startDate} className="retro-input w-full text-xs" />
                          <input type="date" value={trip.endDate} className="retro-input w-full text-xs" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-end gap-6">
                       <div className="flex-1">
                          <label className="retro-label">Trip Progress</label>
                          <div className="h-8 w-full bg-gray-100 border-4 border-retro-black rounded-full overflow-hidden relative">
                             <div className="absolute inset-0 h-full bg-green-400 w-1/3 border-r-4 border-retro-black" />
                             <span className="absolute inset-0 flex items-center justify-center font-black text-xs">LOADING EXPERIENCE... 35%</span>
                          </div>
                       </div>
                       <div className="retro-card px-6 py-2 bg-retro-yellow text-center min-w-[120px]">
                          <div className="text-xs font-bold uppercase">Days Left</div>
                          <div className="text-3xl font-black">{daysLeft}</div>
                       </div>
                       <button className="retro-button-secondary p-4 flex items-center gap-2">
                          <ExternalLink size={20} /> <span className="hidden sm:inline">SHARE</span>
                       </button>
                    </div>

                    <div className="mt-8 p-4 bg-white border-2 border-retro-black rounded-lg italic font-bold text-sm">
                       "{quote}"
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                 <div className="retro-card-yellow p-6">
                    <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2 border-b-4 border-retro-black pb-2">
                      <Users size={20} /> Squad
                    </h3>
                    <div className="space-y-4">
                      {members.map(member => {
                        const bal = balances[member.id];
                        return (
                          <div key={member.id} className="bg-white p-3 border-2 border-retro-black rounded-xl shadow-retro-small hover:-translate-y-1 transition-all">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 bg-retro-black text-white flex items-center justify-center font-black rounded-lg">
                                {member.avatar}
                              </div>
                              <div className="flex-1">
                                <div className="font-bold text-sm leading-none">{member.name}</div>
                                <div className="text-[9px] font-black tracking-widest text-retro-red uppercase">{member.badge}</div>
                              </div>
                              <div className={`text-[10px] font-black px-2 py-0.5 rounded border border-retro-black ${member.role === 'OWNER' ? 'bg-red-100' : 'bg-gray-100'}`}>
                                 {member.role}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-1 text-[10px] font-bold uppercase border-t-2 border-retro-black/5 pt-2">
                               <div className="text-gray-500">Balance:</div>
                               <div className={`text-right ${bal >= 0 ? 'text-green-600' : 'text-retro-red'}`}>
                                  ₹{Math.abs(Math.round(bal))}
                                  {bal >= 0 ? '+' : '-'}
                               </div>
                            </div>
                          </div>
                        );
                      })}
                      <button className="w-full border-2 border-dashed border-retro-black p-3 rounded-xl text-xs font-bold uppercase hover:bg-white transition-colors">
                        + Add Member
                      </button>
                    </div>
                 </div>

                 <div className="retro-card p-6 bg-white">
                    <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                       <CloudRain size={20} /> Local Vibes
                    </h3>
                    <div className="flex items-center justify-between">
                       <div>
                          <div className="text-4xl font-black">28°C</div>
                          <div className="text-xs font-bold text-gray-500 uppercase">Partly Cloudy / Chill</div>
                       </div>
                       <CloudRain size={40} className="text-blue-500" />
                    </div>
                 </div>

                 <div className="retro-card p-6 bg-white">
                    <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                       Mood Meter
                    </h3>
                    <div className="space-y-4">
                       <div className="flex justify-between text-xs font-black">
                          <span>LOW VIBES</span>
                          <span>MAX CHAOS</span>
                       </div>
                       <input 
                          type="range" 
                          min="0" max="100" 
                          value={mood} 
                          onChange={(e) => setMood(parseInt(e.target.value))}
                          className="w-full h-8 bg-transparent appearance-none cursor-pointer [&::-webkit-slider-runnable-track]:bg-gray-100 [&::-webkit-slider-runnable-track]:border-4 [&::-webkit-slider-runnable-track]:border-retro-black [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-10 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:bg-retro-red [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-retro-black [&::-webkit-slider-thumb]:rounded-md [&::-webkit-slider-thumb]:-mt-2"
                       />
                       <div className="text-center font-black uppercase text-retro-red">
                          {mood < 30 ? 'BORING' : mood < 70 ? 'STABLE' : 'LEGENDARY'}
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </Section>

          {/* Section: Spending */}
          <Section visible={activeSection === 'spending'}>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="retro-card p-8 bg-white">
                  <h2 className="text-3xl font-black uppercase mb-6 flex items-center gap-3">
                    <CreditCard size={32} /> Expense Splitter
                  </h2>
                  
                  <div className="space-y-4 mb-8">
                    {expenses.length === 0 ? (
                      <div className="text-center py-12 border-4 border-dashed border-gray-200 rounded-2xl">
                        <p className="font-bold text-gray-400 uppercase">No expenses yet. Stop Being Cheap.</p>
                      </div>
                    ) : (
                      expenses.map(exp => (
                        <div key={exp.id} className="flex items-center justify-between bg-retro-beige/30 p-4 border-2 border-retro-black rounded-xl hover:shadow-[4px_4px_0_#111] transition-all">
                          <div>
                            <div className="font-black uppercase">{exp.title}</div>
                            <div className="text-xs font-bold text-gray-500">PAID BY {members.find(m => m.id === exp.paidBy)?.name}</div>
                          </div>
                          <div className="text-xl font-black text-retro-red">₹{exp.amount}</div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <button 
                    onClick={() => {
                       const amount = Math.floor(Math.random() * 2000) + 100;
                       setExpenses([...expenses, {
                          id: Date.now().toString(),
                          title: 'Random Snack Run',
                          amount: amount,
                          paidBy: '1',
                          splitWith: members.map(m => m.id),
                          date: new Date().toISOString()
                       }]);
                    }}
                    className="retro-button w-full flex items-center justify-center gap-2"
                  >
                    <Plus size={24} /> Add Transaction
                  </button>
                </div>

                <div className="space-y-8">
                   <div className="retro-card p-8 bg-retro-yellow">
                      <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-retro-black pb-2">Status: Who Owes Who</h3>
                      <div className="space-y-4">
                        {Object.entries(balances).map(([id, balance]) => (
                          <div key={id} className="flex items-center justify-between font-bold bg-white p-3 border-2 border-retro-black rounded-xl">
                            <span>{members.find(m => m.id === id)?.name}</span>
                            <span className={balance >= 0 ? 'text-green-600' : 'text-retro-red'}>
                              {balance >= 0 ? 'Surplus' : 'Deficit'} ₹{Math.abs(Math.round(balance * 100) / 100)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 p-4 bg-retro-black text-white rounded-xl text-center">
                         <div className="text-xs font-black mb-1">TOTAL TRIP SPEND</div>
                         <div className="text-4xl font-black tracking-widest">₹{expenses.reduce((acc, curr) => acc + curr.amount, 0)}</div>
                      </div>
                   </div>
                </div>
             </div>
          </Section>

          {/* Section: Itinerary */}
          <Section visible={activeSection === 'itinerary'}>
             <div className="retro-card p-8 bg-white max-w-3xl mx-auto">
                <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-3">
                  <Calendar size={32} /> The Timeline
                </h2>
                
                <div className="space-y-6 relative before:content-[''] before:absolute before:left-4 before:top-4 before:bottom-4 before:w-1 before:bg-retro-black">
                   {itinerary.map((item, idx) => (
                     <div key={item.id} className="pl-12 relative group">
                        <div className="absolute left-[-2px] top-4 w-10 h-10 bg-retro-black text-white flex items-center justify-center font-black rounded-lg group-hover:bg-retro-red transition-colors z-10">
                           {item.time.split(':')[0]}
                        </div>
                        <div className="retro-card p-4 hover:translate-x-2 transition-transform">
                           <div className="flex justify-between items-start mb-2">
                             <div className="font-black text-xl text-retro-red uppercase leading-tight">{item.activity}</div>
                             <div className="text-xs font-black bg-gray-100 px-2 py-1 rounded border border-retro-black">{item.time}</div>
                           </div>
                           <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-2">
                              <MapIcon size={12} /> {item.location}
                           </div>
                           <p className="text-sm font-medium border-l-2 border-retro-black pl-2 italic text-gray-600">{item.notes}</p>
                        </div>
                     </div>
                   ))}
                   <button className="ml-12 w-full border-4 border-dashed border-gray-200 p-4 rounded-xl text-sm font-black uppercase text-gray-400 hover:border-retro-black hover:text-retro-black transition-all">
                     + Add Time Slot
                   </button>
                </div>
             </div>
          </Section>

          {/* Section: Checklist */}
          <Section visible={activeSection === 'checklist'}>
             <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="retro-card p-8 bg-white">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-black uppercase flex items-center gap-3">
                      <ClipboardCheck size={32} /> Packing
                    </h2>
                    <div className="w-16 h-16 bg-retro-yellow border-4 border-retro-black rounded-full flex items-center justify-center font-black text-xl">
                      {Math.round((checklist.filter(i => i.completed).length / checklist.length) * 100)}%
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {checklist.map(item => (
                      <label key={item.id} className="flex items-center gap-3 p-3 bg-retro-beige/30 border-2 border-retro-black rounded-xl cursor-pointer hover:bg-white transition-colors">
                        <input 
                           type="checkbox" 
                           checked={item.completed} 
                           onChange={() => setChecklist(checklist.map(i => i.id === item.id ? {...i, completed: !i.completed} : i))}
                           className="hidden"
                        />
                        <div className={`w-8 h-8 border-4 border-retro-black rounded-lg flex items-center justify-center transition-all ${item.completed ? 'bg-green-400' : 'bg-white'}`}>
                          {item.completed && <Check size={20} className="text-retro-black" />}
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold ${item.completed ? 'line-through text-gray-400' : ''}`}>{item.text}</div>
                          <div className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{item.category}</div>
                        </div>
                      </label>
                    ))}
                    
                    <div className="mt-6 flex gap-2">
                       <input type="text" placeholder="Add Item..." className="retro-input flex-1 text-sm pt-3 pb-3" />
                       <button className="retro-button p-3 flex items-center justify-center min-w-0">
                         <Plus size={20} />
                       </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                   <div className="retro-card-yellow p-8">
                      <h3 className="text-2xl font-black uppercase mb-4">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                         <Badge text="CLOTHES" color="bg-orange-300" />
                         <Badge text="DOCS" color="bg-blue-300" />
                         <Badge text="ELECTRONICS" color="bg-purple-300" />
                         <Badge text="SNACKS" color="bg-red-300" />
                      </div>
                      <div className="mt-8 p-4 bg-white border-2 border-retro-black rounded-xl">
                        <p className="text-sm font-bold uppercase italic">"Better carry extra underwear than extra regret."</p>
                      </div>
                   </div>
                </div>
             </div>
          </Section>

          {/* Section: Notes */}
          <Section visible={activeSection === 'notes'}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {notes.map(note => (
                   <div key={note.id} className={`retro-card p-6 ${note.color} relative transform -rotate-1 hover:rotate-0 transition-transform`}>
                      <button className="absolute top-4 right-4 text-retro-black/40 hover:text-retro-red">
                        <Trash2 size={18} />
                      </button>
                      <div className="font-black uppercase mb-4 text-xs border-b border-retro-black pb-1">Ref: Shared Note</div>
                      <div className="font-bold text-lg leading-tight">{note.content}</div>
                      <div className="mt-6 text-[10px] font-black text-gray-600 uppercase tabular-nums">Posted: {new Date(note.createdAt).toLocaleTimeString()}</div>
                   </div>
                 ))}
                 <button 
                  onClick={() => setNotes([...notes, {
                    id: Date.now().toString(),
                    content: 'New thought: hire a boat for sunset!',
                    color: ['bg-pink-200', 'bg-blue-200', 'bg-green-200'][Math.floor(Math.random() * 3)],
                    createdAt: new Date().toISOString()
                  }])}
                  className="retro-card p-6 bg-white border-dashed flex flex-col items-center justify-center gap-2 hover:bg-retro-beige transition-colors min-h-[180px]"
                 >
                    <Plus size={48} className="text-gray-300" />
                    <span className="font-black text-gray-400 uppercase">Sticky Note</span>
                 </button>
              </div>
          </Section>

          {/* Section: Locations */}
          <Section visible={activeSection === 'locations'}>
             <div className="max-w-3xl mx-auto space-y-6">
                <div className="retro-card p-8 bg-white">
                  <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-3">
                    <Navigation size={32} /> Pinboard
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {mapLinks.map(link => (
                       <a 
                        key={link.id} 
                        href={link.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-between p-4 bg-retro-beige/30 border-4 border-retro-black shadow-retro-small rounded-xl hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group"
                       >
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-retro-black border-2 border-retro-black rounded-lg flex items-center justify-center">
                                <Navigation size={20} className="text-white group-hover:animate-bounce" />
                             </div>
                             <div className="font-black uppercase">{link.name}</div>
                          </div>
                          <ExternalLink size={18} />
                       </a>
                     ))}
                     <button className="flex items-center justify-center py-4 border-4 border-dashed border-gray-200 rounded-xl font-bold uppercase text-gray-400 hover:border-retro-black hover:text-retro-black transition-all">
                        + New Pin
                     </button>
                  </div>
                </div>
                
                <div className="retro-card p-6 bg-retro-black text-white flex items-center gap-4">
                  <div className="p-3 bg-red-600 rounded-xl">
                    <Zap size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="font-black uppercase text-sm">Pro Tip</div>
                    <div className="text-xs font-bold text-gray-400">Offline maps? DOWNLOAD THEM NOW. DONT CRY LATER.</div>
                  </div>
                </div>
             </div>
          </Section>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-32 pb-12 px-4 border-t-8 border-retro-black bg-retro-yellow pt-12 relative overflow-hidden">
        <div className="pixel-bg absolute inset-0 opacity-10" />
        <div className="max-w-6xl mx-auto relative text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="text-left">
               <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">MINITRIP</h2>
               <p className="font-bold text-sm uppercase">Retro tools for modern adventures.</p>
            </div>
            <div className="flex gap-4">
              <SocialBtn icon={<Github size={20} />} />
              <SocialBtn icon={<Zap size={20} />} />
              <SocialBtn icon={<Settings size={20} />} />
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-black uppercase text-gray-600 mb-8">
            <a href="#" className="hover:text-retro-red">Terms of Chaos</a>
            <a href="#" className="hover:text-retro-red">Lost & Found</a>
            <a href="#" className="hover:text-retro-red">Privacy Void</a>
            <a href="#" className="hover:text-retro-red">Group Rules</a>
          </div>
          
          <div className="pt-8 border-t-4 border-retro-black/10">
             <div className="inline-block p-4 border-4 border-retro-black rounded-2xl bg-white shadow-retro-small rotate-1 mb-4">
                <span className="font-black uppercase">Built independently by Vilas K R</span>
             </div>
             <p className="text-[10px] font-black uppercase mt-4">© 2026 MINITRIP CLOUD SERVICES PVT LTD - ALL RIGHTS RESERVED - NO RETURNS</p>
          </div>
        </div>
      </footer>

      {/* Floating Toolbar (Mobile Optimized) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
         <div className="bg-retro-black px-6 py-4 rounded-full shadow-retro flex gap-6 text-white border-4 border-white">
            <button onClick={() => setActiveSection('spending')} className={activeSection === 'spending' ? 'text-retro-red scale-125 transition-all' : ''}>
               <CreditCard size={24} />
            </button>
            <button onClick={() => setActiveSection('itinerary')} className={activeSection === 'itinerary' ? 'text-retro-red scale-125 transition-all' : ''}>
               <Calendar size={24} />
            </button>
            <button onClick={() => setActiveSection('checklist')} className={activeSection === 'checklist' ? 'text-retro-red scale-125 transition-all' : ''}>
               <ClipboardCheck size={24} />
            </button>
            <button onClick={() => setActiveSection('notes')} className={activeSection === 'notes' ? 'text-retro-red scale-125 transition-all' : ''}>
               <StickyNote size={24} />
            </button>
         </div>
      </div>
    </div>
  );
}

function Section({ children, visible }: { children: React.ReactNode, visible: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Badge({ text, color, textColor = "text-retro-black" }: { text: string, color: string, textColor?: string }) {
  return (
    <div className={`${color} ${textColor} px-3 py-1 border-2 border-retro-black shadow-[2px_2px_0_#111] rounded-lg font-black text-[10px] uppercase tracking-wider`}>
      {text}
    </div>
  );
}

function NavBtn({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all font-black text-xs uppercase
        ${active 
          ? 'bg-retro-black text-white border-retro-black shadow-retro-small -translate-y-1' 
          : 'bg-white text-retro-black border-transparent hover:bg-gray-100'
        }
      `}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}

function SocialBtn({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="w-12 h-12 bg-white border-4 border-retro-black shadow-retro-small rounded-xl flex items-center justify-center hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
      {icon}
    </button>
  );
}
