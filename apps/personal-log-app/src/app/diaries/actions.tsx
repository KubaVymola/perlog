'use server';

import mongoClient from '@/lib/mongodb/client';
import Diary from '@/lib/mongodb/models/diary';
import { DiaryFormType } from '@/lib/types/diary-form';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addDiary(formData: DiaryFormType) {
    await mongoClient.connect();

    // TODO validate

    await Diary.create(formData);

    revalidatePath('/');
    redirect(`/diaries`);
}
