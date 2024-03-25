import Link from "next/link";
import styles from './topmenu.module.css';

export default function TopMenuItem({title , pageRef} : {title:string , pageRef:string}) {
    return (
        <Link href={pageRef} className="w-120 text-center my-auto font-sans text-sm text-gray-500 mx-5 hover:font-bold">{title}</Link>
    );
}