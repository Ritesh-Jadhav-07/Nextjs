export default async function UserProfile({ params }: any) {
    const { id } = await params;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl">
                Profile Page
                <span className="p-2 bg-orange-400 ml-1 rounded text-black">
                    {id}
                </span>
            </h1>
        </div>
    );
}
