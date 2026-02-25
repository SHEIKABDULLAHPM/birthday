// Format: YYYY-MM-DDTHH:mm:ss
export const BIRTHDAY_DATE = "2026-02-25T02:09:46"; // Set to 2 AM on the birthday for better timezone handling
export const PASSWORD = "hbd"; // Simple password for now
export const WAITING_MESSAGE = "Something special is waiting for you... 🤫";
export const REVEAL_MESSAGE = "Happy Birthday! 🎉";

const basePathFromEnv = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const sanitizedBasePath = (() => {
    if (!basePathFromEnv || basePathFromEnv === "/") {
        return "";
    }
    const withoutTrailingSlash = basePathFromEnv.replace(/\/$/, "");
    return withoutTrailingSlash.startsWith("/")
        ? withoutTrailingSlash
        : `/${withoutTrailingSlash}`;
})();

// Base path for assets (must match next.config.ts basePath)
export const BASE_PATH = sanitizedBasePath;
export const BACKGROUND_MUSIC_URL = `${BASE_PATH}/music/mustafa-mustafa-a-r-rahman_TKGFhAet.mp3`;

const ASSET_BASE_PATH = `${BASE_PATH}/assets`;
const encodeFolder = (folder: string) => encodeURIComponent(folder).replace(/%2F/g, "/");

type PhotoEntry = { src: string; caption: string };
const createPhotoEntries = (folder: string, captions: string[]): PhotoEntry[] =>
    captions.map((caption, index) => ({
        src: `${ASSET_BASE_PATH}/${encodeFolder(folder)}/${index + 1}.jpg`,
        caption,
    }));

const createMediaEntries = (
    folder: string,
    files: string[],
    captions?: string[]
): PhotoEntry[] =>
    files.map((file, index) => ({
        src: `${ASSET_BASE_PATH}/${encodeFolder(folder)}/${file}`,
        caption: captions?.[index] ?? "",
    }));
export const BIRTHDAY_WISHES = [
    "Happy Birthday da Nanba! 🎂",
    "You’re not just my best friend, you’re my home 🤍",
    "Thank you for staying with me through everything 🌸",
    "Thank you for loving me at my worst and celebrating my best ✨",
    "I’m so lucky to have you in my life 🌷",
    "Forever grateful the universe  gave me you 💫"
];
// Categorized photos
export const MEMORY_CATEGORIES = [
    "Childhood",
    "Family",
    "School Friends",
    "College Friends",
    "Close Friends"
] as const;

export type MemoryCategory = typeof MEMORY_CATEGORIES[number];

const CHILDHOOD_CAPTIONS = Array(7).fill("");

const FAMILY_CAPTIONS = Array(8).fill("");

const SCHOOL_FRIENDS_CAPTIONS = Array(14).fill("");

const COLLEGE_FRIENDS_CAPTIONS = Array(9).fill("");

const CLOSE_FRIENDS_CAPTIONS = Array(15).fill("");

export const SORTED_MEMORY_PHOTOS: Record<MemoryCategory, PhotoEntry[]> = {
    "Childhood": createPhotoEntries("Child", CHILDHOOD_CAPTIONS),
    "Family": createPhotoEntries("Family", FAMILY_CAPTIONS),
    "School Friends": createPhotoEntries("School friends", SCHOOL_FRIENDS_CAPTIONS),
    "College Friends": createPhotoEntries("College friends", COLLEGE_FRIENDS_CAPTIONS),
    "Close Friends": createPhotoEntries("Close frnd", CLOSE_FRIENDS_CAPTIONS),
};

const SECRET_GALLERY_FILES = [
    "1.mp4",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.mp4",
   
];

export const SECRET_GALLERY = createMediaEntries("Secure", SECRET_GALLERY_FILES);

export const INSIDE_JOKES = [
    { setup: "Remember that time at the cafe?", punchline: "You spilled coffee on the stranger! ☕️" },
    { setup: "Why do we never study?", punchline: "Because we're too busy planning our future mansions! 🏰" },
    { setup: "Our spirit animal?", punchline: "A sloth on a sugar rush! 🦥" },
    { setup: "Who eats the last slice?", punchline: "YOU, always! 🍕" },
];
