import React from 'react';
import { FormUI } from './FormUI';

import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const CardUI = ({data, handleSubmit})  => {
  return (
    <Card className="w-[300px] sm:w-[350px]">
      <CardHeader>
        <CardTitle>Регистрация сотрудников</CardTitle>
        <CardDescription>приход и уход сотрудников на работу</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <FormUI data={data} handleSubmit={handleSubmit} />
        </div>
      </CardContent>
    </Card>
  )
}
