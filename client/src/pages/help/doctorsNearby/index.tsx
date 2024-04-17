import SafeSpaceLogoBanner from '../../../../components/SafeSpaceLogoBanner';
import Link from 'next/link';

export default function DoctorsNearby() {
  return (
    <div className="flex flex-col items-center justify-between pt-20 bg-gradient-to-r from-background-start-rgb to-background-end-rgb min-h-screen">
      <SafeSpaceLogoBanner />
      <h2 className="text-3xl text-foreground-rgb mb-4">Nearby Doctors</h2>
      <ul className="text-foreground-rgb">
        {/* Mock data, replace with actual fetched data */}
        <li>Dr. M Scott - 947-243-1234</li>
        <li>Dr. Jim - 947-243-1233</li>
        <li>Dr. Pam - 947-243-1211</li>
      </ul>
      <Link href="/">
        <a className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go Home
        </a>
      </Link>
    </div>
  );
}