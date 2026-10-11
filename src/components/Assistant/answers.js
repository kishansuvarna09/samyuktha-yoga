// Answers for the "Ask Samyuktha" chat, in Sam's voice: witty, warm, and
// serious only where safety matters (health, pregnancy).
//
// The chat tells visitors every answer is one she wrote herself, so she
// should read these before they go live and change anything that doesn't
// sound like her.
//
// How matching works: a visitor's question is compared with every line in
// `questions`, and the closest entry's `answer` is shown. Add the ways
// students actually ask: more real phrasings means better matching.
// `label` is the short question shown on suggestion buttons.
//
// After editing this file, run:
//   npm run assistant:index   (rebuilds the matching index)
//   npm run assistant:eval    (checks test questions still land correctly)

export const INSTAGRAM_URL = 'https://www.instagram.com/samyuktha.acharya';

export const messages = {
  intro:
    "Hi, I'm Samyuktha! Well, the automated version: every answer here is one I wrote myself, but I can't chat back properly (I'm saving my breath for class). Ask me about classes, styles or how to begin. For anything else, message me on Instagram.",
  clarify: 'Hmm, I want to get this right. Did you mean one of these?',
  fallback:
    "That one isn't in my notes yet, and I'd rather not wing it. Message me on Instagram and I'll answer you myself.",
};

// Suggestion buttons shown when the chat opens (ids from `answers` below).
export const starters = ['beginners', 'where', 'styles', 'book'];

export const answers = [
  {
    id: 'greeting',
    label: 'Say hello',
    questions: ['hi', 'hello', 'hey there', 'namaste', 'good morning', 'hi samyuktha'],
    answer:
      "Hi there! Ask me anything about classes, styles or how to get started. I promise I won't make you do a headstand first.",
  },
  {
    id: 'about',
    label: 'Who is Samyuktha?',
    questions: [
      'who are you',
      'tell me about yourself',
      'who is samyuktha',
      'are you a certified teacher',
      'what is your background',
      'where are you from',
    ],
    answer:
      "I'm Samyuktha, a 300hr certified yoga teacher. I trained in Rishikesh (yes, by the Ganga, and yes, it's as magical as it sounds), carried my mat from Bangalore to Dubai, and now teach Hatha, Ashtanga and Vinyasa across the city. I believe yoga is for every body, and that matcha counts as a personality trait.",
  },
  {
    id: 'story',
    label: 'How did you start yoga?',
    questions: [
      'how did you start yoga',
      'how did you get into yoga',
      'what got you into yoga',
      'when did you start doing yoga',
      'what made you start yoga',
      'why do you do yoga',
    ],
    answer:
      'Lockdown gave some people sourdough. It gave me yoga. I was underweight and thin as a stick, so I started practising every day at home. My breathing got better, and for the first time I felt properly strong and capable in my body. Two years of living-room yoga later, I was hooked enough to train as a teacher.',
  },
  {
    id: 'journey',
    label: 'How did you become a teacher?',
    questions: [
      'why did you become a yoga teacher',
      'how did you become a yoga teacher',
      'how long have you been teaching',
      'when did you start teaching',
      'how much teaching experience do you have',
      'how experienced are you',
      'what qualifications do you have',
      'where did you do your teacher training',
    ],
    answer:
      'Yoga changed how I breathe and how strong I feel, so of course I wanted to pass it on. After two years of daily practice at home, I did my 200hr teacher training (with strength training at the gym on the side), then went to Rishikesh for my 300hr to level up. I started teaching online, then studios, private classes and now events. Two years of teaching so far, and counting.',
  },
  {
    id: 'routine',
    label: 'Do you practise every day?',
    questions: [
      'do you practice every day',
      'do you do yoga daily yourself',
      'what is your own yoga routine',
      'what is your workout routine',
      'do you go to the gym',
      'how often do you work out',
      'how do you stay fit',
    ],
    answer:
      "Every single day. Yoga daily, mixed with Pilates, and the gym 2 to 3 times a week for strength training. Not bad for someone who used to be thin as a stick. I'd never ask you to do anything I don't do myself.",
  },
  {
    id: 'styles',
    label: 'What styles do you teach?',
    questions: [
      'what kind of yoga do you teach',
      'which yoga styles do you teach',
      'what type of classes do you offer',
      'do you teach hatha',
      'do you do vinyasa or ashtanga',
      'what yoga do you do',
    ],
    answer:
      "Three, and they're like siblings with very different personalities. Hatha is the calm one: slow, steady, all about foundations. Vinyasa is the dancer: every move on the breath. Ashtanga is the overachiever: structured, disciplined, and secretly the reason your arms get strong. Not sure which is yours? Ask me which style to start with.",
  },
  {
    // Without this, "do you teach X?" for an unlisted style grabs whichever
    // answer shares the wording (kundalini -> "can you teach in malayalam").
    id: 'other-styles',
    label: 'Do you teach other styles?',
    questions: [
      'do you teach pilates',
      'do you do hot yoga',
      'do you teach aerial yoga',
      'do you teach yin yoga',
      'do you teach meditation',
      'do you teach kundalini',
      'do you teach power yoga',
      'do you offer other types of yoga',
    ],
    answer:
      "Hatha, Ashtanga and Vinyasa are my three great loves. If something else is on your wishlist (Pilates, hot yoga, yin, meditation...), message me on Instagram and ask. I'll tell you honestly whether I'm the right person for it.",
    link: 'instagram',
  },
  {
    id: 'which-style',
    label: 'Which style should I start with?',
    questions: [
      'which class is best for me',
      'which style is good for beginners',
      'what is the difference between hatha and vinyasa',
      'hatha vs vinyasa vs ashtanga',
      'which style should I choose',
    ],
    answer:
      "New to yoga? Start with Hatha. It teaches you the breath and the basics without throwing you in the deep end. Once the poses feel familiar, Vinyasa adds flow (and a little sweat), and Ashtanga is waiting for the day you say \"okay, challenge me\". Tell me about yourself on Instagram and I'll point you to the right class.",
    link: 'instagram',
  },
  {
    id: 'hatha',
    label: 'What is Hatha yoga?',
    questions: ['what is hatha yoga', 'what happens in a hatha class', 'explain hatha', 'is hatha slow'],
    answer:
      'Hatha is the foundation. We take our time with each pose, breathe properly, and build alignment that protects your body rather than punishes it. Think of it as learning the alphabet before writing poetry.',
  },
  {
    id: 'vinyasa',
    label: 'What is Vinyasa yoga?',
    questions: ['what is vinyasa yoga', 'what happens in a vinyasa class', 'explain vinyasa flow', 'is vinyasa hard'],
    answer:
      "Vinyasa is yoga that moves. Each pose flows into the next, every movement on an inhale or an exhale. It builds strength and heat, so bring a towel and your sense of rhythm. Two left feet are also welcome.",
  },
  {
    id: 'ashtanga',
    label: 'What is Ashtanga yoga?',
    questions: ['what is ashtanga yoga', 'what happens in an ashtanga class', 'explain ashtanga', 'is ashtanga difficult'],
    answer:
      "Ashtanga is the most structured of the three: a set sequence, practised the same way every time, so you can actually watch yourself getting stronger. It's where we work towards arm balances and inversions, step by step. Discipline never looked so good.",
  },
  {
    id: 'beginners',
    label: "I'm a total beginner",
    questions: [
      'I have never done yoga before',
      'can beginners join your class',
      'is it okay if I am a complete beginner',
      'I am new to yoga',
      'do I need any experience',
      'I am nervous about my first yoga class',
    ],
    answer:
      "Beginners are my favourite people. You don't need to touch your toes, own fancy leggings, or know what Adho Mukha Svanasana means (it's downward dog; look at you, learning already). We start with breathing, and yes, I'll teach you to actually exhale. I'm so proud of you for starting.",
  },
  {
    id: 'flexibility',
    label: "I'm not flexible. Can I still do yoga?",
    questions: [
      'I am not flexible',
      "I can't touch my toes",
      'do I need to be flexible for yoga',
      'I am too stiff for yoga',
      'am I too old to start yoga',
      'is yoga only for fit people',
    ],
    answer:
      "Saying you're too stiff for yoga is like saying you're too dirty to shower. Flexibility is what you leave with, not the entry ticket. Every age, every shape and every pair of tight hamstrings is welcome. We'll negotiate with them together.",
  },
  {
    id: 'where',
    label: 'Where do you teach?',
    questions: [
      'where are your classes',
      'which studios do you teach at',
      'which gyms do you teach in',
      'where can I find your class',
      'do you teach near me',
      'where are you located',
    ],
    answer:
      "All over Dubai! I teach regular weekly classes at UFC Gym, Veo Fitness, Fitness Terminal, Little Yogi, Anytime Fitness, Fitness Together and Yogle. If there's a mat in Dubai, I've probably stood on it. Message me on Instagram and I'll tell you where I'm teaching this week.",
    link: 'instagram',
  },
  {
    id: 'schedule',
    label: 'When are your classes?',
    questions: [
      'what are the class timings',
      'what is your schedule',
      'what time are your classes',
      'do you have morning classes',
      'do you have evening classes',
      'do you teach on weekends',
      'when is the next class',
    ],
    answer:
      "I run regular weekly classes across different studios, so my week is basically a very calm game of Tetris. For now, message me on Instagram and I'll send you this week's timings. A proper calendar is on its way!",
    link: 'instagram',
  },
  {
    id: 'pricing',
    label: 'How much do classes cost?',
    questions: [
      'how much does a class cost',
      'what are your prices',
      'what are the fees',
      'how much is a private session',
      'do you have class packages',
      'is the first class free',
      'how much do you charge',
    ],
    answer:
      "It depends on the class, the place and how many of you are joining, so I won't just throw a number at you. Message me on Instagram and I'll share the details.",
    link: 'instagram',
  },
  {
    id: 'book',
    label: 'How do I book a class?',
    questions: [
      'how do I book a class',
      'how can I join your class',
      'how do I sign up',
      'can I reserve a spot',
      'how do I contact you',
      'what is your whatsapp number',
      'what is your email address',
    ],
    answer:
      "Message me on Instagram. That's it, that's the whole booking system. It lets me get to know you a little before class, and check you're a real human and not a very flexible bot.",
    link: 'instagram',
  },
  {
    id: 'private',
    label: 'Do you do private 1:1 sessions?',
    questions: [
      'do you do private classes',
      'can I book a one on one session',
      'I want a personal yoga teacher',
      'private yoga lessons',
      'one to one yoga sessions',
      'a private session at a time that suits me',
      'can you come to my home',
      'can you teach at my house',
      'can you teach at my place',
      'do you do home visits',
      'can you come to my house for a private class',
      'private session for my group of friends',
    ],
    answer:
      "Yes! Private sessions are built entirely around you: your body, your goals, your schedule. I'll come to your home, or we'll use a studio if you're a group. Message me on Instagram and let's plan it.",
    link: 'instagram',
  },
  {
    id: 'online',
    label: 'Do you teach online?',
    questions: [
      'do you have online classes',
      'virtual yoga class',
      'can I join on zoom',
      'can I join from another country',
      'live online yoga session',
      'do you teach outside dubai',
      'yoga over a video call',
    ],
    answer:
      "I can, though honestly I'm happiest in the same room, where I can catch that sneaky bent knee. If in-person really isn't possible, online works, even across time zones. We'll find a time that suits us both. Message me on Instagram.",
    link: 'instagram',
  },
  {
    id: 'kids',
    label: 'Do you teach kids?',
    questions: [
      'do you do kids yoga',
      'yoga classes for children',
      'my daughter wants to do yoga',
      'is there a class for my son',
      'yoga for kids',
      'what age can kids start yoga',
      'can children join your classes',
    ],
    answer:
      'Yes! I teach kids from 5 years up, wherever suits you. Expect playful first asanas, lots of patience and an alarming number of animal poses. Message me on Instagram about your little one.',
    link: 'instagram',
  },
  {
    id: 'corporate',
    label: 'Do you run corporate sessions?',
    questions: [
      'corporate yoga',
      'yoga for my office',
      'team wellness session',
      'workplace yoga class',
      'yoga for a company event',
      'how many people can join a corporate session',
      'can you come to our office',
      'yoga for a large group of colleagues',
    ],
    answer:
      "Yes! I run corporate sessions at your office or anywhere that suits the team, for groups of up to about 30. Fewer stiff necks, better meetings. Message me on Instagram with your team size and what you have in mind.",
    link: 'instagram',
  },
  {
    id: 'puppy',
    label: 'Puppy yoga, really?',
    questions: [
      'puppy yoga',
      'is puppy yoga real',
      'yoga with puppies',
      'yoga with dogs',
      'can I book puppy yoga for a group',
    ],
    answer:
      "Yes, really! Puppy yoga is on request, for groups. Picture some stretching, a lot of puppy cuddles, and absolutely nobody focusing on their breath. Get your group together and message me on Instagram.",
    link: 'instagram',
  },
  {
    id: 'bring',
    label: 'What should I bring?',
    questions: [
      'what should I bring to class',
      'what should I wear to yoga',
      'do I need my own mat',
      'what clothes are best for yoga',
      'should I eat before class',
      'how do I prepare for my first class',
    ],
    answer:
      "Just yourself, comfy clothes you can move in, and a water bottle. Studios provide mats, so no need to carry one around Dubai like a baguette. Skip heavy meals for about two hours before class, and come a few minutes early so we can say hello.",
  },
  {
    id: 'length',
    label: 'How long is a class?',
    questions: [
      'how long are your classes',
      'what is the class duration',
      'is the class one hour',
      'how many minutes is a class',
      'how long is one session',
    ],
    answer:
      'Most of my classes are 60-minute, breath-led flows. Long enough to work, short enough to still make brunch.',
  },
  {
    id: 'progress',
    label: 'Can you help me get more advanced?',
    questions: [
      'I want to learn inversions',
      'how do I learn a headstand',
      'can you teach arm balances',
      'do you teach advanced yoga',
      'how will I progress',
      'I want to take my practice to the next level',
    ],
    answer:
      "There's always a next step, and we'll find it. I think of it in three stages: Begin (breath, standing poses, your first Surya Namaskar), Deepen (flowing transitions, strength, longer holds) and Refine (Ashtanga discipline: arm balances, inversions, pranayama). Gravity is undefeated, but we'll give it a good fight. And the day you nail that headstand? I'm so proud of you.",
  },
  {
    id: 'home',
    label: 'Can I practise at home?',
    questions: [
      'can I do yoga at home',
      'how often should I practice',
      'what is a good daily yoga routine',
      'how many times a week should I do yoga',
      'home practice tips',
    ],
    answer:
      'Absolutely. A small practice you actually keep beats a long one you keep skipping. Start with ten minutes of breathing and a few Sun Salutations most days. Your living room floor is a perfectly good studio. Just warn the pets.',
  },
  {
    id: 'best-time',
    label: "What's the best time to practise?",
    questions: [
      'what is the best time to do yoga',
      'morning or evening yoga',
      'is it okay to do yoga at night',
      'when should I practice yoga',
    ],
    answer:
      'Traditionally, early morning on an empty stomach. Realistically? Whenever you will actually show up. Morning practice wakes you up, evening practice helps you unwind. Just leave about two hours after a big meal.',
  },
  {
    id: 'breath',
    label: 'What is pranayama?',
    questions: ['what is pranayama', 'breathing exercises', 'how should I breathe in yoga', 'what is breathwork', 'why is breathing important in yoga'],
    answer:
      "Pranayama is breath work: learning to slow, lengthen and steer your breath. In my classes the breath comes before the pose. You've been breathing your whole life, but I promise you've never exhaled like this.",
  },
  {
    id: 'stress',
    label: 'Can yoga help with stress?',
    questions: ['does yoga help with stress', 'I want to relax', 'yoga for a calmer mind', 'I am always stressed', 'can yoga help me sleep better'],
    answer:
      "Many students tell me class is the calmest hour of their week. Slow the breath and everything else tends to slow down with it, inbox included. If you're carrying something heavier than everyday stress, please talk to a professional too: yoga works best alongside proper support.",
  },
  {
    id: 'weight',
    label: 'Will yoga help me lose weight?',
    questions: [
      'will yoga help me lose weight',
      'yoga for weight loss',
      'I want to get in shape',
      'does yoga burn calories',
      'yoga to tone up',
      'yoga to slim down',
    ],
    answer:
      "Yoga builds strength, gets you moving, and does wonders for the habits around food and sleep, and Vinyasa and Ashtanga will definitely get your heart going. I won't promise a magic number on the scale, but I will promise you'll feel stronger, steadier and more at home in your body. Message me on Instagram and we'll find the right class for your goals.",
    link: 'instagram',
  },
  {
    id: 'men',
    label: 'Can men do yoga?',
    questions: [
      'can men do yoga',
      'is yoga only for women',
      'my husband wants to join',
      'are guys welcome in your class',
      'yoga for men',
      'do men come to your classes',
    ],
    answer:
      "Of course! Men were doing yoga for centuries before anyone invented leggings. Strength, mobility, a back that stops complaining: it's for everyone. Bring your husband, your brother, your gym buddy.",
  },
  {
    id: 'languages',
    label: 'Which languages do you teach in?',
    questions: [
      'which languages do you speak',
      'do you teach in hindi',
      'can you teach in malayalam',
      'do you speak kannada',
      'is the class in english',
    ],
    answer:
      'English, Hindi, Kannada and Malayalam. So you can be told to "breathe into it" in whichever language you like best.',
  },
  {
    id: 'gift',
    label: 'Can I gift a session?',
    questions: [
      'can I buy a gift voucher',
      'gift a yoga session',
      'yoga as a present for my friend',
      'birthday gift yoga class',
      'do you have gift cards',
      'book a class for someone else',
      'treat a friend to yoga',
    ],
    answer:
      'What a lovely idea, and the best present that needs no wrapping. Message me on Instagram and we will set it up.',
    link: 'instagram',
  },
  {
    // Also forced for any question that mentions pregnancy or a recent birth
    // (see PREGNANCY_PATTERNS in matching.js). Kept warm but serious.
    id: 'pregnancy',
    label: "I'm pregnant or just had a baby",
    questions: [
      'can I do yoga while pregnant',
      'do you teach prenatal yoga',
      'postnatal yoga after delivery',
      'I just had a baby',
      'yoga during pregnancy',
    ],
    answer:
      'Congratulations! Yes, I teach prenatal and postnatal yoga, as long as your doctor recommends it. Please get their go-ahead first, then message me on Instagram and we will plan sessions around you and the little one.',
    link: 'instagram',
  },
  {
    // Also forced for any question that mentions an injury, pain or a
    // medical condition (see HEALTH_PATTERNS in matching.js). No jokes here.
    id: 'health',
    label: 'I have an injury or a medical condition',
    questions: [
      'I have an injury',
      'I have back pain',
      'I have a knee problem',
      'I had surgery recently',
      'I have a medical condition',
    ],
    answer:
      "Thank you for telling me. With an injury, pain or a medical condition, I don't want to guess from a chat. Please check with your doctor first, then message me on Instagram before class so I can plan the right modifications for you.",
    link: 'instagram',
  },
  {
    id: 'human',
    label: 'Is this really you?',
    questions: [
      'are you a bot',
      'is this a real person',
      'am I talking to samyuktha',
      'are you an AI',
      'is this automated',
      'can I talk to a human',
      'is this an AI chatbot',
    ],
    answer:
      "Busted: this chat is automated. It picks from answers I wrote myself, so it's me, just pre-recorded. For a real conversation, message me on Instagram and I'll reply personally.",
    link: 'instagram',
  },
  {
    id: 'thanks',
    label: 'Thank you',
    questions: ['thank you', 'thanks', 'great, thanks', 'that helps', 'okay cool'],
    answer: 'Anytime! Now go drink some water. See you on the mat. Namaste x',
  },
];
