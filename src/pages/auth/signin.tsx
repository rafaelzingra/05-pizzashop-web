import { Helmet } from "react-helmet-async"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { signIn } from "@/api/signin"

type SigninForm = z.infer<typeof signinForm>

export function Signin() {    

    const { register, handleSubmit, formState: {isSubmitting} } = useForm<SigninForm>()

    const { mutateAsync: authenticate } = useMutation({
        mutationFn: signIn,

    })
    
    async function handleSignin(data: SigninForm) {
        try {
            await authenticate({email: data.email})
            toast.success('Enviamos um link de autenticação para seu email!')
        } catch {
            toast.error('Email inválido!')
        }
    }

    return (
        <>
            <Helmet title="login" />
            <div className="p-8">
                <Button variant={"ghost"} asChild className="absolute right-8 top-8">
                    <Link to={'/signup'}>Novo estabelecimento</Link>
                </Button>
                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Acessar Painel</h1>
                        <p className="text-sm text-muted-foreground">Acompanhe suas vendas pelo painel do parceiro</p>
                    </div>

                    <form onSubmit={handleSubmit(handleSignin)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>
                        <Button disabled={isSubmitting} type="submit" className="w-full">Acessar Painel</Button>
                    </form>
                </div>
            </div>
        </>
    )
}