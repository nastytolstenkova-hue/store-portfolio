

export default function InputSearcher(){
  return (
    <div className="relative w-full">
        
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        
        <input 
          type="text" 
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full bg-white/50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all" 
          placeholder="Search products..." 
        />
      </div>
    
  )
}