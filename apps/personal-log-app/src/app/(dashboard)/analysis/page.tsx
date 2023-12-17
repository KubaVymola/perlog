import mongoClient from '@/lib/mongodb/client';
import React from 'react';

async function createLog() {
    await mongoClient.connect();
}

export default async function Page() {
    await createLog();
    return <div></div>;
}
