import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Post from "./models/Post";
import Comment from "./models/Comment";

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  const collections = ["users", "posts", "comments"];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [Alim, Artur] = await User.create(
    {
      username: "alim",
      password: "123",
      token: crypto.randomUUID(),
    },
    {
      username: "artur",
      password: "345",
      token: crypto.randomUUID(),
    }
  );

  const [postAlim1, postAlim2, postArtur1, postArtur2] = await Post.create(
    {
      user: Alim,
      title: "Привет всем, я на форуме!!",
      description: "да, это крутоо",
      image: "fixtures/cry.jpg",
      date: 1709120842921,
    },
    {
      user: Artur,
      title: "У меня есть новости..",
      description:
        "Я скоро лечу в америку!!)",
      image: "fixtures/happy.avif",
      date: 1709320842921,
    },
    {
      user: Artur,
      title: "Привет всем, кто может подсказать хороше курсы английкого?",
      description:
        "Хочу говорить на английском хорошо ",
      image: "fixtures/mustache.jpg",
      date: 1706320842921,
    },
    {
      user: Artur,
      title: "Я нашел!!)",
      description:
        "Я нашел отличные курсы английскго, с начало месяца начну)",
      image: "fixtures/cry2.jpg",
      date: 1709320842921,
    }
  );

  await Comment.create(
    {
      user: Artur,
      postId: postArtur1,
      message: "Круто) я тоже",
    },
    {
      user: Alim,
      postId: postAlim1,
      message: "Блин... Рад за тебя бро!)",
    },
    {
      user: Artur,
      postId: postArtur2,
      message: "ага",
    },
    {
      user: Alim,
      postId: postAlim2,
      message: "угу)",
    },
    {
      user: Alim,
      postId: postAlim1,
      message: "удачи тебе)",
    },
    {
      user: Artur,
      postId: postArtur1,
      message: "даа",
    },
    {
      user: Alim,
      postId: postAlim2,
      message: "удачи",
    },
    {
      user: Artur,
      postId: postArtur2,
      message: "спасибо",
    }
  );

  await db.close();
};

void run();
