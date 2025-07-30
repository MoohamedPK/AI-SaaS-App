import { fetchBookmarkedSessions } from "@/actions/companion/Bookmarking/fetchBookmarkedSessions"
import AnimatedBookmarkedSessions from "./AnimatedBookmarkedSessions";

const BookmarkedSessions = async () => {

    const bookmarks = await fetchBookmarkedSessions();

  return (
    <AnimatedBookmarkedSessions bookmarks={bookmarks}/>
  )
}

export default BookmarkedSessions