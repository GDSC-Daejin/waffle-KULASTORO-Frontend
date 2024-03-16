interface props {
  buttonType: string,
  onClickEvent: () => void
}

const CalendarButton = ({buttonType, onClickEvent}: props) => {
  return (
    <>
      <button onClick={onClickEvent}>
        {buttonType==="Prev" ? <div>◀</div> : <div>▶</div>}
      </button>
    </>
  )
}

export default CalendarButton