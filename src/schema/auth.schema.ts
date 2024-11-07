import z from 'zod';

//Use for Register form
export const RegisterBody = z.object({
    email: z.string().email(),
    password: z.string().trim().min(6, {
        message: "Password must be at least 6 characters long"
    }).max(255),
    confirmPassword: z.string().trim().min(6, {
        message: "Password must be at least 6 characters long"
    }).max(255),
}).strict().superRefine(({confirmPassword, password}, ctx) => {
    if(confirmPassword !== password){
        ctx.addIssue({
            code:'custom',
            message: "Passwords do not match",
            path: ['confirmPassword']
        })
    }else if(password.trim() === "" || confirmPassword.trim() === ""){
        ctx.addIssue({
            code:'custom',
            message: "Password cannot be empty",
             path: ['confirmPassword', 'password']
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