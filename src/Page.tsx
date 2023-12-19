import { ZodType, z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod' 
type formData = {
    amount:number;
    month:number;
}
function Page() {
  const schema : ZodType<formData> = z.object({
    amount:z.number().min(1000).max(70000),
    month:z.number().min(12).max(40),
  })

  const { register , handleSubmit , formState : {errors} } = useForm<formData>({resolver : zodResolver(schema)})

  const submitData = (data : formData) => {
    console.log("Submitted Successfully : ",data)
  }
  return (
    <div className="bg-slate-300 min-h-screen max-w-full pt-40" >
      <form  onSubmit={handleSubmit(submitData)} action="" className="flex flex-col items-center  ">
        
        <label htmlFor="">Amount :</label>
        <input type="number" {...register("amount" , {valueAsNumber:true})} />
        {errors.amount && <span className='text-red-500' > {errors.amount.message} </span> }

        <label htmlFor="">Number of Months :</label>
        <input type="number" {...register("month" , {valueAsNumber:true})} />
        {errors.month && <span className='text-red-500' > {errors.month.message} </span> }
        <br />
        <input type="submit" className="bg-green-500 border-2 px-4 py-2  " />
      </form>
    </div>
  )
}

export default Page