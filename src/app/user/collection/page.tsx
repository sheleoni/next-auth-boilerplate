// 'use client'
// todo: prop interface

import {getServerSession} from "next-auth";
import getUserIceCream from "@/app/controllers/getUserIceCream";
import styles from './page.module.css';

export const dynamic = "force-dynamic"
const CollectionOverview = async () => {
    const session = await getServerSession();
    console.log(session, `user`);
    const userIceCreamCollection = await getUserIceCream();
    return (
        <>
            Your ice-cream collection:
            {
                userIceCreamCollection?.map((flavour: any, index: any): any => {
                    return (
                        <p key={index} className={styles.iceCreamItem}>
                            {flavour.name}
                        </p>
                    )
                })
            }

        </>
    )
}

export default CollectionOverview;
