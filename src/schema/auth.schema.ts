import z from 'zod';

//Use for Register form
export const RegisterBody = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
}).strict().superRefine(({confirmPassword, password}, ctx) => {
    if(confirmPassword !== password){
        ctx.addIssue({
            code:'custom',
            message: "Passwords do not match",
            path: ['confirmPassword']
        })
    }
})

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const RegisterResponse = z.object({
    data: z.object({
        user: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string(),
        }),
    }),
    message: z.string(),
})

export type RegisterResponseType = z.TypeOf<typeof RegisterResponse>;
//

//Use for Login form
export const LoginBody = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
}).strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginResponse = RegisterResponse

export type LoginResponseType = z.TypeOf<typeof LoginResponse>;
//

//
export const SlideSessionBody = z.object({}).strict()

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>

export const SlideSessionResponse = RegisterResponse

export type SlideSessionResponseType = z.TypeOf<typeof SlideSessionResponse>
//