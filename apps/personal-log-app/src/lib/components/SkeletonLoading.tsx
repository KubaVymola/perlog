import { Skeleton } from '@nextui-org/react';
import React from 'react';

export default function SkeletonLoading() {
    return (
        <div className="w-full space-y-5 rounded-lg bg-slate-100 p-4">
            <Skeleton className="rounded-lg">
                <div className="bg-default-300 h-24 rounded-lg"></div>
            </Skeleton>
            <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="bg-default-200 h-3 w-3/5 rounded-lg"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="bg-default-200 h-3 w-4/5 rounded-lg"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                    <div className="bg-default-300 h-3 w-2/5 rounded-lg"></div>
                </Skeleton>
            </div>
        </div>
    );
}
