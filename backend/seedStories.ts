import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Story from "./models/story.model.js";

const storiesData = [
  {
    titleHebrew: "דניאל בתל אביב",
    titleEnglish: "Daniel in Tel Aviv",
    contentHebrew: "שלום, שמי דניאל ואני גר בתל אביב. יש לי שני אחים ואחות אחת. אני עובד בבית קפה קטן. אני אוהב לשתות קפה ולקרוא ספרים. בסוף, אני תמיד שואל אנשים: מה שמך?",
    contentEnglish: "Hello, my name is Daniel and I live in Tel Aviv. I have two brothers and one sister. I work at a small café. I love to drink coffee and read books. At the end, I always ask people: What is your name?",
    level: "easy"
  },
  {
    titleHebrew: "החתול והחלב",
    titleEnglish: "The Cat and the Milk",
    contentHebrew: "החתול הקטן ראה כוס חלב על השולחן. הוא היה רעב מאוד כי הוא לא אכל זמן רב. הוא קפץ על השולחן והפיל את הכוס. אמא אמרה: 'אוי! חתול שובב!'. החתול ילל 'מיאו!' בתגובה.",
    contentEnglish: "The small cat saw a cup of milk on the table. He was very hungry because he hadn't eaten in a long time. He jumped on the table and knocked over the cup. Mother said: 'Oy! Naughty cat!'. The cat meowed 'Meow!' in response.",
    level: "easy"
  },
  {
    titleHebrew: "המפתח של אדם",
    titleEnglish: "Adam's Key",
    contentHebrew: "אדם טיפל בצמחים בגינה שלו בבוקר בהיר אחד. פתאום הוא גילה שהמפתח שלו נעלם. הוא חיפש בכל עבר בגינה, מאחורי השיחים ובין הפרחים. הוא היה מותש וניסה להירגע על ספסל, עד שחברו הטוב מצא את המפתח.",
    contentEnglish: "Adam was tending to plants in his garden one bright morning. Suddenly he discovered his key was missing. He searched everywhere in the garden, behind bushes and among flowers. He was exhausted and tried to calm himself on a bench, until his good friend found the key.",
    level: "hard"
  },
  {
    titleHebrew: "הנוסע והחכמה",
    titleEnglish: "The Traveler and Wisdom",
    contentHebrew: "נוסע עייף הגיע לכפר קטן ורחוק מהעיר. הוא פגש איש זקן שעסק בהתבוננות והרהור. הנוסע חיפש אוכל, לינה וקצת חוכמה. הזקן סיפר לו סיפורים על עזרה הדדית וערכים קהילתיים, והציע לו להאמין בלבו וללמוד מכל אדם.",
    contentEnglish: "A tired traveler arrived at a small village far from the city. He met an old man engaged in contemplation and reflection. The traveler looked for food, lodging, and a little wisdom. The old man told him stories of mutual aid and community values, and suggested he believe in his heart and learn from everyone.",
    level: "hard"
  },
  {
    titleHebrew: "יום בים",
    titleEnglish: "A Day at the Beach",
    contentHebrew: "אני אוהב ללכת לים. החול שם רך והמים חמימים. לפעמים אני מוצא צדפים יפים על החוף. ללכת לים זה כיף מאוד.",
    contentEnglish: "I love going to the beach. The sand there is soft and the water is warm. Sometimes I find beautiful shells on the shore. Going to the beach is a lot of fun.",
    level: "easy"
  },
  {
    titleHebrew: "הביקור בספרייה",
    titleEnglish: "The Library Visit",
    contentHebrew: "אתמול ביקרתי בספרייה ליד הבית. בחרתי ספר על היסטוריה כי אני רוצה ללמוד דברים חדשים. השפה בספר לא קשה מדי. אני מקווה לסיים אותו תוך שבועיים.",
    contentEnglish: "Yesterday I visited the library near my house. I chose a book about history because I want to learn new things. The language in the book is not too difficult. I hope to finish it within two weeks.",
    level: "medium"
  },
  {
    titleHebrew: "הטיפוס אל הפסגה",
    titleEnglish: "The Climb to the Summit",
    contentHebrew: "לפני שבוע יצאתי לטיול בהר הגבוה ביותר באזור. הנוף היה עוצר נשימה עם נחלים ומפלים. ארזתי ציוד בטיחות כי לפעמים סימוני השבילים מטושטשים. כשהגעתי לפסגה, הרגשתי תחושת הישג אדירה.",
    contentEnglish: "A week ago I went on a trip to the highest mountain in the area. The view was breathtaking with streams and waterfalls. I packed safety gear because sometimes trail markings are unclear. When I reached the summit, I felt a great sense of accomplishment.",
    level: "hard"
  },
  {
    titleHebrew: "גלידה של קיץ",
    titleEnglish: "Summer Ice Cream",
    contentHebrew: "בקיץ אני אוהב לאכול גלידה מתוקה ומרעננת. אני במיוחד אוהב טעמים של פירות. הגלידה עוזרת לי להתקרר כשחם בחוץ. בחורף זה פחות מתאים.",
    contentEnglish: "In the summer I love to eat sweet and refreshing ice cream. I especially love fruit flavors. The ice cream helps me cool down when it's hot outside. In the winter it is less suitable.",
    level: "easy"
  },
  {
    titleHebrew: "פגישת מחזור",
    titleEnglish: "Class Reunion",
    contentHebrew: "השבוע אני פוגש חברים ישנים שלא ראיתי זמן רב. כל אחד הלך לכיוון אחר בחיים, ואחד מאיתנו אפילו למד באוניברסיטה בחו\"ל. אנחנו נפגשים בבית קפה קטן במרכז העיר. השיחה תהיה מלאה בנוסטלגיה וחום.",
    contentEnglish: "This week I am meeting old friends I haven't seen for a long time. Everyone went in a different direction in life, and one of us even studied at a university abroad. We are meeting at a small café in the city center. The conversation will be full of nostalgia and warmth.",
    level: "medium"
  },
  {
    titleHebrew: "מסע אופניים בנהר",
    titleEnglish: "River Bike Trip",
    contentHebrew: "באביב האחרון יצאתי למסע אופניים לאורך נהר מתפתל. ישנתי באוהל קטן. המקומיים המליצו לי על מסלולים מחוץ לשביל הראשי. ביום השני ירד גשם חזק פתאום, אבל חזרתי הביתה עם תחושת ניצחון ואהבה לטבע.",
    contentEnglish: "Last spring I went on a bike trip along a winding river. I slept in a small tent. The locals recommended trails off the main path to me. On the second day it suddenly rained hard, but I returned home with a sense of victory and love for nature.",
    level: "hard"
  },
  {
    titleHebrew: "זיכרונות של חברים",
    titleEnglish: "Memories of Friends",
    contentHebrew: "בעבר נפגשנו בכל יום שישי בערב. עם השנים כל אחד פנה לכיוון אחר - אחד אפילו הקים סטארט-אפ. עכשיו אנחנו מתכננים להיפגש בבית קפה מהילדות ולדפדף באלבומי תמונות ישנים.",
    contentEnglish: "In the past we met every Friday evening. Over the years everyone turned in a different direction - one even started a startup. Now we are planning to meet at a café from our childhood and flip through old photo albums.",
    level: "hard"
  },
  {
    titleHebrew: "רכיבה אל המפל",
    titleEnglish: "Riding to the Waterfall",
    contentHebrew: "זהו מסע אופניים לאורך נהר ארוך. משפחה ידידותית הזמינה אותי לארוחת ערב טעימה. קמתי מוקדם כדי לרכוב בשעות הקרירות ולבקר במפל מפורסם. האתגר הגדול היה אזהרות מפני שטפונות.",
    contentEnglish: "This is a bike trip along a long river. A friendly family invited me to a delicious dinner. I woke up early to ride during the cool hours and visit a famous waterfall. The big challenge was flash flood warnings.",
    level: "hard"
  },
  {
    titleHebrew: "מסיבת ההפתעה",
    titleEnglish: "The Surprise Party",
    contentHebrew: "אנחנו מתכננים מסיבת הפתעה לחברה שמסיימת תואר. המסיבה תהיה בחצר גדולה של אחת הבנות. אני אאפה עוגה מרשימה עם תותים. נשחק חידון על החברה שלנו, והיא תהיה מופתעת לגמרי.",
    contentEnglish: "We are planning a surprise party for a friend finishing her degree. The party will be in a large yard of one of the girls. I will bake an impressive cake with strawberries. We will play a quiz about our friend, and she will be completely surprised.",
    level: "medium"
  },
  {
    titleHebrew: "לימודים בחו\"ל",
    titleEnglish: "Studies Abroad",
    contentHebrew: "התקבלתי לתוכנית חילופי סטודנטים בחו\"ל. דאגתי לגבי השפה בהרצאות בביוטכנולוגיה. הלימודים פיתחו את הביטחון העצמי שלי. כעת אני מקווה לתרום לקהילה האקדמית.",
    contentEnglish: "I was accepted into a student exchange program abroad. I worried about the language in biotechnology lectures. The studies developed my self-confidence. Now I hope to contribute to the academic community.",
    level: "hard"
  },
  {
    titleHebrew: "התנדבות בקהילה",
    titleEnglish: "Community Volunteering",
    contentHebrew: "התנדבתי במרכז הקהילתי באירוע על שמירה על הסביבה. הילדים קישטו שקיות בד וקיבלו עלונים על חיסכון במים וחשמל. בסוף היום הרגשתי גאווה וסיפוק.",
    contentEnglish: "I volunteered at the community center for an environmental protection event. The children decorated cloth bags and received flyers on saving water and electricity. At the end of the day I felt pride and satisfaction.",
    level: "medium"
  },
  {
    titleHebrew: "חפירות בדרום",
    titleEnglish: "Excavations in the South",
    contentHebrew: "נסעתי לאתר ארכיאולוגי בדרום כדי לחקור את תקופת בית ראשון. האתגר הגדול היה החום הכבד. עבדנו עם מומחים מכל העולם ודנו במשמעות ההיסטורית של הממצאים.",
    contentEnglish: "I traveled to an archaeological site in the south to investigate the First Temple period. The big challenge was the heavy heat. We worked with experts from all over the world and discussed the historical significance of the findings.",
    level: "hard"
  },
  {
    titleHebrew: "חקלאות בת-קיימא",
    titleEnglish: "Sustainable Agriculture",
    contentHebrew: "חקלאות בת-קיימא היא נושא מרכזי בישראל. פיתחנו מערכות טפטוף וחיישנים חכמים לניטור צמחים. קיימות גם יוזמות של גינות קהילתיות בשכונות כדי לשפר את הקשר לאדמה.",
    contentEnglish: "Sustainable agriculture is a central theme in Israel. We developed drip systems and smart sensors for monitoring plants. There are also community garden initiatives in neighborhoods to improve the connection to the land.",
    level: "hard"
  },
  {
    titleHebrew: "חקלאות בערבה",
    titleEnglish: "Farming in the Arava",
    contentHebrew: "אזור הערבה מדגים חקלאות מדברית מוצלחת. החקלאים משתמשים בדשנים אורגניים ומגדלים פלפלים בחממות עם תאורה מיוחדת. חוקרים מהעולם באים ללמוד על החידושים הללו.",
    contentEnglish: "The Arava region demonstrates successful desert agriculture. Farmers use organic fertilizers and grow peppers in greenhouses with special lighting. Researchers from the world come to learn about these innovations.",
    level: "hard"
  },
  {
    titleHebrew: "התפלת מים בישראל",
    titleEnglish: "Water Desalination in Israel",
    contentHebrew: "התפלת מים היא חלק מהביטחון הלאומי והחקלאי שלנו. בשיטת אוסמוזה הפוכה, אנחנו מתפלים מים ומחזירים את הרכז לים. זה עוזר לחקלאים להסתמך פחות על מאגרי מים שהתדלדלו.",
    contentEnglish: "Water desalination is part of our national and agricultural security. Using reverse osmosis, we desalinate water and return the brine to the sea. This helps farmers rely less on depleted water reservoirs.",
    level: "hard"
  },
  {
    titleHebrew: "חקלאות אורבנית בתל אביב",
    titleEnglish: "Urban Agriculture in Tel Aviv",
    contentHebrew: "תל אביב הפכה למרכז של חקלאות אורבנית. תושבים מגדלים ירקות על גגות ומרפסות כדי להתחבר לאדמה. העירייה תומכת בגינות קהילתיות, כמו בשכונת פלורנטין, עם ערוגות חסה ועגבניות.",
    contentEnglish: "Tel Aviv has become a center for urban agriculture. Residents grow vegetables on rooftops and balconies to connect with the land. The municipality supports community gardens, such as in the Florentin neighborhood, with lettuce and tomato beds.",
    level: "medium"
  },
  {
    titleHebrew: "שלום מדניאל",
    titleEnglish: "Hello from Daniel",
    contentHebrew: "שלום, קוראים לי דניאל. אני שמח להכיר אתכם ולהתחיל ללמוד יחד עברית.",
    contentEnglish: "Hello, my name is Daniel. I am happy to meet you and start learning Hebrew together.",
    level: "easy"
  }
];

async function seedStories() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB...");

    // Clear existing stories if you want fresh IDs
    await Story.deleteMany({});

    const result = await Story.insertMany(storiesData);
    console.log(`${result.length} stories inserted with auto-generated IDs!`);
  } catch (err) {
    console.error("Error seeding stories:", (err as Error).message);
  } finally {
    await mongoose.connection.close();
  }
}

seedStories();