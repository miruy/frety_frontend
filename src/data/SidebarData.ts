import {
    Bookmark,
    BookOpen, Guitar, ListMusic, Music2Icon, Send,
} from "lucide-react";

export const data = {
    navMain: [
        {
            title: "악보 전체보기",
            url: "/tabs",
            icon: ListMusic,
        },
        {
            title: "악보 제작하기",
            url: "/create-tab",
            icon: Music2Icon,
        },
        {
            title: "내가 제작한 악보",
            url: "/my-tabs",
            icon: BookOpen,
        },
        {
            title: "즐겨찾는 악보",
            url: "/favorite-tabs",
            icon: Bookmark,
        },
    ],
    navSecondary: [
        {
            title: "기타 코드 신청",
            url: "/apply-for-chord",
            icon: Guitar,
        },
        {
            title: "개선 및 추가기능 제안",
            url: "/feedback",
            icon: Send,
        },
    ],
    user: {
        name: "tester",
    },
}