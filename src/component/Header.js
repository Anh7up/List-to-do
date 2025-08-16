import Sort from "./Sort"
import Search from "./SearchInput"
import ButtonOpenForm from "./ButtonOpenForm"


export default function Header({onChange, onOpenAddForm, onSearch}) {
  return (
    <>
      <h1>Check list to do</h1>
      <div className="bar">
        <Sort onChange={onChange}/>
        <Search onSearch={onSearch} />
        <ButtonOpenForm onOpenAddForm={onOpenAddForm} />
      </div>
    </>
  );
}
