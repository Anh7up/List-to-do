export default function Search({onSearch}) {
    return (
        <input 
        placeholder="Search..." 
        id="search-task" 
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        />
)
}