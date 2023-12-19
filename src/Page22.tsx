import { ZodType, z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod' 
type formData = {
    firstName:string;
    lastName:string;
    email:string;
    age:number;
    password:string;
    confirmPassword:string;
}
function Page() {
  const schema : ZodType<formData> = z.object({
    firstName:z.string().min(2).max(30),
    lastName:z.string().min(2).max(30),
    email:z.string().email(),
    age:z.number().min(18).max(70),
    password:z.string().min(8).max(20),
    confirmPassword:z.string().min(8).max(20),
  }).refine((data)=> data.password === data.confirmPassword ,{
    message:"Passwords does not match",
    path:["confirmPassword"],
  })

  const { register , handleSubmit , formState : {errors} } = useForm<formData>({resolver : zodResolver(schema)})

  const submitData = (data : formData) => {
    console.log("It worked : " ,data)
  }
  return (
    <div className="bg-slate-300 min-h-screen max-w-full pt-40" >
      <form  onSubmit={handleSubmit(submitData)} action="" className="flex flex-col items-center  ">
        <label htmlFor="">First Name :</label>
        <input type="text" {...register("firstName")} />
        
        {errors.firstName && <span className='text-red-500' > {errors.firstName.message} </span> }

        <label htmlFor="">Last Name :</label>
        <input type="text" {...register("lastName")} />
        <label htmlFor="">Email :</label>
        <input type="email" {...register("email")} />
        <label htmlFor="">Age :</label>
        <input type="number" {...register("age" , {valueAsNumber:true})} />
        <label htmlFor="">Password :</label>
        <input type="password" {...register("password")} />
        <label htmlFor="">Confirm Password :</label>
        <input type="password" {...register("confirmPassword")} />
        <br />
        <input type="submit" className="bg-green-500 border-2 px-4 py-2  " />
      </form>
    </div>
  )
}

export default Page