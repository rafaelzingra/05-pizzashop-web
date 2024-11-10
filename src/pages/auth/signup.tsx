import { Helmet } from "react-helmet-async"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Link } from "react-router-dom"

export function Signup() {

    const { register, handleSubmit, formState: {isSubmitting} } = useForm<SignupForm>()

    const signupForm = z.object({
        restaurantName: z.string(),
        managerName: z.string(),
        phone: z.string(),
        email: z.string().email(),
    })

    type SignupForm = z.infer<typeof signupForm>
    
    async function handlesignup(data: SignupForm) {
        try {
            console.log(data)            
            await new Promise(resolve => setTimeout(resolve,2000))
            toast.success('Dados enviados com sucesso!')
        } catch {
            toast.error('Algo deu errado, tente novamente mais tarde.')
        }
    }

    return (
        <>
            <Helmet title="cadastro" />
            <div className="p-8">
                <Button variant={"ghost"} asChild className="absolute right-8 top-8">
                    <Link to={'/signin'}>Fazer login</Link>
                </Button>
                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Criar conta gratis</h1>
                        <p className="text-sm text-muted-foreground">Seja um parceiro e comece suas vendas</p>
                    </div>

                    <form onSubmit={handleSubmit(handlesignup)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
                            <Input id="restaurantName" type="text" {...register('restaurantName')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="managerName">Seu Nome</Label>
                            <Input id="managerName" type="text" {...register('managerName')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Seu celular</Label>
                            <Input id="phone" type="tel" {...register('phone')} />
                        </div>
                        <Button disabled={isSubmitting} type="submit" className="w-full">Finalizar cadastro</Button>
                        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                            Ao continuar, você concorda com os nossos
                            <a href="" className="underline underline-offset-4"> termos de serviço</a>
                            {''} e {''}
                            <a href="" className="underline underline-offset-4"> políticas de privacidade</a>.
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}