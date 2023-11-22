'use server';

import mongoClient from '@/lib/mongodb/client';
import Log from '@/lib/models/log';
import { revalidatePath } from 'next/cache';

export async function addLog(formData: FormData) {
    await mongoClient.connect();

    await Log.create({
        data: formData.get('data'),
    });

    revalidatePath('/');
}
