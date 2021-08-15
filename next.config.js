module.exports = {
  env: {
    DB_CONNECTION: "mongodb://root:example@localhost:27017",
    DB_URI: "",

    STRIPE_API_KEY:
      "pk_test_51H41StBtVocgCB1NsEggX6mhnu6HZSTQOLQHd2g0yY1ZC3KA2WupApOvTwQuvTzDSDxgmgOD9nG0FNAv0YPsN5Gz00jYlVIEju",
    STRIPE_SECRET_KEY:
      "pk_test_51H41StBtVocgCB1NsEggX6mhnu6HZSTQOLQHd2g0yY1ZC3KA2WupApOvTwQuvTzDSDxgmgOD9nG0FNAv0YPsN5Gz00jYlVIEju",

    STRIPE_WEBHOOK_SECRET: "",

    IMAGE_CLOUD_NAME: "dpzglmdrr",
    IMAGE_API_KEY: "667774276185855",
    IMAGE_API_SECRET: "iVPc-gN-0--NaQ-B3guAkWj7Sk0",

    SMTP_HOST: "",
    SMTP_PORT: "",
    SMTP_USER: "",
    SMTP_PASSWORD: "",
    SMTP_FROM_EMAIL: "",
    SMTP_FROM_NAME: "",

    NEXTAUTH_URL: "",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
