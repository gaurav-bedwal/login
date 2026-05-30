export interface Memory {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  category: 'gallery' | 'timeline' | 'carousel' | 'all';
}

export interface LoveReason {
  id: number;
  title: string;
  preview: string;
  detail: string;
  iconName: string; // Dynamic icon reference
}

export interface LoveConfig {
  girlfriendName: string;
  anniversaryDate: string; // ISO format
  tagline: string;
  heroSubheading: string;
  letterMessage: string;
  favorites: {
    photo: { title: string; desc: string; image: string };
    moment: { title: string; desc: string; image: string };
    song: { title: string; artist: string; desc: string; audioUrl: string };
    memory: { title: string; desc: string; image: string };
    dream: { title: string; desc: string; image: string };
  };
  promises: string[];
  reasons: LoveReason[];
  memories: Memory[];
}

export const loveConfig: LoveConfig = {
  girlfriendName: "Deepika",
  anniversaryDate: "2025-05-12T00:00:00", // Proposed and Accepted (Anniversary)
  tagline: "To The Most Beautiful Girl In The World",
  heroSubheading: "You are my favorite chapter in life, and my favorite person in the entire universe.",
  letterMessage: `Dear gaurav jii,

Aapko yaad hai aapne khushi se bola tha ki Deepika se baat krwa de, vese to ek baar nhi kayi baar bola tha. Aur jb usne mujhe bola ki tumhe mere se baat krni hai, to mujhe kabhi nhi lgta tha ki humari kuch asi bonding bhi banegi. Pr bonding too chordo, aaj ki date me aapke bina rhee hi nhi skti.

Actually mene aapse as a friend baat kru thi, pr vo dosti naa jane kabh pyaar me badal gyi. Fir mujhe tum is duniya ke best person, best partner, best love lgne lge.

Jb me apse pheli baar mili, too vo movement toda awkward tha but suth cute bhi tha. Or dusri mulakat me jese aapne mujhe sambhala, jis trha, too me smj gyi ki aap hi vo insaan ho jiske sath mera future secure hai, mai safe hu or ek ache partner k hath mai hu.

Or baby, jb apne mujhse kuch time ke liye baat band krdi thi, vo mere liye sbse worst phase tha, or mene decide kr liya tha ki abh me apse kabhi baat nhi krungi. But jb apka ek raat call aya, too me sb bhul gyi or chup chap baat kr li. But fir bhi mere dil me ek kami si thi ki kuch shi nhi hai, or mujhe fir aapse dubara pyar hua.....

Aur jese khete hai ki jb hume apna life partner milta hai, too hume usse 2 baar pyar hota hai, or vese hi mujhe aapse 2 baar pyar hua. Vese too 2 baar kha, mujhe too kayi baar aapse hi pyar hua hai......

Vese mene suna hai ki chote mote ladaai jhagodo se pyaar aur bhi jyada majboot hota hai, or aaj me ye feel krti hu ki ye baat 100% sach hai, qki abh too humari love language hi ldaai hai. Agar ldaai na ho humari din me, to din adhura adhura lgta hai......

Or aaj jo mene is letter me likha hai, vo too kuch bhi nhi hai meri feelings ke aage. Mtlb itna kuch feel krti hu, itna pyar krti hu ki explain nhi kr skti......

I love you ever and forever. Humesha mera sath dene ke liye, or mujhe itna pyaar krne ke liye, or mera itna dhyan rakhne ke liye... thank you soooo much......

Again, I love you.
❤️ Deepika`,
  favorites: {
    photo: {
      title: "Your Sweetest Smile",
      desc: "This picture captures the exact way you light up whenever you look at me. It's my absolute favorite view in the world.",
      image: "/images/image2.jpg" // Green dress smiling
    },
    moment: {
      title: "Proposed & Accepted",
      desc: "On May 12, 2025, I told you how I felt, you said yes, and our hands locked in a promise of forever. The day everything changed.",
      image: "/images/image3.jpg" // Red saree front
    },
    song: {
      title: "Perfect",
      artist: "Ed Sheeran",
      desc: "Because every time I look at you, I see my future in your eyes, and in this song, our feelings are perfectly expressed.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    memory: {
      title: "Our First Conversation",
      desc: "Talking until 4 AM on February 24, 2025. Finding someone who understood my silent thoughts and made me laugh so easily.",
      image: "/images/image4.jpg" // White dress tree
    },
    dream: {
      title: "Traveling Swiss Alps",
      desc: "Sitting in a cozy cabin overlooking snow-capped peaks, sipping hot cocoa with you by a crackling fireplace.",
      image: "/images/image5.jpg" // Lavender dress
    }
  },
  promises: [
    "I promise to always listen to you with an open heart and an open mind, even when we disagree.",
    "I promise to support your wildest dreams, hold your hand in the storms, and lift you up when you are tired.",
    "I promise to keep choosing you, day after day, in every situation, without a single doubt.",
    "I promise to make you laugh whenever you are sad and to protect the smile that makes my world spin.",
    "I promise to grow alongside you, to build a future full of peace, trust, and endless laughter.",
    "I promise to cherish the small things—making you tea, holding your hand, and kissing your forehead before we sleep."
  ],
  reasons: [
    {
      id: 1,
      title: "Your Heartwarming Smile",
      preview: "It instantly chases away my darkest days.",
      detail: "The moment you smile, my entire world lights up. It is a magical curve that sets everything straight, carrying a warmth that calms my anxious heart and makes me feel incredibly safe.",
      iconName: "Smile"
    },
    {
      id: 2,
      title: "Your Pure Kindness",
      preview: "The gentle way you care for everyone around you.",
      detail: "You possess a rare, beautiful soul that always sees the good in people. The empathy, patience, and absolute grace you extend to everyone you meet inspires me to be a better person every single day.",
      iconName: "Heart"
    },
    {
      id: 3,
      title: "Your Unwavering Support",
      preview: "You believe in me even when I doubt myself.",
      detail: "You are my biggest cheerleader and my anchor. Whenever I face setbacks or feel lost, your belief in my potential gives me the strength to stand tall and keep pushing forward.",
      iconName: "Shield"
    },
    {
      id: 4,
      title: "Your Beautiful Eyes",
      preview: "I get lost in them every single time.",
      detail: "Your eyes speak a language of their own. Looking into them is like staring at a quiet night sky—deep, calming, and filled with a universe of love that I never want to stop exploring.",
      iconName: "Sparkles"
    },
    {
      id: 5,
      title: "Your Adorable Laugh",
      preview: "My absolute favorite sound in the universe.",
      detail: "Your laugh is musical, infectious, and pure. It is the melody that plays in my head when the world gets too loud. Just hearing it makes me want to tell silly jokes forever.",
      iconName: "Music"
    },
    {
      id: 6,
      title: "Your Silly Side",
      preview: "How we can act completely crazy together.",
      detail: "I love that with you, I can strip away all seriousness. We can make funny faces, talk in weird voices, and dance like goofballs without any judgment. You are my ultimate comfort zone.",
      iconName: "Ghost"
    },
    {
      id: 7,
      title: "Your Brilliant Mind",
      preview: "Our deep late-night conversations.",
      detail: "You are as smart and intellectually engaging as you are beautiful. I cherish our hours-long discussions about life, philosophy, science, and dreams where we connect on a spiritual level.",
      iconName: "Brain"
    },
    {
      id: 8,
      title: "Your Gentleness",
      preview: "The soothing peace you bring into my life.",
      detail: "When the storms of life rage, you are my sanctuary. Your voice, your touch, and your presence have a grounding quality that restores my inner peace instantly.",
      iconName: "CloudSun"
    },
    {
      id: 9,
      title: "Your Passion for Life",
      preview: "The drive and enthusiasm you have for your dreams.",
      detail: "Seeing you talk about the things you love with glowing eyes makes my heart swell. Your dedication and ambition are incredibly attractive and motivating.",
      iconName: "Flame"
    },
    {
      id: 10,
      title: "The Way You Hold My Hand",
      preview: "A simple gesture that makes me feel invulnerable.",
      detail: "When our fingers interlock, a silent promise passes between us. It tells me that we are in this together, and as long as I have your hand in mine, we can conquer anything.",
      iconName: "HandHeart"
    },
    {
      id: 11,
      title: "Your Incredible Patience",
      preview: "How you understand and guide me.",
      detail: "I know I am not always easy to deal with, but you handle my moods and flaws with such sweet, endless patience. You never give up on me, and for that, I am endlessly grateful.",
      iconName: "Hourglass"
    },
    {
      id: 12,
      title: "Your Nurturing Nature",
      preview: "How you check up on me and keep me safe.",
      detail: "Whether it is making sure I have eaten, tucking me in when I am sick, or reminding me to rest, your love shows in these beautiful, protective daily details.",
      iconName: "Coffee"
    },
    {
      id: 13,
      title: "Your Creative Soul",
      preview: "The artistic perspective you bring to the world.",
      detail: "You find beauty in places others overlook. Your creative touch—whether in your thoughts, your personal style, or your dreams—makes my life infinitely more colorful.",
      iconName: "Palette"
    },
    {
      id: 14,
      title: "Your Forgiving Heart",
      preview: "The soft grace with which you resolve conflicts.",
      detail: "You do not hold onto grudges or allow small arguments to dim our love. You communicate with mature vulnerability, and your capacity to forgive is a testament to your deep love.",
      iconName: "Sun"
    },
    {
      id: 15,
      title: "The Way You Say My Name",
      preview: "It sounds like poetry from your lips.",
      detail: "Nobody calls my name the way you do. The soft, sweet cadence in your voice when you address me makes my heart skip a beat every single time.",
      iconName: "Feather"
    },
    {
      id: 16,
      title: "Your Inner Strength",
      preview: "Your quiet resilience through difficult times.",
      detail: "Behind your soft exterior lies an iron will and immense strength. You have faced life's challenges with a quiet courage that blows me away and makes me respect you deeply.",
      iconName: "Crown"
    },
    {
      id: 17,
      title: "How You Look When Sleepy",
      preview: "The absolute cutest and most innocent version of you.",
      detail: "When you rub your eyes and speak in that cute, sleepy voice, my heart melts completely. It's the most raw, innocent, and beautiful side of you, and I feel blessed to see it.",
      iconName: "Moon"
    },
    {
      id: 18,
      title: "Our Shared Inside Jokes",
      preview: "Giggles that only make sense to the two of us.",
      detail: "We have built a secret language over time—words, glances, and memories that can make us burst out laughing in a crowded room. It's a universe built just for two.",
      iconName: "Laugh"
    },
    {
      id: 19,
      title: "Your Sense of Style",
      preview: "You look stunning in absolutely anything.",
      detail: "Whether you are in a messy bun and sweatpants or dressed up elegantly, your natural poise and beauty radiate. You carry yourself with a premium elegance that is breathtaking.",
      iconName: "Gem"
    },
    {
      id: 20,
      title: "Because You Are YOU",
      preview: "Simply because you exist in this world.",
      detail: "Ultimately, I love you because you are Deepika. You are the perfect puzzle piece to my soul, my companion, my best friend, and my lover. There is no one else like you, and there never will be.",
      iconName: "Infinity"
    }
  ],
  memories: [
    {
      id: 1,
      title: "Our First Conversation",
      date: "Feb 24, 2025",
      description: "It started with a simple message, and before we knew it, we had spoken until 4 AM. The connection was instant and deep.",
      image: "/images/image1.jpg",
      category: "timeline"
    },
    {
      id: 2,
      title: "Our First Meet",
      date: "March 2025",
      description: "Meeting you in person for the very first time. Seeing your face, hearing your real voice—my heart knew immediately.",
      image: "/images/image2.jpg",
      category: "timeline"
    },
    {
      id: 3,
      title: "Proposed & Accepted",
      date: "May 12, 2025",
      description: "The unforgettable day I proposed and you accepted. Our hands locked, promising to share this life together.",
      image: "/images/image3.jpg",
      category: "all"
    },
    {
      id: 4,
      title: "Your Sweetest Glance",
      date: "May 20, 2025",
      description: "A candid portrait showing the soft warmth in your eyes. This is the exact gaze that makes me feel completely at peace.",
      image: "/images/image4.jpg",
      category: "gallery"
    },
    {
      id: 5,
      title: "That Radiant Portrait",
      date: "June 05, 2025",
      description: "Captured standing gracefully. The absolute personification of elegance, style, and natural beauty.",
      image: "/images/image5.jpg",
      category: "gallery"
    },
    {
      id: 6,
      title: "Serenity Under the Trees",
      date: "June 15, 2025",
      description: "A gorgeous shot of you next to the trees. You look like a painting, blending perfectly with the calm nature.",
      image: "/images/image4.jpg",
      category: "all"
    },
    {
      id: 7,
      title: "Stunning in Red Saree",
      date: "July 02, 2025",
      description: "You in a gorgeous red saree, looking incredibly elegant and beautiful. One of my favorite pictures of you.",
      image: "/images/image1.jpg",
      category: "gallery"
    },
    {
      id: 8,
      title: "A Happy Smile",
      date: "July 18, 2025",
      description: "That bright, gorgeous smile that instantly makes my day a hundred times better. Never stop smiling like this.",
      image: "/images/image2.jpg",
      category: "timeline"
    },
    {
      id: 9,
      title: "Elegance Redefined",
      date: "August 10, 2025",
      description: "Standing in front of the rustic wall, looking like a professional model. Your style and poise are unmatched.",
      image: "/images/image5.jpg",
      category: "gallery"
    },
    {
      id: 10,
      title: "Gaze of Infinity",
      date: "September 05, 2025",
      description: "Looking forward with a quiet, thoughtful expression. A portrait that speaks a thousand unspoken words.",
      image: "/images/image3.jpg",
      category: "carousel"
    },
    {
      id: 11,
      title: "Peaceful Reflections",
      date: "September 24, 2025",
      description: "A simple, candid snapshot capturing your natural grace and beautiful, calm presence.",
      image: "/images/image4.jpg",
      category: "gallery"
    },
    {
      id: 12,
      title: "Our Milestone Month",
      date: "October 12, 2025",
      description: "Five months since the proposal. Celebrating the growing depth of our bond and the memories we keep building.",
      image: "/images/image1.jpg",
      category: "timeline"
    },
    {
      id: 13,
      title: "Captivating and Pure",
      date: "November 08, 2025",
      description: "Smiling against the vibrant backdrop. You radiate a joy and positive energy that fills the room.",
      image: "/images/image2.jpg",
      category: "gallery"
    },
    {
      id: 14,
      title: "A Golden Hour Portrait",
      date: "December 05, 2025",
      description: "The sunlight catching your hair and face, highlighting your perfect features. Simply breathtaking.",
      image: "/images/image3.jpg",
      category: "all"
    },
    {
      id: 15,
      title: "Soft Lavender Grace",
      date: "December 22, 2025",
      description: "Wearing that lovely dress. You look so sweet, gentle, and absolutely charming.",
      image: "/images/image5.jpg",
      category: "gallery"
    },
    {
      id: 16,
      title: "Sunshine in a Frame",
      date: "January 10, 2026",
      description: "A lovely photo of you out in the greenery. You bring warmth and life to any place you step into.",
      image: "/images/image4.jpg",
      category: "gallery"
    },
    {
      id: 17,
      title: "Pure Simplicity",
      date: "February 04, 2026",
      description: "Proof that you don't need any complex backdrops or styling—your natural beauty shines brightest of all.",
      image: "/images/image2.jpg",
      category: "gallery"
    },
    {
      id: 18,
      title: "Your Gentle Demeanor",
      date: "February 24, 2026",
      description: "One year since our very first conversation. Reflecting on how a single message turned into my greatest blessing.",
      image: "/images/image1.jpg",
      category: "carousel"
    },
    {
      id: 19,
      title: "Almost One Year Together",
      date: "April 12, 2026",
      description: "Eleven months of official love. Counting down to our first anniversary, holding you close in my heart.",
      image: "/images/image5.jpg",
      category: "timeline"
    },
    {
      id: 20,
      title: "A Majestic Sight",
      date: "May 01, 2026",
      description: "You dressed up elegantly in the red saree. You look regal, timeless, and completely gorgeous.",
      image: "/images/image3.jpg",
      category: "gallery"
    },
    {
      id: 21,
      title: "The Portrait of My Dreams",
      date: "May 08, 2026",
      description: "Looking at this photo, I see the face of the girl I want to stand beside for the rest of my life.",
      image: "/images/image2.jpg",
      category: "carousel"
    },
    {
      id: 22,
      title: "Our Anniversary Celebration",
      date: "May 12, 2026",
      description: "One year of holding your hand, sharing laughs, solving hurdles, and loving you more each day. Happy Anniversary, my love.",
      image: "/images/image1.jpg",
      category: "gallery"
    }
  ]
};
