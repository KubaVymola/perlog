'use server';

import mongoClient from '@/lib/mongodb/client';
import Diary from '@/lib/models/diary';
import { FormData } from '@/lib/components/types/DiaryFormTypes';
import { revalidatePath } from 'next/cache';

export async function addDiary(formData: FormData) {
    await mongoClient.connect();

    // TODO validate

    await Diary.create(formData);

    revalidatePath('/');
}
