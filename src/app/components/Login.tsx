import { useForm } from "react-hook-form"

const Login = () => {
  const {
    handleSubmit, 
    getValues, 
    register
  } = useForm();
  
  return (
    <>
      <form>
        <div>제목</div>
        <input />
      </form>
    </>
  )
}