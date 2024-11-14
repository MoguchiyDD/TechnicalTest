'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

const formSchema = z.object({
  username: z.string()
  .min(1, { message: 'Обязательное поле' })
  .regex(/^[a-zA-Z0-9_]+$/, { message: 'Допустимые символы a-z, A-Z, цифры и _' }),
})

export const FormUI = ({data, handleSubmit}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    }
  })

  useEffect(() => {
    if (data) {
      form.reset({ username: data.username });
    }
  }, [data, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя пользователя</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full uppercase" id="timekeeping-confirm-btn" type="submit">
            Подтвердить
          </Button>
        </div>
      </form>
    </Form>
  );
}
