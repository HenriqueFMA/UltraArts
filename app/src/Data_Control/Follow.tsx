import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { firestore } from '../Screens/FireBase/firebaseConfig';

async function toggleFollow(followerId: string, followingId: string): Promise<void> {
    const followRef = doc(firestore, `Users/${followingId}/Followers`, followerId);
    const docSnap = await getDoc(followRef);

    if (docSnap.exists()) {
        await deleteDoc(followRef);
        console.log('Deixou de seguir');
    } else {
        await setDoc(followRef, { 
            followerId: followerId,
            followedAt: new Date()
        });
        console.log('Seguindo');
    }
}
export { toggleFollow };

async function getFollowersCount(userId: string): Promise<number> {
    const followersCollectionRef = collection(firestore, `Users/${userId}/Followers`);
    const followerDocs = await getDocs(followersCollectionRef);

    return followerDocs.size;
}
export { getFollowersCount };

async function getFollowingCount(userId: string): Promise<number> {
    const followingCollectionRef = collection(firestore, `Users/${userId}/Following`);
    const followingDocs = await getDocs(followingCollectionRef);

    return followingDocs.size;
}
export { getFollowingCount };
