import { ZodType, z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod' 
type formData = {
    amount:number;
}
function Page() {
  const schema : ZodType<formData> = z.object({
    amount:z.number().min(1000).max(70000),
  })

  const { register , handleSubmit , formState : {errors} } = useForm<formData>({resolver : zodResolver(schema)})

  const submitData = (data : formData) => {
    console.log("The Loan amount is : " ,data)
  }
  return (
    <div className="bg-slate-300 min-h-screen max-w-full pt-40" >
      <form  onSubmit={handleSubmit(submitData)} action="" className="flex flex-col items-center  ">
        
        <label htmlFor="">Amount :</label>
        <input type="number" {...register("amount" , {valueAsNumber:true})} />
        
        {errors.amount && <span className='text-red-500' > {errors.amount.message} </span> }
        <br />
        <input type="submit" className="bg-green-500 border-2 px-4 py-2  " />
      </form>
    </div>
  )
}

export default Page