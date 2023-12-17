'use server';

import mongoClient from '@/lib/mongodb/client';
import Diary from '@/lib/mongodb/models/diary';
import { IDiary } from '@/lib/common/types';
import { revalidatePath } from 'next/cache';
import { RedirectType, redirect } from 'next/navigation';

export async function addDiary(formData: IDiary) {
    await mongoClient.connect();

    await Diary.create(formData);

    revalidatePath('/', 'layout');
    redirect(`/diaries`, RedirectType.push);
}

export async function updateDiary(id: string, formData: IDiary) {
    await mongoClient.connect();

    await Diary.updateOne({ _id: id }, formData);

    revalidatePath('/', 'layout');
    redirect(`/diaries`, RedirectType.push);
}

export async function deleteDiary(id: string) {
    await mongoClient.connect();

    await Diary.deleteOne({ _id: id });

    revalidatePath('/', 'layout');
}
