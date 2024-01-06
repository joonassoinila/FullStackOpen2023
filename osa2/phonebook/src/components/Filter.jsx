const Filter = ({text,newFilter,handleFilterChange}) =>{
    return(
      <div>
        {text}
        <input value={newFilter} onChange={handleFilterChange}></input>
      </div>
    )
  }
  export default Filter