// Format: YYYY-MM-DDTHH:mm:ss
export const BIRTHDAY_DATE = "2026-02-13T02:18:50";
export const PASSWORD = "hbd"; // Simple password for now
export const WAITING_MESSAGE = "Something special is waiting for you... 🤫";
export const REVEAL_MESSAGE = "Happy Birthday! 🎉";
export const BACKGROUND_MUSIC_URL = "/music/birthday-song.mp3"; // Placeholder

export const BIRTHDAY_WISHES = [
    "Happy Birthday! 🎂",
    "To my partner in crime... 🕵️‍♀️",
    "The keeper of my secrets... 🤫",
    "And the friend who knows me best 👯‍♀️",
    "May your day be filled with magic! ✨",
    "Here's to another year of us! 🥂"
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

export const SORTED_MEMORY_PHOTOS: Record<MemoryCategory, Array<{ src: string; caption: string }>> = {
    "Childhood": [
        { src: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1000", caption: "Little Explorer 🧸" },
        { src: "https://images.unsplash.com/photo-1602685989267-33f7d1f561ee?q=80&w=1000", caption: "First Steps 👣" },
        { src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000", caption: "Muddy Knees 🏃" },
        { src: "https://images.unsplash.com/photo-1534330207526-9e4e757788e8?q=80&w=1000", caption: "Birthday Cake 🎂" },
        { src: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=1000", caption: "Playground Fun 🛝" },
        { src: "https://images.unsplash.com/photo-1516733968668-dbdce39c4651?q=80&w=1000", caption: "The Bike Ride 🚲" },
        { src: "https://images.unsplash.com/photo-1566004100434-373196f01986?q=80&w=1000", caption: "Sleepovers 🌙" },
        { src: "https://images.unsplash.com/photo-1491753182158-456108b89d6e?q=80&w=1000", caption: "Ice Cream Days 🍦" },
        { src: "https://images.unsplash.com/photo-1536337005238-94b997371b40?q=80&w=1000", caption: "School Play 🎭" },
        { src: "https://images.unsplash.com/photo-1544652478-6653e09f9039?q=80&w=1000", caption: "Besties Since Day 1 👶" }
    ],
    "Family": [
        { src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000", caption: "Family Picnic 🧺" },
        { src: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1000", caption: "Dad's Favorite 👨‍👧" },
        { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000", caption: "Mom's Cooking 🍲" },
        { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000", caption: "Game Night 🎲" },
        { src: "https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=1000", caption: "Holiday Trips ✈️" },
        { src: "https://images.unsplash.com/photo-1570966455648-936d5069f52b?q=80&w=1000", caption: "Sibling Wars ⚔️" },
        { src: "https://images.unsplash.com/photo-1567168539593-59673ab0e56d?q=80&w=1000", caption: "Diwali 🪔" },
        { src: "https://images.unsplash.com/photo-1596464716127-f9a8291f03d4?q=80&w=1000", caption: "Eid Celebrations 🌙" },
        { src: "https://images.unsplash.com/photo-1575276336594-e3532c2865b2?q=80&w=1000", caption: "Cousin Gang 👯" },
        { src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1000", caption: "Home Sweet Home 🏠" }
    ],
    "School Friends": [
        { src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1000", caption: "Class Bunkers 📚" },
        { src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000", caption: "Lunch Break Gang 🍕" },
        { src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000", caption: "Graduation Day 🎓" },
        { src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000", caption: "Study Group? Nope. 🎮" },
        { src: "https://images.unsplash.com/photo-1607519156683-1496a7923762?q=80&w=1000", caption: "Sports Day 🏅" },
        { src: "https://images.unsplash.com/photo-1524673450801-b5aa9b84000c?q=80&w=1000", caption: "Annual Function 💃" },
        { src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1000", caption: "Morning Assembly 😴" },
        { src: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?q=80&w=1000", caption: "Teachers Day 🍎" },
        { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000", caption: "Last Benchers 🤘" },
        { src: "https://images.unsplash.com/photo-1463130497551-789047970d4f?q=80&w=1000", caption: "School Bus Memories 🚌" }
    ],
    "College Friends": [
        { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000", caption: "Orientation Day 🎓" },
        { src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000", caption: "Late Night Study (Not) ☕️" },
        { src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1000", caption: "Campus Life 🏫" },
        { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000", caption: "Fest Vibes 🎸" },
        { src: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=1000", caption: "Canteen Chilling 🍔" },
        { src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000", caption: "Group Projects 😫" },
        { src: "https://images.unsplash.com/photo-1534551767192-78b0bad9526e?q=80&w=1000", caption: "Weekend Trips 🚗" },
        { src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000", caption: "Hostel Life 🍜" },
        { src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000", caption: "Farewell 😢" },
        { src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000", caption: "Convocation 🎓" }
    ],
    "Close Friends": [
        { src: "https://images.unsplash.com/photo-1531061803279-8d7681d454c6?q=80&w=1000", caption: "Real Ones 💖" },
        { src: "https://images.unsplash.com/photo-1655198278275-e877e8db1ddb?q=80&w=1000", caption: "Forever & Always ♾️" },
        { src: "https://images.unsplash.com/photo-1529139574466-a302d2d3f524?q=80&w=1000", caption: "Crazy Nights 🌃" },
        { src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000", caption: "Movie Marathons 🍿" },
        { src: "https://images.unsplash.com/photo-1498642220461-9c1dd9112469?q=80&w=1000", caption: "Shopping Sprees 🛍️" },
        { src: "https://images.unsplash.com/photo-1525010640167-ccba4cb12356?q=80&w=1000", caption: "Gossip Sessions ☕️" },
        { src: "https://images.unsplash.com/photo-1516654709848-18eaf34149f0?q=80&w=1000", caption: "Beach Days 🏖️" },
        { src: "https://images.unsplash.com/photo-1525026198548-4baa812f1183?q=80&w=1000", caption: "Long Drives 🚘" },
        { src: "https://images.unsplash.com/photo-1574279606130-09958dc756f7?q=80&w=1000", caption: "Birthday Bashes 🎂" },
        { src: "https://images.unsplash.com/photo-1530047625168-4b29ebf17b6d?q=80&w=1000", caption: "Just Us 👯‍♀️" }
    ]
};

export const INSIDE_JOKES = [
    { setup: "Remember that time at the cafe?", punchline: "You spilled coffee on the stranger! ☕️" },
    { setup: "Why do we never study?", punchline: "Because we're too busy planning our future mansions! 🏰" },
    { setup: "Our spirit animal?", punchline: "A sloth on a sugar rush! 🦥" },
    { setup: "Who eats the last slice?", punchline: "YOU, always! 🍕" },
];
