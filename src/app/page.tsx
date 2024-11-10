import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Todoアプリへようこそ！</h1>
      <p className="text-gray-700">タスク管理を簡単に行いましょう。</p>
      <Link href="/todo" legacyBehavior>
        <a className="px-6 py-3 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition">Todoページへ</a>
      </Link>
    </div>
  );
}
