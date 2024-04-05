import styled from 'styled-components';

interface props {
  buttonType: string;
  onClickEvent: () => void;
}

const Button = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 10px;
  width: 20px;
  cursor: pointer;
`;

const CalendarButton = ({ buttonType, onClickEvent }: props) => {
  return (
    <>
      <Button onClick={onClickEvent}>
        {buttonType === 'Prev' ? <div>◀</div> : <div>▶</div>}
      </Button>
    </>
  );
};

export default CalendarButton;
