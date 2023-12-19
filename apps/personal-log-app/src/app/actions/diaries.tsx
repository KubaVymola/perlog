'use server';

import mongoClient from '@/lib/mongodb/client';
import Diary from '@/lib/mongodb/models/diary';
import { IDiary } from '@/lib/common/types';
import { revalidatePath } from 'next/cache';
import { RedirectType, redirect } from 'next/navigation';

export async function addDiary(
    diaryData: IDiary,
    email: string | null | undefined,
) {
    if (!email) return;

    await mongoClient.connect();

    await Diary.create({ ...diaryData, email });

    revalidatePath('/', 'layout');
    redirect(`/diaries`, RedirectType.push);
}

export async function updateDiary(
    id: string,
    diaryData: IDiary,
    email: string | null | undefined,
) {
    if (!email) return;

    await mongoClient.connect();

    await Diary.updateOne({ _id: id, email }, { ...diaryData, email });

    revalidatePath('/', 'layout');
    redirect(`/diaries`, RedirectType.push);
}

export async function deleteDiary(
    id: string,
    email: string | null | undefined,
) {
    if (!email) await mongoClient.connect();

    await Diary.deleteOne({ _id: id, email });

    revalidatePath('/', 'layout');
}
