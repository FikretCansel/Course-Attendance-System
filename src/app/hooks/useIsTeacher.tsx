import { auth } from '@/Firebase';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function useIsTeacher({ userId }: { userId?: string | undefined }): boolean {
    const [user, loading, error] = useAuthState(auth);
    const [isTeacher, setIsTeacher] = useState(false);

    useEffect(() => {
        if (loading) {
            return; // Optionally handle loading state
        }
        
        if (error) {
            console.error('Authentication error:', error);
            return; // Handle error accordingly
        }

        // User and userId check
        if (user?.uid && userId) {
            if (userId === user.uid) {
                setIsTeacher(true);
            } else {
                setIsTeacher(false);
            }
        } else {
            setIsTeacher(false); // User or userId is not available
        }
    }, [user, userId, loading, error]); // Added loading and error to dependencies

    return isTeacher;
}
