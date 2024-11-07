import z from 'zod';

//Use for Register form
export const RegisterBody = z.object({
    email: z.string().email(),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(255)
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[\s!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character or a space" })
        .refine((password) => password.trim() === password, {
            message: "Password must not contain leading or trailing spaces",
        }),
    confirmPassword: z.string().trim().min(8, {
        message: "Password must be at least 8 characters long"
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