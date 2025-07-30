

const BookmarkSkeleton = () => {
    return (
        <div className="mt-10 space-y-3 animate-pulse">
        <div className="h-6 w-1/3 bg-muted rounded" />
        <div className="space-y-2">
            {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 rounded bg-muted/40" />
            ))}
        </div>
        </div>
    );
}

export default BookmarkSkeleton