export default function Sort({onChange}) {
    return (
        <div className="sort">
          <label htmlFor="task-sort">SORT</label>
            <select id="task-sort" onChange={(e) => onChange(e.target.value)}>
            <option value="" style={{ display: "none" }}>
              Chose option
            </option>
            <option value="a-z">Name A-Z</option>
            <option value="z-a">Name Z-A</option>
          </select>
        </div>
    )
}