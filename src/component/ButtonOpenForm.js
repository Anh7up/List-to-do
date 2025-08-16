export default function ButtonOpenForm({onOpenAddForm}) {
    return (
        <button id="open-form" onClick={onOpenAddForm}>
          Add task
          <i className="fa-regular fa-pen-to-square" />
        </button>
    )
}