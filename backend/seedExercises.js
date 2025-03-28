// seedExercises.js (ES Modules version)

import dotenv from "dotenv";
dotenv.config(); // Loads .env (PORT, MONGO_URI, etc.)

import mongoose from "mongoose";
import Exercise from "./models/exerciseModel.js";
// 2) The big array of exercises you want to insert:
const exercisesData = [
  ////////////////////////////////////
  // Story 1: 6789e9055e1eeef5872858bb (EASY)
  ////////////////////////////////////
  {
    storyId: "6789e9055e1eeef5872858bb",
    question: "Where does Daniel live?",
    options: [
      { hebrew: "א. תל אביב", english: "Tel Aviv", isCorrect: true },
      { hebrew: "ב. ירושלים", english: "Jerusalem", isCorrect: false },
      { hebrew: "ג. חיפה", english: "Haifa", isCorrect: false },
      { hebrew: "ד. אילת", english: "Eilat", isCorrect: false },
    ],
    level: "easy",
  },
  {
    storyId: "6789e9055e1eeef5872858bb",
    question: "How many siblings does Daniel have?",
    options: [
      {
        hebrew: "א. אח אחד ואחות אחת",
        english: "One brother and one sister",
        isCorrect: false,
      },
      {
        hebrew: "ב. שני אחים ואחות אחת",
        english: "Two brothers and one sister",
        isCorrect: true,
      },
      {
        hebrew: "ג. שלושה אחים",
        english: "Three brothers",
        isCorrect: false,
      },
      {
        hebrew: "ד. אין לו אחים",
        english: "He has no siblings",
        isCorrect: false,
      },
    ],
    level: "easy",
  },
  {
    storyId: "6789e9055e1eeef5872858bb",
    question: "Where does Daniel work?",
    options: [
      { hebrew: "א. בבית חולים", english: "At a hospital", isCorrect: false },
      {
        hebrew: "ב. בבית קפה קטן",
        english: "At a small café",
        isCorrect: true,
      },
      { hebrew: "ג. בספרייה", english: "At a library", isCorrect: false },
      {
        hebrew: "ד. באוניברסיטה",
        english: "At a university",
        isCorrect: false,
      },
    ],
    level: "easy",
  },
  {
    storyId: "6789e9055e1eeef5872858bb",
    question: "What does Daniel love to do?",
    options: [
      {
        hebrew: "א. לשתות מיץ ולצפות בטלוויזיה",
        english: "Drink juice and watch TV",
        isCorrect: false,
      },
      {
        hebrew: "ב. לשתות קפה ולקרוא ספרים",
        english: "Drink coffee and read books",
        isCorrect: true,
      },
      { hebrew: "ג. לכתוב שירים", english: "Write poems", isCorrect: false },
      {
        hebrew: "ד. לרקוד בפארק",
        english: "Dance in the park",
        isCorrect: false,
      },
    ],
    level: "easy",
  },
  {
    storyId: "6789e9055e1eeef5872858bb",
    question: "What does Daniel ask at the end?",
    options: [
      { hebrew: "א. מה שלומך?", english: "How are you?", isCorrect: false },
      {
        hebrew: "ב. איפה אתה עובד?",
        english: "Where do you work?",
        isCorrect: false,
      },
      {
        hebrew: "ג. מה שמך?",
        english: "What is your name?",
        isCorrect: true,
      },
      {
        hebrew: "ד. האם אתה אוהב קפה?",
        english: "Do you like coffee?",
        isCorrect: false,
      },
    ],
    level: "easy",
  },

  ////////////////////////////////////
  // Story 2: 679901a1a3b88ebf91b41063 (EASY)
  ////////////////////////////////////
  {
    storyId: "679901a1a3b88ebf91b41063",
    question: "What did the small cat see on the table?",
    options: [
      { hebrew: "א. כוס חלב", english: "A cup of milk", isCorrect: true },
      {
        hebrew: "ב. חתיכת עוגה",
        english: "A piece of cake",
        isCorrect: false,
      },
      {
        hebrew: "ג. צלחת פסטה",
        english: "A plate of pasta",
        isCorrect: false,
      },
      { hebrew: "ד. כוס מים", english: "A cup of water", isCorrect: false },
    ],
    level: "easy",
  },
  {
    storyId: "679901a1a3b88ebf91b41063",
    question: "How did the cat spill the milk?",
    options: [
      {
        hebrew: "א. הוא משך את המפה",
        english: "He pulled the tablecloth",
        isCorrect: false,
      },
      {
        hebrew: "ב. הוא קפץ על השולחן והפיל את הכוס",
        english: "He jumped on the table and knocked over the cup",
        isCorrect: true,
      },
      {
        hebrew: "ג. הוא דחף את השולחן עם רגלו",
        english: "He pushed the table with his paw",
        isCorrect: false,
      },
      {
        hebrew: "ד. הוא שבר את הכוס עם שיניו",
        english: "He broke the cup with his teeth",
        isCorrect: false,
      },
    ],
    level: "easy",
  },
  {
    storyId: "679901a1a3b88ebf91b41063",
    question: "Who said 'Oy! Naughty cat!'?",
    options: [
      { hebrew: "א. אבא", english: "The father", isCorrect: false },
      { hebrew: "ב. האמא", english: "The mother", isCorrect: true },
      { hebrew: "ג. הילד", english: "The child", isCorrect: false },
      { hebrew: "ד. השכן", english: "The neighbor", isCorrect: false },
    ],
    level: "easy",
  },
  {
    storyId: "679901a1a3b88ebf91b41063",
    question: "How did the cat respond when the mother spoke?",
    options: [
      { hebrew: "א. הוא נבח", english: "He barked", isCorrect: false },
      { hebrew: "ב. הוא שתק", english: "He stayed silent", isCorrect: false },
      {
        hebrew: "ג. הוא ילל 'מיאו!'",
        english: "He meowed 'Meow!'",
        isCorrect: true,
      },
      {
        hebrew: "ד. הוא ברח מהבית",
        english: "He ran away",
        isCorrect: false,
      },
    ],
    level: "easy",
  },
  {
    storyId: "679901a1a3b88ebf91b41063",
    question: "Why was the cat very hungry?",
    options: [
      {
        hebrew: "א. הוא לא אכל זמן רב",
        english: "He hadn’t eaten in a long time",
        isCorrect: true,
      },
      {
        hebrew: "ב. הוא סיים זה עתה ארוחה גדולה",
        english: "He had just finished a big meal",
        isCorrect: false,
      },
      {
        hebrew: "ג. הוא שתה יותר מדי מים",
        english: "He drank too much water",
        isCorrect: false,
      },
      {
        hebrew: "ד. הוא היה עייף מדי לאכול",
        english: "He was too tired to eat",
        isCorrect: false,
      },
    ],
    level: "easy",
  },

  ////////////////////////////////////
  // Story 3: 67a7864f0f3b9295244382fd (HARD)
  ////////////////////////////////////
  {
    storyId: "67a7864f0f3b9295244382fd",
    question: "What was Adam doing in his garden on that bright morning?",
    options: [
      {
        hebrew: "א. הוא חיפש את הכלב שלו",
        english: "He was looking for his dog",
        isCorrect: false,
      },
      {
        hebrew: "ב. הוא עסק בטיפוח הפרחים וטיפול בצמחים",
        english: "He was nurturing flowers and tending various plants",
        isCorrect: true,
      },
      {
        hebrew: "ג. הוא קרא ספר בגינה",
        english: "He was reading a book in the garden",
        isCorrect: false,
      },
      {
        hebrew: "ד. הוא בנה ספסל חדש",
        english: "He was building a new bench",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67a7864f0f3b9295244382fd",
    question: "What did Adam suddenly discover was missing?",
    options: [
      { hebrew: "א. הכסף שלו", english: "His money", isCorrect: false },
      { hebrew: "ב. המפתח שלו", english: "His key", isCorrect: true },
      { hebrew: "ג. הטלפון שלו", english: "His phone", isCorrect: false },
      { hebrew: "ד. הכפפות שלו", english: "His gloves", isCorrect: false },
    ],
    level: "hard",
  },
  {
    storyId: "67a7864f0f3b9295244382fd",
    question: "Where did Adam search for the missing item?",
    options: [
      {
        hebrew: "א. רק בבית",
        english: "Only inside the house",
        isCorrect: false,
      },
      {
        hebrew: "ב. מכל עבר בגינה, כולל מאחורי השיחים ובין הפרחים",
        english:
          "Everywhere in the garden, including behind bushes and among flowers",
        isCorrect: true,
      },
      {
        hebrew: "ג. מתחת לשולחן",
        english: "Under the table",
        isCorrect: false,
      },
      { hebrew: "ד. במכונית שלו", english: "In his car", isCorrect: false },
    ],
    level: "hard",
  },
  {
    storyId: "67a7864f0f3b9295244382fd",
    question: "How did Adam feel after hours of searching?",
    options: [
      { hebrew: "א. מלא בשמחה", english: "Full of joy", isCorrect: false },
      {
        hebrew: "ב. עצבני מאוד",
        english: "Very irritated",
        isCorrect: false,
      },
      {
        hebrew: "ג. מותש וניסה להירגע על ספסל",
        english: "Exhausted and tried to calm himself on a bench",
        isCorrect: true,
      },
      {
        hebrew: "ד. התחיל לרקוד בגינה",
        english: "Started dancing in the garden",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67a7864f0f3b9295244382fd",
    question: "Who eventually found the key?",
    options: [
      { hebrew: "א. חברו הטוב", english: "His good friend", isCorrect: true },
      {
        hebrew: "ב. השכן מהבית ליד",
        english: "The neighbor next door",
        isCorrect: false,
      },
      {
        hebrew: "ג. ילד שעבר במקרה",
        english: "A passing child",
        isCorrect: false,
      },
      { hebrew: "ד. הכלב שלו", english: "His dog", isCorrect: false },
    ],
    level: "hard",
  },

  ////////////////////////////////////
  // Story 4: 67a786910f3b929524438301 (HARD)
  ////////////////////////////////////
  {
    storyId: "67a786910f3b929524438301",
    question: "Where did the tired but hopeful traveler arrive?",
    options: [
      {
        hebrew: "א. לעיר גדולה ומפורסמת",
        english: "A famous big city",
        isCorrect: false,
      },
      {
        hebrew: "ב. לכפר קטן ורחוק מהעיר הגדולה",
        english: "A small village far from the big city",
        isCorrect: true,
      },
      {
        hebrew: "ג. לאי טרופי",
        english: "A tropical island",
        isCorrect: false,
      },
      {
        hebrew: "ד. לתחנת רכבת מרכזית",
        english: "A central train station",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67a786910f3b929524438301",
    question: "What was the old man in the small house devoted to?",
    options: [
      {
        hebrew: "א. מסעות בעולם",
        english: "Traveling the world",
        isCorrect: false,
      },
      {
        hebrew: "ב. גידול ילדים",
        english: "Raising children",
        isCorrect: false,
      },
      {
        hebrew: "ג. התבוננות והרהור",
        english: "Contemplation and reflection",
        isCorrect: true,
      },
      {
        hebrew: "ד. בישול מאכלים מסורתיים",
        english: "Cooking traditional foods",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67a786910f3b929524438301",
    question: "What did the traveler say he was looking for?",
    options: [
      {
        hebrew: "א. כרטיס רכבת",
        english: "A train ticket",
        isCorrect: false,
      },
      {
        hebrew: "ב. אוכל, מקום לישון וקצת חוכמה",
        english: "Food, a place to sleep, and a little wisdom",
        isCorrect: true,
      },
      {
        hebrew: "ג. ספר קריאה חדש",
        english: "A new book to read",
        isCorrect: false,
      },
      {
        hebrew: "ד. סוס לרכיבה",
        english: "A horse to ride",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67a786910f3b929524438301",
    question: "How did the old man help the traveler in the evening?",
    options: [
      {
        hebrew: "א. נתן לו את המיטה שלו ויצא מהבית",
        english: "Gave him his own bed and left the house",
        isCorrect: false,
      },
      {
        hebrew: "ב. סיפר לו סיפורים על ערים גדולות",
        english: "Told him stories about big cities",
        isCorrect: false,
      },
      {
        hebrew: "ג. סיפר סיפורים על עזרה הדדית וערכים קהילתיים",
        english: "He told stories of mutual aid and community values",
        isCorrect: true,
      },
      {
        hebrew: "ד. פתח חנות קטנה למענו",
        english: "He opened a small shop for him",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67a786910f3b929524438301",
    question: "What final advice did the old man give to the traveler?",
    options: [
      {
        hebrew: "א. לתכנן היטב כל צעד במסע ולא לשנות תוכניות",
        english: "Plan every step and never change plans",
        isCorrect: false,
      },
      {
        hebrew: "ב. להאמין בלבו ולדעת שכל אדם יכול ללמד אותו משהו חדש",
        english:
          "Believe in his heart and know each person can teach him something new",
        isCorrect: true,
      },
      {
        hebrew: "ג. לחזור לביתו מיד",
        english: "Return home immediately",
        isCorrect: false,
      },
      {
        hebrew: "ד. לקנות סוס ולהמשיך לרכב",
        english: "Buy a horse and keep riding",
        isCorrect: false,
      },
    ],
    level: "hard",
  },

  ////////////////////////////////////
  // Story 5: 67acbeba8aaaaed0d9af6e3f (EASY)
  ////////////////////////////////////
  {
    storyId: "67acbeba8aaaaed0d9af6e3f",
    question: "Where does the speaker love to go?",
    options: [
      { hebrew: "א. לבית קפה", english: "To a café", isCorrect: false },
      { hebrew: "ב. לים", english: "To the beach", isCorrect: true },
      { hebrew: "ג. לקולנוע", english: "To the cinema", isCorrect: false },
      {
        hebrew: "ד. לפארק מים",
        english: "To a water park",
        isCorrect: false,
      },
    ],
    level: "easy",
  },
  {
    storyId: "67acbeba8aaaaed0d9af6e3f",
    question: "What is the sand like at the beach?",
    options: [
      { hebrew: "א. קשה מאוד", english: "Very hard", isCorrect: false },
      { hebrew: "ב. רך", english: "Soft", isCorrect: true },
      { hebrew: "ג. מלא אבנים", english: "Full of stones", isCorrect: false },
      {
        hebrew: "ד. אין חול בכלל",
        english: "No sand at all",
        isCorrect: false,
      },
    ],
    level: "easy",
  },
  {
    storyId: "67acbeba8aaaaed0d9af6e3f",
    question: "What does the speaker sometimes find at the beach?",
    options: [
      {
        hebrew: "א. צדפים יפים",
        english: "Beautiful shells",
        isCorrect: true,
      },
      { hebrew: "ב. שטרות כסף", english: "Money bills", isCorrect: false },
      {
        hebrew: "ג. אבנים יקרות",
        english: "Precious stones",
        isCorrect: false,
      },
      { hebrew: "ד. זהב טהור", english: "Pure gold", isCorrect: false },
    ],
    level: "easy",
  },
  {
    storyId: "67acbeba8aaaaed0d9af6e3f",
    question: "How does the speaker feel about going to the beach?",
    options: [
      {
        hebrew: "א. זה כיף מאוד",
        english: "It's a lot of fun",
        isCorrect: true,
      },
      { hebrew: "ב. זה משעמם", english: "It's boring", isCorrect: false },
      { hebrew: "ג. זה מסוכן", english: "It's dangerous", isCorrect: false },
      { hebrew: "ד. זה מעצבן", english: "It's annoying", isCorrect: false },
    ],
    level: "easy",
  },
  {
    storyId: "67acbeba8aaaaed0d9af6e3f",
    question: "What is the water like at the beach?",
    options: [
      { hebrew: "א. חמים", english: "Warm", isCorrect: true },
      { hebrew: "ב. קר מאוד", english: "Very cold", isCorrect: false },
      { hebrew: "ג. מלוח מדי", english: "Too salty", isCorrect: false },
      { hebrew: "ד. תמיד מלוכלך", english: "Always dirty", isCorrect: false },
    ],
    level: "easy",
  },

  ////////////////////////////////////
  // Story 6: 67acbecc8aaaaed0d9af6e43 (MEDIUM)
  ////////////////////////////////////
  {
    storyId: "67acbecc8aaaaed0d9af6e43",
    question: "Where did the speaker visit yesterday?",
    options: [
      { hebrew: "א. בפארק", english: "A park", isCorrect: false },
      {
        hebrew: "ב. בספרייה ליד הבית",
        english: "The library near home",
        isCorrect: true,
      },
      { hebrew: "ג. בקניון", english: "A mall", isCorrect: false },
      {
        hebrew: "ד. במוזיאון לאומנות",
        english: "An art museum",
        isCorrect: false,
      },
    ],
    level: "medium",
  },
  {
    storyId: "67acbecc8aaaaed0d9af6e43",
    question: "What kind of book did the speaker choose?",
    options: [
      {
        hebrew: "א. ספר על מדע בדיוני",
        english: "A sci-fi book",
        isCorrect: false,
      },
      {
        hebrew: "ב. ספר על היסטוריה",
        english: "A book about history",
        isCorrect: true,
      },
      { hebrew: "ג. ספר בישול", english: "A cookbook", isCorrect: false },
      {
        hebrew: "ד. ספר רומנטי",
        english: "A romance novel",
        isCorrect: false,
      },
    ],
    level: "medium",
  },
  {
    storyId: "67acbecc8aaaaed0d9af6e43",
    question: "Why does the speaker plan to read a little every day?",
    options: [
      {
        hebrew: "א. כדי להירדם מהר",
        english: "To fall asleep quickly",
        isCorrect: false,
      },
      {
        hebrew: "ב. כדי ללמוד דברים חדשים",
        english: "To learn new things",
        isCorrect: true,
      },
      {
        hebrew: "ג. כדי להעביר זמן עבודה",
        english: "To pass work time",
        isCorrect: false,
      },
      {
        hebrew: "ד. כדי להראות לחברים",
        english: "To show off to friends",
        isCorrect: false,
      },
    ],
    level: "medium",
  },
  {
    storyId: "67acbecc8aaaaed0d9af6e43",
    question: "How long does the speaker hope it will take to finish the book?",
    options: [
      { hebrew: "א. יומיים", english: "Two days", isCorrect: false },
      { hebrew: "ב. שבוע", english: "One week", isCorrect: false },
      { hebrew: "ג. שבועיים", english: "Two weeks", isCorrect: true },
      { hebrew: "ד. חודש", english: "One month", isCorrect: false },
    ],
    level: "medium",
  },
  {
    storyId: "67acbecc8aaaaed0d9af6e43",
    question: "What is said about the language in the book?",
    options: [
      {
        hebrew: "א. קשה מאוד לקריאה",
        english: "Very difficult to read",
        isCorrect: false,
      },
      {
        hebrew: "ב. לא קשה מדי",
        english: "Not too difficult",
        isCorrect: true,
      },
      {
        hebrew: "ג. כתובה בשפה עתיקה",
        english: "Written in an ancient language",
        isCorrect: false,
      },
      {
        hebrew: "ד. מלאה בדיחות",
        english: "Full of jokes",
        isCorrect: false,
      },
    ],
    level: "medium",
  },

  ////////////////////////////////////
  // Story 7: 67acbf1f8aaaaed0d9af6e47 (HARD)
  ////////////////////////////////////
  {
    storyId: "67acbf1f8aaaaed0d9af6e47",
    question: "Where did the speaker go a week ago?",
    options: [
      {
        hebrew: "א. לטיול בעיר העתיקה",
        english: "On a trip to the old city",
        isCorrect: false,
      },
      {
        hebrew: "ב. לטיול בהר הגבוה ביותר באזור",
        english: "A hike up the highest mountain in the area",
        isCorrect: true,
      },
      {
        hebrew: "ג. לשיט בים",
        english: "A boat trip at sea",
        isCorrect: false,
      },
      {
        hebrew: 'ד. לביקור משפחתי בחו"ל',
        english: "A family visit abroad",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acbf1f8aaaaed0d9af6e47",
    question: "What was the view like?",
    options: [
      {
        hebrew: "א. נראה כמו מדבר שומם",
        english: "It looked like a barren desert",
        isCorrect: false,
      },
      {
        hebrew: "ב. עוצר נשימה עם הרים, נחלים ומפלים",
        english: "Breathtaking with mountains, streams, and waterfalls",
        isCorrect: true,
      },
      {
        hebrew: "ג. נראה כמו שכונה עירונית",
        english: "It looked like an urban neighborhood",
        isCorrect: false,
      },
      {
        hebrew: "ד. היה עמוס במכוניות",
        english: "It was crowded with cars",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acbf1f8aaaaed0d9af6e47",
    question: "Why did the speaker pack a backpack full of gear?",
    options: [
      {
        hebrew: "א. למקרה שיצטרך לחיות ביער שנים",
        english: "In case he had to live in the forest for years",
        isCorrect: false,
      },
      {
        hebrew: "ב. כדי לא ללכת לאיבוד ולשמור על בטיחותו",
        english: "So he wouldn’t get lost and for safety",
        isCorrect: true,
      },
      {
        hebrew: "ג. כי היה צריך ספרים ללימודים",
        english: "He needed books for studying",
        isCorrect: false,
      },
      {
        hebrew: "ד. כי רצה למכור ציוד לאחרים",
        english: "He wanted to sell equipment to others",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acbf1f8aaaaed0d9af6e47",
    question: "What sometimes made the dirt paths confusing?",
    options: [
      {
        hebrew: "א. סימונים מטושטשים",
        english: "Unclear trail markings",
        isCorrect: true,
      },
      {
        hebrew: "ב. יותר מדי עמודי תאורה",
        english: "Too many streetlights",
        isCorrect: false,
      },
      {
        hebrew: "ג. רעש מכוניות",
        english: "Traffic noise",
        isCorrect: false,
      },
      {
        hebrew: "ד. ילדים רצים בשביל",
        english: "Kids running on the path",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acbf1f8aaaaed0d9af6e47",
    question: "How did the speaker feel upon reaching the summit?",
    options: [
      { hebrew: "א. מאוכזב", english: "Disappointed", isCorrect: false },
      {
        hebrew: "ב. נרגש אך כועס",
        english: "Excited but angry",
        isCorrect: false,
      },
      {
        hebrew: "ג. עם תחושת הישג אדירה",
        english: "With a great sense of accomplishment",
        isCorrect: true,
      },
      {
        hebrew: "ד. חשב לרדת מיד",
        english: "Thought about going back immediately",
        isCorrect: false,
      },
    ],
    level: "hard",
  },

  ////////////////////////////////////
  // Story 8: 67acbf4d8aaaaed0d9af6e4b (EASY)
  ////////////////////////////////////
  {
    storyId: "67acbf4d8aaaaed0d9af6e4b",
    question: "What does the speaker love to eat in the summer?",
    options: [
      { hebrew: "א. עוגה", english: "Cake", isCorrect: false },
      { hebrew: "ב. גלידה", english: "Ice cream", isCorrect: true },
      { hebrew: "ג. שוקולד חם", english: "Hot chocolate", isCorrect: false },
      {
        hebrew: "ד. תותים טריים",
        english: "Fresh strawberries",
        isCorrect: false,
      },
    ],
    level: "easy",
  },
  {
    storyId: "67acbf4d8aaaaed0d9af6e4b",
    question: "How is the ice cream described?",
    options: [
      {
        hebrew: "א. מתוקה ומרעננת",
        english: "Sweet and refreshing",
        isCorrect: true,
      },
      {
        hebrew: "ב. חמוצה וקרה מדי",
        english: "Sour and too cold",
        isCorrect: false,
      },
      { hebrew: "ג. ללא טעם", english: "Tasteless", isCorrect: false },
      {
        hebrew: "ד. רק בטעם שוקולד",
        english: "Only chocolate-flavored",
        isCorrect: false,
      },
    ],
    level: "easy",
  },
  {
    storyId: "67acbf4d8aaaaed0d9af6e4b",
    question: "Which flavors does the speaker especially like?",
    options: [
      {
        hebrew: "א. טעמים של פירות",
        english: "Fruit flavors",
        isCorrect: true,
      },
      {
        hebrew: "ב. טעמים מלוחים",
        english: "Salty flavors",
        isCorrect: false,
      },
      {
        hebrew: "ג. טעמי גבינה בלבד",
        english: "Only cheese flavors",
        isCorrect: false,
      },
      {
        hebrew: "ד. טעמים מרירים",
        english: "Bitter flavors",
        isCorrect: false,
      },
    ],
    level: "easy",
  },
  {
    storyId: "67acbf4d8aaaaed0d9af6e4b",
    question:
      "What does the ice cream help the speaker do when it’s hot outside?",
    options: [
      {
        hebrew: "א. להירדם בקלות",
        english: "Fall asleep easily",
        isCorrect: false,
      },
      {
        hebrew: "ב. להיפגש עם חברים",
        english: "Meet with friends",
        isCorrect: false,
      },
      { hebrew: "ג. להתקרר", english: "Cool down", isCorrect: true },
      { hebrew: "ד. לרוץ מהר יותר", english: "Run faster", isCorrect: false },
    ],
    level: "easy",
  },
  {
    storyId: "67acbf4d8aaaaed0d9af6e4b",
    question: "Is the ice cream described as especially helpful in the winter?",
    options: [
      {
        hebrew: "א. כן, היא מחממת בחורף",
        english: "Yes, it warms you in winter",
        isCorrect: false,
      },
      {
        hebrew: "ב. לא, היא טעימה רק בשעות הלילה",
        english: "No, it's only tasty at night",
        isCorrect: false,
      },
      {
        hebrew: "ג. לא, כי מדובר על הקיץ",
        english: "No, because it's specifically about summer",
        isCorrect: true,
      },
      {
        hebrew: "ד. כן, אבל חייבים להוסיף שוקו חם",
        english: "Yes, but only if you add hot chocolate",
        isCorrect: false,
      },
    ],
    level: "easy",
  },

  ////////////////////////////////////
  // Story 9: 67acbfa38aaaaed0d9af6e4f (MEDIUM)
  ////////////////////////////////////
  {
    storyId: "67acbfa38aaaaed0d9af6e4f",
    question: "Who is the speaker planning to meet this week?",
    options: [
      {
        hebrew: "א. חברים חדשים מהמכללה",
        english: "New friends from college",
        isCorrect: false,
      },
      {
        hebrew: "ב. חברים ישנים שלא ראה זמן רב",
        english: "Old friends not seen for a long time",
        isCorrect: true,
      },
      {
        hebrew: "ג. קולגות מהעבודה",
        english: "Work colleagues",
        isCorrect: false,
      },
      { hebrew: "ד. קרובי משפחה", english: "Relatives", isCorrect: false },
    ],
    level: "medium",
  },
  {
    storyId: "67acbfa38aaaaed0d9af6e4f",
    question: "Where are they planning to go?",
    options: [
      {
        hebrew: "א. למסעדה יוקרתית",
        english: "A fancy restaurant",
        isCorrect: false,
      },
      {
        hebrew: "ב. לבית קפה קטן במרכז העיר",
        english: "A small café in the city center",
        isCorrect: true,
      },
      { hebrew: "ג. לחוף הים", english: "The beach", isCorrect: false },
      {
        hebrew: "ד. לבית של אחד החברים",
        english: "One friend’s house",
        isCorrect: false,
      },
    ],
    level: "medium",
  },
  {
    storyId: "67acbfa38aaaaed0d9af6e4f",
    question: "Why did the friends drift apart in recent years?",
    options: [
      {
        hebrew: "א. כי כולם גרים עדיין באותה עיר",
        english: "Because they still all live in the same city",
        isCorrect: false,
      },
      {
        hebrew: "ב. כי כל אחד הלך לכיוון אחר בחיים",
        english: "Because each person went in a different life direction",
        isCorrect: true,
      },
      {
        hebrew: "ג. כי התווכחו על כסף",
        english: "Because they had a fight about money",
        isCorrect: false,
      },
      {
        hebrew: "ד. כי לא אהבו זה את זה",
        english: "Because they didn’t like each other",
        isCorrect: false,
      },
    ],
    level: "medium",
  },
  {
    storyId: "67acbfa38aaaaed0d9af6e4f",
    question: "What did one friend study abroad?",
    options: [
      { hebrew: "א. אדריכלות", english: "Architecture", isCorrect: false },
      {
        hebrew: "ב. אין מידע על לימודים",
        english: "No information about studies",
        isCorrect: false,
      },
      {
        hebrew: 'ג. למד באוניברסיטה בחו"ל',
        english: "Studied at a university abroad",
        isCorrect: true,
      },
      {
        hebrew: 'ד. עבד בתחום הטכנולוגיה בחו"ל',
        english: "Worked in the tech field abroad",
        isCorrect: false,
      },
    ],
    level: "medium",
  },
  {
    storyId: "67acbfa38aaaaed0d9af6e4f",
    question: "What does the speaker believe the conversation will be full of?",
    options: [
      {
        hebrew: "א. כעס ושעמום",
        english: "Anger and boredom",
        isCorrect: false,
      },
      {
        hebrew: "ב. נוסטלגיה וחום",
        english: "Nostalgia and warmth",
        isCorrect: true,
      },
      {
        hebrew: "ג. ביקורת הדדית",
        english: "Mutual criticism",
        isCorrect: false,
      },
      { hebrew: "ד. מוזיקה רועשת", english: "Loud music", isCorrect: false },
    ],
    level: "medium",
  },

  ////////////////////////////////////
  // Story 10: 67acbfb98aaaaed0d9af6e53 (HARD)
  ////////////////////////////////////
  {
    storyId: "67acbfb98aaaaed0d9af6e53",
    question: "Where did the speaker go last spring?",
    options: [
      {
        hebrew: "א. לשיט בנהר רוגע",
        english: "A calm river cruise",
        isCorrect: false,
      },
      {
        hebrew: "ב. למסע אופניים לאורך נהר ארוך ומתפתל",
        english: "A multi-day bike trip along a long, winding river",
        isCorrect: true,
      },
      {
        hebrew: "ג. לחופשה בחוף טרופי",
        english: "A tropical beach vacation",
        isCorrect: false,
      },
      {
        hebrew: "ד. לטיול במדבר",
        english: "A desert hike",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acbfb98aaaaed0d9af6e53",
    question: "Where did the speaker sleep at night?",
    options: [
      { hebrew: "א. באוהל קטן", english: "In a small tent", isCorrect: true },
      { hebrew: "ב. בבתי מלון", english: "In hotels", isCorrect: false },
      {
        hebrew: "ג. אצל חברים מקומיים",
        english: "At local friends’ houses",
        isCorrect: false,
      },
      {
        hebrew: "ד. בתחנת אוטובוס",
        english: "At a bus station",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acbfb98aaaaed0d9af6e53",
    question: "What did the locals recommend on the first evening?",
    options: [
      {
        hebrew: "א. מסעדה יוקרתית מחוץ למסלול",
        english: "A fancy restaurant off the main route",
        isCorrect: false,
      },
      {
        hebrew: "ב. מסלולי רכיבה מעניינים מחוץ לשביל הראשי",
        english: "Interesting biking trails off the main route",
        isCorrect: true,
      },
      {
        hebrew: "ג. לא לצאת מהכפר בלילה",
        english: "Not to leave the village at night",
        isCorrect: false,
      },
      {
        hebrew: "ד. לבקר במוזיאון האזורי",
        english: "Visiting the local museum",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acbfb98aaaaed0d9af6e53",
    question: "What surprising change happened on the second day?",
    options: [
      {
        hebrew: "א. חיות בר רבות הופיעו",
        english: "Many wild animals appeared",
        isCorrect: false,
      },
      {
        hebrew: "ב. מזג האוויר השתנה לפתע וגשם חזק החל לרדת",
        english: "The weather changed suddenly and heavy rain fell",
        isCorrect: true,
      },
      {
        hebrew: "ג. הנהר התייבש לחלוטין",
        english: "The river dried up completely",
        isCorrect: false,
      },
      {
        hebrew: "ד. האופניים התקלקלו ללא תקנה",
        english: "The bike broke beyond repair",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acbfb98aaaaed0d9af6e53",
    question: "How did the journey end?",
    options: [
      {
        hebrew: "א. חזר הביתה עם תחושת ניצחון ואהבה מחודשת לטבע",
        english:
          "He returned home feeling victorious and with renewed love for nature",
        isCorrect: true,
      },
      {
        hebrew: "ב. החליט לא לחזור לעולם הביתה",
        english: "He decided never to return home",
        isCorrect: false,
      },
      {
        hebrew: "ג. הפסיק באמצע בגלל מזג האוויר",
        english: "He stopped halfway due to the weather",
        isCorrect: false,
      },
      {
        hebrew: "ד. סיים בבית חולים",
        english: "He ended up in the hospital",
        isCorrect: false,
      },
    ],
    level: "hard",
  },

  ////////////////////////////////////
  // Story 11: 67acbfee8aaaaed0d9af6e57 (HARD)
  ////////////////////////////////////
  {
    storyId: "67acbfee8aaaaed0d9af6e57",
    question: "Which day of the week did the friends used to meet in the past?",
    options: [
      {
        hebrew: "א. כל יום ראשון בבוקר",
        english: "Every Sunday morning",
        isCorrect: false,
      },
      {
        hebrew: "ב. בכל יום שישי בערב",
        english: "Every Friday evening",
        isCorrect: true,
      },
      {
        hebrew: "ג. בכל יום שלישי בצהריים",
        english: "Every Tuesday noon",
        isCorrect: false,
      },
      {
        hebrew: "ד. לא נפגשו באופן קבוע",
        english: "They never met regularly",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acbfee8aaaaed0d9af6e57",
    question: "Why did the group drift apart over the years?",
    options: [
      {
        hebrew: "א. כל אחד פנה לכיוון אחר בחיים",
        english: "Each one went in a different direction in life",
        isCorrect: true,
      },
      {
        hebrew: "ב. הם רבו על עניינים כספיים",
        english: "They argued over money issues",
        isCorrect: false,
      },
      {
        hebrew: "ג. הם לא אהבו לטייל יחד",
        english: "They didn’t like hanging out together",
        isCorrect: false,
      },
      {
        hebrew: "ד. הם עברו לגור יחד באותה דירה",
        english: "They all moved into the same apartment",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acbfee8aaaaed0d9af6e57",
    question: "What did one friend start?",
    options: [
      {
        hebrew: "א. סטארט-אפ קטן",
        english: "A small startup",
        isCorrect: true,
      },
      {
        hebrew: "ב. לימודי רפואה",
        english: "Medical studies",
        isCorrect: false,
      },
      {
        hebrew: "ג. מסעדה יוקרתית",
        english: "A fancy restaurant",
        isCorrect: false,
      },
      {
        hebrew: "ד. קריירה באמנות",
        english: "An art career",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acbfee8aaaaed0d9af6e57",
    question: "Where do they plan to meet now?",
    options: [
      {
        hebrew: "א. בבית קפה מוכר מהילדות",
        english: "A café from childhood days",
        isCorrect: true,
      },
      { hebrew: "ב. בחוף הים", english: "At the beach", isCorrect: false },
      {
        hebrew: "ג. בספרייה השכונתית",
        english: "The local library",
        isCorrect: false,
      },
      {
        hebrew: "ד. במרכז קהילתי גדול",
        english: "A large community center",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acbfee8aaaaed0d9af6e57",
    question: "What might they flip through if someone brings it?",
    options: [
      {
        hebrew: "א. אלבומי תמונות ישנים",
        english: "Old photo albums",
        isCorrect: true,
      },
      {
        hebrew: "ב. מגזיני אופנה",
        english: "Fashion magazines",
        isCorrect: false,
      },
      {
        hebrew: "ג. עיתונים יומיים",
        english: "Daily newspapers",
        isCorrect: false,
      },
      {
        hebrew: "ד. ספרי לימוד באוניברסיטה",
        english: "University textbooks",
        isCorrect: false,
      },
    ],
    level: "hard",
  },

  ////////////////////////////////////
  // Story 12: 67acc0268aaaaed0d9af6e5b (HARD)
  ////////////////////////////////////
  {
    storyId: "67acc0268aaaaed0d9af6e5b",
    question: "Where is the multi-day cycling trip taking place?",
    options: [
      {
        hebrew: "א. לאורך נהר ארוך ומתפתל",
        english: "Along a long, winding river",
        isCorrect: true,
      },
      {
        hebrew: "ב. במדבר ללא מקורות מים",
        english: "In a desert with no water sources",
        isCorrect: false,
      },
      {
        hebrew: "ג. בשמורת טבע מישורית",
        english: "In a flat nature reserve",
        isCorrect: false,
      },
      {
        hebrew: "ד. בעיר צפופה",
        english: "In a crowded city",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc0268aaaaed0d9af6e5b",
    question: "What did the friendly family invite the cyclist to?",
    options: [
      { hebrew: "א. מסיבה גדולה", english: "A big party", isCorrect: false },
      {
        hebrew: "ב. ארוחת ערב פשוטה אבל טעימה",
        english: "A simple but tasty dinner",
        isCorrect: true,
      },
      {
        hebrew: "ג. לינה בבית המלון שלהם",
        english: "A stay in their hotel",
        isCorrect: false,
      },
      {
        hebrew: "ד. טיול במכונית הפרטית שלהם",
        english: "A car ride in their private vehicle",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc0268aaaaed0d9af6e5b",
    question: "Why did the cyclist wake up early the next morning?",
    options: [
      {
        hebrew: "א. בגלל שהאזעקה צלצלה חזק",
        english: "Because the alarm was very loud",
        isCorrect: false,
      },
      {
        hebrew: "ב. כדי לנצל את השעות הקרירות לפני שהמזג מתחמם",
        english: "To use the cooler hours before it got hot",
        isCorrect: true,
      },
      {
        hebrew: "ג. כי היה מאוחר לאירוע",
        english: "Because he was late for an event",
        isCorrect: false,
      },
      {
        hebrew: "ד. הנערים המקומיים העירו אותו מוקדם",
        english: "Local teenagers woke him up early",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc0268aaaaed0d9af6e5b",
    question: "Which natural feature did many people recommend visiting?",
    options: [
      {
        hebrew: "א. הר מושלג",
        english: "A snowy mountain",
        isCorrect: false,
      },
      {
        hebrew: "ב. מפל מפורסם",
        english: "A famous waterfall",
        isCorrect: true,
      },
      { hebrew: "ג. שדות פרחים", english: "Flower fields", isCorrect: false },
      {
        hebrew: "ד. מערה תת-קרקעית",
        english: "An underground cave",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc0268aaaaed0d9af6e5b",
    question: "What was the main challenge on the third day?",
    options: [
      {
        hebrew: "א. נגמרו לו המים",
        english: "He ran out of water",
        isCorrect: false,
      },
      {
        hebrew: "ב. מזג האוויר השתנה והיו אזהרות לשטפונות",
        english: "The weather changed and there were flash flood warnings",
        isCorrect: true,
      },
      {
        hebrew: "ג. הגלגלים באופניים נשברו",
        english: "The bicycle wheels broke",
        isCorrect: false,
      },
      {
        hebrew: "ד. הוא איבד את המפה לגמרי",
        english: "He lost his map entirely",
        isCorrect: false,
      },
    ],
    level: "hard",
  },

  ////////////////////////////////////
  // Story 13: 67acc0628aaaaed0d9af6e5f (MEDIUM)
  ////////////////////////////////////
  {
    storyId: "67acc0628aaaaed0d9af6e5f",
    question: "What event are the speaker and her friends planning?",
    options: [
      {
        hebrew: "א. יום הולדת הפתעה לחברה",
        english: "A surprise birthday party for a friend",
        isCorrect: false,
      },
      {
        hebrew: "ב. מסיבת הפתעה לחברה קרובה שמסיימת תואר",
        english: "A surprise party for a close friend finishing her degree",
        isCorrect: true,
      },
      {
        hebrew: "ג. טיול להר הגבוה באזור",
        english: "A hike to the highest mountain in the area",
        isCorrect: false,
      },
      {
        hebrew: "ד. מפגש ארוך בספרייה המקומית",
        english: "A long meeting at the local library",
        isCorrect: false,
      },
    ],
    level: "medium",
  },
  {
    storyId: "67acc0628aaaaed0d9af6e5f",
    question: "Where will the party be held?",
    options: [
      {
        hebrew: "א. באולם אירועים גדול",
        english: "In a large event hall",
        isCorrect: false,
      },
      {
        hebrew: "ב. בבית של אחת הבנות עם חצר גדולה",
        english: "At one friend’s house with a large backyard",
        isCorrect: true,
      },
      {
        hebrew: "ג. על גג של בניין",
        english: "On a rooftop",
        isCorrect: false,
      },
      {
        hebrew: "ד. בפארק ציבורי",
        english: "In a public park",
        isCorrect: false,
      },
    ],
    level: "medium",
  },
  {
    storyId: "67acc0628aaaaed0d9af6e5f",
    question: "What does the speaker plan to bake?",
    options: [
      {
        hebrew: "א. עוגת פירות יבשים",
        english: "A dried-fruit cake",
        isCorrect: false,
      },
      {
        hebrew: "ב. עוגה גבוהה ומרשימה עם קרם וניל ותותים",
        english: "A tall, impressive cake with vanilla cream and strawberries",
        isCorrect: true,
      },
      {
        hebrew: "ג. עוגיות שוקולד צ'יפס",
        english: "Chocolate chip cookies",
        isCorrect: false,
      },
      {
        hebrew: "ד. פאי תפוחים מסורתי",
        english: "Traditional apple pie",
        isCorrect: false,
      },
    ],
    level: "medium",
  },
  {
    storyId: "67acc0628aaaaed0d9af6e5f",
    question: "Which game will they play to break the ice?",
    options: [
      {
        hebrew: "א. חידון קצר על החברה שלנו",
        english: "A short quiz about their friend",
        isCorrect: true,
      },
      {
        hebrew: "ב. משחק 'חבילה עוברת' עם מוזיקה",
        english: "A 'passing parcel' music game",
        isCorrect: false,
      },
      {
        hebrew: "ג. תחרות ריצה בחצר",
        english: "A running competition in the yard",
        isCorrect: false,
      },
      { hebrew: "ד. מרוץ אפייה", english: "A baking race", isCorrect: false },
    ],
    level: "medium",
  },
  {
    storyId: "67acc0628aaaaed0d9af6e5f",
    question: "How does the speaker imagine the friend's reaction?",
    options: [
      {
        hebrew: "א. היא תדע על המסיבה מראש",
        english: "She will know about the party in advance",
        isCorrect: false,
      },
      {
        hebrew: "ב. היא תהיה מופתעת לגמרי",
        english: "She will be completely surprised",
        isCorrect: true,
      },
      {
        hebrew: "ג. היא תכעס מאוד על כולן",
        english: "She will be very angry at everyone",
        isCorrect: false,
      },
      {
        hebrew: "ד. היא לא תגיע בסוף",
        english: "She won’t show up in the end",
        isCorrect: false,
      },
    ],
    level: "medium",
  },

  ////////////////////////////////////
  // Story 14: 67acc0978aaaaed0d9af6e63 (HARD)
  ////////////////////////////////////
  {
    storyId: "67acc0978aaaaed0d9af6e63",
    question: "Where did the speaker get accepted a few months ago?",
    options: [
      {
        hebrew: 'א. לתוכנית לחילופי סטודנטים באוניברסיטה יוקרתית בחו"ל',
        english:
          "A student exchange program at a prestigious university abroad",
        isCorrect: true,
      },
      {
        hebrew: "ב. לעבודה במשרד ממשלתי",
        english: "A job at a government office",
        isCorrect: false,
      },
      {
        hebrew: "ג. לבית ספר לתיאטרון",
        english: "A theater school",
        isCorrect: false,
      },
      {
        hebrew: "ד. לחילופי תלמידים בתיכון",
        english: "A high school student exchange",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc0978aaaaed0d9af6e63",
    question: "What was one of the speaker’s worries about studying abroad?",
    options: [
      {
        hebrew: "א. שלא יעמוד בבחינות סיום",
        english: "Not passing final exams",
        isCorrect: false,
      },
      {
        hebrew: "ב. האם השליטה שלו בשפה המקומית מספיקה להבנת ההרצאות",
        english:
          "Whether his local language skills would be enough for lectures",
        isCorrect: true,
      },
      {
        hebrew: "ג. שלא ימצא אוכל כשר",
        english: "Not finding kosher food",
        isCorrect: false,
      },
      {
        hebrew: "ד. שאין מספיק סטודנטים בכיתות",
        english: "That there wouldn’t be enough students in class",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc0978aaaaed0d9af6e63",
    question: "Which field was the well-known professor associated with?",
    options: [
      {
        hebrew: "א. ביוטכנולוגיה",
        english: "Biotechnology",
        isCorrect: true,
      },
      {
        hebrew: "ב. ספרות עברית",
        english: "Hebrew literature",
        isCorrect: false,
      },
      {
        hebrew: "ג. היסטוריה של ימי הביניים",
        english: "Medieval history",
        isCorrect: false,
      },
      {
        hebrew: "ד. מתמטיקה שימושית",
        english: "Applied mathematics",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc0978aaaaed0d9af6e63",
    question: "Besides academic growth, what else did the speaker develop?",
    options: [
      {
        hebrew: "א. כישורים חברתיים וביטחון עצמי",
        english: "Social skills and self-confidence",
        isCorrect: true,
      },
      {
        hebrew: "ב. חוסר ביטחון בלימודים",
        english: "Insecurity in studies",
        isCorrect: false,
      },
      {
        hebrew: "ג. פחד מטיסות ארוכות",
        english: "Fear of long flights",
        isCorrect: false,
      },
      {
        hebrew: "ד. סלידה מאנשים זרים",
        english: "Aversion to strangers",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc0978aaaaed0d9af6e63",
    question:
      "What does the speaker hope to do with the tools and insights gained?",
    options: [
      {
        hebrew: "א. לשמור את הכל לעצמו",
        english: "Keep them all to himself",
        isCorrect: false,
      },
      {
        hebrew: "ב. לתרום יותר לקהילה האקדמית ולחיים האישיים",
        english: "Contribute more to the academic community and personal life",
        isCorrect: true,
      },
      {
        hebrew: "ג. למכור אותם במחיר גבוה",
        english: "Sell them at a high price",
        isCorrect: false,
      },
      {
        hebrew: "ד. לשכוח מכל מה שלמד",
        english: "Forget everything he learned",
        isCorrect: false,
      },
    ],
    level: "hard",
  },

  ////////////////////////////////////
  // Story 15: 67acc23a8aaaaed0d9af6e67 (MEDIUM)
  ////////////////////////////////////
  {
    storyId: "67acc23a8aaaaed0d9af6e67",
    question: "Where did the speaker volunteer last week?",
    options: [
      {
        hebrew: "א. במרכז הקהילתי בשכונה",
        english: "At the neighborhood community center",
        isCorrect: true,
      },
      {
        hebrew: "ב. בבית ספר יסודי",
        english: "At an elementary school",
        isCorrect: false,
      },
      {
        hebrew: "ג. בבית אבות מקומי",
        english: "At a local retirement home",
        isCorrect: false,
      },
      {
        hebrew: "ד. במרכז מסחרי",
        english: "In a shopping mall",
        isCorrect: false,
      },
    ],
    level: "medium",
  },
  {
    storyId: "67acc23a8aaaaed0d9af6e67",
    question: "What was the main theme of the children's and families’ event?",
    options: [
      {
        hebrew: "א. אומנות וציור",
        english: "Art and painting",
        isCorrect: false,
      },
      {
        hebrew: "ב. חשיבות המחזור ושמירה על הסביבה",
        english: "Importance of recycling and protecting the environment",
        isCorrect: true,
      },
      {
        hebrew: "ג. ספורט ואתלטיקה",
        english: "Sports and athletics",
        isCorrect: false,
      },
      {
        hebrew: "ד. בישול מאכלים מסורתיים",
        english: "Cooking traditional foods",
        isCorrect: false,
      },
    ],
    level: "medium",
  },
  {
    storyId: "67acc23a8aaaaed0d9af6e67",
    question: "What did the children decorate at one station?",
    options: [
      { hebrew: "א. חולצות ישנות", english: "Old shirts", isCorrect: false },
      { hebrew: "ב. שקיות בד", english: "Cloth bags", isCorrect: true },
      { hebrew: "ג. כובעים", english: "Hats", isCorrect: false },
      {
        hebrew: "ד. בקבוקי זכוכית",
        english: "Glass bottles",
        isCorrect: false,
      },
    ],
    level: "medium",
  },
  {
    storyId: "67acc23a8aaaaed0d9af6e67",
    question: "What kind of flyers were handed out?",
    options: [
      {
        hebrew: "א. עלונים על הופעות מוזיקליות",
        english: "Flyers about musical performances",
        isCorrect: false,
      },
      {
        hebrew: "ב. עלונים עם טיפים לחיסכון במים ובחשמל",
        english: "Flyers with tips on saving water and electricity",
        isCorrect: true,
      },
      {
        hebrew: "ג. עלונים על תזונה בריאה",
        english: "Flyers about healthy nutrition",
        isCorrect: false,
      },
      {
        hebrew: "ד. עלונים על ספורט קהילתי",
        english: "Flyers about community sports",
        isCorrect: false,
      },
    ],
    level: "medium",
  },
  {
    storyId: "67acc23a8aaaaed0d9af6e67",
    question: "How did the speaker feel at the end of the event?",
    options: [
      { hebrew: "א. ריקנות", english: "Empty", isCorrect: false },
      {
        hebrew: "ב. גאווה וסיפוק",
        english: "Pride and fulfillment",
        isCorrect: true,
      },
      { hebrew: "ג. עצב גדול", english: "Great sadness", isCorrect: false },
      {
        hebrew: "ד. כעס ותסכול",
        english: "Anger and frustration",
        isCorrect: false,
      },
    ],
    level: "medium",
  },

  ////////////////////////////////////
  // Story 16: 67acc2558aaaaed0d9af6e6b (HARD)
  ////////////////////////////////////
  {
    storyId: "67acc2558aaaaed0d9af6e6b",
    question: "Where did the speaker travel recently?",
    options: [
      {
        hebrew: "א. לאתר ארכיאולוגי נידח בדרום הארץ",
        english: "A remote archaeological site in the south",
        isCorrect: true,
      },
      {
        hebrew: "ב. לעיר גדולה בצפון",
        english: "A large city in the north",
        isCorrect: false,
      },
      {
        hebrew: "ג. לכפר תיירותי פופולרי במרכז",
        english: "A popular tourist village in the center",
        isCorrect: false,
      },
      {
        hebrew: "ד. למוזיאון במרכז העיר",
        english: "A museum downtown",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc2558aaaaed0d9af6e6b",
    question: "What period are the researchers trying to uncover remains from?",
    options: [
      {
        hebrew: "א. תקופת בית ראשון",
        english: "The First Temple period",
        isCorrect: true,
      },
      {
        hebrew: "ב. התקופה הרומית",
        english: "The Roman period",
        isCorrect: false,
      },
      {
        hebrew: "ג. ימי הביניים",
        english: "The Middle Ages",
        isCorrect: false,
      },
      {
        hebrew: "ד. התקופה העות'מאנית",
        english: "The Ottoman era",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc2558aaaaed0d9af6e6b",
    question: "What was the greatest challenge during the excavation?",
    options: [
      {
        hebrew: "א. מזג האוויר הקיצוני החם",
        english: "The extreme hot weather",
        isCorrect: true,
      },
      {
        hebrew: "ב. מחסור במכושים ובאתי חפירה",
        english: "Lack of picks and shovels",
        isCorrect: false,
      },
      {
        hebrew: "ג. חוסר עניין של החוקרים",
        english: "The researchers weren’t interested",
        isCorrect: false,
      },
      {
        hebrew: "ד. גשמים בלתי פוסקים",
        english: "Unceasing rains",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc2558aaaaed0d9af6e6b",
    question: "Who worked alongside the archaeologists?",
    options: [
      {
        hebrew: "א. רק סטודנטים מקומיים",
        english: "Only local students",
        isCorrect: false,
      },
      {
        hebrew: "ב. אנתרופולוגים ומומחי שימור מרחבי העולם",
        english:
          "Anthropologists and conservation experts from around the world",
        isCorrect: true,
      },
      {
        hebrew: "ג. חקלאים מהאזור",
        english: "Local farmers from the area",
        isCorrect: false,
      },
      {
        hebrew: "ד. רק תיירים סקרנים",
        english: "Only curious tourists",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc2558aaaaed0d9af6e6b",
    question: "What kind of discussions took place in the makeshift camp?",
    options: [
      {
        hebrew: "א. פוליטיים ומדיניים",
        english: "Political discussions",
        isCorrect: false,
      },
      {
        hebrew: "ב. על המשמעות ההיסטורית של כל ממצא חדש",
        english: "On the historical significance of each new find",
        isCorrect: true,
      },
      {
        hebrew: "ג. על מוזיקה עכשווית",
        english: "About contemporary music",
        isCorrect: false,
      },
      {
        hebrew: "ד. על הגיאוגרפיה של ארצות רחוקות",
        english: "On the geography of distant lands",
        isCorrect: false,
      },
    ],
    level: "hard",
  },

  ////////////////////////////////////
  // Story 17: 67acc2bb8aaaaed0d9af6e6f (HARD)
  ////////////////////////////////////
  {
    storyId: "67acc2bb8aaaaed0d9af6e6f",
    question: "What kind of agriculture has become a central issue in Israel?",
    options: [
      {
        hebrew: "א. חקלאות תעשייתית",
        english: "Industrial agriculture",
        isCorrect: false,
      },
      {
        hebrew: "ב. חקלאות בת-קיימא",
        english: "Sustainable agriculture",
        isCorrect: true,
      },
      {
        hebrew: "ג. חקלאות מסורתית בלבד",
        english: "Strictly traditional agriculture",
        isCorrect: false,
      },
      {
        hebrew: "ד. חקלאות דיג בלבד",
        english: "Fisheries only",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc2bb8aaaaed0d9af6e6f",
    question: "Which irrigation technology mentioned was invented in Israel?",
    options: [
      {
        hebrew: "א. השקיה בהצפה",
        english: "Flood irrigation",
        isCorrect: false,
      },
      {
        hebrew: "ב. מערכת השקיה בטפטוף",
        english: "Drip irrigation",
        isCorrect: true,
      },
      {
        hebrew: "ג. ממטרות קונבנציונליות",
        english: "Conventional sprinklers",
        isCorrect: false,
      },
      {
        hebrew: "ד. השקיה תת-קרקעית בשאיבה ידנית",
        english: "Manual underground pumping",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc2bb8aaaaed0d9af6e6f",
    question: "What challenge arises due to lack of fertile land?",
    options: [
      {
        hebrew: "א. חוקרים מתמקדים בשיטות לטיוב קרקע ודשנים אורגניים",
        english:
          "Researchers focus on soil improvement and organic fertilizers",
        isCorrect: true,
      },
      {
        hebrew: "ב. אין אפשרות לגדל ירקות כלל",
        english: "No possibility of growing vegetables at all",
        isCorrect: false,
      },
      {
        hebrew: 'ג. משאיות מביאות קרקע מחו"ל',
        english: "Trucks import soil from abroad",
        isCorrect: false,
      },
      {
        hebrew: "ד. הפיכת גנים ציבוריים לשדות חקלאיים",
        english: "Turning public gardens into farmland",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc2bb8aaaaed0d9af6e6f",
    question: "How does high-tech involvement help sustainable agriculture?",
    options: [
      {
        hebrew: "א. שימוש בכרכרות במקום טרקטורים",
        english: "Use of carriages instead of tractors",
        isCorrect: false,
      },
      {
        hebrew: "ב. פיתוח חיישנים חכמים ובינה מלאכותית לניטור הצמחים",
        english: "Developing AI and smart sensors to monitor crops",
        isCorrect: true,
      },
      {
        hebrew: "ג. איסור על שימוש במי גשמים",
        english: "Banning the use of rainwater",
        isCorrect: false,
      },
      {
        hebrew: "ד. פיתוח חקלאות רק מתחת לאדמה",
        english: "Focusing exclusively on underground farming",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc2bb8aaaaed0d9af6e6f",
    question: "What are some community initiatives mentioned?",
    options: [
      {
        hebrew: "א. גינות קהילתיות בבתי ספר או שכונות",
        english: "Community gardens in schools or neighborhoods",
        isCorrect: true,
      },
      {
        hebrew: "ב. הרחבת כבישים לשימוש חקלאי",
        english: "Expanding roads for agricultural use",
        isCorrect: false,
      },
      {
        hebrew: "ג. איסור גידול צמחים בקרבת אזורי מגורים",
        english: "Banning plant cultivation near residential areas",
        isCorrect: false,
      },
      {
        hebrew: "ד. הקמת מפעלים תעשייתיים גדולים",
        english: "Building large industrial plants",
        isCorrect: false,
      },
    ],
    level: "hard",
  },

  ////////////////////////////////////
  // Story 18: 67acc3008aaaaed0d9af6e73 (HARD)
  ////////////////////////////////////
  {
    storyId: "67acc3008aaaaed0d9af6e73",
    question: "Which region in Israel exemplifies desert agriculture?",
    options: [
      {
        hebrew: "א. הגליל העליון",
        english: "The Upper Galilee",
        isCorrect: false,
      },
      { hebrew: "ב. הערבה", english: "The Arava region", isCorrect: true },
      {
        hebrew: "ג. רמת הגולן",
        english: "The Golan Heights",
        isCorrect: false,
      },
      {
        hebrew: "ד. חוף הכרמל",
        english: "The Carmel coast",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc3008aaaaed0d9af6e73",
    question: "How do Arava farmers improve soil fertility?",
    options: [
      {
        hebrew: "א. על ידי שימוש רק בחול מדברי",
        english: "By using only desert sand",
        isCorrect: false,
      },
      {
        hebrew: "ב. דשנים אורגניים, קומפוסט ותוספים מינרליים",
        english: "Organic fertilizers, compost, and mineral additives",
        isCorrect: true,
      },
      {
        hebrew: "ג. השקיה בהצפה תמידית",
        english: "Constant flood irrigation",
        isCorrect: false,
      },
      {
        hebrew: "ד. איסוף עלים יבשים בלבד",
        english: "Collecting only dry leaves",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc3008aaaaed0d9af6e73",
    question:
      "Which vegetables are primarily grown in sophisticated greenhouses?",
    options: [
      {
        hebrew: "א. עגבניות, פלפלים וחצילים",
        english: "Tomatoes, peppers, and eggplants",
        isCorrect: true,
      },
      {
        hebrew: "ב. תפוחים, אגסים ואפרסקים",
        english: "Apples, pears, and peaches",
        isCorrect: false,
      },
      {
        hebrew: "ג. בננות ומנגו",
        english: "Bananas and mangoes",
        isCorrect: false,
      },
      {
        hebrew: "ד. כרוב ובצל בלבד",
        english: "Only cabbage and onions",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc3008aaaaed0d9af6e73",
    question: "What is one significant innovation in recent years?",
    options: [
      {
        hebrew: "א. שימוש בתאורה מלאכותית המכוונת לספקטרום הדרוש לצמחים",
        english:
          "Use of artificial lighting tuned to the plants’ required spectrum",
        isCorrect: true,
      },
      {
        hebrew: "ב. חממות הבנויות כולן מעץ אורן",
        english: "Greenhouses built entirely from pine wood",
        isCorrect: false,
      },
      {
        hebrew: "ג. זריעה ידנית המונית ללא בקרת אקלים",
        english: "Mass manual seeding without climate control",
        isCorrect: false,
      },
      {
        hebrew: "ד. איסור מוחלט על שימוש בחממות",
        english: "A complete ban on using greenhouses",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc3008aaaaed0d9af6e73",
    question: "Why do experts and researchers visit the Arava from abroad?",
    options: [
      {
        hebrew: "א. כדי לצפות בתחרויות ספורט במדבר",
        english: "To watch desert sports competitions",
        isCorrect: false,
      },
      {
        hebrew: "ב. כדי ללמוד על החידושים בחקלאות המדבר וליישמם בארצותיהם",
        english:
          "To learn about desert farming innovations and apply them back home",
        isCorrect: true,
      },
      {
        hebrew: "ג. כדי לבלות בחופי הים",
        english: "To spend time at the beach",
        isCorrect: false,
      },
      {
        hebrew: "ד. כי אין חקלאות במדינות אחרות",
        english: "Because there is no agriculture in other countries",
        isCorrect: false,
      },
    ],
    level: "hard",
  },

  ////////////////////////////////////
  // Story 19: 67acc3988aaaaed0d9af6e77 (HARD)
  ////////////////////////////////////
  {
    storyId: "67acc3988aaaaed0d9af6e77",
    question:
      "What has become a central component of Israel's national and agricultural security?",
    options: [
      { hebrew: "א. כריית זהב", english: "Gold mining", isCorrect: false },
      {
        hebrew: "ב. התפלת מים",
        english: "Water desalination",
        isCorrect: true,
      },
      {
        hebrew: "ג. פלישה למדינות שכנות",
        english: "Invading neighboring countries",
        isCorrect: false,
      },
      {
        hebrew: "ד. בניית גורדי שחקים במדבר",
        english: "Building skyscrapers in the desert",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc3988aaaaed0d9af6e77",
    question:
      "Which desalination method do the Ashkelon and Hadera plants use?",
    options: [
      {
        hebrew: "א. אידוי טבעי",
        english: "Natural evaporation",
        isCorrect: false,
      },
      {
        hebrew: "ב. אוסמוזה הפוכה",
        english: "Reverse osmosis",
        isCorrect: true,
      },
      {
        hebrew: "ג. סינון בחול בלבד",
        english: "Sand filtration only",
        isCorrect: false,
      },
      {
        hebrew: "ד. הרתחה ממושכת",
        english: "Long-term boiling",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc3988aaaaed0d9af6e77",
    question: "What is brine (רכז) in the context of desalination?",
    options: [
      {
        hebrew: "א. מים מתוקים שמוספים לים",
        english: "Fresh water added back to the sea",
        isCorrect: false,
      },
      {
        hebrew: "ב. תמיסת מלחים מרוכזת שמוחזרת לים",
        english: "A concentrated salt solution discharged back into the sea",
        isCorrect: true,
      },
      {
        hebrew: "ג. סוג של דלק מיוחד להפעלת המכונות",
        english: "A special fuel to run the machines",
        isCorrect: false,
      },
      {
        hebrew: "ד. כינוי לפסולת פלסטיק",
        english: "A term for plastic waste",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc3988aaaaed0d9af6e77",
    question: "How has desalination influenced farmers?",
    options: [
      {
        hebrew: "א. פחות זקוקים למי תהום ולמאגרים שהתדלדלו",
        english: "They rely less on depleted groundwater and reservoirs",
        isCorrect: true,
      },
      {
        hebrew: "ב. הפסיקו לגדל גידולים בכלל",
        english: "They stopped growing crops entirely",
        isCorrect: false,
      },
      {
        hebrew: "ג. משתמשים רק בגשם טבעי",
        english: "They now use only natural rainwater",
        isCorrect: false,
      },
      {
        hebrew: "ד. אין כל שינוי בשיטות ההשקיה",
        english: "No change at all in irrigation methods",
        isCorrect: false,
      },
    ],
    level: "hard",
  },
  {
    storyId: "67acc3988aaaaed0d9af6e77",
    question:
      "What do recent studies examine regarding desalinated water usage?",
    options: [
      {
        hebrew: "א. איך למנוע שימוש במים מותפלים כליל",
        english: "How to prevent the use of desalinated water entirely",
        isCorrect: false,
      },
      {
        hebrew: "ב. התערובת האידיאלית בין מי תהום, מי קולחין ומים מותפלים",
        english:
          "The ideal mix of groundwater, purified wastewater, and desalinated water",
        isCorrect: true,
      },
      {
        hebrew: "ג. רק איכות מי האוקיינוס",
        english: "Only the quality of ocean water",
        isCorrect: false,
      },
      {
        hebrew: "ד. איסור מוחלט על הדישון",
        english: "A total ban on fertilization",
        isCorrect: false,
      },
    ],
    level: "hard",
  },

  ////////////////////////////////////
  // Story 20: 67acc4cf8aaaaed0d9af6e7b (MEDIUM)
  ////////////////////////////////////
  {
    storyId: "67acc4cf8aaaaed0d9af6e7b",
    question: "In recent years, Tel Aviv became a center for what?",
    options: [
      { hebrew: "א. אופנה עילית", english: "High fashion", isCorrect: false },
      {
        hebrew: "ב. חקלאות אורבנית",
        english: "Urban agriculture",
        isCorrect: true,
      },
      {
        hebrew: "ג. תעשיית מכוניות",
        english: "Car manufacturing",
        isCorrect: false,
      },
      { hebrew: "ד. ספורט מים", english: "Water sports", isCorrect: false },
    ],
    level: "medium",
  },
  {
    storyId: "67acc4cf8aaaaed0d9af6e7b",
    question:
      "Where do local initiatives invite residents to grow vegetables and herbs?",
    options: [
      {
        hebrew: "א. על גגות, מרפסות וגינות קהילתיות",
        english: "On rooftops, balconies, and small community gardens",
        isCorrect: true,
      },
      {
        hebrew: "ב. רק בחצרות אחוריות של בתים פרטיים",
        english: "Only in private backyards",
        isCorrect: false,
      },
      {
        hebrew: "ג. בפארקים מחוץ לעיר",
        english: "In parks outside the city",
        isCorrect: false,
      },
      {
        hebrew: "ד. במנהרות תת-קרקעיות",
        english: "In underground tunnels",
        isCorrect: false,
      },
    ],
    level: "medium",
  },
  {
    storyId: "67acc4cf8aaaaed0d9af6e7b",
    question: "What is the vision behind these urban agriculture projects?",
    options: [
      {
        hebrew: "א. לחבר בין אנשים לאדמה אפילו בסביבה עירונית צפופה",
        english:
          "To connect people to the soil even in a dense urban environment",
        isCorrect: true,
      },
      {
        hebrew: "ב. לבטל כל גינה פרטית",
        english: "To eliminate all private gardens",
        isCorrect: false,
      },
      {
        hebrew: "ג. לעודד יבוא תוצרת חקלאית יקרה",
        english: "To encourage importing expensive produce",
        isCorrect: false,
      },
      {
        hebrew: "ד. להפוך את העיר למדבר מלאכותי",
        english: "To turn the city into an artificial desert",
        isCorrect: false,
      },
    ],
    level: "medium",
  },
  {
    storyId: "67acc4cf8aaaaed0d9af6e7b",
    question: "Where is the shared garden in Tel Aviv located?",
    options: [
      {
        hebrew: "א. בשכונת פלורנטין, עם ערוגות של עגבניות וחסה",
        english: "In Florentin neighborhood, with tomato and lettuce beds",
        isCorrect: true,
      },
      {
        hebrew: "ב. בקומה ה-50 של מגדל יוקרתי",
        english: "On the 50th floor of a luxury tower",
        isCorrect: false,
      },
      {
        hebrew: "ג. בגן הציבורי הגדול ליד הים",
        english: "In the large public garden by the sea",
        isCorrect: false,
      },
      {
        hebrew: "ד. בתחנת הרכבת הישנה בעיר",
        english: "At the old train station in the city",
        isCorrect: false,
      },
    ],
    level: "medium",
  },
  {
    storyId: "67acc4cf8aaaaed0d9af6e7b",
    question: "What does the municipality support regarding these projects?",
    options: [
      {
        hebrew: "א. הקמת גינות נוספות על גגות מבני ציבור",
        english: "Creating more gardens on public building rooftops",
        isCorrect: true,
      },
      {
        hebrew: "ב. ביטול כל הגינות הקיימות",
        english: "Eliminating all existing gardens",
        isCorrect: false,
      },
      {
        hebrew: "ג. מעבר גורף למגורים בכפר",
        english: "Everyone moving to rural villages",
        isCorrect: false,
      },
      {
        hebrew: "ד. סגירת פרויקטים קהילתיים",
        english: "Closing community projects",
        isCorrect: false,
      },
    ],
    level: "medium",
  },

  ////////////////////////////////////
  // Story 21: 67b9e563c6729c091d1962b2 (EASY)
  ////////////////////////////////////
  {
    storyId: "67b9e563c6729c091d1962b2",
    question: "What is the speaker’s name?",
    options: [
      { hebrew: "א. דניאל", english: "Daniel", isCorrect: true },
      { hebrew: "ב. דינה", english: "Dina", isCorrect: false },
      { hebrew: "ג. אדם", english: "Adam", isCorrect: false },
      { hebrew: "ד. חתול", english: "A cat", isCorrect: false },
    ],
    level: "easy",
  },
  {
    storyId: "67b9e563c6729c091d1962b2",
    question: "How does the speaker greet the audience?",
    options: [
      { hebrew: "א. שלום", english: '"Shalom"', isCorrect: true },
      {
        hebrew: "ב. בוקר טוב",
        english: '"Boker tov" (Good morning)',
        isCorrect: false,
      },
      { hebrew: "ג. להתראות", english: '"Goodbye"', isCorrect: false },
      { hebrew: "ד. לילה טוב", english: '"Good night"', isCorrect: false },
    ],
    level: "easy",
  },
  {
    storyId: "67b9e563c6729c091d1962b2",
    question: "Is there any mention of where Daniel lives?",
    options: [
      {
        hebrew: "א. לא מוזכר היכן הוא גר",
        english: "It's not mentioned where he lives",
        isCorrect: true,
      },
      {
        hebrew: "ב. הוא גר בירושלים",
        english: "He lives in Jerusalem",
        isCorrect: false,
      },
      {
        hebrew: "ג. הוא גר בחיפה",
        english: "He lives in Haifa",
        isCorrect: false,
      },
      {
        hebrew: "ד. הוא גר בתל אביב",
        english: "He lives in Tel Aviv",
        isCorrect: false,
      },
    ],
    level: "easy",
  },
  {
    storyId: "67b9e563c6729c091d1962b2",
    question: "What language does Daniel use to say hello?",
    options: [
      { hebrew: "א. עברית", english: "Hebrew", isCorrect: true },
      { hebrew: "ב. אנגלית", english: "English", isCorrect: false },
      { hebrew: "ג. ערבית", english: "Arabic", isCorrect: false },
      { hebrew: "ד. צרפתית", english: "French", isCorrect: false },
    ],
    level: "easy",
  },
  {
    storyId: "67b9e563c6729c091d1962b2",
    question: "Does the text mention any hobbies or job for Daniel?",
    options: [
      {
        hebrew: "א. הוא אוהב לקרוא ספרים",
        english: "He loves reading books",
        isCorrect: false,
      },
      {
        hebrew: "ב. הוא עובד כטבח",
        english: "He works as a cook",
        isCorrect: false,
      },
      {
        hebrew: "ג. לא מוזכר שום פרט על עיסוק או תחביב",
        english: "No details about occupation or hobby are mentioned",
        isCorrect: true,
      },
      {
        hebrew: "ד. הוא שחקן כדורגל",
        english: "He is a soccer player",
        isCorrect: false,
      },
    ],
    level: "easy",
  },
];

// Main seeding function
async function seedExercises() {
  try {
    // 3) Connect to MongoDB using your MONGO_URI from .env
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB...");

    // OPTIONAL: Clear existing exercises if you want a clean slate
    // await Exercise.deleteMany({});

    // 4) Insert all exercises at once:
    const result = await Exercise.insertMany(exercisesData);
    console.log(`${result.length} exercises inserted successfully!`);
  } catch (err) {
    console.error("Error seeding exercises:", err);
  } finally {
    // 5) Close the DB connection
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
}

// Call the function
seedExercises();
